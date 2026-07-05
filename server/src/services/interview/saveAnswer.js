const AppError = require("../../errors/AppError");
const interviewRepository = require("../../repositories/interviewRepository");

const saveAnswer = async (interviewId, questionIndex, answer) => {
  const interview = await interviewRepository.getInterviewById(interviewId);

  if (!interview) {
    throw new AppError("Interview not found.", 404);
  }

  if (!interview.questions[questionIndex]) {
    throw new AppError("Invalid question.", 400);
  }

  interview.questions[questionIndex].answer = answer;

  await interview.save();

  return interview;
};

module.exports = saveAnswer;
