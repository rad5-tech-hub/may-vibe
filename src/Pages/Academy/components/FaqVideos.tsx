// src/pages/academy/components/FaqVideos.jsx
import { Play, ArrowRight } from "lucide-react";

const faqVideosData = [
  {
    id: 1,
    title: "How do I submit my first release on Mayvibe?",
    duration: "2:48",
  },
  {
    id: 2,
    title: "How can I update or change my release after it goes live?",
    duration: "4:11",
  },
  {
    id: 3,
    title: "How to upload artwork & audio files",
    duration: "3:22",
  },
  {
    id: 4,
    title: "How do I schedule a release date & time zone",
    duration: "2:33",
  },
];

export default function FaqVideos() {
  return (
    <section className="bg-white w-full py-12 px-6">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Layout: Main Title & Action Link */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-[#111111] text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Some FAQs Explained Visually.
          </h2>
          
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-[#FF6200] text-sm font-bold whitespace-nowrap group hover:underline"
          >
            <span>View all FAQ videos</span>
            <ArrowRight size={16} strokeWidth={2.5} className="transform group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* 4-Column Responsive Video Grid Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {faqVideosData.map((video) => (
            <div
              key={video.id}
              className="bg-[#F7F7F7] rounded-2xl overflow-hidden border border-gray-100/30 flex flex-col group cursor-pointer shadow-sm hover:shadow transition duration-200"
            >
              {/* Media Player Thumbnail Viewport Frame */}
              <div className="relative w-full aspect-16/10 bg-black overflow-hidden flex items-center justify-center">
                {/* Central Play Badge Action Trigger */}
                <div className="w-12 h-12 bg-[#FF6200] text-white rounded-full flex items-center justify-center shadow-md transform scale-100 group-hover:scale-105 transition duration-150 pl-0.5 z-10">
                  <Play size={18} fill="currentColor" stroke="none" />
                </div>

                {/* Video Timestamp Corner Box */}
                <div className="absolute bottom-3 right-4 z-10">
                  <span className="text-white/80 text-xs font-mono font-medium">
                    {video.duration}
                  </span>
                </div>
              </div>

              {/* Card Title Content Block */}
              <div className="p-4 pt-4 pb-6 grow flex items-start">
                <h3 className="text-black text-[14px] font-bold leading-snug tracking-tight block group-hover:text-[#FF6200] transition-colors">
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