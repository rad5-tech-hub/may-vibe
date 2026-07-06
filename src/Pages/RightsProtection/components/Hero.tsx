import { useNavigate } from "react-router-dom";

export default function RightsHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FAF6F4] w-full py-16 lg:py-24 px-6 min-h-[580px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Left Layout Column */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="w-fit bg-[#FCEBE6] rounded-full px-4 py-1.5 flex items-center mb-6">
            <span className="text-[#FF6200] text-xs font-black tracking-wider uppercase">
              • Business Solutions
            </span>
          </div>

          <h1 className="text-[#111111] text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.12]">
            Rights <span className="text-[#FF6200]">Protection &</span> <br />
            <span className="text-[#FF6200]">Compliance</span>
          </h1>

          <p className="mt-6 text-[#555555] text-[14px] sm:text-base font-normal max-w-xl leading-relaxed">
            Mayvibe maintains structured compliance and content protection systems designed to help reduce copyright conflicts, impersonation attempts, fraudulent uploads, and artificial streaming risks while supporting industry best practices across digital distribution.
          </p>

          <div className="mt-8">
            <button onClick={() => navigate("/signup")} className="bg-[#FF6200] text-white font-bold text-base px-10 py-4 rounded-2xl shadow-sm hover:bg-orange-600 transition duration-150 cursor-pointer">
              Join Mayvibe
            </button>
          </div>
        </div>

        {/* Right Graphic Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <img 
            src="/src/assets/rightshero.png" 
            alt="Gavel inside headphones conceptual branding layout" 
            className="w-full object-contain select-none pointer-events-none"
          />
        </div>

      </div>
    </section>
  );
}