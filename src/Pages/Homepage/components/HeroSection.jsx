import { useNavigate } from "react-router-dom";
import HeroImage from "../../../assets/HeroImage.png";
import Sub1 from '../../../assets/Subscribers1.png';
import Sub2 from '../../../assets/Subscribers2.png';
import Sub3 from '../../../assets/Subscribers3.png';
import musicWave from '../../../assets/waveform.png';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#FDF5F2] pt-28 md:pt-32 md:pb-0">
      <div className="max-w-7xl mx-auto px-6 md:px-6">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 items-start justify-between">
          
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none">
              Get Heard, Get Paid<br />
              <span>Everywhere Your Fans Are.</span>
            </h1>

            <p className="text-md md:text-xl text-gray-800 max-w-lg font-normal ">
              Break borders with Mayvibe. We deliver your songs to 280+ platforms globally and pay you securely in your local currency.
            </p>

            {/* CTA + Social Proof */}
            <div className="space-y-8">
              <button
                onClick={() => navigate("/signup")}
                className="px-9 py-2 md:py-3 bg-orange-600 text-white text-lg font-semibold rounded-xl hover:bg-orange-700 transition shadow-lg hover:shadow-xl cursor-pointer"
              >
                Join Mayvibe
              </button>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src={Sub1} alt="Subscriber" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full shadow-md" />
                  <img src={Sub2} alt="Subscriber" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full shadow-md" />
                  <img src={Sub3} alt="Subscriber" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full shadow-md" />
                </div>
                <div>
                  <p className="font-bold text-md lg:text-2xl text-gray-800">20K+</p>
                  <p className="text-xs lg:text-sm text-gray-800">Active Subscribers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image + Waveform */}
          <div className="relative flex justify-center md:justify-end">
            <img
              src={HeroImage}
              alt="Artist"
              className="h-[250px] md:h-140 md:max-h-140 lg:h-160 lg:max-h-160 object-cover"
            />
            <div className="absolute bottom-0 md:bottom-10 left-1/2 md:-left-30 -translate-x-1/2 md:translate-x-0 block">
              <img 
                src={musicWave} 
                alt="Music Wave" 
                className="max-w-[140px] lg:max-w-[280px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}