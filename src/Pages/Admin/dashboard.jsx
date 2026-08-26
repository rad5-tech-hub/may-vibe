import { useEffect, useState } from "react";
import axios from "axios";
import { Menu } from "lucide-react";
import Sidebar from "./components/sidebar";
import Main from "./components/main";
import { getInitials } from "./roleAccess";
import { getErrorMessage } from "../../utils/errorHelper";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const cached = localStorage.getItem("adminUser");
      if (cached) {
        try { setAdminUser(JSON.parse(cached)); } catch { /* ignore */ }
      }
      try {
        const response = await axios.get(`${BASE_URL}/admin/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        const data = response.data?.data || response.data;
        if (data) {
          setAdminUser(data);
          localStorage.setItem("adminUser", JSON.stringify(data));
        }
      } catch (error) {
        // Silent fallback to cached adminUser; profile page surfaces API errors.
        console.error(getErrorMessage(error, "Failed to load admin profile"));
      }
    };
    fetchAdmin();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-display text-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} role={adminUser?.roles?.[0]?.name} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-8">
          <button type="button" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 hover:bg-gray-100 lg:hidden" aria-label="Open navigation">
            <Menu size={22} />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm font-medium text-gray-700 sm:block">{adminUser?.full_name || "Admin User"}</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
              {getInitials(adminUser?.full_name)}
            </div>
          </div>
        </header>
        <main className="admin-scroll min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-8 lg:px-10">
          <Main adminUser={adminUser} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
