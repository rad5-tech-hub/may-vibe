import { useReleaseWizard } from "../context/ReleaseWizardContext";
import ArtistSelect from "../components/ArtistSelect";

const fieldCls = (err) =>
  `mt-1 w-full bg-white border rounded-xl px-4 py-3 text-sm outline-none ${err ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-orange-400"}`;

const labelCls = "text-xs font-medium text-gray-600";

export default function Step1ReleaseDetails() {
  const { release, patchRelease, errors, genres, genresLoading, contributors } = useReleaseWizard();

  const subGenreOptions = genres.filter((g) => g.id !== release.genre_id);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-3xl border border-gray-200 p-6 lg:p-8 space-y-5">
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Release Details</h3>
          <p className="text-xs text-gray-500">Information that applies to the entire release.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="lg:col-span-2">
            <label className={labelCls}>Release Title *</label>
            <input
              value={release.title}
              onChange={(e) => patchRelease({ title: e.target.value })}
              placeholder="e.g. Northern Lights"
              className={fieldCls(errors.title)}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div className="lg:col-span-2">
            <label className={labelCls}>Primary Artist *</label>
            <ArtistSelect
              value={release.primary_artist_ids}
              onChange={(ids) => {
                const patch = { primary_artist_ids: ids };
                if (!release.label_name.trim() && ids.length) {
                  const artist = contributors.find((c) => c.id === ids[0]);
                  const name = artist?.stage_name || artist?.legal_name;
                  if (name) patch.label_name = name;
                }
                patchRelease(patch);
              }}
              error={errors.primary_artist_ids}
            />
          </div>

          <div>
            <label className={labelCls}>Genre *</label>
            <select
              value={release.genre_id}
              onChange={(e) => {
                const gid = e.target.value;
                patchRelease({
                  genre_id: gid,
                  ...(release.sub_genre_id && release.sub_genre_id === gid ? { sub_genre_id: "" } : {}),
                });
              }}
              className={fieldCls(errors.genre_id) + " cursor-pointer"}
            >
              <option value="">{genresLoading ? "Loading genres..." : "Select genre"}</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            {errors.genre_id && <p className="text-xs text-red-500 mt-1">{errors.genre_id}</p>}
          </div>

          <div>
            <label className={labelCls}>Sub-Genre *</label>
            <select
              value={release.sub_genre_id}
              onChange={(e) => patchRelease({ sub_genre_id: e.target.value })}
              className={fieldCls(errors.sub_genre_id) + " cursor-pointer"}
            >
              <option value="">{genresLoading ? "Loading sub-genres..." : "Select sub-genre"}</option>
              {subGenreOptions.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            {errors.sub_genre_id && <p className="text-xs text-red-500 mt-1">{errors.sub_genre_id}</p>}
            {release.genre_id && release.sub_genre_id === release.genre_id && (
              <p className="text-xs text-red-500 mt-1">Sub-genre must be different from the main genre.</p>
            )}
          </div>

          <div>
            <label className={labelCls}>Record Label *</label>
            <input
              value={release.label_name}
              onChange={(e) => patchRelease({ label_name: e.target.value })}
              placeholder="e.g. Mayvibe Records"
              className={fieldCls(errors.label_name)}
            />
            {errors.label_name && <p className="text-xs text-red-500 mt-1">{errors.label_name}</p>}
            <p className="text-[11px] text-gray-400 mt-1">Defaults to your primary artist — editable for any label.</p>
          </div>

          <div>
            <label className={labelCls}>UPC (optional)</label>
            <input
              value={release.upc}
              onChange={(e) => patchRelease({ upc: e.target.value })}
              placeholder="e.g. 00602508581234"
              className={fieldCls(errors.upc)}
            />
            {errors.upc && <p className="text-xs text-red-500 mt-1">{errors.upc}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Copyright Date of Recording *</label>
            <textarea
              value={release.copyright_of_recording}
              onChange={(e) => patchRelease({ copyright_of_recording: e.target.value })}
              rows={2}
              placeholder="e.g. 2026 Mavin Records/Jonzing World"
              className={fieldCls(errors.copyright_of_recording)}
            />
            {errors.copyright_of_recording && <p className="text-xs text-red-500 mt-1">{errors.copyright_of_recording}</p>}
            <p className="text-[11px] text-gray-400 mt-1">Must start with a 4-digit year, followed by the copyright statement.</p>
          </div>
          <div>
            <label className={labelCls}>Copyright Date of Release *</label>
            <textarea
              value={release.copyright_of_release}
              onChange={(e) => patchRelease({ copyright_of_release: e.target.value })}
              rows={2}
              placeholder="e.g. 2026 Mavin Records Limited"
              className={fieldCls(errors.copyright_of_release)}
            />
            {errors.copyright_of_release && <p className="text-xs text-red-500 mt-1">{errors.copyright_of_release}</p>}
            <p className="text-[11px] text-gray-400 mt-1">Must start with a 4-digit year, followed by the copyright statement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
