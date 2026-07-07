const ResumeHeader = () => {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-3 rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200 ring-1 ring-indigo-500/20">
        Resume Analysis
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Build a stronger resume with AI feedback.
        </h1>

        <p className="max-w-3xl text-slate-300 text-lg leading-8">
          Upload a PDF to uncover ATS insights, resume scoring, keyword alignment, and expert
          suggestions for improving your application.
        </p>
      </div>
    </div>
  )
}

export default ResumeHeader
