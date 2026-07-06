import { useNavigate } from "react-router-dom";

export default function GlobalDspHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FAF6F4] w-full py-16 lg:py-24 px-6 min-h-[580px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Typography Matrix */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="w-fit bg-[#FCEBE6] rounded-full px-4 py-1.5 flex items-center gap-2 mb-6">
            <span className="text-[#FF6200] text-xs font-bold tracking-wider uppercase">
              • Business Solutions
            </span>
          </div>

          <h1 className="text-[#111111] text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12]">
            Global DSP & Regional <br />
            <span className="text-[#FF6200]">Platform Reach</span>
          </h1>

          <p className="mt-6 text-[#444444] text-[15px] sm:text-base font-normal max-w-xl leading-relaxed">
            Mayvibe distributes music to major global streaming platforms and important regional Digital Service Providers (DSPs) from one unified dashboard eliminating the need to manage multiple distribution accounts across different territories.
          </p>

          <div className="mt-8">
            <button 
              onClick={() => navigate("/signup")}
              className="bg-[#FF6200] text-white font-bold text-base px-10 py-4 rounded-2xl shadow-md hover:bg-orange-600 transition duration-150 cursor-pointer"
            >
              Join Mayvibe
            </button>
          </div>
        </div>

        {/* Right Graphic Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <img 
            src="/src/assets/worldGlobal.png" 
            alt="Earth globe wrapped in golden musical staff notes lines" 
            className="w-full max-w-[360px] lg:max-w-[420px] object-contain select-none pointer-events-none"
          />
        </div>

      </div>
    </section>
  );
}