import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../index.css";
import { getErrorMessage } from "../../../utils/errorHelper";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/admin/login`, {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });
      const temporaryToken =
        response.data.token ||
        response.data.accessToken ||
        response.data.temp_token ||
        response.data.data?.token ||
        response.data.data?.temp_token;

      toast.success("A verification code has been sent to your email");
      navigate("/admin/verifyOtp", {
        state: { email: formData.email.toLowerCase().trim(), temporaryToken },
      });
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to sign in"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login font-display">
      <div className="min-h-screen relative flex items-center justify-center px-5 py-10">
        <div className="relative z-10 w-full max-w-xl rounded-xl overflow-hidden backdrop-blur-xl border border-white/10 bg-black/40 px-6 py-12 sm:px-16">
          <div className="mb-10 text-white">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-orange-500">Mayvibe Admin</p>
            <h1 className="text-3xl font-extrabold">Sign in to continue</h1>
            <p className="mt-3 text-sm text-gray-300">Use your administrator credentials to access the platform.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 text-white">
            <div>
              <label htmlFor="admin-email" className="text-xs text-gray-300">Email</label>
              <input id="admin-email" type="email" required autoComplete="email" value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className="w-full px-2 bg-transparent border-b border-white focus:border-orange-500 outline-none text-sm py-2" />
            </div>
            <div className="relative">
              <label htmlFor="admin-password" className="text-xs text-gray-300">Password</label>
              <input id="admin-password" type={showPassword ? "text" : "password"} required autoComplete="current-password"
                value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                className="w-full px-2 pr-10 bg-transparent border-b border-white focus:border-orange-500 outline-none text-sm py-2" />
              <button type="button" aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-6 text-gray-400 hover:text-white">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? "Signing in..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
