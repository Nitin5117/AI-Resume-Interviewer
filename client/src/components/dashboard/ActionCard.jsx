import { ArrowRight } from "lucide-react";

const ActionCard = ({ title, description, icon, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500 hover:-translate-y-1 transition duration-300"
    >
      <div className={`inline-flex p-3 rounded-xl ${color}`}>{icon}</div>

      <h3 className="mt-5 text-xl font-semibold">{title}</h3>

      <p className="mt-2 text-slate-400">{description}</p>

      <div className="flex items-center mt-5 text-indigo-400">
        Open
        <ArrowRight className="ml-2" size={18} />
      </div>
    </button>
  );
};

export default ActionCard;
