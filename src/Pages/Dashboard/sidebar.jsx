import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Upload,
  Music,
  TrendingUp,
  CreditCard,
  User,
  Bell,
  Headphones,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  { icon: BarChart3, label: "Overview", path: "/dashboard", end: true },
  { icon: Upload, label: "Upload Music", path: "/dashboard/music-upload" },
  { icon: Music, label: "My Releases", path: "/dashboard/releases" },
  { icon: TrendingUp, label: "Royalties", path: "/dashboard/royalties" },
  { icon: CreditCard, label: "Payouts", path: "/dashboard/payouts" },
  { icon: User, label: "Profile", path: "/dashboard/profile" },
  { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
  { icon: Headphones, label: "Support/Academy", path: "/dashboard/support" },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-64 bg-[#F8F9FC] border-r border-gray-200 h-screen lg:h-screen flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full py-8 px-5 overflow-y-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-6 right-5 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>

          <div className="mb-12 px-2 shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Mayvibe</h1>
          </div>

          <nav className="flex-1 space-y-1.5">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group text-sm font-medium ${isActive ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "group-hover:text-orange-600"}`} strokeWidth={isActive ? 2.5 : 2} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("adminToken");
              localStorage.removeItem("adminUser");
              window.location.href = "/login";
            }}
            className="mt-8 flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-all group cursor-pointer w-full text-left shrink-0"
          >
            <LogOut className="w-5 h-5 group-hover:text-red-600" strokeWidth={2} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
