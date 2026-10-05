import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Search, Plus, X, Loader2, FileSignature } from "lucide-react";
import userApi from "../../../../utils/userApi";
import { getErrorMessage } from "../../../../utils/errorHelper";
import { useReleaseWizard } from "../context/ReleaseWizardContext";

function SongwriterFormModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({ first_name: "", middle_name: "", last_name: "", ipi_number: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setForm({ first_name: "", middle_name: "", last_name: "", ipi_number: "" });
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim()) return toast.error("First and last name are required");
    if (form.first_name.length > 120 || form.last_name.length > 120 || form.middle_name.length > 120) {
      return toast.error("Names must be 120 characters or fewer");
    }
    setSaving(true);
    try {
      const res = await userApi.post("/contributors/songwriters", {
        first_name: form.first_name.trim(),
        middle_name: form.middle_name.trim() || null,
        last_name: form.last_name.trim(),
        ipi_number: form.ipi_number.trim() || undefined,
      });
      const data = res.data?.data || {};
      if (!data.id) throw new Error("Songwriter created but no id returned");
      toast.success("Songwriter created");
      onCreated(data);
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to create songwriter"));
    } finally {
      setSaving(false);
    }
  };

  const input = (key, label, required, placeholder, maxLength) => (
    <div>
      <label className="text-xs font-medium text-gray-600">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        value={form[key]}
        maxLength={maxLength}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">New Songwriter</h3>
          <button type="button" onClick={onClose} className="cursor-pointer p-1 hover:bg-gray-100 rounded-lg">
            <X size={18} />
          </button>
        </div>
        <p className="text-xs text-gray-500 -mt-2">Use legal names (not stage names). First and last name are required.</p>
        {input("first_name", "First name", true, "e.g. Ada", 120)}
        {input("middle_name", "Middle name", false, "e.g. boy", 120)}
        {input("last_name", "Last name", true, "e.g. Lovelace", 120)}
        {input("ipi_number", "IPI number", false, "e.g. 00425147912", 64)}
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="cursor-pointer flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl text-sm font-medium">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold">
            {saving ? "Saving..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

SongwriterFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreated: PropTypes.func.isRequired,
};

export default function SongwriterSelect({ existing, onAdd, onRemove }) {
  const { songwriters, songwritersLoading, pushSongwriter } = useReleaseWizard();
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fullName = (s) => [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(" ");

  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visible = songwriters.filter((sw) => {
    const haystack = `${sw.first_name || ""} ${sw.middle_name || ""} ${sw.last_name || ""}`.toLowerCase();
    return words.every((w) => haystack.includes(w));
  });

  const handleAdd = (sw) => {
    if (existing.some((e) => e.songwriter_id === sw.id)) {
      toast.error("This songwriter is already added.");
      return;
    }
    onAdd({ songwriter_id: sw.id, name: fullName(sw) });
    setQuery("");
  };

  return (
    <div className="space-y-3">
      {existing.length > 0 && (
        <div className="space-y-1.5">
          {existing.map((entry, i) => (
            <div key={`${entry.songwriter_id}_${i}`} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-sm text-gray-800 truncate flex items-center gap-1.5">
                <FileSignature size={13} className="text-orange-500 shrink-0" />
                {entry.name || "Unknown songwriter"}
              </span>
              <button type="button" onClick={() => onRemove(i)} className="cursor-pointer text-gray-400 hover:text-red-500 shrink-0 ml-2">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
        {songwritersLoading ? "Loading your songwriters..." : "Your songwriters — tap to add"}
      </p>
      <div className="border border-gray-200 rounded-xl bg-white divide-y divide-gray-100 max-h-44 overflow-y-auto">
        {songwritersLoading ? (
          <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" /> Loading songwriters...
          </div>
        ) : visible.length === 0 ? (
          <div className="px-4 py-3 text-sm text-gray-500">
            No songwriters found{query.trim() ? ` for “${query.trim()}”` : ""} — create one below.
          </div>
        ) : (
          visible.map((sw) => {
            const added = existing.some((e) => e.songwriter_id === sw.id);
            return (
              <button
                type="button"
                key={sw.id}
                onClick={() => handleAdd(sw)}
                disabled={added}
                className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-2 text-sm transition ${
                  added ? "text-gray-400 cursor-not-allowed" : "text-gray-800 hover:bg-orange-50"
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-medium truncate">{fullName(sw)}</span>
                  {sw.ipi_number && <span className="block text-xs text-gray-500">IPI {sw.ipi_number}</span>}
                </span>
                {added && <span className="text-[11px] font-semibold shrink-0">Added</span>}
              </button>
            );
          })
        )}
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songwriters by word..."
          className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-orange-400"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700"
      >
        <Plus size={13} /> New songwriter
      </button>

      <SongwriterFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onCreated={(sw) => {
          pushSongwriter(sw);
          if (!existing.some((e) => e.songwriter_id === sw.id)) onAdd({ songwriter_id: sw.id, name: fullName(sw) });
        }}
      />
    </div>
  );
}

SongwriterSelect.propTypes = {
  existing: PropTypes.arrayOf(
    PropTypes.shape({
      songwriter_id: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
