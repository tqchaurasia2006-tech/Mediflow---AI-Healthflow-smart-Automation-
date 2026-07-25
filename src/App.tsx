import React, { useState, useEffect } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { SymptomTriageOrchestrator } from './components/SymptomTriageOrchestrator';
import { PatientDashboard } from './components/PatientDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { BlockchainLedger, BlockchainBlock, INITIAL_BLOCKS } from './components/BlockchainLedger';
import { AIChatbot } from './components/AIChatbot';
import { AccessGuard } from './components/AccessGuard';
import { 
  INITIAL_DOCTORS, 
  INITIAL_BEDS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_REMINDERS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';
import { UserRole, Doctor, Bed, Appointment, MedicineReminder, NotificationItem } from './types';
import { 
  auth, 
  getUserProfile, 
  UserProfile, 
  seedInitialFirestoreData,
  subscribeToDoctors,
  subscribeToBeds,
  subscribeToAppointments,
  subscribeToReminders,
  subscribeToNotifications,
  subscribeToBlockchainBlocks,
  addAppointmentToFirestore,
  updateAppointmentStatusInFirestore,
  updateBedStatusInFirestore,
  toggleDoctorAvailabilityInFirestore,
  addReminderToFirestore,
  toggleReminderTakenInFirestore,
  addNotificationToFirestore,
  markNotificationReadInFirestore,
  addBlockToFirestore
} from './lib/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [currentRole, setRole] = useState<UserRole>('PATIENT');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('mediflow_theme');
    return saved ? saved === 'dark' : false;
  });

  // Authenticated User Profile in Firestore
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);

  // Core Hospital Application State
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [beds, setBeds] = useState<Bed[]>(INITIAL_BEDS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [reminders, setReminders] = useState<MedicineReminder[]>(INITIAL_REMINDERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [blockchainBlocks, setBlockchainBlocks] = useState<BlockchainBlock[]>(INITIAL_BLOCKS);

  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

  // Sync Dark Mode class on body and store preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mediflow_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mediflow_theme', 'light');
    }
  }, [darkMode]);

  // Helper to record a new block onto the blockchain and publish to Firestore
  const recordBlockchainBlock = (
    eventType: 'TRIAGE_SESSION' | 'PRESCRIPTION_SIGN' | 'BED_ALLOCATION' | 'PATIENT_CONSENT',
    actionDetails: string,
    recordId?: string,
    initiator?: string,
    patientId?: string,
    department?: string
  ) => {
    setBlockchainBlocks(prev => {
      const prevBlock = prev.length > 0 ? prev[prev.length - 1] : INITIAL_BLOCKS[INITIAL_BLOCKS.length - 1];
      const newIndex = prevBlock ? prevBlock.blockIndex + 1 : 0;
      const randomHex = () => Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      const mockCurrentHash = `0x${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}`;
      const mockDataHash = `0x${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}${randomHex()}`;

      const newBlock: BlockchainBlock = {
        blockIndex: newIndex,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        eventType,
        recordId: recordId || `TX-${Math.floor(10000 + Math.random() * 90000)}`,
        initiator: initiator || currentUserProfile?.displayName || 'MediFlow Active Node',
        dataHash: mockDataHash,
        previousHash: prevBlock ? prevBlock.currentHash : '0x0000000000000000000000000000000000000000000000000000000000000000',
        currentHash: mockCurrentHash,
        nonce: Math.floor(10000 + Math.random() * 80000),
        status: 'VERIFIED',
        details: {
          patientId: patientId || currentUserProfile?.uid || 'PAT-ACTIVE',
          department: department || 'Hospital Operations',
          actionDetails,
          signature: `0xSIG_REALTIME_NODE_${Math.floor(1000 + Math.random() * 9000)}`
        }
      };

      addBlockToFirestore(newBlock);
      return [...prev, newBlock];
    });
  };

  // Initial Firestore Seeding and Auth State Listener
  useEffect(() => {
    seedInitialFirestoreData();

    // Firebase Auth State change listener
    const unsubscribeAuth = auth ? onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setCurrentUserProfile(profile);
          setRole(profile.role);
        } else {
          const fallbackProfile: UserProfile = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
            role: currentRole
          };
          setCurrentUserProfile(fallbackProfile);
        }
      }
    }) : () => {};

    // Firestore Realtime Subscriptions
    const unsubDocs = subscribeToDoctors((docList) => setDoctors(docList));
    const unsubBeds = subscribeToBeds((bedList) => setBeds(bedList));
    const unsubApts = subscribeToAppointments((aptList) => setAppointments(aptList));
    const unsubRems = subscribeToReminders((remList) => setReminders(remList));
    const unsubNotifs = subscribeToNotifications((notifList) => setNotifications(notifList));
    const unsubBlocks = subscribeToBlockchainBlocks((blockList) => {
      if (blockList && blockList.length > 0) {
        setBlockchainBlocks(blockList);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubDocs();
      unsubBeds();
      unsubApts();
      unsubRems();
      unsubNotifs();
      unsubBlocks();
    };
  }, []);

  // Handle Login Success from Landing / Auth Portal
  const handleLoginSuccess = (profile: UserProfile) => {
    setCurrentUserProfile(profile);
    setRole(profile.role);

    // Record Realtime Blockchain Login Event
    recordBlockchainBlock(
      'PATIENT_CONSENT',
      `User Session Authenticated: ${profile.displayName} logged in as ${profile.role} (ECDSA Auth Token Verified)`,
      `AUTH-${profile.uid.substring(0, 8).toUpperCase()}`,
      profile.displayName,
      profile.uid,
      'Security & Authentication'
    );
  };

  // Sign Out Handler
  const handleSignOut = async () => {
    try {
      if (auth) await firebaseSignOut(auth);
    } catch (e) {
      console.warn("Sign out note:", e);
    }
    setCurrentUserProfile(null);
  };

  // Appointment Booking Handler
  const handleBookAppointment = async (data: Partial<Appointment>) => {
    const newApt: Appointment = {
      id: 'apt-' + Date.now(),
      patientId: currentUserProfile?.uid || data.patientId || 'pat-' + Date.now(),
      patientName: data.patientName || currentUserProfile?.displayName || 'Anonymous Patient',
      patientAge: data.patientAge || 35,
      patientGender: data.patientGender || 'Male',
      patientContact: data.patientContact || '+1 (555) 000-0000',
      department: data.department || 'General Medicine',
      doctorId: data.doctorId || (doctors.length > 0 ? doctors[0].id : 'doc-1'),
      doctorName: data.doctorName || (doctors.length > 0 ? doctors[0].name : 'Dr. Sarah Jenkins'),
      doctorSpecialty: data.doctorSpecialty || (doctors.length > 0 ? doctors[0].specialty : 'Cardiology Specialist'),
      date: data.date || new Date().toISOString().split('T')[0],
      timeSlot: data.timeSlot || '10:00 AM',
      priority: data.priority || 'ROUTINE',
      status: data.status || 'CONFIRMED',
      symptomSummary: data.symptomSummary || 'Routine Consultation',
      aiTriageResult: data.aiTriageResult
    };

    setAppointments(prev => [newApt, ...prev]);
    await addAppointmentToFirestore(newApt);

    // Record Realtime Blockchain Block
    recordBlockchainBlock(
      'TRIAGE_SESSION',
      `Care Assessment & Appointment Booked: ${newApt.patientName} with ${newApt.doctorName} (${newApt.department}, Priority: ${newApt.priority}, Slot: ${newApt.timeSlot})`,
      newApt.id.toUpperCase(),
      currentUserProfile?.displayName || 'AI Care Assessment Orchestrator',
      newApt.patientId,
      newApt.department
    );

    // Dispatch system notification
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: `${newApt.priority} Appointment Booked`,
      message: `Appointment for ${newApt.patientName} with ${newApt.doctorName} (${newApt.timeSlot}).`,
      time: 'Just now',
      type: newApt.priority === 'EMERGENCY' ? 'EMERGENCY' : 'APPOINTMENT',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    await addNotificationToFirestore(newNotif);
  };

  // Doctor Status Update
  const handleUpdateAppointmentStatus = async (id: string, status: Appointment['status'], bedAssigned?: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status, bedAssigned: bedAssigned || a.bedAssigned } : a));
    await updateAppointmentStatusInFirestore(id, status, bedAssigned);

    // Record Realtime Blockchain Block
    recordBlockchainBlock(
      'PRESCRIPTION_SIGN',
      `Clinical Record Updated: Appointment ${id} status set to ${status}${bedAssigned ? `, Bed Assigned: ${bedAssigned}` : ''}`,
      id.toUpperCase(),
      currentUserProfile?.displayName || 'Doctor / Care Provider',
      'PAT-RECORD',
      'Clinical Care'
    );
  };

  // Bed Status Manager
  const handleUpdateBedStatus = async (bedId: string, status: Bed['status'], patientName?: string, doctorName?: string) => {
    setBeds(prev => prev.map(b => b.id === bedId ? {
      ...b,
      status,
      currentPatientName: status === 'OCCUPIED' ? patientName : undefined,
      assignedDoctorName: status === 'OCCUPIED' ? doctorName : undefined,
      admissionDate: status === 'OCCUPIED' ? new Date().toISOString().split('T')[0] : undefined
    } : b));
    await updateBedStatusInFirestore(bedId, status, patientName, doctorName);

    // Record Realtime Blockchain Block
    recordBlockchainBlock(
      'BED_ALLOCATION',
      `Bed Allocation Shift: Bed ${bedId} status mutated to ${status}${patientName ? ` (Patient: ${patientName})` : ''}${doctorName ? ` (Doctor: ${doctorName})` : ''}`,
      `BED-${bedId}`,
      currentUserProfile?.displayName || 'Hospital Admin Hub',
      'PAT-BED',
      'Inpatient Bed Matrix'
    );
  };

  // Doctor Shift Availability Toggle
  const handleToggleDoctorAvailability = async (doctorId: string) => {
    const docItem = doctors.find(d => d.id === doctorId);
    if (docItem) {
      const nextAvailable = !docItem.isAvailable;
      setDoctors(prev => prev.map(d => d.id === doctorId ? { ...d, isAvailable: nextAvailable } : d));
      await toggleDoctorAvailabilityInFirestore(doctorId, docItem.isAvailable);

      // Record Realtime Blockchain Block
      recordBlockchainBlock(
        'PRESCRIPTION_SIGN',
        `Doctor Shift Status: ${docItem.name} (${docItem.specialty}) toggled availability to ${nextAvailable ? 'AVAILABLE & ON DUTY' : 'OFF DUTY'}`,
        `DOC-${doctorId}`,
        docItem.name,
        'N/A',
        docItem.department
      );
    }
  };

  // Notification Mark Read
  const handleMarkNotificationRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    await markNotificationReadInFirestore(id);
  };

  // Medicine Reminder Toggle
  const handleToggleReminderTaken = async (id: string) => {
    const remItem = reminders.find(r => r.id === id);
    if (remItem) {
      const nextTaken = !remItem.takenToday;
      setReminders(prev => prev.map(r => r.id === id ? { ...r, takenToday: nextTaken } : r));
      await toggleReminderTakenInFirestore(id, remItem.takenToday);

      // Record Realtime Blockchain Block
      recordBlockchainBlock(
        'PATIENT_CONSENT',
        `Medication Adherence Sync: ${remItem.medicineName} (${remItem.dosage}) marked as ${nextTaken ? 'TAKEN' : 'UNTAKEN'}`,
        `REM-${id}`,
        currentUserProfile?.displayName || 'Patient Portal',
        currentUserProfile?.uid || 'PAT-MED',
        'Pharmacy & Adherence'
      );
    }
  };

  const handleAddReminder = async (reminderData: Partial<MedicineReminder>) => {
    const newRem: MedicineReminder = {
      id: 'rem-' + Date.now(),
      medicineName: reminderData.medicineName || 'New Medication',
      dosage: reminderData.dosage || '1 Tablet',
      timeSlot: reminderData.timeSlot || '08:00 AM',
      takenToday: false,
      notes: reminderData.notes
    };
    setReminders(prev => [...prev, newRem]);
    await addReminderToFirestore(newRem);

    // Record Realtime Blockchain Block
    recordBlockchainBlock(
      'PATIENT_CONSENT',
      `New Medication Prescription Registered: ${newRem.medicineName} (${newRem.dosage}, ${newRem.timeSlot})`,
      newRem.id.toUpperCase(),
      currentUserProfile?.displayName || 'Patient / Prescriber',
      currentUserProfile?.uid || 'PAT-MED',
      'Pharmacy & Adherence'
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-teal-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setRole={setRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        notifications={notifications}
        markNotificationRead={handleMarkNotificationRead}
        onOpenChatbot={() => setIsChatbotOpen(true)}
        currentUserProfile={currentUserProfile}
        onSignOut={handleSignOut}
        onGoToLogin={() => {
          setActiveTab('landing');
          setTimeout(() => {
            window.scrollTo({ top: 300, behavior: 'smooth' });
          }, 100);
        }}
      />

      {/* Main Content Area */}
      <main className="pt-6">
        {activeTab === 'landing' && (
          <LandingHero
            onStartTriage={() => setActiveTab('triage')}
            onOpenPatientPortal={() => setActiveTab('patient')}
            onOpenDoctorPortal={() => setActiveTab('doctor')}
            onOpenBedMatrix={() => setActiveTab('beds')}
            currentRole={currentRole}
            setRole={setRole}
            currentUserProfile={currentUserProfile}
            onLoginSuccess={handleLoginSuccess}
            onSignOut={handleSignOut}
          />
        )}

        {activeTab === 'triage' && (
          <div className="px-4 sm:px-6 lg:px-8">
            {!currentUserProfile ? (
              <AccessGuard
                currentUserProfile={currentUserProfile}
                featureName="AI Symptom Assessment"
                onGoToLogin={() => setActiveTab('landing')}
                onGoToAllowedPortal={(role) => setActiveTab(role === 'DOCTOR' ? 'doctor' : role === 'ADMIN' ? 'admin' : 'patient')}
                onSignOut={handleSignOut}
              />
            ) : (
              <SymptomTriageOrchestrator
                doctors={doctors}
                onBookAppointment={handleBookAppointment}
                onNavigateToDoctorPortal={() => setActiveTab('doctor')}
              />
            )}
          </div>
        )}

        {activeTab === 'patient' && (
          <div className="px-4 sm:px-6 lg:px-8">
            {(!currentUserProfile || (currentUserProfile.role !== 'PATIENT' && currentUserProfile.role !== 'ADMIN')) ? (
              <AccessGuard
                currentUserProfile={currentUserProfile}
                requiredRoles={['PATIENT', 'ADMIN']}
                featureName="Patient Portal"
                onGoToLogin={() => setActiveTab('landing')}
                onGoToAllowedPortal={(role) => setActiveTab(role === 'DOCTOR' ? 'doctor' : role === 'ADMIN' ? 'admin' : 'patient')}
                onSignOut={handleSignOut}
              />
            ) : (
              <PatientDashboard
                appointments={appointments}
                reminders={reminders}
                onToggleReminderTaken={handleToggleReminderTaken}
                onAddReminder={handleAddReminder}
                notifications={notifications}
              />
            )}
          </div>
        )}

        {activeTab === 'doctor' && (
          <div className="px-4 sm:px-6 lg:px-8">
            {(!currentUserProfile || (currentUserProfile.role !== 'DOCTOR' && currentUserProfile.role !== 'ADMIN')) ? (
              <AccessGuard
                currentUserProfile={currentUserProfile}
                requiredRoles={['DOCTOR', 'ADMIN']}
                featureName="Doctor Clinical Workspace"
                onGoToLogin={() => setActiveTab('landing')}
                onGoToAllowedPortal={(role) => setActiveTab(role === 'PATIENT' ? 'patient' : role === 'ADMIN' ? 'admin' : 'doctor')}
                onSignOut={handleSignOut}
              />
            ) : (
              <DoctorDashboard
                doctors={doctors}
                appointments={appointments}
                onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                onOpenBedModalForPatient={() => {
                  setActiveTab('beds');
                }}
              />
            )}
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="px-4 sm:px-6 lg:px-8">
            {(!currentUserProfile || currentUserProfile.role !== 'ADMIN') ? (
              <AccessGuard
                currentUserProfile={currentUserProfile}
                requiredRoles={['ADMIN']}
                featureName="Hospital Admin Hub"
                onGoToLogin={() => setActiveTab('landing')}
                onGoToAllowedPortal={(role) => setActiveTab(role === 'PATIENT' ? 'patient' : role === 'DOCTOR' ? 'doctor' : 'admin')}
                onSignOut={handleSignOut}
              />
            ) : (
              <AdminDashboard
                beds={beds}
                doctors={doctors}
                appointments={appointments}
                onUpdateBedStatus={handleUpdateBedStatus}
                onToggleDoctorAvailability={handleToggleDoctorAvailability}
                onConfirmAppointment={(aptId) => handleUpdateAppointmentStatus(aptId, 'CONFIRMED')}
              />
            )}
          </div>
        )}

        {activeTab === 'beds' && (
          <div className="px-4 sm:px-6 lg:px-8">
            {(!currentUserProfile || (currentUserProfile.role !== 'DOCTOR' && currentUserProfile.role !== 'ADMIN')) ? (
              <AccessGuard
                currentUserProfile={currentUserProfile}
                requiredRoles={['DOCTOR', 'ADMIN']}
                featureName="Bed Matrix Hub"
                onGoToLogin={() => setActiveTab('landing')}
                onGoToAllowedPortal={(role) => setActiveTab(role === 'PATIENT' ? 'patient' : role === 'DOCTOR' ? 'doctor' : 'admin')}
                onSignOut={handleSignOut}
              />
            ) : (
              <AdminDashboard
                beds={beds}
                doctors={doctors}
                appointments={appointments}
                onUpdateBedStatus={handleUpdateBedStatus}
                onToggleDoctorAvailability={handleToggleDoctorAvailability}
                onConfirmAppointment={(aptId) => handleUpdateAppointmentStatus(aptId, 'CONFIRMED')}
              />
            )}
          </div>
        )}

        {activeTab === 'blockchain' && (
          <div className="px-4 sm:px-6 lg:px-8">
            <BlockchainLedger 
              blocks={blockchainBlocks} 
              onAddBlock={(newBlk) => {
                recordBlockchainBlock(
                  newBlk.eventType, 
                  newBlk.details.actionDetails, 
                  newBlk.recordId, 
                  newBlk.initiator, 
                  newBlk.details.patientId, 
                  newBlk.details.department
                );
              }} 
            />
          </div>
        )}
      </main>

      {/* Floating AI Assistant Chatbot */}
      <AIChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onNavigateToTriage={() => setActiveTab('triage')}
      />

      {/* Floating AI Assistant Launcher on Bottom Right Footer */}
      {!isChatbotOpen && (
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-full shadow-2xl shadow-teal-600/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2.5 border border-white/20 group cursor-pointer"
          title="Open AI Healthcare Assistant"
          aria-label="Open AI Healthcare Assistant"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300" />
          </div>
          <span className="font-bold text-xs tracking-wide">AI Assistant</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">MediFlow AI</span>
        </div>
      </footer>

    </div>
  );
}
