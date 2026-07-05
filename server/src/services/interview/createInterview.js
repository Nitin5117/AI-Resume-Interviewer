const resumeRepository = require("../../repositories/resumeRepository");
const interviewRepository = require("../../repositories/interviewRepository");
const generateInterviewQuestions = require("../ai/interviewAI");

const createInterview = async (userId, resumeId) => {
  const resume = await resumeRepository.getResumeById(resumeId);

  if (!resume) {
    throw new Error("Resume not found.");
  }

  if (!resume.extractedText) {
    throw new Error("Resume has not been analyzed yet.");
  }

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
