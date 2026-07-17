import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Mayvibe made my first release so easy. Within days my song was on Spotify, Apple Music, and even Boomplay. The analytics dashboard is a game changer.",
    name: "Tunde A.",
    role: "AfroBeats Artist",
  },
  {
    quote: "I was skeptical at first, but the distribution speed and real-time tracking blew my mind. I've recommended Mayvibe to every artist I know.",
    name: "Chioma O.",
    role: "R&B/Soul Singer",
  },
  {
    quote: "The fact that I keep 100% of my royalties on the Pro plan is incredible. Mayvibe actually cares about independent artists.",
    name: "Michael K.",
    role: "Hip Hop Artist & Producer",
  },
  {
    quote: "From upload to live on all platforms in under 48 hours. The DDEX delivery and metadata QC saved me from so many headaches.",
    name: "Amina B.",
    role: "Gospel Artist",
  },
  {
    quote: "Finally, a distribution platform built for African artists. The local DSP reach — Boomplay, Audiomack — is unmatched.",
    name: "Emeka N.",
    role: "HighLife Fusion Artist",
  },
  {
    quote: "WhatsApp support and playlist pitching made all the difference. Mayvibe treats you like a partner, not just another upload.",
    name: "Zara M.",
    role: "Afro Fusion Artist",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#FAF6F4] w-full py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-5 h-0.5 bg-[#FF6200]" />
          <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
            Testimonials
          </span>
          <span className="w-5 h-0.5 bg-[#FF6200]" />
        </div>

        <h2 className="text-center text-[#111111] text-3xl md:text-[40px] font-bold tracking-tight font-display">
          What Artists Say
        </h2>
        <p className="mt-3 text-center text-[#444444] text-base md:text-lg max-w-2xl mx-auto font-normal mb-12">
          Real stories from artists distributing with Mayvibe.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col"
            >
              <Quote className="text-[#FF6200] mb-4" size={28} />
              <p className="text-gray-700 text-[14px] leading-relaxed flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="font-bold text-[#111111] text-sm">{item.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
