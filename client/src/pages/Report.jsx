import { useEffect, useState, useRef } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import toast from 'react-hot-toast'

import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  CircleOff,
  ChevronDown,
  LoaderCircle,
} from 'lucide-react'

import DashboardLayout from '../components/layout/DashboardLayout'
import { getInterview } from '../services/interviewService'
import ReportScoreCard from '../components/report/ReportScoreCard'
import QuestionReviewCard from '../components/report/QuestionReviewCard'

// ---------- Animated count-up hook ----------
const useCountUp = (target, duration = 1200, start = false) => {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!start || typeof target !== 'number' || Number.isNaN(target)) return

    const startTime = performance.now()

    const tick = now => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
      else setValue(target)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, start])

  return value
}

// ---------- Shared style tokens (kept in one place so nothing drifts) ----------
const CARD =
  'rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl shadow-slate-950/20 ring-1 ring-slate-800/40'
const CARD_LG =
  'rounded-4xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-800/40'
const LABEL = 'text-sm uppercase tracking-[0.3em] text-slate-500'
const FADE_IN = 'opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]'

const Report = () => {
  const { interviewId } = useParams()

  const navigate = useNavigate()

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [openRec, setOpenRec] = useState(null)
  const [sidebarTab, setSidebarTab] = useState('snapshot') // "snapshot" | "insights"

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getInterview(interviewId)
        setReport(response.data)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load report.')
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [interviewId])

  useEffect(() => {
    if (!loading && report?.report) {
      const t = setTimeout(() => setMounted(true), 50)
      return () => clearTimeout(t)
    }
  }, [loading, report])

  const animatedScore = useCountUp(report?.overallScore ?? 0, 1400, mounted)

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className={`${CARD_LG} p-10 text-center w-full max-w-xl`}>
            <div className="mx-auto mb-6 h-14 w-14 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin" />
            <p className={`${LABEL} mb-4`}>Preparing your AI insights</p>
            <h1 className="text-3xl font-bold text-white mb-2">Loading Report...</h1>
            <p className="text-slate-500">This should only take a moment.</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!report) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="rounded-3xl bg-slate-900 border border-red-500/30 p-10 text-center w-full max-w-xl">
            <h1 className="text-3xl font-bold text-red-400">Interview not found</h1>

            <p className="mt-3 text-slate-400">We couldn&apos;t retrieve this interview.</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (report.status === 'evaluating') {
    return (
      <DashboardLayout>
        <StatusState
          icon={<LoaderCircle size={60} className="animate-spin text-violet-400" />}
          title="Evaluation in Progress"
          description="Your interview answers are currently being evaluated. Your report will be available after processing completes."
          buttonText="Go to History"
          onClick={() => navigate('/history')}
        />
      </DashboardLayout>
    )
  }

  if (report.status === 'failed') {
    return (
      <DashboardLayout>
        <StatusState
          icon={<AlertTriangle size={60} className="text-red-400" />}
          title="Evaluation Failed"
          description="The AI evaluation could not be completed. Your interview answers are still saved and you can retry generating the report."
          buttonText="Retry Evaluation"
          onClick={() => navigate(`/interview/${interviewId}`)}
        />
      </DashboardLayout>
    )
  }

  if (report.status === 'pending' || report.status === 'started') {
    return (
      <DashboardLayout>
        <StatusState
          icon={<CircleOff size={60} className="text-amber-400" />}
          title="Report Not Ready"
          description="Complete your interview before viewing the AI performance report."
          buttonText="Continue Interview"
          onClick={() => navigate(`/interview/${interviewId}`)}
        />
      </DashboardLayout>
    )
  }

  if (report.status !== 'completed' || !report.report) {
    return (
      <DashboardLayout>
        <StatusState
          icon={<CircleOff size={60} className="text-slate-400" />}
          title="Report Unavailable"
          description="The interview report is currently unavailable."
          buttonText="Go to History"
          onClick={() => navigate('/history')}
        />
      </DashboardLayout>
    )
  }

  const ai = report.report
  const metrics = [
    {
      label: 'Communication',
      value: ai.communication,
      color: 'from-indigo-500 to-violet-500',
    },
    {
      label: 'Technical Knowledge',
      value: ai.technicalKnowledge,
      color: 'from-emerald-500 to-cyan-500',
    },
    {
      label: 'Problem Solving',
      value: ai.problemSolving,
      color: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Confidence',
      value: ai.confidence,
      color: 'from-fuchsia-500 to-pink-500',
    },
  ]

  return (
    <DashboardLayout>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .live-dot { animation: pulseDot 1.6s ease-in-out infinite; }
      `}</style>

      <div className="space-y-10 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---------------- HERO ---------------- */}
        <section
          className={`${FADE_IN} relative overflow-hidden rounded-4xl border border-slate-800 bg-slate-950/95 p-10 shadow-2xl shadow-slate-950/40 ring-1 ring-slate-800/50`}
        >
          <div className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -left-24 bottom-8 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-indigo-300 shadow-sm shadow-indigo-500/10">
                <LiveDot color="bg-indigo-400" />
                AI Interview Insights
              </p>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-white">
                Interview Report
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                A polished breakdown of your performance, strengths, and the AI recommendations that
                help you level up for the next round.
              </p>
            </div>

            <div className="space-y-4 text-right">
              <div className="rounded-3xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-sm text-slate-300 shadow-sm shadow-slate-950/10">
                Interview ID: <span className="font-semibold text-white">#{interviewId}</span>
              </div>
              <div className="flex items-center justify-end gap-2 rounded-3xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-4 text-sm uppercase tracking-[0.24em] text-indigo-200 shadow-sm shadow-indigo-500/10">
                <LiveDot color="bg-emerald-400" />
                Live report
              </div>
            </div>
          </div>

          {/* Hero stat row + gauge */}
          <div className="relative mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-[auto_1fr_1fr]">
            <div
              className={`${FADE_IN} [animation-delay:80ms] ${CARD} p-6 flex items-center gap-6 transition-transform duration-300 hover:-translate-y-1 hover:border-indigo-500/50`}
            >
              <ScoreGauge score={animatedScore} />
              <div>
                <p className={LABEL}>Overall score</p>
                <p className="mt-2 text-3xl font-bold text-white tabular-nums">
                  {Math.round(animatedScore)}%
                </p>
                <p className="mt-1 text-sm text-slate-400">Live AI evaluation</p>
              </div>
            </div>

            <div
              className={`${FADE_IN} [animation-delay:160ms] ${CARD} p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-indigo-500/50`}
            >
              <p className={LABEL}>Status</p>
              <p className="mt-4 text-3xl font-semibold text-white capitalize">
                {report.status || 'Pending'}
              </p>
              <p className="mt-3 text-slate-400">Current interview lifecycle state.</p>
            </div>

            <div
              className={`${FADE_IN} [animation-delay:240ms] ${CARD} p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-indigo-500/50`}
            >
              <p className={LABEL}>Hiring signal</p>
              <p className="mt-4 text-3xl font-semibold text-white capitalize">
                {report.report.hiringDecision || 'Insight'}
              </p>
              <p className="mt-3 text-slate-400">What the AI recommends about your candidacy.</p>
            </div>
          </div>
        </section>

        {/* ---------------- SCORE CARD + STRENGTHS/WEAKNESSES ---------------- */}
        <div className="grid gap-8 xl:grid-cols-[1.7fr_0.95fr]">
          <div className="space-y-6">
            <div className={`${FADE_IN} [animation-delay:120ms]`}>
              <ReportScoreCard report={report} />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className={`${FADE_IN} [animation-delay:160ms]`}>
                <ProfileCard
                  title="Strengths"
                  items={ai.strengths}
                  accent="from-emerald-500/20 via-slate-900 to-slate-950"
                />
              </div>
              <div className={`${FADE_IN} [animation-delay:220ms]`}>
                <ProfileCard
                  title="Weaknesses"
                  items={ai.weaknesses}
                  accent="from-rose-500/20 via-slate-900 to-slate-950"
                />
              </div>
            </div>
          </div>

          {/* ---------------- SIDEBAR ---------------- */}
          <aside className="space-y-6">
            <div className={`${FADE_IN} [animation-delay:200ms] ${CARD_LG} p-8`}>
              {/* Tab switcher */}
              <div className="flex gap-2 rounded-2xl bg-slate-950/60 p-1.5 border border-slate-800">
                <TabButton
                  active={sidebarTab === 'snapshot'}
                  onClick={() => setSidebarTab('snapshot')}
                >
                  Snapshot
                </TabButton>
                <TabButton
                  active={sidebarTab === 'insights'}
                  onClick={() => setSidebarTab('insights')}
                >
                  What the AI saw
                </TabButton>
              </div>

              {sidebarTab === 'snapshot' ? (
                <div className="mt-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Performance Snapshot</h2>
                      <p className="mt-2 text-slate-400 leading-7">
                        Visual score overview to help you see which areas are strongest.
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-300 tabular-nums">
                      {Math.round(animatedScore)}% overall
                    </span>
                  </div>
                  <div className="mt-8 space-y-5">
                    {metrics.map((m, i) => (
                      <ProgressRow key={m.label} {...m} animate={mounted} delay={i * 120} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-white">What the AI saw</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {renderInsightChip('Clear explanations', ai.communication >= 7)}
                    {renderInsightChip('Strong technical depth', ai.technicalKnowledge >= 7)}
                    {renderInsightChip('Great composure', ai.confidence >= 7)}
                    {renderInsightChip('Good problem framing', ai.problemSolving >= 7)}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* ---------------- RECOMMENDATIONS — FULL WIDTH, ROW BY ROW ---------------- */}
        <div
          className={`${FADE_IN} [animation-delay:280ms] ${CARD_LG} w-full p-8 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_rgba(15,23,42,0.8)]`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Recommendations</h2>
              <p className="mt-2 text-slate-400 leading-7">
                Practical actions the AI identified to boost your next round.
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
              Focus areas
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 w-full">
            {ai.recommendations?.length ? (
              ai.recommendations.map((item, index) => {
                const isOpen = openRec === index
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setOpenRec(isOpen ? null : index)}
                    className={`${FADE_IN} group w-full rounded-3xl border p-5 text-left shadow-lg shadow-slate-950/10 transition-all duration-300 ${
                      isOpen
                        ? 'border-emerald-500 bg-slate-950'
                        : 'border-slate-800 bg-slate-950/95 hover:border-emerald-500 hover:-translate-y-1 hover:shadow-emerald-500/10'
                    }`}
                    style={{ animationDelay: `${320 + index * 70}ms` }}
                  >
                    <div className="flex w-full gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 font-bold shadow-sm shadow-emerald-500/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="font-semibold text-white">Recommendation {index + 1}</h4>
                          <ChevronDown
                            size={18}
                            className={`shrink-0 text-slate-500 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-emerald-400' : ''
                            }`}
                          />
                        </div>
                        <p
                          className={`mt-2 text-slate-300 leading-7 transition-all duration-300 ${
                            isOpen ? 'line-clamp-none' : 'line-clamp-2'
                          }`}
                        >
                          {item}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="text-slate-400">No recommendations available.</div>
            )}
          </div>
        </div>

        {/* ---------------- QUESTION REVIEW — FULL WIDTH, ROW BY ROW ---------------- */}
        <div className={`${FADE_IN} [animation-delay:340ms] ${CARD_LG} w-full p-8`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Question Review</h2>
              <p className="mt-2 text-slate-400 leading-7">
                AI feedback and scoring for each answer.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-slate-800/80 px-4 py-2 text-sm text-slate-300 shadow-sm shadow-slate-950/20">
              {report.questions.length} answers reviewed
            </span>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 w-full">
            {report.questions.map((question, index) => (
              <div
                key={index}
                className={`${FADE_IN} w-full`}
                style={{ animationDelay: `${380 + index * 60}ms` }}
              >
                <QuestionReviewCard question={question} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

// ---------- Small shared components ----------

const LiveDot = ({ color }) => (
  <span className="relative flex h-2 w-2">
    <span className={`live-dot absolute inline-flex h-full w-full rounded-full ${color}`} />
    <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
  </span>
)

const TabButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300
      ${
        active
          ? 'bg-indigo-500/20 text-indigo-200 shadow-sm shadow-indigo-500/20'
          : 'text-slate-500 hover:text-slate-300'
      }`}
  >
    {children}
  </button>
)

