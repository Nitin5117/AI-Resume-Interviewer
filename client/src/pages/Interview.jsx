import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import InterviewHeader from "../components/interview/InterviewHeader";
import InterviewProgress from "../components/interview/InterviewProgress";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import FinishInterview from "../components/interview/FinishInterview";

import {
  getInterview,
  submitAnswer,
} from "../services/interviewService";

const Interview = () => {
  const { interviewId } = useParams();

  const navigate = useNavigate();

  const [interview, setInterview] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [savingAnswer, setSavingAnswer] =
    useState(false);

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [answer, setAnswer] =
    useState("");

  const [finished, setFinished] =
    useState(false);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response =
          await getInterview(interviewId);

        const interviewData = response.data;

        setInterview(interviewData);

        if (
          interviewData.status === "completed"
        ) {
          navigate(
            `/report/${interviewId}`,
            {
              replace: true,
            },
          );

          return;
        }

        if (
          interviewData.status === "evaluating"
        ) {
          toast(
            "Interview evaluation is already in progress.",
          );

          return;
        }

        const firstUnansweredIndex =
          interviewData.questions.findIndex(
            (question) =>
              !question.answer?.trim(),
          );

        if (firstUnansweredIndex === -1) {
          setFinished(true);
        } else {
          setCurrentQuestion(
            firstUnansweredIndex,
          );

          setAnswer(
            interviewData.questions[
              firstUnansweredIndex
            ].answer || "",
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load interview.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  const handleNext = async () => {
    if (savingAnswer) {
      return;
    }

    if (!answer.trim()) {
      toast.error(
        "Please answer the question first.",
      );

      return;
    }

    try {
      setSavingAnswer(true);

      const response = await submitAnswer(
        interviewId,
        currentQuestion,
        answer,
      );

      const updatedInterview =
        response.data;

      setInterview(updatedInterview);

      setAnswer("");

      if (
        currentQuestion ===
        updatedInterview.questions.length - 1
      ) {
        setFinished(true);

        return;
      }

      const nextQuestion =
        currentQuestion + 1;

      setCurrentQuestion(nextQuestion);

      setAnswer(
        updatedInterview.questions[
          nextQuestion
        ]?.answer || "",
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to save answer.",
      );
    } finally {
      setSavingAnswer(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-center mt-20 text-2xl">
          Loading Interview...
        </h1>
      </DashboardLayout>
    );
  }

  if (!interview) {
    return (
      <DashboardLayout>
        <h1 className="text-center mt-20 text-red-500">
          Interview not found.
        </h1>
      </DashboardLayout>
    );
  }

  if (finished) {
    return (
      <DashboardLayout>
        <FinishInterview
          answers={interview.questions}
          interviewId={interviewId}
        />
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

      <QuestionCard
        question={
          interview.questions[
            currentQuestion
          ].question
        }
      />

      <AnswerBox
        answer={answer}
        setAnswer={setAnswer}
      />

      <button
        onClick={handleNext}
        disabled={savingAnswer}
        className="
          mt-8
          px-8
          py-3
          rounded-xl
          bg-indigo-600
          hover:bg-indigo-700
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {savingAnswer
          ? "Saving..."
          : currentQuestion ===
              interview.questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
      </button>
    </DashboardLayout>
  );
};

export default Interview;