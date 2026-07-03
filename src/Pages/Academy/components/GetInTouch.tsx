// src/pages/academy/components/GetInTouchSection.jsx
import { Mail, MessageSquareCode, ChevronDown } from "lucide-react";
import fluteman from "../../../assets/fluteman.png"

export default function GetInTouch() {
  return (
    <section className="bg-white w-full py-16 px-6">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header Label */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-5 h-0.5 bg-[#FF6200]" />
          <span className="text-[#FF6200] text-xs font-bold tracking-widest uppercase">
            Get in touch
          </span>
        </div>

        {/* Dynamic Titles */}
        <h2 className="text-[#111111] text-4xl sm:text-[42px] font-bold tracking-tight leading-tight mb-12">
          Still need help?<br />Send us a message
        </h2>

        {/* Content Matrix Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Embedded Contact Support Card Form */}
          <div className="lg:col-span-7 bg-[#FAF9F9]/50 border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              
              {/* Full Name field */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">Full name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Email Address field */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your full name" // Kept exact duplicate placeholder from screenshot
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Subject field */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">Subject</label>
                <input 
                  type="text" 
                  placeholder="Brief summary of the issue or question"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Category Dropdown Selection */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">Category</label>
                <div className="relative">
                  <select 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-400 appearance-none focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="distribution">Distribution</option>
                    <option value="royalties">Royalties & Payouts</option>
                    <option value="account">Account & Security</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-black">
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Message Description Box */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Describe the issue or question in detail"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Action Button */}
              <div className="pt-4 flex justify-center">
                <button 
                  type="submit"
                  className="bg-[#FF6200] text-white font-bold text-base px-16 py-4 rounded-2xl shadow-sm hover:bg-orange-600 active:scale-98 transition duration-200 w-full sm:w-auto cursor-pointer"
                >
                  Send message
                </button>
              </div>

            </form>
          </div>

          {/* Right Block: Social Links and Fluteman Side Deck */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start w-full">
            <span className="text-gray-900 text-xs font-bold tracking-tight mb-4 self-start lg:self-auto">
              Connect with us on our socials
            </span>

            {/* Social Channels List Matrix */}
            <div className="w-full space-y-3">
              
              {/* WhatsApp Button Pill */}
              <a 
                href="#" 
                className="w-full bg-[#F4F9F5] border border-[#E1EFE6] rounded-2xl p-4 flex items-center gap-3.5 text-sm font-bold text-gray-900 hover:opacity-90 transition duration-150"
              >
                <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center text-white shrink-0">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.425 9.865-9.864.001-2.636-1.02-5.115-2.875-6.972-1.855-1.857-4.327-2.88-6.967-2.881-5.441 0-9.866 4.425-9.869 9.866-.001 1.513.412 2.992 1.192 4.287l-.999 3.646 3.734-.979zm10.536-6.685c-.29-.146-1.72-.85-1.987-.947-.266-.097-.461-.146-.655.146-.194.291-.749.947-.919 1.142-.17.195-.339.219-.63.073-.29-.147-1.228-.453-2.34-1.445-.865-.772-1.449-1.725-1.619-2.018-.17-.293-.018-.452.129-.597.132-.131.291-.34.437-.51.145-.17.194-.291.291-.485.097-.194.049-.364-.025-.51-.073-.146-.655-1.579-.897-2.161-.236-.571-.476-.493-.655-.503-.17-.008-.364-.01-.559-.01-.194 0-.51.073-.777.364-.266.291-1.02 1.02-1.02 2.481 0 1.462 1.063 2.875 1.212 3.069.149.194 2.093 3.195 5.071 4.483.708.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.719-.704 1.961-1.385.243-.681.243-1.264.17-1.385-.073-.122-.266-.194-.559-.341z" />
                  </svg>
                </div>
                <span>Whatsapp</span>
              </a>

              {/* X / Twitter Button Pill */}
              <a 
                href="#" 
                className="w-full bg-[#F2F2F3] border border-[#E6E6E7] rounded-2xl p-4 flex items-center gap-3.5 text-sm font-bold text-gray-900 hover:opacity-90 transition duration-150"
              >
                <div className="w-6 h-6 text-black flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span>Twitter</span>
              </a>

              {/* Instagram Button Pill */}
              <a 
                href="#" 
                className="w-full bg-[#FAF4F7] border border-[#F4E9F0] rounded-2xl p-4 flex items-center gap-3.5 text-sm font-bold text-gray-900 hover:opacity-90 transition duration-150"
              >
                <div className="w-6 h-6 shrink-0 rounded-md overflow-hidden flex items-center justify-center bg-linear-to-tr from-[#FFB140] via-[#FF1B6B] to-[#4520FF] p-0.5">
                  <div className="w-full h-full bg-[#FAF4F7] rounded-[5px] flex items-center justify-center text-[#FF1B6B]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                </div>
                <span>Instagram</span>
              </a>

              {/* Alternative Separator Label */}
              <div className="text-center text-xs font-bold text-gray-800 py-1">or</div>

              {/* Email Button Pill */}
              <a 
                href="mailto:support@mayvibe.com" 
                className="w-full bg-white border border-gray-200/90 rounded-2xl p-4 flex items-center gap-3.5 text-sm font-bold text-gray-900 hover:bg-gray-50 transition duration-150 shadow-sm"
              >
                <div className="w-6 h-6 text-orange-500 flex items-center justify-center shrink-0">
                  <Mail size={18} strokeWidth={2.5} className="text-orange-500" />
                </div>
                <span>Send us an email</span>
              </a>

            </div>

            {/* Assets illustration container frame */}
            <div className="mt-5 relative w-full flex flex-col items-center">
              <img 
                src={fluteman} 
                alt="Fluteman graphic illustration" 
                className="h-80 object-cover  pointer-events-none select-none"
              />
              
              {/* Live Chat Absolute Toggle Button */}
              <button 
                onClick={() => console.log("Live Chat Triggered")}
                className="bg-[#FF6200] text-white font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md hover:bg-orange-600 transition duration-150 cursor-pointer self-center "
              >
                <MessageSquareCode size={16} strokeWidth={2.5} />
                <span>Live Chat</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}