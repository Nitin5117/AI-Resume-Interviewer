const { extractText } = require("../../utils/pdfParser");
const analyzeResumeAI = require("../ai/resumeAI");
const AppError = require("../../errors/AppError");

const analyzeResume = async (filePath) => {
  try {
    // Extract text from PDF
    const resumeText = await extractText(filePath);

    if (!resumeText || resumeText.trim() === "") {
      throw new AppError("Unable to extract text from the uploaded PDF.", 400);
    }

    // Analyze with Gemini
    const analysis = await analyzeResumeAI(resumeText);

    // Validate resume
    if (!analysis.isResume) {
      throw new AppError(
        analysis.message || "The uploaded PDF is not a valid resume.",
        400,
      );
    }

    return analysis;
  } catch (error) {
    // Gemini quota exceeded
    if (
      error.message.includes("429") ||
      error.message.includes("Too Many Requests") ||
      error.message.includes("quota")
    ) {
      throw new AppError(
        "AI service is temporarily unavailable. Please try again in a few minutes.",
        503,
      );
    }

    // Gemini server error
    if (
      error.message.includes("GoogleGenerativeAI") ||
      error.message.includes("generateContent")
    ) {
      throw new AppError(
        "Unable to connect to the AI service. Please try again later.",
        503,
      );
    }

    throw error;
  }
};

module.exports = analyzeResume;
