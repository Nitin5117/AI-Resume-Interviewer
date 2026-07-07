import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

import {
  History as HistoryIcon,
  Mic,
  ArrowRight,
  Trophy,
  CalendarDays,
  Play,
  LoaderCircle,
  RotateCcw,
  Trash2,
} from 'lucide-react'

import DashboardLayout from '../components/layout/DashboardLayout'

import { getInterviewHistory, deleteInterview } from '../services/interviewService'

const History = () => {
  const navigate = useNavigate()

  const [interviews, setInterviews] = useState([])

  const [loading, setLoading] = useState(true)

  const fetchHistory = async () => {
    try {
      const response = await getInterviewHistory()

      setInterviews(response.data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load interview history.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <LoaderCircle size={42} className="mx-auto animate-spin text-indigo-400" />

            <h1 className="mt-5 text-2xl font-semibold text-slate-300">
              Loading Interview History...
            </h1>
          </div>
        </div>
      </DashboardLayout>
    )
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
              <h1 className="text-4xl font-bold text-white">Interview History</h1>

              <p className="mt-2 text-slate-400">
                Review interviews, continue unfinished sessions, and access completed performance
                reports.
              </p>
            </div>
          </div>
        </section>

        {interviews.length > 0 ? (
          <section className="space-y-5">
            {interviews.map(interview => (
              <InterviewHistoryCard
                key={interview._id}
                interview={interview}
                navigate={navigate}
                refreshHistory={fetchHistory}
              />
            ))}
          </section>
        ) : (
          <EmptyHistory navigate={navigate} />
        )}
      </div>
    </DashboardLayout>
  )
}

const InterviewHistoryCard = ({ interview, navigate, refreshHistory }) => {
  const date = new Date(interview.createdAt).toLocaleDateString()

  const statusConfig = {
    pending: {
      label: 'Pending',
      className: 'bg-amber-500/10 text-amber-400',
    },

    started: {
      label: 'In Progress',
      className: 'bg-blue-500/10 text-blue-400',
    },

    evaluating: {
      label: 'Evaluating',
      className: 'bg-violet-500/10 text-violet-400',
    },

    completed: {
      label: 'Completed',
      className: 'bg-emerald-500/10 text-emerald-400',
    },

    failed: {
      label: 'Evaluation Failed',
      className: 'bg-red-500/10 text-red-400',
    },
  }

  const currentStatus = statusConfig[interview.status] || statusConfig.pending

  const handleAction = () => {
    switch (interview.status) {
      case 'completed':
        navigate(`/report/${interview._id}`)
        break

      case 'pending':
      case 'started':
      case 'failed':
        navigate(`/interview/${interview._id}`)
        break

      default:
        break
    }
  }
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this interview?')

    if (!confirmDelete) return

    try {
      await deleteInterview(interview._id)

      toast.success('Interview deleted successfully.')

      refreshHistory()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete interview.')
    }
  }
  const getActionButton = () => {
    switch (interview.status) {
      case 'completed':
        return (
          <button
            onClick={handleAction}
            className="flex items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-5 py-3 font-semibold text-indigo-300 transition hover:bg-indigo-500/20"
          >
            View Report
            <ArrowRight size={17} />
          </button>
        )

      case 'pending':
      case 'started':
        return (
          <button
            onClick={handleAction}
            className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 font-semibold text-blue-300 transition hover:bg-blue-500/20"
          >
            <Play size={17} />
            Resume Interview
          </button>
        )

      case 'evaluating':
        return (
          <button
            disabled
            className="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 font-semibold text-violet-300 opacity-70"
          >
            <LoaderCircle size={17} className="animate-spin" />
            Evaluating...
          </button>
        )

      case 'failed':
        return (
          <button
            onClick={handleAction}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-semibold text-red-300 transition hover:bg-red-500/20"
          >
            <RotateCcw size={17} />
            Retry Evaluation
          </button>
        )

      default:
        return null
    }
  }

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
                className={`rounded-full px-3 py-1 text-xs font-semibold ${currentStatus.className}`}
              >
                {currentStatus.label}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {interview.status === 'completed' && (
            <>
              <div className="min-w-[100px]">
                <p className="text-sm text-slate-400">Score</p>

                <p className="mt-1 text-2xl font-bold text-indigo-400">
                  {Math.round(interview.overallScore || 0)}%
                </p>
              </div>

              <div className="min-w-[160px]">
                <p className="text-sm text-slate-400">Hiring Decision</p>

                <p className="mt-1 font-semibold text-white">{interview.hiringDecision}</p>
              </div>
            </>
          )}

          <div className="flex items-center gap-3">
            {getActionButton()}

            <button
              onClick={handleDelete}
              className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {interview.status === 'completed' && interview.summary && (
        <div className="mt-6 border-t border-slate-800 pt-5">
          <p className="line-clamp-2 text-sm leading-6 text-slate-400">{interview.summary}</p>
        </div>
      )}

      {interview.status === 'failed' && (
        <div className="mt-6 border-t border-red-500/20 pt-5">
          <p className="text-sm leading-6 text-red-300">
            The AI evaluation could not be completed. Your answers are saved and you can retry
            generating the report.
          </p>
        </div>
      )}

      {interview.status === 'evaluating' && (
        <div className="mt-6 border-t border-violet-500/20 pt-5">
          <p className="text-sm leading-6 text-violet-300">
            Your interview is currently being evaluated. The report will be available after
            processing completes.
          </p>
        </div>
      )}
    </div>
  )
}

const EmptyHistory = ({ navigate }) => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-14 text-center">
      <Trophy size={45} className="mx-auto text-slate-600" />

      <h2 className="mt-5 text-2xl font-bold text-white">No Interview History</h2>

      <p className="mx-auto mt-3 max-w-md text-slate-400">
        Start your first AI interview and your progress will appear here.
      </p>

      <button
        onClick={() => navigate('/resume')}
        className="mt-7 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
      >
        Start AI Interview
      </button>
    </div>
  )
}

export default History
