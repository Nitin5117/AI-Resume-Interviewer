const resumeRepository = require("../../repositories/resumeRepository");
const interviewRepository = require("../../repositories/interviewRepository");

const getDashboard = async (userId) => {
  const resumes = await resumeRepository.getUserResumes(userId);
  const interviews = await interviewRepository.getUserInterviews(userId);

  const completedInterviews = interviews.filter(
    (interview) => interview.status === "completed",
  );

  const averageScore =
    completedInterviews.length === 0
      ? 0
      : Math.round(
          completedInterviews.reduce(
            (sum, interview) => sum + (interview.overallScore || 0),
            0,
          ) / completedInterviews.length,
        );

  const bestScore =
    completedInterviews.length === 0
      ? 0
      : Math.max(
          ...completedInterviews.map(
            (interview) => interview.overallScore || 0,
          ),
        );

  const latestResume =
    resumes.length > 0 ? resumes[0]?.analysis?.resumeScore || 0 : 0;

  return {
    totalResumes: resumes.length,

    totalInterviews: interviews.length,

    completedInterviews: completedInterviews.length,

    averageScore,

    bestScore,

    latestResume,

    // Only for Recent Interviews UI
    recentInterviews: completedInterviews.slice(0, 5),

    // For Performance Trend Chart
    performanceHistory: completedInterviews.map((interview) => ({
      _id: interview._id,
      overallScore: interview.overallScore,
      createdAt: interview.createdAt,
    })),
  };
};

module.exports = getDashboard;
