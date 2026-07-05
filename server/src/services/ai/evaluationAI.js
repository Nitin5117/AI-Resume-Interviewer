const model = require("./geminiClient");

const evaluateAnswer = async (question, answer) => {
  const prompt = `
You are an experienced technical interviewer.

Evaluate the following interview answer.

Question:
${question}

Answer:
${answer}

Return ONLY valid JSON.

{
  "score": 8,
  "feedback": "Good answer with clear explanation. Add more real-world examples.",
  "strengths": [
    "Clear communication",
    "Good technical knowledge"
  ],
  "improvements": [
    "Mention practical examples",
    "Explain time complexity"
  ]
}
`;

  const result = await model.generateContent(prompt);

  let response = result.response.text();

  response = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(response);
};

module.exports = evaluateAnswer;
