const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../errors/AppError");
const userRepository = require("../repositories/userRepository");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Not authorized. No token provided.", 401);
  }

  // Verify Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find User
  const user = await userRepository.findUserById(decoded.id);

  if (!user) {
    throw new AppError("User not found.", 401);
  }

  req.user = user;

  next();
});

module.exports = {
  protect,
};
