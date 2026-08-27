import { useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { BadgeCheck, KeyRound, Save, ShieldCheck } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getErrorMessage } from "../../../utils/errorHelper";
import adminApi from "../adminApi";

const formatDate = (value) => {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return value;
  }
};

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-1 border-b border-gray-50 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
    <span className="text-xs uppercase tracking-wide text-gray-400">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value}</span>
  </div>
);

InfoRow.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.node.isRequired };

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium capitalize ${status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"}`}>
    <BadgeCheck size={13} />{status}
  </span>
);

StatusBadge.propTypes = { status: PropTypes.string.isRequired };

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingDetails, setSavingDetails] = useState(false);
  const [details, setDetails] = useState({ full_name: "", phone: "" });
  const [passwords, setPasswords] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [showPasswords, setShowPasswords] = useState({ current_password: false, new_password: false, confirm_password: false });
  const [confirmAction, setConfirmAction] = useState(null); // "change" | "reset"
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async () => {
    if (confirmAction === "change") {
      setConfirming(true);
      await submitChangePassword();
      setConfirming(false);
    } else if (confirmAction === "reset") {
      setConfirming(true);
      try {
        await adminApi.post("/admin/forgot-password", { email: profile.email });
        toast.success("A reset code has been sent to your email");
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to send reset code"));
      }
      setConfirming(false);
    }
    setConfirmAction(null);
  };

  const submitChangePassword = async () => {
    if (passwords.new_password !== passwords.confirm_password) return toast.error("New passwords do not match");
    if (!passwords.current_password || !passwords.new_password) return toast.error("Please fill in all password fields");
    try {
      await adminApi.post("/admin/change-password", {
        current_password: passwords.current_password,
        new_password: passwords.new_password,
      });
      setPasswords({ current_password: "", new_password: "", confirm_password: "" });
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to change password"));
    }
  };

  const handleResetRequest = () => setConfirmAction("reset");

  const ConfirmModal = ({ action }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-bold text-gray-900">{action === "change" ? "Change your password?" : "Send reset code?"}</h3>
        <p className="mt-2 text-sm text-gray-500">
          {action === "change"
            ? "Are you sure you want to update your password? This cannot be undone."
            : `We will send a password reset code to ${profile?.email}. Continue?`}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={() => setConfirmAction(null)} className="cursor-pointer rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
          <button type="button" onClick={handleConfirm} disabled={confirming}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-500 disabled:opacity-70">
            {confirming && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
            {action === "change" ? "Yes, change it" : "Yes, send code"}
          </button>
        </div>
      </div>
    </div>
  );

  ConfirmModal.propTypes = { action: PropTypes.string.isRequired };

  const togglePasswordVisibility = (field) => setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));

  const PasswordInput = ({ id, label, field, autoComplete }) => (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
      <div className="relative">
        <input id={id} type={showPasswords[field] ? "text" : "password"} autoComplete={autoComplete} required value={passwords[field]}
          onChange={(event) => setPasswords({ ...passwords, [field]: event.target.value })}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pr-10 text-sm outline-none focus:border-orange-500" />
        <button type="button" onClick={() => togglePasswordVisibility(field)} aria-label={showPasswords[field] ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700">
          {showPasswords[field] ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );

  PasswordInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    autoComplete: PropTypes.string,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await adminApi.get("/admin/profile");
        const data = response.data?.data || response.data;
        setProfile(data);
        setDetails({ full_name: data.full_name || "", phone: data.phone || "" });
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to load profile"));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSaveDetails = async (event) => {
    event.preventDefault();
    setSavingDetails(true);
    try {
      await adminApi.patch("/admin/profile", {
        full_name: details.full_name.trim(),
        phone: details.phone.trim(),
      });
      setProfile({ ...profile, full_name: details.full_name.trim(), phone: details.phone.trim() });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update profile"));
    } finally {
      setSavingDetails(false);
    }
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (passwords.new_password !== passwords.confirm_password) return toast.error("New passwords do not match");
    if (!passwords.current_password || !passwords.new_password) return toast.error("Please fill in all password fields");
    setConfirmAction("change");
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  const role = profile?.roles?.[0];

  return (
    <div className="space-y-7">
      {/* Profile Information */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-orange-50 p-3 text-orange-500"><ShieldCheck size={20} /></div>
          <div>
            <h2 className="text-lg font-bold">Profile information</h2>
            <p className="text-sm text-gray-500">Your account details and access level</p>
          </div>
        </div>

        <div className="grid gap-x-10 md:grid-cols-2">
          <div>
            <InfoRow label="Full name" value={profile?.full_name || "—"} />
            <InfoRow label="Email" value={profile?.email || "—"} />
            <InfoRow label="Phone" value={profile?.phone || "—"} />
          </div>
          <div>
            <InfoRow label="Status" value={<StatusBadge status={profile?.status || "unknown"} />} />
            <InfoRow label="Role" value={role ? <span className="capitalize">{role.name.replace(/_/g, " ")}</span> : "—"} />
            <InfoRow label="Role description" value={role?.description || "—"} />
          </div>
        </div>

        <div className="mt-4 grid gap-x-10 border-t border-gray-100 pt-4 text-xs text-gray-400 sm:grid-cols-2">
          <p>Last login: {formatDate(profile?.last_login_at)}</p>
          <p>MFA: {profile?.mfa_enabled ? "Enabled" : "Disabled"} · Member since {formatDate(profile?.createdAt)}</p>
        </div>
      </section>

      {/* Edit Profile */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold">Edit profile</h2>
        <p className="mb-5 text-sm text-gray-500">Update your fullname and phone number</p>
        <form onSubmit={handleSaveDetails} className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="full-name" className="mb-1 block text-xs font-medium text-gray-500">Full name</label>
            <input id="full-name" type="text" required value={details.full_name}
              onChange={(event) => setDetails({ ...details, full_name: event.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-xs font-medium text-gray-500">Phone number</label>
            <input id="phone" type="tel" placeholder="+234 800 000 0000" value={details.phone}
              onChange={(event) => setDetails({ ...details, phone: event.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={savingDetails} className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70">
              {savingDetails && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
              <Save size={15} />Save changes
            </button>
          </div>
        </form>
      </section>

      {/* Change Password */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold">Change password</h2>
        <p className="mb-5 text-sm text-gray-500">Use a strong password you don&apos;t use elsewhere</p>
        <form onSubmit={handleChangePassword} className="grid max-w-2xl gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <PasswordInput id="current-password" label="Current password" field="current_password" autoComplete="current-password" />
          </div>
          <PasswordInput id="new-password" label="New password" field="new_password" autoComplete="new-password" />
          <PasswordInput id="confirm-password" label="Confirm new password" field="confirm_password" autoComplete="new-password" />
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button type="submit" className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700">
              <KeyRound size={15} />Change password
            </button>
            <button type="button" onClick={handleResetRequest}
              className="cursor-pointer rounded-xl border border-orange-500 px-6 py-2.5 text-sm font-semibold text-orange-600 transition hover:bg-orange-50">
              Reset password
            </button>
          </div>
        </form>
      </section>

      {confirmAction && <ConfirmModal action={confirmAction} />}
    </div>
  );
};

export default Profile;
