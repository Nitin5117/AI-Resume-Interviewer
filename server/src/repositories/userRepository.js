const User = require("../models/User");

const createUser = async (userData) => {
  return await User.create(userData);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const findUserById = async (id) => {
  return await User.findById(id);
};
const getUserProfileById = async (userId) => {
  return await User.findById(userId).select("-password");
};
const updateUserById = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  getUserProfileById,
  updateUserById,
};
