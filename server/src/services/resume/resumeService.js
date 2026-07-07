const AppError = require("../../errors/AppError");
const resumeRepository = require("../../repositories/resumeRepository");
const analyzeResume = require("./analyzeResume");

const uploadResume = async (userId, file) => {
  if (!file) {
    throw new AppError(
      "Resume file is required.",
      400,
    );
  }

  const resume =
    await resumeRepository.createResume({
      user: userId,
      originalName: file.originalname,
      fileName: file.filename,
      filePath: file.path,
      fileSize: file.size,
      status: "uploaded",
    });

  try {
    await resumeRepository.updateResume(
      resume._id,
      {
        status: "analyzing",
      },
    );

    const analysis = await analyzeResume(
      file.path,
    );

    const updatedResume =
      await resumeRepository.updateResume(
        resume._id,
        {
          extractedText:
            analysis.extractedText || "",
          analysis,
          status: "completed",
        },
      );

    return updatedResume;
  } catch (error) {
    await resumeRepository.updateResume(
      resume._id,
      {
        status: "failed",
      },
    );

    throw error;
  }
};

const getUserResumes = async (userId) => {
  return await resumeRepository.getUserResumes(
    userId,
  );
};

const getResume = async (
  userId,
  resumeId,
) => {
  const resume =
    await resumeRepository.getResumeById(
      resumeId,
    );

  if (!resume) {
    throw new AppError(
      "Resume not found.",
      404,
    );
  }

  if (
    resume.user.toString() !==
    userId.toString()
  ) {
    throw new AppError(
      "Resume not found.",
      404,
    );
  }

  return resume;
};

module.exports = {
  uploadResume,
  getUserResumes,
  getResume,
};