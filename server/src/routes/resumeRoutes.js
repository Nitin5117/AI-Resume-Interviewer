const express = require("express");

const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");

const resumeController = require("../controllers/resumeController");

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  resumeController.uploadResume,
);

router.get("/my-resumes", protect, resumeController.getUserResumes);

module.exports = router;
