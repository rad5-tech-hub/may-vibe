import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PropTypes from "prop-types";
import "../../../index.css";
import { getErrorMessage } from "../../../utils/errorHelper";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OtpInput = ({ otp, inputRefs, handleOtpChange, handleKeyDown, handlePaste }) => (
  <div className="flex justify-center gap-2 sm:gap-3">
    {otp.map((digit, index) => (
      <input key={index} ref={(el) => (inputRefs.current[index] = el)} value={digit}
        onChange={(event) => handleOtpChange(index, event.target.value)}
        onKeyDown={(event) => handleKeyDown(index, event)}
        onPaste={handlePaste}
        inputMode="numeric" maxLength="1" aria-label={`Digit ${index + 1}`} required
        className="h-11 w-9 rounded-lg border-2 border-white/50 bg-transparent text-center text-xl font-bold text-white outline-none focus:border-orange-500 sm:h-12 sm:w-12" />
    ))}
  </div>
);

OtpInput.propTypes = {
  otp: PropTypes.array.isRequired,
  inputRefs: PropTypes.object.isRequired,
  handleOtpChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handlePaste: PropTypes.func.isRequired,
};

const AdminForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const inputRefs = useRef([]);

  const setCode = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 6).split("");
    setOtp([...digits, ...Array(6 - digits.length).fill("")]);
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    setCode(event.clipboardData.getData("text"));
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/admin/forgot-password`, { email: email.toLowerCase().trim() });
      toast.success("A reset code has been sent to your email");
      setSent(true);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to send reset code"));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return toast.error("Please enter all 6 digits");
    if (!password) return toast.error("Please enter your new password");
    setResetting(true);
    try {
      await axios.post(`${BASE_URL}/admin/reset-password`, {
        email: email.toLowerCase().trim(),
        otp: code,
        password,
      });
      toast.success("Password reset successfully! Login with your new password.");
      navigate("/admin/login", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to reset password"));
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="login font-display">
      <div className="min-h-screen relative flex items-center justify-center px-5 py-10">
        <div className="relative z-10 w-full max-w-xl rounded-xl overflow-hidden backdrop-blur-xl border border-white/10 bg-black/40 px-6 py-12 text-white sm:px-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-orange-500">Mayvibe Admin</p>

          {!sent ? (
            <>
              <h1 className="text-3xl font-extrabold">Forgot password</h1>
              <p className="mt-3 text-sm text-gray-300">Enter your admin email and we will send you a reset code.</p>
              <form onSubmit={handleSendOtp} className="mt-10 space-y-8">
                <div>
                  <label htmlFor="admin-forgot-email" className="text-xs text-gray-300">Email</label>
                  <input id="admin-forgot-email" type="email" required autoComplete="email" value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full px-2 bg-transparent border-b border-white focus:border-orange-500 outline-none text-sm py-2" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full cursor-pointer bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-full">
                  {loading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                  Send reset code
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-extrabold">Reset password</h1>
              <p className="mt-3 text-sm text-gray-300">Enter the code sent to {email} and choose a new password.</p>
              <form onSubmit={handleReset} className="mt-10 space-y-8">
                <OtpInput otp={otp} inputRefs={inputRefs} handleOtpChange={handleOtpChange} handleKeyDown={handleKeyDown} handlePaste={handlePaste} />

                <div className="relative">
                  <label htmlFor="new-password" className="text-xs text-gray-300">New password</label>
                  <input id="new-password" type={showPassword ? "text" : "password"} required autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full px-2 pr-10 bg-transparent border-b border-white focus:border-orange-500 outline-none text-sm py-2" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-6 cursor-pointer text-gray-400 hover:text-white">
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <button type="submit" disabled={resetting}
                  className="w-full cursor-pointer bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-full">
                  {resetting && <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
                  Reset password
                </button>

                <p className="text-center text-xs text-gray-400">
                  Didn't get the code?{" "}
                  <button type="button" onClick={handleSendOtp} className="cursor-pointer text-orange-500 underline hover:text-orange-400">Resend</button>
                </p>
              </form>
            </>
          )}

          <div className="mt-8 text-center text-xs">
            <Link to="/admin/login" className="text-orange-500 hover:text-orange-400">Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
