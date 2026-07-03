// src/pages/about/components/AboutHero.jsx

export default function AboutHero() {
  return (
    <section className="bg-[#FAF6F4] w-full py-16 lg:py-24 px-6 min-h-[620px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pb-5">
        
        {/* Left Column: Typography, Details & Call to Action */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          
          {/* About Mayvibe Pill Tag Badge */}
          <div className="w-fit bg-[#FCEBE6] rounded-full px-4 py-1.5 flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-wider uppercase">
              About Mayvibe
            </span>
          </div>

          {/* Master Heading with Specific Line Break Splits */}
          <h1 className="text-[#111111] text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.12]">
            Africa’s Music Distribution & <br />
            Artist monetization Platform <br />
            <span className="text-[#FF6200]">Built For You</span>
          </h1>

          {/* Paragraph Copy block with embedded highlight */}
          <p className="mt-6 text-[#444444] text-base sm:text-lg font-normal max-w-xl leading-relaxed">
            Distribute your music globally, manage releases professionally, track royalties transparently, 
            and grow sustainable music careers with <span className="text-[#FF6200] font-bold">Mayvibe</span> today.
          </p>

          {/* Main Direct Call to Action Button */}
          <div className="mt-8">
            <button 
              onClick={() => console.log("Join Mayvibe Triggered")}
              className="bg-[#FF6200] text-white font-bold text-base px-10 py-4 rounded-2xl shadow-md hover:bg-orange-600 transition duration-150 active:scale-98 cursor-pointer"
            >
              Join Mayvibe
            </button>
          </div>
        </div>

        {/* Right Column: Hero Graphic Platform Asset Window Container */}
        <div className="lg:col-span-4 flex items-end justify-center lg:justify-end self-end w-full h-full pt-4 lg:pt-0">
          <img 
            src="/src/assets/aboutHero.png" 
            alt="Mayvibe distribution platform matrix data visualization panel" 
            className="w-full max-w-[500px] lg:max-w-none object-contain select-none pointer-events-none transform translate-y-4 lg:translate-y-24 scale-100 lg:scale-105"
          />
        </div>

      </div>
    </section>
  );
}