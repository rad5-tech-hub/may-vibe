import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

import tower from "../../assets/tower.png";
import globe from "../../assets/globe.png";
import account from "../../assets/account.png";
import advanced from "../../assets/advanced.png";
import rights from "../../assets/rights.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const businessPaths = ["/advanced-music", "/global-dsp", "/accounting-royalty", "/advanced-release", "/rights-protection"];
  const isBusinessActive = businessPaths.includes(location.pathname);
  const isAboutActive = location.pathname === "/about";

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && mobileMenuRef.current.contains(e.target)) {
        return;
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Who we are", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 h-16 lg:h-20">
      <div className="h-full flex items-center justify-between px-6 max-w-7xl mx-auto">
        <Link to="/" className="text-[#FF6200] font-bold text-2xl lg:text-3xl tracking-tight cursor-pointer">
          Mayvibe
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-10 text-sm font-medium text-black">
            {/* Business Solutions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => toggleDropdown("business")}
                className={`flex items-center gap-1 hover:text-[#FF6200] transition cursor-pointer font-semibold ${isBusinessActive ? "text-[#FF6200]" : ""}`}
              >
                <span className={`${isBusinessActive ? "border-b-2 border-[#FF6200] pb-0.5" : ""}`}>For Artists</span>
                <ChevronDown size={16} className={`transition ${openDropdown === "business" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "business" && (
                <div className="absolute top-full -left-28 mt-5 w-[480px] bg-white rounded-3xl shadow-4xl border border-gray-200 px-5 py-4 z-50">
                    <div className="grid grid-cols-1 gap-2">
                    <Link to="/advanced-music" onClick={() => setOpenDropdown(null)} className="block">
                      <div className="flex gap-5 group/item hover:bg-gray-50 py-2 rounded-2xl transition cursor-pointer">
                        <div className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-lg flex items-center justify-center shrink-0">
                          <img src={tower} alt="tower" className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className={`font-semibold text-base ${location.pathname === "/advanced-music" ? "text-[#FF6200]" : ""}`}>Advanced Music Distribution Infrastructure</h4>
                          <p className="text-md text-gray-500 font-light">DDEX-compliant global delivery infrastructure</p>
                        </div>
                      </div>
                    </Link>

                    <Link to="/global-dsp" onClick={() => setOpenDropdown(null)} className="block">
                      <div className="flex gap-5 group/item hover:bg-gray-50 py-2 rounded-2xl transition cursor-pointer">
                        <div className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-lg flex items-center justify-center shrink-0">
                          <img src={globe} alt="globe" className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className={`font-semibold text-base ${location.pathname === "/global-dsp" ? "text-[#FF6200]" : ""}`}>Global DSP & Regional Platform Reach</h4>
                          <p className="text-md text-gray-500 font-light">280+ platforms globally</p>
                        </div>
                      </div>
                    </Link>

                    <Link to="/accounting-royalty" onClick={() => setOpenDropdown(null)} className="block">
                      <div className="flex gap-5 group/item hover:bg-gray-50 py-2 rounded-2xl transition cursor-pointer">
                        <div className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-lg flex items-center justify-center shrink-0">
                          <img src={account} alt="account" className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className={`font-semibold text-base ${location.pathname === "/accounting-royalty" ? "text-[#FF6200]" : ""}`}>Accounting & Royalty Infrastructure</h4>
                          <p className="text-md text-gray-500 font-light">Automated splits, statements & multi-currency</p>
                        </div>
                      </div>
                    </Link>

                    <Link to="/advanced-release" onClick={() => setOpenDropdown(null)} className="block">
                      <div className="flex gap-5 group/item hover:bg-gray-50 py-2 rounded-2xl transition cursor-pointer">
                        <div className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-lg flex items-center justify-center shrink-0">
                          <img src={advanced} alt="advanced" className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className={`font-semibold text-base ${location.pathname === "/advanced-release" ? "text-[#FF6200]" : ""}`}>Advanced Release Features</h4>
                          <p className="text-md text-gray-500 font-light">Atmos, Apple Motion, hi-res & metadata</p>
                        </div>
                      </div>
                    </Link>

                    <Link to="/rights-protection" onClick={() => setOpenDropdown(null)} className="block">
                      <div className="flex gap-5 group/item hover:bg-gray-50 py-2 rounded-2xl transition cursor-pointer">
                        <div className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-lg flex items-center justify-center shrink-0">
                          <img src={rights} alt="rights" className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className={`font-semibold text-base ${location.pathname === "/rights-protection" ? "text-[#FF6200]" : ""}`}>Rights Protection & Compliance</h4>
                          <p className="text-md text-gray-500 font-light">Copyright, fraud prevention & ACR</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`hover:text-[#FF6200] transition cursor-pointer font-semibold ${link.path === "/about" && isAboutActive ? "text-[#FF6200] border-b-2 border-[#FF6200]" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-[#FF6200] text-white rounded-full px-6 py-2.5 font-semibold text-sm hover:bg-orange-700 transition cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="border border-gray-800 text-gray-800 rounded-full px-6 py-2.5 font-semibold text-sm hover:bg-gray-50 transition cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Menu Button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden cursor-pointer">
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile/Tablet Menu */}
      {mobileOpen && (
        <div ref={mobileMenuRef} className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-6 shadow-lg">
          <div className="flex flex-col gap-4">
            <div>
              <button
                onClick={() => toggleDropdown("business")}
                className={`flex items-center gap-1 hover:text-[#FF6200] transition cursor-pointer font-semibold text-base ${isBusinessActive ? "text-[#FF6200]" : ""}`}
              >
                <span className={`${isBusinessActive ? "border-b-2 border-[#FF6200]" : ""}`}>For Artists</span>
                <ChevronDown size={16} className={`transition ${openDropdown === "business" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "business" && (
                <div className="mt-3 ml-2 space-y-1">
                  <Link to="/advanced-music" onClick={() => setMobileOpen(false)} className="block">
                    <div className="flex gap-4 items-start py-2 px-2 rounded-2xl hover:bg-gray-50">
                      <div className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-lg flex items-center justify-center shrink-0">
                        <img src={tower} alt="tower" className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-semibold text-sm ${location.pathname === "/advanced-music" ? "text-[#FF6200]" : "text-black"}`}>Advanced Music Distribution Infrastructure</h4>
                        <p className="text-xs text-gray-500 font-light">DDEX-compliant global delivery infrastructure</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/global-dsp" onClick={() => setMobileOpen(false)} className="block">
                    <div className="flex gap-4 items-start py-2 px-2 rounded-2xl hover:bg-gray-50">
                      <div className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-lg flex items-center justify-center shrink-0">
                        <img src={globe} alt="globe" className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-semibold text-sm ${location.pathname === "/global-dsp" ? "text-[#FF6200]" : "text-black"}`}>Global DSP & Regional Platform Reach</h4>
                        <p className="text-xs text-gray-500 font-light">280+ platforms globally</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/accounting-royalty" onClick={() => setMobileOpen(false)} className="block">
                    <div className="flex gap-4 items-start py-2 px-2 rounded-2xl hover:bg-gray-50">
                      <div className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-lg flex items-center justify-center shrink-0">
                        <img src={account} alt="account" className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-semibold text-sm ${location.pathname === "/accounting-royalty" ? "text-[#FF6200]" : "text-black"}`}>Accounting & Royalty Infrastructure</h4>
                        <p className="text-xs text-gray-500 font-light">Automated splits, statements & multi-currency</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/advanced-release" onClick={() => setMobileOpen(false)} className="block">
                    <div className="flex gap-4 items-start py-2 px-2 rounded-2xl hover:bg-gray-50">
                      <div className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-lg flex items-center justify-center shrink-0">
                        <img src={advanced} alt="advanced" className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-semibold text-sm ${location.pathname === "/advanced-release" ? "text-[#FF6200]" : "text-black"}`}>Advanced Release Features</h4>
                        <p className="text-xs text-gray-500 font-light">Atmos, Apple Motion, hi-res & metadata</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/rights-protection" onClick={() => setMobileOpen(false)} className="block">
                    <div className="flex gap-4 items-start py-2 px-2 rounded-2xl hover:bg-gray-50">
                      <div className="w-11 h-11 bg-orange-50 border border-orange-300 rounded-lg flex items-center justify-center shrink-0">
                        <img src={rights} alt="rights" className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-semibold text-sm ${location.pathname === "/rights-protection" ? "text-[#FF6200]" : "text-black"}`}>Rights Protection & Compliance</h4>
                        <p className="text-xs text-gray-500 font-light">Copyright, fraud prevention & ACR</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`hover:text-[#FF6200] transition cursor-pointer font-semibold text-base ${link.path === "/about" && isAboutActive ? "text-[#FF6200] border-b-2 border-[#FF6200] w-fit" : ""}`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => { navigate("/login"); setMobileOpen(false); }}
                className="bg-[#FF6200] text-white rounded-full px-6 py-2.5 font-semibold text-sm hover:bg-orange-700 transition cursor-pointer w-full"
              >
                Login
              </button>
              <button
                onClick={() => { navigate("/signup"); setMobileOpen(false); }}
                className="border border-gray-800 text-gray-800 rounded-full px-6 py-2.5 font-semibold text-sm hover:bg-gray-50 transition cursor-pointer w-full"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
