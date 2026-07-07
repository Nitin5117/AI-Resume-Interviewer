const AppError = require("../../errors/AppError");
const interviewRepository = require("../../repositories/interviewRepository");

const saveAnswer = async (
  userId,
  interviewId,
  questionIndex,
  answer,
) => {
  const interview =
    await interviewRepository.getOwnedInterview(
      userId,
      interviewId,
    );

  if (!interview) {
    throw new AppError(
      "Interview not found.",
      404,
    );
  }

  if (interview.status === "evaluating") {
    throw new AppError(
      "Interview evaluation is already in progress.",
      409,
    );
  }

  if (interview.status === "completed") {
    throw new AppError(
      "Completed interview answers cannot be changed.",
      409,
    );
  }

  if (!interview.questions[questionIndex]) {
    throw new AppError(
      "Invalid question.",
      400,
    );
  }

  interview.questions[questionIndex].answer =
    answer;

  if (
    interview.status === "pending" ||
    interview.status === "failed"
  ) {
    interview.status = "started";
  }

  await interviewRepository.saveInterview(
    interview,
  );

  return interview;
};

module.exports = saveAnswer;