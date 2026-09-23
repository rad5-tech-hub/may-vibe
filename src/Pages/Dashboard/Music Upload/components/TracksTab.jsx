import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Upload, Music2, Pencil, Calendar, Disc3, Eye, PlayCircle, ImagePlus } from "lucide-react";
import userApi from "../../../../utils/userApi";
import { getErrorMessage } from "../../../../utils/errorHelper";
import { LANGUAGES } from "../../../../utils/languages";

const TRACK_TYPES = ["audio_track", "video_track", "audio_album_track", "video_album_track"];
const MAX_IMG_BYTES = 5 * 1024 * 1024;
const MAX_AUDIO_BYTES = 40 * 1024 * 1024;
const MAX_TOTAL_BYTES = 80 * 1024 * 1024;

const compressImage = (file, maxDim = 1400, quality = 0.85) =>
  new Promise((resolve) => {
    if (!file.type.startsWith("image/") || file.size <= MAX_IMG_BYTES) return resolve(file);
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDim || height > maxDim) { const s = Math.min(maxDim/width, maxDim/height); width *= s; height *= s; }
      const c = document.createElement("canvas"); c.width = width; c.height = height;
      c.getContext("2d").drawImage(img,0,0,width,height);
      c.toBlob((blob)=> blob ? resolve(new File([blob], file.name, {type:"image/jpeg"})) : resolve(file), "image/jpeg", quality);
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });

