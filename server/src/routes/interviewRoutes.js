const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const interviewController = require("../controllers/interviewController");

router.post("/create/:resumeId", protect, interviewController.createInterview);

router.get("/history", protect, interviewController.getInterviewHistory);

router.post(
  "/evaluate/:interviewId",
  protect,
  interviewController.evaluateInterview,
);

router.post("/:interviewId/answer", protect, interviewController.saveAnswer);

router.get("/:interviewId", protect, interviewController.getInterview);

module.exports = router;
