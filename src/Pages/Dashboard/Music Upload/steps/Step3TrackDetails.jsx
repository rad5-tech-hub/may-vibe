import PropTypes from "prop-types";
import { ListMusic, Disc3 } from "lucide-react";
import { useReleaseWizard } from "../context/ReleaseWizardContext";
import CreditPicker from "../components/CreditPicker";
import SongwriterSelect from "../components/SongwriterSelect";
import {
  RELEASE_VERSIONS,
  AI_CLASSES,
  ARTIST_ROLES,
  PRODUCER_ROLES,
  ENGINEER_ROLES,
  MUSICIAN_ROLES,
  LANGUAGE_OPTIONS,
} from "../../../../utils/releaseConstants";

const ALL_MUSICIAN_ROLES = MUSICIAN_ROLES.flatMap((g) => g.roles);

const fieldCls = (err) =>
  `mt-1 w-full bg-white border rounded-xl px-4 py-3 text-sm outline-none ${err ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-orange-400"}`;

const labelCls = "text-xs font-medium text-gray-600";

function Section({ title, children, error }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <h4 className="text-sm font-bold text-gray-900 mb-3">{title}</h4>
      {children}
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  error: PropTypes.string,
};

export default function Step3TrackDetails() {
  const { tracks, selectedTrack, setSelectedTrackKey, patchTrack, errors, setErrors, release, genres, genresLoading, isSingle } = useReleaseWizard();

  if (!selectedTrack) return null;
  const t = selectedTrack;
  const err = (name) => errors[`${name}_${t.key}`];

  const clearErr = (name) => {
    if (errors[`${name}_${t.key}`]) {
      const next = { ...errors };
      delete next[`${name}_${t.key}`];
      setErrors(next);
    }
  };

  const addCredit = (field, entry) => patchTrack(t.key, { [field]: [...t[field], entry] });
  const removeCredit = (field, index) =>
    patchTrack(t.key, { [field]: t[field].filter((_, i) => i !== index) });

  return (
    <div id="track-details-anchor" className="space-y-5">
      <h3 className="font-bold text-gray-900 flex items-center gap-2">
        <ListMusic size={17} className="text-orange-500" /> Track Details
      </h3>

      <p className="text-xs text-gray-500">
        <span className="font-semibold text-gray-700">Primary Artist</span>
        <br />
        The primary artist selected in Release Details carries over automatically with the role{" "}
        <span className="font-semibold text-gray-700">Performer</span>.
      </p>

      <div className="flex gap-2 flex-wrap">
        {tracks.map((tr, i) => (
          <button
            key={tr.key}
            type="button"
            onClick={() => setSelectedTrackKey(tr.key)}
            className={`cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
              tr.key === t.key ? "bg-orange-500 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Disc3 size={14} />
            {i + 1}. {tr.title || "Untitled"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
          <div>
            <label className={labelCls}>Track Title *</label>
            <input
              value={t.title}
              onChange={(e) => {
                patchTrack(t.key, { title: e.target.value });
                clearErr("title");
              }}
              placeholder={isSingle ? release.title : "e.g. Opening"}
              className={fieldCls(err("title"))}
            />
            {err("title") && <p className="text-xs text-red-500 mt-1">{err("title")}</p>}
            {isSingle && <p className="text-[11px] text-gray-400 mt-1">Single release — must match the release title.</p>}
          </div>

          <div>
            <label className={labelCls}>Version</label>
            <select
              value={t.version}
              onChange={(e) => patchTrack(t.key, { version: e.target.value })}
              className={fieldCls(err("version")) + " cursor-pointer"}
            >
              {RELEASE_VERSIONS.map((v) => (
                <option key={v} value={v}>
                  {v.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
            {t.version === "custom" && (
              <input
                value={t.custom_version}
                onChange={(e) => patchTrack(t.key, { custom_version: e.target.value })}
                placeholder="Specify the version"
                className={fieldCls(err("version")) + " mt-2"}
              />
            )}
            {err("version") && <p className="text-xs text-red-500 mt-1">{err("version")}</p>}
          </div>

          <div>
            <label className={labelCls}>Genre override (optional)</label>
            <select
              value={t.genre_id}
              onChange={(e) => patchTrack(t.key, { genre_id: e.target.value })}
              className={fieldCls() + " cursor-pointer"}
            >
              <option value="">{genresLoading ? "Loading..." : `Same as release${release.genre_id ? "" : ""}`}</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Sub-genre override (optional)</label>
            <select
              value={t.sub_genre_id}
              onChange={(e) => patchTrack(t.key, { sub_genre_id: e.target.value })}
              className={fieldCls() + " cursor-pointer"}
            >
              <option value="">{genresLoading ? "Loading..." : "Same as release"}</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>AI Classification *</label>
            <select
              value={t.ai_classification}
              onChange={(e) => {
                patchTrack(t.key, { ai_classification: e.target.value });
                clearErr("ai");
              }}
              className={fieldCls(err("ai")) + " cursor-pointer"}
            >
              <option value="">Select classification</option>
              {AI_CLASSES.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
            {err("ai") && <p className="text-xs text-red-500 mt-1">{err("ai")}</p>}
          </div>

          <div>
            <label className={labelCls}>ISRC (optional)</label>
            <input
              value={t.isrc}
              onChange={(e) => {
                patchTrack(t.key, { isrc: e.target.value });
                clearErr("isrc");
              }}
              placeholder="e.g. NOPA26100001"
              className={fieldCls(err("isrc"))}
            />
            {err("isrc") && <p className="text-xs text-red-500 mt-1">{err("isrc")}</p>}
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Lyrics / Instrumental *</h4>
            <div className="flex gap-2 mb-4">
              {[
                { v: false, label: "Contains lyrics" },
                { v: true, label: "Instrumental" },
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => {
                    patchTrack(t.key, { is_instrumental: opt.v, ...(opt.v ? { explicit_content: null, language: "", lyrics: "" } : {}) });
                    clearErr("instrumental");
                    clearErr("language");
                    clearErr("explicit");
                  }}
                  className={`cursor-pointer flex-1 py-2.5 rounded-xl text-sm font-semibold border transition ${
                    t.is_instrumental === opt.v ? "bg-orange-500 border-orange-500 text-white" : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {t.is_instrumental ? null : (
              <div className="space-y-3">
                <div>
                  <label className={labelCls}>Language *</label>
                  <select
                    value={t.language}
                    onChange={(e) => {
                      patchTrack(t.key, { language: e.target.value });
                      clearErr("language");
                    }}
                    className={fieldCls(err("language")) + " cursor-pointer"}
                  >
                    <option value="">Select language</option>
                    {LANGUAGE_OPTIONS.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                  {err("language") && <p className="text-xs text-red-500 mt-1">{err("language")}</p>}
                </div>
                <div>
                  <label className={labelCls}>Lyrics (optional)</label>
                  <textarea
                    value={t.lyrics}
                    onChange={(e) => patchTrack(t.key, { lyrics: e.target.value })}
                    rows={5}
                    placeholder={"Verse one...\n\nChorus..."}
                    className={fieldCls()}
                  />
                </div>
              </div>
            )}
            {err("instrumental") && <p className="text-xs text-red-500 mt-1">{err("instrumental")}</p>}

            {!t.is_instrumental && (
              <div className="mt-5 pt-4 border-t border-gray-100">
                <label className={labelCls}>Explicit Content *</label>
                <div className="mt-1 flex gap-2">
                  {[
                    { v: true, label: "Yes" },
                    { v: false, label: "No" },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        patchTrack(t.key, { explicit_content: opt.v });
                        clearErr("explicit");
                      }}
                      className={`cursor-pointer flex-1 py-2.5 rounded-xl text-sm font-semibold border transition ${
                        t.explicit_content === opt.v
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {err("explicit") && <p className="text-xs text-red-500 mt-1">{err("explicit")}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      <Section title="Additional Artists">
        <CreditPicker
          roles={ARTIST_ROLES}
          roleLabel="Artist"
          existing={t.additional_artists}
          onAdd={(entry) => addCredit("additional_artists", entry)}
          onRemove={(i) => removeCredit("additional_artists", i)}
        />
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Section title="Producers *" error={err("producers")}>
          <CreditPicker
            roles={PRODUCER_ROLES}
            roleLabel="Producer"
            existing={t.producers}
            onAdd={(entry) => addCredit("producers", entry)}
            onRemove={(i) => removeCredit("producers", i)}
          />
        </Section>
        <Section title="Engineers (optional)">
          <CreditPicker
            roles={ENGINEER_ROLES}
            roleLabel="Engineer"
            existing={t.engineers}
            onAdd={(entry) => addCredit("engineers", entry)}
            onRemove={(i) => removeCredit("engineers", i)}
          />
        </Section>
      </div>

      <Section title="Musicians">
        <CreditPicker
          roles={ALL_MUSICIAN_ROLES}
          roleLabel="Musician"
          existing={t.musicians}
          onAdd={(entry) => addCredit("musicians", entry)}
          onRemove={(i) => removeCredit("musicians", i)}
        />
      </Section>

      <Section title="Songwriters / Composers">
        <SongwriterSelect
          existing={t.songwriters}
          onAdd={(entry) => addCredit("songwriters", entry)}
          onRemove={(i) => removeCredit("songwriters", i)}
        />
      </Section>
    </div>
  );
}
