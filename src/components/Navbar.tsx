import React, { useState } from 'react';
import { 
  Activity, 
  Stethoscope, 
  UserCheck, 
  Building2, 
  Bed, 
  Bell, 
  Sun, 
  Moon, 
  AlertTriangle,
  ChevronDown,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  LogOut,
  User
} from 'lucide-react';
import { UserRole, NotificationItem } from '../types';
import { UserProfile } from '../lib/firebase';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  onOpenChatbot: () => void;
  currentUserProfile?: UserProfile | null;
  onSignOut?: () => void;
  onGoToLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  setRole,
  darkMode,
  setDarkMode,
  notifications,
  markNotificationRead,
  onOpenChatbot,
  currentUserProfile,
  onSignOut,
  onGoToLogin,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const emergencyNotifs = notifications.filter(n => n.type === 'EMERGENCY' && !n.read);

  const isAuthenticated = Boolean(currentUserProfile);

  const handleRoleChange = (role: UserRole) => {
    setRole(role);
    setShowRoleMenu(false);
    if (role === 'PATIENT' && activeTab === 'doctor') setActiveTab('patient');
    if (role === 'DOCTOR' && activeTab === 'patient') setActiveTab('doctor');
    if (role === 'ADMIN' && activeTab !== 'admin' && activeTab !== 'beds') setActiveTab('admin');
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Emergency Global Banner if Critical Notification Exists */}
      {emergencyNotifs.length > 0 && (
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between shadow-inner">
          <div className="flex items-center space-x-2 animate-pulse">
            <AlertTriangle className="w-4 h-4 text-amber-200 shrink-0" />
            <span>
              <strong>CRITICAL ALERT:</strong> {emergencyNotifs[0].message}
            </span>
          </div>
          <button 
            onClick={() => markNotificationRead(emergencyNotifs[0].id)}
            aria-label="Acknowledge critical alert"
            className="px-2 py-0.5 bg-black/20 hover:bg-black/30 rounded text-[11px] backdrop-blur transition-colors"
          >
            Acknowledge
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-teal-500/20">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                  Medi<span className="text-teal-600 dark:text-teal-400">Flow</span>
                </span>
              </div>

            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'landing'
                  ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('triage')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'triage'
                  ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span>AI Symptom Triage</span>
              {!isAuthenticated && <Lock className="w-3 h-3 text-amber-500 ml-0.5" />}
            </button>

            <button
              onClick={() => setActiveTab('patient')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'patient'
                  ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Patient Portal</span>
              {!isAuthenticated && <Lock className="w-3 h-3 text-amber-500 ml-0.5" />}
            </button>

            <button
              onClick={() => setActiveTab('doctor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'doctor'
                  ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doctor Portal</span>
              {!isAuthenticated && <Lock className="w-3 h-3 text-amber-500 ml-0.5" />}
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'admin'
                  ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Admin Hub</span>
              {!isAuthenticated && <Lock className="w-3 h-3 text-amber-500 ml-0.5" />}
            </button>

            <button
              onClick={() => setActiveTab('beds')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'beds'
                  ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Bed className="w-3.5 h-3.5" />
              <span>Bed Matrix</span>
              {!isAuthenticated && <Lock className="w-3 h-3 text-amber-500 ml-0.5" />}
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-2.5">
            {/* User Auth Profile Badge if signed in */}
            {currentUserProfile && (
              <div className="flex items-center space-x-2 border-r border-slate-200 dark:border-slate-800 pr-2">
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                    {currentUserProfile.displayName}
                  </span>
                  <span className="text-[10px] font-extrabold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                    {currentUserProfile.role}
                  </span>
                </div>
                <button
                  onClick={onSignOut}
                  title="Sign Out Account"
                  className="p-1.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 rounded-lg transition-colors flex items-center space-x-1 text-xs font-semibold border border-rose-200 dark:border-rose-800/50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            )}

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                aria-label="Toggle notifications menu"
                className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900 dark:text-white">Notifications ({unreadCount})</span>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium cursor-pointer" onClick={() => notifications.forEach(n => markNotificationRead(n.id))}>
                      Mark all as read
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">No recent notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                            !n.read ? 'bg-teal-50/50 dark:bg-teal-950/20' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className={`font-semibold ${n.type === 'EMERGENCY' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-slate-200'}`}>
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center">
                              <Clock className="w-2.5 h-2.5 mr-0.5" />
                              {n.time}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-1 line-clamp-2">
                            {n.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="md:hidden flex items-center justify-around bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 py-2 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('landing')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
            activeTab === 'landing' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('triage')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
            activeTab === 'triage' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          AI Triage
        </button>
        <button
          onClick={() => setActiveTab('patient')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
            activeTab === 'patient' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Patient
        </button>
        <button
          onClick={() => setActiveTab('doctor')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
            activeTab === 'doctor' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Doctor
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
            activeTab === 'admin' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => setActiveTab('beds')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
            activeTab === 'beds' ? 'bg-teal-600 text-white' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Beds
        </button>
      </div>
    </header>
  );
};
