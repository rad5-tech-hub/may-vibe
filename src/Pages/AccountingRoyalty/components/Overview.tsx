// src/pages/accounting/components/AccountingOverview.jsx
import accountingoverview from "../../../assets/accountingoverview.png";

export default function AccountingOverview() {
  return (
    <section className="bg-white w-full py-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side Copywrite Grid Layout */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-4 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-black tracking-widest uppercase">
              Overview
            </span>
          </div>
          
          <h2 className="text-[#111111] text-3xl sm:text-[40px] font-black tracking-tight leading-tight mb-6">
            Where Music <span className="text-[#FF6200]">Revenue Meets <br className="hidden sm:inline" /> Transparency</span>
          </h2>
          
          <p className="text-[#444444] text-[15px] sm:text-base font-normal leading-relaxed max-w-2xl mb-8">
            Tracking what you've earned shouldn't take a finance degree. Mayvibe gives you clear earnings tracking, automatic royalty splits, and simple expense tracking,built to grow with you, whether you're releasing your first single or running your own label.
          </p>

          {/* Subheading Badges Matrix matching image_ddf6b8.png layout */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#FAF6F4] text-gray-800 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 border border-orange-100/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6200]" /> Track Earnings
            </span>
            <span className="bg-[#FAF6F4] text-gray-800 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 border border-orange-100/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6200]" /> Monitor Payouts
            </span>
            <span className="bg-[#FAF6F4] text-gray-800 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 border border-orange-100/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6200]" /> Transparent Reports
            </span>
          </div>
        </div>

        {/* Right Side Overview UI Preview Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <img 
            src={accountingoverview} 
            alt="Mayvibe application interface showcasing royalties metrics data graphs and track lists details" 
            className="w-full max-w-[480px] lg:max-w-[520px] object-contain pointer-events-none select-none"
          />
        </div>

      </div>
    </section>
  );
}