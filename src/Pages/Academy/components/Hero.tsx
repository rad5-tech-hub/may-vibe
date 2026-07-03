// src/pages/academy/components/AcademyHero.jsx
import { Search, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#FAF6F4] w-full py-16 lg:py-28 px-6 min-h-[600px] flex items-center font-display">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Typography & Search Input */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          {/* Mayvibe Academy Pill Tag */}
          <div className="w-fit bg-[#FCEBE6] rounded-full px-4 py-1.5 flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-wider uppercase">
              Mayvibe Academy
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[#111111] text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
            Learn. Create. <br />
            <span className="text-[#FF6200]">Grow with Mayvibe.</span>
          </h1>

          {/* Subtitle description */}
          <p className="mt-6 text-[#333333] text-lg sm:text-xl font-normal max-w-lg leading-relaxed">
            Step-by-step video tutorials and guides to help you make the most of Mayvibe.
          </p>

          {/* Complex Search Input Wrapper */}
          <div className="mt-10 max-w-xl w-full flex items-center ">
            <input
              type="text"
              placeholder="Search videos and tutorials — e.g. 'How do I submit a release?'"
              className="w-full pl-4 pr-2 text-gray-800 placeholder-gray-400 text-sm focus:outline-none bg-white rounded-l-2xl border border-gray-200/80 shadow-sm p-3 transition-colors"
            />
            <button 
              className="bg-[#FF6200] text-white p-3 px-6 rounded-r-2xl hover:bg-orange-600 transition flex items-center justify-center cursor-pointer shadow-sm shrink-0"
              aria-label="Search button"
            >
              <Search size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Mock Video Player Platform Frame */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[560px] aspect-16/10 rounded-4xl overflow-hidden shadow-2xl bg-black border-4 border-black group">
            {/* Background Graphic Mockup Video Poster */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-85 scale-100 group-hover:scale-[1.02] transition-transform duration-500"
              style={{ backgroundImage: `url('/src/assets/PublishingImage.png')` }} 
            />
            {/* Vignette Filter Overlay to darken matching image_6d34d6.png */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/60" />

            {/* Central Play Indicator Action */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button 
                className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FF6200] text-white rounded-full flex items-center justify-center shadow-lg transform scale-100 hover:scale-110 active:scale-95 transition cursor-pointer pl-1.5"
                aria-label="Play tutorial video"
              >
                <Play size={28} fill="currentColor" stroke="none" />
              </button>
            </div>

            {/* Video Meta Info Tags Blocked at the Bottom Left */}
            <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
              <span className="inline-block bg-[#FF6200] text-white text-[10px] tracking-wider font-black px-2.5 py-1 rounded-md uppercase mb-2">
                Featured
              </span>
              <h3 className="text-white text-lg sm:text-2xl font-bold tracking-tight drop-shadow-sm leading-tight">
                Getting Started with Mayvibe
              </h3>
              <p className="text-white/80 text-sm font-medium mt-1 underline decoration-white/40">
                5:34
              </p>
            </div>
          </div>

          {/* Carousel Slide Bottom Bullet Indicators */}
          <div className="mt-6 flex justify-center items-center gap-2">
            <span className="w-5 h-2 rounded-full bg-[#FF6200] transition-all" />
            <span className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer" />
            <span className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer" />
          </div>
        </div>

      </div>
    </section>
  );
}