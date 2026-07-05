const interviewRepository = require("../../repositories/interviewRepository");

const getInterview = async (interviewId) => {
  const interview = await interviewRepository.getInterviewById(interviewId);

  if (!interview) {
    throw new Error("Interview not found.");
  }

  return interview;
};

module.exports = getInterview;
