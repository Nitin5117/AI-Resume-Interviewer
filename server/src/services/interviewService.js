const interviewRepository = require("../repositories/interviewRepository");
const geminiService = require("./geminiService");

const createInterview = async (userId) => {
  const questions = [
    { question: "Tell me about yourself." },
    { question: "Explain React Hooks." },
    { question: "What is JWT?" },
    { question: "Difference between SQL and MongoDB?" },
    { question: "Describe your favorite project." },
  ];

  return await interviewRepository.createInterview({
    user: userId,
    questions,
  });
};

module.exports = {
  createInterview,
};
