import { useState } from 'react';
import { Menu,  Search, Bell, } from 'lucide-react';
import Sidebar from './sidebar.jsx';
import OverviewPage from './Overview/overview.jsx';
// import PlaceholderPage from './PlaceholderPage.jsx';
import Music from './Music Upload/Music.jsx';
import RoyaltiesPage from './Royalties/Royalties.jsx';
import Support from './Support &Academy/support.jsx';
import Notifications from './Notifications/notifications.jsx';
import Profile from './Profile/profile.jsx';
import Releases from './Releases/releases.jsx';
import Payouts from './Payouts/payouts.jsx';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage setCurrentPage={setCurrentPage} />;
      case 'upload':
        return <Music title="Upload Music" />;
      case 'releases':
        return <Releases title="My Releases" />;
      case 'royalties':
        return <RoyaltiesPage title="Royalties" />;
      case 'payouts':
        return <Payouts title="Payouts" />;
      case 'profile':
        return <Profile title="Profile" />;
      case 'notifications':
        return <Notifications title="Notifications" />;
      case 'support':
        return <Support title="Support/Academy" />;
      default:
        return <OverviewPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
              {/* <h1 className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">
                {currentPage}
              </h1> */}
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block transition-colors">
                <Search size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm font-medium text-gray-900 hidden sm:block">Junior Achebe</span>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" 
                  alt="Profile" 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-gray-100"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;