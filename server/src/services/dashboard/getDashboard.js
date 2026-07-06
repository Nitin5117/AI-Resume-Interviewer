const resumeRepository = require("../../repositories/resumeRepository");
const interviewRepository = require("../../repositories/interviewRepository");

const getDashboard = async (userId) => {
  const resumes = await resumeRepository.getUserResumes(userId);

  const interviews = await interviewRepository.getUserInterviews(userId);

  const completed = interviews.filter((i) => i.status === "completed");

  const averageScore =
    completed.length === 0
      ? 0
      : Math.round(
          completed.reduce((sum, item) => sum + item.overallScore, 0) /
            completed.length,
        );

  const bestScore =
    completed.length === 0
      ? 0
      : Math.max(...completed.map((i) => i.overallScore));

  return {
    totalResumes: resumes.length,

    totalInterviews: interviews.length,

    averageScore,

    bestScore,

    latestResume: resumes.length > 0 ? resumes[0].analysis.resumeScore : 0,

    recentInterviews: completed.slice(0, 5),
  };
};

module.exports = getDashboard;
