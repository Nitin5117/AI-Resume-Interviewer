import api from './api'

export const uploadResume = async file => {
  const formData = new FormData()

  formData.append('resume', file)

  const response = await api.post('/resume/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const getResume = async resumeId => {
  const response = await api.get(`/resume/${resumeId}`)

  return response.data
}

export const getUserResumes = async () => {
  const response = await api.get('/resume/my-resumes')

  return response.data
}

export const deleteResume = async resumeId => {
  const response = await api.delete(`/resume/${resumeId}`)

  return response.data
}
