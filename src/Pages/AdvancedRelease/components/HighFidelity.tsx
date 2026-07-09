import hires from "../../../assets/hi-res.png";
import extended from "../../../assets/extended.png";

export default function HighFidelityMetadata() {
  const badges = [
    "ISRC codes", "UPC codes", "Lyrics submissions", "Contributor roles",
    "Producer credits", "Songwriter information", "Liner notes", "Rights information"
  ];

  return (
    <div className="w-full flex flex-col">
      
      {/* Subsection A: Dark Theme Hi-Resolution Audio Block */}
      <section className="bg-[#151515] w-full py-16 lg:py-24 px-6 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-3xl sm:text-[38px] font-bold tracking-tight mb-8">
              <span className="text-[#FF6200]">Hi-Resolution</span> Audio Delivery
            </h3>
            
            <div className="space-y-5 text-gray-300 text-[14px] sm:text-[15px] font-normal leading-relaxed max-w-2xl">
              <p>
                Your mix, untouched. Mayvibe delivers your music lossless and uncompressed — up to 192kHz — so it sounds exactly the way it did the day you finished it in the studio.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <img 
              src={hires} 
              alt="Colorful silhouette profile listening to high resolution pristine clear audio streams" 
              className="w-full object-contain"
            />
          </div>

        </div>
      </section>

      {/* Subsection B: Extended Metadata Sub-Section with Multi-Badges Layout */}
      <section className="bg-[#FAF6F4] w-full py-16 lg:py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-[#111111] text-3xl sm:text-[36px] font-bold tracking-tight leading-tight mb-6">
              Extended <span className="text-[#FF6200]">Metadata & Credits <br /> Management</span>
            </h3>
            
            <p className="text-gray-600 text-[14px] sm:text-[15px] font-normal leading-relaxed max-w-xl mb-6">
              Keep every credit, code, and contributor organized in one place — so your rights are clear, your team gets recognized, and your release sails through every platform's requirements.
            </p>

            <span className="text-[#111111] font-bold text-sm tracking-tight mb-4 block">
              You can manage:
            </span>

            {/* Bubble parameters matching the exact button tags cloud layout */}
            <div className="flex flex-wrap gap-2.5 max-w-xl">
              {badges.map((badge, idx) => (
                <span 
                  key={idx}
                  className="bg-gray-400/60 text-gray-800 font-medium text-xs px-4 py-2 rounded-xl border border-gray-300/30 shadow-xs"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* WAV Flowchart Nodes Layout Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <img 
              src={extended} 
              alt="WAV document component tracking publisher, track title, songwriter metadata attributes map node map" 
              className="w-full object-contain"
            />
          </div>

        </div>
      </section>

    </div>
  );
}