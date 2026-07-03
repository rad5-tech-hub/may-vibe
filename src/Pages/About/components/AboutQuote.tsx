// src/pages/about/components/QuoteSection.jsx

export default function AboutQuote() {
  return (
    <section className="w-full relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden">
      
      {/* Background Graphic Image Asset Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/aboutquote.png" 
          alt="Concert stage crowd background texture" 
          className="w-full h-full object-cover select-none pointer-events-none"
        />
        {/* Darkening Contrast Mask Layer overlay matching image_eb266d.jpg */}
        <div className="absolute inset-0 bg-[#1A120B]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Foreground Center Typography Matrix Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 sm:px-12 text-center">
        <h2 className="text-white text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight leading-tight sm:leading-[1.2] max-w-4xl mx-auto drop-shadow-xs">
          African Music Belongs On Every Stage,<br className="hidden sm:inline" /> Every Screen, Every Speaker In The World.
        </h2>
      </div>

    </section>
  );
}