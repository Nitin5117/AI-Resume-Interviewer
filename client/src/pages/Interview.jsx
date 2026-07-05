import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import InterviewHeader from "../components/interview/InterviewHeader";
import InterviewProgress from "../components/interview/InterviewProgress";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import FinishInterview from "../components/interview/FinishInterview";

const questions = [
  "Tell me about yourself.",
  "Explain React Hooks.",
  "Difference between SQL and MongoDB.",
  "What is REST API?",
  "Describe a challenging project.",
];

const Interview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleNext = () => {
    if (answer.trim() === "") {
      alert("Please answer the question first.");
      return;
    }

    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    setAnswer("");

    if (currentQuestion === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  if (finished) {
    return (
      <DashboardLayout>
        <FinishInterview answers={answers} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <InterviewHeader />

      <InterviewProgress
        current={currentQuestion + 1}
        total={questions.length}
      />

      <QuestionCard question={questions[currentQuestion]} />

      <AnswerBox answer={answer} setAnswer={setAnswer} />

      <button
        onClick={handleNext}
        className="mt-8 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700"
      >
        {currentQuestion === questions.length - 1
          ? "Finish Interview"
          : "Next Question"}
      </button>
    </DashboardLayout>
  );
};

export default Interview;
