const fs = require('fs')

const AppError = require('../../errors/AppError')

const resumeRepository = require('../../repositories/resumeRepository')
const interviewRepository = require('../../repositories/interviewRepository')

const deleteResume = async (userId, resumeId) => {
  const resume = await resumeRepository.getOwnedResume(userId, resumeId)

  if (!resume) {
    throw new AppError('Resume not found.', 404)
  }

  const hasInterview = await interviewRepository.hasInterviewForResume(resumeId)

  if (hasInterview) {
    throw new AppError('This resume has interview history and cannot be deleted.', 400)
  }

  if (resume.filePath && fs.existsSync(resume.filePath)) {
    fs.unlinkSync(resume.filePath)
  }

  await resumeRepository.deleteResume(resumeId)

  return {
    message: 'Resume deleted successfully.',
  }
}

module.exports = deleteResume
