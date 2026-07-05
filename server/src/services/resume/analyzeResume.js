const { extractText } = require("../../utils/pdfParser");
const analyzeResumeAI = require("../ai/resumeAI");

const analyzeResume = async (filePath) => {
  const resumeText = await extractText(filePath);

  if (!resumeText || resumeText.trim() === "") {
    throw new Error("Unable to extract text from the uploaded PDF.");
  }

  const analysis = await analyzeResumeAI(resumeText);

  if (!analysis.isResume) {
    throw new Error(
      analysis.message || "The uploaded file is not a valid resume.",
    );
  }

  return analysis;
};

module.exports = analyzeResume;
