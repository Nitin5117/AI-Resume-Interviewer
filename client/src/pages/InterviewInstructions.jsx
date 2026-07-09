import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Clock, FileText, Brain, ShieldCheck, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

import DashboardLayout from '../components/layout/DashboardLayout'
import { getInterview, startInterview } from '../services/interviewService'

const InterviewInstructions = () => {
  const { interviewId } = useParams()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [interview, setInterview] = useState(null)

  const handleStart = async () => {
    try {
      const response = await startInterview(interviewId)

      navigate(`/interview/${interviewId}`)
    } catch (error) {
      console.error('Start Interview Error:', error)
      console.error(error.response)

      toast.error(error.response?.data?.message || 'Failed to start interview.')
    }
  }
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await getInterview(interviewId)

        setInterview(response.data)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load interview.')
      } finally {
        setLoading(false)
      }
    }

    fetchInterview()
  }, [interviewId])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <h1 className="text-2xl font-semibold">Preparing Interview...</h1>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-10">
          <h1 className="text-4xl font-bold">AI Mock Interview</h1>

          <p className="mt-4 text-slate-400">
            Read the instructions carefully before starting your interview.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="space-y-6">
              <Instruction
                icon={<Brain size={22} />}
                title="AI Generated Questions"
                description="Questions are generated from your uploaded resume."
              />

              <Instruction
                icon={<Clock size={22} />}
                title="Estimated Time"
                description="20 - 25 Minutes"
              />

              <Instruction
                icon={<FileText size={22} />}
                title="Questions"
                description={`${interview.questions.length} Questions`}
              />

              <Instruction
                icon={<ShieldCheck size={22} />}
                title="Automatic Saving"
                description="Every answer is stored securely."
              />
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-8">
              <h2 className="text-2xl font-semibold">Interview Rules</h2>

              <ul className="space-y-4 mt-6 text-slate-300">
                <li>✔ Read every question carefully.</li>

                <li>✔ Answer honestly.</li>

                <li>✔ Don't refresh the page.</li>

                <li>✔ Complete all questions.</li>

                <li>✔ Timer starts after clicking Start.</li>

                <li>✔ AI evaluates every answer.</li>
              </ul>

              <button
                onClick={handleStart}
                className="mt-10 w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white flex items-center justify-center gap-3 hover:bg-indigo-700 transition"
              >
                Start Interview
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const Instruction = ({ icon, title, description }) => {
  return (
    <div className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <div className="text-indigo-400">{icon}</div>

      <div>
        <h3 className="font-semibold text-lg">{title}</h3>

        <p className="mt-1 text-slate-400">{description}</p>
      </div>
    </div>
  )
}

export default InterviewInstructions