const ScoreGauge = ({ score = 0, size = 84, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        className="fill-none stroke-slate-800"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="fill-none stroke-indigo-400 transition-[stroke-dashoffset] duration-300 ease-out"
      />
    </svg>
  )
}

const ProfileCard = ({ title, items, accent }) => {
  const isStrength = title === 'Strengths'

  return (
    <div
      className={`h-full rounded-4xl border border-slate-800 bg-linear-to-br ${accent} p-7 shadow-2xl shadow-slate-950/20 transition-transform duration-300 hover:-translate-y-1`}
    >
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <div className="mt-5 space-y-3">
        {items?.length ? (
          items.map((item, index) => (
            <div
              key={index}
              className={`${FADE_IN} flex items-start gap-4 rounded-2xl bg-slate-900/90 p-4 transition-all duration-300 hover:border hover:border-indigo-500 hover:-translate-y-1`}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              {isStrength ? (
                <CheckCircle2 size={22} className="text-emerald-400 mt-1 shrink-0" />
              ) : (
                <AlertTriangle size={22} className="text-orange-400 mt-1 shrink-0" />
              )}
              <p className="text-slate-200 leading-7">{item}</p>
            </div>
          ))
        ) : (
          <div className="text-slate-500">Nothing to display.</div>
        )}
      </div>
    </div>
  )
}

