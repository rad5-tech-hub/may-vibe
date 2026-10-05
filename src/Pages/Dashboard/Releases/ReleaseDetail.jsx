import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Pencil, Send, Loader2, Music2, Disc3, RefreshCw, ExternalLink, MessageSquare } from "lucide-react";
import userApi from "../../../utils/userApi";
import { getErrorMessage } from "../../../utils/errorHelper";
import { ARTIST_ROLES, PRODUCER_ROLES, ENGINEER_ROLES, MUSICIAN_ROLES } from "../../../utils/releaseConstants";
import EditReleaseModal from "./components/EditReleaseModal";

const ALL_MUSICIAN_ROLES = MUSICIAN_ROLES.flatMap((g) => g.roles);

const formatTime = (s) => {
  const sec = Math.max(0, Math.floor(Number(s) || 0));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
};

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ") : "");

const getStatusStyle = (status) => {
  switch ((status || "").toLowerCase()) {
    case "draft":
      return "bg-gray-100 text-gray-700 border border-gray-300";
    case "pending":
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

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-gray-100">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
      </div>
      <div className="px-5 sm:px-6 py-4">{children}</div>
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm py-2 border-b border-gray-100 last:border-0">
      <dt className="text-gray-500 shrink-0">{label}</dt>
      <dd className="text-gray-900 text-right font-medium break-words min-w-0">{value}</dd>
    </div>
  );
}

