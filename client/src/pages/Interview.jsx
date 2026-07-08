import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import toast from 'react-hot-toast'

import DashboardLayout from '../components/layout/DashboardLayout'
import InterviewHeader from '../components/interview/InterviewHeader'
import InterviewProgress from '../components/interview/InterviewProgress'
import QuestionCard from '../components/interview/QuestionCard'
import AnswerBox from '../components/interview/AnswerBox'
import FinishInterview from '../components/interview/FinishInterview'

import { getInterview, submitAnswer } from '../services/interviewService'
import QuestionNavigator from '../components/interview/QuestionNavigator'

const Interview = () => {
  const { interviewId } = useParams()

  const navigate = useNavigate()
  const [startedAt, setStartedAt] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [interview, setInterview] = useState(null)

  const [loading, setLoading] = useState(true)

  const [savingAnswer, setSavingAnswer] = useState(false)

  const [currentQuestion, setCurrentQuestion] = useState(0)

  const [answer, setAnswer] = useState('')

  const [finished, setFinished] = useState(false)
  const handleQuestionChange = index => {
    setCurrentQuestion(index)

    setAnswer(interview.questions[index].answer || '')
  }

  useEffect(() => {
    if (!startedAt) return

    const updateTimer = () => {
      const seconds = Math.floor((Date.now() - startedAt.getTime()) / 1000)

      setElapsedTime(seconds)
    }

    updateTimer()

    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [startedAt])
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await getInterview(interviewId)

        const interviewData = response.data

        setInterview(interviewData)

        if (interviewData.startedAt) {
          setStartedAt(new Date(interviewData.startedAt))
        }

        if (interviewData.status === 'completed') {
          navigate(`/report/${interviewId}`, {
            replace: true,
          })

          return
        }

        if (interviewData.status === 'evaluating') {
          toast('Interview evaluation is already in progress.')

          return
        }

        const firstUnansweredIndex = interviewData.questions.findIndex(
          question => !question.answer?.trim()
        )

        if (firstUnansweredIndex === -1) {
          setFinished(true)
        } else {
          setCurrentQuestion(firstUnansweredIndex)

          setAnswer(interviewData.questions[firstUnansweredIndex].answer || '')
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load interview.')
      } finally {
        setLoading(false)
      }
    }

    fetchInterview()
  }, [interviewId, navigate])

  const handleNext = async () => {
    if (savingAnswer) {
      return
    }

    if (!answer.trim()) {
      toast.error('Please answer the question first.')

      return
    }

    try {
      setSavingAnswer(true)

      const response = await submitAnswer(interviewId, currentQuestion, answer)

      const updatedInterview = response.data

      setInterview(updatedInterview)

      setAnswer('')

      if (currentQuestion === updatedInterview.questions.length - 1) {
        setFinished(true)

        return
      }

      const nextQuestion = currentQuestion + 1

      setCurrentQuestion(nextQuestion)

      setAnswer(updatedInterview.questions[nextQuestion]?.answer || '')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save answer.')
    } finally {
      setSavingAnswer(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-center mt-20 text-2xl">Loading Interview...</h1>
      </DashboardLayout>
    )
  }

  if (!interview) {
    return (
      <DashboardLayout>
        <h1 className="text-center mt-20 text-red-500">Interview not found.</h1>
      </DashboardLayout>
    )
  }

  if (finished) {
    return (
      <DashboardLayout>
        <FinishInterview answers={interview.questions} interviewId={interviewId} />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <InterviewHeader />

        <div className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-3">
          <p className="text-sm text-slate-400">Elapsed Time</p>

          <h2 className="text-xl font-bold text-indigo-400">
            {Math.floor(elapsedTime / 60)}:{String(elapsedTime % 60).padStart(2, '0')}
          </h2>
        </div>
      </div>
      <InterviewProgress current={currentQuestion + 1} total={interview.questions.length} />

      <QuestionCard question={interview.questions[currentQuestion].question} />
      <QuestionNavigator
        questions={interview.questions}
        currentQuestion={currentQuestion}
        onQuestionChange={handleQuestionChange}
      />

      <AnswerBox answer={answer} setAnswer={setAnswer} />

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => handleQuestionChange(currentQuestion - 1)}
          disabled={currentQuestion === 0}
          className="
      px-6
      py-3
      rounded-xl
      bg-slate-800
      disabled:opacity-40
    "
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={savingAnswer}
          className="
      px-8
      py-3
      rounded-xl
      bg-indigo-600
      hover:bg-indigo-700
    "
        >
          {currentQuestion === interview.questions.length - 1 ? 'Finish Interview' : 'Next'}
        </button>
      </div>
    </DashboardLayout>
  )
}

export default Interview
