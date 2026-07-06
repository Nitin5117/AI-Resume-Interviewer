import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckCircle2, AlertTriangle, Sparkles, CircleOff } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import { getInterview } from "../services/interviewService";
import ReportScoreCard from "../components/report/ReportScoreCard";
import QuestionReviewCard from "../components/report/QuestionReviewCard";

const Report = () => {
  const { interviewId } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getInterview(interviewId);

        setReport(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load report.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [interviewId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-10 shadow-2xl shadow-slate-950/20 text-center w-full max-w-xl">
            <p className="text-slate-400 uppercase tracking-[0.3em] mb-4">
              Preparing your AI insights
            </p>
            <h1 className="text-3xl font-bold text-white mb-2">
              Loading Report...
            </h1>
            <p className="text-slate-500">This should only take a moment.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!report || !report.report) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="rounded-3xl bg-slate-900 border border-red-500/30 p-10 shadow-2xl shadow-red-500/10 text-center w-full max-w-xl">
            <h1 className="text-3xl font-bold text-red-400">
              Report not found
            </h1>
            <p className="mt-3 text-slate-400">
              We couldn&apos;t retrieve your interview feedback. Please try
              again later.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const ai = report.report;

  return (
    <DashboardLayout>
      <div className="space-y-10 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-4xl border border-slate-800 bg-slate-950/95 p-10 shadow-2xl shadow-slate-950/40 ring-1 ring-slate-800/50">
          <div className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-8 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-indigo-300 shadow-sm shadow-indigo-500/10">
                AI Interview Insights
              </p>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-white">
                Interview Report
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                A polished breakdown of your performance, strengths, and the AI
                recommendations that help you level up for the next round.
              </p>
            </div>

            <div className="space-y-4 text-right">
              <div className="rounded-3xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-sm text-slate-300 shadow-sm shadow-slate-950/10">
                Interview ID:{" "}
                <span className="font-semibold text-white">#{interviewId}</span>
              </div>
              <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-4 text-sm uppercase tracking-[0.24em] text-indigo-200 shadow-sm shadow-indigo-500/10">
                Report snapshot
              </div>
            </div>
          </div>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20 ring-1 ring-slate-800/40">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Overall score
              </p>
              <p className="mt-4 text-4xl font-bold text-white">
                {report.overallScore}%
              </p>
              <p className="mt-3 text-slate-400">
                AI evaluation of your interview performance.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20 ring-1 ring-slate-800/40">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Status
              </p>
              <p className="mt-4 text-3xl font-semibold text-white capitalize">
                {report.status || "Pending"}
              </p>
              <p className="mt-3 text-slate-400">
                Current interview lifecycle state.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20 ring-1 ring-slate-800/40">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Hiring signal
              </p>
              <p className="mt-4 text-3xl font-semibold text-white capitalize">
                {report.report.hiringDecision || "Insight"}
              </p>
              <p className="mt-3 text-slate-400">
                What the AI recommends about your candidacy.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.7fr_0.95fr]">
          <div className="space-y-6">
            <ReportScoreCard report={report} />

            <div className="grid gap-5 md:grid-cols-2">
              <ProfileCard
                title="Strengths"
                items={ai.strengths}
                accent="from-emerald-500/20 via-slate-900 to-slate-950"
              />
              <ProfileCard
                title="Weaknesses"
                items={ai.weaknesses}
                accent="from-rose-500/20 via-slate-900 to-slate-950"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2 items-stretch">
              <div className="flex h-full flex-col rounded-4xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-800/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_rgba(15,23,42,0.8)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Recommendations
                    </h2>
                    <p className="mt-2 text-slate-400 leading-7">
                      Practical actions the AI identified to boost your next
                      round.
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                    Focus areas
                  </span>
                </div>
                <div className="mt-6 grid gap-4 flex-1">
                  {ai.recommendations?.length ? (
                    ai.recommendations.map((item, index) => (
                      <div
                        key={index}
                        className="group rounded-3xl border border-slate-800 bg-slate-950/95 p-5 shadow-lg shadow-slate-950/10 transition-transform duration-300 hover:border-emerald-500 hover:-translate-y-1 hover:shadow-emerald-500/10"
                      >
                        <div className="flex gap-5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 font-bold shadow-sm shadow-emerald-500/10">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <div>
                            <h4 className="font-semibold text-white">
                              Recommendation {index + 1}
                            </h4>
                            <p className="mt-2 text-slate-300 leading-7">
                              {item}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400">
                      No recommendations available.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex h-full flex-col rounded-4xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-800/40">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      Question Review
                    </h2>
                    <p className="text-slate-400 mt-2">
                      AI feedback and scoring for each answer.
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-800/80 px-4 py-2 text-sm text-slate-300 shadow-sm shadow-slate-950/20">
                    {report.questions.length} answers reviewed
                  </span>
                </div>
                <div className="mt-8 space-y-6 flex-1">
                  {report.questions.map((question, index) => (
                    <QuestionReviewCard
                      key={index}
                      question={question}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-4xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-800/40">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Performance Snapshot
                  </h2>
                  <p className="mt-2 text-slate-400 leading-7">
                    Visual score overview to help you see which areas are
                    strongest.
                  </p>
                </div>
                <span className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
                  {report.overallScore}% overall
                </span>
              </div>
              <div className="mt-8 space-y-5">
                <ProgressRow
                  label="Communication"
                  value={ai.communication}
                  color="from-indigo-500 to-violet-500"
                />
                <ProgressRow
                  label="Technical Knowledge"
                  value={ai.technicalKnowledge}
                  color="from-emerald-500 to-cyan-500"
                />
                <ProgressRow
                  label="Problem Solving"
                  value={ai.problemSolving}
                  color="from-amber-500 to-orange-500"
                />
                <ProgressRow
                  label="Confidence"
                  value={ai.confidence}
                  color="from-fuchsia-500 to-pink-500"
                />
              </div>
            </div>

            <div className="rounded-4xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-800/40">
              <h2 className="text-2xl font-bold text-white">What the AI saw</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {renderInsightChip("Clear explanations", ai.communication >= 7)}
                {renderInsightChip(
                  "Strong technical depth",
                  ai.technicalKnowledge >= 7,
                )}
                {renderInsightChip("Great composure", ai.confidence >= 7)}
                {renderInsightChip(
                  "Good problem framing",
                  ai.problemSolving >= 7,
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
};

const ProfileCard = ({ title, items, accent }) => {
  const isStrength = title === "Strengths";

  return (
    <div
      className={`rounded-4xl border border-slate-800 bg-linear-to-br ${accent} p-7 shadow-2xl shadow-slate-950/20 transition-transform duration-300 hover:-translate-y-1`}
    >
      <h3 className="text-xl font-semibold text-white">{title}</h3>

      <div className="mt-5 space-y-3">
        {items?.length ? (
          items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl bg-slate-900/90 p-4 transition-all duration-300 hover:border hover:border-indigo-500 hover:-translate-y-1"
            >
              {isStrength ? (
                <CheckCircle2
                  size={22}
                  className="text-emerald-400 mt-1 shrink-0"
                />
              ) : (
                <AlertTriangle
                  size={22}
                  className="text-orange-400 mt-1 shrink-0"
                />
              )}

              <p className="text-slate-200 leading-7">{item}</p>
            </div>
          ))
        ) : (
          <div className="text-slate-500">Nothing to display.</div>
        )}
      </div>
    </div>
  );
};

const ProgressRow = ({ label, value, color }) => {
  const percentage = Math.round((value / 10) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>{label}</span>
        <span className="font-semibold text-white">{value}/10</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-900 border border-slate-800">
        <div
          className={`h-full rounded-full bg-linear-to-r ${color} transition-all duration-1000 ease-out`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

const renderInsightChip = (label, active) => (
  <div
    className={`flex items-center gap-3 rounded-3xl border p-4 transition-all duration-300
    ${
      active
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
        : "border-slate-800 bg-slate-900/90 text-slate-500"
    }`}
  >
    {active ? <Sparkles size={18} /> : <CircleOff size={18} />}

    <span>{label}</span>
  </div>
);

export default Report;
