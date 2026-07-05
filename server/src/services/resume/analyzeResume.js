const { extractText } = require("../../utils/pdfParser");
const analyzeResumeAI = require("../ai/resumeAI");

const analyzeResume = async (filePath) => {
  const resumeText = await extractText(filePath);

  if (!resumeText || resumeText.trim() === "") {
    throw new Error("Unable to extract text from resume.");
  }

  const analysis = await analyzeResumeAI(resumeText);

  return {
    extractedText: resumeText,
    ...analysis,
  };
};

module.exports = analyzeResume;
