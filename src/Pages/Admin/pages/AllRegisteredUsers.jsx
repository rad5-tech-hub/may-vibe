import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Users } from "lucide-react";
import { getErrorMessage } from "../../../utils/errorHelper";
import adminApi from "../adminApi";

const extractList = (payload) => {
  const data = payload?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(payload?.users)) return payload.users;
  return [];
};

const extractCursor = (payload) => {
  const data = payload?.data;
  if (typeof data === "string") return data;
  return data?.next_cursor || data?.cursor || null;
};

const BooleanBadge = ({ value, label }) => (
  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${value ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
    {value ? <CheckCircle2 size={13} /> : <XCircle size={13} />}{label}
  </span>
);

BooleanBadge.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

const AllRegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadUsers = async (cursor) => {
    try {
      const response = await adminApi.get("/user", {
        params: cursor ? { cursor } : {},
      });
      setUsers((prev) => (cursor ? [...prev, ...extractList(response.data)] : extractList(response.data)));
      setNextCursor(extractCursor(response.data));
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to load users"));
    }
  };

  useEffect(() => {
    setLoading(true);
    loadUsers().finally(() => setLoading(false));
  }, []);

  const handleLoadMore = async () => {
    if (!nextCursor) return;
    setLoadingMore(true);
    await loadUsers(nextCursor);
    setLoadingMore(false);
  };

  return (
    <div className="space-y-7">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-orange-50 p-3 text-orange-500"><Users size={20} /></div>
          <div>
            <h2 className="text-lg font-bold">All registered users</h2>
            <p className="text-sm text-gray-500">Everyone with a Mayvibe account</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><div className="loading-spinner" /></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                  <tr>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Phone</th>
                    <th className="pb-3 font-medium">Verified</th>
                    <th className="pb-3 font-medium">Onboarding</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id || user.email} className="border-b border-gray-50 last:border-0">
                      <td className="py-4 font-medium">{[user.first_name, user.last_name].filter(Boolean).join(" ") || user.full_name || user.username || "—"}</td>
                      <td className="py-4 text-gray-600">{user.email || "—"}</td>
                      <td className="py-4 text-gray-600">{user.phone || "—"}</td>
                      <td className="py-4"><BooleanBadge value={!!(user.is_verified ?? user.verified)} label={user.is_verified ?? user.verified ? "Yes" : "No"} /></td>
                      <td className="py-4"><BooleanBadge value={!!(user.onBoarded ?? user.onboarded ?? user.complete_onboarding)} label={user.onBoarded ?? user.onboarded ?? user.complete_onboarding ? "Complete" : "Incomplete"} /></td>
                      <td className="py-4"><span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${(user.status || "active") === "active" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}>{user.status || "active"}</span></td>
                      <td className="py-4 text-gray-500">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan="7" className="py-8 text-center text-gray-400">No users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {nextCursor && (
              <div className="mt-5 flex justify-center">
                <button type="button" onClick={handleLoadMore} disabled={loadingMore}
                  className="cursor-pointer rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:border-orange-500 hover:text-orange-600 disabled:opacity-70">
                  {loadingMore ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default AllRegisteredUsers;
