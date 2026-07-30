import { useNavigate } from "react-router-dom";
import bg from "../../../assets/distributingLanding.jpg";

export default function DistributingSection() {
  const navigate = useNavigate();

  return (
    <section 
      className="w-full min-h-[560px] md:min-h-[680px] bg-cover bg-no-repeat bg-center relative flex items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/20 to-transparent lg:via-black/50" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-20 py-20">
        <div className="max-w-xl">
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Distributing
          </h2>
          
          <p className="mt-5 text-[#E5E5E5] text-base sm:text-lg lg:text-xl font-normal leading-relaxed opacity-95">
            Protect your songs, collect distributing royalties worldwide, and build a music career that pays you long after release.
          </p>
          
          <button
            onClick={() => navigate("/signup")}
            className="mt-8 sm:mt-10 border border-white/80 text-white rounded-full px-8 py-3.5 font-medium text-base hover:bg-white hover:text-black transition duration-300 w-fit cursor-pointer tracking-wide"
          >
            Start Distributing
          </button>
        </div>
      </div>
    </section>
  );
}