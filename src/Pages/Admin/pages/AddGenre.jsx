import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ListMusic, Pencil, Plus } from "lucide-react";
import { getErrorMessage } from "../../../utils/errorHelper";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authHeaders = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } });

const AddGenre = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    const loadGenres = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/genre/all-genres`, authHeaders());
        setGenres(response.data?.data?.genres || response.data?.data || (Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to load genres"));
      } finally {
        setLoading(false);
      }
    };
    loadGenres();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!genreName.trim()) return toast.error("Please enter a genre name");
    setCreating(true);
    try {
      await axios.post(`${BASE_URL}/genre/all-genres`, { name: genreName.trim() }, authHeaders());
      toast.success("Genre added successfully");
      setGenreName("");
      const response = await axios.get(`${BASE_URL}/genre/all-genres`, authHeaders());
      setGenres(response.data?.data?.genres || response.data?.data || (Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to add genre"));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-7">
      {/* All Genres */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-orange-50 p-3 text-orange-500"><ListMusic size={20} /></div>
          <div>
            <h2 className="text-lg font-bold">Genres</h2>
            <p className="text-sm text-gray-500">All genres available on the platform</p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-10"><div className="loading-spinner" /></div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {genres.map((genre) => (
              <li key={genre.id || genre.name} className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-gray-800">{genre.name}</span>
                <button type="button" title="Edit genre (coming soon)"
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-orange-500 hover:text-orange-600">
                  <Pencil size={13} />Edit
                </button>
              </li>
            ))}
            {genres.length === 0 && <li className="py-8 text-center text-gray-400">No genres found</li>}
          </ul>
        )}
      </section>

      {/* Add Genre */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold">Add new genre</h2>
        <p className="mb-5 text-sm text-gray-500">Create a genre artists can tag their releases with</p>
        <form onSubmit={handleCreate} className="flex max-w-xl flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="genre-name" className="mb-1 block text-xs font-medium text-gray-500">Genre name</label>
            <input id="genre-name" type="text" required value={genreName}
              onChange={(event) => setGenreName(event.target.value)}
              placeholder="e.g. Afrobeats"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
          </div>
          <button type="submit" disabled={creating}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70">
            {creating && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
            <Plus size={15} />Add genre
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddGenre;
