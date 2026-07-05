const model = require("./geminiClient");

const analyzeResumeAI = async (resumeText) => {
  const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

{
  "resumeScore":90,
  "atsScore":85,
  "summary":"...",
  "strengths":["..."],
  "detectedSkills":["..."],
  "missingSkills":["..."],
  "suggestions":["..."]
}

Resume:

${resumeText}
`;

  const result = await model.generateContent(prompt);

  let response = result.response.text();

  response = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(response);
};

module.exports = analyzeResumeAI;
