import React, { useState } from 'react';
import { User, ServiceRequest, SERVICE_TYPES } from '../mockData';
import { Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"
import { toast } from "sonner"

interface StudentDashboardProps {
  user: User;
  requests: ServiceRequest[];
  onRequestSubmit: (req: ServiceRequest) => void;
}

export function StudentDashboard({ user, requests, onRequestSubmit }: StudentDashboardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: '',
    location: '',
    description: ''
  });

  // Filter requests for this student
  const myRequests = requests.filter(r => r.studentId === user.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.serviceType || !formData.description) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRequest: ServiceRequest = {
        id: Date.now().toString(),
        studentId: user.id,
        studentName: user.name,
        serviceType: formData.serviceType,
        location: formData.location,
        description: formData.description,
        status: 'Submitted',
        date: new Date().toISOString().split('T')[0]
      };
      
      onRequestSubmit(newRequest);
      setFormData({ serviceType: '', location: '', description: '' });
      setIsSubmitting(false);
      toast.success("Request submitted successfully!");
    }, 800);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Submitted': return 'bg-blue-100 text-blue-700 hover:bg-blue-100/80';
      case 'In Progress': return 'bg-amber-100 text-amber-700 hover:bg-amber-100/80';
      case 'Resolved': return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80';
      default: return 'bg-slate-100 text-slate-700 hover:bg-slate-100/80';
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500">Track your service requests and submit new ones.</p>
        </div>
        <div className="flex gap-3">
          <Card className="p-3 flex items-center gap-3 bg-blue-50 border-blue-100 shadow-none">
            <div className="p-2 bg-blue-100 rounded-full text-blue-600"><AlertCircle size={18} /></div>
            <div>
              <p className="text-xs text-blue-600 font-semibold uppercase">Pending</p>
              <p className="text-lg font-bold text-blue-900">{myRequests.filter(r => r.status === 'Submitted').length}</p>
            </div>
          </Card>
          <Card className="p-3 flex items-center gap-3 bg-emerald-50 border-emerald-100 shadow-none">
            <div className="p-2 bg-emerald-100 rounded-full text-emerald-600"><CheckCircle2 size={18} /></div>
            <div>
              <p className="text-xs text-emerald-600 font-semibold uppercase">Resolved</p>
              <p className="text-lg font-bold text-emerald-900">{myRequests.filter(r => r.status === 'Resolved').length}</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Request Form */}
        <div className="lg:col-span-1">
          <Card className="border-t-4 border-t-blue-600 shadow-md">
            <CardHeader>
              <CardTitle>New Request</CardTitle>
              <CardDescription>Report an issue or request a service.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select 
                    value={formData.serviceType} 
                    onValueChange={(val) => setFormData({...formData, serviceType: val})}
                  >
                    <SelectTrigger id="service-type">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input 
                    id="location" 
                    placeholder="e.g. Block A, Room 101" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the issue in detail..." 
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  disabled={isSubmitting || !formData.serviceType || !formData.description}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* My Requests List */}
        <div className="lg:col-span-2">
          <Card className="h-full shadow-sm">
            <CardHeader>
              <CardTitle>My Requests</CardTitle>
              <CardDescription>Real-time status of your submitted issues.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myRequests.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <p>No requests submitted yet.</p>
                  </div>
                ) : (
                  myRequests.map((req) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{req.serviceType}</span>
                          <span className="text-xs text-slate-400">• {req.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-1">{req.description}</p>
                        {req.location && (
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            📍 {req.location}
                          </p>
                        )}
                        {req.remarks && (
                          <p className="text-xs text-slate-500 mt-2 bg-yellow-50 p-2 rounded border border-yellow-100">
                            <span className="font-semibold text-yellow-700">Staff Remark:</span> {req.remarks}
                          </p>
                        )}
                      </div>
                      <Badge className={clsx("w-fit whitespace-nowrap", getStatusColor(req.status))}>
                        {req.status}
                      </Badge>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
