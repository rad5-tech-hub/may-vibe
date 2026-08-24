import { useState } from "react";
import { ChevronDown, ChevronRight, LayoutDashboard, LogOut, Music2, UserCheck, Users, X } from "lucide-react";
import PropTypes from "prop-types";

const items = [
  ["Overview", LayoutDashboard], ["Album", Music2], ["Track", Music2], ["Distro Artiste", Users],
  ["All Transactions", Music2], ["Transactions Without Accounts", Music2], ["All Fundings", Music2],
  ["All Registered Users", Users], ["Payment Requests", Music2], ["Add Admin", UserCheck], ["Add Genre", Music2],
  ["Set Account Activation Fees", Music2], ["Verify Artist", UserCheck], ["Profile", Users],
];
const distributions = [["All Album Distributions", "All Album Distributions"], ["All Track Distributions", "All Track Distributions"]];

const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const [distributionOpen, setDistributionOpen] = useState(false);
  const choose = (label) => { setActiveSection(label); setIsOpen(false); };
  return <>
    {isOpen && <button type="button" aria-label="Close navigation" onClick={() => setIsOpen(false)} className="fixed inset-0 z-30 cursor-pointer bg-black/40 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-gray-200 bg-white transition-transform lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6"><div><p className="text-xl font-extrabold">May<span className="text-orange-500">vibe</span></p><p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gray-400">Admin portal</p></div><button type="button" onClick={() => setIsOpen(false)} className="cursor-pointer rounded-lg p-2 hover:bg-gray-100 lg:hidden" aria-label="Close navigation"><X size={20} /></button></div>
      <nav className="admin-scroll flex-1 space-y-1 overflow-y-auto px-4 py-6">
        {items.slice(0, 4).map(([label, Icon]) => <button key={label} type="button" onClick={() => choose(label)} className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${activeSection === label ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"}`}><Icon size={19} />{label}</button>)}
        <button type="button" onClick={() => setDistributionOpen(!distributionOpen)} className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium ${activeSection.includes("Distribution") ? "text-orange-600" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"}`}><span className="flex items-center gap-3"><Music2 size={19} />Distributions</span>{distributionOpen ? <ChevronDown size={17} /> : <ChevronRight size={17} />}</button>
        {distributionOpen && <div className="ml-5 space-y-1 border-l border-orange-100 pl-3">{distributions.map(([label]) => <button key={label} type="button" onClick={() => choose(label)} className={`block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-xs ${activeSection === label ? "bg-orange-50 font-semibold text-orange-600" : "text-gray-500 hover:text-orange-600"}`}>{label}</button>)}</div>}
        {items.slice(4).map(([label, Icon]) => <button key={label} type="button" onClick={() => choose(label)} className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${activeSection === label ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"}`}><Icon size={19} />{label}</button>)}
      </nav>
      <button type="button" onClick={() => localStorage.removeItem("adminToken")} className="mx-4 mb-6 flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100"><LogOut size={19} />Sign out</button>
    </aside>
  </>;
};

Sidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
