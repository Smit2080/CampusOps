import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Moon, Sun, Bell, Shield, User, Smartphone, Volume2, Save, Edit2 } from 'lucide-react';
import { User as UserType } from '../mockData';
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { Input } from "./ui/input";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onUserUpdate: (user: UserType) => void;
}

export function SettingsModal({ isOpen, onClose, user, onUserUpdate }: SettingsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  const [preferences, setPreferences] = useState({
    darkMode: false,
    reduceMotion: false,
    emailNotifs: true,
    pushNotifs: true
  });

  // Update local state if user prop changes
  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = { ...user, name, email };
      onUserUpdate(updatedUser);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    }
  };

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      // Show feedback
      if (key === 'darkMode') toast.success(newState.darkMode ? "Dark mode enabled" : "Dark mode disabled");
      if (key === 'reduceMotion') toast.info(newState.reduceMotion ? "Motion reduced" : "Motion enabled");
      return newState;
    });
  };

  const handleSaveChanges = () => {
    toast.success("All settings saved successfully!");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Settings</h2>
              <p className="text-sm text-slate-500">Manage your preferences and account</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Profile Section */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                <User size={16} /> Profile Information
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <img 
                    src={user?.avatarUrl || "https://github.com/shadcn.png"} 
                    alt={user?.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="flex-1 w-full space-y-3 sm:space-y-1">
                  {isEditing ? (
                    <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                      <div>
                        <Label className="text-xs text-slate-500">Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} className="h-8 bg-white" />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-500">Email</Label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-8 bg-white" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-semibold text-slate-900">{name}</h4>
                      <p className="text-sm text-slate-500">{email}</p>
                      <p className="text-xs text-blue-600 font-medium mt-1 bg-blue-50 inline-block px-2 py-0.5 rounded-full capitalize">
                        {user?.role} Account
                      </p>
                    </>
                  )}
                </div>

                <div className="flex gap-2 self-start sm:self-center">
                  {isEditing ? (
                    <Button size="sm" onClick={handleSaveProfile} className="bg-emerald-600 hover:bg-emerald-700 h-8">
                      <Save size={14} className="mr-1.5" /> Save
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-8">
                      <Edit2 size={14} className="mr-1.5" /> Edit
                    </Button>
                  )}
                </div>
              </div>
            </section>

            <Separator />

            {/* Appearance */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                <Smartphone size={16} /> Appearance & Accessibility
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-slate-500">Switch between light and dark themes</p>
                  </div>
                  <Switch checked={preferences.darkMode} onCheckedChange={() => handleToggle('darkMode')} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Reduce Motion</Label>
                    <p className="text-sm text-slate-500">Minimize animations for accessibility</p>
                  </div>
                  <Switch checked={preferences.reduceMotion} onCheckedChange={() => handleToggle('reduceMotion')} />
                </div>
              </div>
            </section>

            <Separator />

            {/* Notifications */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                <Bell size={16} /> Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-slate-500">Receive updates via email</p>
                  </div>
                  <Switch checked={preferences.emailNotifs} onCheckedChange={() => handleToggle('emailNotifs')} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-slate-500">Receive real-time alerts</p>
                  </div>
                  <Switch checked={preferences.pushNotifs} onCheckedChange={() => handleToggle('pushNotifs')} />
                </div>
              </div>
            </section>

            <Separator />

            {/* Security */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                <Shield size={16} /> Security
              </h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-slate-500">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.info("2FA Setup requires backend integration")}>Enable</Button>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}