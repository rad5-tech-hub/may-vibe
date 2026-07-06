// src/components/global/Footer.jsx
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#110A05] relative py-20 px-6 overflow-hidden">
      
      {/* Decorative Abstract Circle Shapes from image_eb2e4b.png */}
      <div className="absolute top-[-30px] left-[-60px] w-56 h-56 rounded-full bg-[#301A0E]/90 blur-[1px] pointer-events-none select-none" />
      <div className="absolute bottom-[-90px] -right-10 w-72 h-72 rounded-full bg-[#983913]  pointer-events-none select-none" />

      {/* Main Content Container Matrix */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Upper Orange Sub-title Tag */}
        <span className="text-[#FF6200] text-xs sm:text-sm font-normal tracking-widest uppercase mb-4">
          Ready To Publish?
        </span>

        {/* Master Core Heading */}
        <h2 className="text-white text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight mb-4">
          Your Music Deserves The World
        </h2>

        {/* Secondary Supporting Copy Text Line */}
        <p className="text-gray-400 text-sm sm:text-base font-normal tracking-wide max-w-xl mb-8">
          Join thousands of African artists publishing globally with Mayvibe.
        </p>

        {/* Action Button Link Block */}
        <div className="mb-16">
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#FF6200] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg hover:bg-orange-600 transition duration-150 active:scale-98 cursor-pointer"
          >
            Start Publishing
          </button>
        </div>

        {/* Universal Copyright Line Element */}
        <div className="w-full pt-6">
          <p className="text-gray-500 text-xs sm:text-sm font-normal tracking-wide">
            &copy; 2026 Mayvibe Limited
          </p>
        </div>

      </div>
    </footer>
  );
}