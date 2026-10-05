import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Search, UserPlus, X, Loader2, Check } from "lucide-react";
import userApi from "../../../../utils/userApi";
import { getErrorMessage } from "../../../../utils/errorHelper";
import { useReleaseWizard } from "../context/ReleaseWizardContext";

export function ContributorFormModal({ open, onClose, onCreated, title = "Add Contributor" }) {
  const [form, setForm] = useState({ stage_name: "", legal_name: "", bio: "", country: "", spotify_artist_id: "", apple_music_artist_id: "" });
  const [artwork, setArtwork] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setForm({ stage_name: "", legal_name: "", bio: "", country: "", spotify_artist_id: "", apple_music_artist_id: "" });
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.stage_name.trim()) return toast.error("Stage name is required");
    const fd = new FormData();
    fd.append(
      "metadata",
      JSON.stringify({
        stage_name: form.stage_name.trim(),
        legal_name: form.legal_name.trim() || null,
        bio: form.bio.trim() || null,
        country: form.country.trim() || null,
        image_url: null,
        spotify_artist_id: form.spotify_artist_id.trim() || null,
        spotify_artist_url: null,
        apple_music_artist_id: form.apple_music_artist_id.trim() || null,
        apple_music_artist_url: null,
      })
    );
    if (artwork) fd.append("artwork", artwork);
    setSaving(true);
    try {
      const res = await userApi.post("/contributors", fd);
      const data = res.data?.data || res.data || {};
      if (!data.id) throw new Error("Contributor created but no id returned");
      toast.success("Contributor added");
      onCreated(data);
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to add contributor"));
    } finally {
      setSaving(false);
    }
  };

  const field = (key, label, placeholder, type = "text") => (
    <div>
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">{title}</h3>
          <button type="button" onClick={onClose} className="cursor-pointer p-1 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
        </div>
        {field("stage_name", "Stage name *", "e.g. Nia Archives")}
        {field("legal_name", "Legal name", "e.g. Nia Imani Franklin")}
        <div>
          <label className="text-xs font-medium text-gray-600">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={2}
            placeholder="Producer and vocalist"
            className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"
          />
        </div>
        {field("country", "Country code (ISO)", "e.g. GB")}
        {field("spotify_artist_id", "Spotify artist ID", "e.g. 4Y3snJPTtH6KWSsXSjeLXi")}
        {field("apple_music_artist_id", "Apple Music artist ID", "e.g. 1440857781")}
        <div>
          <label className="text-xs font-medium text-gray-600">Photo</label>
          <div className="mt-1 flex items-center gap-2">
            <label className="cursor-pointer text-sm font-semibold text-orange-600 underline">
              Choose file
              <input type="file" accept="image/*" onChange={(e) => setArtwork(e.target.files[0] || null)} className="hidden" />
            </label>
            <span className="text-xs text-gray-500 truncate max-w-[200px]">{artwork?.name || "No file chosen"}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="cursor-pointer flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl text-sm font-medium">Cancel</button>
          <button type="submit" disabled={saving} className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? "Saving..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

ContributorFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreated: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default function ArtistSelect({ value, onChange, error }) {
  const { contributors, contributorsLoading, pushContributor } = useReleaseWizard();
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [namesById, setNamesById] = useState({});

  useEffect(() => {
    setNamesById((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const c of contributors) {
        const name = c.stage_name || c.legal_name;
        if (name && !next[c.id]) {
          next[c.id] = name;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [contributors]);

  const selected = value || [];
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visible = contributors.filter((c) => {
    const haystack = `${c.stage_name || ""} ${c.legal_name || ""}`.toLowerCase();
    return words.every((w) => haystack.includes(w));
  });

  const remember = (c) => {
    const name = c.stage_name || c.legal_name;
    if (name) setNamesById((prev) => (prev[c.id] ? prev : { ...prev, [c.id]: name }));
  };

  const toggle = (artist) => {
    remember(artist);
    if (selected.includes(artist.id)) onChange(selected.filter((x) => x !== artist.id));
    else onChange([...selected, artist.id]);
  };

  const removeArtist = (id) => onChange(selected.filter((x) => x !== id));

  const nameOf = (id) => namesById[id] || contributors.find((c) => c.id === id)?.stage_name || contributors.find((c) => c.id === id)?.legal_name || "Artist";

  return (
    <div className="space-y-2">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((id) => (
            <span key={id} className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-xs font-medium px-3 py-1.5 rounded-full">
              {nameOf(id)}
              <button type="button" onClick={() => removeArtist(id)} className="cursor-pointer hover:text-orange-900">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
        {contributorsLoading ? "Loading your artists..." : "Your artists — tap to select"}
      </p>
      <div className="border border-gray-200 rounded-xl bg-white divide-y divide-gray-100 max-h-52 overflow-y-auto">
        {contributorsLoading ? (
          <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" /> Loading artists...
          </div>
        ) : visible.length === 0 ? (
          <div className="px-4 py-3 text-sm text-gray-500">No artists found{query.trim() ? ` for “${query.trim()}”` : ""}.</div>
        ) : (
          visible.map((c) => {
            const isSelected = selected.includes(c.id);
            return (
              <button
                type="button"
                key={c.id}
                onClick={() => toggle(c)}
                className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-2 text-sm transition ${
                  isSelected ? "bg-orange-50 text-orange-700 font-semibold" : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span className="min-w-0">
                  <span className="block truncate">{c.stage_name || c.legal_name}</span>
                  {c.stage_name && c.legal_name && c.stage_name !== c.legal_name && (
                    <span className="block text-xs text-gray-500 truncate">{c.legal_name}</span>
                  )}
                </span>
                {isSelected ? <Check size={15} className="shrink-0 text-orange-600" /> : <UserPlus size={14} className="shrink-0 text-gray-300" />}
              </button>
            );
          })
        )}
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by word (e.g. John Doe)..."
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-orange-400"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700"
      >
        <UserPlus size={15} /> Add new artist
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <ContributorFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        title="Add New Artist"
        onCreated={(artist) => {
          remember(artist);
          pushContributor(artist);
          if (!selected.includes(artist.id)) onChange([...selected, artist.id]);
        }}
      />
    </div>
  );
}

ArtistSelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};
