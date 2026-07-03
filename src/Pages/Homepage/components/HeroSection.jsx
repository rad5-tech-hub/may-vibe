import { useNavigate } from "react-router-dom";
import HeroImage from "../../../assets/HeroImage.png";
import Sub1 from '../../../assets/Subscribers1.png';
import Sub2 from '../../../assets/Subscribers2.png';
import Sub3 from '../../../assets/Subscribers3.png';
import musicWave from '../../../assets/waveform.png';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#FDF5F2] pt-28 pb-16 md:pt-32 md:pb-0">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-3 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 order-2 md:order-1">
            <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-normal leading-normal md:leading-tight lg:leading-tight">
              Get Heard, Get Paid<br />
              <span>Everywhere Your Fans Are.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-800 max-w-lg font-normal w-60%">
              Break borders with Mayvibe. We deliver your songs to 280+ platforms globally and pay you securely in your local currency.
            </p>

            {/* CTA + Social Proof */}
            <div className="space-y-8">
              <button
                onClick={() => navigate("/signup")}
                className="px-9 py-4 bg-orange-600 text-white text-lg font-semibold rounded-[20px] hover:bg-orange-700 transition shadow-lg hover:shadow-xl cursor-pointer"
              >
                Join Mayvibe
              </button>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src={Sub1} alt="Subscriber" className="w-12 h-12 rounded-full shadow-md" />
                  <img src={Sub2} alt="Subscriber" className="w-12 h-12 rounded-full shadow-md" />
                  <img src={Sub3} alt="Subscriber" className="w-12 h-12 rounded-full shadow-md" />
                </div>
                <div>
                  <p className="font-bold text-2xl text-gray-800">20K+</p>
                  <p className="text-sm text-gray-800">Active Subscribers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image + Waveform */}
          <div className="relative order-1 md:order-2 flex justify-center md:justify-end">
            <img
              src={HeroImage}
              alt="Artist"
              className="w-full max-w-lg lg:max-w-3xl xl:max-w-3xl object-cover"
            />
            <div className="absolute -bottom-8 md:bottom-10 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 hidden md:block">
              <img 
                src={musicWave} 
                alt="Music Wave" 
                className="max-w-[220px] lg:max-w-[280px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}