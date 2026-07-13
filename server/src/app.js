const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const authRoutes = require('./routes/authRoutes')
const resumeRoutes = require('./routes/resumeRoutes')
const interviewRoutes = require('./routes/interviewRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const profileRoutes = require('./routes/profileRoutes')

const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

app.use(cors())

app.use(helmet())

app.use(morgan('dev'))

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI Interview Platform API is running 🚀',
  })
})

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Healthy',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/interview', interviewRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/profile', profileRoutes)

app.use(errorMiddleware)

module.exports = app
