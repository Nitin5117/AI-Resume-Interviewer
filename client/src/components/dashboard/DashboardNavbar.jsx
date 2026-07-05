import { Bell, LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900 px-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">AI Interview</h1>

      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer text-slate-400 hover:text-white" />

        <div className="flex items-center gap-3">
          <UserCircle size={36} />

          <div>
            <p className="font-semibold">{user?.firstName || "User"}</p>

            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
