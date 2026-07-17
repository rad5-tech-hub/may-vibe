// src/pages/auth/Welcome.jsx

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { FaCamera } from "react-icons/fa";
import "../../index.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Protect this page — must come from login with userId
  useEffect(() => {
    if (!userId) {
      toast.error("Session expired. Please log in again.");
      navigate("/login", { replace: true });
    }
  }, [userId, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profilePhoto: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, or WebP images allowed");
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    const data = new FormData();
    data.append("image", file);

    setUploadingImage(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BASE_URL}/images/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const imageUrl = res.data.url || res.data.imageUrl || res.data.data?.url;
      if (!imageUrl) throw new Error("No URL returned");

      setFormData((prev) => ({ ...prev, profilePhoto: imageUrl }));
      toast.success("Profile picture uploaded!");
    } catch (err) {
      toast.error("Upload failed. Try again.");
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleOnboardingSubmit = async () => {
    const { username, bio, profilePhoto } = formData;

    const missing = [];
    if (!username) missing.push("Username");
    if (!bio) missing.push("Artist Bio");
    if (!profilePhoto) missing.push("Profile Photo");

    if (missing.length > 0) {
      return toast.error(`Please complete: ${missing.join(", ")}`);
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${BASE_URL}/auth/register/onboarding/${userId}`,
        {
          username: username.trim(),
          bio: bio.trim(),
          profilePhoto,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Welcome to Mayvibe! You're all set!");
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to complete profile";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen login flex items-center justify-center px-6 text-white">
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center p-5">
            {/* Left Side */}
            <div className="text-center md:text-left">
              <label htmlFor="profile-upload" className="cursor-pointer block">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 mx-auto md:mx-0 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                      <FaCamera className="w-16 h-16 text-white opacity-70" />
                    </div>
                  )}
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
              <h2 className="mt-10 text-4xl lg:text-5xl font-bold">Let&apos;s get you set up</h2>
              <p className="mt-4 text-gray-300 text-sm lg:text-lg max-w-md">
                Complete your profile to start uploading and earning on Mayvibe.
              </p>
            </div>

            {/* Right Side - Form */}
            <div className="space-y-7">
              <h3 className="text-4xl font-bold text-center md:text-left">Complete Profile</h3>

              <div>
                <label className="block text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="e.g. Young Jonn"
                  className="w-full bg-black/70 lg:bg-black/10 backdrop-blur-sm border-b-2 border-white focus:border-orange-500 outline-none py-3 px-1 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Artist Bio</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  className="w-full bg-black/70 lg:bg-black/10 backdrop-blur-sm border-b-2 border-white focus:border-orange-500 outline-none py-3 px-1 text-white placeholder-gray-400 resize-none"
                  required
                />
              </div>

              <div className="flex justify-start gap-4 pt-8">
                <button
                  onClick={handleOnboardingSubmit}
                  disabled={loading}
                  className="px-10 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition disabled:opacity-70 flex items-center gap-3 cursor-pointer"
                >
                  {loading ? "Saving..." : "Save & Continue"}
                </button>
              </div>
            </div>
        </div>
      </div>
  );
};

export default Welcome;