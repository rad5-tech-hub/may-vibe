
const features = [
  {
    title: "Automated royalty split management",
    description: "Automatically allocate earnings among artists, producers, songwriters, collaborators, and rights holders based on predefined ownership percentages.",
    iconName: "automated.png"
  },
  {
    title: "Artist earnings statements",
    description: "Provide artists with organized earnings reports that clearly outline revenue sources, deductions, royalties, and payouts.",
    iconName: "artistAccounting.png"
  },
  {
    title: "Expense management by release",
    description: "Track and organize expenses associated with individual releases, campaigns, and projects.",
    iconName: "expense.png"
  },
  {
    title: "Contributor accounting",
    description: "Manage financial relationships across all project contributors through centralized accounting records.",
    iconName: "contributor.png"
  },
  {
    title: "Invoicing support",
    description: "Generate and manage invoices while maintaining organized payment records for artists, vendors, and business partners.",
    iconName: "invoicing.png"
  },
  {
    title: "Multi-currency financial operations",
    description: "Support international artists and partners with systems designed to accommodate multiple currencies and global financial workflows.",
    iconName: "multicurrency.png"
  },
  {
    title: "Financial reporting visibility",
    description: "Access structured reporting tools that help stakeholders understand revenue performance and financial activity.",
    iconName: "financial.png"
  }
];

export default function FinancialSystems() {
  return (
    <section className="bg-white w-full py-16 px-6 border-t border-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Category Centered Header indicator */}
        <div className="w-full flex flex-col items-center justify-center mb-16">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-black tracking-widest uppercase">
              Financial Systems
            </span>
            <span className="w-4 h-0.5 bg-[#FF6200]" />
          </div>
        </div>

        {/* 3-Column Grid Block directly mirroring image_ddf6b8.png columns structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-0 bg-[#FFF9F7] rounded-3xl overflow-hidden border border-gray-100/50">
          
          {/* Column 1: Items 0, 3, 6 */}
          <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-100/80 p-5 space-y-12">
            {[features[0], features[3], features[6]].map((item, idx) => (
              <div key={idx} className="flex flex-col items-start space-y-3.5">
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <img src={`/src/assets/${item.iconName}`} alt="" className="w-full h-full object-contain select-none pointer-events-none" />
                </div>
                <h4 className="text-black font-bold text-[15px] sm:text-base tracking-tight leading-tight">{item.title}</h4>
                <p className="text-gray-500 text-xs sm:text-[13px] font-normal leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Column 2: Items 1, 4 */}
          <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-100/80 p-8 sm:p-10 space-y-12">
            {[features[1], features[4]].map((item, idx) => (
              <div key={idx} className="flex flex-col items-start space-y-3.5">
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <img src={`/src/assets/${item.iconName}`} alt="" className="w-full h-full object-contain select-none pointer-events-none" />
                </div>
                <h4 className="text-black font-bold text-[15px] sm:text-base tracking-tight leading-tight">{item.title}</h4>
                <p className="text-gray-500 text-xs sm:text-[13px] font-normal leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Column 3: Items 2, 5 */}
          <div className="flex flex-col p-8 sm:p-10 space-y-12 bg-[#FAF7F6]/30">
            {[features[2], features[5]].map((item, idx) => (
              <div key={idx} className="flex flex-col items-start space-y-3.5">
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <img src={`/src/assets/${item.iconName}`} alt="" className="w-full h-full object-contain select-none pointer-events-none" />
                </div>
                <h4 className="text-black font-bold text-[15px] sm:text-base tracking-tight leading-tight">{item.title}</h4>
                <p className="text-gray-500 text-xs sm:text-[13px] font-normal leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}