export default function TracksTab() {
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genresLoading, setGenresLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [releaseFor, setReleaseFor] = useState(null);
  const [releaseData, setReleaseData] = useState({
    record_label: "",
    release_date: "",
    songwriter: "",
    explicit_lyrics: false,
    lyrics: "",
  });

  const [form, setForm] = useState({
    name: "", type: "audio_track", artiste_name: "", description: "",
    featuring_artiste: "", date_released: "", genre_id: "", album_id: "", language: "", languageOther: "",
  });
  const [files, setFiles] = useState({ file: null, artwork: null });
  const [audioPreview, setAudioPreview] = useState("");
  const [artworkPreview, setArtworkPreview] = useState("");
  const audioPreviewRef = useRef("");
  const artworkPreviewRef = useRef("");

  const fetchTracks = async () => {
    setLoading(true);
    try {
      const res = await userApi.get("/track/my-tracks");
      setTracks(res.data.data || res.data || []);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load tracks"));
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchTracks();
    userApi.get("/album/my-albums?for=track").then(res => {
      const data = res.data.data || res.data || [];
      setAlbums(Array.isArray(data) ? data : []);
    }).catch(() => {});
    userApi.get("/genre/all-genres").then(res => {
      const list = res.data.data || res.data.genres || res.data || [];
      setGenres(Array.isArray(list) ? list : []);
    }).catch((err) => toast.error(getErrorMessage(err, "Failed to load genres"))).finally(() => setGenresLoading(false));
  }, []);

  const revokePreviews = () => {
    if (audioPreviewRef.current) URL.revokeObjectURL(audioPreviewRef.current);
    if (artworkPreviewRef.current) URL.revokeObjectURL(artworkPreviewRef.current);
    audioPreviewRef.current = ""; artworkPreviewRef.current = "";
    setAudioPreview(""); setArtworkPreview("");
  };

  const resetForm = () => {
    setForm({ name: "", type: "audio_track", artiste_name: "", description: "", featuring_artiste: "", date_released: "", genre_id: "", album_id: "", language: "", languageOther: "" });
    setFiles({ file: null, artwork: null });
    revokePreviews();
    setEditing(null);
  };

  const openEdit = (t) => {
    setEditing(t);
    const knownLanguage = LANGUAGES.includes(t.language);
    setForm({
      name: t.name || "", type: t.type || "audio_track", artiste_name: t.artiste_name || "",
      description: t.description || "", featuring_artiste: t.featuring_artiste || "",
      date_released: t.date_released ? t.date_released.slice(0,10) : "",
      genre_id: t.genre_id || "", album_id: t.album_id || "",
      language: t.language ? (knownLanguage ? t.language : "Other") : "",
      languageOther: t.language && !knownLanguage ? t.language : "",
    });
    setFiles({ file: null, artwork: null });
    revokePreviews();
    if (t.file_url) { setAudioPreview(t.file_url); audioPreviewRef.current = t.file_url; }
    if (t.artwork_url) { setArtworkPreview(t.artwork_url); artworkPreviewRef.current = t.artwork_url; }
    setShowForm(true);
  };

  const handleAudioChange = (file) => {
    if (audioPreviewRef.current && audioPreviewRef.current.startsWith("blob:")) URL.revokeObjectURL(audioPreviewRef.current);
    if (file) {
      const url = URL.createObjectURL(file);
      audioPreviewRef.current = url;
      setAudioPreview(url);
    } else {
      audioPreviewRef.current = "";
      setAudioPreview("");
    }
    setFiles(prev => ({ ...prev, file }));
  };

  const handleArtworkChange = (file) => {
    if (artworkPreviewRef.current && artworkPreviewRef.current.startsWith("blob:")) URL.revokeObjectURL(artworkPreviewRef.current);
    if (file) {
      const url = URL.createObjectURL(file);
      artworkPreviewRef.current = url;
      setArtworkPreview(url);
    } else {
      artworkPreviewRef.current = "";
      setArtworkPreview("");
    }
    setFiles(prev => ({ ...prev, artwork: file }));
  };

  useEffect(() => () => revokePreviews(), []);

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Track name is required");
    if (files.file && files.file.size > MAX_AUDIO_BYTES) return toast.error(`Audio must be ≤ 40 MB (selected ${(files.file.size/1024/1024).toFixed(2)} MB)`);
    if (files.artwork && files.artwork.size > 40 * 1024 * 1024) return toast.error(`Artwork must be ≤ 40 MB`);
    const total = (files.file?.size||0)+(files.artwork?.size||0);
    if (total > MAX_TOTAL_BYTES) return toast.error(`Total upload size ${(total/1024/1024).toFixed(1)} MB exceeds the 80 MB limit.`);
    let artwork = files.artwork;
    if (artwork && artwork.size > MAX_IMG_BYTES) { toast.message("Compressing artwork..."); artwork = await compressImage(artwork); }
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("type", form.type);
    if (form.artiste_name) fd.append("artiste_name", form.artiste_name);
    if (form.description) fd.append("description", form.description);
    if (form.featuring_artiste) fd.append("featuring_artiste", form.featuring_artiste);
    if (form.date_released) fd.append("date_released", form.date_released);
    if (form.genre_id) fd.append("genre_id", form.genre_id);
    if (form.album_id) fd.append("album_id", form.album_id);
    const language = form.language === "Other" ? form.languageOther.trim() : form.language;
    if (language) fd.append("language", language);
    if (files.file) fd.append("file", files.file);
    if (artwork) fd.append("artwork", artwork);

    setSubmitting(true);
    try {
      if (editing) {
        await userApi.patch(`/track/${editing.id}`, fd);
        toast.success("Track updated");
      } else {
        await userApi.post("/track/post", fd);
        toast.success("Track created");
      }
      resetForm();
      setShowForm(false);
      fetchTracks();
    } catch (err) {
      if (err.response?.status === 413) toast.error("Server rejected: payload too large (413). Keep total under 80 MB.");
      else toast.error(getErrorMessage(err, editing ? "Update failed" : "Failed to create track"));
    } finally { setSubmitting(false); }
  };

  const handleRelease = async (e) => {
    e.preventDefault();
    if (!releaseFor) return;
    try {
      await userApi.post("/release/single", {
        track_id: releaseFor.id, record_label: releaseData.record_label,
        release_date: releaseData.release_date, songwriter: releaseData.songwriter,
        explicit_lyrics: releaseData.explicit_lyrics, lyrics: releaseData.lyrics,
      });
      toast.success("Release created successfully.");
      setReleaseFor(null);
    } catch (err) { toast.error(getErrorMessage(err, "Release failed")); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">My Tracks</h2>
        <button onClick={() => { if (showForm) resetForm(); setShowForm(!showForm); }} className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition">
          {showForm ? "Close" : "+ New Track"}
        </button>
      </div>

      {showForm && (
      <form onSubmit={handleTrackSubmit} className="bg-gray-50 rounded-3xl p-6 lg:p-8 space-y-5 border border-gray-200">
        <h3 className="font-bold text-gray-900">{editing ? "Edit Track" : "Create Track"}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-medium text-gray-600">Track Name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g Candor" className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Type</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer">
              {TRACK_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Artiste Name</label>
            <input value={form.artiste_name} onChange={e => setForm({ ...form, artiste_name: e.target.value })} placeholder="e.g Joy" className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Featuring Artiste</label>
            <input value={form.featuring_artiste} onChange={e => setForm({ ...form, featuring_artiste: e.target.value })} placeholder="e.g Artiste name" className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Album {form.type.includes("album") ? "*" : "(optional)"}</label>
            <select value={form.album_id} onChange={e => setForm({ ...form, album_id: e.target.value })} className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer">
              <option value="">Single (no album)</option>
              {albums.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Genre</label>
              <select value={form.genre_id} onChange={e => setForm({ ...form, genre_id: e.target.value })} className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer">
                <option value="">{genresLoading ? "Loading genres..." : "Select genre"}</option>
                {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Language</label>
            <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer">
              <option value="">What language is your release title in?</option>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            {form.language === "Other" && (
              <input value={form.languageOther} onChange={e => setForm({ ...form, languageOther: e.target.value })} placeholder="Please specify the language" className="mt-2 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400" />
            )}
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Release Date (YYYY-MM-DD)</label>
            <input type="date" value={form.date_released} onChange={e => setForm({ ...form, date_released: e.target.value })} className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600">Description</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} placeholder="e.g. My awesome track" className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
        </div>

        {/* Audio file — block layout with playable preview */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <PlayCircle size={18} className="text-orange-500" />
            <label className="text-sm font-semibold text-gray-800">Audio File</label>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <label className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-700 underline underline-offset-2">
              Choose audio file
              <input type="file" accept="audio/*" onChange={e => handleAudioChange(e.target.files[0] || null)} className="hidden" />
            </label>
            <span className="text-xs text-gray-500 truncate max-w-[220px]">{files.file?.name || (editing?.file_url ? "Current file" : "No file chosen")}{files.file ? ` (${(files.file.size/1024/1024).toFixed(2)} MB)` : ""}</span>
            {(files.file || editing?.file_url) && <button type="button" onClick={() => handleAudioChange(null)} className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full">Remove</button>}
          </div>
          {audioPreview && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Preview — play to confirm this is the correct song</p>
              <audio controls src={audioPreview} className="w-full" />
            </div>
          )}
          <p className="text-[11px] text-gray-400 mt-3">Accepted formats: MP3, WAV, M4A. Max 40 MB.</p>
        </div>

        {/* Artwork — block layout, large preview + requirements */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <ImagePlus size={18} className="text-orange-500" />
            <label className="text-sm font-semibold text-gray-800">Cover Artwork {editing ? "" : "*"}</label>
          </div>
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <label className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-700 underline underline-offset-2">
              Choose file
              <input type="file" accept="image/*" onChange={e => handleArtworkChange(e.target.files[0] || null)} className="hidden" />
            </label>
            <span className="text-xs text-gray-500 truncate max-w-[220px]">{files.artwork?.name || (editing?.artwork_url ? "Current artwork" : "No file chosen")}{files.artwork ? ` (${(files.artwork.size/1024/1024).toFixed(2)} MB)` : ""}</span>
            {(files.artwork || editing?.artwork_url) && <button type="button" onClick={() => handleArtworkChange(null)} className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full">Remove</button>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <label className="cursor-pointer w-full max-w-sm mx-auto md:mx-0 block group">
              <input type="file" accept="image/*" onChange={e => handleArtworkChange(e.target.files[0] || null)} className="hidden" />
              {artworkPreview ? (
                <img src={artworkPreview} alt="Cover art preview" className="w-full aspect-square rounded-2xl object-cover border border-gray-200 group-hover:opacity-90 transition" />
              ) : (
                <div className="w-full aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 group-hover:border-orange-300 group-hover:text-orange-400 transition">
                  <ImagePlus size={40} />
                  <p className="text-xs mt-2">Click to select artwork</p>
                </div>
              )}
            </label>

            <div className="text-sm text-gray-600">
              <p className="font-semibold text-gray-800 mb-2">Cover art requirements:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your cover art should be a square <span className="font-medium">.jpg</span> or <span className="font-medium">.png</span> file, at least 1400x1400 px (3000x3000 px recommended).</li>
                <li>Make sure it&apos;s clear and high-quality — no blurry or pixelated images.</li>
                <li>You can include the artist name, the release title, or both — but no other text, logos, or social media handles.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="cursor-pointer flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition">Cancel</button>
          <button disabled={submitting} className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
            <Upload size={16} /> {submitting ? (editing ? "Updating..." : "Creating...") : editing ? "Update Track" : "Create Track"}
          </button>
        </div>
      </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading tracks...</div>
      ) : tracks.length === 0 ? (
        <div className="bg-gray-50 rounded-3xl p-10 text-center border border-dashed border-gray-300">
          <Music2 className="mx-auto text-gray-300 mb-2" size={36} />
          <p className="text-sm text-gray-500">No tracks yet. Click + New Track to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tracks.map(t => (
            <div key={t.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={t.artwork_url || t.album?.artwork_url || "https://via.placeholder.com/400x400?text=No+Artwork"} alt={t.name} className="w-full h-48 object-cover" />
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{t.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{t.artiste_name} • {t.type?.replace(/_/g," ")} {t.genre?.name ? `• ${t.genre.name}` : ""}</p>
                    {t.album && <p className="text-xs text-orange-600 flex items-center gap-1 truncate"><Disc3 size={12} />{t.album.name}</p>}
                  </div>
                  {t.language && <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full shrink-0">{t.language}</span>}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{t.description || "No description"}</p>
                {t.featuring_artiste && <p className="text-xs text-gray-500">Ft: {t.featuring_artiste}</p>}
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={12} />{t.date_released?.slice(0,10) || "—"}</span>
                  <span className="flex items-center gap-1"><Eye size={12} />{t.no_of_views} views</span>
                  <span className="flex items-center gap-1"><Music2 size={12} />{t.no_of_plays} plays</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link to={`/dashboard/tracks/${t.id}`} className="cursor-pointer flex-1 flex items-center justify-center gap-1 bg-white border border-gray-200 hover:bg-gray-50 py-2 rounded-xl text-xs font-medium"><Eye size={14} /> View details</Link>
                  <button onClick={() => openEdit(t)} className="cursor-pointer flex-1 flex items-center justify-center gap-1 bg-gray-900 hover:bg-black text-white py-2 rounded-xl text-xs font-medium"><Pencil size={14} /> Edit</button>
                </div>
                <button onClick={() => setReleaseFor(t)} className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl text-xs font-semibold">Release</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {releaseFor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleRelease} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg">Release Track</h3>
            <p className="text-xs text-gray-500">Track: {releaseFor.name} • {releaseFor.id}</p>
            <div><label className="text-xs font-medium text-gray-600">Record Label</label><input value={releaseData.record_label} onChange={e => setReleaseData({ ...releaseData, record_label: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" /></div>
            <div><label className="text-xs font-medium text-gray-600">Release Date</label><input type="date" value={releaseData.release_date} onChange={e => setReleaseData({ ...releaseData, release_date: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" /></div>
            <div><label className="text-xs font-medium text-gray-600">Songwriter</label><input value={releaseData.songwriter} onChange={e => setReleaseData({ ...releaseData, songwriter: e.target.value })} placeholder="Dawn, Shawn" className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" /></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={releaseData.explicit_lyrics} onChange={e => setReleaseData({ ...releaseData, explicit_lyrics: e.target.checked })} className="w-4 h-4 accent-orange-500" /><span className="text-sm">Explicit lyrics</span></div>
            <div><label className="text-xs font-medium text-gray-600">Lyrics</label><textarea value={releaseData.lyrics} onChange={e => setReleaseData({ ...releaseData, lyrics: e.target.value })} rows={4} placeholder="Verse 1..." className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" /></div>
            <div className="flex gap-3"><button type="button" onClick={() => setReleaseFor(null)} className="cursor-pointer flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl text-sm font-medium">Cancel</button><button type="submit" className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-semibold">Release</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
