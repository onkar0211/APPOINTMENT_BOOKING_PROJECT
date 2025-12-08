import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // No authentication required - just return the error
    return Promise.reject(error)
  }
)

// Auth Service
export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }).then(res => res.data),
  
  register: (userData) =>
    api.post('/auth/register', userData).then(res => res.data),
  
  getCurrentUser: () =>
    api.get('/auth/me').then(res => res.data),
  
  refreshToken: (refreshToken) =>
    api.post('/auth/refresh', { refreshToken }).then(res => res.data)
}

// Appointment Service
export const appointmentService = {
  getAll: () =>
    api.get('/appointments').then(res => res.data),
  
  getById: (id) =>
    api.get(`/appointments/${id}`).then(res => res.data),
  
  create: (appointmentData) =>
    api.post('/appointments', appointmentData).then(res => res.data),
  
  update: (id, appointmentData) =>
    api.put(`/appointments/${id}`, appointmentData).then(res => res.data),
  
  delete: (id) =>
    api.delete(`/appointments/${id}`).then(res => res.data),
  
  getAvailableSlots: (date, serviceId) =>
    api.get('/appointments/available-slots', {
      params: { date, serviceId }
    }).then(res => res.data)
}

export default api

