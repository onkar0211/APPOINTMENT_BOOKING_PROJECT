import React from 'react';
import { Clock, MoreVertical, User, Video, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface Appointment {
  id: string;
  patientName: string;
  patientImage?: string;
  time: string;
  duration: string;
  type: 'in-person' | 'video';
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  service: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit?: (id: string) => void;
  onCancel?: (id: string) => void;
  onView?: (id: string) => void;
}

const statusStyles = {
  confirmed: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
  completed: 'bg-muted text-muted-foreground border-muted',
};

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onEdit,
  onCancel,
  onView,
}) => {
  const { patientName, patientImage, time, duration, type, status, service } = appointment;

  return (
    <div className="glass rounded-xl p-4 hover-lift animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 border-2 border-primary/20">
            <AvatarImage src={patientImage} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {patientName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-foreground">{patientName}</h4>
            <p className="text-sm text-muted-foreground">{service}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView?.(appointment.id)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(appointment.id)}>
              Edit Appointment
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onCancel?.(appointment.id)}
              className="text-destructive"
            >
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
          <span className="text-muted-foreground/50">•</span>
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {type === 'video' ? (
            <Video className="h-4 w-4 text-info" />
          ) : (
            <MapPin className="h-4 w-4 text-primary" />
          )}
          <span className="capitalize">{type === 'video' ? 'Video Call' : 'In-Person'}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Badge 
          variant="outline" 
          className={cn('capitalize font-medium', statusStyles[status])}
        >
          {status}
        </Badge>
        {status === 'confirmed' && type === 'video' && (
          <Button size="sm" className="h-8 gradient-primary text-primary-foreground border-0">
            Join Call
          </Button>
        )}
      </div>
    </div>
  );
};
