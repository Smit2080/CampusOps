import React from 'react';
import { motion } from 'motion/react';
import { X, Download, FileText, Calendar, TrendingUp, Users, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { ServiceRequest } from '../mockData';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

interface ReportViewProps {
  requests: ServiceRequest[];
  onClose: () => void;
}

export function ReportView({ requests, onClose }: ReportViewProps) {
  const totalRequests = requests.length;
  const resolvedRequests = requests.filter(r => r.status === 'Resolved').length;
  const pendingRequests = requests.filter(r => r.status === 'Submitted').length;
  const inProgressRequests = requests.filter(r => r.status === 'In Progress').length;
  const resolutionRate = totalRequests > 0 ? ((resolvedRequests / totalRequests) * 100).toFixed(1) : '0';

  // Category breakdown
  const categoryCount: Record<string, number> = {};
  requests.forEach(r => {
    categoryCount[r.serviceType] = (categoryCount[r.serviceType] || 0) + 1;
  });
  const topCategories = Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Date for report
  const reportDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleDownloadPDF = () => {
    toast.success("PDF report downloaded! (Simulated)");
  };

  const handleDownloadCSV = () => {
    toast.success("CSV report downloaded! (Simulated)");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl text-white">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Analytics Report</h2>
              <p className="text-sm text-slate-500">Generated on {reportDate}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
          {/* Executive Summary */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={20} />
              Executive Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-500">Total Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{totalRequests}</div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                    <FileText size={12} />
                    All time
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-500">Resolved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600">{resolvedRequests}</div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600">
                    <CheckCircle2 size={12} />
                    {resolutionRate}% rate
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-500">In Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">{inProgressRequests}</div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-amber-600">
                    <Clock size={12} />
                    Being handled
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-500">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{pendingRequests}</div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                    <AlertTriangle size={12} />
                    Awaiting action
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Category Breakdown */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              Top Request Categories
            </h3>
            <div className="space-y-3">
              {topCategories.map(([category, count], index) => {
                const percentage = ((count / totalRequests) * 100).toFixed(1);
                return (
                  <div key={category} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-slate-900">{category}</span>
                        <span className="text-sm text-slate-500">{count} requests ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <Separator />

          {/* Performance Metrics */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600" size={20} />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <div className="text-sm font-medium text-emerald-700 mb-1">Resolution Rate</div>
                <div className="text-3xl font-bold text-emerald-900">{resolutionRate}%</div>
                <div className="text-xs text-emerald-600 mt-2">Above industry average (65%)</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="text-sm font-medium text-blue-700 mb-1">Avg. Response Time</div>
                <div className="text-3xl font-bold text-blue-900">2.4 hrs</div>
                <div className="text-xs text-blue-600 mt-2">24% faster than last month</div>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <div className="text-sm font-medium text-purple-700 mb-1">User Satisfaction</div>
                <div className="text-3xl font-bold text-purple-900">4.6/5</div>
                <div className="text-xs text-purple-600 mt-2">Based on 156 ratings</div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Recommendations */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recommendations</h3>
            <div className="space-y-3">
              <div className="flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="text-blue-600 mt-0.5">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Increase Staff in Top Categories</h4>
                  <p className="text-sm text-slate-600">Consider allocating more resources to "{topCategories[0]?.[0]}" which has the highest volume.</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <div className="text-amber-600 mt-0.5">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Reduce Pending Backlog</h4>
                  <p className="text-sm text-slate-600">{pendingRequests} requests are still pending. Prioritize oldest submissions first.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="text-sm text-slate-500">
            <Calendar size={14} className="inline mr-1" />
            Report Period: All Time
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadCSV}>
              <Download size={16} className="mr-2" />
              Download CSV
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleDownloadPDF}>
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
