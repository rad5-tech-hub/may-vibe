import userApi from "./userApi";

const KEY = "subscription";

export const FREE_PLAN_ID = "00000000-0000-4000-a000-000000000001";

export function getSubscription() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSubscription(sub) {
  localStorage.setItem(KEY, JSON.stringify(sub));
}

export function clearSubscription() {
  localStorage.removeItem(KEY);
}

export function hasActiveSubscription() {
  const sub = getSubscription();
  if (!sub?.subscription_id) return false;
  if (sub.expires_at && new Date(sub.expires_at).getTime() < Date.now()) return false;
  return true;
}

export function getLabel() {
  return getSubscription()?.label || null;
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
