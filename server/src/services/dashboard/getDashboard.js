const resumeRepository = require("../../repositories/resumeRepository");
const interviewRepository = require("../../repositories/interviewRepository");

const getDashboard = async (userId) => {
  const resumes = await resumeRepository.getUserResumes(userId);

  const interviews = await interviewRepository.getUserInterviews(userId);

  const completedInterviews = interviews.filter(
    (item) => item.status === "completed",
  );

  const averageScore =
    completedInterviews.length === 0
      ? 0
      : Math.round(
          completedInterviews.reduce(
            (sum, interview) => sum + interview.overallScore,
            0,
          ) / completedInterviews.length,
        );

  const bestScore =
    completedInterviews.length === 0
      ? 0
      : Math.max(...completedInterviews.map((i) => i.overallScore));

  return {
    totalResumes: resumes.length,

    totalInterviews: interviews.length,

    averageScore,

    bestScore,

    latestResume: resumes.length > 0 ? resumes[0].analysis.resumeScore : 0,

    recentInterviews: completedInterviews.slice(0, 5),
  };
};

module.exports = getDashboard;
