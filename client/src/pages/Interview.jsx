import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import InterviewHeader from "../components/interview/InterviewHeader";
import InterviewProgress from "../components/interview/InterviewProgress";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import FinishInterview from "../components/interview/FinishInterview";

import { getInterview, submitAnswer } from "../services/interviewService";

const Interview = () => {
  const { interviewId } = useParams();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await getInterview(interviewId);

        console.log(response);

        setInterview(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  const handleNext = async () => {
    if (!answer.trim()) {
      alert("Please answer the question first.");
      return;
    }

    try {
      // Save answer to MongoDB
      await submitAnswer(interviewId, currentQuestion, answer);

      // Keep local copy for Finish page
      setAnswers((prev) => [...prev, answer]);

      setAnswer("");

      if (currentQuestion === interview.questions.length - 1) {
        setFinished(true);
        return;
      }

      setCurrentQuestion((prev) => prev + 1);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to save answer.");
    }
  };
  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-center mt-20 text-2xl">Loading Interview...</h1>
      </DashboardLayout>
    );
  }

  if (!interview) {
    return (
      <DashboardLayout>
        <h1 className="text-center mt-20 text-red-500">Interview not found.</h1>
      </DashboardLayout>
    );
  }

  if (finished) {
    return (
      <DashboardLayout>
        <FinishInterview answers={answers} interviewId={interviewId} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <InterviewHeader />

      <InterviewProgress
        current={currentQuestion + 1}
        total={interview.questions.length}
      />

      <QuestionCard question={interview.questions[currentQuestion].question} />

      <AnswerBox answer={answer} setAnswer={setAnswer} />

      <button
        onClick={handleNext}
        className="mt-8 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700"
      >
        {currentQuestion === interview.questions.length - 1
          ? "Finish Interview"
          : "Next Question"}
      </button>
    </DashboardLayout>
  );
};

export default Interview;
