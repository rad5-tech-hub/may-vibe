// src/components/support/AcademyVideo.jsx
import { FaPlay } from 'react-icons/fa';

const AcademyVideo = () => {
  return (
    <div className="mt-20">
      <h2 className="text-xl lg:text-3xl font-bold text-black mb-8">Learn more at Mayvibe Academy</h2>

      <div className="relative rounded-xl overflow-hidden shadow-sm max-w-4xl">
        <div className="bg-linear-to-r from-red-700 to-orange-600 aspect-video flex items-center justify-center">
          <div className="w-12 h-12 lg:w-24 lg:h-24 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/35 transition">
            <FaPlay className="w-8 h-8 lg:w-12 lg:h-12 text-white ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyVideo;