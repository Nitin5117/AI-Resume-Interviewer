const AppError = require("../../errors/AppError");
const userRepository = require("../../repositories/userRepository");

const updateProfile = async (userId, profileData) => {
  const { name, email } = profileData;

  if (!name?.trim()) {
    throw new AppError("Name is required.", 400);
  }

  if (!email?.trim()) {
    throw new AppError("Email is required.", 400);
  }

  const updatedUser = await userRepository.updateUserById(userId, {
    name: name.trim(),
    email: email.trim().toLowerCase(),
  });

  if (!updatedUser) {
    throw new AppError("User not found.", 404);
  }

  return updatedUser;
};

module.exports = updateProfile;