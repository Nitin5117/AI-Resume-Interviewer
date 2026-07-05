const authService = require("../services/auth/authService");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { token, user } = await authService.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

const profile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

module.exports = {
  register,
  login,
  profile,
};
