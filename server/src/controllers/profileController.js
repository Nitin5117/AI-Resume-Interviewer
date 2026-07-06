const asyncHandler = require("../utils/asyncHandler");
const profileService = require("../services/profile/profileService");

const getProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.getProfile(req.user._id);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

module.exports = {
  getProfile,
};
