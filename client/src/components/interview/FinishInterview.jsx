import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { evaluateInterview } from "../../services/interviewService";

const FinishInterview = ({ answers, interviewId }) => {
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    try {
      const response = await evaluateInterview(interviewId);

      toast.success("Interview evaluated successfully!");

      navigate(`/report/${interviewId}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to generate report.",
      );
    }
  };
  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <CheckCircle className="mx-auto text-green-500" size={80} />

      <h1 className="text-4xl font-bold mt-6">Interview Completed 🎉</h1>

      <p className="mt-4 text-slate-400">
        Great job! Your answers have been recorded.
      </p>

      <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left">
        <h2 className="text-xl font-semibold mb-6">Your Answers</h2>

        {answers.map((answer, index) => (
          <div key={index} className="mb-6 border-b border-slate-700 pb-4">
            <h3 className="font-semibold">Question {index + 1}</h3>

            <p className="text-slate-400 mt-2">{answer}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleGenerateReport}
        className="mt-8 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700"
      >
        Generate AI Report
      </button>
    </div>
  );
};

export default FinishInterview;
