const resumeRepository = require("../../repositories/resumeRepository");
const analyzeResume = require("./analyzeResume");

const uploadResume = async (userId, file) => {
  if (!file) {
    throw new Error("Resume file is required.");
  }

  // Save resume
  const resume = await resumeRepository.createResume({
    user: userId,
    originalName: file.originalname,
    fileName: file.filename,
    filePath: file.path,
    fileSize: file.size,
    status: "uploaded",
  });

  try {
    // Change status
    await resumeRepository.updateResume(resume._id, {
      status: "analyzing",
    });

    // Analyze resume
    const analysis = await analyzeResume(file.path);

    // Save analysis
    const updatedResume = await resumeRepository.updateResume(resume._id, {
      extractedText: analysis.extractedText || "",
      analysis,
      status: "completed",
    });

    return updatedResume;
  } catch (error) {
    await resumeRepository.updateResume(resume._id, {
      status: "failed",
    });

    throw error;
  }
};

const getUserResumes = async (userId) => {
  return await resumeRepository.getUserResumes(userId);
};

module.exports = {
  uploadResume,
  getUserResumes,
};
