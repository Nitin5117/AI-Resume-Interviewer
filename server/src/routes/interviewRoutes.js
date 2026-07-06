const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const interviewController = require("../controllers/interviewController");

router.post("/create/:resumeId", protect, interviewController.createInterview);

router.get("/:interviewId", protect, interviewController.getInterview);

router.post("/:interviewId/answer", protect, interviewController.saveAnswer);

router.post(
  "/evaluate/:interviewId",
  protect,
  interviewController.evaluateInterview,
);

module.exports = router;
