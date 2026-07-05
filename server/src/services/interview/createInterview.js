const AppError = require("../../errors/AppError");
const resumeRepository = require("../../repositories/resumeRepository");
const interviewRepository = require("../../repositories/interviewRepository");
const generateInterviewQuestions = require("../ai/interviewAI");

const createInterview = async (userId, resumeId) => {
  const resume = await resumeRepository.getResumeById(resumeId);

  if (!resume) {
    throw new AppError("Resume not found.", 404);
  }

  // Resume must be analyzed successfully
  if (resume.status !== "completed") {
    throw new AppError("Resume has not been analyzed yet.", 400);
  }

  // Extra safety check
  if (!resume.analysis || !resume.analysis.resumeScore) {
    throw new AppError("Resume analysis data is missing.", 400);
  }

  // Use extracted text if available, otherwise regenerate from analysis source later
  const aiResponse = await generateInterviewQuestions(resume.extractedText);

  const interview = await interviewRepository.createInterview({
    user: userId,
    resume: resumeId,
    questions: aiResponse.questions,
    status: "pending",
  });

  return interview;
};

module.exports = createInterview;
