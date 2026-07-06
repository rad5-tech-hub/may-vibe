
const advancedFeatures = [
  {
    icon: "ddexAdvanced.png",
    title: "DDEX-compliant distribution workflows",
    desc: "Align with global music industry standards, standardize digital supply chain infrastructure & eliminate ingestion delays."
  },
  {
    icon: "advancedAdvanced.png", // matches the first word "Advanced release scheduling"
    title: "Advanced release scheduling",
    desc: "Command your release timeline. Lock in specific launch targets across global storefronts seamlessly, ensuring your music drops exactly when you want."
  },
  {
    icon: "realtimeAdvanced.png", // fallback structure standard matching title start
    title: "Real-time release tracking",
    desc: "Eliminate the waiting game. Monitor your music live from the exact second it enters our system, tracking its progress across global ingestion queues."
  },
  {
    icon: "lyricsAdvanced.png",
    title: "Lyrics delivery",
    desc: "Sync, format and push timestamped words directly onto listeners' lock screens & streaming karaoke modes worldwide."
  },
  {
    icon: "dolbyAdvanced.png",
    title: "Dolby Atmos support",
    desc: "Go beyond stereo. Deliver dimensional, spatial sound formats exactly as the artists intend."
  },
  {
    icon: "appleAdvanced.png",
    title: "Apple Motion Artworks",
    desc: "Elevate your visual presence on the store. Transform static release imagery into striking motion art that captures listener attention right on the storefront display."
  },
  {
    icon: "hiAdvanced.png",
    title: "Hi-resolution audio delivery",
    desc: "Zero compression. Ship high-fidelity lossless studio master files exactly as they sounded on the mixing desk."
  },
  {
    icon: "platformAdvanced.png",
    title: "Platform-specific release optimization",
    desc: "Custom formatting rules configured dynamically for Spotify, Apple Music & localized DSP architectures to maximize algorithmic playlist support."
  },
  {
    icon: "professionalAdvanced.png",
    title: "Professional metadata management",
    desc: "Own your creative data, organize publishing rights, contributor roles & territory codes from a unified system built to meet modern ingestion rules."
  }
];

export default function AdvancedMusicFeatures() {
  return (
    <section className="bg-[#FAF9F9]/30 w-full py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Features Center Header Group */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
              Features
            </span>
            <span className="w-5 h-0.5 bg-[#FF6200]" />
          </div>
          <h2 className="text-[#111111] text-3xl sm:text-[40px] font-black tracking-tight max-w-3xl leading-tight">
            Every Feature Built For Professional Release Operations.
          </h2>
        </div>

        {/* 3-Column Visual Grid Separation Layout */}
        <div  className="grid grid-cols-1 md:grid-cols-2 bg-[#FFF9F7] p-3 lg:grid-cols-3 gap-x-8 gap-y-12 divide-y md:divide-y-0 divide-gray-100">
          {advancedFeatures.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-start text-left pt-6 md:pt-0 border-l border-transparent lg:border-gray-100/70 lg:first:border-l-0"
            >
              {/* Subtle Rounded Shaded Icon Wrapper */}
              <div className="w-10 h-10 bg-[#F35A1F1A] rounded-md flex items-center justify-center mb-4  border border-amber-600 shrink-0">
                <img 
                  src={`/src/assets/${item.icon}`} 
                  alt={`${item.title} icon overlay`} 
                  className="w-5 h-5 object-contain pointer-events-none select-none"
                />
              </div>

              {/* Title & Description Text Block Node */}
              <h3 className="text-black text-sm font-bold leading-snug tracking-tight mb-2.5">
                {item.title}
              </h3>
              <p className="text-gray-500 text-[13px] font-normal leading-relaxed pr-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}