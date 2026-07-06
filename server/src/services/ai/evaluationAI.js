const model = require("./geminiClient");
const AppError = require("../../errors/AppError");

const evaluateInterviewAI = async (questions) => {
  const interviewText = questions
    .map(
      (q, index) => `
Question ${index + 1}:
${q.question}

Candidate Answer:
${q.answer}
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

  try {
    const result = await model.generateContent(prompt);

    let response = result.response.text();

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(response);
  } catch (error) {
    if (error.status === 429) {
      throw new AppError(
        "Gemini API quota exceeded. Please try again later.",
        429,
      );
    }

    throw new AppError("Failed to evaluate interview.", 500);
  }
};

module.exports = evaluateInterviewAI;
