import PropTypes from "prop-types";
import { Pencil, Loader2, CheckCircle2, Calendar, Send, Film } from "lucide-react";
import { useReleaseWizard } from "../context/ReleaseWizardContext";
import TikTokClipPicker from "../components/TikTokClipPicker";
import { AI_CLASSES, LANGUAGE_OPTIONS, TERRITORIES } from "../../../../utils/releaseConstants";

const fmtClip = (s) => {
  const sec = Math.max(0, Math.round(Number(s) || 0));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
};

function EditBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-full transition"
    >
      <Pencil size={11} /> EDIT
    </button>
  );
}

EditBtn.propTypes = { onClick: PropTypes.func.isRequired };

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm py-1.5 border-b border-gray-100 last:border-0">
      <dt className="text-gray-500 shrink-0">{label}</dt>
      <dd className="text-gray-900 text-right font-medium break-words min-w-0">{value || "—"}</dd>
    </div>
  );
}

Row.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.string };

function Panel({ title, onEdit, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <EditBtn onClick={onEdit} />
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default function Step5DeliveryReview() {
  const { release, patchRelease, tracks, genres, errors, goToStep, submitting, submitProgress, submit, submitted, resetWizard } =
    useReleaseWizard();

  const genreName = (id) => genres.find((g) => g.id === id)?.name || "—";
  const languageLabel = (v) => LANGUAGE_OPTIONS.find((l) => l.value === v)?.label || v;
  const aiLabel = (v) => AI_CLASSES.find((a) => a.value === v)?.label || v;
  const artistCount = release.primary_artist_ids.length;

  if (submitted) {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 text-center max-w-xl mx-auto">
        <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Release created</h2>
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-semibold text-gray-800">{submitted.title || release.title}</span> has been submitted as a draft.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          {submitted.track_count} track{submitted.track_count === 1 ? "" : "s"} · Status: {submitted.status}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={resetWizard}
            className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl text-sm"
          >
            Create another release
          </button>
          <a
            href="/dashboard/releases"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl text-sm inline-flex items-center"
          >
            View my releases
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Calendar size={15} className="text-orange-500" /> Delivery Options
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <div>
            <label className="text-xs font-medium text-gray-600">Territory</label>
            <select
              value={release.territory}
              onChange={(e) => patchRelease({ territory: e.target.value })}
              className="mt-1 w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer focus:border-orange-400"
            >
              {TERRITORIES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Release Date *</label>
            <input
              type="date"
              value={release.release_date}
              onChange={(e) => patchRelease({ release_date: e.target.value })}
              className={`mt-1 w-full bg-white border rounded-xl px-4 py-3 text-sm outline-none ${
                errors.release_date ? "border-red-300" : "border-gray-200 focus:border-orange-400"
              }`}
            />
            {errors.release_date && <p className="text-xs text-red-500 mt-1">{errors.release_date}</p>}
          </div>
        </div>
      </div>

      {/* TikTok Clips — per track, before the final review */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between gap-3 mb-1">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Film size={15} className="text-orange-500" /> TikTok Clips
          </h4>
          <span className="text-[11px] text-gray-400">30 seconds per track — drag to position</span>
        </div>
        <p className="text-[11px] text-gray-500 mb-4">
          The release stores [start, start + 30) for each track — e.g. 01:24 → 01:54. The window is configured individually per track.
        </p>
        <div className="space-y-6">
          {tracks.map((t, i) => (
            <div key={t.key}>
              <p className="text-sm font-semibold text-gray-800 mb-2">
                {i + 1}. {t.title || "Untitled"}
              </p>
              <TikTokClipPicker track={t} />
              {errors[`tiktok_${t.key}`] && <p className="text-xs text-red-500 mt-1.5">{errors[`tiktok_${t.key}`]}</p>}
            </div>
          ))}
        </div>
      </div>

      <Panel title="Release Information" onEdit={() => goToStep(1)}>
        <dl>
          <Row label="Release title" value={release.title} />
          <Row label="Primary artist(s)" value={`${artistCount} selected`} />
          <Row label="Genre" value={genreName(release.genre_id)} />
          <Row label="Sub-genre" value={genreName(release.sub_genre_id)} />
          <Row label="Record label" value={release.label_name} />
          <Row label="Copyright Date of Recording" value={release.copyright_of_recording} />
          <Row label="Copyright Date of Release" value={release.copyright_of_release} />
          <Row label="UPC" value={release.upc || "Auto-generate"} />
          <Row label="Release type" value={tracks.length === 1 ? "Single" : `Multi-track release (${tracks.length} tracks)`} />
          <Row label="Territory" value={release.territory || "Worldwide"} />
          <Row label="Release date" value={release.release_date} />
        </dl>
      </Panel>

      {tracks.map((t, i) => (
        <Panel key={t.key} title={`Track ${i + 1} — ${t.title || "Untitled"}`} onEdit={() => goToStep(3, t.key)}>
          <dl>
            <Row label="Title" value={t.title} />
            <Row label="Version" value={t.version === "custom" ? t.custom_version : t.version} />
            <Row label="Primary artist" value={release.primary_artist_ids.length ? "Performer (from release)" : "—"} />
            <Row
              label="Additional artists"
              value={t.additional_artists.length ? t.additional_artists.map((a) => `${a.name || "Unknown"} (${a.role})`).join(", ") : "—"}
            />
            <Row label="Producers" value={t.producers.length ? t.producers.map((p) => `${p.name || "Unknown"} (${p.role})`).join(", ") : "—"} />
            <Row label="Engineers" value={t.engineers.length ? t.engineers.map((p) => `${p.name || "Unknown"} (${p.role})`).join(", ") : "—"} />
            <Row label="Musicians" value={t.musicians.length ? t.musicians.map((p) => `${p.name || "Unknown"} (${p.role})`).join(", ") : "—"} />
            <Row label="Songwriters" value={t.songwriters.length ? t.songwriters.map((s) => s.name || "Unknown songwriter").join(", ") : "—"} />
            <Row label="AI classification" value={aiLabel(t.ai_classification)} />
            <Row label="Lyrics / instrumental" value={t.is_instrumental ? "Instrumental" : "Has lyrics"} />
            {!t.is_instrumental && <Row label="Language" value={languageLabel(t.language)} />}
            {!t.is_instrumental && <Row label="Explicit" value={t.explicit_content === null ? "—" : t.explicit_content ? "Yes" : "No"} />}
            <Row label="ISRC" value={t.isrc || "Auto-generate"} />
            <Row
              label="TikTok clip"
              value={t.tiktok_clip_start != null ? `${fmtClip(t.tiktok_clip_start)} → ${fmtClip(t.tiktok_clip_start + 30)}` : "Not selected"}
            />
            <Row label="Audio" value={t.audioMeta ? `${t.audioMeta.container.toUpperCase()} · ${t.audioMeta.bitDepth}-bit · ${t.audioMeta.sampleRate} Hz` : "Missing"} />
          </dl>
        </Panel>
      ))}

      <Panel title="Artwork" onEdit={() => goToStep(4)}>
        {release.artworkPreview ? (
          <img src={release.artworkPreview} alt="Cover art" className="w-40 h-40 rounded-2xl object-cover border border-gray-200" />
        ) : (
          <p className="text-sm text-red-500">Missing cover art.</p>
        )}
      </Panel>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm font-bold text-gray-900">Ready to submit?</p>
          <p className="text-xs text-gray-500">Final validation runs before the release enters review.</p>
        </div>
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2"
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
          {submitting ? submitProgress || "Submitting..." : "Submit for Distribution"}
        </button>
      </div>
    </div>
  );
}
