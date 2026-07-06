import { CheckCircle2 } from "lucide-react";

const QuestionReviewCard = ({ question, index }) => {
  const score = question.score || 0;

  const color =
    score >= 8
      ? "bg-green-500/20 text-green-300"
      : score >= 6
        ? "bg-yellow-500/20 text-yellow-300"
        : "bg-red-500/20 text-red-300";

  return (
    <div className="rounded-4xl border border-slate-800 bg-slate-950/95 p-8 shadow-xl shadow-slate-950/20 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <h2 className="text-xl font-bold">Question {index + 1}</h2>

        <div
          className={`inline-flex items-center rounded-full px-4 py-2 ${color}`}
        >
          <span className="text-sm font-semibold">Score</span>
          <span className="ml-3 text-lg font-bold tracking-tight">
            {score}/10
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-indigo-300 font-semibold">Question</h3>

        <p className="mt-2 text-slate-200">{question.question}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-indigo-300 font-semibold">Your Answer</h3>

        <p className="mt-2 text-slate-300 whitespace-pre-wrap">
          {question.answer}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-indigo-300 font-semibold">AI Feedback</h3>

        <div className="flex gap-3 mt-3">
          <CheckCircle2 className="text-green-400 mt-1" size={18} />

          <p className="text-slate-300 leading-7">{question.feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionReviewCard;
