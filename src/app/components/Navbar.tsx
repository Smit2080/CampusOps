import React, { useState } from 'react';
import { Menu, X, Bell, User as UserIcon, LogOut, Settings, MessageSquare, AlertCircle } from 'lucide-react';
import { Logo } from './Logo';
import { User } from '../mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ScrollArea } from "./ui/scroll-area"
import { toast } from "sonner";
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  onOpenSettings: () => void;
  currentView: string;
}

export function Navbar({ user, onLogout, onNavigate, onOpenSettings, currentView }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const isLoggedIn = !!user;

  // Function to handle scrolling to sections or navigating
  const handleNavClick = (view: string, sectionId?: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleMarkAllRead = () => {
    if (unreadCount > 0) {
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } else {
      toast.info("No unread notifications");
    }
  };

  const notifications = [
    { id: 1, title: 'Request Updated', desc: 'Your water issue request is now In Progress', time: '2m ago', icon: AlertCircle, color: 'text-blue-500' },
    { id: 2, title: 'New Announcement', desc: 'Campus library will be closed this Sunday', time: '1h ago', icon: MessageSquare, color: 'text-amber-500' },
    { id: 3, title: 'Welcome!', desc: 'Welcome to CampusOps platform.', time: '1d ago', icon: UserIcon, color: 'text-green-500' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <button onClick={() => handleNavClick('landing')} className="focus:outline-none">
            <Logo />
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex md:gap-6">
            {navLinks.filter(l => l.show).map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view, link.section)}
                className={`text-sm font-medium transition-colors ${
                  currentView === link.view && !link.section ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {/* Notifications Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="relative text-slate-500 hover:text-slate-700 transition-colors outline-none p-2 rounded-full hover:bg-slate-100">
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h4 className="font-semibold text-sm text-slate-900">Notifications</h4>
                    {unreadCount > 0 && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">{unreadCount} New</span>}
                  </div>
                  <ScrollArea className="h-[300px]">
                    <div className="divide-y divide-slate-100">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                          <div className={`mt-1 ${notif.color}`}>
                            <notif.icon size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{notif.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{notif.desc}</p>
                            <p className="text-[10px] text-slate-400 mt-2">{notif.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-2 border-t border-slate-100 text-center">
                    <button 
                      onClick={handleMarkAllRead}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 w-full py-2 hover:bg-slate-50 rounded-md transition-colors"
                    >
                      Mark all as read
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-9 w-9 border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-slate-500">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onOpenSettings} className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onOpenSettings} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => handleNavClick('student-login')}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => handleNavClick('role-selection')}
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all hover:shadow-blue-200 hover:shadow-lg"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-6 space-y-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {navLinks.filter(l => l.show).map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.view, link.section)}
                className="text-left text-base font-medium text-slate-600"
              >
                {link.label}
              </button>
            ))}
            {!isLoggedIn && (
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={() => handleNavClick('student-login')}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleNavClick('role-selection')}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

const navLinks = [
  { label: 'Home', view: 'landing', show: true }, // Logic handled in render
  { label: 'Features', view: 'landing', section: 'features', show: true },
  { label: 'About', view: 'landing', section: 'about', show: true },
];
