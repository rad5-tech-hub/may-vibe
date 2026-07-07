// src/pages/advanced-release/components/AdvancedOverview.jsx
import advancedreleaseoverview from "../../../assets/advancedreleaseoverview.png";

export default function AdvancedOverview() {
  return (
    <section className="bg-white w-full py-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Descriptive Text Layout */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-4 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
              Overview
            </span>
          </div>
          
          <h2 className="text-[#111111] text-3xl sm:text-[40px] font-bold tracking-tight leading-tight mb-8">
            Present Your Music <span className="text-[#FF6200]">At Its Best</span>
          </h2>
          
          <div className="space-y-6 max-w-2xl text-[#444444] text-[15px] sm:text-base font-normal leading-relaxed">
            <p>
              Your music should arrive exactly the way you made it — full audio quality, accurate credits, and artwork that does it justice everywhere it's heard. Mayvibe's release tools make sure nothing gets lost between your studio and your listener's headphones.
            </p>
          </div>
        </div>

        {/* Happy Listener Graphic Layout Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <img 
            src={advancedreleaseoverview} 
            alt="Smiling woman wearing high fidelity headphones listening to high res music" 
            className="w-full object-contain pointer-events-none select-none"
          />
        </div>

      </div>
    </section>
  );
}