import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import DashboardLayout from '../components/layout/DashboardLayout'
import ResumeHeader from '../components/resume/ResumeHeader'
import ResumeUploader from '../components/resume/ResumeUploader'
import ResumeScoreCard from '../components/resume/ResumeScoreCard'
import ResumeKeywords from '../components/resume/ResumeKeywords'
import ResumeTips from '../components/resume/ResumeTips'

import { getResume } from '../services/resumeService'

const Resume = () => {
  const { resumeId } = useParams()

  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(Boolean(resumeId))

  useEffect(() => {
    if (!resumeId) {
      setLoading(false)
      return
    }

    const fetchResume = async () => {
      try {
        const response = await getResume(resumeId)

        // Store the complete resume document
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
        <div className="min-h-[70vh] flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-slate-300">Loading Resume Analysis...</h1>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <ResumeHeader />

      {!resumeId && (
        <div className="mt-8">
          <ResumeUploader setAnalysis={setAnalysis} />
        </div>
      )}

      {analysis && (
        <>
          <div className="mt-10">
            <ResumeScoreCard analysis={analysis} />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <ResumeKeywords analysis={analysis} />
            <ResumeTips analysis={analysis} />
          </div>
        </>
      )}

      {resumeId && !analysis && (
        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Resume Analysis Unavailable</h2>

          <p className="mt-3 text-slate-400">No completed analysis is available for this resume.</p>
        </div>
      )}
    </DashboardLayout>
  )
}

export default Resume
