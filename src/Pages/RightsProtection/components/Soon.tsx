import soonacr from "../../../assets/soonacr.png";

export default function ComingSoonAcr() {
  return (
    <section className="bg-white w-full py-16 lg:py-24 px-6 border-t border-gray-50">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Left Side ACR Network Visualization Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
          <img 
            src={soonacr} 
            alt="Automatic Content Recognition digital circuitry graphic asset visual representation" 
            className="w-full object-contain pointer-events-none select-none"
          />
        </div>

        {/* Right Side Description Content Block */}
        <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
          <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
            <span className="w-4 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
              Coming Soon
            </span>
          </div>
          
          <h2 className="text-[#111111] text-3xl lg:text-[38px] font-bold tracking-tight leading-tight mb-5 text-center lg:text-left">
            Automatic Content Recognition <span className="text-[#FF6200]">&</span> <br />
            Content-matching Infrastructure
          </h2>
          
          <div className="space-y-4 text-gray-600 text-[14px] sm:text-[15px] font-normal leading-relaxed max-w-xl text-center lg:text-left">
            <p>
              Mayvibe is actively planning future content protection capabilities designed to strengthen rights visibility and content identification across digital ecosystems.
            </p>
            <p>
              These capabilities are part of Mayvibe's long-term roadmap and may be introduced as platform infrastructure evolves.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}