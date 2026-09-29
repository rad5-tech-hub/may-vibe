import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, Calendar, Disc3 } from "lucide-react";
import { toast } from "sonner";
import userApi from "../../../utils/userApi";
import { getErrorMessage } from "../../../utils/errorHelper";
import { LANGUAGES } from "../../../utils/languages";

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

export default function TrackDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({ name: "", artiste_name: "", featuring_artiste: "", description: "", date_released: "", language: "", languageOther: "" });
  const [files, setFiles] = useState({ file: null, artwork: null });
  const [artworkPreview, setArtworkPreview] = useState("");
  const artworkPreviewRef = useRef("");

  useEffect(() => {
    const fetch = async () => {
      try {
        try { const r = await userApi.get(`/track/${id}`); setTrack(r.data.data || r.data); }
        catch { const r = await userApi.get("/track/my-tracks"); const list = r.data.data || r.data || []; setTrack(list.find(t=>t.id===id)||null); }
      } catch (err) { toast.error(getErrorMessage(err,"Failed to load track")); } finally { setLoading(false); }
    };
    fetch();
  }, [id]);

  useEffect(()=>{ if(track){ const known = LANGUAGES.includes(track.language); setForm({ name: track.name||"", artiste_name: track.artiste_name||"", featuring_artiste: track.featuring_artiste||"", description: track.description||"", date_released: track.date_released?.slice(0,10)||"", language: track.language ? (known ? track.language : "Other") : "", languageOther: track.language && !known ? track.language : "" }); } },[track]);

  useEffect(() => () => { if (artworkPreviewRef.current?.startsWith("blob:")) URL.revokeObjectURL(artworkPreviewRef.current); }, []);

  const handleArtworkChange = (file) => {
    if (artworkPreviewRef.current?.startsWith("blob:")) URL.revokeObjectURL(artworkPreviewRef.current);
    if (file) { const url = URL.createObjectURL(file); artworkPreviewRef.current = url; setArtworkPreview(url); }
    else { artworkPreviewRef.current = ""; setArtworkPreview(track?.artwork_url || ""); }
    setFiles(prev => ({ ...prev, artwork: file }));
  };

  const handleEdit = async (e)=>{
    e.preventDefault();
    const fd=new FormData();
    fd.append("name",form.name);
    if(form.artiste_name) fd.append("artiste_name",form.artiste_name);
    if(form.featuring_artiste) fd.append("featuring_artiste",form.featuring_artiste);
    if(form.description) fd.append("description",form.description);
    if(form.date_released) fd.append("date_released",form.date_released);
    const language = form.language === "Other" ? form.languageOther.trim() : form.language;
    if(language) fd.append("language",language);
    if(files.file) fd.append("file",files.file);
    if(files.artwork) fd.append("artwork",files.artwork);
    try{ await userApi.patch(`/track/${id}`,fd); toast.success("Track updated"); setShowEdit(false); const r=await userApi.get("/track/my-tracks"); const list=r.data.data||r.data||[]; setTrack(list.find(t=>t.id===id)||track); } catch(err){ toast.error(getErrorMessage(err,"Update failed")); }
  };

  const handleDelete = async ()=>{
    setDeleting(true);
    try{ await userApi.delete(`/track/${id}`); toast.success("Track deleted"); navigate("/dashboard/music-upload?tab=tracks"); } catch(err){ toast.error(getErrorMessage(err,"Delete failed")); setDeleting(false); }
  };

  if(loading) return <div className="py-20 text-center text-gray-500">Loading...</div>;
  if(!track) return <div className="py-20 text-center"><p className="text-gray-600">Track not found</p><Link to="/dashboard/music-upload?tab=tracks" className="cursor-pointer text-orange-600 text-sm">Back</Link></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/dashboard/music-upload?tab=tracks" className="cursor-pointer inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"><ArrowLeft size={16}/> Back to tracks</Link>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{track.name}</h1>
        <button onClick={()=>setShowEdit(true)} className="cursor-pointer inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold"><Pencil size={16}/> Edit</button>
      </div>

      <Section title="General">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-gray-500">Name</dt><dd className="font-medium text-gray-900">{track.name}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Type</dt><dd>{track.type?.replace(/_/g," ")}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Artiste</dt><dd>{track.artiste_name||"—"}</dd></div>
          {track.featuring_artiste && <div className="flex justify-between"><dt className="text-gray-500">Featuring</dt><dd>{track.featuring_artiste}</dd></div>}
          <div className="flex justify-between"><dt className="text-gray-500">Language</dt><dd>{track.language||"—"}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Slug</dt><dd className="font-mono text-xs">{track.slug}</dd></div>
        </dl>
      </Section>

      <Section title="Media">
        <img src={track.artwork_url || track.album?.artwork_url || "https://via.placeholder.com/600x600?text=No+Artwork"} alt={track.name} className="w-full max-w-sm rounded-2xl border object-cover mb-4" />
        {track.file_url ? (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Audio preview</p>
            <audio controls src={track.file_url} className="w-full" />
          </div>
        ) : (
          <p className="text-xs text-gray-400 mb-4">No audio file available.</p>
        )}
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-gray-500">File</dt><dd className="truncate max-w-xs text-xs">{track.file_url || "—"}</dd></div>
          {track.album && <div className="flex justify-between"><dt className="text-gray-500">Album</dt><dd className="flex items-center gap-1 text-orange-600"><Disc3 size={12}/>{track.album.name}</dd></div>}
        </dl>
      </Section>

      <Section title="Details">
        <dl className="space-y-3 text-sm">
          <div><dt className="text-gray-500">Description</dt><dd className="text-gray-900 mt-1">{track.description||"—"}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Genre</dt><dd>{track.genre?.name||track.genre_id||"—"}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Release</dt><dd className="flex items-center gap-1"><Calendar size={12}/>{track.date_released?.slice(0,10)||"—"}</dd></div>
        </dl>
      </Section>

      <Section title="Danger zone" description="Delete this track permanently." danger>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-gray-900">Delete this track</p><p className="text-xs text-gray-500">This cannot be undone.</p></div>
          <button onClick={()=>setShowDelete(true)} className="cursor-pointer bg-white border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"><Trash2 size={14}/> Delete track</button>
        </div>
      </Section>

      {showDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-lg">Delete track?</h3>
            <p className="text-sm text-gray-600">Are you sure you want to delete <span className="font-semibold">{track.name}</span>?</p>
            <div className="flex gap-3"><button onClick={()=>setShowDelete(false)} className="cursor-pointer flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl text-sm font-medium">Cancel</button><button onClick={handleDelete} disabled={deleting} className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold">{deleting?"Deleting...":"Delete"}</button></div>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleEdit} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg">Edit track</h3>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" placeholder="Name" />
            <input value={form.artiste_name} onChange={e=>setForm({...form,artiste_name:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" placeholder="Artiste" />
            <input value={form.featuring_artiste} onChange={e=>setForm({...form,featuring_artiste:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" placeholder="Featuring" />
            <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" placeholder="Description" />
            <input type="date" value={form.date_released} onChange={e=>setForm({...form,date_released:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
            <select value={form.language} onChange={e=>setForm({...form,language:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer">
              <option value="">What language is your release title in?</option>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            {form.language === "Other" && (
              <input value={form.languageOther} onChange={e=>setForm({...form,languageOther:e.target.value})} placeholder="Please specify the language" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
            )}
            {[
              {key:"file",label:"Audio",accept:"audio/*"},
              {key:"artwork",label:"Artwork",accept:"image/*"},
            ].map(item=>(
              <div key={item.key}><label className="text-xs font-medium text-gray-600">{item.label}</label><div className="mt-1 flex items-center gap-2"><label className="cursor-pointer text-sm font-semibold text-orange-600 underline">Choose file<input type="file" accept={item.accept} onChange={e=> item.key==="artwork" ? handleArtworkChange(e.target.files[0]||null) : setFiles({...files,[item.key]:e.target.files[0]||null})} className="hidden"/></label><span className="text-xs text-gray-500">{item.key==="artwork" ? (files.artwork?.name || "No file chosen") : (files.file?.name || "No file chosen")}</span>{(files[item.key] || (item.key==="artwork" && artworkPreview)) && <button type="button" onClick={()=> item.key==="artwork" ? handleArtworkChange(null) : setFiles({...files,[item.key]:null})} className="cursor-pointer text-xs bg-gray-100 px-2 py-1 rounded-full">Remove</button>}</div></div>
            ))}
            {artworkPreview && <img src={artworkPreview} alt="Artwork preview" className="w-full max-w-xs rounded-2xl border object-cover" />}
            <div className="flex gap-3"><button type="button" onClick={()=>setShowEdit(false)} className="cursor-pointer flex-1 bg-gray-100 py-3 rounded-xl text-sm font-medium">Cancel</button><button type="submit" className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-semibold">Save</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
