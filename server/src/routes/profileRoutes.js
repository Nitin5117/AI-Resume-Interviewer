const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const profileController = require("../controllers/profileController");

router.get("/", protect, profileController.getProfile);

router.patch("/", protect, profileController.updateProfile);

module.exports = router;