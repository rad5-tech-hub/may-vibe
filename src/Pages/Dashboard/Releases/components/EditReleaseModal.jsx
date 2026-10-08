import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { X, Loader2, ImagePlus, Disc3 } from "lucide-react";
import userApi from "../../../../utils/userApi";
import { getErrorMessage } from "../../../../utils/errorHelper";
import {
  TERRITORIES,
  RELEASE_VERSIONS,
  AI_CLASSES,
  ARTIST_ROLES,
  PRODUCER_ROLES,
  ENGINEER_ROLES,
  MUSICIAN_ROLES,
  LANGUAGE_OPTIONS,
} from "../../../../utils/releaseConstants";
import { validateArtwork } from "../../../../utils/imageUtils";
import { ReleaseWizardContext } from "../../Music Upload/context/ReleaseWizardContext";
import ArtistSelect from "../../Music Upload/components/ArtistSelect";
import CreditPicker from "../../Music Upload/components/CreditPicker";
import SongwriterSelect from "../../Music Upload/components/SongwriterSelect";
import TikTokClipPicker from "../../Music Upload/components/TikTokClipPicker";

const ALL_MUSICIAN_ROLES = MUSICIAN_ROLES.flatMap((g) => g.roles);
const fieldCls = "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400";
const labelCls = "text-xs font-medium text-gray-600";

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

const creditEntry = (c) => {
  if (!c) return null;
  if (typeof c === "string") return { artist_id: c, role: "", name: "" };
  const artist_id = c.artist_id || c.artist?.id || c.contributor_id || c.id;
  const role = c.role || "";
  const name = c.name || c.stage_name || c.artist?.stage_name || "";
  if (!artist_id) return null;
  return { artist_id, role, name };
};

const songwriterEntry = (c) => {
  if (!c) return null;
  if (typeof c === "string") return { songwriter_id: c, name: "" };
  const songwriter_id = c.songwriter_id || c.songwriter?.id || c.id;
  const name =
    c.name ||
    [c.first_name, c.middle_name, c.last_name].filter(Boolean).join(" ") ||
    [c.songwriter?.first_name, c.songwriter?.middle_name, c.songwriter?.last_name].filter(Boolean).join(" ") ||
    "";
  if (!songwriter_id) return null;
  return { songwriter_id, name };
};

function mapTracks(release) {
  const rows = Array.isArray(release.releaseTracks) && release.releaseTracks.length
    ? release.releaseTracks
    : Array.isArray(release.tracks) && release.tracks.length
      ? release.tracks
      : release.track
        ? [release.track]
        : [];
  return rows.map((t) => {
    const src = t.track || t;
    const unified = Array.isArray(src.credits) && src.credits.length ? src.credits : null;
    const additional_artists = [];
    const producers = [];
    const engineers = [];
    const musicians = [];
    if (unified) {
      for (const c of unified) {
        const entry = creditEntry(c);
        if (!entry) continue;
        if (ARTIST_ROLES.includes(entry.role)) additional_artists.push(entry);
        else if (PRODUCER_ROLES.includes(entry.role)) producers.push(entry);
        else if (ENGINEER_ROLES.includes(entry.role)) engineers.push(entry);
        else musicians.push(entry);
      }
    } else {
      (t.additional_artists || src.additional_artists || []).forEach((c) => {
        const e = creditEntry(c);
        if (e) additional_artists.push(e);
      });
      (t.producers || src.producers || []).forEach((c) => {
        const e = creditEntry(c);
        if (e) producers.push(e);
      });
      (t.engineers || src.engineers || []).forEach((c) => {
        const e = creditEntry(c);
        if (e) engineers.push(e);
      });
      (t.musicians || src.musicians || []).forEach((c) => {
        const e = creditEntry(c);
        if (e) musicians.push(e);
      });
    }
    const songwriters = (src.songwriters || t.songwriters || []).map(songwriterEntry).filter(Boolean);
    const version = t.version || src.version || "original";
    const known = RELEASE_VERSIONS.includes(version);
    return {
      key: uid(),
      id: t.track_id || src.id || t.id,
      title: src.name || t.title || t.name || "",
      version: known ? version : "custom",
      custom_version: known ? "" : version || "",
      audioPreview: t.file_url || src.file_url || "",
      audioFile: null,
      audioMeta: src.audio_container
        ? {
            container: src.audio_container,
            channels: src.audio_channels,
            bitDepth: src.audio_bit_depth,
            sampleRate: src.audio_sample_rate,
          }
        : t.audio || null,
      tiktok_clip_start: src.tiktok_clip_start ?? t.tiktok_clip_start ?? null,
      is_instrumental: src.is_instrumental ?? t.is_instrumental ?? false,
      language: src.language || t.language || "",
      lyrics: src.lyrics || t.lyrics || "",
      explicit_content: src.explicit_content ?? t.explicit_content ?? null,
      isrc: src.isrc || t.isrc || "",
      ai_classification: src.ai_classification || t.ai_classification || "",
      genre_id: t.genre_id || src.genre_id || "",
      sub_genre_id: t.sub_genre_id || src.sub_genre_id || "",
      additional_artists,
      producers,
      engineers,
      musicians,
      songwriters,
    };
  });
}

