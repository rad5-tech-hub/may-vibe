// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { FaFacebookF, FaApple, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../index.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Simple JWT decode function (no external library needed)
  const decodeJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to decode JWT", e);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please enter both email and password");
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });
      const token = response.data.token || response.data.accessToken;
      if (!token) {
        throw new Error("No authentication token received from server");
      }
      // Save token
      localStorage.setItem("token", token);

      // Decode payload
      const decoded = decodeJwt(token);
      if (!decoded || !decoded.userId) {
        throw new Error("Invalid authentication token");
      }
      // Save decoded user info (optional but useful)
      localStorage.setItem("user", JSON.stringify(decoded));
      toast.success("Welcome back!");

      // Use the field from your actual JWT payload
      const isOnboarded = decoded.onBoarded === true;
      setTimeout(() => {
        if (isOnboarded) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/welcome", {
            state: { userId: decoded.userId },
            replace: true,
          });
        }
      }, 1200);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Invalid email or password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login font-display">
      {/* Main Container */}
      <div className='min-h-screen relative flex flex-col lg:flex-row items-center justify-center py-10'>        
        <div className="relative z-10 w-[90%] max-w-7xl h-[90%] lg:h-[85vh] flex flex-col lg:flex-row rounded-xl overflow-hidden backdrop-blur-xl border border-white/10">
          
          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2 px-16 py-16 lg:py-0 flex flex-col justify-center text-white bg-white/5 backdrop-blur-xl">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">Let’s Get Started</h1>
            <p className="text-white text-xs lg:text-md leading-relaxed max-w-xl">
              Access your global music dashboard — where every stream, every fan, and every earning is at your fingertips.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-1/2 relative flex flex-col lg:flex-row px-16 text-white bg-black/40 backdrop-blur-xl">

            {/* Vertical Divider */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />

            <div className='w-full flex flex-col justify-center py-10 lg:py-0'>            
              <h2 className="text-3xl font-extrabold mb-10">Login</h2>

              <form onSubmit={handleSubmit} className="w-full lg:w-[80%]">
                <div className='mb-8'>
                  <label className="text-xs text-gray-300">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-2 bg-transparent border-b border-white focus:border-orange-500 outline-none text-sm py-1"
                    required
                  />
                </div>

                {/* PASSWORD WITH SHOW/HIDE ICON */}
                <div className='mb-3 relative'>
                  <label className="text-xs text-gray-300">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-2 pr-10 bg-transparent border-b border-white focus:border-orange-500 outline-none text-sm py-1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-7 cursor-pointer text-gray-400 hover:text-white transition"
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>

                <div className='mb-10'>
                  <Link to="/forgotPassword" className="text-orange-500 hover:text-orange-400 italic text-xs">
                    forgot password
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-500 cursor-pointer text-white font-semibold py-3 text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                  Login
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-3 text-xs">
                <span className="text-white mr-4 lg:mr-12">Not Registered? </span>
                <Link to="/signup" className="text-orange-500 hover:text-orange-400">
                  Sign up here
                </Link>
              </div>
            </div> 

            {/* Social + OR */}
            <div className="hidden absolute right-30 top-1/2 -translate-y-1/2 lg:flex flex-col items-center gap-6">
              <div className="h-40 w-px bg-white/20" />
              <span className="text-gray-400 text-xs tracking-widest">OR</span>
              <div className="h-40 w-px bg-white/20" />
            </div>

            <div className='flex lg:flex-col items-center justify-center gap-6 mb-5 lg:mb-0'>
              <button className="w-10 h-10 cursor-pointer bg-white hover:bg-orange-500 rounded-full flex items-center justify-center transition">
                <FaFacebookF className="text-black text-lg" />
              </button>
              <button className="w-10 h-10 cursor-pointer bg-white hover:bg-orange-500 rounded-full flex items-center justify-center transition">
                <FaApple className="text-black text-lg" />
              </button>
              <button className="w-10 h-10 cursor-pointer bg-white hover:bg-orange-500 rounded-full flex items-center justify-center transition">
                <FaGoogle className="text-black text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;