import userApi from "./userApi";

/**
 * Contributor search used by every picker (artists, producers, engineers, musicians).
 *
 * NOTE: the backend's GET /contributors?q= is currently label-scoped — it only
 * returns people under the caller's own label (verified: foreign artists return
 * data: [], own-label artists return full rows). The spec calls for a global
 * "search across Mayvibe" — once the backend exposes the global param/endpoint,
 * change ONLY the request below and every picker picks it up automatically.
 */
export async function searchContributors(q) {
  const res = await userApi.get("/contributors", { params: { q } });
  const list = res.data?.data || [];
  return Array.isArray(list) ? list : [];
}

/**
 * Songwriter search — the contract documents this one as GLOBAL
 * (GET /contributors/songwriters/search?q=).
 */
export async function searchSongwriters(q) {
  const res = await userApi.get("/contributors/songwriters/search", { params: { q } });
  const list = res.data?.data || [];
  return Array.isArray(list) ? list : [];
}
