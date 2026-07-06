import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  History as HistoryIcon,
  Mic,
  ArrowRight,
  Trophy,
  CalendarDays,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import { getInterviewHistory } from "../services/interviewService";

const History = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getInterviewHistory();

        console.log("History Response:", response);

        setInterviews(response.data);
      } catch (error) {
        console.error("History Error:", error);

        toast.error(
          error.response?.data?.message || "Failed to load interview history.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-slate-300">
            Loading Interview History...
          </h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <section>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
              <HistoryIcon size={26} />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">
                Interview History
              </h1>

              <p className="mt-2 text-slate-400">
                Review your previous AI interviews and performance reports.
              </p>
            </div>
          </div>
        </section>

        {interviews.length > 0 ? (
          <section className="space-y-5">
            {interviews.map((interview) => (
              <InterviewHistoryCard
                key={interview._id}
                interview={interview}
                navigate={navigate}
              />
            ))}
          </section>
        ) : (
          <EmptyHistory navigate={navigate} />
        )}
      </div>
    </DashboardLayout>
  );
};

const InterviewHistoryCard = ({ interview, navigate }) => {
  const date = new Date(interview.createdAt).toLocaleDateString();

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500/30">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
            <Mic size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">AI Interview</h2>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                {date}
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  interview.status === "completed"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {interview.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="min-w-[100px]">
            <p className="text-sm text-slate-400">Score</p>

            <p className="mt-1 text-2xl font-bold text-indigo-400">
              {Math.round(interview.overallScore || 0)}%
            </p>
          </div>

          <div className="min-w-[160px]">
            <p className="text-sm text-slate-400">Hiring Decision</p>

            <p className="mt-1 font-semibold text-white">
              {interview.hiringDecision}
            </p>
          </div>

          {interview.status === "completed" && (
            <button
              onClick={() => navigate(`/report/${interview._id}`)}
              className="flex items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-5 py-3 font-semibold text-indigo-300 transition hover:bg-indigo-500/20"
            >
              View Report
              <ArrowRight size={17} />
            </button>
          )}
        </div>
      </div>

      {interview.summary && interview.status === "completed" && (
        <div className="mt-6 border-t border-slate-800 pt-5">
          <p className="line-clamp-2 text-sm leading-6 text-slate-400">
            {interview.summary}
          </p>
        </div>
      )}
    </div>
  );
};

const EmptyHistory = ({ navigate }) => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-14 text-center">
      <Trophy size={45} className="mx-auto text-slate-600" />

      <h2 className="mt-5 text-2xl font-bold text-white">
        No Interview History
      </h2>

      <p className="mx-auto mt-3 max-w-md text-slate-400">
        Complete your first AI interview and your performance history will
        appear here.
      </p>

      <button
        onClick={() => navigate("/resume")}
        className="mt-7 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
      >
        Start AI Interview
      </button>
    </div>
  );
};

export default History;
