const AppError = require("../../errors/AppError");
const resumeRepository = require("../../repositories/resumeRepository");
const interviewRepository = require("../../repositories/interviewRepository");
const generateInterviewQuestions = require("../ai/interviewAI");

const createInterview = async (
  userId,
  resumeId,
) => {
  const resume =
    await resumeRepository.getResumeById(
      resumeId,
    );

  if (!resume) {
    throw new AppError(
      "Resume not found.",
      404,
    );
  }

  if (
    resume.user.toString() !==
    userId.toString()
  ) {
    throw new AppError(
      "You are not authorized to use this resume.",
      403,
    );
  }

  if (resume.status !== "completed") {
    throw new AppError(
      "Resume has not been analyzed yet.",
      400,
    );
  }

  if (
    !resume.analysis ||
    resume.analysis.resumeScore === undefined ||
    resume.analysis.resumeScore === null
  ) {
    throw new AppError(
      "Resume analysis data is missing.",
      400,
    );
  }

  const activeInterview =
    await interviewRepository.findActiveInterviewByResume(
      userId,
      resumeId,
    );

  if (activeInterview) {
    return activeInterview;
  }

  const aiResponse =
    await generateInterviewQuestions(
      resume.extractedText,
    );

  if (
    !aiResponse ||
    !Array.isArray(aiResponse.questions) ||
    aiResponse.questions.length === 0
  ) {
    throw new AppError(
      "AI failed to generate interview questions. Please try again.",
      502,
    );
  }

  const validQuestions =
    aiResponse.questions.filter(
      (item) =>
        item &&
        typeof item.question === "string" &&
        item.question.trim(),
    );

  if (validQuestions.length === 0) {
    throw new AppError(
      "AI returned invalid interview questions. Please try again.",
      502,
    );
  }

  const interview =
    await interviewRepository.createInterview({
      user: userId,
      resume: resumeId,
      questions: validQuestions,
      status: "pending",
    });

  return interview;
};

module.exports = createInterview;