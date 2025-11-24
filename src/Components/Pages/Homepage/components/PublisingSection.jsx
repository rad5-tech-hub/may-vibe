import PublishingImage from '../../../../assets/PublishingImage.png';

export default function PublishingSection() {
  return (
    <section
      className="relative py-24 md:py-32 lg:py-40 px-6 bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
      style={{ backgroundImage: `url(${PublishingImage})` }}
    >
      {/* Dark Overlay – this is the magic */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/40 lg:bg-black/35" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center md:text-left max-w-xl mx-auto md:mx-0">
            <h2 className="text-5xl sm:text-5xl md:text-6xl font-black leading-tight mb-8 text-white drop-shadow-2xl">
              Publishing
            </h2>

            <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed drop-shadow-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida pellentesque lorem convallis blandum. Integer a felis est. Fusce finibus.
            </p>

            <div className="flex justify-center md:justify-start">
              <button className="
                px-10 py-4 
                text-lg font-semibold 
                bg-white text-gray-900 
                rounded-full 
                hover:bg-gray-100 
                transition-all duration-300
                shadow-xl hover:shadow-2xl
                border-2 border-white
              ">
                Join Now
              </button>
            </div>
          </div>

          {/* Invisible spacer column on desktop */}
          <div className="hidden md:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}