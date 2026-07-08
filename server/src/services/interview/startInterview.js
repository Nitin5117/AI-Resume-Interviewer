const AppError = require('../../errors/AppError')
const interviewRepository = require('../../repositories/interviewRepository')

const startInterview = async (userId, interviewId) => {
  const interview = await interviewRepository.getOwnedInterview(userId, interviewId)

  if (!interview) {
    throw new AppError('Interview not found.', 404)
  }

  if (!interview.startedAt) {
    interview.startedAt = new Date()
  }

  interview.status = 'started'

  await interviewRepository.saveInterview(interview)

  return interview
}

module.exports = startInterview
