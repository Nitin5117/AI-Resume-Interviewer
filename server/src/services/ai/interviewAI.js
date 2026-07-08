const { generateJSON } = require('./geminiClient')

const generateInterviewQuestions = async (resumeText, settings = {}) => {
  const {
    company = 'General',
    role = 'Software Engineer',
    difficulty = 'Medium',
    experience = 'Fresher',
    focus = 'Mixed',
    personality = 'Professional',
  } = settings

  const prompt = `
You are a senior AI technical interviewer.

Your task is to conduct a realistic mock interview.

Candidate Details:

Company:
${company}

Role:
${role}

Experience:
${experience}

Difficulty:
${difficulty}

Interview Focus:
${focus}

Interviewer Personality:
${personality}

Candidate Resume:

${resumeText}

Instructions:

1. Generate exactly 10 interview questions.
2. Questions must gradually increase in difficulty.
3. Ask questions based on the candidate's projects, skills and experience.
4. If the resume mentions a project, ask at least 2 project-related questions.
5. If focus is "Technical", generate mostly technical questions.
6. If focus is "HR", generate mostly behavioral questions.
7. If focus is "Mixed", generate a balanced interview.
8. Avoid duplicate questions.
9. Return ONLY valid JSON.
10. Do not include markdown or explanations.

Return JSON only in this format:

{
  "questions": [
    {
      "question": "Tell me about yourself."
    }
  ]
}
`

  return await generateJSON(prompt)
}

module.exports = generateInterviewQuestions
