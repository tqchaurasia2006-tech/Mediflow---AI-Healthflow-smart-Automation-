import React, { useState } from 'react';
import { 
  Stethoscope, 
  UserCheck, 
  AlertTriangle, 
  Clock, 
  Activity, 
  FileText, 
  Bed, 
  CheckCircle2, 
  Send, 
  Search,
  Plus,
  ShieldAlert,
  ChevronRight,
  HeartPulse
} from 'lucide-react';
import { Appointment, Doctor, PriorityLevel } from '../types';

interface DoctorDashboardProps {
  doctors: Doctor[];
  appointments: Appointment[];
  onUpdateAppointmentStatus: (id: string, status: Appointment['status'], bedAssigned?: string) => void;
  onOpenBedModalForPatient: (patientName: string) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  doctors,
  appointments,
  onUpdateAppointmentStatus,
  onOpenBedModalForPatient,
}) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || 'doc-1');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>(appointments[0]?.id || '');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  // E-Prescription Form State
  const [rxDiagnosis, setRxDiagnosis] = useState('');
  const [rxMedName, setRxMedName] = useState('');
  const [rxDosage, setRxDosage] = useState('');
  const [rxFreq, setRxFreq] = useState('');
  const [rxSaved, setRxSaved] = useState(false);

  const activeDoc = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

  // Filter queue for this doctor, sorted strictly by Priority (EMERGENCY > URGENT > ROUTINE)
  const docAppointments = appointments
    .filter(a => filterPriority === 'ALL' || a.priority === filterPriority)
    .sort((a, b) => {
      const pOrder: Record<PriorityLevel, number> = { EMERGENCY: 0, URGENT: 1, ROUTINE: 2 };
      return pOrder[a.priority] - pOrder[b.priority];
    });

  const selectedApt = appointments.find(a => a.id === selectedAppointmentId) || docAppointments[0];

  const emergencyCasesCount = appointments.filter(a => a.priority === 'EMERGENCY' && a.status !== 'COMPLETED').length;

  const handleSavePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    setRxSaved(true);
    setTimeout(() => setRxSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Doctor Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={activeDoc.avatar}
            alt={activeDoc.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-md"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{activeDoc.name}</h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-md">
                ON DUTY • Room {activeDoc.roomNumber}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {activeDoc.specialty} • {activeDoc.department} Dept • {activeDoc.experienceYears} Yrs Exp
            </p>
          </div>
        </div>

        {/* Doctor Switcher & Emergency Badge */}
        <div className="flex items-center space-x-3">
          {emergencyCasesCount > 0 && (
            <div className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 rounded-2xl text-xs font-bold flex items-center space-x-1.5 animate-pulse">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>{emergencyCasesCount} Emergency Cases</span>
            </div>
          )}

          <div className="text-right">
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Switch Doctor View</label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {doctors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.department})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Assessment Queue sorted by Emergency Level */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Activity className="w-5 h-5 text-teal-500" />
              <span>Prioritized Patient Queue ({docAppointments.length})</span>
            </h2>

            {/* Priority Filter */}
            <div className="flex items-center space-x-1 text-xs">
              <button
                onClick={() => setFilterPriority('ALL')}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold ${filterPriority === 'ALL' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterPriority('EMERGENCY')}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold ${filterPriority === 'EMERGENCY' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
              >
                Emergency
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {docAppointments.map((apt) => (
              <div
                key={apt.id}
                onClick={() => setSelectedAppointmentId(apt.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedApt?.id === apt.id
                    ? 'bg-teal-50/80 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                      apt.priority === 'EMERGENCY'
                        ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                        : apt.priority === 'URGENT'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {apt.priority}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{apt.patientName}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">{apt.timeSlot}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {apt.symptomSummary}
                </p>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-400">
                    Dept: <strong className="text-slate-700 dark:text-slate-300">{apt.department}</strong>
                  </span>
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    Status: {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Patient Medical Detail & AI Assessment Summary */}
        <div className="lg:col-span-7 space-y-6">
          {selectedApt ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              
              {/* Header with Patient Bio */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedApt.patientName}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      selectedApt.priority === 'EMERGENCY' ? 'bg-rose-100 dark:bg-rose-950 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {selectedApt.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {selectedApt.patientAge} Yrs • {selectedApt.patientGender} • Contact: {selectedApt.patientContact}
                  </p>
                </div>

                {/* Status Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateAppointmentStatus(selectedApt.id, 'IN_CONSULTATION')}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-sm"
                  >
                    Start Consultation
                  </button>
                  <button
                    onClick={() => onOpenBedModalForPatient(selectedApt.patientName)}
                    className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-xl"
                  >
                    Assign Bed
                  </button>
                  <button
                    onClick={() => onUpdateAppointmentStatus(selectedApt.id, 'COMPLETED')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm"
                  >
                    Complete
                  </button>
                </div>
              </div>

              {/* AI Orchestrator Triage Insights */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <Activity className="w-4 h-4 text-teal-500" />
                    <span>AI Orchestrator Clinical Diagnosis</span>
                  </h3>
                  <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">
                    Target Dept: {selectedApt.department}
                  </span>
                </div>

                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                  "{selectedApt.symptomSummary}"
                </p>

                {selectedApt.aiTriageResult && (
                  <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Differential Probabilities:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedApt.aiTriageResult.possibleConditions.map((cond, idx) => (
                        <div key={idx} className="p-2.5 bg-white dark:bg-slate-800 rounded-xl text-xs border border-slate-200/80 dark:border-slate-700">
                          <div className="font-bold text-slate-900 dark:text-white flex justify-between">
                            <span>{cond.condition}</span>
                            <span className="text-teal-600 dark:text-teal-400">{cond.probability}%</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">{cond.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Doctor E-Prescription Writer */}
              <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-teal-500" />
                  <span>Issue Digital E-Prescription</span>
                </h3>

                <form onSubmit={handleSavePrescription} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Confirmed Diagnosis
                    </label>
                    <input
                      type="text"
                      required
                      value={rxDiagnosis}
                      onChange={(e) => setRxDiagnosis(e.target.value)}
                      placeholder="e.g. Acute Coronary Syndrome / Hypertensive Urgency"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Medicine Name</label>
                      <input
                        type="text"
                        value={rxMedName}
                        onChange={(e) => setRxMedName(e.target.value)}
                        placeholder="Atorvastatin 20mg"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Dosage</label>
                      <input
                        type="text"
                        value={rxDosage}
                        onChange={(e) => setRxDosage(e.target.value)}
                        placeholder="1 Tablet"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Frequency</label>
                      <input
                        type="text"
                        value={rxFreq}
                        onChange={(e) => setRxFreq(e.target.value)}
                        placeholder="Twice daily after meals"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {rxSaved && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Prescription saved & dispatched to patient portal!</span>
                      </span>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Issue Prescription</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-10 border border-dashed border-slate-200 dark:border-slate-800 text-center text-slate-400 text-xs">
              Select a patient from the queue on the left to inspect clinical assessment data.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
