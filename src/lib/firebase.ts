import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  Firestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  getDocs, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';
import { Doctor, Bed, Appointment, MedicineReminder, NotificationItem, UserRole } from '../types';
import { INITIAL_DOCTORS, INITIAL_BEDS, INITIAL_APPOINTMENTS, INITIAL_REMINDERS, INITIAL_NOTIFICATIONS } from '../data/mockData';
import { BlockchainBlock, INITIAL_BLOCKS } from '../components/BlockchainLedger';

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId
};

// Initialize Firebase App lazily / safely
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Connect to custom database ID if specified in config, or standard default
  const dbId = firebaseConfigData.firestoreDatabaseId;
  if (dbId && dbId !== '(default)') {
    db = getFirestore(app, dbId);
  } else {
    db = getFirestore(app);
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

export { app, auth, db };

// User Profile Interface in Firestore
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt?: string;
  department?: string;
  specialty?: string;
}

// Helper to sanitize undefined values which Firestore setDoc/updateDoc disallow
function cleanDataForFirestore<T extends Record<string, any>>(obj: T): Record<string, any> {
  const cleaned: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  }
  return cleaned;
}

// Custom Auth / User Helper functions
export async function saveUserProfile(userProfile: UserProfile) {
  if (!db) return;
  try {
    const userRef = doc(db, 'users', userProfile.uid);
    const dataToSave = cleanDataForFirestore({
      ...userProfile,
      createdAt: userProfile.createdAt || new Date().toISOString()
    });
    await setDoc(userRef, dataToSave, { merge: true });
  } catch (err) {
    console.error("Error saving user profile to Firestore:", err);
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!db) return null;
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.error("Error getting user profile from Firestore:", err);
  }
  return null;
}

// Data Seeding Function to ensure Firestore has default records if empty
export async function seedInitialFirestoreData() {
  if (!db) return;
  try {
    // 1. Doctors
    const docsSnap = await getDocs(collection(db, 'doctors'));
    if (docsSnap.empty) {
      for (const d of INITIAL_DOCTORS) {
        await setDoc(doc(db, 'doctors', d.id), cleanDataForFirestore(d));
      }
      console.log('Seeded doctors to Firestore');
    }

    // 2. Beds
    const bedsSnap = await getDocs(collection(db, 'beds'));
    if (bedsSnap.empty) {
      for (const b of INITIAL_BEDS) {
        await setDoc(doc(db, 'beds', b.id), cleanDataForFirestore(b));
      }
      console.log('Seeded beds to Firestore');
    }

    // 3. Appointments
    const aptSnap = await getDocs(collection(db, 'appointments'));
    if (aptSnap.empty) {
      for (const a of INITIAL_APPOINTMENTS) {
        await setDoc(doc(db, 'appointments', a.id), cleanDataForFirestore(a));
      }
      console.log('Seeded appointments to Firestore');
    }

    // 4. Reminders
    const remSnap = await getDocs(collection(db, 'reminders'));
    if (remSnap.empty) {
      for (const r of INITIAL_REMINDERS) {
        await setDoc(doc(db, 'reminders', r.id), cleanDataForFirestore(r));
      }
      console.log('Seeded reminders to Firestore');
    }

    // 5. Notifications
    const notifSnap = await getDocs(collection(db, 'notifications'));
    if (notifSnap.empty) {
      for (const n of INITIAL_NOTIFICATIONS) {
        await setDoc(doc(db, 'notifications', n.id), cleanDataForFirestore(n));
      }
      console.log('Seeded notifications to Firestore');
    }

    // 6. Blockchain Blocks
    const blockSnap = await getDocs(collection(db, 'blockchain_blocks'));
    if (blockSnap.empty) {
      for (const blk of INITIAL_BLOCKS) {
        await setDoc(doc(db, 'blockchain_blocks', 'blk-' + blk.blockIndex), cleanDataForFirestore(blk));
      }
      console.log('Seeded blockchain_blocks to Firestore');
    }
  } catch (error) {
    console.warn("Firestore seeding check note:", error);
  }
}

// Firestore Realtime Subscription Listeners
export function subscribeToDoctors(callback: (doctors: Doctor[]) => void) {
  if (!db) return () => {};
  const q = collection(db, 'doctors');
  return onSnapshot(q, (snapshot) => {
    const list: Doctor[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as Doctor);
    });
    if (list.length > 0) {
      callback(list);
    }
  }, (err) => {
    console.warn("Doctors realtime sync warning:", err);
  });
}

export function subscribeToBeds(callback: (beds: Bed[]) => void) {
  if (!db) return () => {};
  const q = collection(db, 'beds');
  return onSnapshot(q, (snapshot) => {
    const list: Bed[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as Bed);
    });
    if (list.length > 0) {
      callback(list);
    }
  }, (err) => {
    console.warn("Beds realtime sync warning:", err);
  });
}

