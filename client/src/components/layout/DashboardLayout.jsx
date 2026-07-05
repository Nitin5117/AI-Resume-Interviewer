import DashboardNavbar from "../dashboard/DashboardNavbar";
import DashboardSidebar from "../dashboard/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* <DashboardNavbar /> */}

      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
