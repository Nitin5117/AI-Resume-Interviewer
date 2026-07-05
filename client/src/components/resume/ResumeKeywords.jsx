const ResumeKeywords = () => {
  const keywords = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "JavaScript",
    "Git",
    "REST API",
    "Tailwind CSS",
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <h2 className="text-xl font-semibold mb-6">Detected Skills</h2>

      <div className="flex flex-wrap gap-3">
        {keywords.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 rounded-full bg-indigo-600 text-white"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResumeKeywords;
