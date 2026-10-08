import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, Search, Bell } from 'lucide-react';
import Sidebar from './sidebar.jsx';
import { getDisplayName, getStoredUser } from '../../utils/auth';

const Dashboard = () => {
  const user = getStoredUser() || {};
  const displayName = getDisplayName(user);
  const avatarUrl = user.profilePhoto || user.image_url || user.avatar || '';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);

  // Independent page: scroll main content to top on route change, not whole page reload
  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Independent sidebar - does not re-render with main content */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu size={20} />
              </button>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 capitalize">Music Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block transition-colors"><Search size={20} className="text-gray-600" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"><Bell size={20} className="text-gray-600" /><span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" /></button>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm font-medium text-gray-900 hidden sm:block">{displayName || "User"}</span>
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName || "Profile"} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-gray-100" />
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-100 text-orange-700 text-xs font-bold flex items-center justify-center ring-2 ring-gray-100">
                    {(displayName || "A").slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Only this area re-renders on tab change */}
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