const ProgressRow = ({ label, value, color, animate, delay = 0 }) => {
  const percentage = Math.round(((value || 0) / 10) * 100)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!animate) return
    const t = setTimeout(() => setWidth(percentage), delay)
    return () => clearTimeout(t)
  }, [animate, percentage, delay])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>{label}</span>
        <span className="font-semibold text-white tabular-nums">{value}/10</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-900 border border-slate-800">
        <div
          className={`h-full rounded-full bg-linear-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

const renderInsightChip = (label, active) => (
  <div
    key={label}
    className={`flex items-center gap-3 rounded-3xl border p-4 transition-all duration-300 hover:-translate-y-0.5
      ${
        active
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:shadow-lg hover:shadow-emerald-500/10'
          : 'border-slate-800 bg-slate-900/90 text-slate-500'
      }`}
  >
    {active ? <Sparkles size={18} className="animate-pulse" /> : <CircleOff size={18} />}
    <span>{label}</span>
  </div>
)

const StatusState = ({ icon, title, description, buttonText, onClick }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className={`${CARD_LG} p-10 text-center w-full max-w-xl`}>
        <div className="flex justify-center">{icon}</div>

        <h1 className="mt-6 text-3xl font-bold text-white">{title}</h1>

        <p className="mt-4 leading-7 text-slate-400">{description}</p>

        <button
          type="button"
          onClick={onClick}
          className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Report
