import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { RoleSelection } from './pages/RoleSelection';
import { StudentSignUp, StudentSignIn, StaffLogin } from './pages/Auth';
import { StudentDashboard } from './pages/StudentDashboard';
import { StaffDashboard } from './pages/StaffDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { SettingsModal } from './components/SettingsModal';
import { User, ServiceRequest, RequestStatus, INITIAL_REQUESTS, USER_DATABASE } from './mockData';
import { Toaster } from "sonner";
import { AnimatePresence, motion } from 'motion/react';

const PageTransition = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
    className={`flex-1 flex flex-col ${className}`}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState('landing');
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_REQUESTS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userDatabase, setUserDatabase] = useState<User[]>(USER_DATABASE);

  // Handle View Navigation
  const handleNavigate = (newView: string) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  // Handle Login
  const handleLogin = (loggedInUser: User) => {
    // Find the user in database to get the latest data
    const dbUser = userDatabase.find(u => u.id === loggedInUser.id) || loggedInUser;
    setUser(dbUser);
    handleNavigate(`${dbUser.role}-dashboard`);
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null);
    handleNavigate('landing');
  };

  // Handle Request Submission (Student)
  const handleRequestSubmit = (newRequest: ServiceRequest) => {
    setRequests(prev => [newRequest, ...prev]);
  };

  // Handle Request Update (Staff)
  const handleRequestUpdate = (id: string, status: RequestStatus, remarks?: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id 
        ? { ...req, status, remarks: remarks || req.remarks } 
        : req
    ));
  };

  // Handle User Update (from settings/profile)
  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    // Update in user database
    setUserDatabase(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  // Handle User Registration
  const handleUserRegistration = (newUser: User) => {
    // Add to database
    setUserDatabase(prev => [...prev, newUser]);
    setUser(newUser);
    handleNavigate(`${newUser.role}-dashboard`);
  };

  // Render Logic
  const renderView = () => {
    switch(view) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      
      case 'role-selection':
        return <RoleSelection onSelect={handleNavigate} />;
      
      case 'student-signup':
        return <StudentSignUp onNavigate={handleNavigate} onSignup={handleUserRegistration} />;
      
      case 'student-login':
        return <StudentSignIn onNavigate={handleNavigate} onLogin={handleLogin} />;
      
      case 'staff-login':
        return <StaffLogin onNavigate={handleNavigate} onLogin={handleLogin} />;
        
      case 'admin-login': // Reusing StaffLogin with admin flag
        return <StaffLogin onNavigate={handleNavigate} onLogin={handleLogin} isAdmin={true} />;

      case 'student-dashboard':
        return user?.role === 'student' 
          ? <StudentDashboard user={user} requests={requests} onRequestSubmit={handleRequestSubmit} /> 
          : <div className="p-8 text-center text-red-500">Access Denied</div>;

      case 'staff-dashboard':
        return user?.role === 'staff'
          ? <StaffDashboard user={user} requests={requests} onRequestUpdate={handleRequestUpdate} />
          : <div className="p-8 text-center text-red-500">Access Denied</div>;

      case 'admin-dashboard':
        return user?.role === 'admin'
          ? <AdminDashboard user={user} requests={requests} onOpenSettings={() => setIsSettingsOpen(true)} />
          : <div className="p-8 text-center text-red-500">Access Denied</div>;

      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      onNavigate={handleNavigate}
      onOpenSettings={() => setIsSettingsOpen(true)}
      currentView={view}
    >
      <AnimatePresence mode="wait">
        <PageTransition key={view}>
          {renderView()}
        </PageTransition>
      </AnimatePresence>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        user={user}
        onUserUpdate={handleUserUpdate}
      />
      
      <Toaster position="top-right" richColors />
    </Layout>
  );
}