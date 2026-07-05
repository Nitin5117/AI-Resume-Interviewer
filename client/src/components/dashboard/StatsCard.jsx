import { ArrowUpRight } from "lucide-react";

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className={`${color} p-4 rounded-xl`}>{icon}</div>
      </div>

      <div className="mt-6 flex items-center text-green-400 text-sm">
        <ArrowUpRight size={16} />
        <span className="ml-1">Improving</span>
      </div>
    </div>
  );
};

export default StatsCard;
