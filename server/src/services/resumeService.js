const resumeRepository = require("../repositories/resumeRepository");

const uploadResume = async (userId, file) => {
  if (!file) {
    throw new Error("Resume file is required.");
  }

  const resume = await resumeRepository.createResume({
    user: userId,
    originalName: file.originalname,
    fileName: file.filename,
    filePath: file.path,
    fileSize: file.size,
  });

  return resume;
};

const getUserResumes = async (userId) => {
  return await resumeRepository.getUserResumes(userId);
};

module.exports = {
  uploadResume,
  getUserResumes,
};
