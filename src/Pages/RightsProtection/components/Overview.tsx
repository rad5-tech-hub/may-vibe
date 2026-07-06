
export default function RightsOverview() {
  return (
    <section className="bg-white w-full py-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Left Side Copywrite Text Grid */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-4 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-black tracking-widest uppercase">
              Overview
            </span>
          </div>
          
          <h2 className="text-[#111111] text-3xl sm:text-[40px] font-bold tracking-tight leading-tight mb-6">
            Protecting Music In A Complex <br /> Digital Ecosystem
          </h2>
          
          <div className="space-y-5 max-w-2xl text-[#444444] text-[14px] sm:text-[15px] font-normal leading-relaxed">
            <p>
              Managing digital music distribution requires more than simply delivering content to platforms. Rights ownership, metadata accuracy, content authenticity, and platform compliance all play a critical role in maintaining trust across the music industry.
            </p>
            <p>
              Mayvibe's Rights Protection & Compliance Infrastructure is designed to support artists, labels, and rights holders through structured verification processes, content review procedures, and compliance standards that help reduce risk while promoting responsible distribution practices. Our systems aim to improve content integrity, rights visibility, and operational accountability across every release.
            </p>
          </div>
        </div>

        {/* Right Side Visual Graphic frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <img 
            src="/src/assets/rightsoverview.png" 
            alt="Padlock protection and audio visualizer shield representation" 
            className="w-full object-contain pointer-events-none select-none"
          />
        </div>

      </div>
    </section>
  );
}