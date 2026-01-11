import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
        <ShieldCheck size={20} />
      </div>
      <span>Campus<span className="text-blue-600">Ops</span></span>
    </div>
  );
}
