// src/pages/auth/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ← Link was missing!
import axios from "axios";
import { toast } from "sonner";
import { FaFacebookF, FaApple, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../index.css";
import { getErrorMessage } from "../../utils/errorHelper";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+234");

  const COUNTRY_CODES = [
    { code: "+234", name: "Nigeria" },
    { code: "+1", name: "United States"},
    { code: "+44", name: "United Kingdom"},
    { code: "+233", name: "Ghana"},
    { code: "+254", name: "Kenya"},
    { code: "+27", name: "South Africa"},
    { code: "+250", name: "Rwanda"},
    { code: "+221", name: "Senegal"},
    { code: "+91", name: "India"},
    { code: "+49", name: "Germany"},
    { code: "+33", name: "France"},
    { code: "+61", name: "Australia"},
    { code: "+81", name: "Japan"},
    { code: "+55", name: "Brazil"},
    { code: "+52", name: "Mexico"},
    { code: "+7", name: "Russia"},
    { code: "+86", name: "China"},
    { code: "+39", name: "Italy" },
    { code: "+34", name: "Spain"},
    { code: "+46", name: "Sweden"},
    { code: "+31", name: "Netherlands"},
    { code: "+41", name: "Switzerland"},
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password, phone, country } = formData;

    if (!fullName || !email || !password || !phone || !country) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
        fullname: fullName.trim(),
        email: email.toLowerCase().trim(),
        password: password,
        phone: `${countryCode}${phone.trim()}`,
        country: country.trim(),
      });

      // Extract userId safely
      const userId = 
        response.data.userId || 
        response.data.id || 
        response.data._id || 
        response.data.data?.userId ||
        response.data.data?.id;

      const token = response.data.token;

      // Save token for later use
      if (token) {
        localStorage.setItem("token", token);
      }

      toast.success("Account created! Check your email for OTP");

      setTimeout(() => {
        navigate("/verifyOtp", {
          state: {
            email: email.toLowerCase().trim(),
            userId: userId,
            token: token,
          },
          replace: true,
        });
      }, 1500);

    } catch (err) {
      const msg = getErrorMessage(err, "Signup failed.");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup font-display">
      <div className="min-h-screen relative flex flex-col lg:flex-row items-center justify-center py-10">
        <div className="relative z-10 w-[90%] max-w-7xl h-[90%] lg:h-[85vh] flex flex-col lg:flex-row rounded-xl overflow-hidden backdrop-blur-xl border border-white/10">
          
          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2 px-16 py-16 lg:py-0 flex flex-col justify-center text-white bg-white/5 backdrop-blur-xl">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6">Distribute Your Sound To The World</h1>
            <p className="text-white text-xs lg:text-md leading-relaxed max-w-xl">
              Release your music globally, track your royalties transparently, and build your career with professional distribution tools designed for independent artists.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-1/2 relative flex flex-col lg:flex-row px-16 text-white bg-black/40 backdrop-blur-xl">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />

            <div className="w-full flex flex-col justify-center py-10">
              <h2 className="text-3xl font-extrabold mb-10 lg:mb-7">Sign Up</h2>

              <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-4 w-full lg:w-[80%]">
                <div>
                  <label className="text-xs text-white">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    placeholder="John"
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-transparent px-2 border-b border-white focus:border-orange-500 outline-none text-sm py-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    placeholder="@gmail.com"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent px-2 border-b border-white focus:border-orange-500 outline-none text-sm py-1"
                    required
                  />
                </div>

                {/* PASSWORD FIELD WITH TOGGLE */}
                <div className="relative">
                  <label className="text-xs text-gray-300">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-transparent px-2 pr-10 border-b border-white focus:border-orange-500 outline-none text-sm py-1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-7 text-gray-400 cursor-pointer hover:text-white transition"
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>

                <div>
                  <label className="text-xs text-gray-300">Phone Number</label>
                  <div className="flex gap-2 items-end">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-transparent border-b border-white focus:border-orange-500 outline-none text-xs py-1 text-white w-auto min-w-[100px]"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code} className="text-black">
                         {c.name} ({c.code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={formData.phone}
                      placeholder="800 000 0000"
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent px-2 border-b border-white focus:border-orange-500 outline-none text-sm py-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-300">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    placeholder="Nigeria"
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-transparent px-2 border-b border-white focus:border-orange-500 outline-none text-sm py-1"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-500 cursor-pointer text-white font-semibold py-3 text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-full"
                >
                  {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                  Sign Up
                </button>
              </form>

              <div className="mt-3 text-xs">
                <span className="text-gray-400 mr-4 lg:mr-12">Already Registered? </span>
                <Link to="/login" className="text-orange-500 hover:text-orange-400">
                  Login here
                </Link>
              </div>
            </div>

            {/* Social + OR */}
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

export default Signup;