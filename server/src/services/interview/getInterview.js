const interviewRepository = require("../../repositories/interviewRepository");
const AppError = require("../../errors/AppError");

const getInterview = async (userId, interviewId) => {
  const interview = await interviewRepository.getOwnedInterview(
    userId,
    interviewId,
  );

  if (!interview) {
    throw new AppError("Interview not found.", 404);
  }

  return interview;
};

module.exports = getInterview;