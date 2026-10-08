import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Search, Plus, X, Loader2, FileSignature } from "lucide-react";
import userApi from "../../../../utils/userApi";
import { searchSongwriters } from "../../../../utils/search";
import { getErrorMessage } from "../../../../utils/errorHelper";
import { useReleaseWizard } from "../context/ReleaseWizardContext";

const NAME_RE = /^[\p{L}\s-]+$/u;

function SongwriterFormModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({ first_name: "", middle_name: "", last_name: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setForm({ first_name: "", middle_name: "", last_name: "" });
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim()) return toast.error("First and last name are required");
    const names = [form.first_name.trim(), form.middle_name.trim(), form.last_name.trim()].filter(Boolean);
    if (names.some((n) => n.length > 120)) return toast.error("Names must be 120 characters or fewer");
    if (names.some((n) => !NAME_RE.test(n)))
      return toast.error("Names may only contain letters, spaces and hyphens — no numbers or symbols.");
    setSaving(true);
    try {
      const res = await userApi.post("/contributors/songwriters", {
        first_name: form.first_name.trim(),
        middle_name: form.middle_name.trim() || null,
        last_name: form.last_name.trim(),
      });
      const data = res.data?.data || {};
      if (!data.id) throw new Error("Songwriter created but no id returned");
      toast.success("Songwriter created");
      onCreated(data);
      onClose();
    } catch (err) {
      const msg = getErrorMessage(err, "Failed to create songwriter");
      if (/need a label/i.test(msg)) {
        toast.error("This account has no label on the server yet. Open the Subscription page and link a label with a label name.");
      } else {
        toast.error(msg);
      }
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
        <p className="text-xs text-gray-500 -mt-2">Use legal names (not stage names). Letters, spaces and hyphens only.</p>
        {input("first_name", "First name", true, "e.g. John-Paul", 120)}
        {input("middle_name", "Middle name", false, "e.g. Emmanuel", 120)}
        {input("last_name", "Last name", true, "e.g. Emmanuel", 120)}
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
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const fullName = (s) => [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(" ");

  // Global songwriter search (debounced — fires on word pause, not per keypress)
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const timer = setTimeout(() => {
      searchSongwriters(q)
        .then((results) => {
          if (cancelled) return;
          setSearchResults(results);
        })
        .catch(() => {
          if (!cancelled) setSearchResults([]);
        })
        .finally(() => {
          if (!cancelled) setSearching(false);
        });
    }, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const isSearchingDB = query.trim().length > 0;
  const visible = isSearchingDB ? searchResults : songwriters;

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

      <select
        value=""
        disabled={songwritersLoading}
        onChange={(e) => {
          const id = e.target.value;
          const sw = visible.find((s) => s.id === id) || songwriters.find((s) => s.id === id);
          if (sw) handleAdd(sw);
        }}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 cursor-pointer"
      >
        <option value="">
          {songwritersLoading
            ? "Loading your songwriters..."
            : isSearchingDB
              ? searching
                ? "Searching…"
                : visible.length
                  ? `Search results (${visible.length}) — select one`
                  : `No songwriters found for “${query.trim()}”`
              : songwriters.length
                ? "Select a songwriter"
                : "No songwriters yet — search or add below"}
        </option>
        {visible.map((sw) => {
          const added = existing.some((e) => e.songwriter_id === sw.id);
          return (
            <option key={sw.id} value={sw.id} disabled={added}>
              {fullName(sw)}
              {added ? " — added" : ""}
            </option>
          );
        })}
      </select>

      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search all songwriters by word..."
          className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-9 py-2.5 text-sm outline-none focus:border-orange-400"
        />
        {searching && <Loader2 size={14} className="animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />}
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
