import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, ShieldCheck } from 'lucide-react';

export function RoleSelection({ onSelect }: { onSelect: (role: string) => void }) {
  const roles = [
    {
      id: 'student-signup', // Goes to signup first
      title: 'Student',
      description: 'Access campus services, raise tickets, and track status.',
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      id: 'staff-login',
      title: 'Staff / Faculty',
      description: 'Manage requests, update status, and resolve issues.',
      icon: Briefcase,
      color: 'bg-purple-50 text-purple-600',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      id: 'admin-login', // Assuming admin login is similar to staff or separate
      title: 'Admin',
      description: 'System oversight, analytics, and user management.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
    },
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Choose Your Role</h2>
          <p className="mt-4 text-lg text-slate-600">Select how you interact with CampusOps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <div className={`w-20 h-20 rounded-2xl ${role.color} flex items-center justify-center mb-6`}>
                <role.icon size={36} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{role.title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">{role.description}</p>
              <button
                onClick={() => onSelect(role.id)}
                className={`mt-auto w-full py-3 px-6 rounded-xl text-white font-semibold transition-colors ${role.buttonColor}`}
              >
                Continue
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
