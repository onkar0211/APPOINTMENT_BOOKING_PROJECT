import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AppointmentProvider } from './context/AppointmentContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import BookAppointment from './pages/BookAppointment'
import MyAppointments from './pages/MyAppointments'

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/book" element={<BookAppointment />} />
                <Route path="/appointments" element={<MyAppointments />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AppointmentProvider>
    </AuthProvider>
  )
}

export default App

