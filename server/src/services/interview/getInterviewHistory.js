const interviewRepository = require("../../repositories/interviewRepository");

const getInterviewHistory = async (userId) => {
  const interviews = await interviewRepository.getUserInterviews(userId);

  return interviews.map((interview) => ({
    _id: interview._id,

    status: interview.status,

    overallScore: interview.overallScore || 0,

    hiringDecision: interview.report?.hiringDecision || "Not Available",

    summary: interview.report?.summary || "No report generated yet.",

    createdAt: interview.createdAt,
  }));
};

module.exports = getInterviewHistory;
