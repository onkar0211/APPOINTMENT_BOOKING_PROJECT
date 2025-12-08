import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useAppointments } from '../context/AppointmentContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Calendar as CalendarIcon } from 'lucide-react'
import { BUSINESS_TYPES } from '../utils/businessTypes'

const Calendar = () => {
  const { appointments, loading } = useAppointments()
  const [events, setEvents] = useState([])

  useEffect(() => {
    const formattedEvents = appointments.map(apt => {
      const businessType = BUSINESS_TYPES[apt.businessType] || BUSINESS_TYPES.other
      return {
        id: apt._id,
        title: `${businessType.icon} ${apt.title}`,
        start: apt.date,
        backgroundColor: getStatusColor(apt.status),
        borderColor: getStatusColor(apt.status),
        textColor: '#fff',
        extendedProps: {
          description: apt.description,
          status: apt.status,
          businessType: apt.businessType,
          serviceType: apt.serviceType
        }
      }
    })
    setEvents(formattedEvents)
  }, [appointments])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return '#10b981'
      case 'pending':
        return '#f59e0b'
      case 'cancelled':
        return '#ef4444'
      default:
        return '#8b5cf6'
    }
  }

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
            <CalendarIcon className="h-10 w-10 text-primary" />
            Calendar View
          </h1>
          <p className="text-muted-foreground mt-2">View all your appointments in calendar format</p>
        </div>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#8b5cf6]"></div>
              <span className="text-sm">Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#10b981]"></div>
              <span className="text-sm">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#f59e0b]"></div>
              <span className="text-sm">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#ef4444]"></div>
              <span className="text-sm">Cancelled</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card className="border-2 shadow-lg">
        <CardContent className="p-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
            height="auto"
            editable={false}
            selectable={false}
            eventDisplay="block"
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: 'short'
            }}
            eventClick={(info) => {
              const event = info.event
              const extendedProps = event.extendedProps
              alert(
                `Appointment: ${event.title}\n` +
                `Status: ${extendedProps.status || 'Scheduled'}\n` +
                `Service: ${extendedProps.serviceType || 'N/A'}\n` +
                (extendedProps.description ? `Description: ${extendedProps.description}` : '')
              )
            }}
            className="fc-theme-standard"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default Calendar
