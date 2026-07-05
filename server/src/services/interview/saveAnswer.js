const interviewRepository = require("../../repositories/interviewRepository");

const saveAnswer = async (interviewId, questionIndex, answer) => {
  const interview = await interviewRepository.getInterviewById(interviewId);

  if (!interview) {
    throw new Error("Interview not found.");
  }

  interview.questions[questionIndex].answer = answer;

  await interview.save();

  return interview;
};

module.exports = saveAnswer;
