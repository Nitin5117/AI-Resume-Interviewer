const interviewRepository = require("../../repositories/interviewRepository");
const AppError = require("../../errors/AppError");

const getInterview = async (interviewId) => {
  const interview = await interviewRepository.getInterviewById(interviewId);

  if (!interview) {
    throw new AppError("Interview not found.", 404);
  }

  return interview;
};

module.exports = getInterview;
