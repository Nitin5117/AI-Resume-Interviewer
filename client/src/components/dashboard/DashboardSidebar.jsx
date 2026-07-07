import { LayoutDashboard, FileText, BarChart3, History, User } from 'lucide-react'

import { NavLink } from 'react-router-dom'

const DashboardSidebar = () => {
  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] border-r border-slate-800 bg-slate-900">
      <div className="p-6 space-y-6">
        <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20} />} text="Dashboard" />

        <SidebarItem to="/resume" icon={<FileText size={20} />} text="Resume" />
        <SidebarItem to="/history" icon={<History size={20} />} text="History" />

        <SidebarItem to="/profile" icon={<User size={20} />} text="Profile" />
      </div>
    </aside>
  )
}

const SidebarItem = ({ icon, text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
          isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
        }`
      }
    >
      {icon}

      <span>{text}</span>
    </NavLink>
  )
}

export default DashboardSidebar
