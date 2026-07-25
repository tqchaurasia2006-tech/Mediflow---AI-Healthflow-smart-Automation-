import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Clock, 
  Users, 
  ShieldCheck, 
  Bed, 
  Stethoscope, 
  BrainCircuit, 
  UserCheck,
  Building2,
  Lock,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  Database,
  KeyRound,
  LogOut,
  Hospital
} from 'lucide-react';
import { UserRole } from '../types';
import { 
  auth, 
  saveUserProfile, 
  getUserProfile, 
  UserProfile 
} from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut 
} from 'firebase/auth';

interface LandingHeroProps {
  onStartTriage: () => void;
  onOpenPatientPortal: () => void;
  onOpenDoctorPortal: () => void;
  onOpenBedMatrix: () => void;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  currentUserProfile: UserProfile | null;
  onLoginSuccess: (profile: UserProfile) => void;
  onSignOut: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartTriage,
  onOpenPatientPortal,
  onOpenDoctorPortal,
  onOpenBedMatrix,
  currentRole,
  setRole,
  currentUserProfile,
  onLoginSuccess,
  onSignOut,
}) => {
  // Domain Tab selection for Login Portal (PATIENT | DOCTOR | ADMIN)
  const [selectedDomain, setSelectedDomain] = useState<UserRole>('PATIENT');
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  
  // Form State
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  // Handle Real Firebase Sign In / Register
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccessMsg(null);
    if (!email || !password) {
      setAuthError('Please enter email and password.');
      return;
    }
    if (isRegisterMode && !displayName) {
      setAuthError('Please enter your full name.');
      return;
    }

    setLoading(true);
    try {
      if (isRegisterMode) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const profile: UserProfile = {
          uid: userCred.user.uid,
          email: userCred.user.email || email,
          displayName: displayName || userCred.user.email?.split('@')[0] || 'User',
          role: selectedDomain,
          createdAt: new Date().toISOString()
        };
        await saveUserProfile(profile);
        onLoginSuccess(profile);
        setRole(selectedDomain);
        setAuthSuccessMsg(`Registered & Logged in as ${profile.displayName} (${selectedDomain} Domain)`);
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        let profile = await getUserProfile(userCred.user.uid);
        if (!profile) {
          profile = {
            uid: userCred.user.uid,
            email: userCred.user.email || email,
            displayName: userCred.user.displayName || userCred.user.email?.split('@')[0] || 'User',
            role: selectedDomain,
            createdAt: new Date().toISOString()
          };
          await saveUserProfile(profile);
        }
        onLoginSuccess(profile);
        setRole(profile.role);
        setAuthSuccessMsg(`Welcome back, ${profile.displayName}! (${profile.role} Domain)`);
      }
    } catch (err: any) {
      console.error("Firebase auth error:", err);
      // Fallback for demo credentials or standard Firebase Auth error mapping
      let msg = err.message || 'Authentication failed. Please check credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid credentials. You can also use Quick Demo Access below!';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'An account with this email already exists. Try signing in.';
      }
      setAuthError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Access Handler for seamless testing
  const handleQuickDemoLogin = async (role: UserRole) => {
    setLoading(true);
    setAuthError(null);
    setAuthSuccessMsg(null);

    const demoProfiles: Record<UserRole, { email: string; name: string; dept?: string }> = {
      PATIENT: { email: 'patient.jessica@mediflow.org', name: 'Jessica Taylor (Patient)' },
      DOCTOR: { email: 'dr.jenkins@mediflow.org', name: 'Dr. Sarah Jenkins (Cardiology Lead)', dept: 'Cardiology' },
      ADMIN: { email: 'admin.director@mediflow.org', name: 'Chief Administrator (Hospital Ops)' }
    };

    const target = demoProfiles[role];
    const demoUid = 'demo-' + role.toLowerCase() + '-101';
    
    const profile: UserProfile = {
      uid: demoUid,
      email: target.email,
      displayName: target.name,
      role: role,
      department: target.dept,
      createdAt: new Date().toISOString()
    };

    try {
      await saveUserProfile(profile);
      onLoginSuccess(profile);
      setRole(role);
      setSelectedDomain(role);
      setAuthSuccessMsg(`Logged into ${role} Domain as ${profile.displayName}! Details stored in Firestore.`);
      
      // Auto redirect to domain portal
      setTimeout(() => {
        if (role === 'PATIENT') onOpenPatientPortal();
        if (role === 'DOCTOR') onOpenDoctorPortal();
        if (role === 'ADMIN') onOpenBedMatrix();
      }, 600);

    } catch (err) {
      console.error("Demo login error:", err);
      onLoginSuccess(profile);
      setRole(role);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero & Multi-Domain Auth Portal Header */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        
        {/* Soft Background Accent Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-teal-500/10 dark:bg-teal-500/20 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[320px] h-[320px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-8">
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-semibold backdrop-blur">
              <Sparkles className="w-4 h-4 text-teal-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>AI Orchestrated Healthcare Management System</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
              Healthcare Access Portal
            </h1>
          </div>

          {/* Active Session Card (If user is already signed in) */}
          {currentUserProfile ? (
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-teal-900/90 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-teal-500/30 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 text-teal-300 flex items-center justify-center font-bold text-lg">
                    {currentUserProfile.displayName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold">{currentUserProfile.displayName}</h3>
                      <span className="px-2 py-0.5 rounded-md bg-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
                        {currentUserProfile.role} Domain
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{currentUserProfile.email}</p>
                  </div>
                </div>

                <button
                  onClick={onSignOut}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center space-x-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Direct Domain Launchers */}
              <div>
                <p className="text-xs text-slate-400 font-medium mb-3">Quick Launch Domain Portals:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={onOpenPatientPortal}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center space-x-2.5 ${
                      currentUserProfile.role === 'PATIENT'
                        ? 'bg-teal-600/30 border-teal-500 text-white shadow-lg'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <UserCheck className="w-5 h-5 text-teal-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Patient Portal</div>
                      <div className="text-[10px] text-slate-400">Triage & Reminders</div>
                    </div>
                  </button>

                  <button
                    onClick={onOpenDoctorPortal}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center space-x-2.5 ${
                      currentUserProfile.role === 'DOCTOR'
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Stethoscope className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Doctor Portal</div>
                      <div className="text-[10px] text-slate-400">Clinical Queue & ER</div>
                    </div>
                  </button>

                  <button
                    onClick={onOpenBedMatrix}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center space-x-2.5 ${
                      currentUserProfile.role === 'ADMIN'
                        ? 'bg-amber-600/30 border-amber-500 text-white shadow-lg'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Admin & Beds</div>
                      <div className="text-[10px] text-slate-400">Bed Matrix Command</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Multi-Domain Authentication Form Card */
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
              
              {/* Domain Switcher Tab Bar */}
              <div className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 gap-2">
                
                {/* 1. Patient Domain Tab */}
                <button
                  type="button"
                  onClick={() => { setSelectedDomain('PATIENT'); setAuthError(null); }}
                  className={`py-3.5 px-3 rounded-2xl flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold transition-all ${
                    selectedDomain === 'PATIENT'
                      ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-md border border-slate-200 dark:border-slate-800'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-teal-500" />
                  <span>Patient Domain</span>
                </button>

                {/* 2. Doctor Domain Tab */}
                <button
                  type="button"
                  onClick={() => { setSelectedDomain('DOCTOR'); setAuthError(null); }}
                  className={`py-3.5 px-3 rounded-2xl flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold transition-all ${
                    selectedDomain === 'DOCTOR'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md border border-slate-200 dark:border-slate-800'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Stethoscope className="w-4 h-4 text-indigo-500" />
                  <span>Doctor Domain</span>
                </button>

                {/* 3. Admin Domain Tab */}
                <button
                  type="button"
                  onClick={() => { setSelectedDomain('ADMIN'); setAuthError(null); }}
                  className={`py-3.5 px-3 rounded-2xl flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold transition-all ${
                    selectedDomain === 'ADMIN'
                      ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-md border border-slate-200 dark:border-slate-800'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-amber-500" />
                  <span>Admin Domain</span>
                </button>
              </div>

              {/* Login Form Body for Selected Domain */}
              <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Side: Domain Description & Direct Features */}
                <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-6">
                  
                  {selectedDomain === 'PATIENT' && (
                    <div className="space-y-3">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-semibold">
                        <UserCheck className="w-4 h-4" />
                        <span>Patient Portal & Triage</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Patient Domain Access</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Access AI Symptom Triage, check upcoming specialist appointments, manage daily medicine dosages, and review consultation summaries.
                      </p>
                      <ul className="space-y-2 pt-2">
                        <li className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                          <span>AI Powered Symptom Triage Analysis</span>
                        </li>
                        <li className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                          <span>Instant Smart Specialist Scheduling</span>
                        </li>
                        <li className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                          <span>Personalized Medicine Tracker</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {selectedDomain === 'DOCTOR' && (
                    <div className="space-y-3">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                        <Stethoscope className="w-4 h-4" />
                        <span>Physician & Specialist Portal</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Doctor Domain Access</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Review AI-prioritized patient intake queues, analyze emergency symptom flags, update consultation records, and issue digital prescriptions.
                      </p>
                      <ul className="space-y-2 pt-2">
                        <li className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>AI Triage Emergency Prioritization</span>
                        </li>
                        <li className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>Live Clinical Patient Workflows</span>
                        </li>
                        <li className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>Shift Availability Roster Management</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {selectedDomain === 'ADMIN' && (
                    <div className="space-y-3">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                        <Building2 className="w-4 h-4" />
                        <span>Hospital Command & Bed Matrix</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Admin Domain Access</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Monitor real-time ICU and ward bed occupancy, manage staff scheduling, track ER bottleneck metrics, and oversee hospital infrastructure.
                      </p>
                      <ul className="space-y-2 pt-2">
                        <li className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>Real-Time Bed Matrix & ICU Occupancy</span>
                        </li>
                        <li className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>Hospital Operations & Analytics</span>
                        </li>
                        <li className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>Firestore Database Sync & User Auditing</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* 1-Click Quick Demo Login Button for selected domain */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin(selectedDomain)}
                      disabled={loading}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all flex items-center justify-center space-x-2 shadow-sm"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-teal-400" />
                      <span>1-Click Quick Login as Demo {selectedDomain}</span>
                    </button>
                  </div>
                </div>

                {/* Right Side: Firebase Authentication Input Form */}
                <div className="lg:col-span-7 space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {isRegisterMode ? `Create New ${selectedDomain} Account` : `Sign In to ${selectedDomain} Domain`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => { setIsRegisterMode(!isRegisterMode); setAuthError(null); }}
                      className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      {isRegisterMode ? 'Already registered? Sign In' : 'New user? Register Account'}
                    </button>
                  </div>

                  {/* Status / Error Alerts */}
                  {authError && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{authError}</span>
                    </div>
                  )}

                  {authSuccessMsg && (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>{authSuccessMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                    
                    {/* Full Name Input (Register Mode Only) */}
                    {isRegisterMode && (
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder={selectedDomain === 'DOCTOR' ? 'Dr. John Doe' : 'Full Name'}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Domain Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={`${selectedDomain.toLowerCase()}@mediflow.com`}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Domain Role Confirmation Badge */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Target Firestore Domain:</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400 uppercase">
                        {selectedDomain}
                      </span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/30 transition-all flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>{isRegisterMode ? `Register ${selectedDomain} Account` : `Sign In to ${selectedDomain} Domain`}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>

                </div>

              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
