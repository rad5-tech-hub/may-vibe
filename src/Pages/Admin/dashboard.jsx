import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./components/sidebar";
import Main from "./components/main";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-display text-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-8">
          <button type="button" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 hover:bg-gray-100 lg:hidden" aria-label="Open navigation">
            <Menu size={22} />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm font-medium text-gray-700 sm:block">Admin User</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">AU</div>
          </div>
        </header>
        <main className="admin-scroll min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-8 lg:px-10">
          <Main />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
