import React, { useState } from 'react';
import { Download, CreditCard, DollarSign, TrendingUp, Calendar, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatCard } from '@/components/shared/StatCard';
import { cn } from '@/lib/utils';

interface Payment {
  id: string;
  patientName: string;
  date: string;
  service: string;
  amount: string;
  method: 'card' | 'cash' | 'insurance';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  invoiceNo: string;
}

const statusStyles = {
  completed: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
  refunded: 'bg-muted text-muted-foreground border-muted',
};

const mockPayments: Payment[] = [
  {
    id: '1',
    patientName: 'Emily Johnson',
    date: 'Dec 9, 2024',
    service: 'Skin Consultation',
    amount: '$150.00',
    method: 'card',
    status: 'completed',
    invoiceNo: 'INV-2024-001',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    date: 'Dec 8, 2024',
    service: 'Follow-up Session',
    amount: '$120.00',
    method: 'insurance',
    status: 'pending',
    invoiceNo: 'INV-2024-002',
  },
  {
    id: '3',
    patientName: 'Sarah Williams',
    date: 'Dec 7, 2024',
    service: 'Acne Treatment',
    amount: '$200.00',
    method: 'card',
    status: 'completed',
    invoiceNo: 'INV-2024-003',
  },
  {
    id: '4',
    patientName: 'David Brown',
    date: 'Dec 6, 2024',
    service: 'Full Body Check',
    amount: '$300.00',
    method: 'cash',
    status: 'completed',
    invoiceNo: 'INV-2024-004',
  },
  {
    id: '5',
    patientName: 'Lisa Anderson',
    date: 'Dec 5, 2024',
    service: 'Consultation',
    amount: '$100.00',
    method: 'card',
    status: 'refunded',
    invoiceNo: 'INV-2024-005',
  },
  {
    id: '6',
    patientName: 'James Wilson',
    date: 'Dec 4, 2024',
    service: 'Treatment Plan',
    amount: '$250.00',
    method: 'insurance',
    status: 'failed',
    invoiceNo: 'INV-2024-006',
  },
];

const Payments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPayments = mockPayments.filter((payment) =>
    payment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground mt-1">
            Track billing history and manage payments
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="gradient-primary text-primary-foreground border-0 shadow-glow">
            <CreditCard className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$24,580"
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Pending Payments"
          value="$1,240"
          change="8 invoices pending"
          changeType="neutral"
          icon={CreditCard}
        />
        <StatCard
          title="Average Transaction"
          value="$165"
          change="+5% improvement"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard
          title="This Week"
          value="$3,420"
          change="23 transactions"
          changeType="neutral"
          icon={Calendar}
        />
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient name or invoice number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="glass rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Invoice</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id} className="hover:bg-secondary/30">
                <TableCell>
                  <p className="font-medium text-foreground">{payment.invoiceNo}</p>
                </TableCell>
                <TableCell>
                  <p className="text-foreground">{payment.patientName}</p>
                </TableCell>
                <TableCell>
                  <p className="text-muted-foreground">{payment.date}</p>
                </TableCell>
                <TableCell>
                  <p className="text-foreground">{payment.service}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {payment.method}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn('capitalize', statusStyles[payment.status])}
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <p className="font-semibold text-foreground">{payment.amount}</p>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Payments;