export function subscribeToAppointments(callback: (appointments: Appointment[]) => void) {
  if (!db) return () => {};
  const q = collection(db, 'appointments');
  return onSnapshot(q, (snapshot) => {
    const list: Appointment[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as Appointment);
    });
    if (list.length > 0) {
      callback(list);
    }
  }, (err) => {
    console.warn("Appointments realtime sync warning:", err);
  });
}

export function subscribeToReminders(callback: (reminders: MedicineReminder[]) => void) {
  if (!db) return () => {};
  const q = collection(db, 'reminders');
  return onSnapshot(q, (snapshot) => {
    const list: MedicineReminder[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as MedicineReminder);
    });
    if (list.length > 0) {
      callback(list);
    }
  }, (err) => {
    console.warn("Reminders realtime sync warning:", err);
  });
}

export function subscribeToNotifications(callback: (notifications: NotificationItem[]) => void) {
  if (!db) return () => {};
  const q = collection(db, 'notifications');
  return onSnapshot(q, (snapshot) => {
    const list: NotificationItem[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as NotificationItem);
    });
    if (list.length > 0) {
      callback(list);
    }
  }, (err) => {
    console.warn("Notifications realtime sync warning:", err);
  });
}

// Firestore Writer Actions
export async function addAppointmentToFirestore(apt: Appointment) {
  if (!db) return;
  try {
    await setDoc(doc(db, 'appointments', apt.id), cleanDataForFirestore(apt));
  } catch (err) {
    console.error("Error adding appointment to Firestore:", err);
  }
}

export async function updateAppointmentStatusInFirestore(id: string, status: Appointment['status'], bedAssigned?: string) {
  if (!db) return;
  try {
    const ref = doc(db, 'appointments', id);
    const updates: Partial<Appointment> = { status };
    if (bedAssigned) updates.bedAssigned = bedAssigned;
    await setDoc(ref, cleanDataForFirestore(updates), { merge: true });
  } catch (err) {
    console.error("Error updating appointment status in Firestore:", err);
  }
}

export async function updateBedStatusInFirestore(bedId: string, status: Bed['status'], patientName?: string, doctorName?: string) {
  if (!db) return;
  try {
    const ref = doc(db, 'beds', bedId);
    const updates: Partial<Bed> = {
      status,
      currentPatientName: status === 'OCCUPIED' ? patientName : undefined,
      assignedDoctorName: status === 'OCCUPIED' ? doctorName : undefined,
      admissionDate: status === 'OCCUPIED' ? new Date().toISOString().split('T')[0] : undefined
    };
    await setDoc(ref, cleanDataForFirestore(updates), { merge: true });
  } catch (err) {
    console.error("Error updating bed status in Firestore:", err);
  }
}

export async function toggleDoctorAvailabilityInFirestore(doctorId: string, currentAvailable: boolean) {
  if (!db) return;
  try {
    const ref = doc(db, 'doctors', doctorId);
    await setDoc(ref, { isAvailable: !currentAvailable }, { merge: true });
  } catch (err) {
    console.error("Error updating doctor availability in Firestore:", err);
  }
}

export async function addReminderToFirestore(reminder: MedicineReminder) {
  if (!db) return;
  try {
    await setDoc(doc(db, 'reminders', reminder.id), cleanDataForFirestore(reminder));
  } catch (err) {
    console.error("Error adding reminder to Firestore:", err);
  }
}

export async function toggleReminderTakenInFirestore(reminderId: string, currentTaken: boolean) {
  if (!db) return;
  try {
    const ref = doc(db, 'reminders', reminderId);
    await setDoc(ref, { takenToday: !currentTaken }, { merge: true });
  } catch (err) {
    console.error("Error updating reminder in Firestore:", err);
  }
}

export async function addNotificationToFirestore(notification: NotificationItem) {
  if (!db) return;
  try {
    await setDoc(doc(db, 'notifications', notification.id), cleanDataForFirestore(notification));
  } catch (err) {
    console.error("Error adding notification to Firestore:", err);
  }
}

export async function markNotificationReadInFirestore(id: string) {
  if (!db) return;
  try {
    const ref = doc(db, 'notifications', id);
    await setDoc(ref, { read: true }, { merge: true });
  } catch (err) {
    console.error("Error marking notification read in Firestore:", err);
  }
}

export function subscribeToBlockchainBlocks(callback: (blocks: BlockchainBlock[]) => void) {
  if (!db) return () => {};
  const q = collection(db, 'blockchain_blocks');
  return onSnapshot(q, (snapshot) => {
    const list: BlockchainBlock[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as BlockchainBlock);
    });
    if (list.length > 0) {
      // Sort by blockIndex ascending
      list.sort((a, b) => a.blockIndex - b.blockIndex);
      callback(list);
    }
  }, (err) => {
    console.warn("Blockchain blocks realtime sync warning:", err);
  });
}

export async function addBlockToFirestore(block: BlockchainBlock) {
  if (!db) return;
  try {
    await setDoc(doc(db, 'blockchain_blocks', 'blk-' + block.blockIndex), cleanDataForFirestore(block));
  } catch (err) {
    console.error("Error adding blockchain block to Firestore:", err);
  }
}
