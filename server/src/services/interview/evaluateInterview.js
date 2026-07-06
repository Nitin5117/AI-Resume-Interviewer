const interviewRepository = require("../../repositories/interviewRepository");
const AppError = require("../../errors/AppError");
const evaluateInterviewAI = require("../ai/evaluationAI");

const evaluateInterview = async (interviewId) => {
  const interview = await interviewRepository.getInterviewById(interviewId);

  if (!interview) {
    throw new AppError("Interview not found.", 404);
  }

  const unanswered = interview.questions.find(
    (q) => !q.answer || !q.answer.trim(),
  );

  if (unanswered) {
    throw new AppError("Please answer all questions first.", 400);
  }

  const report = await evaluateInterviewAI(interview.questions);

  interview.overallScore = report.overallScore;

  interview.report = {
    summary: report.summary,
    communication: report.communication,
    technicalKnowledge: report.technicalKnowledge,
    problemSolving: report.problemSolving,
    confidence: report.confidence,
    strengths: report.strengths,
    weaknesses: report.weaknesses,
    recommendations: report.recommendations,
    hiringDecision: report.hiringDecision,
  };

  // ⭐ Save per-question evaluation

  if (report.questions) {
    report.questions.forEach((item, index) => {
      if (interview.questions[index]) {
        interview.questions[index].score = item.score;

        interview.questions[index].feedback = item.feedback;
      }
    });
  }

  interview.status = "completed";

  await interview.save();

  return interview;
};

module.exports = evaluateInterview;
