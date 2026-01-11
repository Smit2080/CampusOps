import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { GeminiAssistant } from './GeminiAssistant';
import { User } from '../mockData';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  onOpenSettings: () => void;
  currentView: string;
}

export function Layout({ children, user, onLogout, onNavigate, onOpenSettings, currentView }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar 
        user={user} 
        onLogout={onLogout} 
        onNavigate={onNavigate}
        onOpenSettings={onOpenSettings}
        currentView={currentView}
      />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
      {user && <GeminiAssistant />}
    </div>
  );
}
