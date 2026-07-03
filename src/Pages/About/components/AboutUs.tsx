// src/Pages/About/components/AboutUs.jsx
import aboutDisk from  "../../../assets/aboutdisk.png"
import marque from  "../../../assets/marque.png"


export default function AboutUs() {
  return (
    <section className="bg-white w-full py-16 px-6">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Top Segment: Distribute To Every Major Platform Header */}
        <div className="w-full flex flex-col items-center mb-20 text-center">
          <span className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-6">
            Distribute to every major platform
          </span>
          <div className="w-full h-full flex justify-center items-center">
            <img 
              src={marque}  
              alt="Major streaming platforms group logo reel" 
              className="w-full pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Bottom Segment: Main About Us Structural Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Core Narrative Content & Mission Card */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Section Tag Indicator */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-0.5 bg-[#FF6200]" />
              <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
                About us
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-[#111111] text-4xl sm:text-[42px] font-bold tracking-tight leading-tight mb-8">
              Built For The African Creator<br />Economy
            </h2>

            {/* Paragraph Text Content Blocks */}
            <div className="space-y-6 text-gray-800 text-[15px] sm:text-base font-normal leading-relaxed max-w-2xl">
              <p>
                Mayvibe is Africa’s modern music distribution and artist monetization platform built to help 
                independent artists, creators, labels, and rights holders distribute their music globally, 
                manage releases professionally, track royalties transparently, and grow sustainable music careers.
              </p>
              <p>
                Through Mayvibe, artists can distribute their music to major digital streaming platforms including 
                Spotify, Apple Music, Boomplay, TikTok, YouTube Music, Amazon Music, Deezer, Audiomack, 
                Facebook, Instagram, TIDAL, Snapchat, and many others from one centralized platform.
              </p>
              <p>
                Our mission is to empower African creatives with world-class music infrastructure, transparent 
                earnings systems, advanced analytics, artist support tools, and scalable distribution technology 
                that enables creators compete globally while maintaining ownership and control of their content.
              </p>
            </div>

            {/* Featured Highlighted Mission Box Card */}
            <div className="mt-10 max-w-xl w-full bg-[#FAF9F9]/60 border border-gray-100 rounded-3xl p-6 relative overflow-hidden pl-8 shadow-xs">
              {/* Vertical Orange Accent Border Bar Left */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF6200] rounded-r-sm" />
              
              <h3 className="text-black text-base font-bold mb-2">
                Our Mission
              </h3>
              <p className="text-gray-700 text-sm sm:text-[15px] font-normal leading-relaxed">
                To empower African artists through technology, transparency, education, and scalable 
                monetization systems.
              </p>
            </div>

          </div>

          {/* Right Column: Vinyl Disc Creative Framed Viewport */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px] lg:max-w-none aspect-11/12 rounded-4xl overflow-hidden shadow-sm">
              <img 
                src={aboutDisk} 
                alt="Vintage vinyl record disc on turntable close up visual" 
                className="w-full h-full object-cover pointer-events-none select-none"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}