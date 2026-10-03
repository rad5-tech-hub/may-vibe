function isWavExtension(name) {
  return /\.wav$/i.test(name || "");
}

function isFlacExtension(name) {
  return /\.flac$/i.test(name || "");
}

function readWav(buf) {
  const dv = new DataView(buf);
  if (dv.byteLength < 44) return null;
  if (dv.getUint32(0, false) !== 0x52494646) return null;
  if (dv.getUint32(8, false) !== 0x57415645) return null;
  let off = 12;
  while (off + 8 <= dv.byteLength) {
    const id = String.fromCharCode(
      dv.getUint8(off),
      dv.getUint8(off + 1),
      dv.getUint8(off + 2),
      dv.getUint8(off + 3)
    );
    const size = dv.getUint32(off + 4, true);
    if (id === "fmt ") {
      const s = off + 8;
      if (s + 16 > dv.byteLength) return null;
      return {
        container: "wav",
        channels: dv.getUint16(s + 2, true),
        sampleRate: dv.getUint32(s + 4, true),
        bitDepth: dv.getUint16(s + 14, true),
      };
    }
    off += 8 + size + (size % 2);
  }
  return null;
}

function readFlac(buf) {
  const dv = new DataView(buf);
  if (dv.byteLength < 42) return null;
  if (dv.getUint32(0, false) !== 0x664c6143) return null;
  const blockType = dv.getUint8(4) & 0x7f;
  if (blockType !== 0) return null;
  const b = new Uint8Array(buf, 8, 34);
  const sampleRate = (b[10] << 12) | (b[11] << 4) | (b[12] >> 4);
  const channels = ((b[12] >> 1) & 0x07) + 1;
  const bitDepth = (((b[12] & 0x01) << 4) | (b[13] >> 4)) + 1;
  return { container: "flac", channels, sampleRate, bitDepth };
}

export async function readAudioMeta(file) {
  if (!file) return null;
  const extOk = isWavExtension(file.name) || isFlacExtension(file.name);
  if (!extOk) return null;
  const buf = await file.slice(0, 131072).arrayBuffer();
  return readWav(buf) || readFlac(buf);
}

export function validateAudioMeta(meta) {
  const errors = [];
  if (!meta) {
    return ["Could not read audio metadata. Only WAV and FLAC files are supported."];
  }
  if (meta.channels !== 2) {
    errors.push(`Audio must be stereo (this file has ${meta.channels} channel${meta.channels === 1 ? "" : "s"}).`);
  }
  if (meta.bitDepth < 16 || meta.bitDepth > 24) {
    errors.push(`Bit depth must be between 16-bit and 24-bit (this file is ${meta.bitDepth}-bit).`);
  }
  if (meta.sampleRate < 44100 || meta.sampleRate > 192000) {
    errors.push(`Sample rate must be between 44.1 kHz and 192 kHz (this file is ${(meta.sampleRate / 1000).toFixed(1)} kHz).`);
  }
  return errors;
}

export function formatAudioMeta(meta) {
  if (!meta) return "";
  const depth = `${meta.bitDepth}-bit`;
  const rate =
    meta.sampleRate % 1000 === 0
      ? `${meta.sampleRate / 1000} kHz`
      : `${(meta.sampleRate / 1000).toFixed(1)} kHz`;
  return `${meta.container.toUpperCase()} · ${depth} · ${rate} · Stereo`;
}
