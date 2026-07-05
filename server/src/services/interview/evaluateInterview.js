const interviewRepository = require("../../repositories/interviewRepository");
const evaluateAnswer = require("../ai/evaluationAI");

const evaluateInterview = async (interviewId) => {
  const interview = await interviewRepository.getInterviewById(interviewId);

  if (!interview) {
    throw new Error("Interview not found.");
  }

  let totalScore = 0;

  for (const question of interview.questions) {
    const result = await evaluateAnswer(question.question, question.answer);

    question.score = result.score;
    question.feedback = result.feedback;

    totalScore += result.score;
  }

  interview.overallScore = totalScore / interview.questions.length;

  interview.status = "completed";

  await interview.save();

  return interview;
};

module.exports = evaluateInterview;
