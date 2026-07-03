// src/pages/academy/components/MoreVideosSection.jsx
import { Play } from "lucide-react";

const videosData = [
  { id: 1, title: "How to log in & reset your password", duration: "2:48" },
  { id: 2, title: "How to submit your first release", duration: "4:11" },
  { id: 3, title: "How to upload artwork & audio files", duration: "3:22" },
  { id: 4, title: "Scheduling a release date & time zone", duration: "2:33" },
  { id: 5, title: "Adding Contributors & Splits", duration: "3:18" },
  { id: 6, title: "Reading your Analytics Dashboard", duration: "5:01" },
  { id: 7, title: "Change your Account Email", duration: "4:11" },
  { id: 8, title: "Lorem ipsum ipsums lorem of ipsums", duration: "2:33" },
];

export default function MoreVideos() {
  return (
    <section className="bg-white w-full py-10 pb-20 px-6">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Title Header Label */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-5 h-0.5 bg-[#FF6200]" />
          <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
            More Videos
          </span>
        </div>

        {/* Video Grid Matrix Layout (4 columns on large screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videosData.map((video) => (
            <div 
              key={video.id} 
              className="bg-[#F7F7F7] rounded-2xl overflow-hidden border border-gray-100/30 flex flex-col group cursor-pointer shadow-sm hover:shadow transition duration-200"
            >
              {/* Media Thumbnail Viewport Frame */}
              <div className="relative w-full aspect-16/10 bg-black overflow-hidden flex items-center justify-center">
                {/* Central Action Play Circle */}
                <div className="w-12 h-12 bg-[#FF6200] text-white rounded-full flex items-center justify-center shadow-md transform scale-100 group-hover:scale-105 transition duration-150 pl-0.5 z-10">
                  <Play size={18} fill="currentColor" stroke="none" />
                </div>
                
                {/* Embedded Clip Timestamp Indicator */}
                <div className="absolute bottom-3 right-4 z-10">
                  <span className="text-white/80 text-xs font-mono font-medium">
                    {video.duration}
                  </span>
                </div>
              </div>

              {/* Card Meta Content Block */}
              <div className="p-4 pt-4 pb-6 grow flex items-start">
                <h3 className="text-black text-[14px] font-bold leading-tight tracking-tight block group-hover:text-[#FF6200] transition-colors">
                  {video.title}
                </h3>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}