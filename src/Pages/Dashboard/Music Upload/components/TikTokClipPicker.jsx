import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Pause, Play, Film } from "lucide-react";
import { ReleaseWizardContext } from "../context/ReleaseWizardContext";

const CLIP = 30;

const fmt = (s) => {
  const sec = Math.max(0, Math.round(Number(s) || 0));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
};

export default function TikTokClipPicker({ track, onStartChange, readOnly = false }) {
  const wizard = useContext(ReleaseWizardContext);
  const patchStart = (next) => {
    if (onStartChange) onStartChange(next);
    else if (wizard?.patchTrack) wizard.patchTrack(track.key, { tiktok_clip_start: next });
  };
  const audioRef = useRef(null);
  const barRef = useRef(null);
  const stopRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [clipPos, setClipPos] = useState(0);

  const src = track.audioPreview || "";
  const start = track.tiktok_clip_start;
  const clipLen = duration ? Math.min(CLIP, Math.max(0, duration - (start || 0))) : CLIP;

  useEffect(() => {
    setDuration(0);
    setReady(false);
    setPlaying(false);
    setClipPos(0);
  }, [src]);

  useEffect(() => {
    if (duration > 0 && track.tiktok_clip_start == null && !readOnly) {
      patchStart(0);
    }
  }, [duration, track.tiktok_clip_start, readOnly]);

  useEffect(() => {
    const a = audioRef.current;
    return () => {
      if (a && stopRef.current) a.removeEventListener("timeupdate", stopRef.current);
    };
  }, []);

  const secondsFromX = (clientX) => {
    const el = barRef.current;
    if (!el || !duration) return 0;
    const r = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    const sec = Math.round(ratio * duration);
    const maxStart = duration >= CLIP ? Math.floor(duration - CLIP) : 0;
    return Math.min(Math.max(sec, 0), maxStart);
  };

  const handlePointerDown = (e) => {
    if (!duration || readOnly) return;
    e.preventDefault();
    const move = (ev) => patchStart(secondsFromX(ev.clientX));
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    move(e);
  };

  const clearStop = () => {
    const a = audioRef.current;
    if (a && stopRef.current) a.removeEventListener("timeupdate", stopRef.current);
    stopRef.current = null;
  };

  const playClip = () => {
    const a = audioRef.current;
    if (!a || start == null || !duration) return;
    clearStop();
    a.pause();
    a.currentTime = start;
    const stopAt = Math.min(start + CLIP, duration);
    const onTime = () => {
      const pos = Math.max(0, a.currentTime - start);
      setClipPos(pos);
      if (a.currentTime >= stopAt) {
        a.pause();
        setPlaying(false);
        setClipPos(clipLen);
        clearStop();
      }
    };
    stopRef.current = onTime;
    a.addEventListener("timeupdate", onTime);
    a.play()
      .then(() => setPlaying(true))
      .catch(() => {
        clearStop();
        setPlaying(false);
      });
  };

  const pauseClip = () => {
    const a = audioRef.current;
    if (a) a.pause();
    setPlaying(false);
  };

  const windowStart = start != null && duration ? (start / duration) * 100 : 0;
  const windowWidth = duration ? (Math.min(CLIP, duration) / duration) * 100 : 0;
  const clipPct = clipLen ? Math.min(100, (clipPos / clipLen) * 100) : 0;

  return (
    <div className="space-y-2">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d) && d > 0) {
            setDuration(d);
            setReady(true);
          }
        }}
        onPause={() => setPlaying(false)}
        className="hidden"
      />

      <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
        <button
          type="button"
          onClick={playing ? pauseClip : playClip}
          disabled={start == null || !duration}
          className="cursor-pointer w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center disabled:opacity-40 shrink-0"
        >
          {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full" style={{ width: `${clipPct}%` }} />
        </div>
        <span className="text-xs text-gray-600 tabular-nums shrink-0">
          {fmt(clipPos)} / {fmt(clipLen)}
        </span>
      </div>

      <div
        ref={barRef}
        onPointerDown={handlePointerDown}
        className={`relative h-11 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden select-none touch-none ${
          duration && !readOnly ? "cursor-pointer" : duration ? "" : "opacity-50"
        }`}
        title="Click or drag to position the 30-second window"
      >
        <div className="absolute inset-0 flex items-center gap-[3px] px-2 opacity-40 pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <span key={i} className="flex-1 bg-gray-300 rounded-full" style={{ height: `${18 + ((i * 7) % 60)}%` }} />
          ))}
        </div>
        {duration > 0 && start != null && (
          <div
            className="absolute inset-y-0 bg-orange-500/30 border-x-2 border-orange-500 pointer-events-none"
            style={{ left: `${windowStart}%`, width: `${windowWidth}%` }}
          >
            <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center text-[10px] font-bold text-orange-700">30s</span>
          </div>
        )}
        {duration === 0 && (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 pointer-events-none">
            Loading audio timeline...
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap text-xs text-gray-600">
        <span className="font-semibold text-orange-600">
          {duration && start != null ? (
            <>
              {fmt(start)} → {fmt(Math.min(start + CLIP, duration))}
            </>
          ) : ready ? (
            "Click the timeline to select"
          ) : (
            "Selecting clip…"
          )}
        </span>
        <span className="text-gray-400">{duration ? `Track length ${fmt(duration)}` : ""}</span>
      </div>
      {!readOnly && (
        <p className="text-[11px] text-gray-400 flex items-center gap-1">
          <Film size={11} /> The selected window is exactly 30 seconds — drag it anywhere in the song. Example: 01:24 → 01:54.
        </p>
      )}
    </div>
  );
}

TikTokClipPicker.propTypes = {
  track: PropTypes.object.isRequired,
  onStartChange: PropTypes.func,
  readOnly: PropTypes.bool,
};
