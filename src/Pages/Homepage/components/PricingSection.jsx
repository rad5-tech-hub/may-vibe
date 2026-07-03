import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleCheck } from "lucide-react";

const standardData = [
  {
    badge: "Standard",
    title: "Single Release",
    subtitle: "Perfect for artistes releasing one single within a year.",
    price: "₦13,200",
    features: [
      "1 Main Artist",
      "One-off single release within a year",
      "Distribution to all major DSPs including Spotify, Apple Music, Boomplay, Audiomack, Amazon Music, YouTube Music, TikTok & Instagram and other DSPs worldwide",
      "Copyright Protection",
      "DDEX Delivery",
    ],
  },
  {
    badge: "Standard",
    title: "EP Release",
    subtitle: "For artistes releasing an EP of up to 6 tracks.",
    price: "₦35,000",
    features: [
      "1 Main Artist",
      "One-off EP release (1–6 tracks) within a year",
      "Distribution to all major DSPs including Spotify, Apple Music, Boomplay, Audiomack, Amazon Music, YouTube Music, TikTok & Instagram and other DSPs worldwide",
      "Copyright Protection",
      "Real-time analytics",
    ],
  },
  {
    badge: "Standard",
    title: "Album Release",
    subtitle: "Ideal for full album projects.",
    price: "₦55,000",
    features: [
      "1 Main Artist",
      "One-off album release (1–12 tracks) within a year",
      "Distribution to all major DSPs including Spotify, Apple Music, Boomplay, Audiomack, Amazon Music, YouTube Music, TikTok & Instagram and other DSPs worldwide",
      "Copyright Protection",
      "Real-time analytics",
    ],
  },
];

const hdData = [
  {
    badge: "HD",
    title: "Single Release HD",
    subtitle: "High-definition single release package with premium audio support.",
    price: "₦19,800",
    features: [
      "Everything in Single Release",
      "Dolby Atmos support",
      "Hi-Res Audio delivery",
      "Apple Motion Artwork support",
      "Lyrics delivery to DSPs",
    ],
  },
  {
    badge: "HD",
    title: "EP Release HD",
    subtitle: "Premium EP distribution package with advanced audio and artwork support.",
    price: "₦52,500",
    features: [
      "Everything in EP Release",
      "Dolby Atmos & Spatial Audio support",
      "Hi-Res Audio delivery",
      "Apple Motion Artwork support",
      "Lyrics delivery to DSPs",
    ],
  },
  {
    badge: "HD",
    title: "Album Release HD",
    subtitle: "Premium album package with immersive audio and enhanced delivery support.",
    price: "₦82,500",
    features: [
      "Everything in Album Release",
      "Dolby Atmos & Spatial Audio support",
      "Hi-Res Audio delivery",
      "Apple Motion Artwork support",
      "Lyrics delivery to DSPs",
    ],
  },
];

const enterpriseFeatures = [
  "Minimum of 5 Main Artists",
  "Unlimited releases",
  "Distribution to all major DSPs",
  "Copyright Protection",
  "Dolby Atmos & Spatial Audio support",
  "Hi-Res Audio delivery",
  "Apple Motion Artwork support",
];

