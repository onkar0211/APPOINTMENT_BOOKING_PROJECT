import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AppointmentProvider } from './context/AppointmentContext'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import BookAppointment from './pages/BookAppointment'
import MyAppointments from './pages/MyAppointments'

// Component to conditionally show navbar
const Layout = ({ children }) => {
  const location = useLocation()
  const showNavbar = !['/login', '/register'].includes(location.pathname)

  return (
    <div className="app">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "main-content" : "min-h-screen"}>
        {children}
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <PrivateRoute>
                    <Calendar />
                  </PrivateRoute>
                }
              />
              <Route
                path="/book"
                element={
                  <PrivateRoute>
                    <BookAppointment />
                  </PrivateRoute>
                }
              />
              <Route
                path="/appointments"
                element={
                  <PrivateRoute>
                    <MyAppointments />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Layout>
        </Router>
      </AppointmentProvider>
    </AuthProvider>
  )
}

export default App

