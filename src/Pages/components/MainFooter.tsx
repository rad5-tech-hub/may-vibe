import { useNavigate } from "react-router-dom";
import { FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function MainFooter() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#EFF1F5] text-[#222222] pt-8 pb-4 px-6 font-display">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
         {/* Logo Brand Frame */}
          <div className="flex-col flex-1 hidden lg:flex">
            <div
              onClick={() => navigate("/")}
              className="text-[#FF6200] font-bold text-3xl tracking-tight leading-none cursor-pointer"
            >
              Mayvibe
            </div>
            <p className="mt-3 text-black text-lg tracking-tight">
              Break borders with Mayvibe.
            </p>
            <div className="mt-3 flex gap-3 text-gray-500">
              <a href="#" className="hover:text-black transition duration-200" aria-label="Twitter">
                <FaTwitter size={20} fill="currentColor" className="text-gray-400 hover:text-gray-600" />
              </a>
              <a href="#" className="hover:text-black transition duration-200" aria-label="Instagram">
                <FaInstagram size={20} className="text-gray-400 hover:text-gray-600" />
              </a>
              <a href="#" className="hover:text-black transition duration-200" aria-label="YouTube">
                <FaYoutube size={20} fill="currentColor" className="text-gray-400 hover:text-gray-400 border-none" />
              </a>
            </div>
          </div>

        {/* Navigation Link Matrix */}
        <div className="flex-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-start w-full">
          {/* Business Solutions Column */}
          <div>
            <h4 className="font-bold text-[#FF6200] text-[18px] tracking-wide mb-5">
              Business Solutions
            </h4>
            <ul className="space-y-4 text-[18px] font-normal text-black leading-snug">
              <li onClick={() => navigate("/advanced-music")} className="cursor-pointer hover:text-[#FF6200] transition-colors">Advanced Music Distribution Infrastructure</li>
              <li onClick={() => navigate("/global-dsp")} className="cursor-pointer hover:text-[#FF6200] transition-colors">Global DSP & Regional Platform Reach</li>
              <li onClick={() => navigate("/accounting-royalty")} className="cursor-pointer hover:text-[#FF6200] transition-colors">Accounting & Royalty Infrastructure</li>
              <li onClick={() => navigate("/advanced-release")} className="cursor-pointer hover:text-[#FF6200] transition-colors">Advanced Release Features</li>
              <li onClick={() => navigate("/rights-protection")} className="cursor-pointer hover:text-[#FF6200] transition-colors">Rights Protection & Compliance</li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h4 className="font-bold text-[#FF6200] text-[18px] tracking-wide mb-5">
              Useful Links
            </h4>
            <ul className="space-y-4 text-[18px] font-normal text-black leading-snug">
              <li onClick={() => navigate("/")} className="cursor-pointer hover:text-[#FF6200] transition-colors">Home</li>
              <li onClick={() => navigate("/about")} className="cursor-pointer hover:text-[#FF6200] transition-colors">About</li>
              <li onClick={() => navigate("/contact")} className="cursor-pointer hover:text-[#FF6200] transition-colors">Contact/Support</li>
              <li onClick={() => navigate("/contact#faq")} className="cursor-pointer hover:text-[#FF6200] transition-colors">FAQ</li>
              <li onClick={() => navigate("/blog")} className="cursor-pointer hover:text-[#FF6200] transition-colors">Blog</li>
              <li onClick={() => navigate("/academy")} className="cursor-pointer hover:text-[#FF6200] transition-colors">Academy</li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-[#FF6200] text-[18px] tracking-wide mb-5">
              Legal
            </h4>
            <ul className="space-y-4 text-[18px] font-normal text-black leading-snug">
              <li onClick={() => navigate("/terms")} className="cursor-pointer hover:text-[#FF6200] transition-colors">Terms</li>
              <li onClick={() => navigate("/privacy")} className="cursor-pointer hover:text-[#FF6200] transition-colors">Privacy</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-[#FF6200] text-[18px] tracking-wide mb-5">
              Contact
            </h4>
            <p className="text-[18px] font-normal text-black leading-relaxed max-w-[200px]">
              Lekki, Lagos State.
            </p>
          </div>
        </div>

        </div>
        {/* Legal Disclaimer and Copyright Area */}
        <div className="pt-6 text-center border-none">
          <div className="text-black font-normal text-[15px] tracking-tight">
            © 2026 Mayvibe Limited
          </div>
          <p className="mt-3 text-black text-[13.5px] font-normal leading-relaxed max-w-[920px] mx-auto opacity-85">
            Mayvibe is Africa's foremost music Streaming, promotion/distribution network that enables artistes raise fund for their music career through monetization of their content and funding.
          </p>
        </div>
      </div>
    </footer>
  );
}
