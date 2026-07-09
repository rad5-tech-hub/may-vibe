import { useNavigate } from "react-router-dom";
import mic from "../../../assets/mic.png";

export default function AdvancedMusicHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FAF6F4] w-full py-16 lg:py-24 px-6 min-h-[600px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-5">
        
        {/* Left Content Matrix */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="w-fit bg-[#FCEBE6] rounded-full px-4 py-1.5 flex items-center gap-2 mb-6">
            <span className="text-[#FF6200] text-xs font-bold tracking-wider uppercase">
              • Business Solutions
            </span>
          </div>

          <h1 className="text-[#111111] text-3xl lg:text-[54px] font-bold tracking-tight leading-[1.12]">
            Advanced Music <br />
            <span className="text-[#FF6200]">Distribution Infrastructure</span>
          </h1>

          <p className="mt-6 text-[#444444] text-sm lg:text-base font-normal max-w-xl leading-relaxed">
            Built for artists who want to own their sound, on their own terms. Mayvibe gets your music from your studio to every major streaming platform worldwide,handling lyrics delivery, Dolby Atmos mixes, and platform formatting, so you can focus on making music, not managing logistics.
          </p>

          <div className="mt-8">
            <button 
              onClick={() => navigate("/signup")}
              className="bg-[#FF6200] text-white font-bold text-base px-10 py-2 lg:py-3 rounded-2xl shadow-md hover:bg-orange-600 transition duration-150 cursor-pointer"
            >
              Join Mayvibe
            </button>
          </div>
        </div>

        {/* Right Asset Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <img 
            src={mic} 
            alt="Classic silver studio microphone" 
            className="w-full max-w-[320px] lg:max-w-[380px] object-contain select-none pointer-events-none"
          />
        </div>

      </div>
    </section>
  );
}