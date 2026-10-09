import userApi from "./userApi";
import { getCurrentUserId, getStoredUser } from "./auth";

const KEY = "subscription";

export const FREE_PLAN_ID = "00000000-0000-4000-a000-000000000001";

export function getSubscription() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const sub = JSON.parse(raw);
    if (!sub?.subscription_id) return null;
    // The cached subscription belongs to exactly one account. A missing or
    // different _userId means it is stale (another account signed in) — ignore it.
    if (sub._userId !== getCurrentUserId()) return null;
    return sub;
  } catch {
    return null;
  }
}

export function saveSubscription(sub) {
  localStorage.setItem(KEY, JSON.stringify({ ...sub, _userId: getCurrentUserId() }));
}

export function pruneSubscriptionForUser(userId) {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const sub = JSON.parse(raw);
    if (!sub?._userId || String(sub._userId) !== String(userId)) {
      localStorage.removeItem(KEY);
    }
  } catch {
    localStorage.removeItem(KEY);
  }
}

export function clearSubscription() {
  localStorage.removeItem(KEY);
}

// "dsp_distribution" -> "DSP Distribution"
export function formatFeatureKey(key) {
  if (!key) return "";
  return String(key)
    .replace(/_/g, " ")
    .split(/\s+/)
    .map((w) => (w.toLowerCase() === "dsp" ? "DSP" : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join(" ");
}

export function hasActiveSubscription() {
  const sub = getSubscription();
  if (!sub?.subscription_id) return false;
  if (sub.expires_at && new Date(sub.expires_at).getTime() < Date.now()) return false;
  return true;
}

// Label lives on the JWT (label_id / label_name), not on the plan response.
export function getLabel() {
  const u = getStoredUser() || {};
  const id = u.label_id || u.labelId || u.label?.id;
  const name = u.label_name || u.labelName || u.label?.name;
  if (!id && !name) {
    const cached = getSubscription()?.label;
    if (cached) return cached;
    return null;
  }
  return { id: id || "", name: name || "" };
}

export function hasLabel() {
  return !!getLabel()?.id;
}

export function getDefaultArtist() {
  return getSubscription()?.artist || null;
}

export async function subscribe(labelName) {
  const body = { planId: FREE_PLAN_ID };
  const name = (labelName || "").trim();
  if (name) body.label_name = name;
  const res = await userApi.post("/subscribe", body);
  const data = res.data;
  if (data?.subscription_id || data?.status === "success") {
    saveSubscription(data);
    return data;
  }
  throw new Error(data?.message || "Subscription failed");
}

export async function fetchAllPlans() {
  const res = await userApi.get("/auth/all-plans");
  return res.data?.data || [];
}

export async function fetchMyPlan() {
  const res = await userApi.get("/auth/a-plan");
  const data = res.data;
  if (data?.success === false || data?.error) {
    throw new Error(data?.error || "Subscription plan not found");
  }
  const plan = data?.data || data || null;
  if (plan) cachePlan(plan);
  return plan;
}

export async function initiateSubscriptionPayment(planId) {
  const res = await userApi.post("/subscribe/create-subscription-plan", { planId });
  return res.data;
}

export async function refreshUserContext() {
  const res = await userApi.get("/auth/refresh-context");
  return res.data;
}

function cachePlan(plan) {
  const sub = {
    ...plan,
    subscription_id: plan.subscription_id || plan.id || plan.subscription?.id,
    plan: plan.plan || (plan.name ? plan : null),
    expires_at: plan.expires_at || plan.expiresAt || plan.subscription?.expires_at || null,
    label: plan.label || plan.subscription?.label || null,
  };
  if (sub.subscription_id) saveSubscription(sub);
  return sub;
}

// Call after payment confirmation: refresh context immediately, then poll
// fetchMyPlan until the backend has attached the plan (webhooks can lag).
export async function refreshContextAndFetchPlan({ retries = 4, delayMs = 2000 } = {}) {
  await refreshUserContext().catch(() => {});
  let lastErr;
  for (let attempt = 0; attempt < retries; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, delayMs * attempt));
    try {
      const plan = await fetchMyPlan();
      if (plan) return cachePlan(plan);
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr || new Error("Subscription plan not found");
}
