import advancedOverview from "../../../assets/advancedOverview.png";

export default function AdvancedMusicOverview() {
  return (
    <section className="bg-white w-full py-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side Typography Column */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
              Overview
            </span>
          </div>

          <h2 className="text-[#111111] text-3xl sm:text-[38px] font-bold tracking-tight leading-tight mb-6">
            Music Distribution Infrastructure Designed To Meet Modern <span className="text-[#FF6200]">International</span> Delivery Standards.
          </h2>

          <p className="text-gray-700 text-[15px] sm:text-base font-normal leading-relaxed max-w-2xl">
            Mayvibe gives independent artists the same release quality major labels rely on,without needing a major label. Distribute your music globally through a DDEX-compliant system built to international standards, with release scheduling, rights management, and platform-specific optimization, all from one simple dashboard.
          </p>
        </div>

        {/* Right Side Image Column */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <img 
            src={advancedOverview} 
            alt="DSP streaming wheel network architecture display" 
            className="w-full max-w-[420px] object-contain pointer-events-none select-none"
          />
        </div>

      </div>
    </section>
  );
}