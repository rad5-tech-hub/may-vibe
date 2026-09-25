import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Pencil, Music2, Calendar, Eye, ImagePlus } from "lucide-react";
import userApi from "../../../../utils/userApi";
import { getErrorMessage } from "../../../../utils/errorHelper";

const ALBUM_TYPES = ["audio_album", "video_album"];
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const compressImage = (file, maxDim = 1024, quality = 0.8) =>
  new Promise((resolve) => {
    if (!file.type.startsWith("image/")) return resolve(file);
    if (file.size <= MAX_FILE_BYTES) return resolve(file);
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const s = Math.min(maxDim / width, maxDim / height);
        width *= s; height *= s;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return resolve(file);
        resolve(new File([blob], file.name, { type: "image/jpeg" }));
      }, "image/jpeg", quality);
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });

export default function AlbumsTab() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genresLoading, setGenresLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    type: "audio_album",
    artiste_name: "",
    description: "",
    genre_id: "",
    date_released: "",
  });
  const [artworkFile, setArtworkFile] = useState(null);
  const [artworkPreview, setArtworkPreview] = useState("");
  const artworkPreviewRef = useRef("");

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
    setArtworkFile(file);
  };

  useEffect(() => () => { if (artworkPreviewRef.current?.startsWith("blob:")) URL.revokeObjectURL(artworkPreviewRef.current); }, []);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await userApi.get("/album/my-albums");
      setAlbums(res.data.data || res.data || []);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load albums"));
    } finally { setLoading(false); }
  };

  const fetchGenres = async () => {
    try {
      const res = await userApi.get("/genre/all-genres");
      const list = res.data.data || res.data.genres || res.data || [];
      setGenres(Array.isArray(list) ? list : []);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load genres"));
    } finally { setGenresLoading(false); }
  };

  useEffect(() => { fetchAlbums(); fetchGenres(); }, []);

  const resetForm = () => {
    setForm({ name: "", type: "audio_album", artiste_name: "", description: "", genre_id: "", date_released: "" });
    handleArtworkChange(null);
    setEditing(null);
  };

  const openEdit = (album) => {
    setEditing(album);
    setForm({
      name: album.name || "",
      type: album.type || "audio_album",
      artiste_name: album.artiste_name || "",
      description: album.description || "",
      genre_id: album.genre_id || "",
      date_released: album.date_released ? album.date_released.slice(0, 10) : "",
    });
    handleArtworkChange(null);
    if (album.artwork_url) { setArtworkPreview(album.artwork_url); artworkPreviewRef.current = album.artwork_url; }
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Album name is required");
    if (!form.type) return toast.error("Type is required");
    if (!editing && !artworkFile) return toast.error("Artwork is required");
    if (artworkFile && artworkFile.size > 40 * 1024 * 1024) return toast.error("Artwork must be ≤ 40 MB. Choose a smaller file.");

    let fileToSend = artworkFile;
    if (artworkFile && artworkFile.size > MAX_FILE_BYTES) {
      toast.message("Compressing image...");
      fileToSend = await compressImage(artworkFile);
    }

    const fd = new FormData();
    fd.append("name", form.name.trim());
    if (!editing) fd.append("type", form.type);
    if (form.artiste_name) fd.append("artiste_name", form.artiste_name);
    if (form.description) fd.append("description", form.description);
    if (form.genre_id) fd.append("genre_id", form.genre_id);
    if (form.date_released) fd.append("date_released", form.date_released);
    if (fileToSend) fd.append("artwork", fileToSend);

    setSubmitting(true);
    try {
      if (editing) {
        await userApi.patch(`/album/${editing.id}`, fd);
        toast.success("Album updated");
      } else {
        await userApi.post("/album/create", fd);
        toast.success("Album created");
      }
      setShowForm(false);
      resetForm();
      fetchAlbums();
    } catch (err) {
      if (err.response?.status === 413) toast.error("File too large (413). Try a smaller artwork (<5 MB). Server limit exceeded.");
      else toast.error(getErrorMessage(err, "Failed to save album"));
    } finally { setSubmitting(false); }
  };



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">My Albums</h2>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition">
          {showForm ? "Close" : "+ New Album"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-6 lg:p-8 space-y-5 border border-gray-200">
          <h3 className="font-bold text-gray-900">{editing ? "Edit Album" : "Create Album"}</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-medium text-gray-600">Album Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. My Album" className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Type *</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none">
                {ALBUM_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Artiste Name</label>
              <input value={form.artiste_name} onChange={e => setForm({ ...form, artiste_name: e.target.value })} placeholder="e.g Joy" className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Genre</label>
              <select value={form.genre_id} onChange={e => setForm({ ...form, genre_id: e.target.value })} className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none">
                <option value="">{genresLoading ? "Loading genres..." : "Select genre"}</option>
                {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Release Date (YYYY-MM-DD)</label>
              <input type="date" value={form.date_released} onChange={e => setForm({ ...form, date_released: e.target.value })} className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="e.g. My awesome album" className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
          </div>

          {/* Artwork — block layout, large clickable preview + requirements */}
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
              <span className="text-xs text-gray-500 truncate max-w-[220px]">{artworkFile?.name || (editing?.artwork_url ? "Current artwork" : "No file chosen")}{artworkFile ? ` (${(artworkFile.size/1024/1024).toFixed(2)} MB)` : ""}</span>
              {(artworkFile || editing?.artwork_url) && <button type="button" onClick={() => handleArtworkChange(null)} className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full">Remove</button>}
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
            <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition">Cancel</button>
            <button disabled={submitting} className="flex-1 cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition">
              {submitting ? "Saving..." : editing ? "Update Album" : "Create Album"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading albums...</div>
      ) : albums.length === 0 ? (
        <div className="bg-gray-50 rounded-3xl p-12 text-center border border-dashed border-gray-300">
          <Music2 className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-gray-600 font-medium">No albums yet</p>
          <p className="text-sm text-gray-400">Create your first album to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {albums.map(album => (
            <div key={album.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={album.artwork_url || "https://via.placeholder.com/400x400?text=No+Artwork"} alt={album.name} className="w-full h-48 object-cover" />
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">{album.name}</h3>
                    <p className="text-xs text-gray-500">{album.artiste_name} • {album.type?.replace(/_/g, " ")} {album.genre?.name ? `• ${album.genre.name}` : ""}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{album.description || "No description"}</p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={12} />{album.date_released?.slice(0,10) || "—"}</span>
                  <span className="flex items-center gap-1"><Eye size={12} />{album.no_of_views} views</span>
                  <span className="flex items-center gap-1"><Music2 size={12} />{album.no_of_plays} plays</span>
                  {album.tracks?.length ? <span>{album.tracks.length} tracks</span> : null}
                </div>
                {album.tracks?.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Tracks ({album.tracks.length})</p>
                    <ul className="text-xs text-gray-600 space-y-1 max-h-20 overflow-y-auto">
                      {album.tracks.map(t => <li key={t.id || t.name} className="truncate">• {t.name || t.title}</li>)}
                    </ul>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Link to={`/dashboard/albums/${album.id}`} className="flex-1 flex items-center justify-center gap-1 bg-white border border-gray-200 hover:bg-gray-50 py-2 rounded-xl text-xs font-medium transition"><Eye size={14} /> View details</Link>
                  <button onClick={() => openEdit(album)} className="flex-1 flex items-center justify-center gap-1 bg-gray-900 hover:bg-black text-white py-2 rounded-xl text-xs font-medium transition"><Pencil size={14} /> Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
