import { useState } from 'react'
import { useAppointments } from '../context/AppointmentContext'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Calendar, Clock, Trash2, Filter, Mail, Phone, User } from 'lucide-react'
import { BUSINESS_TYPES } from '../utils/businessTypes'

const MyAppointments = () => {
  const { appointments, loading, deleteAppointment } = useAppointments()
  const [filter, setFilter] = useState('all')
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return
    }

    setDeletingId(id)
    await deleteAppointment(id)
    setDeletingId(null)
  }

  const filteredAppointments = appointments.filter(apt => {
    const now = new Date()
    const aptDate = new Date(apt.date)

    switch (filter) {
      case 'upcoming':
        return aptDate >= now
      case 'past':
        return aptDate < now
      case 'cancelled':
        return apt.status?.toLowerCase() === 'cancelled'
      default:
        return true
    }
  }).sort((a, b) => new Date(b.date) - new Date(a.date))

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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <Calendar className="h-10 w-10 text-primary" />
            My Appointments
          </h1>
          <p className="text-muted-foreground mt-2">Manage all your scheduled appointments</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'past', label: 'Past' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? 'default' : 'outline'}
                onClick={() => setFilter(key)}
                className="gap-2"
              >
                {filter === key && <Filter className="h-4 w-4" />}
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg mb-2">No appointments found</p>
            <p className="text-sm text-muted-foreground">
              {filter === 'all' 
                ? 'Start by booking your first appointment!'
                : `No ${filter} appointments`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredAppointments.map(appointment => {
            const businessType = BUSINESS_TYPES[appointment.businessType] || BUSINESS_TYPES.other
            const isPast = new Date(appointment.date) < new Date()
            
            return (
              <Card key={appointment._id} className="border-2 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-4 rounded-xl border-2 ${businessType.color} shrink-0`}>
                        <span className="text-3xl">{businessType.icon}</span>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{appointment.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
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
                          </div>
                          <Badge
                            variant={
                              appointment.status === 'confirmed' ? 'success' :
                              appointment.status === 'cancelled' ? 'destructive' :
                              appointment.status === 'pending' ? 'warning' : 'default'
                            }
                          >
                            {appointment.status || 'Scheduled'}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className={businessType.color}>
                            {businessType.name}
                          </Badge>
                          {appointment.serviceType && (
                            <Badge variant="secondary">{appointment.serviceType}</Badge>
                          )}
                        </div>

                        {appointment.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {appointment.description}
                          </p>
                        )}

                        {/* Contact Information */}
                        {(appointment.contactName || appointment.contactEmail || appointment.contactPhone) && (
                          <div className="pt-2 border-t space-y-1">
                            {appointment.contactName && (
                              <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{appointment.contactName}</span>
                              </div>
                            )}
                            {appointment.contactEmail && (
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{appointment.contactEmail}</span>
                              </div>
                            )}
                            {appointment.contactPhone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{appointment.contactPhone}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {!isPast && appointment.status?.toLowerCase() !== 'cancelled' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(appointment._id)}
                        disabled={deletingId === appointment._id}
                        className="gap-2 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                        {deletingId === appointment._id ? 'Cancelling...' : 'Cancel'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
