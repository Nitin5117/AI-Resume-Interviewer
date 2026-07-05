const asyncHandler = require("../utils/asyncHandler");
const interviewService = require("../services/interview/interviewService");

const createInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.createInterview(
    req.user._id,
    req.params.resumeId,
  );

  res.status(201).json({
    success: true,
    message: "Interview created successfully.",
    data: interview,
  });
});

const evaluateInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.evaluateInterview(
    req.params.interviewId,
  );

  res.status(200).json({
    success: true,
    message: "Interview evaluated successfully.",
    data: interview,
  });
});

const getInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.getInterview(req.params.interviewId);

  res.status(200).json({
    success: true,
    data: interview,
  });
});

const saveAnswer = asyncHandler(async (req, res) => {
  const interview = await interviewService.saveAnswer(
    req.params.interviewId,
    req.body.questionIndex,
    req.body.answer,
  );

  res.status(200).json({
    success: true,
    data: interview,
  });
});

module.exports = {
  createInterview,
  evaluateInterview,
  getInterview,
  saveAnswer,
};
