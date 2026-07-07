import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, PlayCircle, Trash2, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

import Button from '../ui/Button'

import { createInterview } from '../../services/interviewService'

import { deleteResume } from '../../services/resumeService'

const ResumeCard = ({ resume, refreshResumes }) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const startInterview = async () => {
    try {
      setLoading(true)

      const response = await createInterview(resume._id)

      navigate(`/interview/${response.data._id}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to start interview.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this resume?')) return

    try {
      setDeleting(true)

      const response = await deleteResume(resume._id)

      toast.success(response.message)

      refreshResumes()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <FileText className="text-indigo-500" size={38} />

          <div>
            <h2 className="text-xl font-semibold">{resume.originalName}</h2>

            <p className="text-slate-400">Resume Score: {resume.analysis.resumeScore}%</p>

            <p className="text-slate-400">ATS Score: {resume.analysis.atsScore}%</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => navigate(`/resume/${resume._id}`)}>
            <Eye size={18} />
            View
          </Button>

          <Button onClick={startInterview} disabled={loading}>
            <PlayCircle size={18} />
            Start
          </Button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-xl bg-red-600 px-5 text-white hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeCard
