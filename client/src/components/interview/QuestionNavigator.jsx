import React from 'react'

const QuestionNavigator = ({ questions, currentQuestion, onQuestionChange }) => {
  return (
    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Question Navigator</h2>

        <p className="text-sm text-slate-400">
          {currentQuestion + 1} / {questions.length}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {questions.map((question, index) => {
          const answered = question.answer?.trim().length > 0

          const active = index === currentQuestion

          return (
            <button
              key={index}
              onClick={() => onQuestionChange(index)}
              className={`
                w-12
                h-12
                rounded-xl
                font-semibold
                transition-all
                duration-200
                border

                ${
                  active
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : answered
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500'
                }
              `}
            >
              {index + 1}
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-indigo-600" />
          <span className="text-slate-300">Current</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-600" />
          <span className="text-slate-300">Answered</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-700" />
          <span className="text-slate-300">Unanswered</span>
        </div>
      </div>
    </div>
  )
}

export default QuestionNavigator
