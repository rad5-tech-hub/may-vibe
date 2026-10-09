import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Music2, Calendar, Tag, Loader2 } from "lucide-react";
import adminApi from "../adminApi";
import { getErrorMessage } from "../../../utils/errorHelper";

const STATUSES = ["all", "draft", "pending_acr", "acr_passed", "acr_failed", "pending_review", "approved", "rejected", "distributed"];
const STATUS_FILTERS = STATUSES.filter((s) => s !== "all");
const DEFAULT_STATUS = "acr_failed";
const formatStatus = (s) => s.replace(/_/g, " ");
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ") : "");

const extractArray = (payload) => {
  const candidates = [payload?.data, payload?.data?.releases, payload?.releases, payload];
  for (const c of candidates) if (Array.isArray(c)) return c;
  return [];
};

const releaseTitle = (r) => r?.title || r?.album?.name || r?.track?.name || r?.name || r?.slug || "Untitled";

export default function Releases() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || DEFAULT_STATUS;
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(null);

  const fetchReleases = useCallback(async () => {
    setLoading(true);
    setPermissionError(null);
    try {
      if (status === "all") {
        const results = await Promise.all(
          STATUS_FILTERS.map((s) =>
            adminApi
              .get("/admin/release", { params: { status: s } })
              .then((res) => extractArray(res.data))
              .catch(() => [])
          )
        );
        const seen = new Set();
        const merged = [];
        for (const list of results) {
          for (const r of list) {
            if (r?.id && seen.has(r.id)) continue;
            if (r?.id) seen.add(r.id);
            merged.push(r);
          }
        }
        setReleases(merged);
      } else {
        const res = await adminApi.get("/admin/release", { params: { status } });
        setReleases(extractArray(res.data));
      }
    } catch (err) {
      const msg = getErrorMessage(err, "Failed to load releases");
      if (err.response?.status === 403 && msg.toLowerCase().includes("permission")) {
        setPermissionError(msg);
      } else {
        toast.error(msg);
      }
      setReleases([]);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Releases</h1>

      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              searchParams.set("status", s);
              setSearchParams(searchParams);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
              status === s ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
            }`}
          >
            {formatStatus(s)}
          </button>
        ))}
      </div>

      {permissionError ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <p className="text-sm font-semibold text-amber-800">Insufficient permissions</p>
          <p className="text-xs text-amber-700 mt-2">{permissionError}</p>
        </div>
      ) : loading ? (
        <div className="py-16 text-center text-gray-500">
          <Loader2 size={24} className="animate-spin mx-auto mb-3 text-orange-500" />
          Loading releases...
        </div>
      ) : releases.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <Tag className="mx-auto text-gray-300 mb-3" size={32} />
          <p className="text-sm font-medium text-gray-600">No releases with status “{formatStatus(status)}”</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {releases.map((r) => {
            const cover = r.artwork_url || r.album?.artwork_url;
            const status = r.status || "draft";
            return (
              <button
                type="button"
                key={r.id}
                onClick={() => navigate(`/admin/releases/${r.id}`, { state: { release: r } })}
                className="cursor-pointer text-left bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="w-full h-48 bg-gray-100">
                  {cover ? (
                    <img src={cover} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Music2 size={36} />
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-gray-900 truncate">{releaseTitle(r)}</p>
                    <span className="text-xs px-2 py-1 rounded-full shrink-0 bg-orange-50 text-orange-600">{cap(status)}</span>
                  </div>
                  <p className="text-xs text-gray-500 capitalize">{r.type || (r.is_single ? "single" : "release")}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {r.release_date ? String(r.release_date).slice(0, 10) : "—"}
                  </p>
                  <p className="text-xs text-gray-500">Label: {r.record_label || r.label?.name || "—"}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
