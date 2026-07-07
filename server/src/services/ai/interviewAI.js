const {
  generateJSON,
} = require("./geminiClient");

const generateInterviewQuestions = async (
  resumeText,
) => {
  const prompt = `
You are an experienced technical interviewer.

Read this resume carefully.

Generate 10 interview questions.

Mix:

- HR Questions
- Technical Questions
- Project Questions
- Problem Solving Questions

Return ONLY JSON.

{
  "questions":[
    {
      "question":"Tell me about yourself."
    }
  ]
}

Resume:

${resumeText}
`;

  return await generateJSON(prompt);
};

module.exports = generateInterviewQuestions;