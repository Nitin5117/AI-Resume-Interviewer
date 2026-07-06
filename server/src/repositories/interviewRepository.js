const Interview = require("../models/Interview");

const createInterview = async (data) => {
  return await Interview.create(data);
};

const getInterviewById = async (id) => {
  return await Interview.findById(id)
    .populate("resume")
    .populate("user");
};

const getOwnedInterview = async (userId, interviewId) => {
  return await Interview.findOne({
    _id: interviewId,
    user: userId,
  })
    .populate("resume")
    .populate("user");
};

const getUserInterviews = async (userId) => {
  return await Interview.find({
    user: userId,
  }).sort({
    updatedAt: -1,
  });
};

const updateInterview = async (id, data) => {
  return await Interview.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const saveInterview = async (interview) => {
  return await interview.save();
};

module.exports = {
  createInterview,
  getInterviewById,
  getOwnedInterview,
  getUserInterviews,
  updateInterview,
  saveInterview,
};