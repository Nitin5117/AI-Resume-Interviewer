const fs = require('fs')

const AppError = require('../../errors/AppError')
const resumeRepository = require('../../repositories/resumeRepository')
const analyzeResume = require('./analyzeResume')
const deleteResume = require('./deleteResume')

const uploadResume = async (userId, file) => {
  if (!file) {
    throw new AppError('Resume file is required.', 400)
  }

  let resume

  try {
    // Create resume document
    resume = await resumeRepository.createResume({
      user: userId,
      originalName: file.originalname,
      fileName: file.filename,
      filePath: file.path,
      fileSize: file.size,
      status: 'analyzing',
    })

    // Analyze resume using AI
    const analysis = await analyzeResume(file.path)

    // Save analysis
    const updatedResume = await resumeRepository.updateResume(resume._id, {
      extractedText: analysis.extractedText || '',
      analysis,
      status: 'completed',
    })

    return updatedResume
  } catch (error) {
    console.error('Resume analysis failed:', error.message)

    try {
      // Delete uploaded PDF
      if (file?.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path)
      }

      // Delete MongoDB document
      if (resume?._id) {
        await resumeRepository.deleteResume(resume._id)
      }
    } catch (cleanupError) {
      console.error('Resume cleanup failed:', cleanupError)
    }

    throw error
  }
}

const getUserResumes = async userId => {
  return await resumeRepository.getUserResumes(userId)
}

const getResume = async (userId, resumeId) => {
  const resume = await resumeRepository.getResumeById(resumeId)

  if (!resume) {
    throw new AppError('Resume not found.', 404)
  }

  if (resume.user.toString() !== userId.toString()) {
    throw new AppError('Resume not found.', 404)
  }

  return resume
}

module.exports = {
  uploadResume,
  getUserResumes,
  getResume,
  deleteResume,
}
