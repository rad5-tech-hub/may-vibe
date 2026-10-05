import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { X, Loader2, ImagePlus } from "lucide-react";
import userApi from "../../../../utils/userApi";
import { getErrorMessage } from "../../../../utils/errorHelper";
import { TERRITORIES } from "../../../../utils/releaseConstants";
import { validateArtwork } from "../../../../utils/imageUtils";

const fieldCls = "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400";
const labelCls = "text-xs font-medium text-gray-600";

export default function EditReleaseModal({ isOpen, onClose, release, onSaved }) {
  const [form, setForm] = useState({
    title: "",
    record_label: "",
    upc: "",
    release_date: "",
    territory: "Worldwide",
    copyright_of_recording: "",
    copyright_of_release: "",
    genre_id: "",
    sub_genre_id: "",
  });
  const [genres, setGenres] = useState([]);
  const [artwork, setArtwork] = useState(null);
  const [artworkPreview, setArtworkPreview] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !release) return;
    setForm({
      title: release.title || release.album?.name || release.track?.name || "",
      record_label: release.record_label || "",
      upc: release.upc || "",
      release_date: release.release_date ? String(release.release_date).slice(0, 10) : "",
      territory: release.territory || "Worldwide",
      copyright_of_recording: release.copyright_of_recording || "",
      copyright_of_release: release.copyright_of_release || "",
      genre_id: release.genre_id || "",
      sub_genre_id: release.sub_genre_id || "",
    });
    setArtwork(null);
    setArtworkPreview(release.artwork_url || release.album?.artwork_url || "");
    userApi
      .get("/genre/all-genres")
      .then((res) => {
        const list = res.data?.data || res.data?.genres || res.data || [];
        setGenres(Array.isArray(list) ? list : []);
      })
      .catch(() => {});
  }, [isOpen, release]);

  if (!isOpen || !release) return null;

  const handleArtwork = async (file) => {
    if (!file) {
      setArtwork(null);
      setArtworkPreview(release?.artwork_url || "");
      return;
    }
    const result = await validateArtwork(file);
    if (!result.ok) {
      result.errors.forEach((e) => toast.error(e));
      return;
    }
    setArtwork(file);
    setArtworkPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Release title is required");
    setSaving(true);
    try {
      const rows = Array.isArray(release.releaseTracks) && release.releaseTracks.length
        ? release.releaseTracks
        : Array.isArray(release.tracks) && release.tracks.length
          ? release.tracks
          : release.track
            ? [release.track]
            : [];

      const tracks = rows
        .map((t) => {
          const src = t.track || t;
          const entry = {
            id: t.track_id || src.id || t.id,
            title: src.name || t.title || t.name || "",
          };
          const version = t.version || src.version;
          if (version) entry.version = version;
          const isrc = t.isrc || src.isrc;
          if (isrc) entry.isrc = isrc;
          const language = t.language ?? src.language;
          if (language) entry.language = language;
          const explicit = t.explicit_content ?? src.explicit_content;
          if (typeof explicit === "boolean") entry.explicit_content = explicit;
          const instrumental = t.is_instrumental ?? src.is_instrumental;
          if (typeof instrumental === "boolean") entry.is_instrumental = instrumental;
          const lyrics = t.lyrics ?? src.lyrics;
          if (lyrics) entry.lyrics = lyrics;
          const ai = t.ai_classification || src.ai_classification;
          if (ai) entry.ai_classification = ai;
          if (t.genre_id) entry.genre_id = t.genre_id;
          if (t.sub_genre_id) entry.sub_genre_id = t.sub_genre_id;
          if (t.audio) entry.audio = t.audio;
          else if (src.audio_container)
            entry.audio = {
              container: src.audio_container,
              channels: src.audio_channels,
              bitDepth: src.audio_bit_depth,
              sampleRate: src.audio_sample_rate,
            };
          return entry;
        })
        .filter((t) => t.id && t.title);

      const body = { title: form.title.trim(), tracks };
      if (form.record_label.trim()) body.record_label = form.record_label.trim();
      if (form.upc.trim()) body.upc = form.upc.trim();
      if (form.release_date) body.release_date = form.release_date;
      if (form.territory) body.territory = form.territory;
      if (form.copyright_of_recording.trim()) body.copyright_of_recording = form.copyright_of_recording.trim();
      if (form.copyright_of_release.trim()) body.copyright_of_release = form.copyright_of_release.trim();
      if (form.genre_id) body.genre_id = form.genre_id;
      if (form.sub_genre_id) body.sub_genre_id = form.sub_genre_id;

      const pa = release.primaryArtists ?? release.primary_artists ?? [];
      if (Array.isArray(pa) && pa.length) {
        const artistIds = pa
          .map((p) => (typeof p === "string" ? p : p.artist_id || p.artist?.id || null))
          .filter(Boolean);
        if (artistIds.length) body.primary_artist_ids = artistIds;
      }

      let res;
      if (artwork) {
        const fd = new FormData();
        fd.append("metadata", JSON.stringify(body));
        fd.append("artwork", artwork);
        res = await userApi.put(`/release/${release.id}`, fd);
      } else {
        res = await userApi.put(`/release/${release.id}`, body);
      }
      toast.success(res.data?.message || "Release updated");
      onSaved?.();
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update release"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Edit Release</h3>
          <button type="button" onClick={onClose} className="cursor-pointer p-1 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div>
          <label className={labelCls}>Release Title *</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={fieldCls} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Label</label>
            <input value={form.record_label} onChange={(e) => setForm({ ...form, record_label: e.target.value })} className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>UPC</label>
            <input value={form.upc} onChange={(e) => setForm({ ...form, upc: e.target.value })} className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Release Date</label>
            <input type="date" value={form.release_date} onChange={(e) => setForm({ ...form, release_date: e.target.value })} className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Territory</label>
            <select value={form.territory} onChange={(e) => setForm({ ...form, territory: e.target.value })} className={fieldCls + " cursor-pointer"}>
              {TERRITORIES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Genre</label>
            <select value={form.genre_id} onChange={(e) => setForm({ ...form, genre_id: e.target.value })} className={fieldCls + " cursor-pointer"}>
              <option value="">— unchanged —</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Sub-genre</label>
            <select value={form.sub_genre_id} onChange={(e) => setForm({ ...form, sub_genre_id: e.target.value })} className={fieldCls + " cursor-pointer"}>
              <option value="">— unchanged —</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Copyright of Recording</label>
          <textarea
            value={form.copyright_of_recording}
            onChange={(e) => setForm({ ...form, copyright_of_recording: e.target.value })}
            rows={2}
            className={fieldCls}
          />
        </div>
        <div>
          <label className={labelCls}>Copyright of Release</label>
          <textarea
            value={form.copyright_of_release}
            onChange={(e) => setForm({ ...form, copyright_of_release: e.target.value })}
            rows={2}
            className={fieldCls}
          />
        </div>

        <div>
          <label className={labelCls}>Cover Artwork (optional — replaces current)</label>
          <div className="mt-1 flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 shrink-0">
              {artworkPreview ? (
                <img src={artworkPreview} alt="Artwork" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <ImagePlus size={20} />
                </div>
              )}
            </div>
            <label className="cursor-pointer text-sm font-semibold text-orange-600 underline underline-offset-2">
              Choose file
              <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => handleArtwork(e.target.files[0] || null)} />
            </label>
            {artwork && (
              <button
                type="button"
                onClick={() => handleArtwork(null)}
                className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="cursor-pointer flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl text-sm font-medium">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

EditReleaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  release: PropTypes.object,
  onSaved: PropTypes.func,
};
