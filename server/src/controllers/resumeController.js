const asyncHandler = require("../utils/asyncHandler");
const resumeService = require("../services/resumeService");

const uploadResume = asyncHandler(async (req, res) => {
  console.log("Upload controller reached");
  console.log(req.file);
  console.log(req.user);
  const resume = await resumeService.uploadResume(req.user._id, req.file);

  res.status(201).json({
    success: true,
    message: "Resume uploaded successfully.",
    data: resume,
  });
});

const getUserResumes = asyncHandler(async (req, res) => {
  const resumes = await resumeService.getUserResumes(req.user._id);

  res.status(200).json({
    success: true,
    data: resumes,
  });
});

module.exports = {
  uploadResume,
  getUserResumes,
};
