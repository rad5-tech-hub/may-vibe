export function getToken() {
  return localStorage.getItem("token");
}

function decodeJwt(token) {
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
