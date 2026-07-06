// src/pages/advanced-release/components/CorePremiumFeatures.jsx

export default function CorePremiumFeatures() {
  return (
    <div className="w-full flex flex-col">
      
      {/* Subsection A: Dolby Atmos & Spatial Audio Block */}
      <section className="bg-[#FAF6F4] w-full py-16 px-6 text-center lg:text-left">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <div className="flex items-center gap-2 mb-10">
            <span className="w-4 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
              Features
            </span>
            <span className="w-4 h-0.5 bg-[#FF6200]" />
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h3 className="text-[#111111] text-3xl sm:text-[38px] font-bold tracking-tight mb-6">
                Dolby Atmos & <span className="text-[#FF6200]">Spatial Audio</span>
              </h3>
              
              <div className="space-y-5 text-left text-gray-600 text-[14px] sm:text-[15px] font-normal leading-relaxed max-w-2xl">
                <p>
                  Mayvibe provides advanced release features designed to help artists, labels, and rights holders maximize the quality, visibility, and performance of their releases across digital streaming platforms. From immersive audio formats and animated artwork experiences to enhanced metadata management and platform-specific optimization, our infrastructure supports modern release standards expected by today's streaming ecosystem.
                </p>
                <p>
                  These capabilities help improve release presentation, maintain metadata accuracy, support rights visibility, and create better listening experiences for audiences worldwide.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <img 
                src="/src/assets/dolby.png" 
                alt="Musician singing inside spatial audio wave layout vector graphic" 
                className="w-full object-contain"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Subsection B: Apple Motion Artworks Block */}
      <section className="bg-white w-full py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Double Phone Comparison Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
            <img 
              src="/src/assets/applemotion.png" 
              alt="Normal static cover artwork vs Apple Motion Artworks phone UI screen displays mockups side by side" 
              className="w-full object-contain"
            />
          </div>

          {/* Description Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <h3 className="text-[#111111] text-3xl sm:text-[38px] font-bold tracking-tight mb-6">
              Apple <span className="text-[#FF6200]">Motion Artworks</span>
            </h3>
            
            <div className="space-y-5 text-gray-600 text-[14px] sm:text-[15px] font-normal leading-relaxed max-w-xl">
              <p>
                Mayvibe supports Apple Motion Artworks, allowing artists to upload animated artwork experiences for supported Apple Music releases.
              </p>
              <p>
                Motion artwork enhances release presentation by introducing movement and visual storytelling directly within the streaming environment, helping releases stand out and create stronger audience engagement.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}