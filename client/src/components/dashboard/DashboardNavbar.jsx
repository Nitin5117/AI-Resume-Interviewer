import { Bell } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const DashboardNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-900">
      <h2 className="text-2xl font-bold">AI Interview</h2>

      <div className="flex items-center gap-5">
        <Bell className="w-5 h-5 text-slate-400" />

        <div className="text-right">
          <p className="font-semibold">{user?.firstName}</p>

          <p className="text-sm text-slate-400">{user?.email}</p>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
