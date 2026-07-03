import { useNavigate } from "react-router-dom";
import bg from "../../../assets/MusicImage.png";

export default function QuoteSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full relative min-h-[420px] overflow-hidden">
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/70 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 py-20 min-h-[420px]">
        <p className="text-white italic text-2xl md:text-3xl max-w-3xl leading-relaxed">
          “Music is your own experience, your thoughts, your wisdom. If you don’t live it, it won’t come out of your horn.”
        </p>
        <p className="mt-6 text-[#FF6200] font-semibold text-lg">
          — Charlie Parker
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="mt-10 bg-transparent text-white hover:text-black border border-white rounded-full px-10 py-4 font-semibold hover:bg-gray-100 transition cursor-pointer"
        >
          Join Now
        </button>
      </div>
    </section>
  );
}