import quote from '../../../../assets/MusicImage.png'
export default function QuoteSection() {
  return (
    <section className="relative h-100 bg-cover bg-center" style={{ backgroundImage: `url(${quote})` }}>
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-4xl">
          <p className="text-2xl md:text-4xl font-light italic leading-relaxed">
            “Music is your own experience, your thoughts, your wisdom. If you don’t live it, it won’t come out of your horn.”
          </p>
          <p className="mt-6 text-orange-400 font-medium">- Charlie Parker</p>
          <button className="mt-10 px-10 py-3 border-2 border-white rounded-full hover:bg-white hover:text-black transition">
            Join Now
          </button>
        </div>
      </div>
    </section>
  )
}