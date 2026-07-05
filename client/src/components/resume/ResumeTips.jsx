const ResumeTips = () => {
  const tips = [
    "Add measurable achievements.",
    "Improve the Summary section.",
    "Mention leadership experience.",
    "Include certifications.",
    "Increase ATS keyword density.",
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <h2 className="text-xl font-semibold mb-6">AI Suggestions</h2>

      <ul className="space-y-4">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-green-400">✔</span>

            <span className="text-slate-300">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeTips;
