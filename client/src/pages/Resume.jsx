import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import DashboardLayout from '../components/layout/DashboardLayout'
import ResumeHeader from '../components/resume/ResumeHeader'
import ResumeUploader from '../components/resume/ResumeUploader'
import ResumeScoreCard from '../components/resume/ResumeScoreCard'
import ResumeKeywords from '../components/resume/ResumeKeywords'
import ResumeTips from '../components/resume/ResumeTips'
import ResumeLibrary from '../components/resume/ResumeLibrary'

import { getResume } from '../services/resumeService'

const Resume = () => {
  const { resumeId } = useParams()

  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(Boolean(resumeId))
  const [refreshLibrary, setRefreshLibrary] = useState(0)

  useEffect(() => {
    if (!resumeId) {
      setLoading(false)
      return
    }

    const fetchResume = async () => {
      try {
        const response = await getResume(resumeId)
        setAnalysis(response.data)
      } catch (error) {
        console.error(error)
        toast.error(error.response?.data?.message || 'Failed to load resume.')
      } finally {
        setLoading(false)
      }
    }

    fetchResume()
  }, [resumeId])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-indigo-500" />
          <h1 className="text-lg font-medium text-slate-400">Loading resume analysis…</h1>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.9)] backdrop-blur-sm">
          <ResumeHeader />
        </div>

        {/* Upload + Library (only when viewing the general resume page) */}
        {!resumeId && (
          <div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr] xl:items-start">
            <ResumeUploader
              setAnalysis={setAnalysis}
              onUploadSuccess={() => setRefreshLibrary(prev => prev + 1)}
            />

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-white">Resume Library</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Browse recent resumes and view detailed analysis from your uploaded files.
                </p>
              </div>

              <ResumeLibrary refreshKey={refreshLibrary} />
            </div>
          </div>
        )}

        {/* Analysis results */}
        {analysis && (
          <div className="space-y-8">
            <ResumeScoreCard analysis={analysis} />

            <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
              <ResumeKeywords analysis={analysis} />
              <ResumeTips analysis={analysis} />
            </div>
          </div>
        )}

        {/* Empty state when a specific resume has no analysis yet */}
        {resumeId && !analysis && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80">
              <svg
                className="h-7 w-7 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5M19.8 15.3l1.402 2.402c1.232 2.111-.263 4.769-2.703 4.769H5.7c-2.44 0-3.935-2.658-2.702-4.769L5 14.5"
                />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-white">Resume Analysis Unavailable</h2>

            <p className="max-w-sm text-sm text-slate-400">
              No completed analysis is available for this resume yet. Try re-uploading or check back
              once processing finishes.
            </p>

            <Link
              to="/resume"
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Upload a new resume
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Resume
