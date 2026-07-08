const asyncHandler = require('../utils/asyncHandler')

const interviewService = require('../services/interview/interviewService')
const startInterview = require('../services/interview/startInterview')

const createInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.createInterview(
    req.user._id,
    req.params.resumeId,
    req.body
  )

  res.status(201).json({
    success: true,
    message: 'Interview created successfully.',
    data: interview,
  })
})

const evaluateInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.evaluateInterview(req.user._id, req.params.interviewId)

  res.status(200).json({
    success: true,
    message: 'Interview evaluated successfully.',
    data: interview,
  })
})

const saveAnswer = asyncHandler(async (req, res) => {
  const interview = await interviewService.saveAnswer(
    req.user._id,
    req.params.interviewId,
    req.body.questionIndex,
    req.body.answer
  )

  res.status(200).json({
    success: true,
    data: interview,
  })
})

const getInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.getInterview(req.user._id, req.params.interviewId)

  res.status(200).json({
    success: true,
    data: interview,
  })
})

const getInterviewHistory = asyncHandler(async (req, res) => {
  const interviews = await interviewService.getInterviewHistory(req.user._id)

  res.status(200).json({
    success: true,
    data: interviews,
  })
})

const deleteInterview = asyncHandler(async (req, res) => {
  const result = await interviewService.deleteInterview(req.user._id, req.params.interviewId)

  res.status(200).json({
    success: true,
    message: result.message,
  })
})

const startInterviewController = asyncHandler(async (req, res) => {
  const interview = await startInterview(req.user._id, req.params.interviewId)

  res.status(200).json({
    success: true,
    message: 'Interview started successfully.',
    data: interview,
  })
})

module.exports = {
  createInterview,
  evaluateInterview,
  getInterview,
  getInterviewHistory,
  saveAnswer,
  deleteInterview,
  startInterviewController,
}
