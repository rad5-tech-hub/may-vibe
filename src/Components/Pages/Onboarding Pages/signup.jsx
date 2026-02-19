// src/pages/auth/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ← Link was missing!
import axios from "axios";
import { toast } from "sonner";
import { FaFacebookF, FaApple, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../index.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, password } = formData;

    if (!firstName || !lastName || !email || !phone || !password) {
      return toast.error("Please fill in all fields");
    }

    if (!/^0\d{10}$/.test(phone)) {
      return toast.error("Please enter a valid Nigerian phone number (e.g. 09012345678)");
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        password: password,
      });
      console.log(response);

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
      const msg = err.response?.data?.message || err.response?.data?.error || "Signup failed.";
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
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">Let’s Get Started</h1>
            <p className="text-white text-xs lg:text-md leading-relaxed max-w-xl">
               Join thousands of artists using Mayvibe to unlock global reach, real earnings, and full control over your music career. Everything you need to succeed starts here.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-1/2 relative flex flex-col lg:flex-row px-16 text-white bg-black/40 backdrop-blur-xl">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />

            <div className="w-full flex flex-col justify-center py-10">
              <h2 className="text-3xl font-extrabold mb-10 lg:mb-7">Sign Up</h2>

              <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-4 w-full lg:w-[80%]">
                <div>
                  <label className="text-xs text-white">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    placeholder="John"
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-transparent px-2 border-b border-white focus:border-orange-500 outline-none text-sm py-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    placeholder="Doe"
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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

                <div>
                  <label className="text-xs text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="090......"
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