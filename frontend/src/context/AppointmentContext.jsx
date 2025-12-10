import { createContext, useContext, useState, useEffect } from 'react'
import { appointmentService } from '../services/api'

const AppointmentContext = createContext()

export const useAppointments = () => {
  const context = useContext(AppointmentContext)
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider')
  }
  return context
}

export const AppointmentProvider = ({ children }) => {
  
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await appointmentService.getAll()
      setAppointments(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  const createAppointment = async (appointmentData) => {
    try {
      setError(null)
      const newAppointment = await appointmentService.create(appointmentData)
      setAppointments(prev => [...prev, newAppointment])
      return { success: true, data: newAppointment }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create appointment'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const updateAppointment = async (id, appointmentData) => {
    try {
      setError(null)
      const updatedAppointment = await appointmentService.update(id, appointmentData)
      setAppointments(prev =>
        prev.map(apt => (apt._id === id ? updatedAppointment : apt))
      )
      return { success: true, data: updatedAppointment }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update appointment'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const deleteAppointment = async (id) => {
    try {
      setError(null)
      await appointmentService.delete(id)
      setAppointments(prev => prev.filter(apt => apt._id !== id))
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete appointment'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const value = {
    appointments,
    loading,
    error,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment
  }

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  )
}

