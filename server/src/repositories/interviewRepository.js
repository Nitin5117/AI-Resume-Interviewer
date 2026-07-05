const Interview = require("../models/Interview");

const createInterview = async (data) => {
  return await Interview.create(data);
};

const getInterviewById = async (id) => {
  return await Interview.findById(id).populate("resume").populate("user");
};

const getUserInterviews = async (userId) => {
  return await Interview.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

const updateInterview = async (id, data) => {
  return await Interview.findByIdAndUpdate(id, data, {
    new: true,
  });
};

module.exports = {
  createInterview,
  getInterviewById,
  getUserInterviews,
  updateInterview,
};
