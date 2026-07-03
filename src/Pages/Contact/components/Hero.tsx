// src/pages/support/components/SupportHero.jsx
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#FAF6F4] w-full py-16 lg:py-20 px-6 min-h-[600px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Typography & Search Input */}
        <div className="lg:col-span-6 flex flex-col justify-center z-10">
          {/* Contact / Support Pill Tag */}
          <div className="w-fit bg-[#FCEBE6] rounded-full px-4 py-1.5 flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-wider uppercase">
              Contact / Support
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[#111111] text-5xl lg:text-[56px] font-black tracking-tight leading-[1.1]">
            Need Help? <span className="text-[#FF6200]">We're<br />Here To Support</span>
          </h1>

          {/* Subtitle description */}
          <p className="mt-6 text-[#555555] text-lg font-normal max-w-lg leading-relaxed">
            Search for answers, browse support topics, or get in touch directly with the Mayvibe team.
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

        {/* Right Column: Hero Support Asset Frame */}
        <div className="lg:col-span-6 flex items-end justify-center lg:justify-end self-end w-full h-full pt-6 lg:pt-0">
          <img 
            src="/src/assets/support.png" 
            alt="Mayvibe support specialist assistant representative" 
            className="w-full max-w-[540px] md:max-w-[600px] lg:max-w-none object-contain select-none pointer-events-none transform translate-y-4 lg:translate-y-20 scale-100 lg:scale-105"
          />
        </div>

      </div>
    </section>
  );
}