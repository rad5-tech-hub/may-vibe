import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import userApi from "../../../../utils/userApi";
import { getErrorMessage } from "../../../../utils/errorHelper";
import { getLabel, getDefaultArtist } from "../../../../utils/subscription";
import { readAudioMeta, validateAudioMeta } from "../../../../utils/audioMeta";
import { compressImage } from "../../../../utils/imageUtils";
import { ISRC_REGEX, UPC_REGEX } from "../../../../utils/releaseConstants";

const ReleaseWizardContext = createContext(null);

export const STEPS = [
  { id: 1, label: "Release Details" },
  { id: 2, label: "Track List & Audio" },
  { id: 3, label: "Track Details" },
  { id: 4, label: "Cover Art" },
  { id: 5, label: "Delivery & Review" },
];

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

const makeTrack = (over = {}) => ({
  key: uid(),
  serverId: null,
  dirty: false,
  audioDirty: false,
  title: "",
  version: "original",
  custom_version: "",
  audioFile: null,
  audioName: "",
  audioPreview: "",
  audioMeta: null,
  is_instrumental: false,
  language: "",
  lyrics: "",
  explicit_content: null,
  isrc: "",
  ai_classification: "",
  genre_id: "",
  sub_genre_id: "",
  additional_artists: [],
  producers: [],
  engineers: [],
  musicians: [],
  songwriters: [],
  ...over,
});

const initialRelease = () => ({
  title: "",
  primary_artist_ids: [],
  genre_id: "",
  sub_genre_id: "",
  upc: "",
  copyright_of_recording: "",
  copyright_of_release: "",
  label_id: getLabel()?.id || "",
  label_name: getLabel()?.name || "",
  artworkFile: null,
  artworkPreview: "",
  artworkDims: null,
  release_date: "",
  territory: "Worldwide",
});

