import React, { useState } from 'react';
import { Calendar, Filter, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Video, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentRow {
  id: string;
  patientName: string;
  patientImage?: string;
  patientEmail: string;
  date: string;
  time: string;
  duration: string;
  service: string;
  type: 'in-person' | 'video';
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  amount: string;
}

const statusStyles = {
  confirmed: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
  completed: 'bg-muted text-muted-foreground border-muted',
};

const mockAppointments: AppointmentRow[] = [
  {
    id: '1',
    patientName: 'Emily Johnson',
    patientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    patientEmail: 'emily.j@email.com',
    date: 'Dec 9, 2024',
    time: '9:00 AM',
    duration: '30 min',
    service: 'Skin Consultation',
    type: 'in-person',
    status: 'confirmed',
    amount: '$150',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    patientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    patientEmail: 'michael.c@email.com',
    date: 'Dec 9, 2024',
    time: '10:00 AM',
    duration: '45 min',
    service: 'Follow-up Session',
    type: 'video',
    status: 'confirmed',
    amount: '$120',
  },
  {
    id: '3',
    patientName: 'Sarah Williams',
    patientEmail: 'sarah.w@email.com',
    date: 'Dec 9, 2024',
    time: '11:30 AM',
    duration: '30 min',
    service: 'Acne Treatment',
    type: 'in-person',
    status: 'pending',
    amount: '$200',
  },
  {
    id: '4',
    patientName: 'David Brown',
    patientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    patientEmail: 'david.b@email.com',
    date: 'Dec 10, 2024',
    time: '2:00 PM',
    duration: '60 min',
    service: 'Full Body Check',
    type: 'in-person',
    status: 'confirmed',
    amount: '$300',
  },
  {
    id: '5',
    patientName: 'Lisa Anderson',
    patientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    patientEmail: 'lisa.a@email.com',
    date: 'Dec 8, 2024',
    time: '3:00 PM',
    duration: '30 min',
    service: 'Consultation',
    type: 'video',
    status: 'completed',
    amount: '$100',
  },
  {
    id: '6',
    patientName: 'James Wilson',
    patientEmail: 'james.w@email.com',
    date: 'Dec 7, 2024',
    time: '10:00 AM',
    duration: '30 min',
    service: 'Follow-up',
    type: 'in-person',
    status: 'cancelled',
    amount: '$0',
  },
];

const Appointments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAppointments = mockAppointments.filter((apt) => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your appointments
          </p>
        </div>
        <Button className="gradient-primary text-primary-foreground border-0 shadow-glow">
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground">24</p>
          <p className="text-sm text-muted-foreground">Total Today</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-success">18</p>
          <p className="text-sm text-muted-foreground">Confirmed</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-warning">4</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-destructive">2</p>
          <p className="text-sm text-muted-foreground">Cancelled</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient name or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Patient</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id} className="hover:bg-secondary/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={appointment.patientImage} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {appointment.patientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.patientEmail}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium text-foreground">{appointment.date}</p>
                  <p className="text-sm text-muted-foreground">{appointment.time} • {appointment.duration}</p>
                </TableCell>
                <TableCell>
                  <p className="text-foreground">{appointment.service}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {appointment.type === 'video' ? (
                      <Video className="h-4 w-4 text-info" />
                    ) : (
                      <MapPin className="h-4 w-4 text-primary" />
                    )}
                    <span className="text-sm text-muted-foreground capitalize">
                      {appointment.type === 'video' ? 'Video' : 'In-Person'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn('capitalize', statusStyles[appointment.status])}
                  >
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p className="font-semibold text-foreground">{appointment.amount}</p>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Appointments;
