const interviewRepository = require(
  "../../repositories/interviewRepository",
);

const AppError = require(
  "../../errors/AppError",
);

const evaluateInterviewAI = require(
  "../ai/evaluationAI",
);

const evaluateInterview = async (
  userId,
  interviewId,
) => {
  const existingInterview =
    await interviewRepository.getOwnedInterview(
      userId,
      interviewId,
    );

  if (!existingInterview) {
    throw new AppError(
      "Interview not found.",
      404,
    );
  }

  if (
    existingInterview.status === "completed"
  ) {
    return existingInterview;
  }

  if (
    existingInterview.status === "evaluating"
  ) {
    throw new AppError(
      "Interview evaluation is already in progress.",
      409,
    );
  }

  const unanswered =
    existingInterview.questions.find(
      (question) =>
        !question.answer ||
        !question.answer.trim(),
    );

  if (unanswered) {
    throw new AppError(
      "Please answer all questions first.",
      400,
    );
  }

  const interview =
    await interviewRepository.startEvaluation(
      userId,
      interviewId,
    );

  if (!interview) {
    throw new AppError(
      "Interview evaluation is already in progress or completed.",
      409,
    );
  }

  try {
    const report =
      await evaluateInterviewAI(
        interview.questions,
      );

    interview.overallScore =
      report.overallScore;

    interview.report = {
      summary: report.summary,
      communication: report.communication,
      technicalKnowledge:
        report.technicalKnowledge,
      problemSolving:
        report.problemSolving,
      confidence: report.confidence,
      strengths: report.strengths,
      weaknesses: report.weaknesses,
      recommendations:
        report.recommendations,
      hiringDecision:
        report.hiringDecision,
    };

    if (report.questions) {
      report.questions.forEach(
        (item, index) => {
          if (interview.questions[index]) {
            interview.questions[index].score =
              item.score;

            interview.questions[
              index
            ].feedback = item.feedback;
          }
        },
      );
    }

    interview.status = "completed";

    await interviewRepository.saveInterview(
      interview,
    );

    return interview;
  } catch (error) {
    interview.status = "failed";

    await interviewRepository.saveInterview(
      interview,
    );

    throw error;
  }
};

module.exports = evaluateInterview;