const express = require('express')

const router = express.Router()

const upload = require('../middlewares/uploadMiddleware')

const { protect } = require('../middlewares/authMiddleware')

const { validateObjectId } = require('../middlewares/validationMiddleware')

const resumeController = require('../controllers/resumeController')

router.post('/upload', protect, upload.single('resume'), resumeController.uploadResume)

router.get('/my-resumes', protect, resumeController.getUserResumes)

router.get('/:resumeId', protect, validateObjectId('resumeId'), resumeController.getResume)
router.delete('/:resumeId', protect, resumeController.deleteResume)

module.exports = router
