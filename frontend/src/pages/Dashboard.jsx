import { Link } from 'react-router-dom'
import { useAppointments } from '../context/AppointmentContext'
import { useAuth } from '../context/AuthContext'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Calendar as CalendarIcon, Clock, Plus, TrendingUp } from 'lucide-react'
import { BUSINESS_TYPES } from '../utils/businessTypes'

const Dashboard = () => {
  const { appointments, loading } = useAppointments()
  const { user } = useAuth()

  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)

  const totalAppointments = appointments.length
  const upcomingCount = appointments.filter(
    apt => new Date(apt.date) >= new Date()
  ).length
  const pastCount = appointments.filter(
    apt => new Date(apt.date) < new Date()
  ).length

  // Count appointments by business type
  const businessTypeCounts = {}
  appointments.forEach(apt => {
    const type = apt.businessType || 'other'
    businessTypeCounts[type] = (businessTypeCounts[type] || 0) + 1
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Welcome back, {user?.name || 'Guest'}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your appointments</p>
        </div>
        <Link to="/book">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Book Appointment
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground mt-1">All time appointments</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{upcomingCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Scheduled appointments</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-muted-foreground">{pastCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Past appointments</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-purple-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Business Types</CardTitle>
            <span className="text-2xl">🏢</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{Object.keys(businessTypeCounts).length}</div>
            <p className="text-xs text-muted-foreground mt-1">Different categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Business Types Overview */}
      {Object.keys(businessTypeCounts).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Appointments by Category</CardTitle>
            <CardDescription>Your appointments organized by business type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(businessTypeCounts).map(([type, count]) => {
                const businessType = BUSINESS_TYPES[type] || BUSINESS_TYPES.other
                return (
                  <div
                    key={type}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${businessType.color}`}
                  >
                    <span className="text-xl">{businessType.icon}</span>
                    <span className="font-semibold">{businessType.name}</span>
                    <Badge variant="secondary" className="ml-2">{count}</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your next scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No upcoming appointments</p>
              <Link to="/book">
                <Button>Book Your First Appointment</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map(appointment => {
                const businessType = BUSINESS_TYPES[appointment.businessType] || BUSINESS_TYPES.other
                return (
                  <div
                    key={appointment._id}
                    className="flex items-center justify-between p-4 rounded-lg border-2 hover:shadow-md transition-shadow bg-gradient-to-r from-background to-muted/20"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${businessType.color} border-2`}>
                        <span className="text-2xl">{businessType.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{appointment.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            {format(new Date(appointment.date), 'MMM dd, yyyy')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {format(new Date(appointment.date), 'h:mm a')}
                          </div>
                          {appointment.duration && (
                            <span>• {appointment.duration} min</span>
                          )}
                        </div>
                        {appointment.description && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {appointment.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className={businessType.color}>
                            {businessType.name}
                          </Badge>
                          {appointment.serviceType && (
                            <Badge variant="secondary">{appointment.serviceType}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        appointment.status === 'confirmed' ? 'success' :
                        appointment.status === 'cancelled' ? 'destructive' : 'default'
                      }
                      className="ml-4"
                    >
                      {appointment.status || 'Scheduled'}
                    </Badge>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
