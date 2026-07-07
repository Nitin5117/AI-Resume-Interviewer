const ResumeKeywords = ({ analysis }) => {
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Detected Skills</h2>
          <p className="mt-2 text-slate-400">Key skills extracted from your resume content.</p>
        </div>
        <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
          {analysis.analysis.detectedSkills.length} skills
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {analysis.analysis.detectedSkills.map(skill => (
          <span
            key={skill}
            className="rounded-full bg-indigo-600/20 px-4 py-2 text-sm font-medium text-indigo-200 ring-1 ring-indigo-500/20"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ResumeKeywords
