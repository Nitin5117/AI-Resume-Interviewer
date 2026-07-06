const asyncHandler = require("../utils/asyncHandler");
const dashboardService = require("../services/dashboard/getDashboard");

const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await dashboardService.getDashboard(req.user._id);

  res.status(200).json({
    success: true,
    data: dashboard,
  });
});

module.exports = {
  getDashboard,
};
