const model = require("./geminiClient");

const generateInterviewQuestions = async (resumeText) => {
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

  const result = await model.generateContent(prompt);

  let response = result.response.text();

  response = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(response);
};

module.exports = generateInterviewQuestions;
