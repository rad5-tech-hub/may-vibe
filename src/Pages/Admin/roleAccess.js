// Role-based module visibility per ADMIN_RULES.md (internal doc).
// Roles are matched loosely so backend naming variations still resolve.

const ALL = "*";

export const ROLE_MODULES = {
  super_admin: ALL,
  content_admin: [
    "/admin", "/admin/profile",
    "/admin/releases", "/admin/album", "/admin/track", "/admin/distro-artiste",
    "/admin/distributions/albums", "/admin/distributions/tracks",
    "/admin/add-genre", "/admin/verify-artist",
  ],
  finance_admin: [
    "/admin", "/admin/profile",
    "/admin/transactions", "/admin/transactions-without-accounts",
    "/admin/fundings", "/admin/payment-requests", "/admin/activation-fees",
  ],
  support_admin: [
    "/admin", "/admin/profile",
    "/admin/users", "/admin/verify-artist",
  ],
};

export const resolveRoleKey = (roleName) => {
  const name = (roleName || "").toLowerCase();
  if (!name) return null;
  if (name.includes("super")) return "super_admin";
  if (name.includes("content")) return "content_admin";
  if (name.includes("financ")) return "finance_admin";
  if (name.includes("support")) return "support_admin";
  return name;
};

export const canAccess = (roleName, path) => {
  const key = resolveRoleKey(roleName);
  if (!key) return true;
  const allowed = ROLE_MODULES[key];
  if (!allowed) return true;
  if (allowed === ALL) return true;
  return allowed.includes(path);
};

export const getInitials = (fullName) =>
  (fullName || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "AU";
