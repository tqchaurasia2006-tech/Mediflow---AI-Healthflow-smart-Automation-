import { Doctor, Bed, Appointment, MedicineReminder, NotificationItem } from '../types';

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiology Specialist',
    department: 'Cardiology',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    isAvailable: true,
    currentPatientsCount: 14,
    maxPatientsPerDay: 20,
    rating: 4.9,
    experienceYears: 12,
    roomNumber: 'R-302'
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance',
    specialty: 'Neurology & Stroke Lead',
    department: 'Neurology',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    isAvailable: true,
    currentPatientsCount: 9,
    maxPatientsPerDay: 15,
    rating: 4.8,
    experienceYears: 16,
    roomNumber: 'R-410'
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya Sharma',
    specialty: 'Emergency Medicine Chief',
    department: 'Emergency & Trauma',
    avatar: 'https://images.unsplash.com/photo-1594824813566-788094273873?auto=format&fit=crop&q=80&w=200',
    isAvailable: true,
    currentPatientsCount: 18,
    maxPatientsPerDay: 25,
    rating: 4.95,
    experienceYears: 10,
    roomNumber: 'ER-Bay 1'
  },
  {
    id: 'doc-4',
    name: 'Dr. Robert Chen',
    specialty: 'Pulmonology & Respiratory',
    department: 'Pulmonology',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    isAvailable: false,
    currentPatientsCount: 12,
    maxPatientsPerDay: 18,
    rating: 4.7,
    experienceYears: 14,
    roomNumber: 'R-205'
  },
  {
    id: 'doc-5',
    name: 'Dr. Elena Rostova',
    specialty: 'Orthopedic Surgery',
    department: 'Orthopedics',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=200',
    isAvailable: true,
    currentPatientsCount: 7,
    maxPatientsPerDay: 16,
    rating: 4.85,
    experienceYears: 11,
    roomNumber: 'R-112'
  }
];

