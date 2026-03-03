import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Toggle dropdown (desktop + mobile)
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-600">Mayvibe</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 text-gray-700 font-medium">
            {/* Business Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('business')}
                className="cursor-pointer flex items-center gap-1 hover:text-orange-600 transition"
              >
                Business Solutions
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openDropdown === 'business' ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === 'business' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <a href="#" className="block px-5 py-3 hover:bg-orange-50 hover:text-orange-600 transition">
                    Enterprise Plans
                  </a>
                  <a href="#" className="block px-5 py-3 hover:bg-orange-50 hover:text-orange-600 transition">
                    API Integration
                  </a>
                  <a href="#" className="block px-5 py-3 hover:bg-orange-50 hover:text-orange-600 transition">
                    Custom Solutions
                  </a>
                  <a href="#" className="block px-5 py-3 hover:bg-orange-50 hover:text-orange-600 transition">
                    Case Studies
                  </a>
                </div>
              )}
            </div>

            {/* Who We Are Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('about')}
                className="cursor-pointer flex items-center gap-1 hover:text-orange-600 transition"
              >
                Who we are
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openDropdown === 'about' ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <a href="#" className="block px-5 py-3 hover:bg-orange-50 hover:text-orange-600 transition">
                    Our Story
                  </a>
                  <a href="#" className="block px-5 py-3 hover:bg-orange-50 hover:text-orange-600 transition">
                    Team
                  </a>
                  <a href="#" className="block px-5 py-3 hover:bg-orange-50 hover:text-orange-600 transition">
                    Careers
                  </a>
                  <a href="#" className="block px-5 py-3 hover:bg-orange-50 hover:text-orange-600 transition">
                    Contact
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-8 py-2.5 bg-orange-600 text-white rounded-full font-medium hover:bg-orange-700 transition">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2.5 font-semibold border-2 border-gray-700 rounded-full hover:bg-gray-100 transition">
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-6 py-6 space-y-5">
            {/* Business Solutions - Mobile Accordion */}
            <div>
              <button
                onClick={() => toggleDropdown(openDropdown === 'business' ? null : 'business')}
                className="w-full flex justify-between items-center text-lg font-medium text-gray-800 py-2"
              >
                Business Solutions
                <ChevronDown
                  size={20}
                  className={`transition-transform ${openDropdown === 'business' ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === 'business' && (
                <div className="pl-4 pt-3 space-y-3 border-l-2 border-orange-200">
                  <a href="#" onClick={closeMobileMenu} className="block py-2 text-gray-600 hover:text-orange-600">
                    Enterprise Plans
                  </a>
                  <a href="#" onClick={closeMobileMenu} className="block py-2 text-gray-600 hover:text-orange-600">
                    API Integration
                  </a>
                  <a href="#" onClick={closeMobileMenu} className="block py-2 text-gray-600 hover:text-orange-600">
                    Custom Solutions
                  </a>
                  <a href="#" onClick={closeMobileMenu} className="block py-2 text-gray-600 hover:text-orange-600">
                    Case Studies
                  </a>
                </div>
              )}
            </div>

            {/* Who We Are - Mobile Accordion */}
            <div>
              <button
                onClick={() => toggleDropdown(openDropdown === 'about' ? null : 'about')}
                className="w-full flex justify-between items-center text-lg font-medium text-gray-800 py-2"
              >
                Who we are
                <ChevronDown
                  size={20}
                  className={`transition-transform ${openDropdown === 'about' ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === 'about' && (
                <div className="pl-4 pt-3 space-y-3 border-l-2 border-orange-200">
                  <a href="#" onClick={closeMobileMenu} className="block py-2 text-gray-600 hover:text-orange-600">
                    Our Story
                  </a>
                  <a href="#" onClick={closeMobileMenu} className="block py-2 text-gray-600 hover:text-orange-600">
                    Team
                  </a>
                  <a href="#" onClick={closeMobileMenu} className="block py-2 text-gray-600 hover:text-orange-600">
                    Careers
                  </a>
                  <a href="#" onClick={closeMobileMenu} className="block py-2 text-gray-600 hover:text-orange-600">
                    Contact
                  </a>
                </div>
              )}
            </div>

            <div className="pt-6 space-y-3">
              <button className="w-full py-3.5 border border-gray-300 rounded-full font-medium">
                <Link to="/login">
                  Login
                </Link>
              </button>
              <button className="w-full py-3.5 bg-orange-600 text-white rounded-full font-medium hover:bg-orange-700 transition">
                <Link to="/signup">
                  Get Started
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}