const asyncHandler = require("../utils/asyncHandler");
const interviewService = require("../services/interviewService");

const createInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.createInterview(req.user._id);

  res.status(201).json({
    success: true,
    message: "Interview created successfully.",
    data: interview,
  });
});

module.exports = {
  createInterview,
};
