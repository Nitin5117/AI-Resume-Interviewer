const ResumeScoreCard = ({ score = 91 }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <h2 className="text-xl font-semibold mb-6">Resume Score</h2>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-6xl font-bold text-indigo-500">{score}%</p>

          <p className="mt-3 text-green-400">Excellent Resume</p>
        </div>

        <div className="text-right">
          <p className="text-slate-400">ATS Friendly</p>
          <p className="text-2xl font-bold text-white">YES</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreCard;
