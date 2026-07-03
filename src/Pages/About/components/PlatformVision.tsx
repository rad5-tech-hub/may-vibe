// src/pages/about/components/PlatformVision.jsx

const visionPoints = [
  { num: "01", text: "Building world-class distribution infrastructure for African creators" },
  { num: "02", text: "Improving transparency within digital music distribution" },
  { num: "03", text: "Supporting artist independence" },
  { num: "04", text: "Expanding access to global music markets" },
  { num: "05", text: "Building scalable royalty management systems" },
  { num: "06", text: "Developing professional music operations infrastructure" }
];

export default function PlatformVision() {
  return (
    <section className="bg-white w-full py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        
        {/* Left Column: Vision Header & Numbered Matrix Layout List */}
        <div className="lg:col-span-7 flex flex-col">
          
          {/* Top Line Tag Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
              Platform Vision
            </span>
          </div>

          {/* Core Feature Title Heading */}
          <h2 className="text-[#111111] text-4xl sm:text-[42px] font-bold tracking-tight leading-tight mb-6">
            Scaling African Music<br />Globally
          </h2>

          {/* Meta Description Lead Paragraph */}
          <p className="text-gray-700 text-[15px] sm:text-base font-normal leading-relaxed max-w-2xl mb-10">
            Mayvibe is positioning itself as a long-term digital music infrastructure company 
            focused on empowering African artists through technology, transparency, 
            education, and scalable monetization systems by:
          </p>

          {/* Numbered Row Grid Collection */}
          <div className="flex flex-col gap-6">
            {visionPoints.map((point) => (
              <div key={point.num} className="flex items-center gap-6 group">
                {/* Fixed Width Numeric Counter Node */}
                <span className="text-[#FF6200] text-[13px] font-bold tracking-wider shrink-0 w-6">
                  {point.num}
                </span>
                {/* Structural Copy Text Node Label */}
                <span className="text-black text-[15px] sm:text-base font-normal tracking-tight">
                  {point.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Angled Layered Floating Badge Cards Stack */}
        <div className="lg:col-span-5 flex flex-col gap-4 items-center lg:items-end w-full relative pt-8 lg:pt-0 pl-0 lg:pl-12">
          
          {/* Card 1: Scale Globally Card (Slightly tilted up right) */}
          <div className="w-full max-w-[360px] bg-[#FF6200] text-white rounded-2xl p-5 shadow-md transform -rotate-4 hover:rotate-0 transition duration-300">
            <h3 className="text-sm font-bold tracking-wide mb-1">
              Scale Globally
            </h3>
            <p className="text-white/80 text-[11px] font-medium leading-tight">
              Expanding access to global music markets
            </p>
          </div>

          {/* Card 2: Govern Transparency Card (Slightly tilted down right) */}
          <div className="w-full max-w-[360px] bg-[#3D3330] text-white rounded-2xl p-5 shadow-md transform rotate-3 -translate-y-1 hover:rotate-0 transition duration-300">
            <h3 className="text-sm font-bold tracking-wide mb-1">
              Govern Transparency
            </h3>
            <p className="text-white/70 text-[11px] font-medium leading-tight">
              Improving transparency within digital music distribution
            </p>
          </div>

          {/* Card 3: Empower Independency Card (Slightly tilted up right) */}
          <div className="w-full max-w-[360px] bg-[#FCEBE6] text-black rounded-2xl p-4 shadow-xs transform -rotate-8 mt-1 hover:rotate-0 transition duration-300">
            <h3 className="text-[#111111] text-sm font-bold tracking-wide mb-1">
              Empower Independency
            </h3>
            <p className="text-gray-600 text-[11px] font-medium leading-tight">
              Developing professional music operations infrastructure that support artist independency
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}