function primaryIds(release) {
  const pa = release.primaryArtists ?? release.primary_artists ?? release.artists ?? [];
  if (!Array.isArray(pa)) return [];
  return pa.map((p) => (typeof p === "string" ? p : p.artist_id || p.artist?.id || p.id)).filter(Boolean);
}

export default function EditReleaseModal({ isOpen, onClose, release, onSaved }) {
  const [form, setForm] = useState({
    title: "",
    record_label: "",
    upc: "",
    release_date: "",
    territory: "Worldwide",
    copyright_of_recording: "",
    copyright_of_release: "",
    genre_id: "",
    sub_genre_id: "",
    primary_artist_ids: [],
  });
  const [tracks, setTracks] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [genres, setGenres] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [contributorsLoading, setContributorsLoading] = useState(true);
  const [songwriters, setSongwriters] = useState([]);
  const [songwritersLoading, setSongwritersLoading] = useState(true);
  const [artwork, setArtwork] = useState(null);
  const [artworkPreview, setArtworkPreview] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !release) return;
    setForm({
      title: release.title || release.album?.name || release.track?.name || "",
      record_label: release.record_label || release.label?.name || release.label_name || "",
      upc: release.upc || "",
      release_date: release.release_date ? String(release.release_date).slice(0, 10) : "",
      territory: release.territory || "Worldwide",
      copyright_of_recording: release.copyright_of_recording || "",
      copyright_of_release: release.copyright_of_release || "",
      genre_id: release.genre_id || "",
      sub_genre_id: release.sub_genre_id || "",
      primary_artist_ids: primaryIds(release),
    });
    const mapped = mapTracks(release);
    setTracks(mapped);
    setSelectedKey(mapped[0]?.key || "");
    setArtwork(null);
    setArtworkPreview(release.artwork_url || release.album?.artwork_url || "");
    userApi
      .get("/genre/all-genres")
      .then((res) => {
        const list = res.data?.data || res.data?.genres || res.data || [];
        setGenres(Array.isArray(list) ? list : []);
      })
      .catch(() => {});
    setContributorsLoading(true);
    userApi
      .get("/contributors")
      .then((res) => {
        const list = res.data?.data || [];
        setContributors(Array.isArray(list) ? list : []);
      })
      .catch(() => {})
      .finally(() => setContributorsLoading(false));
    setSongwritersLoading(true);
    userApi
      .get("/contributors/songwriters/list")
      .then((res) => {
        const list = res.data?.data || [];
        setSongwriters(Array.isArray(list) ? list : []);
      })
      .catch(() => {})
      .finally(() => setSongwritersLoading(false));
  }, [isOpen, release]);

  const patchTrack = useCallback((key, patch) => {
    setTracks((prev) => prev.map((t) => (t.key === key ? { ...t, ...patch } : t)));
  }, []);

  const pushContributor = useCallback((c) => {
    setContributors((prev) => (prev.some((x) => x.id === c.id) ? prev : [c, ...prev]));
  }, []);

  const pushSongwriter = useCallback((s) => {
    setSongwriters((prev) => (prev.some((x) => x.id === s.id) ? prev : [s, ...prev]));
  }, []);

  const wizardValue = useMemo(
    () => ({
      contributors,
      contributorsLoading,
      pushContributor,
      songwriters,
      songwritersLoading,
      pushSongwriter,
      patchTrack,
    }),
    [contributors, contributorsLoading, pushContributor, songwriters, songwritersLoading, pushSongwriter, patchTrack]
  );

  if (!isOpen || !release) return null;

  const selected = tracks.find((t) => t.key === selectedKey) || tracks[0];

  const handleArtwork = async (file) => {
    if (!file) {
      setArtwork(null);
      setArtworkPreview(release?.artwork_url || "");
      return;
    }
    const result = await validateArtwork(file);
    if (!result.ok) {
      result.errors.forEach((e) => toast.error(e));
      return;
    }
    setArtwork(file);
    setArtworkPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Release title is required");
    if (!form.record_label.trim()) return toast.error("Record label is required");
    const yearFirst = (v) => /^\d{4}/.test(v.trim()) && v.trim().length > 4;
    if (!yearFirst(form.copyright_of_recording))
      return toast.error("Copyright Date of Recording must start with a 4-digit year, e.g. 2026 Mavin Records.");
    if (!yearFirst(form.copyright_of_release))
      return toast.error("Copyright Date of Release must start with a 4-digit year, e.g. 2026 Mavin Records.");
    if (form.genre_id && form.genre_id === form.sub_genre_id)
      return toast.error("Sub-genre must be different from the main genre.");
    if (!form.primary_artist_ids.length) return toast.error("Primary artist is required");
    setSaving(true);
    try {
      const creditList = (arr) =>
        (arr || []).map(({ artist_id, role }, i) => ({ artist_id, role, order: i }));
      const songwriterList = (arr) =>
        (arr || []).map(({ songwriter_id }, i) => ({ songwriter_id, order: i }));
      const payloadTracks = tracks
        .map((t) => {
          const entry = {
            id: t.id,
            title: t.title.trim(),
            is_instrumental: !!t.is_instrumental,
            explicit_content: t.explicit_content === true,
            version: t.version === "custom" ? t.custom_version.trim() : t.version,
            ai_classification: t.ai_classification || null,
            additional_artists: creditList(t.additional_artists),
            producers: creditList(t.producers),
            engineers: creditList(t.engineers),
            musicians: creditList(t.musicians),
            songwriters: songwriterList(t.songwriters),
          };
          if (t.audioMeta) entry.audio = t.audioMeta;
          if (!t.is_instrumental && t.language) entry.language = t.language;
          if (!t.is_instrumental && t.lyrics?.trim()) entry.lyrics = t.lyrics.trim();
          if (t.isrc?.trim()) entry.isrc = t.isrc.trim();
          if (t.tiktok_clip_start != null) {
            entry.tiktok_clip_start = t.tiktok_clip_start;
            entry.tiktok_clip_duration = 30;
          }
          if (t.genre_id) entry.genre_id = t.genre_id;
          if (t.sub_genre_id) entry.sub_genre_id = t.sub_genre_id;
          return entry;
        })
        .filter((t) => t.id && t.title);

      const body = {
        title: form.title.trim(),
        tracks: payloadTracks,
        record_label: form.record_label.trim(),
        primary_artist_ids: form.primary_artist_ids,
        territory: form.territory,
        copyright_of_recording: form.copyright_of_recording.trim(),
        copyright_of_release: form.copyright_of_release.trim(),
      };
      if (form.upc.trim()) body.upc = form.upc.trim();
      if (form.release_date) body.release_date = form.release_date;
      if (form.genre_id) body.genre_id = form.genre_id;
      if (form.sub_genre_id) body.sub_genre_id = form.sub_genre_id;

      let res;
      if (artwork) {
        const fd = new FormData();
        fd.append("metadata", JSON.stringify(body));
        fd.append("artwork", artwork);
        res = await userApi.put(`/release/${release.id}`, fd);
      } else {
        res = await userApi.put(`/release/${release.id}`, body);
      }
      toast.success(res.data?.message || "Release updated");
      onSaved?.();
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update release"));
    } finally {
      setSaving(false);
    }
  };

  const addCredit = (field, entry) => {
    if (!selected) return;
    patchTrack(selected.key, { [field]: [...selected[field], entry] });
  };
  const removeCredit = (field, index) => {
    if (!selected) return;
    patchTrack(selected.key, { [field]: selected[field].filter((_, i) => i !== index) });
  };

  return (
    <ReleaseWizardContext.Provider value={wizardValue}>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl max-w-6xl w-full p-5 sm:p-8 space-y-6 max-h-[94vh] overflow-y-auto">
          <div className="flex items-center justify-between sticky top-0 bg-white z-10 pb-2">
            <h3 className="font-bold text-xl">Edit Release</h3>
            <button type="button" onClick={onClose} className="cursor-pointer p-1 hover:bg-gray-100 rounded-lg">
              <X size={18} />
            </button>
          </div>

          <section className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900">Release Details</h4>
            <div>
              <label className={labelCls}>Release Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Primary Artist *</label>
              <ArtistSelect value={form.primary_artist_ids} onChange={(ids) => setForm({ ...form, primary_artist_ids: ids })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Genre *</label>
                <select
                  value={form.genre_id}
                  onChange={(e) => {
                    const gid = e.target.value;
                    setForm((f) => ({ ...f, genre_id: gid, ...(f.sub_genre_id && f.sub_genre_id === gid ? { sub_genre_id: "" } : {}) }));
                  }}
                  className={fieldCls + " cursor-pointer"}
                >
                  <option value="">Select genre</option>
                  {genres.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Sub-genre *</label>
                <select value={form.sub_genre_id} onChange={(e) => setForm({ ...form, sub_genre_id: e.target.value })} className={fieldCls + " cursor-pointer"}>
                  <option value="">Select sub-genre</option>
                  {genres
                    .filter((g) => g.id !== form.genre_id || g.id === form.sub_genre_id)
                    .map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Record Label *</label>
                <input value={form.record_label} onChange={(e) => setForm({ ...form, record_label: e.target.value })} className={fieldCls} />
              </div>
              <div>
                <label className={labelCls}>UPC</label>
                <input value={form.upc} onChange={(e) => setForm({ ...form, upc: e.target.value })} className={fieldCls} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Copyright Date of Recording *</label>
                <textarea
                  value={form.copyright_of_recording}
                  onChange={(e) => setForm({ ...form, copyright_of_recording: e.target.value })}
                  rows={2}
                  placeholder="e.g. 2026 Mavin Records/Jonzing World"
                  className={fieldCls}
                />
              </div>
              <div>
                <label className={labelCls}>Copyright Date of Release *</label>
                <textarea
                  value={form.copyright_of_release}
                  onChange={(e) => setForm({ ...form, copyright_of_release: e.target.value })}
                  rows={2}
                  placeholder="e.g. 2026 Mavin Records Limited"
                  className={fieldCls}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900">Track Details</h4>
            {tracks.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {tracks.map((tr, i) => (
                  <button
                    key={tr.key}
                    type="button"
                    onClick={() => setSelectedKey(tr.key)}
                    className={`cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 ${
                      tr.key === selected?.key ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Disc3 size={14} />
                    {i + 1}. {tr.title || "Untitled"}
                  </button>
                ))}
              </div>
            )}
            {selected && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className={labelCls}>Track Title *</label>
                      <input value={selected.title} onChange={(e) => patchTrack(selected.key, { title: e.target.value })} className={fieldCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Version</label>
                      <select value={selected.version} onChange={(e) => patchTrack(selected.key, { version: e.target.value })} className={fieldCls + " cursor-pointer"}>
                        {RELEASE_VERSIONS.map((v) => (
                          <option key={v} value={v}>
                            {v.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          </option>
                        ))}
                      </select>
                      {selected.version === "custom" && (
                        <input
                          value={selected.custom_version}
                          onChange={(e) => patchTrack(selected.key, { custom_version: e.target.value })}
                          placeholder="Specify the version"
                          className={fieldCls + " mt-2"}
                        />
                      )}
                    </div>
                    <div>
                      <label className={labelCls}>Genre override (optional)</label>
                      <select value={selected.genre_id} onChange={(e) => patchTrack(selected.key, { genre_id: e.target.value })} className={fieldCls + " cursor-pointer"}>
                        <option value="">Same as release</option>
                        {genres.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Sub-genre override (optional)</label>
                      <select value={selected.sub_genre_id} onChange={(e) => patchTrack(selected.key, { sub_genre_id: e.target.value })} className={fieldCls + " cursor-pointer"}>
                        <option value="">Same as release</option>
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
                        value={selected.ai_classification}
                        onChange={(e) => patchTrack(selected.key, { ai_classification: e.target.value })}
                        className={fieldCls + " cursor-pointer"}
                      >
                        <option value="">Select classification</option>
                        {AI_CLASSES.map((a) => (
                          <option key={a.value} value={a.value}>
                            {a.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>ISRC (optional)</label>
                      <input value={selected.isrc} onChange={(e) => patchTrack(selected.key, { isrc: e.target.value })} className={fieldCls} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className={labelCls}>Lyrics / Instrumental *</label>
                      <div className="flex gap-2 mt-1">
                        {[
                          { v: false, label: "Contains lyrics" },
                          { v: true, label: "Instrumental" },
                        ].map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() =>
                              patchTrack(selected.key, {
                                is_instrumental: opt.v,
                                ...(opt.v ? { explicit_content: null, language: "", lyrics: "" } : {}),
                              })
                            }
                            className={`cursor-pointer flex-1 py-2.5 rounded-xl text-sm font-semibold border ${
                              selected.is_instrumental === opt.v ? "bg-orange-500 border-orange-500 text-white" : "bg-white border-gray-200 text-gray-600"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {!selected.is_instrumental && (
                      <>
                        <div>
                          <label className={labelCls}>Language *</label>
                          <select value={selected.language} onChange={(e) => patchTrack(selected.key, { language: e.target.value })} className={fieldCls + " cursor-pointer"}>
                            <option value="">Select language</option>
                            {LANGUAGE_OPTIONS.map((l) => (
                              <option key={l.value} value={l.value}>
                                {l.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>Lyrics (optional)</label>
                          <textarea value={selected.lyrics} onChange={(e) => patchTrack(selected.key, { lyrics: e.target.value })} rows={4} className={fieldCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Explicit Content *</label>
                          <div className="mt-1 flex gap-2">
                            {[
                              { v: true, label: "Yes" },
                              { v: false, label: "No" },
                            ].map((opt) => (
                              <button
                                key={opt.label}
                                type="button"
                                onClick={() => patchTrack(selected.key, { explicit_content: opt.v })}
                                className={`cursor-pointer flex-1 py-2.5 rounded-xl text-sm font-semibold border ${
                                  selected.explicit_content === opt.v ? "bg-orange-500 border-orange-500 text-white" : "bg-white border-gray-200 text-gray-600"
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-2">Additional Artists</h5>
                  <CreditPicker
                    roles={ARTIST_ROLES}
                    roleLabel="Artist"
                    existing={selected.additional_artists}
                    onAdd={(entry) => addCredit("additional_artists", entry)}
                    onRemove={(i) => removeCredit("additional_artists", i)}
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 mb-2">Producers *</h5>
                    <CreditPicker
                      roles={PRODUCER_ROLES}
                      roleLabel="Producer"
                      existing={selected.producers}
                      onAdd={(entry) => addCredit("producers", entry)}
                      onRemove={(i) => removeCredit("producers", i)}
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 mb-2">Engineers</h5>
                    <CreditPicker
                      roles={ENGINEER_ROLES}
                      roleLabel="Engineer"
                      existing={selected.engineers}
                      onAdd={(entry) => addCredit("engineers", entry)}
                      onRemove={(i) => removeCredit("engineers", i)}
                    />
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-2">Musicians</h5>
                  <CreditPicker
                    roles={ALL_MUSICIAN_ROLES}
                    roleLabel="Musician"
                    existing={selected.musicians}
                    onAdd={(entry) => addCredit("musicians", entry)}
                    onRemove={(i) => removeCredit("musicians", i)}
                  />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-900 mb-2">Songwriters / Composers</h5>
                  <SongwriterSelect
                    existing={selected.songwriters}
                    onAdd={(entry) => addCredit("songwriters", entry)}
                    onRemove={(i) => removeCredit("songwriters", i)}
                  />
                </div>
              </div>
            )}
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900">Cover Art</h4>
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 shrink-0">
                {artworkPreview ? (
                  <img src={artworkPreview} alt="Artwork" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImagePlus size={20} />
                  </div>
                )}
              </div>
              <label className="cursor-pointer text-sm font-semibold text-orange-600 underline underline-offset-2">
                Choose file
                <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => handleArtwork(e.target.files[0] || null)} />
              </label>
              {artwork && (
                <button type="button" onClick={() => handleArtwork(null)} className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                  Remove
                </button>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900">Delivery</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Release Date</label>
                <input type="date" value={form.release_date} onChange={(e) => setForm({ ...form, release_date: e.target.value })} className={fieldCls} />
              </div>
              <div>
                <label className={labelCls}>Territory</label>
                <select value={form.territory} onChange={(e) => setForm({ ...form, territory: e.target.value })} className={fieldCls + " cursor-pointer"}>
                  {TERRITORIES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {tracks.map((tr, i) =>
              tr.audioPreview ? (
                <div key={tr.key}>
                  <p className="text-xs font-bold text-gray-700 mb-1.5">
                    TikTok clip — {i + 1}. {tr.title || "Untitled"}
                  </p>
                  <TikTokClipPicker track={tr} onStartChange={(start) => patchTrack(tr.key, { tiktok_clip_start: start })} />
                </div>
              ) : null
            )}
          </section>

          <div className="flex gap-3 pt-1 sticky bottom-0 bg-white">
            <button type="button" onClick={onClose} className="cursor-pointer flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl text-sm font-medium">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </ReleaseWizardContext.Provider>
  );
}

EditReleaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  release: PropTypes.object,
  onSaved: PropTypes.func,
};
