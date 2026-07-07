const ResumeTips = ({ analysis }) => {
  const suggestions = analysis.analysis.suggestions || [];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-400 text-black";
      default:
        return "bg-emerald-500 text-white";
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-[2rem] border border-slate-800 shadow-lg p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-indigo-300 font-medium">
            Resume Review
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            AI Suggestions
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-800/75 px-3 py-2 text-sm text-slate-300 border border-slate-700">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
              {suggestions.length}
            </span>
            <span className="whitespace-nowrap">
              {suggestions.length === 1 ? "Suggestion" : "Suggestions"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-[760px] min-h-[520px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
        {suggestions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-center text-slate-400">
            No suggestions available yet. Upload your resume to get instant
            feedback.
          </div>
        ) : (
          suggestions.map((item, index) => (
            <div
              key={index}
              className="group relative flex gap-4 items-start rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/95 to-slate-900/75 p-5 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`shrink-0 h-12 w-1.5 rounded-full ${item.priority === "High" ? "bg-red-400" : item.priority === "Medium" ? "bg-yellow-400" : "bg-emerald-400"}`}
              />

              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(item.priority)}`}
                  >
                    {item.priority}
                  </span>
                </div>

                <p className="mt-3 text-slate-300 leading-7 whitespace-pre-wrap">
                  {item.description}
                </p>

                {item.suggestions && item.suggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.suggestions.map((s, i) => (
                      <span
                        key={i}
                        className="bg-slate-800/60 text-slate-200 px-3 py-1 rounded-full text-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResumeTips;
