const bcrypt = require("bcryptjs");
const validator = require("validator");

const userRepository = require("../repositories/userRepository");

const registerUser = async (userData) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
  } = userData;

  // Email Validation
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }

  // Check Existing Email
  const existingEmail = await userRepository.findUserByEmail(email);

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Check Existing Username
  const existingUsername = await userRepository.findUserByUsername(username);

  if (existingUsername) {
    throw new Error("Username already exists");
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

module.exports = {
  registerUser,
};