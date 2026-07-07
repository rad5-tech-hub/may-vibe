// src/pages/about/components/TopFeaturesSection.jsx
import tower from "../../../assets/tower.png";
import royalty from "../../../assets/royalty.png";
import artist from "../../../assets/artist.png";
import release from "../../../assets/release.png";
import playlist from "../../../assets/playlist.png";
import book from "../../../assets/book.png";
import rights from "../../../assets/rights.png";
import customer from "../../../assets/customer.png";
import multi from "../../../assets/multi.png";
import professional from "../../../assets/professional.png";

const featuresData = [
  {
    iconName: tower,
    title: "Global Music Distribution",
    desc: "Reach 280+ streaming platforms across every continent, instantly."
  },
  {
    iconName: royalty,
    title: "Royalty tracking & earnings management",
    desc: "See every stream, every payout, and everything you've earned — all in one transparent dashboard."
  },
  {
    iconName: artist,
    title: "Artist dashboard & analytics",
    desc: "Deep insights into streams, fans, and performance trends."
  },
  {
    iconName: release, 
    title: "Release & metadata management",
    desc: "Keep your metadata, scheduling, and delivery flawless — so nothing holds your release back."
  },
  {
    iconName: playlist, 
    title: "Playlist pitching & promotional support",
    desc: "Editorial pitching and promotional support for your releases."
  },
  {
    iconName: book,
    title: "Music business & artist education",
    desc: "Business education built specifically for African artists."
  },
  {
    iconName: rights,
    title: "Rights protection & compliance systems",
    desc: "Real protection for your content and your creative rights."
  },
  {
    iconName: customer,
    title: "Customer support & release assistance",
    desc: "Real support when you need it — for your releases and your account."
  },
  {
    iconName: multi,
    title: "Multi-platform monetization",
    desc: "Earn from every angle — streaming, downloads, and more — all working together to grow your income."
  },
  {
    iconName: professional,
    title: "Professional release operations",
    desc: "Every release handled with the same care and process major labels use — so yours never falls through the cracks."
  }
];

export default function Features() {
  return (
    <section className="bg-white w-full py-20 px-6">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Top Header Labels Matrix */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
              Our Top Features
            </span>
            <span className="w-5 h-0.5 bg-[#FF6200]" />
          </div>
          <h2 className="text-[#111111] text-4xl sm:text-[42px] font-bold tracking-tight leading-tight max-w-2xl">
            Everything You Need To Run Your Music Career
          </h2>
        </div>

        {/* Outer Grid Block Wrapper Frame */}
        <div className="bg-[#FAF9F9]/40 border border-gray-100 rounded-4xl p-2 sm:p-6 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y divide-gray-200/60 lg:divide-y-0">
            {featuresData.map((feature, index) => {
              // Structural dynamic calculation to place vertical custom borders inside row configurations
              const borderRightClass = "border-gray-200/60 lg:border-r last:border-r-0";
              
              return (
                <div 
                  key={index} 
                  className={`p-6 sm:p-8 flex flex-col items-start text-left min-h-[250px] transition duration-150 bg-[#FFFBFA]  ${borderRightClass}`}
                >
                  {/* Styled Subtle Background Container Box Wrap around Image Asset */}
                  <div className="w-11 h-11 bg-[#FCEBE6] rounded-xl flex items-center justify-center mb-5 shrink-0 border border-orange-400">
                    <img 
                      src={feature.iconName} 
                      alt={`${feature.title} item icon`} 
                      className="w-5 h-5 object-contain pointer-events-none select-none"
                      onError={(e) => {
                        // Soft fallback dynamic handler if naming variance happens
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Feature Card Text Node Blocks */}
                  <h3 className="text-black text-sm font-semibold leading-snug mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-500 text-[13px] font-normal leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}