Row.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default function ReleaseDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [release, setRelease] = useState(location.state?.release || null);
  const [loading, setLoading] = useState(!location.state?.release);
  const [error, setError] = useState("");
  const [artistMap, setArtistMap] = useState({});
  const [songwriterMap, setSongwriterMap] = useState({});
  const [trackAudio, setTrackAudio] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDistribute, setShowDistribute] = useState(false);
  const [distributing, setDistributing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await userApi.get(`/release/${id}`);
      const d = res.data?.data || res.data;
      if (d && typeof d === "object" && !Array.isArray(d)) {
        setRelease((prev) => ({ ...(prev || {}), ...d }));
      } else {
        throw new Error("Unexpected release response");
      }
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load release"));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  // One-time name lookups so no raw id is ever rendered
  useEffect(() => {
    userApi
      .get("/contributors")
      .then((res) => {
        const list = res.data?.data || [];
        if (!Array.isArray(list)) return;
        const map = {};
        for (const c of list) map[c.id] = c.stage_name || c.legal_name || "Artist";
        setArtistMap(map);
      })
      .catch(() => {});
    userApi
      .get("/contributors/songwriters/list")
      .then((res) => {
        const list = res.data?.data || [];
        if (!Array.isArray(list)) return;
        const map = {};
        for (const s of list) map[s.id] = [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(" ");
        setSongwriterMap(map);
      })
      .catch(() => {});
  }, []);

  // Audio for the release's track entity
  useEffect(() => {
    setTrackAudio(null);
    const trackId = release?.track_id;
    if (!trackId) return;
    let cancelled = false;
    userApi
      .get(`/track/${trackId}`)
      .then((res) => {
        const d = res.data?.data || res.data;
        if (!cancelled && d?.file_url) setTrackAudio({ url: d.file_url, name: d.name || "" });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [release?.track_id]);

  const handleDistribute = async () => {
    setDistributing(true);
    try {
      const res = await userApi.post(`/release/${id}/distribute`);
      toast.success(res.data?.message || "Release sent for distribution");
      setShowDistribute(false);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Distribution failed"));
    } finally {
      setDistributing(false);
    }
  };

  if (loading && !release) {
    return (
      <div className="py-20 text-center text-gray-500">
        <Loader2 size={24} className="animate-spin mx-auto mb-3 text-orange-500" />
        Loading release...
      </div>
    );
  }

  if (error && !release) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-red-600 mb-4">{error}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={load}
            className="cursor-pointer inline-flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            <RefreshCw size={14} /> Retry
          </button>
          <Link to="/dashboard/releases" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-full text-sm font-semibold">
            Back to releases
          </Link>
        </div>
      </div>
    );
  }

  if (!release) return null;

  const title = release.title || release.album?.name || release.track?.name || release.name || "Untitled";
  const status = release.status || "draft";
  const cover = release.artwork_url || release.album?.artwork_url || null;

  const creditName = (c) => {
    if (typeof c === "string") return artistMap[c] || songwriterMap[c] || null;
    if (!c || typeof c !== "object") return null;
    if (c.first_name || c.last_name) return [c.first_name, c.middle_name, c.last_name].filter(Boolean).join(" ");
    if (c.songwriter && typeof c.songwriter === "object")
      return [c.songwriter.first_name, c.songwriter.middle_name, c.songwriter.last_name].filter(Boolean).join(" ") || null;
    return (
      c.name ||
      c.stage_name ||
      c.artist?.stage_name ||
      (c.artist_id ? artistMap[c.artist_id] : null) ||
      (c.contributor_id ? artistMap[c.contributor_id] : null) ||
      (c.songwriter_id ? songwriterMap[c.songwriter_id] : null) ||
      (c.id ? songwriterMap[c.id] || null : null) ||
      null
    );
  };

  const creditParts = (arr) =>
    (Array.isArray(arr) ? arr : [])
      .map((c) => {
        const n = creditName(c);
        if (!n) return null;
        const role = typeof c === "object" && c.role ? ` (${c.role})` : "";
        return n + role;
      })
      .filter(Boolean);

  const creditRow = (label, arr) => {
    const parts = creditParts(arr);
    return parts.length ? <Row label={label} value={parts.join(", ")} /> : null;
  };

  const primaryArtistNames = (() => {
    const pa = release.primaryArtists ?? release.primary_artists ?? release.artists;
    if (Array.isArray(pa) && pa.length) {
      const names = pa
        .map((p) => (typeof p === "string" ? artistMap[p] || null : p?.stage_name || p?.name || p?.artist?.stage_name || (p?.artist_id ? artistMap[p.artist_id] : null) || (p?.id ? artistMap[p.id] : null)))
        .filter(Boolean);
      if (names.length) return names.join(", ");
    }
    if (typeof release.artiste_name === "string" && release.artiste_name.trim()) return release.artiste_name;
    return "";
  })();

  const genreName = typeof release.genre === "string" ? release.genre : release.genre?.name || release.genre_name;
  const subGenreName = typeof release.subGenre === "string" ? release.subGenre : release.subGenre?.name || release.sub_genre?.name || release.sub_genre_name;
  const labelName = release.label?.name || release.record_label || release.label_name;

  const releaseRows = [
    ["Release type", release.is_single ? "Single" : release.type ? cap(release.type) : null],
    ["Primary artist(s)", primaryArtistNames || null],
    ["Genre", genreName],
    ["Sub-genre", subGenreName],
    ["Label", labelName],
    ["UPC", release.upc],
    ["Copyright of recording", release.copyright_of_recording],
    ["Copyright of release", release.copyright_of_release],
    ["Explicit", typeof release.explicit_lyrics === "boolean" ? (release.explicit_lyrics ? "Yes" : "No") : null],
    ["Territory", release.territory],
    ["Language", release.language],
    ["Songwriter", typeof release.songwriter === "string" ? release.songwriter : release.songwriter?.name || null],
  ].filter(([, v]) => v !== null && v !== undefined && v !== "");

  const feedbackText =
    typeof release.feedback === "string"
      ? release.feedback
      : release.feedback?.message || release.feedback?.reason || release.feedback?.feedback || null;

  const trackList = Array.isArray(release.releaseTracks) && release.releaseTracks.length
    ? release.releaseTracks
    : Array.isArray(release.tracks) && release.tracks.length
      ? release.tracks
      : release.track
        ? [release.track]
        : [];

  const deliveryRows = [
    ["Release date", release.release_date ? String(release.release_date).slice(0, 10) : null],
    ["Territory", release.territory || "Worldwide"],
    ["Distribution", typeof release.distribution_status === "boolean" ? (release.distribution_status ? "Distributed" : "Not yet distributed") : null],
    ["Created", release.createdAt || release.created_at ? new Date(release.createdAt || release.created_at).toLocaleString() : null],
    ["Last updated", release.updatedAt || release.updated_at ? new Date(release.updatedAt || release.updated_at).toLocaleString() : null],
  ].filter(([, v]) => v !== null && v !== undefined && v !== "");

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <Link to="/dashboard/releases" className="cursor-pointer inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft size={16} /> Back to My Releases
      </Link>

      {/* Header — mirrors how the release was created */}
      <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 flex items-start gap-4 sm:gap-5">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
          {cover ? (
            <img src={cover} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <Music2 size={28} />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{title}</h1>
              {primaryArtistNames && <p className="text-sm text-gray-500 mt-0.5 truncate">{primaryArtistNames}</p>}
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${getStatusStyle(status)}`}>{cap(status) || "—"}</span>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              onClick={() => setShowEdit(true)}
              className="cursor-pointer inline-flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-full text-xs font-semibold"
            >
              <Pencil size={13} /> Edit
            </button>
            <button
              onClick={() => setShowDistribute(true)}
              className="cursor-pointer inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-semibold"
            >
              <Send size={13} /> Distribute
            </button>
          </div>
        </div>
      </div>

      {feedbackText && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-3">
          <MessageSquare size={18} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-red-700 mb-1">Feedback</p>
            <p className="text-sm text-red-800 whitespace-pre-wrap">{feedbackText}</p>
          </div>
        </div>
      )}

      {/* 1. Release Details — two-column grid, only fields that exist */}
      <Section title="Release Details">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          {releaseRows.map(([label, value]) => (
            <Row key={label} label={label} value={String(value)} />
          ))}
        </dl>
        {typeof release.lyrics === "string" && release.lyrics.trim() && (
          <div className="mt-4 bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-bold text-gray-700 mb-1">Lyrics</p>
            <p className="text-sm text-gray-800 whitespace-pre-wrap">{release.lyrics}</p>
          </div>
        )}
        {release.fan_link && (
          <a
            href={release.fan_link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            <ExternalLink size={14} /> Fan link
          </a>
        )}
      </Section>

      {/* 2. Track List & Details */}
      <Section title={`Tracks${trackList.length ? ` (${trackList.length})` : ""}`}>
        {trackList.length === 0 ? (
          <p className="text-sm text-gray-500">No track details available for this release.</p>
        ) : (
          <div className="space-y-4">
            {trackAudio && (
              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1.5">{trackAudio.name ? `Audio — ${trackAudio.name}` : "Audio"}</p>
                <audio controls src={trackAudio.url} className="w-full" />
              </div>
            )}
            {trackList.map((t, i) => {
              const tr = t.track || t;
              const version = tr.version || t.version;
              const isInstrumental = tr.is_instrumental ?? t.is_instrumental;
              const explicit = tr.explicit_content ?? t.explicit_content;
              const audioInfo = tr.audio_container
                ? `${String(tr.audio_container).toUpperCase()} · ${tr.audio_bit_depth}-bit · ${tr.audio_sample_rate} Hz · ${
                    tr.audio_channels === 2 ? "Stereo" : `${tr.audio_channels} channels`
                  }`
                : null;
              const trackRows = [
                ["Track number", t.track_number != null ? String(t.track_number) : null],
                [
                  "Track version",
                  version && version !== "original"
                    ? version === "custom"
                      ? tr.custom_version || t.custom_version || "Custom"
                      : cap(version)
                    : null,
                ],
                ["ISRC", tr.isrc || t.isrc || null],
                ["Language", isInstrumental ? "Instrumental" : tr.language || t.language || null],
                ["Explicit", typeof explicit === "boolean" ? (explicit ? "Yes" : "No") : null],
                ["AI classification", tr.ai_classification || t.ai_classification ? cap(String(tr.ai_classification || t.ai_classification).replace(/_/g, " ")) : null],
                ["Audio", audioInfo],
                [
                  "TikTok clip",
                  typeof tr.tiktok_clip_start === "number"
                    ? `${formatTime(tr.tiktok_clip_start)} → ${formatTime(tr.tiktok_clip_start + (tr.tiktok_clip_duration || 30))}`
                    : null,
                ],
                ["Genre", typeof tr.genre === "string" ? tr.genre : tr.genre?.name || null],
              ].filter(([, v]) => v !== null && v !== undefined && v !== "");

              const unified = Array.isArray(tr.credits) && tr.credits.length ? tr.credits : null;
              const buckets = { "Additional artists": [], Producers: [], Engineers: [], Musicians: [], Credits: [] };
              if (unified) {
                for (const c of unified) {
                  const parts = creditParts([c]);
                  if (!parts.length) continue;
                  const role = typeof c === "object" ? c.role || "" : "";
                  const key = ARTIST_ROLES.includes(role)
                    ? "Additional artists"
                    : PRODUCER_ROLES.includes(role)
                      ? "Producers"
                      : ENGINEER_ROLES.includes(role)
                        ? "Engineers"
                        : ALL_MUSICIAN_ROLES.includes(role)
                          ? "Musicians"
                          : "Credits";
                  buckets[key].push(parts[0]);
                }
              }

              return (
                <div key={tr.id || t.id || i} className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center shrink-0">
                      {t.track_number ?? i + 1}
                    </span>
                    <p className="font-semibold text-gray-900 truncate">{t.title || t.name || tr.name || "Untitled"}</p>
                  </div>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    {trackRows.map(([label, value]) => (
                      <Row key={label} label={label} value={String(value)} />
                    ))}
                    {unified ? (
                      Object.entries(buckets)
                        .filter(([, parts]) => parts.length)
                        .map(([label, parts]) => <Row key={label} label={label} value={parts.join(", ")} />)
                    ) : (
                      <>
                        {creditRow("Additional artists", t.additional_artists)}
                        {creditRow("Producers", t.producers)}
                        {creditRow("Engineers", t.engineers)}
                        {creditRow("Musicians", t.musicians)}
                      </>
                    )}
                    {creditRow("Songwriters", tr.songwriters || t.songwriters)}
                  </dl>
                  {typeof (t.lyrics ?? tr.lyrics) === "string" && (t.lyrics ?? tr.lyrics).trim() && (
                    <div className="mt-3 bg-white rounded-xl border border-gray-100 p-3">
                      <p className="text-xs font-bold text-gray-700 mb-1">Lyrics</p>
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{t.lyrics ?? tr.lyrics}</p>
                    </div>
                  )}
                  {(t.file_url || tr.file_url) && (
                    <div className="mt-3">
                      <audio controls src={t.file_url || tr.file_url} className="w-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* 3. Cover Art */}
      <Section title="Cover Art">
        {cover ? (
          <img src={cover} alt={`${title} cover`} className="w-44 h-44 rounded-2xl object-cover border border-gray-200" />
        ) : (
          <div className="w-44 h-44 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
            <Disc3 size={30} />
            <p className="text-xs mt-2">No artwork</p>
          </div>
        )}
      </Section>

      {/* 4. Delivery */}
      <Section title="Delivery">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          {deliveryRows.map(([label, value]) => (
            <Row key={label} label={label} value={String(value)} />
          ))}
        </dl>
      </Section>

      {showEdit && (
        <EditReleaseModal
          isOpen={showEdit}
          onClose={() => setShowEdit(false)}
          release={release}
          onSaved={() => {
            load();
          }}
        />
      )}

      {showDistribute && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-lg">Distribute this release?</h3>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{title}</span> will be sent for distribution to DSPs. This can take the release to
              review — make sure all details are correct.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDistribute(false)} className="cursor-pointer flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl text-sm font-medium">
                Cancel
              </button>
              <button
                onClick={handleDistribute}
                disabled={distributing}
                className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                {distributing && <Loader2 size={14} className="animate-spin" />}
                {distributing ? "Sending..." : "Distribute"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
