import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import { createInterview } from "../../services/interviewService";

const ResumeScoreCard = ({ analysis }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleStartInterview = async () => {
    try {
      setLoading(true);

      const response = await createInterview(analysis._id);

      console.log("Interview Response:", response);

      toast.success("Interview created successfully!");

      if (!response.data?._id) {
        toast.error("Interview ID not found.");
        return;
      }

      navigate(`/interview/${response.data._id}`);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to start interview.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-2xl font-bold">Resume Score</h2>

          <h1 className="text-6xl mt-4 font-bold text-indigo-500">
            {analysis.analysis.resumeScore}%
          </h1>

          <p className="mt-4 text-green-400 text-lg">
            ATS Score : {analysis.analysis.atsScore}%
          </p>
        </div>

        <div className="text-center">
          <p className="text-slate-400 mb-4">
            Your resume has been analyzed successfully.
          </p>

          <Button
            onClick={handleStartInterview}
            disabled={loading}
            className="flex items-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Creating Interview...
              </>
            ) : (
              <>
                <PlayCircle size={18} />
                Start AI Interview
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreCard;
