const express = require("express");

const router = express.Router();

const {
  protect,
} = require("../middlewares/authMiddleware");

const {
  validateObjectId,
  validateAnswer,
} = require("../middlewares/validationMiddleware");

const interviewController = require(
  "../controllers/interviewController",
);

router.post(
  "/create/:resumeId",
  protect,
  validateObjectId("resumeId"),
  interviewController.createInterview,
);

router.get(
  "/history",
  protect,
  interviewController.getInterviewHistory,
);

router.post(
  "/evaluate/:interviewId",
  protect,
  validateObjectId("interviewId"),
  interviewController.evaluateInterview,
);

router.post(
  "/:interviewId/answer",
  protect,
  validateObjectId("interviewId"),
  validateAnswer,
  interviewController.saveAnswer,
);

router.get(
  "/:interviewId",
  protect,
  validateObjectId("interviewId"),
  interviewController.getInterview,
);

module.exports = router;