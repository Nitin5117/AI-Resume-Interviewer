import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FileText, Mic, TrendingUp, Trophy, ArrowRight, Activity } from 'lucide-react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import DashboardLayout from '../components/layout/DashboardLayout'
import { getDashboard } from '../services/dashboardService'

const Dashboard = () => {
  const navigate = useNavigate()

  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboard()

        setDashboard(response.data)
      } catch (error) {
        console.error('Dashboard Error:', error)

        toast.error(error.response?.data?.message || 'Failed to load dashboard.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-slate-300">Loading Dashboard...</h1>
        </div>
      </DashboardLayout>
    )
  }

  if (!dashboard) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-red-400">Failed to load dashboard.</h1>
        </div>
      </DashboardLayout>
    )
  }

  /*
  --------------------------------------------------
  PREPARE PERFORMANCE CHART DATA

  Backend returns recent interviews newest first.

  For the chart, reverse them so the oldest interview
  appears first and the newest interview appears last.
  --------------------------------------------------
  */

  const performanceData = [...(dashboard.performanceHistory || [])]
    .reverse()
    .map((interview, index) => ({
      interview: `Interview ${index + 1}`,
      score: Math.round(interview.overallScore || 0),
      date: new Date(interview.createdAt).toLocaleDateString(),
    }))

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* HEADER */}

        <section>
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>

          <p className="mt-2 text-slate-400">Track your resume and interview performance.</p>
        </section>

        {/* STAT CARDS */}

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Resumes"
            value={dashboard.totalResumes}
            icon={<FileText size={24} />}
          />

          <StatCard
            title="Total Interviews"
            value={dashboard.totalInterviews}
            icon={<Mic size={24} />}
          />

          <StatCard
            title="Average Score"
            value={`${dashboard.averageScore}%`}
            icon={<TrendingUp size={24} />}
          />

          <StatCard
            title="Best Score"
            value={`${dashboard.bestScore}%`}
            icon={<Trophy size={24} />}
          />
        </section>

        {/* PERFORMANCE CHART */}

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
              <Activity size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">Performance Trend</h2>

              <p className="mt-1 text-slate-400">
                Track how your interview scores improve over time.
              </p>
            </div>
          </div>

          {performanceData.length > 0 ? (
            <div className="mt-8 h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

                  <XAxis dataKey="interview" stroke="#94a3b8" tickLine={false} axisLine={false} />

                  <YAxis domain={[0, 100]} stroke="#94a3b8" tickLine={false} axisLine={false} />

                  <Tooltip content={<CustomTooltip />} />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{
                      fill: '#6366f1',
                      strokeWidth: 2,
                      r: 5,
                    }}
                    activeDot={{
                      r: 7,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-700 p-10 text-center">
              <TrendingUp size={40} className="mx-auto text-slate-600" />

              <h3 className="mt-4 text-lg font-semibold text-white">No performance data yet</h3>

              <p className="mt-2 text-slate-400">
                Complete interviews to track your performance progress.
              </p>
            </div>
          )}
        </section>

        {/* DASHBOARD CONTENT */}

        <section className="grid gap-8 xl:grid-cols-[1.7fr_0.8fr]">
          {/* RECENT INTERVIEWS */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Recent Interviews</h2>

              <p className="mt-2 text-slate-400">Review your latest interview performances.</p>
            </div>

            <div className="mt-8 space-y-4">
              {dashboard.recentInterviews?.length > 0 ? (
                dashboard.recentInterviews.map(interview => (
                  <RecentInterviewCard
                    key={interview._id}
                    interview={interview}
                    navigate={navigate}
                  />
                ))
              ) : (
                <EmptyInterviews navigate={navigate} />
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-6">
            {/* LATEST RESUME */}

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <p className="text-slate-400">Latest Resume Score</p>

              <h2 className="mt-4 text-5xl font-bold text-indigo-500">{dashboard.latestResume}%</h2>

              <button
                onClick={() => {
                  if (dashboard.latestResumeId) {
                    navigate(`/resume/${dashboard.latestResumeId}`)
                  } else {
                    toast.error('No resume analysis available.')
                  }
                }}
                className="mt-6 flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
              >
                View Resume
                <ArrowRight size={18} />
              </button>
            </div>

            {/* QUICK ACTION */}

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="text-xl font-bold text-white">Ready to improve?</h2>

              <p className="mt-3 text-slate-400">
                Analyze your resume and start a new AI interview.
              </p>

              <button
                onClick={() => navigate('/resume')}
                className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Analyze Resume
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

/* STAT CARD */

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-400">{title}</p>

        <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">{icon}</div>
      </div>

      <h2 className="mt-5 text-4xl font-bold text-white">{value}</h2>
    </div>
  )
}

/* CUSTOM CHART TOOLTIP */

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  const data = payload[0].payload

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 shadow-xl">
      <p className="font-semibold text-white">{data.interview}</p>

      <p className="mt-1 text-sm text-slate-400">{data.date}</p>

      <p className="mt-2 font-semibold text-indigo-400">Score: {data.score}%</p>
    </div>
  )
}

/* RECENT INTERVIEW */

const RecentInterviewCard = ({ interview, navigate }) => {
  const date = new Date(interview.createdAt).toLocaleDateString()

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold text-white">AI Interview</h3>

        <p className="mt-1 text-sm text-slate-400">Completed on {date}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="text-sm text-slate-400">Score</p>

          <p className="text-xl font-bold text-indigo-400">
            {Math.round(interview.overallScore || 0)}%
          </p>
        </div>

        <button
          onClick={() => navigate(`/report/${interview._id}`)}
          className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20"
        >
          View Report
        </button>
      </div>
    </div>
  )
}

/* EMPTY INTERVIEWS */

const EmptyInterviews = ({ navigate }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
      <Mic size={40} className="mx-auto text-slate-600" />

      <h3 className="mt-4 text-lg font-semibold text-white">No interviews yet</h3>

      <p className="mt-2 text-slate-400">
        Complete your first AI interview to see your performance here.
      </p>

      <button
        onClick={() => navigate('/resume')}
        className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Start Interview
      </button>
    </div>
  )
}

export default Dashboard
