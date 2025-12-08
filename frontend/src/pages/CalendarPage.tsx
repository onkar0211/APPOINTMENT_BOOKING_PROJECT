import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'procedure' | 'video';
  patientName: string;
}

const eventColors = {
  consultation: 'bg-primary/20 border-l-primary text-primary',
  'follow-up': 'bg-success/20 border-l-success text-success',
  procedure: 'bg-warning/20 border-l-warning text-warning',
  video: 'bg-info/20 border-l-info text-info',
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

const mockEvents: Record<string, CalendarEvent[]> = {
  '2024-12-09': [
    { id: '1', title: 'Skin Consultation', time: '9:00', duration: 30, type: 'consultation', patientName: 'Emily Johnson' },
    { id: '2', title: 'Follow-up', time: '10:00', duration: 45, type: 'follow-up', patientName: 'Michael Chen' },
    { id: '3', title: 'Video Call', time: '14:00', duration: 30, type: 'video', patientName: 'Sarah Williams' },
  ],
  '2024-12-10': [
    { id: '4', title: 'Procedure', time: '11:00', duration: 60, type: 'procedure', patientName: 'David Brown' },
    { id: '5', title: 'Consultation', time: '15:00', duration: 30, type: 'consultation', patientName: 'Lisa Anderson' },
  ],
  '2024-12-11': [
    { id: '6', title: 'Follow-up', time: '9:30', duration: 30, type: 'follow-up', patientName: 'James Wilson' },
  ],
};

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');

  const getWeekDates = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Manage your appointments and schedule
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Select value={view} onValueChange={(v) => setView(v as 'week' | 'month')}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gradient-primary text-primary-foreground border-0 shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <Button variant="ghost" size="icon" onClick={() => navigateWeek('next')}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
            Today
          </Button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm text-muted-foreground">Follow-up</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-sm text-muted-foreground">Procedure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-info" />
            <span className="text-sm text-muted-foreground">Video Call</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Day Headers */}
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="p-2 text-sm font-medium text-muted-foreground">Time</div>
              {weekDates.map((date, index) => (
                <div 
                  key={index} 
                  className={cn(
                    'p-2 text-center rounded-lg',
                    isToday(date) && 'bg-primary/10'
                  )}
                >
                  <p className="text-sm font-medium text-muted-foreground">
                    {daysOfWeek[date.getDay()]}
                  </p>
                  <p className={cn(
                    'text-2xl font-bold',
                    isToday(date) ? 'text-primary' : 'text-foreground'
                  )}>
                    {date.getDate()}
                  </p>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="border border-border rounded-xl overflow-hidden">
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-8 gap-px bg-border">
                  <div className="bg-card p-2 text-sm text-muted-foreground">
                    {time}
                  </div>
                  {weekDates.map((date, dayIndex) => {
                    const dateKey = formatDateKey(date);
                    const events = mockEvents[dateKey]?.filter(e => e.time === time) || [];
                    
                    return (
                      <div 
                        key={dayIndex} 
                        className={cn(
                          'bg-card p-1 min-h-[60px] hover:bg-secondary/50 transition-colors cursor-pointer',
                          isToday(date) && 'bg-primary/5'
                        )}
                      >
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className={cn(
                              'rounded-md p-2 text-xs border-l-2 mb-1',
                              eventColors[event.type]
                            )}
                          >
                            <p className="font-medium truncate">{event.title}</p>
                            <p className="opacity-75 truncate">{event.patientName}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
