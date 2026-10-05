const MAX_IMG_BYTES = 5 * 1024 * 1024;
const HARD_MAX_BYTES = 10 * 1024 * 1024;

export const ARTWORK_RULES = {
  minDim: 1400,
  recommendedDim: 3000,
  types: ["image/jpeg", "image/png"],
};

export function compressImage(file, maxDim = 3000, quality = 0.85) {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/") || file.size <= MAX_IMG_BYTES) return resolve(file);
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const s = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * s);
        height = Math.round(height * s);
      }
      const c = document.createElement("canvas");
      c.width = width;
      c.height = height;
      c.getContext("2d").drawImage(img, 0, 0, width, height);
      c.toBlob(
        (blob) => {
          if (!blob) return resolve(file);
          resolve(new File([blob], file.name, { type: "image/jpeg" }));
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}

export function readImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image dimensions"));
    };
    img.src = url;
  });
}

export async function validateArtwork(file) {
  const errors = [];
  if (!file) return { ok: false, errors: ["Artwork is required."] };
  if (!ARTWORK_RULES.types.includes(file.type)) {
    errors.push("Cover art must be a .jpg or .png file.");
  }
  if (file.size > HARD_MAX_BYTES) {
    errors.push(`Artwork must be ${Math.round(HARD_MAX_BYTES / 1024 / 1024)} MB or smaller.`);
  }
  if (errors.length) return { ok: false, errors };

  try {
    const { width, height } = await readImageDimensions(file);
    if (width !== height) {
      errors.push(`Cover art must be square (this image is ${width}×${height}).`);
    }
    if (width < ARTWORK_RULES.minDim || height < ARTWORK_RULES.minDim) {
      errors.push(
        `Cover art must be at least ${ARTWORK_RULES.minDim}×${ARTWORK_RULES.minDim} px (this image is ${width}×${height}).`
      );
    }
    return { ok: errors.length === 0, errors, width, height, mimeType: file.type };
  } catch {
    return { ok: false, errors: ["Could not read the image file. Try another file."] };
  }
}
