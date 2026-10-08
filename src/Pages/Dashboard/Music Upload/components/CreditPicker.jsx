import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Search, Plus, X, Loader2, UserPlus } from "lucide-react";
import { searchContributors } from "../../../../utils/search";
import { useReleaseWizard } from "../context/ReleaseWizardContext";
import { ContributorFormModal } from "./ArtistSelect";

export default function CreditPicker({ roles, roleLabel, existing, onAdd, onRemove }) {
  const { contributors, contributorsLoading, pushContributor } = useReleaseWizard();
  const [query, setQuery] = useState("");
  const [person, setPerson] = useState(null);
  const [role, setRole] = useState(roles[0] || "");
  const [showForm, setShowForm] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Search the WHOLE database (debounced — fires on word pause, not per keypress)
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
      searchContributors(q)
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
  const visible = isSearchingDB ? searchResults : contributors;

  const handleAdd = () => {
    if (!person) return toast.error(`Select a person for ${roleLabel.toLowerCase()}`);
    if (!role) return toast.error("Select a role");
    const dup = existing.some((e) => e.artist_id === person.id && e.role === role);
    if (dup) return toast.error("This person already has that role.");
    onAdd({ artist_id: person.id, role, name: person.stage_name || person.legal_name });
    setPerson(null);
    setRole(roles[0] || "");
  };

  return (
    <div className="space-y-3">
      {existing.length > 0 && (
        <div className="space-y-1.5">
          {existing.map((entry, i) => (
            <div key={`${entry.artist_id}_${entry.role}_${i}`} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-sm text-gray-800 truncate">
                {entry.name || "Unknown"}
                <span className="text-xs text-orange-600 font-medium ml-2">{entry.role}</span>
              </span>
              <button type="button" onClick={() => onRemove(i)} className="cursor-pointer text-gray-400 hover:text-red-500 shrink-0 ml-2">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <select
        value={person?.id || ""}
        disabled={contributorsLoading}
        onChange={(e) => {
          const id = e.target.value;
          setPerson(visible.find((c) => c.id === id) || contributors.find((c) => c.id === id) || null);
        }}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 cursor-pointer"
      >
        <option value="">
          {contributorsLoading
            ? "Loading your contributors..."
            : isSearchingDB
              ? searching
                ? "Searching…"
                : visible.length
                  ? `Search results (${visible.length}) — select one`
                  : `No results for “${query.trim()}”`
              : contributors.length
                ? `Select a ${roleLabel.toLowerCase()}`
                : "No contributors yet — search or add below"}
        </option>
        {visible.map((c) => (
          <option key={c.id} value={c.id}>
            {c.stage_name || c.legal_name}
            {c.stage_name && c.legal_name && c.stage_name !== c.legal_name ? ` (${c.legal_name})` : ""}
          </option>
        ))}
      </select>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={person ? person.stage_name || person.legal_name : query}
            onChange={(e) => {
              setPerson(null);
              setQuery(e.target.value);
            }}
            placeholder={`Search all ${roleLabel.toLowerCase()}s by word...`}
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-9 py-2.5 text-sm outline-none focus:border-orange-400"
          />
          {searching && !person && <Loader2 size={14} className="animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />}
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none cursor-pointer sm:w-52"
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          className="cursor-pointer bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus size={15} /> Add
        </button>
      </div>

      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700"
      >
        <UserPlus size={13} /> New {roleLabel.toLowerCase()}
      </button>

      <ContributorFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={`Add New ${roleLabel}`}
        onCreated={(c) => {
          pushContributor(c);
          setPerson(c);
        }}
      />
    </div>
  );
}

CreditPicker.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  roleLabel: PropTypes.string.isRequired,
  existing: PropTypes.arrayOf(
    PropTypes.shape({
      artist_id: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
