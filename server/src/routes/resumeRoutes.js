const express = require("express");

const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");

// Import controller correctly
const resumeController = require("../controllers/resumeController");

// Upload Resume
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  resumeController.uploadResume,
);

// Get User Resumes
router.get("/my-resumes", protect, resumeController.getUserResumes);

module.exports = router;
