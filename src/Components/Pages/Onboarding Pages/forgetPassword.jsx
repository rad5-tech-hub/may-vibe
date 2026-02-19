// src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import "../../../index.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ForgotPassword = () => {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/auth/forgot-url`, {
        email: email.trim().toLowerCase(),
      });

      toast.success("OTP sent! Check your email.");
      
      // Navigate to reset page and pass email via state
      // navigate("/resetpassword", { 
      //   state: { email: email.trim().toLowerCase() } 
      // });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

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
                Forgot Password?
              </h2>

              <p className="text-gray-400 mt-2 text-xs lg:text-sm">
                Enter your email to receive the OTP to reset your password.
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-gray-600 text-white py-3 px-0 focus:outline-none focus:border-orange-500 placeholder-gray-500 transition-colors"
                required
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 cursor-pointer text-white font-semibold py-4 rounded transition-colors disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  "Send OTP"
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

export default ForgotPassword;