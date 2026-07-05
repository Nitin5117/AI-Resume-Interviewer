const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const interviewController = require("../controllers/interviewController");

router.post("/create", protect, interviewController.createInterview);

module.exports = router;
