export type UserRole = 'student' | 'staff' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  enrollmentNumber?: string;
  department?: string;
  avatarUrl?: string;
  password?: string; // For mock authentication
}

export type RequestStatus = 'Submitted' | 'In Progress' | 'Resolved';

export interface ServiceRequest {
  id: string;
  studentId: string;
  studentName: string;
  serviceType: string;
  location?: string;
  description: string;
  status: RequestStatus;
  date: string;
  remarks?: string;
}

export const MOCK_USER_STUDENT: User = {
  id: 's1',
  name: 'Rahul Sharma',
  email: 'rahul.s@college.edu',
  role: 'student',
  enrollmentNumber: 'CS2023001',
  department: 'Computer Science',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
};

export const MOCK_USER_STAFF: User = {
  id: 'st1',
  name: 'Prof. Anjali Gupta',
  email: 'anjali.g@college.edu',
  role: 'staff',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
};

export const MOCK_USER_ADMIN: User = {
  id: 'a1',
  name: 'System Admin',
  email: 'admin@college.edu',
  role: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
};

// User Database - stores all users
export const USER_DATABASE: User[] = [
  MOCK_USER_STUDENT,
  MOCK_USER_STAFF,
  MOCK_USER_ADMIN
];

export const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: 'req1',
    studentId: 's1',
    studentName: 'Rahul Sharma',
    serviceType: 'Drinking Water Issue',
    location: 'Block A, 2nd Floor',
    description: 'Water cooler is leaking.',
    status: 'Submitted',
    date: '2023-10-25'
  },
  {
    id: 'req2',
    studentId: 's2',
    studentName: 'Priya Patel',
    serviceType: 'Cleanliness in Classroom',
    location: 'Room 304',
    description: 'Dustbins are full.',
    status: 'In Progress',
    date: '2023-10-24'
  },
  {
    id: 'req3',
    studentId: 's1',
    studentName: 'Rahul Sharma',
    serviceType: 'ID Card Issue',
    description: 'Lost my ID card, need replacement.',
    status: 'Resolved',
    date: '2023-10-20',
    remarks: 'Collect from Admin block'
  }
];

export const SERVICE_TYPES = [
  'Drinking Water Issue',
  'ID Card Issue',
  'ERP Related Issue',
  'Water Related Issue',
  'Cleanliness in Classroom',
  'Parking Related Issue',
  'Canteen Issue',
  'Ragging / Harassment',
  'Other'
];