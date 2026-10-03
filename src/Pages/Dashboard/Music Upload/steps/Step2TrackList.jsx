import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Upload, Music2, GripVertical, Trash2, FileAudio, Plus } from "lucide-react";
import { useReleaseWizard } from "../context/ReleaseWizardContext";
import { formatAudioMeta } from "../../../../utils/audioMeta";
import { AUDIO_RULES_TEXT } from "../../../../utils/releaseConstants";

function TrackRow({ track, index, total, dragProps }) {
  const { patchTrack, removeTrack, errors, setErrors, attachAudio } = useReleaseWizard();
  const [dragOver, setDragOver] = useState(false);
  const audioInputRef = useRef(null);

  const titleErr = errors[`title_${track.key}`];
  const audioErr = errors[`audio_${track.key}`];

  const handleAudioPick = (file) => {
    if (!file) return;
    if (!/\.(wav|flac)$/i.test(file.name)) {
      toast.error(`${file.name}: only WAV or FLAC files are supported.`);
      return;
    }
    attachAudio(track.key, file);
    if (audioErr) setErrors({});
  };

  return (
    <div
      {...dragProps}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        dragProps.onDrop(e);
      }}
      className={`bg-white border rounded-2xl p-4 flex items-center gap-3 transition ${dragOver ? "border-orange-400 shadow-md" : "border-gray-200"}`}
    >
      <span className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 shrink-0" title="Drag to reorder">
        <GripVertical size={18} />
      </span>
      <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center shrink-0">{index + 1}</span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <input
            value={track.title}
            onChange={(e) => {
              patchTrack(track.key, { title: e.target.value });
              if (titleErr) setErrors({});
            }}
            placeholder="Track title"
            className={`font-semibold text-gray-900 text-sm bg-white border rounded-lg px-3 py-1.5 outline-none focus:border-orange-400 min-w-[180px] max-w-full ${
              titleErr ? "border-red-300" : "border-gray-200"
            }`}
          />
          {total === 1 && <span className="text-[10px] bg-orange-50 text-orange-600 font-bold px-2 py-0.5 rounded-full uppercase">Single</span>}
        </div>
        {titleErr && <p className="text-[11px] text-red-500 mt-0.5">{titleErr}</p>}
        <div className="mt-1.5">
          {track.audioMeta ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[11px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                <FileAudio size={11} /> {formatAudioMeta(track.audioMeta)}
              </span>
              {track.audioName && <span className="text-[11px] text-gray-400 truncate max-w-[180px]">{track.audioName}</span>}
              <button
                type="button"
                onClick={() => audioInputRef.current?.click()}
                className="cursor-pointer text-[11px] font-semibold text-orange-600 hover:text-orange-700 underline underline-offset-2"
              >
                Replace audio
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => audioInputRef.current?.click()}
              className="cursor-pointer inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-full transition"
            >
              <Upload size={11} /> Add audio
            </button>
          )}
          <input
            ref={audioInputRef}
            type="file"
            accept=".wav,.flac,audio/wav,audio/flac"
            className="hidden"
            onChange={(e) => {
              handleAudioPick(e.target.files[0] || null);
              e.target.value = "";
            }}
          />
        </div>
        {audioErr && <p className="text-[11px] text-red-500 mt-0.5">{audioErr}</p>}
      </div>

      <button
        type="button"
        onClick={() => removeTrack(track.key)}
        className="cursor-pointer p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg shrink-0"
        title="Remove track"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

TrackRow.propTypes = {
  track: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  dragProps: PropTypes.object.isRequired,
};

export default function Step2TrackList() {
  const { tracks, addTrack, attachAudio, moveTrack, isSingle, errors, release } = useReleaseWizard();
  const fileRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const dragIndex = useRef(null);

  const accepted = (file) => /\.(wav|flac)$/i.test(file.name);
  const rejectedExt = (file) => {
    if (!accepted(file)) {
      toast.error(`${file.name}: only WAV or FLAC files are supported.`);
      return true;
    }
    return false;
  };

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    files.forEach((f) => {
      if (rejectedExt(f)) return;
      if (tracks.length === 1 && !tracks[0].audioMeta && !tracks[0].audioFile) {
        attachAudio(tracks[0].key, f);
      } else {
        addTrack(f);
      }
    });
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-3xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div>
            <h3 className="font-bold text-gray-900">Audio Requirements</h3>
            <ul className="text-xs text-gray-500 mt-1.5 space-y-0.5">
              <li>Format: <span className="font-semibold text-gray-700">{AUDIO_RULES_TEXT.formats}</span></li>
              <li>Resolution: <span className="font-semibold text-gray-700">{AUDIO_RULES_TEXT.bitDepth}</span></li>
              <li>Channels: <span className="font-semibold text-gray-700">{AUDIO_RULES_TEXT.channels}</span></li>
            </ul>
          </div>
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${
              isSingle ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
            }`}
          >
            {isSingle ? "1 track → Single" : `${tracks.length} tracks → Multi-track release`}
          </span>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed rounded-2xl py-10 flex flex-col items-center justify-center text-center transition ${
            dragActive ? "border-orange-400 bg-orange-50" : "border-gray-300 hover:border-orange-300 bg-gray-50"
          }`}
        >
          <Upload size={32} className="text-orange-400 mb-2" />
          <p className="text-sm font-semibold text-gray-700">Drag and drop audio files here</p>
          <p className="text-xs text-gray-400 mt-1">or click to browse — WAV or FLAC, multiple files supported</p>
          <input
            ref={fileRef}
            type="file"
            accept=".wav,.flac,audio/wav,audio/flac"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
        <button
          type="button"
          onClick={() => addTrack()}
          className="cursor-pointer mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          <Plus size={15} /> Add track without audio yet
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Music2 size={17} className="text-orange-500" /> Track List
          </h3>
          <span className="text-xs text-gray-400">Drag rows to reorder — order is saved with the release</span>
        </div>

        {tracks.map((t, i) => (
          <TrackRow
            key={t.key}
            track={t}
            index={i}
            total={tracks.length}
            dragProps={{
              draggable: true,
              onDragStart: () => {
                dragIndex.current = i;
              },
              onDrop: () => {
                if (dragIndex.current !== null && dragIndex.current !== i) moveTrack(dragIndex.current, i);
                dragIndex.current = null;
              },
            }}
          />
        ))}

        {isSingle && (
          <p className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            Single release: the track title must exactly match the release title{" "}
            <span className="font-semibold text-gray-700">&ldquo;{release.title || "—"}&rdquo;</span>.
          </p>
        )}
        {errors.tracks && <p className="text-xs text-red-500">{errors.tracks}</p>}
      </div>
    </div>
  );
}
