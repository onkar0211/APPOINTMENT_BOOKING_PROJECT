import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppointments } from '../context/AppointmentContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select } from '../components/ui/select'
import { Label } from '../components/ui/label'
import { AlertWithIcon } from '../components/ui/alert'
import { Calendar, Clock, User, FileText, Building2, Sparkles } from 'lucide-react'
import { BUSINESS_TYPES } from '../utils/businessTypes'

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '30',
    businessType: 'healthcare',
    serviceType: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { createAppointment } = useAppointments()
  const navigate = useNavigate()

  const selectedBusiness = BUSINESS_TYPES[formData.businessType] || BUSINESS_TYPES.other

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
      // Reset serviceType when businessType changes
      ...(name === 'businessType' && { serviceType: '' })
    })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Combine date and time
    const dateTime = new Date(`${formData.date}T${formData.time}`)
    
    if (dateTime < new Date()) {
      setError('Appointment date and time must be in the future')
      setLoading(false)
      return
    }

    if (!formData.serviceType && selectedBusiness.services.length > 0) {
      setError('Please select a service type')
      setLoading(false)
      return
    }

    const appointmentData = {
      title: formData.title,
      description: formData.description,
      date: dateTime.toISOString(),
      duration: parseInt(formData.duration),
      businessType: formData.businessType,
      serviceType: formData.serviceType,
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone
    }

    const result = await createAppointment(appointmentData)
    
    if (result.success) {
      setSuccess('Appointment booked successfully!')
      setTimeout(() => {
        navigate('/appointments')
      }, 1500)
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Book New Appointment
        </h1>
        <p className="text-muted-foreground">Schedule your appointment with ease</p>
      </div>
      
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Appointment Details
          </CardTitle>
          <CardDescription>Fill in the details to book your appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <AlertWithIcon variant="destructive" title="Error">
                {error}
              </AlertWithIcon>
            )}
            
            {success && (
              <AlertWithIcon variant="success" title="Success">
                {success}
              </AlertWithIcon>
            )}

            {/* Business Type Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Business Category *
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {Object.entries(BUSINESS_TYPES).map(([key, business]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleChange({ target: { name: 'businessType', value: key } })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.businessType === key
                        ? `${business.color} border-2 scale-105 shadow-md`
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{business.icon}</div>
                    <div className="text-sm font-medium">{business.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Type */}
            {selectedBusiness.services.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service...</option>
                  {selectedBusiness.services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </Select>
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Appointment Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Annual Health Checkup"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date *
                </Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={today}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time *
                </Label>
                <Input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
                <option value="180">3 hours</option>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Additional details about your appointment..."
                rows="4"
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Information (Optional)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
                size="lg"
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                size="lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BookAppointment
