const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
      <h1 className="text-3xl font-bold text-white">{title}</h1>

      <p className="text-slate-400 mt-2 mb-8">{subtitle}</p>

      {children}
    </div>
  );
};

export default AuthCard;
