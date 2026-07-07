const AppError = require('../../errors/AppError')

const interviewRepository = require('../../repositories/interviewRepository')

const deleteInterview = async (userId, interviewId) => {
  const interview = await interviewRepository.getOwnedInterview(userId, interviewId)

  if (!interview) {
    throw new AppError('Interview not found.', 404)
  }

  await interviewRepository.deleteInterview(interviewId)

  return {
    message: 'Interview deleted successfully.',
  }
}

module.exports = deleteInterview
