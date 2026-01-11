import React, { useState } from 'react';
import { Eye, EyeOff, Upload, ArrowLeft, Check, X } from 'lucide-react';
import { User, MOCK_USER_STUDENT, MOCK_USER_STAFF, MOCK_USER_ADMIN } from '../mockData';
import { toast } from "sonner";
import { motion, AnimatePresence } from 'motion/react';

// --- Shared Components ---

const InputGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700">{label}</label>
    {children}
  </div>
);

const PasswordInput = ({ 
  placeholder = "••••••••", 
  value, 
  onChange 
}: { 
  placeholder?: string,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

// --- Helper Functions ---
const checkPasswordStrength = (password: string) => {
  return {
    length: password.length >= 6,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };
};

// --- Pages ---

export function StudentSignUp({ onNavigate, onSignup }: { onNavigate: (v: string) => void, onSignup: (u: User) => void }) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    enrollmentNumber: '',
    email: '',
    department: 'Computer Science'
  });
  
  const passwordCriteria = checkPasswordStrength(password);
  const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!allCriteriaMet) {
      toast.error("Please ensure password meets all requirements.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Create new user with actual form data
    const newUser: User = {
      id: `s${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: 'student',
      enrollmentNumber: formData.enrollmentNumber,
      department: formData.department,
      avatarUrl: photoPreview || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
    };

    // Simulate signup success
    toast.success("Account created successfully!");
    onSignup(newUser);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button onClick={() => onNavigate('role-selection')} className="flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-slate-900">
          Create Student Account
        </h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]"
      >
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Profile Photo */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative h-24 w-24 rounded-full overflow-hidden bg-slate-100 ring-2 ring-white shadow-md mb-3 group">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-300">
                    <Upload size={24} />
                  </div>
                )}
              </div>
              <label className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors">
                <span>Upload Photo</span>
                <input type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>

            <InputGroup label="Full Name">
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
              />
            </InputGroup>

            <InputGroup label="Enrollment Number">
              <input 
                type="text" 
                required 
                value={formData.enrollmentNumber}
                onChange={(e) => setFormData({...formData, enrollmentNumber: e.target.value})}
                className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
              />
            </InputGroup>

            <InputGroup label="College Email">
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" 
              />
            </InputGroup>

            <InputGroup label="Department">
              <select 
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option>Computer Science</option>
                <option>Information Technology</option>
                <option>Electronics</option>
                <option>Mechanical</option>
                <option>Civil</option>
              </select>
            </InputGroup>

            <InputGroup label="Password">
              <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
              
              {/* Password Strength Validation */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
                <div className={`flex items-center gap-1.5 ${passwordCriteria.length ? 'text-green-600' : ''}`}>
                  {passwordCriteria.length ? <Check size={12} /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                  6+ characters
                </div>
                <div className={`flex items-center gap-1.5 ${passwordCriteria.lowercase ? 'text-green-600' : ''}`}>
                  {passwordCriteria.lowercase ? <Check size={12} /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                  Lowercase letter
                </div>
                <div className={`flex items-center gap-1.5 ${passwordCriteria.uppercase ? 'text-green-600' : ''}`}>
                  {passwordCriteria.uppercase ? <Check size={12} /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                  Uppercase letter
                </div>
                <div className={`flex items-center gap-1.5 ${passwordCriteria.symbol ? 'text-green-600' : ''}`}>
                  {passwordCriteria.symbol ? <Check size={12} /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                  Special symbol
                </div>
              </div>
            </InputGroup>

            <InputGroup label="Confirm Password">
              <PasswordInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </InputGroup>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <button onClick={() => onNavigate('student-login')} className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function StudentSignIn({ onNavigate, onLogin }: { onNavigate: (v: string) => void, onLogin: (u: User) => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(MOCK_USER_STUDENT);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button onClick={() => onNavigate('role-selection')} className="flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-slate-900">
          Student Sign In
        </h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]"
      >
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputGroup label="Enrollment Number">
              <input type="text" required defaultValue="CS2023001" className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
            </InputGroup>

            <InputGroup label="Password">
              <PasswordInput placeholder="Password" />
            </InputGroup>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <button onClick={() => onNavigate('student-signup')} className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
              Create Account
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function StaffLogin({ onNavigate, onLogin, isAdmin = false }: { onNavigate: (v: string) => void, onLogin: (u: User) => void, isAdmin?: boolean }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(isAdmin ? MOCK_USER_ADMIN : MOCK_USER_STAFF);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button onClick={() => onNavigate('role-selection')} className="flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6">
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-slate-900">
          {isAdmin ? 'Admin Portal' : 'Staff Login'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Please use the credentials provided by your institution
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]"
      >
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 border-t-4 border-t-purple-600" style={{ borderTopColor: isAdmin ? '#10B981' : '#6366F1' }}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputGroup label="Email / ID">
              <input type="text" required defaultValue={isAdmin ? "admin@college.edu" : "staff@college.edu"} className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
            </InputGroup>

            <InputGroup label="Password">
              <PasswordInput placeholder="••••••••" />
            </InputGroup>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-lg px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isAdmin ? 'bg-emerald-600 hover:bg-emerald-500 focus-visible:outline-emerald-600' : 'bg-purple-600 hover:bg-purple-500 focus-visible:outline-purple-600'}`}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}