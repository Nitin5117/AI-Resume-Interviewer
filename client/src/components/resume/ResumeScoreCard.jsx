const ResumeScoreCard = ({ analysis }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Resume Score</h2>

          <h1 className="text-6xl mt-4 font-bold text-indigo-500">
            {analysis.analysis.resumeScore}%
          </h1>

          <p className="mt-4 text-green-400">
            ATS Score : {analysis.analysis.atsScore}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreCard;
