// src/pages/global-dsp/components/GlobalDspOverview.jsx

export default function GlobalDspOverview() {
  return (
    <section className="bg-white w-full py-16 lg:py-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side Graphic Container Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
          <img 
            src="/src/assets/advancedOverview.png" 
            alt="Centralized streaming circular dashboard network visualization wheel" 
            className="w-full max-w-[360px] sm:max-w-[400px] object-contain pointer-events-none select-none"
          />
        </div>

        {/* Right Side Content Matrix Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
          <h2 className="text-[#111111] text-3xl sm:text-[40px] font-black tracking-tight leading-tight mb-5">
            One dashboard. Every platform.
          </h2>
          
          <p className="text-gray-600 text-[15px] sm:text-base font-normal leading-relaxed max-w-2xl">
            Distribute your music to 280+ global platforms and connect with fans around the world. Whether your audience is on Spotify in London, Boomplay in Lagos, JioSaavn in Mumbai, or KKBOX in Taipei. Mayvibe gets your music there.
          </p>
        </div>

      </div>
    </section>
  );
}