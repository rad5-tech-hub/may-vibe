import { useNavigate } from "react-router-dom";
import advancedhero from "../../../assets/advancedhero.png";

export default function AdvancedHero() {
  const navigate = useNavigate();
  const stats = [
    { value: "3D", label: "Audio Delivery" },
    { value: "Apple Motions Animated Cover", label: "", isIcon: true },
    { value: "192kHz", label: "Maximum High resolution sample rate" },
    { value: "100%", label: "Metadata & Credits coverage" }
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Main Hero Background Panel */}
      <section className="bg-[#FAF6F4] w-full py-16 lg:py-24 px-6 min-h-[600px] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-5">
          
          {/* Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="w-fit bg-[#FCEBE6] rounded-full px-4 py-1.5 flex items-center mb-6">
              <span className="text-[#FF6200] text-xs font-bold tracking-wider uppercase">
                • For Artists
              </span>
            </div>

            <h1 className="text-[#111111] text-3xl lg:text-[54px] font-bold tracking-tight leading-[1.12]">
              Advanced <span className="text-[#FF6200]">Release</span> <br />
              <span className="text-[#FF6200]">Features</span>
            </h1>

            <p className="mt-6 text-[#444444] text-[15px] lg:text-base font-normal max-w-xl leading-relaxed">
              Make every release sound and look as good as the song deserves — with spatial audio, animated artwork, and metadata that's accurate everywhere your music lands.
            </p>

            <div className="mt-8">
              <button onClick={() => navigate("/signup")} className="bg-[#FF6200] text-white font-bold text-base px-10 py-2 lg:py-3 rounded-2xl shadow-sm hover:bg-orange-600 transition duration-150 cursor-pointer">
                Join Mayvibe
              </button>
            </div>
          </div>

          {/* Right Vector Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <img 
              src={advancedhero} 
              alt="Advanced Release features dashboard visual artwork matrix" 
              className="w-full max-w-[480px] object-contain select-none pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* Synchronized Metrics Strip */}
      <div className="w-full bg-white border-y border-gray-100 grid grid-cols-2 lg:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`p-6 sm:p-8 flex flex-col justify-center items-start border-b sm:border-b-0 last:border-b-0 ${
              idx !== 3 ? "lg:border-r border-gray-100" : ""
            } ${idx === 1 ? "sm:border-r lg:border-r border-gray-100" : ""}`}
          >
            {stat.isIcon ? (
              <div className="flex flex-col items-start space-y-2">
                <div className="h-6 w-6 bg-[#E31C1B] rounded-md flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  ♫
                </div>
                <span className="text-gray-800 text-[13px] font-bold tracking-tight">
                  {stat.value}
                </span>
              </div>
            ) : (
              <>
                <span className="text-[#FF6200] text-xl sm:text-2xl font-bold mb-1">
                  {stat.value}
                </span>
                <span className="text-gray-600 text-[13px] font-medium leading-tight">
                  {stat.label}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}