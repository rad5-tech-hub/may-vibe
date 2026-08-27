import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, UserPlus, UserCog } from "lucide-react";
import { getErrorMessage } from "../../../utils/errorHelper";
import adminApi from "../adminApi";

const AddAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", role_id: "" });
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [updating, setUpdating] = useState(false);

  const refreshAdmins = async () => {
    const adminsRes = await adminApi.get("/admin/all-admin");
    setAdmins(adminsRes.data?.data?.admins || adminsRes.data?.data || (Array.isArray(adminsRes.data) ? adminsRes.data : []));
  };

  const handleStatusChange = async (action) => {
    if (!selectedAdmin) return;
    setUpdating(true);
    try {
      await adminApi.patch(`/admin/${selectedAdmin.id}/${action}`);
      toast.success(action === "suspend" ? "Admin suspended successfully" : "Admin restored successfully");
      setSelectedAdmin(null);
      await refreshAdmins();
    } catch (error) {
      toast.error(getErrorMessage(error, action === "suspend" ? "Failed to suspend admin" : "Failed to restore admin"));
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [adminsRes, rolesRes] = await Promise.all([
          adminApi.get("/admin/all-admin"),
          adminApi.get("/admin/roles"),
        ]);
        setAdmins(adminsRes.data?.data?.admins || adminsRes.data?.data || (Array.isArray(adminsRes.data) ? adminsRes.data : []));
        setRoles(rolesRes.data?.data?.roles || rolesRes.data?.data || (Array.isArray(rolesRes.data) ? rolesRes.data : []));
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to load admins and roles"));
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.role_id) {
      return toast.error("Please fill in all fields");
    }
    setCreating(true);
    try {
      await adminApi.post("/admin/create", {
        full_name: form.full_name.trim(),
        email: form.email.toLowerCase().trim(),
        phone: form.phone.trim(),
        role_id: form.role_id,
      });
      toast.success("Admin created successfully");
      setForm({ full_name: "", email: "", phone: "", role_id: "" });

      await refreshAdmins();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to create admin"));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-7">
      {/* Existing Admins */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-orange-50 p-3 text-orange-500"><ShieldCheck size={20} /></div>
          <div>
            <h2 className="text-lg font-bold">Administrators</h2>
            <p className="text-sm text-gray-500">All admins with dashboard access</p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-10"><div className="loading-spinner" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <tr><th className="pb-3 font-medium">Email</th><th className="pb-3 font-medium">Role</th><th className="pb-3 font-medium text-right">Actions</th></tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id || admin.email} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 font-medium">
                      {admin.email || admin.full_name}
                      {admin.status === "suspended" && (
                        <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">Suspended</span>
                      )}
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium capitalize text-orange-600">
                        {(admin.roles?.[0]?.name || admin.role || "—").replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button type="button" onClick={() => setSelectedAdmin(admin)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-orange-500 hover:text-orange-600">
                        <UserCog size={14} />Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {admins.length === 0 && (
                  <tr><td colSpan="3" className="py-8 text-center text-gray-400">No admins found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Create Admin */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-orange-50 p-3 text-orange-500"><UserPlus size={20} /></div>
          <div>
            <h2 className="text-lg font-bold">Add new admin</h2>
            <p className="text-sm text-gray-500">Create an administrator account</p>
          </div>
        </div>
        <form onSubmit={handleCreate} className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="admin-name" className="mb-1 block text-xs font-medium text-gray-500">Full name</label>
            <input id="admin-name" type="text" required value={form.full_name}
              onChange={(event) => setForm({ ...form, full_name: event.target.value })}
              placeholder="Jane Doe"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
          </div>
          <div>
            <label htmlFor="admin-phone" className="mb-1 block text-xs font-medium text-gray-500">Phone number</label>
            <input id="admin-phone" type="tel" required value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              placeholder="+2348012345678"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
          </div>
          <div>
            <label htmlFor="admin-email" className="mb-1 block text-xs font-medium text-gray-500">Admin email</label>
            <input id="admin-email" type="email" required value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="jane@mayvibe.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
          </div>
          <div>
            <label htmlFor="admin-type" className="mb-1 block text-xs font-medium text-gray-500">Admin type</label>
            <select id="admin-type" required value={form.role_id}
              onChange={(event) => setForm({ ...form, role_id: event.target.value })}
              className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-500">
              <option value="" disabled>Select role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{(role.name || "").replace(/_/g, " ")}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={creating}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70">
              {creating && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
              <UserPlus size={15} />Create admin
            </button>
          </div>
        </form>
      </section>

      {/* Suspend / Restore Modal */}
      {selectedAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">Manage admin</h3>
            <p className="mt-1 text-sm text-gray-500">{selectedAdmin.email || selectedAdmin.full_name}</p>
            <p className="mt-4 text-sm text-gray-500">
              Status: <span className={`font-semibold capitalize ${selectedAdmin.status === "suspended" ? "text-red-600" : "text-emerald-600"}`}>{selectedAdmin.status || "active"}</span>
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              {selectedAdmin.status === "suspended" ? (
                <button type="button" disabled={updating} onClick={() => handleStatusChange("reactivate")}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-70">
                  {updating && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                  Restore admin
                </button>
              ) : (
                <button type="button" disabled={updating} onClick={() => handleStatusChange("suspend")}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-70">
                  {updating && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                  Suspend admin
                </button>
              )}
              <button type="button" onClick={() => setSelectedAdmin(null)}
                className="cursor-pointer rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAdmin;