export const INITIAL_BEDS: Bed[] = [
  { id: 'b1', code: 'ICU-101', type: 'ICU', wing: 'North Wing', floor: 3, status: 'OCCUPIED', currentPatientName: 'Arthur Morgan', assignedDoctorName: 'Dr. Sarah Jenkins', admissionDate: '2026-07-21' },
  { id: 'b2', code: 'ICU-102', type: 'ICU', wing: 'North Wing', floor: 3, status: 'AVAILABLE' },
  { id: 'b3', code: 'ICU-103', type: 'ICU', wing: 'North Wing', floor: 3, status: 'CLEANING' },
  { id: 'b4', code: 'ER-BAY-01', type: 'EMERGENCY_BAY', wing: 'East Wing', floor: 1, status: 'OCCUPIED', currentPatientName: 'Jessica Taylor', assignedDoctorName: 'Dr. Priya Sharma', admissionDate: '2026-07-23' },
  { id: 'b5', code: 'ER-BAY-02', type: 'EMERGENCY_BAY', wing: 'East Wing', floor: 1, status: 'AVAILABLE' },
  { id: 'b6', code: 'WARD-A-01', type: 'GENERAL_WARD', wing: 'South Wing', floor: 2, status: 'OCCUPIED', currentPatientName: 'David Kim', assignedDoctorName: 'Dr. Robert Chen', admissionDate: '2026-07-22' },
  { id: 'b7', code: 'WARD-A-02', type: 'GENERAL_WARD', wing: 'South Wing', floor: 2, status: 'AVAILABLE' },
  { id: 'b8', code: 'WARD-A-03', type: 'GENERAL_WARD', wing: 'South Wing', floor: 2, status: 'AVAILABLE' },
  { id: 'b9', code: 'WARD-B-01', type: 'GENERAL_WARD', wing: 'West Wing', floor: 2, status: 'MAINTENANCE' },
  { id: 'b10', code: 'OT-ROOM-01', type: 'OPERATION_THEATER', wing: 'North Wing', floor: 4, status: 'OCCUPIED', currentPatientName: 'Samuel Jackson', assignedDoctorName: 'Dr. Elena Rostova', admissionDate: '2026-07-23' }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    patientId: 'pat-1',
    patientName: 'Jessica Taylor',
    patientAge: 42,
    patientGender: 'Female',
    patientContact: '+1 (555) 234-5678',
    department: 'Emergency & Trauma',
    doctorId: 'doc-3',
    doctorName: 'Dr. Priya Sharma',
    doctorSpecialty: 'Emergency Medicine Chief',
    date: '2026-07-23',
    timeSlot: '09:30 AM',
    priority: 'EMERGENCY',
    status: 'IN_CONSULTATION',
    symptomSummary: 'Acute radiating substernal chest pressure, dyspnea, diaphoresis for 45 mins.',
    bedAssigned: 'ER-BAY-01'
  },
  {
    id: 'apt-102',
    patientId: 'pat-2',
    patientName: 'Michael Chang',
    patientAge: 58,
    patientGender: 'Male',
    patientContact: '+1 (555) 876-5432',
    department: 'Cardiology',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialty: 'Cardiology Specialist',
    date: '2026-07-23',
    timeSlot: '10:15 AM',
    priority: 'URGENT',
    status: 'CONFIRMED',
    symptomSummary: 'Palpitations, mild dizziness, elevated blood pressure reading (155/95).'
  },
  {
    id: 'apt-103',
    patientId: 'pat-3',
    patientName: 'Amanda Watson',
    patientAge: 29,
    patientGender: 'Female',
    patientContact: '+1 (555) 345-6789',
    department: 'Neurology',
    doctorId: 'doc-2',
    doctorName: 'Dr. Marcus Vance',
    doctorSpecialty: 'Neurology & Stroke Lead',
    date: '2026-07-23',
    timeSlot: '11:00 AM',
    priority: 'ROUTINE',
    status: 'CONFIRMED',
    symptomSummary: 'Recurring migraine with aura, light sensitivity twice a week.'
  },
  {
    id: 'apt-104',
    patientId: 'pat-4',
    patientName: 'Robert Vance Jr.',
    patientAge: 64,
    patientGender: 'Male',
    patientContact: '+1 (555) 901-2345',
    department: 'Pulmonology',
    doctorId: 'doc-4',
    doctorName: 'Dr. Robert Chen',
    doctorSpecialty: 'Pulmonology & Respiratory',
    date: '2026-07-23',
    timeSlot: '02:30 PM',
    priority: 'ROUTINE',
    status: 'PENDING',
    symptomSummary: 'Persistent dry cough following viral infection, shortness of breath on exertion.'
  }
];

export const INITIAL_REMINDERS: MedicineReminder[] = [
  { id: 'rem-1', medicineName: 'Atorvastatin 20mg', dosage: '1 Tablet', timeSlot: '08:00 AM', takenToday: true, notes: 'Take after breakfast with full glass of water' },
  { id: 'rem-2', medicineName: 'Lisinopril 10mg', dosage: '1 Tablet', timeSlot: '01:00 PM', takenToday: false, notes: 'Daily blood pressure management' },
  { id: 'rem-3', medicineName: 'Metformin 500mg', dosage: '1 Tablet', timeSlot: '08:00 PM', takenToday: false, notes: 'Take during evening meal' }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif-1', title: 'Emergency AI Alert', message: 'High priority triage case flagged for ER Bay 01 (Jessica Taylor - Potential ACS).', time: '10 mins ago', type: 'EMERGENCY', read: false },
  { id: 'notif-2', title: 'Appointment Confirmed', message: 'Your consult with Dr. Sarah Jenkins is scheduled for 10:15 AM.', time: '1 hour ago', type: 'APPOINTMENT', read: false },
  { id: 'notif-3', title: 'Medicine Reminder', message: 'Time for Lisinopril 10mg (01:00 PM dosage due soon).', time: '2 hours ago', type: 'REMINDER', read: true }
];
