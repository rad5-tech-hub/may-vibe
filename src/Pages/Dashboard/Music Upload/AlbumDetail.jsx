import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, Calendar, Eye, Music2, Download } from "lucide-react";
import { toast } from "sonner";
import userApi from "../../../utils/userApi";
import { getErrorMessage } from "../../../utils/errorHelper";

const formatPriceDisplay = (value) => {
  if (value == null || value === "") return "";
  const num = Number(String(value).replace(/,/g, ""));
  if (isNaN(num)) return String(value);
  return num.toLocaleString("en-US");
};
const formatPriceInput = (value) => {
  const digits = String(value).replace(/[^0-9]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
};
const stripCommas = (value) => String(value).replace(/,/g, "");

function Section({ title, description, children, danger }) {
  return (
    <div className={`bg-white rounded-2xl border ${danger ? "border-red-200" : "border-gray-200"} overflow-hidden`}>
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className={`text-sm font-bold ${danger ? "text-red-600" : "text-gray-900"}`}>{title}</h3>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
  danger: PropTypes.bool,
};

export default function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({ name: "", artiste_name: "", description: "", date_released: "", payment_type: "paid", price: "" });
  const [artworkFile, setArtworkFile] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Try direct, fallback to list search
        try {
          const res = await userApi.get(`/album/${id}`);
          setAlbum(res.data.data || res.data);
        } catch {
          const res = await userApi.get("/album/my-albums");
          const list = res.data.data || res.data || [];
          setAlbum(list.find(a => a.id === id) || null);
        }
      } catch (err) {
        toast.error(getErrorMessage(err, "Failed to load album"));
      } finally { setLoading(false); }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    if (album) setForm({
      name: album.name || "", artiste_name: album.artiste_name || "",
      description: album.description || "", date_released: album.date_released?.slice(0,10) || "",
      payment_type: album.payment_type || "paid", price: album.price ? formatPriceInput(String(album.price).replace(/\.00$/,"")) : "",
    });
  }, [album]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    if (form.artiste_name) fd.append("artiste_name", form.artiste_name);
    if (form.description) fd.append("description", form.description);
    if (form.date_released) fd.append("date_released", form.date_released);
    fd.append("payment_type", form.payment_type);
    if (form.price) fd.append("price", stripCommas(form.price));
    if (artworkFile) fd.append("artwork", artworkFile);
    try {
      await userApi.patch(`/album/${id}`, fd);
      toast.success("Album updated");
      setShowEdit(false);
      const res = await userApi.get("/album/my-albums");
      const list = res.data.data || res.data || [];
      setAlbum(list.find(a => a.id === id) || album);
    } catch (err) { toast.error(getErrorMessage(err, "Update failed")); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await userApi.delete(`/album/${id}`);
      toast.success("Album deleted");
      navigate("/dashboard/music-upload?tab=albums");
    } catch (err) { toast.error(getErrorMessage(err, "Delete failed")); setDeleting(false); }
  };

  if (loading) return <div className="py-20 text-center text-gray-500">Loading...</div>;
  if (!album) return <div className="py-20 text-center"><p className="text-gray-600">Album not found</p><Link to="/dashboard/music-upload?tab=albums" className="text-orange-600 text-sm">Back</Link></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/dashboard/music-upload?tab=albums" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"><ArrowLeft size={16} /> Back to albums</Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{album.name}</h1>
        <button onClick={() => setShowEdit(true)} className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold"><Pencil size={16} /> Edit</button>
      </div>

      <Section title="General">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-gray-500">Name</dt><dd className="font-medium text-gray-900">{album.name}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Type</dt><dd className="font-medium">{album.type?.replace(/_/g," ")}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Artiste</dt><dd className="font-medium">{album.artiste_name || "—"}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Slug</dt><dd className="font-mono text-xs">{album.slug}</dd></div>
        </dl>
      </Section>

      <Section title="Artwork">
        <img src={album.artwork_url || "https://via.placeholder.com/600x600?text=No+Artwork"} alt={album.name} className="w-full max-w-sm rounded-2xl border object-cover" />
      </Section>

      <Section title="Details" description="Album metadata and distribution info">
        <dl className="space-y-3 text-sm">
          <div><dt className="text-gray-500">Description</dt><dd className="text-gray-900 mt-1">{album.description || "—"}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Genre</dt><dd>{album.genre?.name || album.genre_id || "—"}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Release date</dt><dd className="flex items-center gap-1"><Calendar size={12} />{album.date_released?.slice(0,10) || "—"}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Payment</dt><dd>{album.payment_type} {album.price ? `• ₦${formatPriceDisplay(album.price)}` : ""}</dd></div>
        </dl>
      </Section>

      <Section title="Stats">
        <div className="flex gap-6 text-sm">
          <span className="flex items-center gap-1"><Eye size={14} />{album.no_of_views} views</span>
          <span className="flex items-center gap-1"><Music2 size={14} />{album.no_of_plays} plays</span>
          <span className="flex items-center gap-1"><Download size={14} />{album.no_of_downloads} downloads</span>
        </div>
        {album.tracks?.length > 0 && (
          <div className="mt-4 bg-gray-50 rounded-xl p-3">
            <p className="text-xs font-semibold mb-2">Tracks ({album.tracks.length})</p>
            <ul className="text-sm space-y-1">{album.tracks.map(t => <li key={t.id || t.name} className="text-gray-700">• {t.name}</li>)}</ul>
          </div>
        )}
      </Section>

      <Section title="Danger zone" description="Delete this album permanently. This cannot be undone." danger>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-gray-900">Delete this album</p><p className="text-xs text-gray-500">Once deleted, all associated data will be removed.</p></div>
          <button onClick={() => setShowDelete(true)} className="bg-white border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"><Trash2 size={14} /> Delete album</button>
        </div>
      </Section>

      {showDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-lg">Delete album?</h3>
            <p className="text-sm text-gray-600">Are you sure you want to delete <span className="font-semibold">{album.name}</span>? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl text-sm font-medium">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold">{deleting ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleEdit} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg">Edit album</h3>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
            <input value={form.artiste_name} onChange={e=>setForm({...form,artiste_name:e.target.value})} placeholder="Artiste name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
            <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" placeholder="Description" />
            <input type="date" value={form.date_released} onChange={e=>setForm({...form,date_released:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
            <select value={form.payment_type} onChange={e=>setForm({...form,payment_type:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"><option value="paid">paid</option><option value="free">free</option></select>
            <input type="text" inputMode="numeric" value={form.price} onChange={e=>setForm({...form,price:formatPriceInput(e.target.value)})} placeholder="Price" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
            <div><label className="text-xs font-medium text-gray-600">Artwork</label><div className="mt-1 flex items-center gap-2"><label className="cursor-pointer text-sm font-semibold text-orange-600 underline">Choose file<input type="file" accept="image/*" onChange={e=>setArtworkFile(e.target.files[0]||null)} className="hidden" /></label><span className="text-xs text-gray-500">{artworkFile?.name || "No file chosen"}</span>{artworkFile && <button type="button" onClick={()=>setArtworkFile(null)} className="text-xs bg-gray-100 px-2 py-1 rounded-full">Remove</button>}</div></div>
            <div className="flex gap-3"><button type="button" onClick={()=>setShowEdit(false)} className="flex-1 bg-gray-100 py-3 rounded-xl text-sm font-medium">Cancel</button><button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-semibold">Save</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
