const userRepository = require("../../repositories/userRepository");
const interviewRepository = require("../../repositories/interviewRepository");
const resumeRepository = require("../../repositories/resumeRepository");
const AppError = require("../../errors/AppError");

const getProfile = async (userId) => {
  const user = await userRepository.getUserProfileById(userId);

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const interviews = await interviewRepository.getUserInterviews(userId);

  const resumes = await resumeRepository.getUserResumes(userId);

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

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },

    stats: {
      totalResumes: resumes.length,
      totalInterviews: interviews.length,
      completedInterviews: completedInterviews.length,
      averageScore,
      bestScore,
    },
  };
};

module.exports = getProfile;
