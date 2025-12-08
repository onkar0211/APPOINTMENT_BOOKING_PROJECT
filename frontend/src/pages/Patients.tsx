import React, { useState } from 'react';
import { Filter, Plus, Search, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PatientCard, Patient } from '@/components/shared/PatientCard';
import { cn } from '@/lib/utils';

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    email: 'emily.johnson@email.com',
    phone: '+1 (555) 123-4567',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    lastVisit: 'Dec 5, 2024',
    totalVisits: 12,
    status: 'active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastVisit: 'Dec 3, 2024',
    totalVisits: 8,
    status: 'active',
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    phone: '+1 (555) 345-6789',
    lastVisit: 'Nov 28, 2024',
    totalVisits: 5,
    status: 'active',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 456-7890',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    lastVisit: 'Nov 20, 2024',
    totalVisits: 3,
    status: 'active',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+1 (555) 567-8901',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    lastVisit: 'Oct 15, 2024',
    totalVisits: 15,
    status: 'active',
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 (555) 678-9012',
    lastVisit: 'Sep 10, 2024',
    totalVisits: 2,
    status: 'inactive',
  },
  {
    id: '7',
    name: 'Jennifer Taylor',
    email: 'jennifer.t@email.com',
    phone: '+1 (555) 789-0123',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    lastVisit: 'Dec 1, 2024',
    totalVisits: 7,
    status: 'active',
  },
  {
    id: '8',
    name: 'Robert Martinez',
    email: 'robert.m@email.com',
    phone: '+1 (555) 890-1234',
    lastVisit: 'Aug 22, 2024',
    totalVisits: 1,
    status: 'inactive',
  },
];

const Patients: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your patient records and profiles
          </p>
        </div>
        <Button className="gradient-primary text-primary-foreground border-0 shadow-glow">
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{mockPatients.length}</p>
          <p className="text-sm text-muted-foreground">Total Patients</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-success">
            {mockPatients.filter(p => p.status === 'active').length}
          </p>
          <p className="text-sm text-muted-foreground">Active</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">48</p>
          <p className="text-sm text-muted-foreground">New This Month</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-info">156</p>
          <p className="text-sm text-muted-foreground">Appointments (MTD)</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'rounded-none h-10',
                  viewMode === 'grid' && 'bg-secondary'
                )}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'rounded-none h-10',
                  viewMode === 'list' && 'bg-secondary'
                )}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Grid */}
      <div className={cn(
        'grid gap-6',
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      )}>
        {filteredPatients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No patients found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Patients;
