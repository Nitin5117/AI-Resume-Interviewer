const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const dashboardController = require("../controllers/dashboardController");

router.get("/", protect, dashboardController.getDashboard);

module.exports = router;
