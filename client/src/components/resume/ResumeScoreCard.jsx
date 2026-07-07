import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayCircle, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

import Button from '../ui/Button'
import { createInterview } from '../../services/interviewService'

const ResumeScoreCard = ({ analysis }) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const handleStartInterview = async () => {
    try {
      setLoading(true)

      const response = await createInterview(analysis._id)

      console.log('Interview Response:', response)

      toast.success('Interview created successfully!')

      if (!response.data?._id) {
        toast.error('Interview ID not found.')
        return
      }

      navigate(`/interview/${response.data._id}`)
    } catch (error) {
      console.error(error)

      toast.error(error.response?.data?.message || 'Failed to start interview.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-xl">
      <div className="grid gap-8 xl:grid-cols-[1.35fr_0.65fr] xl:items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-200">
            ATS + Resume Score
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Resume performance</h2>
            <p className="mt-3 text-slate-400 max-w-2xl">
              This score reflects how well your resume is optimized for hiring teams and applicant
              tracking systems.
            </p>
          </div>
        </div>

        <div className="rounded-[1.75rem] bg-slate-900/80 p-6 text-center shadow-inner border border-slate-800">
          <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Final Resume Score</p>
          <p className="mt-4 text-6xl font-bold text-indigo-500">
            {analysis.analysis.resumeScore}%
          </p>
          <p className="mt-2 text-slate-400">ATS Score: {analysis.analysis.atsScore}%</p>

          <Button
            onClick={handleStartInterview}
            disabled={loading}
            className="mt-7 w-full flex items-center justify-center gap-3"
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
  )
}

export default ResumeScoreCard
