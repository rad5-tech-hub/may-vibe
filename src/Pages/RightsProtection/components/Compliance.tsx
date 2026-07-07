
import metadataIcon from "../../../assets/metadata.png";
import rightsIcon from "../../../assets/rights.png";
import aicontent from "../../../assets/aicontent.png";
import artificial from "../../../assets/artificial.png";
import contentIcon from "../../../assets/content.png";
import releaseIcon from "../../../assets/release.png";

const iconMap = {
  "metadata.png": metadataIcon,
  "rights.png": rightsIcon,
  "aicontent.png": aicontent,
  "artificial.png": artificial,
  "content.png": contentIcon,
  "release.png": releaseIcon,
};

const features = [
  {
    iconName: "metadata.png",
    title: "Metadata quality checks",
    desc: "Every release is scanned for metadata completeness, accuracy, and digital service provider compliance before submission."
  },
  {
    iconName: "rights.png",
    title: "Rights confirmation workflows",
    desc: "Artists must confirm ownership and rights clearance for every release before delivery is initiated."
  },
  {
    iconName: "aicontent.png",
    title: "AI-content disclosure requirements",
    desc: "Artists are required to disclose AI-generated content in compliance with DSP and industry standards."
  },
  {
    iconName: "artificial.png",
    title: "Artificial streaming prevention policies",
    desc: "Policy enforcement and detection systems protect artist earnings from fraudulent streaming activity and bot activity."
  },
  {
    iconName: "content.png",
    title: "Content verification systems",
    desc: "Designed to support authenticity checks and identify potential risks associated with impersonation, unauthorized uploads, and content misuse."
  },
  {
    iconName: "release.png",
    title: "Release review procedures",
    desc: "Flagged releases may undergo review procedures before delivery, designed to assess compliance, rights information, and distribution readiness."
  }
];

export default function ComplianceSystems() {
  return (
    <section className="bg-[#FAF9F9]/30 w-full py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Features Center Header Group */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
              Compliance Systems
            </span>
            <span className="w-5 h-0.5 bg-[#FF6200]" />
          </div>
          <h2 className="text-[#111111] text-3xl sm:text-[40px] font-black tracking-tight max-w-3xl leading-tight">
            Systems Built To Protect Every Release
          </h2>
        </div>

        {/* 3-Column Visual Grid Separation Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#FFF9F7] p-3 lg:grid-cols-3 gap-x-8 gap-y-12 divide-y md:divide-y-0 divide-gray-100">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-start text-left pt-6 md:pt-0 border-l border-transparent lg:border-gray-100/70 lg:first:border-l-0"
            >
              {/* Subtle Rounded Shaded Icon Wrapper */}
              <div className="w-10 h-10 bg-[#F35A1F1A] rounded-md flex items-center justify-center mb-4 border border-amber-600 shrink-0">
                <img 
                  src={iconMap[item.iconName]} 
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
