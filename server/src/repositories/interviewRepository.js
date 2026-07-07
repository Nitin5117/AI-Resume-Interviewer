const Interview = require('../models/Interview')

const createInterview = async data => {
  return await Interview.create(data)
}

const getInterviewById = async id => {
  return await Interview.findById(id).populate('resume').populate('user')
}

const getOwnedInterview = async (userId, interviewId) => {
  return await Interview.findOne({
    _id: interviewId,
    user: userId,
  })
    .populate('resume')
    .populate('user')
}

const getUserInterviews = async userId => {
  return await Interview.find({
    user: userId,
  }).sort({
    updatedAt: -1,
  })
}

const findActiveInterviewByResume = async (userId, resumeId) => {
  return await Interview.findOne({
    user: userId,
    resume: resumeId,
    status: {
      $in: ['pending', 'started'],
    },
    questions: {
      $elemMatch: {
        answer: '',
      },
    },
  }).sort({
    createdAt: -1,
  })
}

const startEvaluation = async (userId, interviewId) => {
  return await Interview.findOneAndUpdate(
    {
      _id: interviewId,
      user: userId,
      status: {
        $in: ['pending', 'started', 'failed'],
      },
    },
    {
      $set: {
        status: 'evaluating',
      },
    },
    {
      new: true,
    }
  )
}

const updateInterview = async (id, data) => {
  return await Interview.findByIdAndUpdate(id, data, {
    new: true,
  })
}

const saveInterview = async interview => {
  return await interview.save()
}
const hasInterviewForResume = async resumeId => {
  return await Interview.exists({
    resume: resumeId,
  })
}
const deleteInterview = async interviewId => {
  return await Interview.findByIdAndDelete(interviewId)
}
module.exports = {
  createInterview,
  getInterviewById,
  getOwnedInterview,
  getUserInterviews,
  findActiveInterviewByResume,
  startEvaluation,
  updateInterview,
  saveInterview,
  hasInterviewForResume,
  deleteInterview,
}
