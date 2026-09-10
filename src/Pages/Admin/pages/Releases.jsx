import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Music2, Disc3, Calendar, Tag } from "lucide-react";
import adminApi from "../adminApi";
import { getErrorMessage } from "../../../utils/errorHelper";

const STATUSES = ["draft","pending_acr","acr_passed","acr_failed","pending_review","approved","rejected","distributed"];
const DEFAULT_STATUS = "acr_failed";
const formatStatus = (s) => s.replace(/_/g, " ");

export default function Releases() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || DEFAULT_STATUS;
  const sub = searchParams.get("sub") || "track"; // track | album
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [permissionError, setPermissionError] = useState(null);

  const fetchReleases = useCallback(async () => {
    setLoading(true);
    setPermissionError(null);
    try {
      const res = await adminApi.get("/admin/release", { params: { status } });
      setReleases(res.data.data || res.data || []);
    } catch (err) {
      const msg = getErrorMessage(err, "Failed to load releases");
      if (err.response?.status === 403 && msg.toLowerCase().includes("permission")) {
        setPermissionError(msg);
      } else {
        toast.error(msg);
      }
      setReleases([]);
    } finally { setLoading(false); }
  }, [status]);

  useEffect(() => { fetchReleases(); }, [fetchReleases]);

  const filtered = releases.filter(r => sub === "album" ? r.album : r.track);

  const handleStatusChange = (s) => {
    searchParams.set("status", s);
    setSearchParams(searchParams);
  };
  const handleSubChange = (s) => {
    searchParams.set("sub", s);
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Releases</h1>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => handleStatusChange(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${status === s ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}
          >
            {formatStatus(s)}
          </button>
        ))}
      </div>

      {/* Album / Track subpages */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl w-fit">
        <button onClick={() => handleSubChange("track")} className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${sub === "track" ? "bg-orange-500 text-white shadow" : "text-gray-600 hover:text-gray-900"}`}>
          <span className="inline-flex items-center gap-2"><Music2 size={16} /> Tracks ({releases.filter(r=>r.track).length})</span>
        </button>
        <button onClick={() => handleSubChange("album")} className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${sub === "album" ? "bg-orange-500 text-white shadow" : "text-gray-600 hover:text-gray-900"}`}>
          <span className="inline-flex items-center gap-2"><Disc3 size={16} /> Albums ({releases.filter(r=>r.album).length})</span>
        </button>
      </div>

      {permissionError ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <p className="text-sm font-semibold text-amber-800">Insufficient permissions</p>
          <p className="text-xs text-amber-700 mt-2">{permissionError}</p>
          <p className="text-xs text-gray-500 mt-3">Required: <code className="bg-white px-1 py-0.5 rounded border">release:read</code>. Ask a Super Admin to grant this role/permission to your account.</p>
        </div>
      ) : loading ? (
        <div className="py-16 text-center text-gray-500">Loading releases...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <Tag className="mx-auto text-gray-300 mb-3" size={32} />
          <p className="text-sm font-medium text-gray-600">No {sub} releases with status “{formatStatus(status)}”</p>
          <p className="text-xs text-gray-400 mt-1">Try another status above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(r => {
            const entity = sub === "album" ? r.album : r.track;
            return (
              <div key={r.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
                <img src={r.artwork_url || "https://via.placeholder.com/400x400?text=No+Artwork"} alt="" className="w-full h-48 object-cover" />
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate">{entity?.name || r.slug}</p>
                      <p className="text-xs text-gray-500 capitalize">{r.type} • {r.status}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${r.status === "acr_failed" ? "bg-red-50 text-red-600" : r.status === "pending_acr" ? "bg-amber-50 text-amber-600" : "bg-orange-50 text-orange-600"}`}>{formatStatus(r.status)}</span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p className="flex items-center gap-1"><Calendar size={12} />Release {r.release_date?.slice(0,10) || "—"} • Created {r.created_at?.slice(0,10)}</p>
                    <p>Label: {r.record_label || "—"}</p>
                    {r.feedback && <p className="text-amber-600">Feedback: {r.feedback}</p>}
                    {entity?.file_url && <a href={entity.file_url} target="_blank" rel="noreferrer" className="text-orange-600 underline">File</a>}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => toast.message("Approve → distribute coming soon")} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl text-xs font-semibold">Approve</button>
                    <button onClick={() => toast.message("Distribute coming soon")} className="flex-1 bg-gray-900 hover:bg-black text-white py-2 rounded-xl text-xs font-semibold">Distribute</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
