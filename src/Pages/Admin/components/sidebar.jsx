import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { ChevronDown, ChevronRight, LogOut, X } from "lucide-react";
import { adminNav } from "../routes";

const linkClass = ({ isActive }) =>
  `flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
    isActive ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
  }`;

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [distributionOpen, setDistributionOpen] = useState(
    () => !!adminNav.find((item) => item.children)?.children.some((child) => location.pathname === child.path)
  );

  return (
    <>
      {isOpen && (
        <button type="button" aria-label="Close navigation" onClick={() => setIsOpen(false)} className="fixed inset-0 z-30 cursor-pointer bg-black/40 lg:hidden" />
      )}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-gray-200 bg-white transition-transform lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
          <div>
            <p className="text-xl font-extrabold">may<span className="text-orange-500">vibe</span></p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gray-400">Admin portal</p>
          </div>
          <button type="button" onClick={() => setIsOpen(false)} className="cursor-pointer rounded-lg p-2 hover:bg-gray-100 lg:hidden" aria-label="Close navigation"><X size={20} /></button>
        </div>

        <nav className="admin-scroll flex-1 space-y-1 overflow-y-auto px-4 py-6">
          {adminNav.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => setDistributionOpen(!distributionOpen)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium ${
                    item.children.some((child) => location.pathname === child.path) ? "text-orange-600" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <span className="flex items-center gap-3"><item.icon size={19} />{item.label}</span>
                  {distributionOpen ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
                </button>
                {distributionOpen && (
                  <div className="ml-5 space-y-1 border-l border-orange-100 pl-3">
                    {item.children.map((child) => (
                      <NavLink key={child.path} to={child.path} onClick={() => setIsOpen(false)}
                        className={({ isActive }) => `block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-xs ${isActive ? "bg-orange-50 font-semibold text-orange-600" : "text-gray-500 hover:text-orange-600"}`}>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={item.path} to={item.path} end={item.end} onClick={() => setIsOpen(false)} className={linkClass}>
                <item.icon size={19} />{item.label}
              </NavLink>
            )
          )}
        </nav>

        <button type="button" onClick={() => { localStorage.removeItem("adminToken"); window.location.href = "/admin/login"; }} className="mx-4 mb-6 flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100">
          <LogOut size={19} />Sign out
        </button>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
