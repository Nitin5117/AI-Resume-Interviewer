const asyncHandler = require("../utils/asyncHandler");

const resumeService = require(
  "../services/resume/resumeService",
);

const uploadResume = asyncHandler(
  async (req, res) => {
    const resume =
      await resumeService.uploadResume(
        req.user._id,
        req.file,
      );

    res.status(201).json({
      success: true,
      message:
        "Resume uploaded successfully.",
      data: resume,
    });
  },
);

const getUserResumes = asyncHandler(
  async (req, res) => {
    const resumes =
      await resumeService.getUserResumes(
        req.user._id,
      );

    res.status(200).json({
      success: true,
      data: resumes,
    });
  },
);

const getResume = asyncHandler(
  async (req, res) => {
    const resume =
      await resumeService.getResume(
        req.user._id,
        req.params.resumeId,
      );

    res.status(200).json({
      success: true,
      data: resume,
    });
  },
);

module.exports = {
  uploadResume,
  getUserResumes,
  getResume,
};