import React from 'react';
import { Calendar, Mail, MoreVertical, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
  lastVisit: string;
  totalVisits: number;
  status: 'active' | 'inactive';
}

interface PatientCardProps {
  patient: Patient;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onSchedule?: (id: string) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onView,
  onEdit,
  onSchedule,
}) => {
  return (
    <div className="glass rounded-xl p-5 hover-lift animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-primary/20">
            <AvatarImage src={patient.image} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg text-foreground">{patient.name}</h3>
            <Badge 
              variant="outline" 
              className={patient.status === 'active' 
                ? 'bg-success/10 text-success border-success/20' 
                : 'bg-muted text-muted-foreground'
              }
            >
              {patient.status === 'active' ? 'Active Patient' : 'Inactive'}
            </Badge>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView?.(patient.id)}>
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(patient.id)}>
              Edit Patient
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSchedule?.(patient.id)}>
              Schedule Appointment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{patient.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Last visit: {patient.lastVisit}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{patient.totalVisits}</span> total visits
        </span>
        <Button 
          size="sm" 
          onClick={() => onSchedule?.(patient.id)}
          className="gradient-primary text-primary-foreground border-0"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
};
