import { Quote } from 'lucide-react';

export default function FloatingPillsSection() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop & Tablet Layout - Two rows + vertical line */}
        <div className="hidden sm:flex flex-col items-center relative">
          {/* Top Row */}
          <div className="flex gap-8 mb-12">
            <Pill text="Playlist Pitching" />
            <Pill text="Academy" />
            <Pill text="Blog" />
          </div>

          {/* Bottom Row */}
          <div className="flex gap-8">
            <Pill text="Support/Contact" />
            <Pill text="FAQ" />
          </div>
        </div>

        {/* Mobile Layout - Single column, no line */}
        <div className="sm:hidden flex flex-wrap items-center gap-6">
          <Pill text="Playlist Pitching" />
          <Pill text="Academy" />
          <Pill text="Blog" />
          <Pill text="Support/Contact" />
          <Pill text="FAQ" />
        </div>

        {/* Quote */}
        <div className="mt-16 md:mt-24 max-w-4xl mx-auto text-center">
          <Quote className="w-10 h-10 md:w-14 md:h-14 text-orange-500 mx-auto mb-6 rotate-180" />
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 leading-relaxed italic px-4">
            “Music is your own experience, your thoughts, your wisdom. If you don’t live it,
            it won’t come out of your horn.”
          </p>
          <Quote className="w-10 h-10 md:w-14 md:h-14 text-orange-500 mx-auto mt-6" />
        </div>
      </div>
    </section>
  );
}

// Pill Component (JSX)
function Pill({ text }) {
  return (
    <div className="
      px-8 py-4 
      bg-orange-100 
      text-orange-800 
      font-semibold 
      text-lg md:text-xl 
      rounded-full 
      border-2 border-orange-300 
      shadow-md 
      hover:shadow-lg 
      hover:bg-orange-200 
      transition-all duration-300 
      whitespace-nowrap
      cursor-default
    ">
      {text}
    </div>
  );
}