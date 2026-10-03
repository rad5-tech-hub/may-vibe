import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { ImagePlus, Loader2 } from "lucide-react";
import { useReleaseWizard } from "../context/ReleaseWizardContext";
import { validateArtwork, ARTWORK_RULES } from "../../../../utils/imageUtils";

function ArtworkBox({ release, patchRelease, setErrors }) {
  const inputRef = useRef(null);
  const [checking, setChecking] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    setChecking(true);
    const result = await validateArtwork(file);
    setChecking(false);
    if (!result.ok) {
      result.errors.forEach((e) => toast.error(e));
      patchRelease({ artworkFile: null, artworkPreview: "", artworkDims: { ok: false, errors: result.errors } });
      return;
    }
    const preview = URL.createObjectURL(file);
    patchRelease({ artworkFile: file, artworkPreview: preview, artworkDims: { ok: true, errors: [], width: result.width, height: result.height } });
    setErrors({});
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        handleFile(e.dataTransfer.files?.[0]);
      }}
      className={`border-2 border-dashed rounded-3xl p-6 transition ${dragActive ? "border-orange-400 bg-orange-50" : "border-gray-300 bg-gray-50"}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer w-full max-w-sm mx-auto md:mx-0 block group"
        >
          {release.artworkPreview ? (
            <img
              src={release.artworkPreview}
              alt="Cover art preview"
              className="w-full aspect-square rounded-2xl object-cover border border-gray-200 group-hover:opacity-90 transition"
            />
          ) : (
            <div className="w-full aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 group-hover:border-orange-300 group-hover:text-orange-400 transition">
              <ImagePlus size={40} />
              <p className="text-xs mt-2">Click or drag an image to upload</p>
            </div>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0] || null)}
        />
        <div className="text-sm text-gray-600">
          <p className="font-semibold text-gray-800 mb-2">Cover art requirements:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Square <span className="font-medium">.jpg</span> or <span className="font-medium">.png</span> file, at least{" "}
              {ARTWORK_RULES.minDim}×{ARTWORK_RULES.minDim} px ({ARTWORK_RULES.recommendedDim}×{ARTWORK_RULES.recommendedDim} px recommended).
            </li>
            <li>Clear and high quality — no blurry or pixelated images.</li>
            <li>May contain the artist name, the release title, or both — no other text, logos, or social media handles.</li>
          </ul>
          {checking && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-orange-600 font-semibold">
              <Loader2 size={13} className="animate-spin" /> Validating artwork...
            </p>
          )}
          {release.artworkDims?.ok && (
            <p className="mt-3 text-xs text-green-600 font-semibold">
              ✓ Valid — {release.artworkDims.width}×{release.artworkDims.height} px
            </p>
          )}
          {release.artworkFile && (
            <button
              type="button"
              onClick={() => patchRelease({ artworkFile: null, artworkPreview: "", artworkDims: null })}
              className="mt-3 cursor-pointer block text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

ArtworkBox.propTypes = {
  release: PropTypes.object.isRequired,
  patchRelease: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default function Step4CoverArt() {
  const { release, patchRelease, errors, setErrors } = useReleaseWizard();

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-3xl border border-gray-200 p-6 lg:p-8">
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 mb-1">Cover Art</h3>
          <p className="text-xs text-gray-500">Release-level artwork delivered to all DSPs.</p>
        </div>
        <ArtworkBox release={release} patchRelease={patchRelease} setErrors={setErrors} />
        {errors.artwork && <p className="text-xs text-red-500 mt-3">{errors.artwork}</p>}
      </div>
    </div>
  );
}
