
import lyricsAdvanced from "../../../assets/lyricsAdvanced.png";
import contributorAdvanced from "../../../assets/contributorAdvanced.png";
import linearnote from "../../../assets/linearnote.png";
import isrc from "../../../assets/isrc.png";
import platform from "../../../assets/platform.png";

const iconMap = {
  "lyricsAdvanced.png": lyricsAdvanced,
  "contributorAdvanced.png": contributorAdvanced,
  "linearnote.png": linearnote,
  "isrc.png": isrc,
  "platform.png": platform,
};

const extraFeatures = [
  {
    title: "Lyrics delivery",
    description: "Synced and plain-text lyrics to major platforms.",
    iconName: "lyricsAdvanced.png"
  },
  {
    title: "Contributor role management",
    description: "Assign and manage roles for every collaborator.",
    iconName: "contributorAdvanced.png"
  },
  {
    title: "Liner note support",
    description: "Add context and credits to your release pages.",
    iconName: "linearnote.png"
  },
  {
    title: "ISRC & UPC management",
    description: "Generate and manage essential rights identifiers.",
    iconName: "isrc.png"
  },
  {
    title: "Platform-specific release optimization",
    description: "Tailored configuration for each DSP's requirements.",
    iconName: "platform.png"
  }
];

export default function OtherReleaseFeatures() {
  return (
    <section className="bg-white w-full py-16 px-6 sm:px-12 lg:px-20 border-t border-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Top Centered Identifier Label */}
        <div className="w-full flex justify-center mb-14">
          <span className="text-[#FF6200] text-xs sm:text-sm font-bold tracking-widest uppercase text-center">
            Other features to enhance your release experience
          </span>
        </div>

        {/* 3-Column Asymmetric Grid Container block layout mimicking screenshot precisely */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-0 bg-[#FFF9F7] rounded-3xl overflow-hidden border border-gray-100/60">
          
          {/* Column 1 - Handles Items 0 & 3 */}
          <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-100/80 p-8 sm:p-10 space-y-12">
            {[extraFeatures[0], extraFeatures[3]].map((item, idx) => (
              <div key={idx} className="flex flex-col items-start space-y-3">
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <img src={iconMap[item.iconName]} alt="" className="w-full h-full object-contain select-none pointer-events-none" />
                </div>
                <h4 className="text-black font-bold text-[15px] sm:text-base tracking-tight leading-tight">{item.title}</h4>
                <p className="text-gray-500 text-xs sm:text-[13px] font-normal leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Column 2 - Handles Items 1 & 4 */}
          <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-100/80 p-8 sm:p-10 space-y-12">
            {[extraFeatures[1], extraFeatures[4]].map((item, idx) => (
              <div key={idx} className="flex flex-col items-start space-y-3">
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <img src={iconMap[item.iconName]} alt="" className="w-full h-full object-contain select-none pointer-events-none" />
                </div>
                <h4 className="text-black font-bold text-[15px] sm:text-base tracking-tight leading-tight">{item.title}</h4>
                <p className="text-gray-500 text-xs sm:text-[13px] font-normal leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Column 3 - Handles Item 2 with a premium soft warm right tint */}
          <div className="flex flex-col p-8 sm:p-10 space-y-12 bg-[#FAF7F6]/30">
            <div className="flex flex-col items-start space-y-3">
              <div className="w-7 h-7 flex items-center justify-center shrink-0">
                <img src={iconMap[extraFeatures[2].iconName]} alt="" className="w-full h-full object-contain select-none pointer-events-none" />
              </div>
              <h4 className="text-black font-bold text-[15px] sm:text-base tracking-tight leading-tight">{extraFeatures[2].title}</h4>
              <p className="text-gray-500 text-xs sm:text-[13px] font-normal leading-relaxed">{extraFeatures[2].description}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}