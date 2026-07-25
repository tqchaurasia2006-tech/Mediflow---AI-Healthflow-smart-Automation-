export type PriorityLevel = 'EMERGENCY' | 'URGENT' | 'ROUTINE';

export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export interface SymptomAnalysisResult {
  id: string;
  timestamp: string;
  symptomsText: string;
  duration: string;
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  extractedSymptoms: string[];
  possibleConditions: {
    condition: string;
    probability: number; // 0 - 100%
    description: string;
  }[];
  recommendedDepartment: string;
  urgencyLevel: PriorityLevel;
  suggestedAction: string;
  recommendedTests: string[];
  vitalSignsWarning?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientContact: string;
  department: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  timeSlot: string;
  priority: PriorityLevel;
  status: 'PENDING' | 'CONFIRMED' | 'IN_CONSULTATION' | 'COMPLETED' | 'CANCELLED';
  symptomSummary: string;
  aiTriageResult?: SymptomAnalysisResult;
  notes?: string;
  prescription?: Prescription;
  bedAssigned?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  avatar: string;
  isAvailable: boolean;
  currentPatientsCount: number;
  maxPatientsPerDay: number;
  rating: number;
  experienceYears: number;
  roomNumber: string;
}

export interface Bed {
  id: string;
  code: string; // e.g., "ICU-01", "WARD-B-04"
  type: 'ICU' | 'GENERAL_WARD' | 'EMERGENCY_BAY' | 'OPERATION_THEATER';
  wing: 'North Wing' | 'South Wing' | 'East Wing' | 'West Wing';
  floor: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'CLEANING' | 'MAINTENANCE';
  currentPatientName?: string;
  assignedDoctorName?: string;
  admissionDate?: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientName: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string; // e.g. "Twice daily after meals"
    durationDays: number;
  }[];
  instructions: string;
}

export interface MedicineReminder {
  id: string;
  medicineName: string;
  dosage: string;
  timeSlot: string; // "08:00 AM"
  takenToday: boolean;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'EMERGENCY' | 'APPOINTMENT' | 'REMINDER' | 'SYSTEM';
  read: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  departmentRecommendation?: string;
  highlights?: string[];
}
