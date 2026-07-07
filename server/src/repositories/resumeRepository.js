const Resume = require('../models/Resume')

const createResume = async resumeData => {
  return await Resume.create(resumeData)
}

const getUserResumes = async userId => {
  return Resume.find({
    user: userId,
  }).sort({
    updatedAt: -1,
  })
}
const getResumeById = async id => {
  return await Resume.findById(id)
}
const updateResume = async (id, data) => {
  return await Resume.findByIdAndUpdate(id, data, {
    new: true,
  })
}

const deleteResume = async resumeId => {
  return await Resume.findByIdAndDelete(resumeId)
}

const getOwnedResume = async (userId, resumeId) => {
  return await Resume.findOne({
    _id: resumeId,
    user: userId,
  })
}

module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
  getOwnedResume,
}
