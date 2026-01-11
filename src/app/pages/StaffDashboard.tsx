import React, { useState } from 'react';
import { User, ServiceRequest, RequestStatus } from '../mockData';
import { Filter, Search, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { toast } from "sonner"

interface StaffDashboardProps {
  user: User;
  requests: ServiceRequest[];
  onRequestUpdate: (id: string, status: RequestStatus, remarks?: string) => void;
}

export function StaffDashboard({ user, requests, onRequestUpdate }: StaffDashboardProps) {
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [remarks, setRemarks] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter requests
  const filteredRequests = requests.filter(r => {
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    const matchesSearch = r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleStatusUpdate = (status: RequestStatus) => {
    if (!selectedRequest) return;
    
    onRequestUpdate(selectedRequest.id, status, remarks);
    setIsDialogOpen(false);
    setRemarks('');
    setSelectedRequest(null);
    toast.success(`Request marked as ${status}`);
  };

  const openActionDialog = (req: ServiceRequest) => {
    setSelectedRequest(req);
    setRemarks(req.remarks || '');
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Submitted': return 'bg-blue-100 text-blue-700';
      case 'In Progress': return 'bg-amber-100 text-amber-700';
      case 'Resolved': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500">Manage and respond to student service requests.</p>
        </div>
        <div className="flex items-center gap-2">
           <Badge variant="outline" className="px-3 py-1 bg-white border-slate-200 text-slate-600">
             {filteredRequests.length} Requests Found
           </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by student name, ID or issue..."
            className="pl-9 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {(['All', 'Submitted', 'In Progress', 'Resolved'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                filterStatus === status 
                  ? "bg-slate-900 text-white" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((req) => (
          <motion.div
            key={req.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow border-slate-200 overflow-hidden flex flex-col h-full">
              <div className={clsx("h-1.5 w-full", getStatusColor(req.status).replace('text-', 'bg-').split(' ')[0])} />
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={clsx("hover:bg-opacity-80", getStatusColor(req.status))}>
                    {req.status}
                  </Badge>
                  <span className="text-xs text-slate-400">{req.date}</span>
                </div>
                <CardTitle className="text-lg leading-tight">{req.serviceType}</CardTitle>
                <CardDescription className="line-clamp-1">{req.studentName} ({req.studentId})</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-3">
                <div className="space-y-3 text-sm text-slate-600">
                  <p className="bg-slate-50 p-3 rounded-md border border-slate-100">
                    "{req.description}"
                  </p>
                  {req.location && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="font-semibold text-xs uppercase tracking-wide">Location:</span>
                      <span>{req.location}</span>
                    </div>
                  )}
                  {req.remarks && (
                     <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-800 border border-yellow-100">
                       <span className="font-semibold">Note:</span> {req.remarks}
                     </div>
                  )}
                </div>
              </CardContent>
              <div className="p-4 pt-0 mt-auto border-t border-slate-50 bg-slate-50/50 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  onClick={() => openActionDialog(req)}
                >
                  Manage Request
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-400">
            <Filter size={48} className="mx-auto mb-4 opacity-20" />
            <p>No requests found matching your criteria.</p>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Request Status</DialogTitle>
            <DialogDescription>
              Change status for {selectedRequest?.serviceType} from {selectedRequest?.studentName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Status</Label>
              <div className="flex gap-2">
                <Badge className={getStatusColor(selectedRequest?.status || '')}>
                  {selectedRequest?.status}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Textarea 
                id="remarks" 
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add notes about resolution or delays..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                type="button" 
                variant="secondary"
                className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200"
                onClick={() => handleStatusUpdate('In Progress')}
              >
                <Clock className="mr-2 h-4 w-4" />
                Mark In Progress
              </Button>
              <Button 
                type="button" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => handleStatusUpdate('Resolved')}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Resolved
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}