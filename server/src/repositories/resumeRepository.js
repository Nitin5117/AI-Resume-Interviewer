const Resume = require("../models/Resume");

const createResume = async (resumeData) => {
  return await Resume.create(resumeData);
};

const getUserResumes = async (userId) => {
  return Resume.find({
    user: userId,
  }).sort({
    updatedAt: -1,
  });
};
const getResumeById = async (id) => {
  return await Resume.findById(id);
};
const updateResume = async (id, data) => {
  return await Resume.findByIdAndUpdate(id, data, {
    new: true,
  });
};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
};
