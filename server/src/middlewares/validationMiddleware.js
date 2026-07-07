const mongoose = require("mongoose");
const AppError = require("../errors/AppError");

const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(
        new AppError(
          `Invalid ${paramName}.`,
          400,
        ),
      );
    }

    next();
  };
};

const validateAnswer = (req, res, next) => {
  const { questionIndex, answer } = req.body;

  if (
    questionIndex === undefined ||
    questionIndex === null
  ) {
    return next(
      new AppError(
        "Question index is required.",
        400,
      ),
    );
  }

  if (
    !Number.isInteger(questionIndex) ||
    questionIndex < 0
  ) {
    return next(
      new AppError(
        "Question index must be a valid non-negative integer.",
        400,
      ),
    );
  }

  if (
    typeof answer !== "string" ||
    !answer.trim()
  ) {
    return next(
      new AppError(
        "Answer is required.",
        400,
      ),
    );
  }

  req.body.answer = answer.trim();

  next();
};

const validateProfileUpdate = (req, res, next) => {
  const { name, email } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim()
  ) {
    return next(
      new AppError(
        "Name is required.",
        400,
      ),
    );
  }

  if (name.trim().length < 2) {
    return next(
      new AppError(
        "Name must be at least 2 characters long.",
        400,
      ),
    );
  }

  if (name.trim().length > 50) {
    return next(
      new AppError(
        "Name cannot exceed 50 characters.",
        400,
      ),
    );
  }

  if (
    typeof email !== "string" ||
    !email.trim()
  ) {
    return next(
      new AppError(
        "Email is required.",
        400,
      ),
    );
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    return next(
      new AppError(
        "Please provide a valid email address.",
        400,
      ),
    );
  }

  req.body.name = name.trim();

  req.body.email = email
    .trim()
    .toLowerCase();

  next();
};

module.exports = {
  validateObjectId,
  validateAnswer,
  validateProfileUpdate,
};