// src/pages/auth/Welcome.jsx
import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { FaPlay, FaArrowRight, FaCamera } from "react-icons/fa";
import "../../../index.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const GENRES = [
  "Dance Hall", "Hip Hop/Rap", "Reggae", "Fuji", "HighLife", "Pop", "AfroBeats",
  "Hausa", "Rock", "Childrens' Music", "Gospel", "Jazz", "AfroFusion", "Country",
  "DJ Mix", "Blues", "Acapella", "Amapiano", "Electronica", "RnB/Soul", "Podcast",
];

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const userId = location.state?.userId;

  // Optional: Redirect if missing
  useEffect(() => {
    if (!userId) {
      toast.error("Session expired. Please sign up again.");
      navigate("/signup", { replace: true });
    }
  }, [userId, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    genre: "",
    gender: "",
    paymentMethod: "",
    profilePhoto: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [genreSearch, setGenreSearch] = useState("");

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const filteredGenres = useMemo(() => {
    if (!genreSearch) return GENRES;
    return GENRES.filter(g => g.toLowerCase().includes(genreSearch.toLowerCase()));
  }, [genreSearch]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or WebP image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    const data = new FormData();
    data.append("image", file);

    setUploadingImage(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/images/upload`, data);
      const imageUrl = res.data.url || res.data.imageUrl || res.data.data?.url;
      setFormData(prev => ({ ...prev, profilePhoto: imageUrl }));
      toast.success("Profile picture uploaded!");
    } catch (err) {
      toast.error("Upload failed");
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleOnboardingSubmit = async () => {
    const { username, bio, genre, gender, profilePhoto, paymentMethod } = formData;

    if (!username || !bio || !genre || !gender || !profilePhoto) {
      return toast.error("Please fill all required fields");
    }

    if (!userId) {
      toast.error("Invalid session.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/v1/auth/register/onboarding/${userId}`, {
        username: username.trim(),
        bio: bio.trim(),
        genre: genre.trim(),
        gender,
        profilePhoto,
        paymentMethod: paymentMethod.trim() || undefined,
      });

      toast.success("Welcome to Mayvibe!");
      setTimeout(() => navigate("/dashboard", { replace: true }), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {/* STEP 1 */}
      {step === 1 && (
        <div className="min-h-screen welcome font-display h-screen flex flex-col items-center justify-end lg:justify-center p-6 text-center text-white">
          <h1 className="max-w-5xl mx-auto text-4xl lg:text-[128px] font-bold leading-tight">
            Welcome to <span className="text-orange-500">Mayvibe</span>
          </h1>
          <p className="mt-3 text-gray-200 text-xs md:text-sm max-w-2xl">
            Join thousands of artists distributing their music worldwide. Fast, simple, and powerful.
          </p>
          <button
            onClick={nextStep}
            className="mt-8 bg-orange-500 hover:bg-orange-600 px-10 py-3 text-xl font-semibold flex items-center gap-4 transition-all cursor-pointer rounded-full"
          >
            Get Started <FaArrowRight />
          </button>
          <div className="absolute bottom-8 flex gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <div className="w-3 h-3 bg-white/40 rounded-full" />
            <div className="w-3 h-3 bg-white/40 rounded-full" />
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="min-h-screen font-display bg-white flex flex-col items-center justify-center p-6 text-gray-900">
          <div className="w-full max-w-4xl space-y-12">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-red-700 via-orange-600 to-orange-500 aspect-video flex items-center justify-center">
                <div className="w-16 h-16 lg:w-28 lg:h-28 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/35 transition-all duration-300">
                  <FaPlay className="w-8 h-8 lg:w-14 lg:h-14 text-white ml-3" />
                </div>
              </div>
              <p className="absolute top-3 md:top-6 left-4 md:left-8 text-white text-xs md:text-sm font-medium">
                Watch quick tutorial for your three step guide to start earning
              </p>
            </div>

            <div className="text-center">
              <span className="inline-block px-8 py-3 border-2 border-orange-500 text-orange-500 font-bold text-lg rounded-full">
                3-STEP GUIDE
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 text-center">
              <div><h3 className="text-2xl font-bold mb-2">Upload</h3><p className="text-gray-600 text-sm">Your music</p></div>
              <FaArrowRight className="hidden md:block text-3xl text-orange-500" />
              <div><h3 className="text-2xl font-bold mb-2">Distribute</h3><p className="text-gray-600 text-sm">To 150+ stores</p></div>
              <FaArrowRight className="hidden md:block text-3xl text-orange-500" />
              <div><h3 className="text-2xl font-bold mb-2">Earn</h3><p className="text-gray-600 text-sm">Get paid fast</p></div>
            </div>

            <div className="text-center">
              <button
                onClick={nextStep}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl px-16 py-4 cursor-pointer transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-full"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 - Profile Setup */}
      {step === 3 && (
        <div className="min-h-screen login flex items-center justify-center px-6 text-white">
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center p-5">
            {/* Left Side */}
            <div className="text-center md:text-left">
              <label htmlFor="profile-upload" className="cursor-pointer">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 mx-auto md:mx-0 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                      <FaCamera className="w-16 h-16 text-white opacity-70" />
                    </div>
                  )}
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
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
              <h2 className="mt-10 text-2xl lg:text-4xl md:text-5xl font-bold">Let&apos;s get you set up</h2>
              <p className="mt-4 text-white font-semibold text-sm lg:text-md max-w-md">
                Complete your profile to start uploading and earning on Mayvibe.
              </p>
            </div>

            {/* Right Side - Form */}
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-center md:text-left">Complete Profile</h3>

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

              <div className="relative">
                <label className="block text-gray-300 mb-2">Genre</label>
                <input
                  type="text"
                  value={genreSearch}
                  onChange={(e) => setGenreSearch(e.target.value)}
                  onFocus={() => setGenreSearch(formData.genre || "")}
                  onBlur={() => { if (!formData.genre) setGenreSearch(""); }}
                  placeholder="Type or select your genre..."
                  className="w-full bg-black/70 lg:bg-black/10 backdrop-blur-sm border-b-2 border-white focus:border-orange-500 outline-none py-3 px-1 text-white placeholder-gray-400"
                  required
                />
                {genreSearch && filteredGenres.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                    {filteredGenres.map((genre) => (
                      <div
                        key={genre}
                        onMouseDown={() => {
                          setFormData({ ...formData, genre });
                          setGenreSearch(genre);
                        }}
                        className="px-4 py-3 hover:bg-orange-500/20 cursor-pointer text-white text-sm transition"
                      >
                        {genre}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-black/70 backdrop-blur-sm border-b-2 border-white focus:border-orange-500 outline-none py-3 px-1 text-white cursor-pointer"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Payment Method (Optional)</label>
                <input
                  type="text"
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  placeholder="e.g. PayPal, Bank Transfer"
                  className="w-full bg-white/10 backdrop-blur-sm border-b-2 border-white focus:border-orange-500 outline-none py-3 px-1 text-white placeholder-gray-400"
                />
              </div>

              <div className="flex justify-start gap-4 pt-6">
                <button
                  onClick={prevStep}
                  className="px-2 py-1 lg:px-8 lg:py-3 text-md border border-gray-500 rounded-lg hover:bg-white/10 transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleOnboardingSubmit}
                  disabled={loading}
                  className="px-2 py-1 lg:px-10 lg:py-3 bg-orange-500 cursor-pointer hover:bg-orange-600 rounded-lg font-semibold transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {loading ? "Saving..." : "Save & Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;