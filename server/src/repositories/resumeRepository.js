const Resume = require("../models/Resume");

const createResume = async (resumeData) => {
  return await Resume.create(resumeData);
};

const getUserResumes = async (userId) => {
  return await Resume.find({ user: userId }).sort({
    createdAt: -1,
  });
};

const getResumeById = async (id) => {
  return await Resume.findById(id);
};

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
};
