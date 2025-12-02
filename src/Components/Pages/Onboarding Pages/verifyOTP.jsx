// src/pages/auth/VerifyOTP.jsx
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { FaFacebookF, FaApple, FaGoogle } from "react-icons/fa";
import "../../../index.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      toast.error("No email found. Please sign up again.");
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      return toast.error("Please enter all 6 digits");
    }

    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/v1/auth/register/otp`, {
        email: email.toLowerCase().trim(),
        otp: otpCode,
      });

      toast.success("Email verified successfully! Welcome to Mayvibe");
      setTimeout(() => navigate("/welcome", { replace: true }), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await axios.post(`${BASE_URL}/api/v1/auth/register/otp/request`, {
        email: email.toLowerCase().trim(),
      });
      toast.success("New OTP sent to your email!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="signup font-display">
      <div className="min-h-screen relative flex flex-col lg:flex-row items-center justify-center py-10">
        <div className="relative z-10 w-[90%] max-w-7xl h-[90%] lg:h-[85vh] flex flex-col lg:flex-row rounded-xl overflow-hidden backdrop-blur-xl border border-white/10">

          {/* LEFT SIDE – Same as Signup */}
          <div className="w-full lg:w-1/2 px-16 py-16 lg:py-0 flex flex-col justify-center text-white bg-white/5 backdrop-blur-xl">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">Verify Your Email</h1>
            <p className="text-white text-xs lg:text-md leading-relaxed max-w-xl">
              We've sent a 6-digit code to your email. Enter it below to complete your registration.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-1/2 relative flex flex-col lg:flex-row px-16 text-white bg-black/40 backdrop-blur-xl">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />

            <div className="w-full flex flex-col justify-center py-10 lg:py-0">
              <h2 className="text-3xl font-extrabold mb-10">Enter OTP</h2>

              <form onSubmit={handleSubmit} className="space-y-8 w-full lg:w-[80%]">
                {/* Email (readonly) */}
                <div>
                  <label className="text-xs text-white">Email</label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full bg-transparent px-2 border-b border-white/60 text-gray-300 text-sm py-1 cursor-not-allowed"
                  />
                </div>

                {/* OTP Inputs */}
                <div>
                  <label className="text-xs text-gray-300 block mb-4">Verification Code</label>
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-xl font-bold bg-transparent border-2 border-white/50 rounded-lg focus:border-orange-500 outline-none transition text-white"
                        required
                      />
                    ))}
                  </div>
                </div>

                {/* Resend Link */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="text-orange-500 cursor-pointer hover:text-orange-400 text-sm underline disabled:opacity-70"
                  >
                    {resending ? "Sending..." : "Resend OTP?"}
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 cursor-pointer hover:bg-orange-500 text-white font-semibold py-3 text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                  Verify & Continue
                </button>
              </form>
            </div>

            {/* Social Icons – same as before */}
            <div className="hidden absolute right-30 top-1/2 -translate-y-1/2 lg:flex flex-col items-center gap-6">
              <div className="h-40 w-px bg-white/20" />
              <span className="text-gray-400 text-xs tracking-widest">OR</span>
              <div className="h-40 w-px bg-white/20" />
            </div>

            <div className="flex lg:flex-col items-center justify-center gap-6 mb-5 lg:mb-0">
              <button className="w-10 h-10 bg-white hover:bg-orange-500 cursor-pointer rounded-full flex items-center justify-center transition">
                <FaFacebookF className="text-black text-lg" />
              </button>
              <button className="w-10 h-10 bg-white hover:bg-orange-500 cursor-pointer rounded-full flex items-center justify-center transition">
                <FaApple className="text-black text-lg" />
              </button>
              <button className="w-10 h-10 bg-white hover:bg-orange-500 cursor-pointer rounded-full flex items-center justify-center transition">
                <FaGoogle className="text-black text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;