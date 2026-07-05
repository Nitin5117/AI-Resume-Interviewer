const model = require("./geminiClient");

const analyzeResumeAI = async (resumeText) => {
  const prompt = `
You are an expert ATS Resume Analyzer.

First determine whether the provided document is actually a professional resume or CV.

If the document is NOT a resume, return ONLY this JSON:

{
  "isResume": false,
  "message": "The uploaded PDF is not a resume. Please upload a valid resume in PDF format."
}

If it IS a resume, return ONLY valid JSON in this format:

{
  "isResume": true,
  "resumeScore": 0,
  "atsScore": 0,
  "summary": "",
  "overallFeedback": "",
  "strengths": [],
  "detectedSkills": [],
  "missingSkills": [],
  "suggestions": [
    {
      "title": "",
      "description": "",
      "priority": "High"
    }
  ]
}

Rules:

- Never return markdown.
- Never wrap the response inside \`\`\`.
- Return ONLY JSON.
- A resume should normally contain most of these sections:
  - Name
  - Contact Information
  - Education
  - Skills
  - Experience or Projects
  - Certifications/Achievements
- If these sections are mostly missing, consider it NOT a resume.

Resume Text:

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
