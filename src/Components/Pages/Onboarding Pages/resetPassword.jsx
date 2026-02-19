// src/pages/auth/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../index.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetToken = searchParams.get("token");
  const urlEmail = searchParams.get("email");

  useEffect(() => {
    if (urlEmail) {
      setEmail(decodeURIComponent(urlEmail));
    }

    if (!resetToken) {
      toast.error("Invalid or missing reset token. Please request a new reset link.");
    }
  }, [resetToken, urlEmail]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!resetToken) {
      return toast.error("Reset token is missing. Please use the link from your email.");
    }

    setLoading(true);

    try {
      await axios.patch(`${BASE_URL}/auth/reset-password`, {
        email: email.trim().toLowerCase(),
        token: resetToken,
        password,
        confirmPassword,
      });

      toast.success("Password changed successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1800);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to reset password";

      toast.error(msg);

      // Optional: redirect to request new link if token invalid/expired
      if (
        msg.toLowerCase().includes("invalid") ||
        msg.toLowerCase().includes("expired") ||
        msg.toLowerCase().includes("token")
      ) {
        setTimeout(() => {
          navigate("/forgot-password");
        }, 2200);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!resetToken) {
    return (
      <div className="min-h-screen login font-display flex items-center justify-center p-4 text-center text-white">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-4">Invalid Reset Link</h2>
          <p className="text-gray-400 mb-6">
            The link you followed is invalid, expired, or has already been used.  
            Please request a new password reset link.
          </p>
          <Link
            to="/forgot-password"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded transition-colors"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen login font-display flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-black/70 backdrop-blur-sm px-6 py-10 sm:px-12 sm:py-12 md:px-20 md:py-16 lg:px-24 lg:py-16">
          <div className="max-w-lg lg:max-w-3xl mx-auto bg-black/70 backdrop-blur-sm p-8 lg:p-12 border-2 border-orange-500 rounded-xl">

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-8 h-8 text-orange-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>

              <h2 className="text-white text-xl lg:text-3xl font-bold">
                Set New Password
              </h2>

              <p className="text-gray-400 mt-2 text-xs lg:text-sm">
                Enter your email (pre-filled if from link) and choose a new password.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-6">

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-gray-600 text-white py-3 px-0 focus:outline-none focus:border-orange-500 placeholder-gray-500 transition-colors"
                required
              />

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-600 text-white py-3 px-0 focus:outline-none focus:border-orange-500 placeholder-gray-500 transition-colors"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-4 cursor-pointer text-gray-200 hover:text-white transition"
                >
                  {showNewPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-600 text-white py-3 px-0 focus:outline-none focus:border-orange-500 placeholder-gray-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-4 cursor-pointer text-gray-200 hover:text-white transition"
                >
                  {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 cursor-pointer text-white font-semibold py-4 rounded transition-colors disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-orange-500 hover:text-orange-400 text-sm">
                Back to Login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;