const {
  generateJSON,
} = require("./geminiClient");

const evaluateInterviewAI = async (questions) => {
  const interviewText = questions
    .map(
      (question, index) => `
Question ${index + 1}:
${question.question}

Candidate Answer:
${question.answer}
`,
    )
    .join("\n--------------------------\n");

  const prompt = `
You are a Senior Technical Interviewer.

Evaluate the ENTIRE interview.

Return ONLY valid JSON.

{
  "overallScore": 0,
  "summary": "",
  "communication": 0,
  "technicalKnowledge": 0,
  "problemSolving": 0,
  "confidence": 0,
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "hiringDecision": "",
  "questions": [
    {
      "score": 0,
      "feedback": ""
    }
  ]
}

Rules:

1. overallScore must be between 0 and 100.

2. communication, technicalKnowledge,
problemSolving and confidence should be between 0 and 10.

3. strengths = exactly 5 points.

4. weaknesses = exactly 5 points.

5. recommendations = exactly 5 points.

6. Return ONE object inside "questions"
for every interview question.

7. score should be between 0 and 10.

8. feedback should be maximum 2 sentences.

Interview:

${interviewText}
`;

  return await generateJSON(prompt);
};

module.exports = evaluateInterviewAI;