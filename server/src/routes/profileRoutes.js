const express = require("express");

const router = express.Router();

const {
  protect,
} = require("../middlewares/authMiddleware");

const {
  validateProfileUpdate,
} = require("../middlewares/validationMiddleware");

const profileController = require(
  "../controllers/profileController",
);

router.get(
  "/",
  protect,
  profileController.getProfile,
);

router.patch(
  "/",
  protect,
  validateProfileUpdate,
  profileController.updateProfile,
);

module.exports = router;