const buildResumePrompt = (resumeText) => {
  return `
You are an experienced technical recruiter.

Analyze the following resume.

Resume:

${resumeText}

Return ONLY valid JSON.

Format:

{
  "resumeScore": number,
  "atsScore": number,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": [],
  "professionalSummary": ""
}
`;
};

module.exports = buildResumePrompt;
