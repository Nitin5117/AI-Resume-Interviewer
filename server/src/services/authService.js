const bcrypt = require("bcryptjs");
const validator = require("validator");
const generateToken = require("../utils/generateToken");
const userRepository = require("../repositories/userRepository");
const AppError = require("../errors/AppError");

const registerUser = async (userData) => {
  const { firstName, lastName, username, email, password } = userData;

  // Email Validation
  if (!validator.isEmail(email)) {
    throw new AppError("Invalid email address", 400);
  }

  // Check Existing Email
  const existingEmail = await userRepository.findUserByEmail(email);

  if (existingEmail) {
    throw new AppError("Email already exists", 409);
  }

  // Check Existing Username
  const existingUsername = await userRepository.findUserByUsername(username);

  if (existingUsername) {
    throw new AppError("Username already exists", 409);
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create User
  const user = await userRepository.createUser({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  // Validate Email
  if (!validator.isEmail(email)) {
    throw new AppError("Invalid email address", 400);
  }

  // Find User
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // Compare Password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  // Generate JWT
  const token = generateToken(user._id);

  return {
    token,
    user,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
