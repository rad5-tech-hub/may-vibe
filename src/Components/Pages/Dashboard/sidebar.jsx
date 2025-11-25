import { X,  } from 'lucide-react';
import PropTypes from 'prop-types'
const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: '📊', label: 'Overview', id: 'overview' },
    { icon: '⊕', label: 'Upload Music', id: 'upload' },
    { icon: '🎵', label: 'My Releases', id: 'releases' },
    { icon: '📈', label: 'Royalties', id: 'royalties' },
    { icon: '💳', label: 'Payouts', id: 'payouts' },
    { icon: '👤', label: 'Profile', id: 'profile' },
    { icon: '🔔', label: 'Notifications', id: 'notifications' },
    { icon: '🎧', label: 'Support/Academy', id: 'support' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#EFF0F5] text-black shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col py-6 px-4 overflow-y-auto">
          {/* Close button for mobile */}
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-black hover:bg-white hover:bg-opacity-10 rounded-lg p-2"
          >
            <X size={24} />
          </button>

          {/* Logo/Brand Area */}
          <div className="mb-8 px-4">
            <h1 className="text-2xl font-bold text-black">Music Dashboard</h1>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200 text-left
                  ${currentPage === item.id 
                    ? 'bg-[#EFF0F5] bg-opacity-10 text-black shadow-lg ' 
                    : 'text-black hover:bg-[#EFF0F5] hover:bg-opacity-5 hover:shadow-2xl hover:text-orange-600 hover:scale-[1.02] hover:font-medium '
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <button className="flex items-center gap-3 px-4 py-3 text-gray-900 hover:text-white hover:bg-gray-600 hover:bg-opacity-5 rounded-lg transition-colors mt-4">
            <span className="text-xl">🚪</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};


// PropTypes Validation
Sidebar.propTypes = {
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;