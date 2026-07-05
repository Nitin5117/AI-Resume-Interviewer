const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateInterviewQuestions = async (resumeText) => {
  const prompt = `
You are an experienced technical interviewer.

Generate exactly 5 interview questions based on this resume.

Resume:

${resumeText}

Return ONLY a JSON array.

Example:

[
  "Question 1",
  "Question 2",
  "Question 3"
]
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = {
  generateInterviewQuestions,
};
