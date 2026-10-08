export function getToken() {
  return localStorage.getItem("token");
}

export function decodeJwt(token) {
  try {
    const raw = String(token || "").replace(/^Bearer\s+/i, "");
    const base64Url = raw.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/").padEnd(base64Url.length + ((4 - (base64Url.length % 4)) % 4), "=");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;
  const decoded = decodeJwt(token);
  if (decoded && decoded.exp) {
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      // expired - clear
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
  }
  // if token exists and not expired, consider authenticated
  // optional: also check userId presence
  return true;
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getStoredUser() {
  let stored = null;
  try {
    const raw = localStorage.getItem("user");
    if (raw) stored = JSON.parse(raw);
  } catch {
    stored = null;
  }
  const decoded = decodeJwt(getToken() || "");
  if (stored && decoded) return { ...decoded, ...stored };
  return stored || decoded || null;
}

function looksLikeEmail(s) {
  return typeof s === "string" && s.includes("@");
}

function nameFromObject(u, depth = 0) {
  if (!u || typeof u !== "object" || depth > 3) return "";
  const fromParts = [
    u.first_name || u.firstName || u.given_name || u.givenName,
    u.last_name || u.lastName || u.family_name || u.familyName,
  ]
    .filter(Boolean)
    .join(" ");
  const candidates = [
    u.fullName,
    u.full_name,
    u.fullname,
    u.FullName,
    fromParts,
    u.name,
    u.displayName,
    u.display_name,
    u.username,
  ];
  const hit = candidates.find((n) => n && String(n).trim() && !looksLikeEmail(n));
  if (hit) return String(hit).trim();
  for (const v of Object.values(u)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const nested = nameFromObject(v, depth + 1);
      if (nested) return nested;
    }
  }
  return "";
}

export function getDisplayName(user) {
  return nameFromObject(user || getStoredUser() || {});
}

export function getCurrentUserId() {
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const u = JSON.parse(raw);
      const id = u?.userId || u?.id;
      if (id) return String(id);
    }
  } catch {
    /* fall through to token decode */
  }
  const decoded = decodeJwt(getToken() || "");
  const id = decoded?.userId || decoded?.id;
  return id ? String(id) : null;
}
