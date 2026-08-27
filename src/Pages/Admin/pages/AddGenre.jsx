import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ListMusic, Pencil, Plus } from "lucide-react";
import { getErrorMessage } from "../../../utils/errorHelper";
import adminApi from "../adminApi";

const AddGenre = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [genreName, setGenreName] = useState("");
  const [genreDescription, setGenreDescription] = useState("");
  const [editingGenre, setEditingGenre] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      setLoading(true);
      try {
        const response = await adminApi.get("/genre/all-genres");
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
      await adminApi.post("/genre/create-genre", {
        name: genreName.trim(),
        description: genreDescription.trim(),
      });
      toast.success("Genre added successfully");
      setGenreName("");
      setGenreDescription("");
      const response = await adminApi.get("/genre/all-genres");
      setGenres(response.data?.data?.genres || response.data?.data || (Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to add genre"));
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    if (!editName.trim()) return toast.error("Genre name cannot be empty");
    setSavingEdit(true);
    try {
      await adminApi.patch(`/genre/edit-genre/${editingGenre.id}`, {
        name: editName.trim(),
        description: editDescription.trim(),
      });
      toast.success("Genre updated successfully");
      setEditingGenre(null);
      const response = await adminApi.get("/genre/all-genres");
      setGenres(response.data?.data?.genres || response.data?.data || (Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update genre"));
    } finally {
      setSavingEdit(false);
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
                <div>
                  <span className="text-sm font-medium text-gray-800">{genre.name}</span>
                  {genre.description && (
                    <p className="mt-0.5 text-xs text-gray-400">{genre.description}</p>
                  )}
                </div>
                <button type="button" title="Edit genre"
                  onClick={() => { setEditingGenre(genre); setEditName(genre.name); setEditDescription(genre.description || ""); }}
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
        <form onSubmit={handleCreate} className="flex max-w-2xl flex-col gap-4">
          <div>
            <label htmlFor="genre-name" className="mb-1 block text-xs font-medium text-gray-500">Genre name</label>
            <input id="genre-name" type="text" required value={genreName}
              onChange={(event) => setGenreName(event.target.value)}
              placeholder="e.g. Afrobeats"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
          </div>
          <div>
            <label htmlFor="genre-desc" className="mb-1 block text-xs font-medium text-gray-500">Description</label>
            <input id="genre-desc" type="text" value={genreDescription}
              onChange={(event) => setGenreDescription(event.target.value)}
              placeholder="e.g. West African popular music blending..."
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
          </div>
          <button type="submit" disabled={creating}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70">
            {creating && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
            <Plus size={15} />Add genre
          </button>
        </form>
      </section>

      {/* Edit Genre Modal */}
      {editingGenre && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">Edit genre</h3>
            <p className="mt-1 text-sm text-gray-500">Update the genre name</p>
            <form onSubmit={handleEdit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Genre name</label>
                <input type="text" required value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500">Description</label>
                <input type="text" value={editDescription}
                  onChange={(event) => setEditDescription(event.target.value)}
                  placeholder="Optional description"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setEditingGenre(null)}
                  className="cursor-pointer rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={savingEdit}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-500 disabled:opacity-70">
                  {savingEdit && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGenre;
