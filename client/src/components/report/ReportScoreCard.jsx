import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ReportScoreCard = ({ report }) => {
  const score = Math.round(report.overallScore);

  const getGrade = () => {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    return "D";
  };

  const getDecision = () => {
    if (score >= 80)
      return {
        text: "Recommended",
        color: "text-green-400",
        bg: "bg-green-500/10 border-green-500/40",
      };

    if (score >= 60)
      return {
        text: "Borderline",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10 border-yellow-500/40",
      };

    return {
      text: "Not Recommended",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/40",
    };
  };

  const decision = getDecision();

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Score Card */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-8">Overall Performance</h2>

        <div className="flex items-center gap-10">
          <div className="w-44 h-44">
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              styles={buildStyles({
                textColor: "#ffffff",
                pathColor: "#6366F1",
                trailColor: "#1E293B",
                textSize: "18px",
              })}
            />
          </div>

          <div>
            <h3 className="text-slate-400 mb-2">Grade</h3>

            <p className="text-6xl font-bold text-indigo-400">{getGrade()}</p>

            <div
              className={`mt-6 inline-flex items-center px-4 py-2 rounded-full border ${decision.bg}`}
            >
              <span className={`font-semibold ${decision.color}`}>
                {decision.text}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6">AI Summary</h2>

        <p className="text-slate-300 leading-8">{report.summary}</p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <InfoCard title="Questions" value={report.questions.length} />

          <InfoCard title="Status" value={report.status} />

          <InfoCard
            title="Interview Date"
            value={new Date(report.updatedAt).toLocaleDateString()}
          />

          <InfoCard title="Average Score" value={`${score}%`} />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="rounded-2xl bg-slate-800 p-5">
    <p className="text-sm text-slate-400">{title}</p>

    <p className="text-xl font-semibold mt-2">{value}</p>
  </div>
);

export default ReportScoreCard;