export default function PricingSection() {
  const navigate = useNavigate();
  const [isHD, setIsHD] = useState(false);
  const activeTierCards = isHD ? hdData : standardData;

  return (
    <section className="bg-white py-16 px-4 md:px-8 selection:bg-orange-200">
      <div className="max-w-6xl mx-auto">
        {/* Header Content */}
        <h2 className="text-center text-[#111111] text-3xl md:text-[40px] font-bold tracking-tight font-display">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-3 text-center text-[#444444] text-base md:text-lg max-w-2xl mx-auto font-normal">
          Whether you’re just starting out or scaling big, our pricing keeps your growth in mind.
        </p>

        {/* Custom Toggle Switch */}
        <div className="mt-8 flex justify-center items-center gap-3">
          <span
            className={`text-base font-semibold cursor-pointer select-none transition-colors duration-200 ${
              !isHD ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setIsHD(false)}
          >
            Standard
          </span>

          <button
            onClick={() => setIsHD(!isHD)}
            className="relative w-[52px] h-7 bg-white border border-gray-200 rounded-full cursor-pointer p-0.5"
            aria-label="Toggle tier pricing view"
          >
            <span
              className={`block w-[22px] h-[22px] bg-[#FF6200] rounded-full transition-all duration-300 ease-out ${
                isHD ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>

          <span
            className={`text-base font-semibold cursor-pointer select-none transition-colors duration-200 ${
              isHD ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setIsHD(true)}
          >
            HD
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {activeTierCards.map((card, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-6 md:p-8 flex flex-col justify-between border transition-all duration-300 ${
                isHD
                  ? "bg-[#FF6200] text-white border-[#FF6200]"
                  : "bg-white border-[#FF6200] border-opacity-70 text-black shadow-sm"
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold tracking-tight">{card.title}</h3>
                  <span
                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${
                      isHD
                        ? "bg-white text-[#FF6200] border-white"
                        : "bg-[#FF6200] text-white border-[#FF6200]"
                    }`}
                  >
                    {card.badge}
                  </span>
                </div>
                
                <p className={`text-[13px] leading-relaxed mt-2 ${isHD ? "text-white/90" : "text-gray-600"}`}>
                  {card.subtitle}
                </p>

                <div className="mt-5 mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">{card.price}</span>
                  <span className="text-sm font-medium ml-1">/year</span>
                </div>

                <button
                  onClick={() => navigate("/signup")}
                  className={`w-full py-3.5 rounded-full font-bold text-sm tracking-wide transition-all cursor-pointer ${
                    isHD
                      ? "bg-white text-[#FF6200] hover:bg-orange-50"
                      : "bg-[#FF6200] text-white hover:bg-orange-600"
                  }`}
                >
                  Get Started
                </button>

                <ul className="mt-8 space-y-3.5 pb-6">
                  {card.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-3 text-[13px] leading-relaxed items-start">
                      <CircleCheck
                        className={`mt-0.5 shrink-0 ${isHD ? "text-white" : "text-[#FF6200]"}`}
                        size={16}
                      />
                      <span className={isHD ? "text-white/90" : "text-gray-700"}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end w-full">
                <span className={`text-xs font-semibold cursor-pointer underline decoration-dotted underline-offset-2 ${isHD ? "text-white/80 hover:text-white" : "text-orange-600 hover:text-orange-700"}`}>
                  See more
                </span>
              </div>
            </div>
          ))}

          {/* Artiste Pro Card */}
          <div className={`relative rounded-3xl p-6 md:p-8 flex flex-col justify-between border shadow-md transition-all duration-300 ${
            isHD
              ? "bg-white text-black border-[#FF6200]"
              : "bg-[#FF6200] text-white border-[#FF6200]"
          }`}>
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold tracking-tight">Artiste Pro</h3>
                <span className={`inline-block text-[10px] tracking-wider font-extrabold px-3 py-1 rounded-full uppercase border ${
                  isHD
                    ? "bg-[#FF6200] text-white border-[#FF6200]"
                    : "bg-white/20 text-white border-white/30"
                }`}>
                  Best Value
                </span>
              </div>
              
              <p className={`text-[13px] leading-relaxed mt-2 ${isHD ? "text-gray-600" : "text-white/90"}`}>
                Best for active independent artistes releasing consistently.
              </p>

              <div className="mt-5 mb-6">
                <span className="text-4xl font-extrabold tracking-tight">₦105,000</span>
                <span className="text-sm font-medium ml-1">/year</span>
              </div>

              <button
                onClick={() => navigate("/signup")}
                className={`w-full py-3.5 rounded-full font-bold text-sm tracking-wide transition-all cursor-pointer ${
                  isHD
                    ? "bg-[#FF6200] text-white hover:bg-orange-600"
                    : "bg-white text-[#FF6200] hover:bg-orange-50"
                }`}
              >
                Get Started
              </button>

              <ul className="mt-8 space-y-3.5 pb-6">
                <li className="flex gap-3 text-[13px] leading-relaxed items-start">
                  <CircleCheck className={`mt-0.5 shrink-0 ${isHD ? "text-[#FF6200]" : "text-white"}`} size={16} />
                  <span className={isHD ? "text-gray-700" : "text-white/90"}>1 Main Artist</span>
                </li>
                <li className="flex gap-3 text-[13px] leading-relaxed items-start">
                  <CircleCheck className={`mt-0.5 shrink-0 ${isHD ? "text-[#FF6200]" : "text-white"}`} size={16} />
                  <span className={isHD ? "text-gray-700" : "text-white/90"}>
                    {isHD 
                      ? "Limited releases of Singles, EPs & Albums within a year" 
                      : "Unlimited releases (Singles, EPs & Albums) within a year"
                    }
                  </span>
                </li>
                <li className="flex gap-3 text-[13px] leading-relaxed items-start">
                  <CircleCheck className={`mt-0.5 shrink-0 ${isHD ? "text-[#FF6200]" : "text-white"}`} size={16} />
                  <span className={isHD ? "text-gray-700" : "text-white/90"}>
                    Distribution to all major DSPs including Spotify, Apple Music, Boomplay, Audiomack, Amazon Music, YouTube Music, TikTok & Instagram and other DSPs worldwide
                  </span>
                </li>
                <li className="flex gap-3 text-[13px] leading-relaxed items-start">
                  <CircleCheck className={`mt-0.5 shrink-0 ${isHD ? "text-[#FF6200]" : "text-white"}`} size={16} />
                  <span className={isHD ? "text-gray-700" : "text-white/90"}>Copyright Protection</span>
                </li>
                <li className="flex gap-3 text-[13px] leading-relaxed items-start">
                  <CircleCheck className={`mt-0.5 shrink-0 ${isHD ? "text-[#FF6200]" : "text-white"}`} size={16} />
                  <span className={isHD ? "text-gray-700" : "text-white/90"}>Real-time analytics</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-end w-full">
              <span className={`text-xs font-semibold cursor-pointer underline decoration-dotted underline-offset-2 ${
                isHD ? "text-orange-600 hover:text-orange-700" : "text-white/80 hover:text-white"
              }`}>
                See more
              </span>
            </div>
          </div>
        </div>

        {/* Label Enterprise Pack Banner Section */}
        <div
          className={`mt-6 max-w-5xl mx-auto border rounded-3xl p-6 md:p-8 transition-all duration-300 ${
            isHD 
              ? "bg-[#FF6200] border-[#FF6200] text-white" 
              : "bg-white border-orange-500 border-opacity-40 text-black"
          }`}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold tracking-tight">Label Enterprise Pack</h3>
              <p className={`text-sm mt-1 ${isHD ? "text-white/90" : "text-gray-600"}`}>
                Designed for labels and management companies.
              </p>
              
              <ul className="mt-6 grid grid-cols-1 gap-y-3 gap-x-6">
                {enterpriseFeatures.map((feat, idx) => (
                  <li key={idx} className="flex gap-3 text-[13px] items-center">
                    <CircleCheck
                      className={`shrink-0 ${isHD ? "text-white" : "text-[#FF6200]"}`}
                      size={16}
                    />
                    <span className={isHD ? "text-white/90" : "text-gray-700 font-medium"}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => navigate("/contact")}
                className={`px-20 py-2 rounded-full font-bold text-sm tracking-wide text-center transition-all cursor-pointer ${
                  isHD
                    ? "bg-white text-[#FF6200] hover:bg-orange-50"
                    : "bg-[#FF6200] text-white hover:bg-orange-600"
                }`}
              >
                Contact Us
              </button>
              <button
                className={`px-20 py-2 rounded-full font-bold text-sm tracking-wide text-center border transition-all cursor-pointer ${
                  isHD
                    ? "border-white text-white hover:bg-white/10"
                    : "border-orange-500 text-[#FF6200] hover:bg-orange-50"
                }`}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}