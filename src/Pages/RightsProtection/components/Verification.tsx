
const steps = [
  {
    step: "01",
    title: "Upload & Rights Confirmation",
    desc: "Artist confirms ownership, rights clearance, and AI content disclosure before any processing begins."
  },
  {
    step: "02",
    title: "Metadata Quality Scan",
    desc: "All metadata fields are validated for completeness, accuracy, and DSP compliance standards."
  },
  {
    step: "03",
    title: "Content Verification",
    desc: "Audio is checked for duplicate content, fraudulent uploads, and originality conflicts."
  },
  {
    step: "04",
    title: "Review & Approval",
    desc: "Flagged content is reviewed manually. Clean releases proceed to delivery immediately."
  },
  {
    step: "05",
    title: "Protected Delivery",
    desc: "Compliant releases are delivered to 280+ DSPs with full metadata integrity and rights documentation."
  }
];

export default function VerificationPipeline() {
  return (
    <section className="bg-white w-full py-20 px-6 border-t border-gray-50">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Informational Content Node */}
        <div className="lg:col-span-6 flex flex-col pt-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-4 h-0.5 bg-[#FF6200]" />
            <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
              Verification Pipeline
            </span>
          </div>
          
          <h2 className="text-[#111111] text-3xl sm:text-[38px] font-bold tracking-tight leading-[1.15] mb-6">
            Every Release Goes Through <br />
            A <span className="text-[#FF6200]">Compliance Stack.</span>
          </h2>
          
          <p className="text-gray-600 text-[14px] sm:text-[15px] font-normal leading-relaxed max-w-lg">
            Mayvibe's release workflow is structured so that protection is automatic. From upload to live delivery, every release passes through a layered verification pipeline.
          </p>
        </div>

        {/* Right Timelines Custom Grid Array */}
        <div className="lg:col-span-6 w-full space-y-6 relative">
          {steps.map((node, index) => (
            <div key={index} className="flex items-start gap-5 relative group">
              
              {/* Linked vertical alignment path accent */}
              {index !== steps.length - 1 && (
                <div className="absolute left-[30px] top-18 w-[2.5px] h-[calc(100%-50px)] bg-black" />
              )}
              
              {/* Dark filled metric circle number badges */}
              <div className="w-16 h-16 rounded-full bg-[#1A110D] text-orange-700 flex items-center border-2 border-orange-500 justify-center font-semibold text-2xl shrink-0 select-none">
                {node.step}
              </div>
              
              {/* Step Detail Copywrite text metrics */}
              <div className="flex flex-col pt-1.5 pb-2">
                <h4 className="text-[#111111] text-[14px] sm:text-[15px] font-bold tracking-tight mb-1">
                  {node.title}
                </h4>
                <p className="text-gray-500 text-[12px] sm:text-[13px] font-normal leading-relaxed max-w-md">
                  {node.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}