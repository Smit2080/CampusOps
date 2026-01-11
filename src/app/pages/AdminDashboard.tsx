import React, { useState } from 'react';
import { ServiceRequest, User } from '../mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Users, FileText, CheckCircle2, AlertTriangle, Settings, Palette, Bell, FileDown } from 'lucide-react';
import { toast } from "sonner";
import { motion } from 'motion/react';
import { ReportView } from '../components/ReportView';
import { Switch } from '../components/ui/switch';

interface AdminDashboardProps {
  user: User;
  requests: ServiceRequest[];
  onOpenSettings: () => void;
}

export function AdminDashboard({ user, requests, onOpenSettings }: AdminDashboardProps) {
  const [showReport, setShowReport] = useState(false);
  const [systemSettings, setSystemSettings] = useState({
    colorTheme: 'Brand Blue',
    systemAlerts: false
  });

  // --- Analytics Logic ---
  const totalRequests = requests.length;
  const resolvedRequests = requests.filter(r => r.status === 'Resolved').length;
  const pendingRequests = requests.filter(r => r.status === 'Submitted').length;
  const progressRequests = requests.filter(r => r.status === 'In Progress').length;

  const statusData = [
    { name: 'Submitted', value: pendingRequests, color: '#3B82F6' },
    { name: 'In Progress', value: progressRequests, color: '#F59E0B' },
    { name: 'Resolved', value: resolvedRequests, color: '#10B981' },
  ];

  // Group by category (Service Type)
  const categoryCount: Record<string, number> = {};
  requests.forEach(r => {
    categoryCount[r.serviceType] = (categoryCount[r.serviceType] || 0) + 1;
  });
  
  const categoryData = Object.keys(categoryCount).map(key => ({
    name: key,
    count: categoryCount[key]
  })).sort((a, b) => b.count - a.count).slice(0, 5); // Top 5

  const handleGenerateReport = () => {
    setShowReport(true);
  };

  const handleQuickSetting = (setting: string, newValue?: any) => {
    if (setting === 'Color Theme') {
      toast.success(`Color theme updated successfully!`);
    } else if (setting === 'System Alerts') {
      setSystemSettings(prev => ({ ...prev, systemAlerts: !prev.systemAlerts }));
      toast.success(`System alerts ${!systemSettings.systemAlerts ? 'enabled' : 'disabled'}!`);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard - Welcome, {user.name}! 👋</h1>
          <p className="text-slate-500">System overview and performance analytics.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={onOpenSettings}
             className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
           >
             <Settings size={16} /> Settings
           </button>
           <button 
             onClick={handleGenerateReport}
             className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 shadow-sm transition-all active:scale-95"
           >
             <FileDown size={16} /> Generate Report
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Total Requests</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{totalRequests}</div>
              <p className="text-xs text-slate-500">+12% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Resolved</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{resolvedRequests}</div>
              <div className="mt-1 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500" style={{ width: `${(resolvedRequests/totalRequests)*100}%` }}></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Pending</CardTitle>
              <AlertTriangle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{pendingRequests}</div>
              <p className="text-xs text-slate-500">Requires attention</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Active Users</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">1,240</div>
              <p className="text-xs text-slate-500">Students & Staff</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
           <CardHeader>
             <CardTitle>Request Categories</CardTitle>
             <CardDescription>Top issues reported by students</CardDescription>
           </CardHeader>
           <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                 <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
           </CardContent>
        </Card>

        <Card>
           <CardHeader>
             <CardTitle>Resolution Status</CardTitle>
             <CardDescription>Current state of all service tickets</CardDescription>
           </CardHeader>
           <CardContent className="h-[300px] flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={statusData}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {statusData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
               </PieChart>
             </ResponsiveContainer>
             <div className="flex flex-col gap-2 ml-4">
               {statusData.map((item) => (
                 <div key={item.name} className="flex items-center gap-2 text-sm">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-slate-600">{item.name}: <b>{item.value}</b></span>
                 </div>
               ))}
             </div>
           </CardContent>
        </Card>
      </div>

      {/* Admin Settings Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Settings</CardTitle>
          <CardDescription>Manage application preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div 
               className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
               onClick={() => handleQuickSetting('Color Theme')}
             >
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Palette size={20} /></div>
                 <div>
                   <h4 className="font-semibold text-slate-900">Color Theme</h4>
                   <p className="text-sm text-slate-500">Currently: Brand Blue</p>
                 </div>
               </div>
               <Badge variant="outline">Default</Badge>
             </div>
             <div 
               className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
               onClick={() => handleQuickSetting('System Alerts')}
             >
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Bell size={20} /></div>
                 <div>
                   <h4 className="font-semibold text-slate-900">System Alerts</h4>
                   <p className="text-sm text-slate-500">Notify all users</p>
                 </div>
               </div>
               <Switch checked={systemSettings.systemAlerts} />
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Report View */}
      {showReport && (
        <ReportView
          requests={requests}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}