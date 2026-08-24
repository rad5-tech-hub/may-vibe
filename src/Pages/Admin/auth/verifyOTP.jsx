import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import "../../../index.css";
import { getErrorMessage } from "../../../utils/errorHelper";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminVerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const temporaryToken = location.state?.temporaryToken;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const setCode = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 6).split("");
    setOtp([...digits, ...Array(6 - digits.length).fill("")]);
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const handleDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return toast.error("Please enter all 6 digits");
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/admin/auth/verify`, {
        email, otp: code, token: temporaryToken,
      });
      const token = response.data.token || response.data.accessToken;
      if (token) localStorage.setItem("adminToken", token);
      toast.success("Welcome to the admin dashboard");
      navigate("/admin", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Invalid or expired code"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup font-display">
      <div className="min-h-screen flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-xl rounded-xl border border-white/10 bg-black/40 px-6 py-12 text-white backdrop-blur-xl sm:px-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-orange-500">Mayvibe Admin</p>
          <h1 className="text-3xl font-extrabold">Verify your identity</h1>
          <p className="mt-3 text-sm text-gray-300">Enter the 6-digit code sent to {email || "your email"}.</p>
          <form onSubmit={handleSubmit} className="mt-10 space-y-8">
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input key={index} ref={(element) => (inputRefs.current[index] = element)} value={digit}
                  onChange={(event) => handleDigitChange(index, event.target.value)} onPaste={(event) => { event.preventDefault(); setCode(event.clipboardData.getData("text")); }}
                  onKeyDown={(event) => { if (event.key === "Backspace" && !digit && index > 0) inputRefs.current[index - 1]?.focus(); }}
                  inputMode="numeric" maxLength="1" aria-label={`Digit ${index + 1}`} required
                  className="h-11 w-9 rounded-lg border-2 border-white/50 bg-transparent text-center text-xl font-bold outline-none focus:border-orange-500 sm:h-12 sm:w-12" />
              ))}
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-full bg-orange-600 py-3 text-sm font-semibold hover:bg-orange-500 disabled:opacity-70">
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminVerifyOTP;
