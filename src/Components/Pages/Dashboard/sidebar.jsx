import PropTypes from "prop-types";
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

const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: BarChart3, label: "Overview", id: "overview" },
    { icon: Upload, label: "Upload Music", id: "upload" },
    { icon: Music, label: "My Releases", id: "releases" },
    { icon: TrendingUp, label: "Royalties", id: "royalties" },
    { icon: CreditCard, label: "Payouts", id: "payouts" },
    { icon: User, label: "Profile", id: "profile" },
    { icon: Bell, label: "Notifications", id: "notifications" },
    { icon: Headphones, label: "Support/Academy", id: "support" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-[#F8F9FC] border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col py-8 px-5">
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-6 right-5 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logo */}
          <div className="mb-12 px-2">
            <h1 className="text-2xl font-bold text-gray-900">Music Dashboard</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3.5 rounded-xl
                    transition-all cursor-pointer duration-200 group
                    ${isActive
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon
                    className={`w-ml-0.5 w-5 h-5 transition-colors
                      ${isActive ? "text-white" : "group-hover:text-orange-600"}
                    `}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Sign Out */}
          <button
            className="mt-8 flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-all group"
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
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;