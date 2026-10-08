export function getToken() {
  return localStorage.getItem("token");
}

export function decodeJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
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
  return decodeJwt(getToken() || "") || null;
}

function looksLikeEmail(s) {
  return typeof s === "string" && s.includes("@");
}

export function getDisplayName(user) {
  const u = user || getStoredUser() || {};
  const nested = u.user && typeof u.user === "object" ? u.user : {};
  const fromParts = [u.first_name || u.firstName || nested.first_name, u.last_name || u.lastName || nested.last_name]
    .filter(Boolean)
    .join(" ");
  const candidates = [
    u.full_name,
    u.fullname,
    nested.full_name,
    nested.fullname,
    fromParts,
    u.name,
    nested.name,
  ];
  return candidates.find((n) => n && String(n).trim() && !looksLikeEmail(n)) || "";
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
