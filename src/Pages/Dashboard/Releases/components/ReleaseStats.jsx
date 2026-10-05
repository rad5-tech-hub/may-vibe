import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music2, RefreshCw, Loader2, Upload } from "lucide-react";
import userApi from "../../../../utils/userApi";
import { getErrorMessage } from "../../../../utils/errorHelper";

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ") : "");

const getStatusStyle = (status) => {
  switch ((status || "").toLowerCase()) {
    case "draft":
      return "bg-gray-100 text-gray-700 border border-gray-300";
    case "pending":
    case "pending_acr":
    case "in_review":
    case "review":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    case "rejected":
    case "acr_failed":
      return "bg-red-100 text-red-700 border border-red-300";
    case "live":
    case "approved":
      return "bg-green-100 text-green-700 border border-green-300";
    case "scheduled":
    case "processing":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
};

const releaseTitle = (r) => r?.album?.name ?? r?.track?.name ?? r?.title ?? r?.name ?? "Untitled";

const typeLabel = (r) => (r?.type ? cap(r.type) : "—");

const extractArray = (payload) => {
  const candidates = [payload?.data, payload?.data?.releases, payload?.releases, payload];
  for (const c of candidates) if (Array.isArray(c)) return c;
  return null;
};

export default function MyReleases() {
  const navigate = useNavigate();
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [albumRef, setAlbumRef] = useState({});
  const [trackRef, setTrackRef] = useState({});
  const [countMap, setCountMap] = useState({});

  const fetchReleases = useCallback(async () => {
    setLoading(true);
    setError("");
    let list;
    try {
      const res = await userApi.get("/release");
      list = extractArray(res.data);
      if (!list) throw new Error("Unexpected releases response");
      setReleases(list);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load releases"));
      setLoading(false);
      return;
    }
    setLoading(false);

    // Album rows don't carry a track count in the list — resolve each once
    const albumRows = list.filter((r) => r?.type === "album" && r?.id);
    if (albumRows.length) {
      Promise.all(
        albumRows.map((r) =>
          userApi
            .get(`/release/${r.id}`)
            .then((res) => {
              const d = res.data?.data || res.data;
              const n =
                Array.isArray(d?.releaseTracks) && d.releaseTracks.length
                  ? d.releaseTracks.length
                  : Array.isArray(d?.tracks) && d.tracks.length
                    ? d.tracks.length
                    : typeof d?.track_count === "number"
                      ? d.track_count
                      : null;
              return n != null ? { id: r.id, n } : null;
            })
            .catch(() => null)
        )
      ).then((pairs) => {
        const m = {};
        for (const p of pairs) if (p) m[p.id] = p.n;
        setCountMap(m);
      });
    }

    userApi
      .get("/album/my-albums")
      .then((r) => {
        const albums = extractArray(r.data);
        if (!Array.isArray(albums)) return;
        const map = {};
        for (const a of albums) {
          if (a?.id) map[a.id] = a.artiste_name || "";
        }
        setAlbumRef(map);
      })
      .catch(() => {});

    userApi
      .get("/track/my-tracks")
      .then((r) => {
        const list = extractArray(r.data);
        if (!Array.isArray(list)) return;
        const map = {};
        for (const t of list) {
          if (t?.id) map[t.id] = t.artiste_name || "";
        }
        setTrackRef(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  const artistLabel = (r) => {
    if (r?.type === "single" && r?.track?.id && trackRef[r.track.id]) return trackRef[r.track.id];
    if (r?.album?.id && albumRef[r.album.id]) return albumRef[r.album.id];
    return r?.record_label || "";
  };

  const trackCount = (r) => {
    if (typeof r?.track_count === "number") return String(r.track_count);
    if (r?.type === "single") return "1";
    if (countMap[r?.id] != null) return String(countMap[r.id]);
    return "—";
  };

  const cover = (r) => r?.artwork_url || r?.album?.artwork_url || null;

  const openRelease = (item) => {
    if (!item?.id) return;
    navigate(`/dashboard/releases/${item.id}`, { state: { release: item } });
  };

  return (
    <section className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">My Releases</h2>
        <button
          onClick={() => navigate("/dashboard/music-upload")}
          className="cursor-pointer inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition"
        >
          <Upload size={15} /> Upload Release
        </button>
      </div>

      {loading && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
          <Loader2 size={24} className="animate-spin mx-auto mb-3 text-orange-500" />
          Loading your releases...
        </div>
      )}

      {!loading && error && (
        <div className="bg-white rounded-3xl shadow-sm border border-red-100 p-10 text-center">
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchReleases}
            className="cursor-pointer inline-flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            <RefreshCw size={14} /> Try again
          </button>
        </div>
      )}

      {!loading && !error && releases.length === 0 && (
        <div className="bg-gray-50 rounded-3xl p-12 text-center border border-dashed border-gray-300">
          <Music2 className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-gray-600 font-medium">No releases yet</p>
          <p className="text-sm text-gray-400 mb-5">Create your first release to get started.</p>
          <button
            onClick={() => navigate("/dashboard/music-upload")}
            className="cursor-pointer inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl text-sm font-semibold"
          >
            <Upload size={15} /> Upload your first release
          </button>
        </div>
      )}

      {!loading && !error && releases.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
          {/* Header — five equal columns, scrolls horizontally on small screens */}
          <div className="grid grid-cols-5 gap-4 md:gap-6 min-w-[680px] px-5 md:px-8 py-5 border-b border-gray-200 text-sm font-semibold text-gray-600">
            <div className="truncate">Release</div>
            <div className="text-center whitespace-nowrap">Status</div>
            <div className="text-center whitespace-nowrap">Type</div>
            <div className="text-center whitespace-nowrap">Tracks</div>
            <div className="text-center whitespace-nowrap">Release Date</div>
          </div>

          {releases.map((item, i) => {
            const art = cover(item);
            const status = item?.status || "draft";
            return (
              <div
                key={item?.id || i}
                role="button"
                tabIndex={0}
                onClick={() => openRelease(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openRelease(item);
                  }
                }}
                className="border-t border-gray-100 first:border-t-0 cursor-pointer hover:bg-orange-50/40 transition-colors focus:outline-none focus:bg-orange-50/60"
              >
                <div className="px-5 py-4 md:px-8 md:py-6 min-w-[680px]">
                  <div className="grid grid-cols-5 gap-4 md:gap-6 items-center">
                    {/* Release */}
                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                      <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white shadow-md bg-gray-100 shrink-0">
                        {art ? (
                          <img src={art} alt={releaseTitle(item)} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Music2 size={16} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate">{releaseTitle(item)}</div>
                        <div className="text-xs text-gray-500 truncate">{artistLabel(item)}</div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex justify-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(status)}`}>
                        {cap(status) || "—"}
                      </span>
                    </div>

                    {/* Type */}
                    <div className="text-center text-sm font-medium text-gray-700 whitespace-nowrap">{typeLabel(item)}</div>

                    {/* Tracks */}
                    <div className="text-center text-sm font-medium text-gray-700">{trackCount(item)}</div>

                    {/* Release Date */}
                    <div className="text-center text-sm text-gray-600 whitespace-nowrap">
                      {item?.release_date ? String(item.release_date).slice(0, 10) : "—"}
                    </div>
                  </div>
                </div>

                {i < releases.length - 1 && (
                  <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent mx-8" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
