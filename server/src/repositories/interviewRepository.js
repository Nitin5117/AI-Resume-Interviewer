const Interview = require("../models/Interview");

const createInterview = async (data) => {
  return await Interview.create(data);
};

const findInterviewById = async (id) => {
  return await Interview.findById(id);
};

const updateInterview = async (id, data) => {
  return await Interview.findByIdAndUpdate(id, data, {
    new: true,
  });
};

module.exports = {
  createInterview,
  findInterviewById,
  updateInterview,
};
