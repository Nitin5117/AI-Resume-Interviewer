const AppError = require("../../errors/AppError");
const userRepository = require("../../repositories/userRepository");

const updateProfile = async (
  userId,
  profileData,
) => {
  const { name, email } = profileData;

  const existingUser =
    await userRepository.findExistingUserByEmail(
      email,
      userId,
    );

  if (existingUser) {
    throw new AppError(
      "Email is already in use.",
      409,
    );
  }

  const updatedUser =
    await userRepository.updateUserById(
      userId,
      {
        name,
        email,
      },
    );

  if (!updatedUser) {
    throw new AppError(
      "User not found.",
      404,
    );
  }

  return updatedUser;
};

module.exports = updateProfile;