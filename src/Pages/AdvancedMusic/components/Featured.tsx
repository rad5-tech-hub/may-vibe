import ddexAdvanced from "../../../assets/ddexAdvanced.png";
import advancedAdvanced from "../../../assets/advancedAdvanced.png";
import realtimeAdvanced from "../../../assets/realAdvanced.png";
import lyricsAdvanced from "../../../assets/lyricsAdvanced.png";
import dolbyAdvanced from "../../../assets/dolbyAdvanced.png";
import appleAdvanced from "../../../assets/appleAdvanced.png";
import hiAdvanced from "../../../assets/hiAdvanced.png";
import platformAdvanced from "../../../assets/platformAdvanced.png";
import professionalAdvanced from "../../../assets/professionalAdvanced.png";

const iconMap = {
  "ddexAdvanced.png": ddexAdvanced,
  "advancedAdvanced.png": advancedAdvanced,
  "realAdvanced.png": realtimeAdvanced,
  "lyricsAdvanced.png": lyricsAdvanced,
  "dolbyAdvanced.png": dolbyAdvanced,
  "appleAdvanced.png": appleAdvanced,
  "hiAdvanced.png": hiAdvanced,
  "platformAdvanced.png": platformAdvanced,
  "professionalAdvanced.png": professionalAdvanced,
};

const advancedFeatures = [
  {
    icon: "ddexAdvanced.png",
    title: "DDEX-compliant distribution workflows",
    desc: "Get your music everywhere, faster. We follow the same global standards major labels use, so your release moves through every platform without delays or rejections."
  },
  {
    icon: "advancedAdvanced.png", // matches the first word "Advanced release scheduling"
    title: "Advanced release scheduling",
    desc: "Drop your music exactly when you want, everywhere at once. Lock in your release date and we'll make sure it lands on every platform right on time,no early leaks, no late surprises."
  },
  {
    icon: "realAdvanced.png",
    title: "Real-time release tracking",
    desc: "No more wondering if it worked. Watch your release move from upload to live, step by step, so you always know exactly where your music stands."
  },
  {
    icon: "lyricsAdvanced.png",
    title: "Lyrics delivery",
    desc: "Let fans sing along anywhere. Your lyrics show up perfectly timed on lock screens and karaoke modes worldwide,no extra work on your end."
  },
  {
    icon: "dolbyAdvanced.png",
    title: "Dolby Atmos support",
    desc: "Go beyond stereo. Mix and deliver your music in dimensional, spatial sound,exactly the way you imagined it."
  },
  {
    icon: "appleAdvanced.png",
    title: "Apple Motion Artworks",
    desc: "Make your cover art move. Turn your artwork into striking motion visuals that stop scrollers and pull listeners in the moment they land on your page."
  },
  {
    icon: "hiAdvanced.png",
    title: "Hi-resolution audio delivery",
    desc: "Your mix, untouched. We deliver your music lossless and uncompressed, so it sounds exactly the way it did the day you finished it in the studio."
  },
  {
    icon: "platformAdvanced.png",
    title: "Platform-specific release optimization",
    desc: "We auto-format your release for Spotify, Apple Music, and every platform's quirks,giving you the best shot at landing on algorithmic playlists, without you having to learn the rules yourself."
  },
  {
    icon: "professionalAdvanced.png",
    title: "Professional metadata management",
    desc: "Keep full ownership of your credits, splits, and rights,organized the way labels do it, without needing a label."
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
                  src={iconMap[item.icon]} 
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