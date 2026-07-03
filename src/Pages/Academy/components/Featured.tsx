// src/pages/academy/components/FeaturedSection.jsx
import { useState } from "react";
import { Play } from "lucide-react";

const categories = [
  "All",
  "Getting Started",
  "Distribution",
  "Royalties & Payouts",
  "Account & Security",
  "Release Tips",
  "FAQ Answers",
  "Platform Updates"
];

const sidebarVideos = [
  {
    id: 1,
    title: "How to Log In & Reset Your Password",
    tag: "Account & Security",
    duration: "2:18",
  },
  {
    id: 2,
    title: "How to Submit Your First Release",
    tag: "Distribution",
    duration: "5:44",
  },
  {
    id: 3,
    title: "Understanding Your Earnings Dashboard",
    tag: "Royalties & Payouts",
    duration: "3:55",
  },
  {
    id: 4,
    title: "How to Set Up Royalty Splits",
    tag: "Royalties & Payouts",
    duration: "4:11",
  },
];

export default function Featured() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="bg-white w-full py-12 px-6">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Category Navigation Bar */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-none items-center flex-wrap lg:flex-nowrap">
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#FF6200] border-[#FF6200] text-white"
                    : "bg-white border-[#FF6200]/30 text-[#FF6200] hover:bg-orange-50/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Section Heading Tag */}
        <div className="mt-12 flex items-center gap-2">
          <span className="w-5 h-0.5 bg-[#FF6200]" />
          <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
            Featured
          </span>
        </div>

        {/* Main Workspace Layout Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Primary Video Showcase Card */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-sm group">
              {/* Play Activation Trigger Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <button 
                  className="w-14 h-14 bg-[#FF6200] text-white rounded-full flex items-center justify-center shadow-md transform scale-100 group-hover:scale-105 transition duration-200 cursor-pointer pl-1"
                  aria-label="Play video main feature"
                >
                  <Play size={22} fill="currentColor" stroke="none" />
                </button>
              </div>

              {/* Tag Badge Badge Frame overlay left */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#FF6200] text-white text-[10px] tracking-wider font-extrabold px-2.5 py-1 rounded">
                  FEATURED
                </span>
              </div>

              {/* Video Timestamp display right */}
              <div className="absolute bottom-4 left-auto right-4 z-10">
                <span className="text-white/90 text-xs font-mono font-medium px-1.5 py-0.5 rounded bg-black/40">
                  4:32
                </span>
              </div>
            </div>

            {/* Video Meta Title & Descriptions Block */}
            <h2 className="mt-5 text-[#111111] text-lg sm:text-xl font-bold tracking-tight leading-snug">
              Getting Started: How to Sign Up & Create Your Mayvibe Account
            </h2>
            <p className="mt-2 text-gray-500 text-sm leading-relaxed max-w-2xl">
              Everything you need to know to set up your account, verify your profile, and get ready to distribute.
            </p>
          </div>

          {/* Right Block: Vertical Playlist Row Collection */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {sidebarVideos.map((video) => (
              <div 
                key={video.id}
                className="bg-[#F7F7F7] p-3 rounded-2xl border border-gray-100/40 flex items-center gap-4 hover:bg-gray-100/70 transition duration-150 group cursor-pointer"
              >
                {/* Embedded Playlist Display Thumbnail Container */}
                <div className="relative w-[130px] sm:w-[150px] aspect-16/10 bg-black rounded-xl overflow-hidden shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-8 h-8 bg-[#FF6200] text-white rounded-full flex items-center justify-center shadow transform scale-100 group-hover:scale-105 transition duration-150 pl-0.5">
                      <Play size={12} fill="currentColor" stroke="none" />
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 right-2 z-10">
                    <span className="text-white/80 text-[10px] font-mono font-medium">
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* Playlist Video Descriptions Component */}
                <div className="flex flex-col justify-center py-1">
                  <h3 className="text-black text-xs sm:text-[13.5px] font-bold leading-tight tracking-tight max-w-60">
                    {video.title}
                  </h3>
                  <div className="mt-2 w-fit">
                    <span className="inline-block border border-[#FF6200]/30 text-[#FF6200] text-[9px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-white">
                      {video.tag}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}