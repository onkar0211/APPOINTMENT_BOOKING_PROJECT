import React, { useState } from 'react';
import { Bell, Calendar, CreditCard, Check, CheckCheck, Filter, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'appointment' | 'payment' | 'system' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const typeIcons = {
  appointment: Calendar,
  payment: CreditCard,
  system: Settings,
  reminder: Bell,
};

const typeColors = {
  appointment: 'bg-primary/10 text-primary',
  payment: 'bg-success/10 text-success',
  system: 'bg-info/10 text-info',
  reminder: 'bg-warning/10 text-warning',
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'New Appointment Booked',
    message: 'Emily Johnson booked an appointment for Dec 10 at 9:00 AM',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Received',
    message: 'You received $150.00 from Michael Chen for consultation',
    time: '15 minutes ago',
    read: false,
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Upcoming Appointment',
    message: 'You have an appointment with Sarah Williams in 30 minutes',
    time: '30 minutes ago',
    read: false,
  },
  {
    id: '4',
    type: 'appointment',
    title: 'Appointment Cancelled',
    message: 'David Brown cancelled their appointment scheduled for Dec 11',
    time: '1 hour ago',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Profile Updated',
    message: 'Your business profile has been successfully updated',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '6',
    type: 'payment',
    title: 'Invoice Overdue',
    message: 'Invoice INV-2024-003 from Lisa Anderson is 5 days overdue',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '7',
    type: 'reminder',
    title: 'Weekly Summary',
    message: 'You completed 28 appointments this week. View your analytics.',
    time: '1 day ago',
    read: true,
  },
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !n.read;
    return n.type === activeTab;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with your latest activity
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </Button>
          {unreadCount > 0 && (
            <Button 
              onClick={markAllAsRead}
              className="gradient-primary text-primary-foreground border-0"
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
          <p className="text-sm text-muted-foreground">Unread</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">
            {notifications.filter(n => n.type === 'appointment').length}
          </p>
          <p className="text-sm text-muted-foreground">Appointments</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-success">
            {notifications.filter(n => n.type === 'payment').length}
          </p>
          <p className="text-sm text-muted-foreground">Payments</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-warning">
            {notifications.filter(n => n.type === 'reminder').length}
          </p>
          <p className="text-sm text-muted-foreground">Reminders</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="glass rounded-xl p-2">
          <TabsList className="w-full grid grid-cols-5 h-auto bg-transparent gap-2">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-destructive text-destructive-foreground h-5 w-5 p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="appointment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Appointments
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Payments
            </TabsTrigger>
            <TabsTrigger value="reminder" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Reminders
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const Icon = typeIcons[notification.type];
              
              return (
                <div
                  key={notification.id}
                  className={cn(
                    'glass rounded-xl p-4 flex items-start gap-4 cursor-pointer transition-all hover:shadow-lg',
                    !notification.read && 'border-l-4 border-l-primary'
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                    typeColors[notification.type]
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className={cn(
                          'font-semibold text-foreground',
                          !notification.read && 'text-primary'
                        )}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="glass rounded-xl p-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications found.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
