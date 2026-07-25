import React from 'react';
import { ShieldAlert, Lock, LogIn, ArrowRight, UserCheck, Stethoscope, Building2 } from 'lucide-react';
import { UserRole } from '../types';
import { UserProfile } from '../lib/firebase';

interface AccessGuardProps {
  currentUserProfile: UserProfile | null;
  requiredRoles?: UserRole[];
  featureName: string;
  onGoToLogin: () => void;
  onGoToAllowedPortal: (role: UserRole) => void;
  onSignOut: () => void;
}

export const AccessGuard: React.FC<AccessGuardProps> = ({
  currentUserProfile,
  requiredRoles,
  featureName,
  onGoToLogin,
  onGoToAllowedPortal,
  onSignOut,
}) => {
  if (!currentUserProfile) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <span className="px-3 py-1 bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[10px] font-extrabold uppercase tracking-wider rounded-full">
            Security & Authorization Guard
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Authentication Required
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Access to <strong>{featureName}</strong> is restricted to authorized MediFlow users. Please sign in or create an account to access patient records, triage, or clinical systems.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onGoToLogin}
            className="w-full sm:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In or Register Account</span>
          </button>
        </div>
      </div>
    );
  }

  // If user is logged in but role is not authorized
  if (requiredRoles && !requiredRoles.includes(currentUserProfile.role)) {
    const roleIcons = {
      PATIENT: UserCheck,
      DOCTOR: Stethoscope,
      ADMIN: Building2,
    };
    const AllowedIcon = roleIcons[currentUserProfile.role] || UserCheck;

    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-amber-200 dark:border-amber-800/60 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[10px] font-extrabold uppercase tracking-wider rounded-full">
            Unauthorized Domain Access
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Access Restricted for {currentUserProfile.role}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            You are currently logged in as <strong>{currentUserProfile.displayName}</strong> ({currentUserProfile.email}) under the <strong>{currentUserProfile.role}</strong> domain profile.
            Accessing <strong>{featureName}</strong> requires <strong>{requiredRoles.join(' or ')}</strong> domain authorization.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onGoToAllowedPortal(currentUserProfile.role)}
            className="w-full sm:w-auto px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <AllowedIcon className="w-4 h-4" />
            <span>Go to My {currentUserProfile.role} Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onSignOut}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs rounded-xl transition-colors"
          >
            Sign Out / Switch Account
          </button>
        </div>
      </div>
    );
  }

  return null;
};
