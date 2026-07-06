import { useNavigate } from "react-router-dom";

export default function AdvancedMusicHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FAF6F4] w-full py-16 lg:py-24 px-6 min-h-[600px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Content Matrix */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="w-fit bg-[#FCEBE6] rounded-full px-4 py-1.5 flex items-center gap-2 mb-6">
            <span className="text-[#FF6200] text-xs font-bold tracking-wider uppercase">
              • Business Solutions
            </span>
          </div>

          <h1 className="text-[#111111] text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.15]">
            Advanced Music <br />
            <span className="text-[#FF6200]">Distribution Infrastructure</span>
          </h1>

          <p className="mt-6 text-[#444444] text-[15px] sm:text-base font-normal max-w-xl leading-relaxed">
            Architected for independent music sovereignty. Mayvibe bridges the gap between African creators and global streaming networks using advanced digital supply chain infrastructure. Effortlessly manage automated distribution workflows, lyrics delivery, Dolby Atmos synchronization, and platform optimization from one centralized system.
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

        {/* Right Asset Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <img 
            src="/src/assets/mic.png" 
            alt="Classic silver studio microphone" 
            className="w-full max-w-[320px] lg:max-w-[380px] object-contain select-none pointer-events-none"
          />
        </div>

      </div>
    </section>
  );
}