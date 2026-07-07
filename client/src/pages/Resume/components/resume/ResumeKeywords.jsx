const ResumeKeywords = ({ analysis }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-8">
      <h2 className="text-2xl font-bold mb-6">Detected Skills</h2>

      <div className="flex flex-wrap gap-3">
        {analysis.analysis.detectedSkills.map((skill) => (
          <span key={skill} className="bg-indigo-600 px-4 py-2 rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResumeKeywords;