export function ReleaseWizardProvider({ children }) {
  const [step, setStep] = useState(1);
  const [release, setRelease] = useState(initialRelease);
  const [tracks, setTracks] = useState(() => {
    const artist = getDefaultArtist();
    const t = makeTrack();
    if (artist) t.title = "";
    return [t];
  });
  const [genres, setGenres] = useState([]);
  const [genresLoading, setGenresLoading] = useState(true);
  const [contributors, setContributors] = useState([]);
  const [contributorsLoading, setContributorsLoading] = useState(true);
  const [songwriters, setSongwriters] = useState([]);
  const [songwritersLoading, setSongwritersLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedTrackKey, setSelectedTrackKey] = useState(null);

  useEffect(() => {
    userApi
      .get("/genre/all-genres")
      .then((res) => {
        const list = res.data?.data || res.data?.genres || res.data || [];
        setGenres(Array.isArray(list) ? list : []);
      })
      .catch((err) => toast.error(getErrorMessage(err, "Failed to load genres")))
      .finally(() => setGenresLoading(false));

    userApi
      .get("/contributors")
      .then((res) => {
        const list = res.data?.data || [];
        setContributors(Array.isArray(list) ? list : []);
      })
      .catch(() => {})
      .finally(() => setContributorsLoading(false));

    userApi
      .get("/contributors/songwriters/list")
      .then((res) => {
        const list = res.data?.data || [];
        setSongwriters(Array.isArray(list) ? list : []);
      })
      .catch(() => {})
      .finally(() => setSongwritersLoading(false));
  }, []);

  const pushContributor = useCallback((c) => {
    setContributors((prev) => (prev.some((x) => x.id === c.id) ? prev : [c, ...prev]));
  }, []);

  const pushSongwriter = useCallback((s) => {
    setSongwriters((prev) => (prev.some((x) => x.id === s.id) ? prev : [s, ...prev]));
  }, []);

  const patchRelease = useCallback((patch) => {
    setRelease((prev) => ({ ...prev, ...patch }));
    setErrors({});
  }, []);

  const patchTrack = useCallback((key, patch) => {
    setTracks((prev) => prev.map((t) => (t.key === key ? { ...t, ...patch, dirty: true } : t)));
    setErrors({});
  }, []);

  const attachAudio = useCallback(async (key, file) => {
    if (!file) return;
    if (file.size > 200 * 1024 * 1024) {
      toast.error(`Audio must be 200 MB or smaller (selected ${(file.size / 1024 / 1024).toFixed(1)} MB).`);
      return;
    }
    const preview = URL.createObjectURL(file);
    let meta = null;
    let audioErrors = [];
    try {
      meta = await readAudioMeta(file);
      audioErrors = validateAudioMeta(meta);
    } catch {
      audioErrors = ["Could not read audio metadata. Only WAV and FLAC files are supported."];
    }
    if (audioErrors.length) {
      URL.revokeObjectURL(preview);
      audioErrors.forEach((e) => toast.error(e));
      return;
    }
    setTracks((prev) =>
      prev.map((t) => {
        if (t.key !== key) return t;
        if (t.audioPreview?.startsWith("blob:")) URL.revokeObjectURL(t.audioPreview);
        return { ...t, audioFile: file, audioName: file.name, audioPreview: preview, audioMeta: meta, dirty: true, audioDirty: true };
      })
    );
  }, []);

  const addTrack = useCallback(
    (file) => {
      const track = makeTrack();
      if (tracks.length === 0 && release.title) track.title = release.title;
      setTracks((prev) => [...prev, track]);
      if (file) attachAudio(track.key, file);
      return track.key;
    },
    [tracks.length, release.title, attachAudio]
  );

  const removeTrack = useCallback((key) => {
    setTracks((prev) => {
      const next = prev.filter((t) => t.key !== key);
      const gone = prev.find((t) => t.key === key);
      if (gone?.audioPreview?.startsWith("blob:")) URL.revokeObjectURL(gone.audioPreview);
      return next.length ? next : [makeTrack()];
    });
  }, []);

  const moveTrack = useCallback((fromIndex, toIndex) => {
    setTracks((prev) => {
      if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= prev.length || toIndex >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const isSingle = tracks.length === 1;

  const collectErrors = useCallback(
    (stepId) => {
      const errs = {};

      if (stepId === 1) {
        if (!release.title.trim()) errs.title = "Release title is required.";
        if (!release.primary_artist_ids.length) errs.primary_artist_ids = "Select at least one primary artist.";
        if (!release.genre_id) errs.genre_id = "Genre is required.";
        if (!release.sub_genre_id) errs.sub_genre_id = "Sub-genre is required.";
        if (!release.copyright_of_recording.trim()) errs.copyright_of_recording = "Copyright of recording is required.";
        if (!release.copyright_of_release.trim()) errs.copyright_of_release = "Copyright of release is required.";
        if (release.upc.trim() && !UPC_REGEX.test(release.upc.trim())) errs.upc = "UPC must be 12–14 digits.";
      }

      if (stepId === 2) {
        if (!tracks.length) errs.tracks = "Add at least one track.";
        tracks.forEach((t, i) => {
          if (!t.audioMeta) errs[`audio_${t.key}`] = `Track ${i + 1} needs a valid WAV or FLAC audio file.`;
        });
        if (tracks.length === 1 && release.title.trim() && tracks[0].title.trim() && tracks[0].title.trim() !== release.title.trim()) {
          errs[`title_${tracks[0].key}`] = "For a single release the track title must match the release title.";
        }
      }

      if (stepId === 3) {
        tracks.forEach((t, i) => {
          if (!t.title.trim()) errs[`title_${t.key}`] = `Track ${i + 1}: title is required.`;
          if (tracks.length === 1 && release.title.trim() && t.title.trim() && t.title.trim() !== release.title.trim()) {
            errs[`title_${t.key}`] = "For a single release the track title must match the release title.";
          }
          if (!t.ai_classification) errs[`ai_${t.key}`] = "AI classification is required.";
          if (t.explicit_content === null) errs[`explicit_${t.key}`] = "Explicit content choice is required.";
          if (!t.is_instrumental && !t.language) errs[`language_${t.key}`] = "Language is required for tracks with lyrics.";
          if (t.is_instrumental && (t.lyrics || t.language)) errs[`instrumental_${t.key}`] = "Instrumental tracks cannot have lyrics or language.";
          if (t.isrc.trim() && !ISRC_REGEX.test(t.isrc.trim())) errs[`isrc_${t.key}`] = "ISRC format is invalid (e.g. NOPA26100001).";
          if (t.version === "custom" && !t.custom_version.trim()) errs[`version_${t.key}`] = "Enter the custom version name.";
        });
      }

      if (stepId === 4) {
        if (!release.artworkFile && !release.artworkDims) errs.artwork = "Cover art is required.";
        if (!release.artworkDims?.ok) {
          const d = release.artworkDims;
          if (d && d.errors?.length) errs.artwork = d.errors.join(" ");
          else if (!release.artworkFile && !d) errs.artwork = "Cover art is required.";
        }
      }

      if (stepId === 5) {
        if (!release.release_date) errs.release_date = "Release date is required.";
        if (!release.artworkFile && !release.artworkDims) errs.artwork = "Cover art is required.";
        tracks.forEach((t, i) => {
          if (!t.audioMeta) errs[`audio_${t.key}`] = `Track ${i + 1} needs a valid audio file.`;
          if (!t.title.trim()) errs[`title_${t.key}`] = `Track ${i + 1}: title is required.`;
        });
        if (tracks.length === 1 && tracks[0].title.trim() !== release.title.trim()) {
          errs[`title_${tracks[0].key}`] = "For a single release the track title must match the release title.";
        }
      }

      return errs;
    },
    [release, tracks]
  );

  const validateStep = useCallback(
    (stepId) => {
      const errs = collectErrors(stepId);
      setErrors(errs);
      return Object.keys(errs).length === 0;
    },
    [collectErrors]
  );

  const scrollToTop = useCallback(() => {
    const main = document.querySelector("main");
    if (main) main.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, []);

  const goToStep = useCallback(
    (next, trackKey) => {
      if (next > step) {
        for (let s = step; s < next; s++) {
          if (!validateStep(s)) {
            toast.error("Fix the highlighted fields before continuing.");
            scrollToTop();
            return false;
          }
        }
      }
      if (next === 3 && step !== 3 && tracks.length) {
        const target = trackKey && tracks.some((t) => t.key === trackKey) ? trackKey : tracks[0].key;
        setSelectedTrackKey(target);
      }
      setStep(next);
      scrollToTop();
      return true;
    },
    [step, validateStep, scrollToTop, tracks]
  );

  const creditList = useCallback(
    (arr) => arr.map(({ artist_id, role }, i) => ({ artist_id, role, order: i })),
    []
  );

  const songwriterList = useCallback(
    (arr) => arr.map(({ songwriter_id }, i) => ({ songwriter_id, order: i })),
    []
  );

  const buildTrackMetadata = useCallback(
    (t) => {
      const title = t.title.trim();
      const meta = {
        name: title,
        type: tracks.length === 1 ? "audio_track" : "audio_album_track",
        explicit_content: t.explicit_content === true,
        is_instrumental: t.is_instrumental,
        version: t.version === "custom" ? t.custom_version.trim() : t.version,
        ai_classification: t.ai_classification || null,
        audio: t.audioMeta || undefined,
        producers: creditList(t.producers),
        engineers: creditList(t.engineers),
        additional_artists: creditList(t.additional_artists),
        musicians: creditList(t.musicians),
        songwriters: songwriterList(t.songwriters),
      };
      if (!t.is_instrumental) {
        if (t.language) meta.language = t.language;
        if (t.lyrics.trim()) meta.lyrics = t.lyrics.trim();
      }
      if (t.isrc.trim()) meta.isrc = t.isrc.trim();
      const genreId = t.genre_id || release.genre_id;
      const subGenreId = t.sub_genre_id || release.sub_genre_id;
      if (genreId) meta.genre_id = genreId;
      if (subGenreId) meta.sub_genre_id = subGenreId;
      return meta;
    },
    [tracks.length, release.genre_id, release.sub_genre_id, creditList, songwriterList]
  );

  const buildTrackDistribution = useCallback(
    (t) => {
      const meta = {
        explicit_content: t.explicit_content === true,
        is_instrumental: t.is_instrumental,
        version: t.version === "custom" ? t.custom_version.trim() : t.version,
        ai_classification: t.ai_classification || null,
        producers: creditList(t.producers),
        engineers: creditList(t.engineers),
        additional_artists: creditList(t.additional_artists),
        musicians: creditList(t.musicians),
        songwriters: songwriterList(t.songwriters),
      };
      if (!t.is_instrumental) {
        if (t.language) meta.language = t.language;
        if (t.lyrics.trim()) meta.lyrics = t.lyrics.trim();
      }
      if (t.isrc.trim()) meta.isrc = t.isrc.trim();
      if (t.genre_id) meta.genre_id = t.genre_id;
      if (t.sub_genre_id) meta.sub_genre_id = t.sub_genre_id;
      return meta;
    },
    [creditList, songwriterList]
  );

  const syncTrackErrors = useCallback((err, fallbackStep) => {
    const msg = getErrorMessage(err, "Submission failed");
    const mismatch = /single-track album must have a track title identical/i.test(msg);
    const trackIndex = msg.match(/tracks\[(\d+)\]/);
    if (mismatch && tracks.length) {
      setStep(3);
      setSelectedTrackKey(tracks[0].key);
      toast.error("Single release: the track title must exactly match the release title.");
      return;
    }
    if (trackIndex && tracks[Number(trackIndex[1])]) {
      setStep(3);
      setSelectedTrackKey(tracks[Number(trackIndex[1])].key);
      toast.error(msg);
      return;
    }
    if (fallbackStep) setStep(fallbackStep);
    toast.error(msg);
  }, [tracks]);

  const submit = useCallback(async () => {
    const allErrs = {};
    let firstBad = 0;
    for (let s = 1; s <= 5; s++) {
      const errs = collectErrors(s);
      if (Object.keys(errs).length && !firstBad) firstBad = s;
      Object.assign(allErrs, errs);
    }
    if (firstBad) {
      setErrors(allErrs);
      setStep(firstBad);
      scrollToTop();
      toast.error("Fix the highlighted fields before submitting.");
      return;
    }
    setErrors({});

    if (!getLabel()?.id) {
      toast.error("No label found on your subscription. Re-subscribe with a label name.");
      return;
    }

    setSubmitting(true);
    try {
      const withIds = [...tracks];
      for (let i = 0; i < withIds.length; i++) {
        const t = withIds[i];
        setSubmitProgress(`Saving track ${i + 1} of ${withIds.length}…`);
        if (!t.serverId) {
          const fd = new FormData();
          fd.append("metadata", JSON.stringify(buildTrackMetadata(t)));
          if (t.audioFile) fd.append("audio", t.audioFile);
          const res = await userApi.post("/track/post", fd);
          const data = res.data?.data || res.data || {};
          const id = data.id || data.track?.id;
          if (!id) throw new Error("Track created but no id was returned.");
          withIds[i] = { ...t, serverId: id, dirty: false, audioDirty: false };
        } else if (t.dirty) {
          const legacyFd = new FormData();
          legacyFd.append(
            "metadata",
            JSON.stringify({
              name: t.title.trim(),
              type: tracks.length === 1 ? "audio_track" : "audio_album_track",
            })
          );
          if (t.audioDirty && t.audioFile) legacyFd.append("audio", t.audioFile);
          await userApi.patch(`/track/${t.serverId}`, legacyFd);
          await userApi.put(`/track/${t.serverId}/distribution`, buildTrackDistribution(t));
          withIds[i] = { ...t, dirty: false, audioDirty: false };
        }
      }
      setTracks(withIds);

      setSubmitProgress("Uploading cover art and creating release…");
      const payloadTracks = withIds.map((t) => {
        const entry = {
          id: t.serverId,
          title: t.title.trim(),
          is_instrumental: t.is_instrumental,
          explicit_content: t.explicit_content === true,
          version: t.version === "custom" ? t.custom_version.trim() : t.version,
          ai_classification: t.ai_classification || null,
          audio: t.audioMeta,
          additional_artists: creditList(t.additional_artists),
          producers: creditList(t.producers),
          engineers: creditList(t.engineers),
          musicians: creditList(t.musicians),
          songwriters: songwriterList(t.songwriters),
        };
        if (!t.is_instrumental && t.language) entry.language = t.language;
        if (!t.is_instrumental && t.lyrics.trim()) entry.lyrics = t.lyrics.trim();
        if (t.isrc.trim()) entry.isrc = t.isrc.trim();
        if (t.genre_id) entry.genre_id = t.genre_id;
        if (t.sub_genre_id) entry.sub_genre_id = t.sub_genre_id;
        return entry;
      });

      const releaseMeta = {
        title: release.title.trim(),
        tracks: payloadTracks,
        primary_artist_ids: release.primary_artist_ids,
        genre_id: release.genre_id,
        sub_genre_id: release.sub_genre_id,
        release_date: release.release_date,
        territory: release.territory || "Worldwide",
        copyright_of_recording: release.copyright_of_recording.trim(),
        copyright_of_release: release.copyright_of_release.trim(),
        is_video: false,
      };
      const recordLabel = (release.label_name || "").trim() || (getLabel()?.name || "").trim();
      if (recordLabel) releaseMeta.record_label = recordLabel;
      if (release.upc.trim()) releaseMeta.upc = release.upc.trim();

      let artworkFile = release.artworkFile;
      if (artworkFile && artworkFile.size > 5 * 1024 * 1024) artworkFile = await compressImage(artworkFile);
      if (artworkFile && artworkFile.size > 10 * 1024 * 1024) {
        toast.error(`Cover art must be 10 MB or smaller (compressed to ${(artworkFile.size / 1024 / 1024).toFixed(1)} MB).`);
        throw new Error("Cover art too large");
      }

      const fd = new FormData();
      fd.append("metadata", JSON.stringify(releaseMeta));
      if (artworkFile) fd.append("artwork", artworkFile);

      try {
        const res = await userApi.post("/release", fd);
        const data = res.data?.data || res.data || {};
        setSubmitted(data);
        toast.success(res.data?.message || "Release created");
      } catch (err) {
        syncTrackErrors(err, 5);
      }
    } catch (err) {
      syncTrackErrors(err, 3);
    } finally {
      setSubmitting(false);
      setSubmitProgress("");
    }
  }, [tracks, release, collectErrors, buildTrackMetadata, buildTrackDistribution, creditList, songwriterList, syncTrackErrors, scrollToTop]);

  const resetWizard = useCallback(() => {
    setRelease(initialRelease());
    setTracks([makeTrack()]);
    setStep(1);
    setErrors({});
    setSubmitted(null);
    setSelectedTrackKey(null);
  }, []);

  const selectedTrack = useMemo(
    () => tracks.find((t) => t.key === selectedTrackKey) || tracks[0],
    [tracks, selectedTrackKey]
  );

  const value = useMemo(
    () => ({
      step,
      steps: STEPS,
      goToStep,
      release,
      patchRelease,
      tracks,
      patchTrack,
      addTrack,
      attachAudio,
      removeTrack,
      moveTrack,
      isSingle,
      genres,
      genresLoading,
      contributors,
      contributorsLoading,
      pushContributor,
      songwriters,
      songwritersLoading,
      pushSongwriter,
      errors,
      setErrors,
      validateStep,
      getStepErrors: collectErrors,
      scrollToTop,
      selectedTrack,
      selectedTrackKey,
      setSelectedTrackKey,
      submitting,
      submitProgress,
      submitted,
      submit,
      resetWizard,
    }),
    [step, goToStep, release, patchRelease, tracks, patchTrack, addTrack, attachAudio, removeTrack, moveTrack, isSingle, genres, genresLoading, contributors, contributorsLoading, pushContributor, songwriters, songwritersLoading, pushSongwriter, errors, validateStep, collectErrors, scrollToTop, selectedTrack, selectedTrackKey, submitting, submitProgress, submitted, submit, resetWizard]
  );

  return <ReleaseWizardContext.Provider value={value}>{children}</ReleaseWizardContext.Provider>;
}

ReleaseWizardProvider.propTypes = { children: PropTypes.node.isRequired };

export function useReleaseWizard() {
  const ctx = useContext(ReleaseWizardContext);
  if (!ctx) throw new Error("useReleaseWizard must be used within ReleaseWizardProvider");
  return ctx;
}

export { makeTrack };
