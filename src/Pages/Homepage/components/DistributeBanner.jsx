import { useNavigate } from "react-router-dom";

export default function DistributeBanner() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#FF6200] py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight">
          Distribute Music
        </h2>
        <p className="mt-4 text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Distribute your music worldwide with Mayvibe. From Spotify to Apple Music and beyond, 
          your sound travels globally — while your earnings land directly in your local bank.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="mt-8 bg-transparent hover:bg-white text-white border-2 hover:text-orange-600 border-white rounded-[20px] px-10 py-4 font-bold text-xl transition cursor-pointer"
        >
          Join Mayvibe
        </button>
      </div>
    </section>
  );
}