import React from 'react';
import { Calendar, Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { AppointmentCard, Appointment } from '@/components/shared/AppointmentCard';
import { Button } from '@/components/ui/button';

const stats = [
  {
    title: "Today's Appointments",
    value: 12,
    change: '+3 from yesterday',
    changeType: 'positive' as const,
    icon: Calendar,
  },
  {
    title: 'Total Patients',
    value: '1,284',
    change: '+48 this month',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Revenue (MTD)',
    value: '$24,580',
    change: '+12.5% vs last month',
    changeType: 'positive' as const,
    icon: DollarSign,
  },
  {
    title: 'Avg. Wait Time',
    value: '8 min',
    change: '-2 min improvement',
    changeType: 'positive' as const,
    icon: Clock,
  },
];

const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Emily Johnson',
    patientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    time: '9:00 AM',
    duration: '30 min',
    type: 'in-person',
    status: 'confirmed',
    service: 'Skin Consultation',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    patientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    time: '10:00 AM',
    duration: '45 min',
    type: 'video',
    status: 'confirmed',
    service: 'Follow-up Session',
  },
  {
    id: '3',
    patientName: 'Sarah Williams',
    time: '11:30 AM',
    duration: '30 min',
    type: 'in-person',
    status: 'pending',
    service: 'Acne Treatment',
  },
  {
    id: '4',
    patientName: 'David Brown',
    patientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    time: '2:00 PM',
    duration: '60 min',
    type: 'in-person',
    status: 'confirmed',
    service: 'Full Body Check',
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Good Morning, Dr. Sarah! 👋</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your practice today.
          </p>
        </div>
        <Button className="gradient-primary text-primary-foreground border-0 shadow-glow">
          <Calendar className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Today's Schedule</h2>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          <div className="grid gap-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start h-11">
                <Users className="h-4 w-4 mr-3 text-primary" />
                Add New Patient
              </Button>
              <Button variant="outline" className="w-full justify-start h-11">
                <Calendar className="h-4 w-4 mr-3 text-primary" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start h-11">
                <TrendingUp className="h-4 w-4 mr-3 text-primary" />
                View Analytics
              </Button>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { text: 'Emily Johnson checked in', time: '2 min ago', type: 'check-in' },
                { text: 'New appointment booked', time: '15 min ago', type: 'booking' },
                { text: 'Payment received - $150', time: '1 hour ago', type: 'payment' },
                { text: 'Prescription sent to pharmacy', time: '2 hours ago', type: 'prescription' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
