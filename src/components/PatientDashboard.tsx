import React, { useState } from 'react';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  FileText, 
  Pill, 
  Bell, 
  CheckCircle2, 
  Plus, 
  AlertCircle, 
  Printer, 
  Download, 
  User,
  ShieldCheck,
  Activity,
  Heart
} from 'lucide-react';
import { Appointment, MedicineReminder, NotificationItem } from '../types';

interface PatientDashboardProps {
  appointments: Appointment[];
  reminders: MedicineReminder[];
  onToggleReminderTaken: (id: string) => void;
  onAddReminder: (reminder: Partial<MedicineReminder>) => void;
  notifications: NotificationItem[];
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  appointments,
  reminders,
  onToggleReminderTaken,
  onAddReminder,
  notifications,
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'prescriptions' | 'reminders' | 'profile'>('appointments');
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [newMedTime, setNewMedTime] = useState('08:00 AM');

  // Selected prescription for modal view
  const [selectedPrescription, setSelectedPrescription] = useState<Appointment | null>(null);

  const handleAddReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName) return;
    onAddReminder({
      medicineName: newMedName,
      dosage: newMedDosage || '1 Tablet',
      timeSlot: newMedTime,
      takenToday: false,
    });
    setNewMedName('');
    setNewMedDosage('');
    setShowAddReminderModal(false);
  };

  const patientAppointments = appointments.filter(a => a.patientName.includes('Jessica') || true); // Default all for demo

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Patient Header Profile Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xl border border-teal-500/20">
            JT
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Jessica Taylor</h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-md">
                Patient ID: PAT-8821
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              42 Yrs • Female • Blood Group: A+ • Contact: +1 (555) 234-5678
            </p>
          </div>
        </div>

        {/* Quick Health Stats */}
        <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
          <div className="text-center px-3 border-r border-slate-200 dark:border-slate-700">
            <div className="text-[10px] text-slate-400">Heart Rate</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center space-x-1">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>72 bpm</span>
            </div>
          </div>
          <div className="text-center px-3 border-r border-slate-200 dark:border-slate-700">
            <div className="text-[10px] text-slate-400">Blood Pressure</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">120/80</div>
          </div>
          <div className="text-center px-3">
            <div className="text-[10px] text-slate-400">Upcoming Consult</div>
            <div className="text-xs font-bold text-teal-600 dark:text-teal-400">09:30 AM Today</div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 ${
            activeTab === 'appointments'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Appointments ({patientAppointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 ${
            activeTab === 'prescriptions'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Digital Prescriptions</span>
        </button>

        <button
          onClick={() => setActiveTab('reminders')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 ${
            activeTab === 'reminders'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Medicine Reminders ({reminders.filter(r => !r.takenToday).length} pending)</span>
        </button>
      </div>

      {/* Tab 1: Appointments List */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientAppointments.map((apt) => (
              <div 
                key={apt.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-teal-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    apt.priority === 'EMERGENCY'
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      : apt.priority === 'URGENT'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {apt.priority} PRIORITY
                  </span>

                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Status: <strong className="text-teal-600 dark:text-teal-400">{apt.status}</strong>
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{apt.doctorName}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{apt.doctorSpecialty} • {apt.department}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Date & Time</span>
                    <span className="font-semibold">{apt.date} @ {apt.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Bed / Location</span>
                    <span className="font-semibold">{apt.bedAssigned || 'Outpatient Clinic'}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Symptom Summary:</span>
                  {apt.symptomSummary}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Digital Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-teal-500" />
              <span>Official Digital E-Prescriptions</span>
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">Rx-9021 • Cardiology Consultation</div>
                    <div className="text-xs text-slate-500">Prescribed by Dr. Sarah Jenkins on 2026-07-23</div>
                  </div>
                  <button
                    onClick={() => alert("Printing official digital prescription...")}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print PDF</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Diagnosis: Acute Coronary Syndrome (Stabilized)</div>
                  
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Prescribed Medicines:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="font-bold text-teal-600 dark:text-teal-400">Atorvastatin 20mg</div>
                        <div className="text-[11px] text-slate-500">1 Tablet • Once daily (Night)</div>
                      </div>
                      <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="font-bold text-teal-600 dark:text-teal-400">Aspirin 81mg</div>
                        <div className="text-[11px] text-slate-500">1 Tablet • Daily after breakfast</div>
                      </div>
                      <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="font-bold text-teal-600 dark:text-teal-400">Lisinopril 10mg</div>
                        <div className="text-[11px] text-slate-500">1 Tablet • Daily (Morning)</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                    Special Advice: Follow up ECG in 7 days. Avoid heavy isometric exercise. Contact emergency if chest tightness recurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Medicine Reminders */}
      {activeTab === 'reminders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Pill className="w-5 h-5 text-teal-500" />
              <span>Daily Pill Tracker & Dosage Schedule</span>
            </h3>

            <button
              onClick={() => setShowAddReminderModal(true)}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Medication</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reminders.map((rem) => (
              <div 
                key={rem.id}
                className={`p-5 rounded-3xl border transition-all space-y-3 ${
                  rem.takenToday
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{rem.medicineName}</h4>
                    <p className="text-xs text-slate-500">{rem.dosage}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-[10px] font-semibold flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {rem.timeSlot}
                  </span>
                </div>

                {rem.notes && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    "{rem.notes}"
                  </p>
                )}

                <button
                  onClick={() => onToggleReminderTaken(rem.id)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                    rem.takenToday
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{rem.takenToday ? 'Taken Today ✓' : 'Mark as Taken'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Medication Modal */}
      {showAddReminderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Add Medicine Reminder</h3>
            
            <form onSubmit={handleAddReminderSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  required
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  placeholder="e.g. Lisinopril 10mg"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={newMedDosage}
                    onChange={(e) => setNewMedDosage(e.target.value)}
                    placeholder="e.g. 1 Tablet"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Time Slot
                  </label>
                  <input
                    type="text"
                    value={newMedTime}
                    onChange={(e) => setNewMedTime(e.target.value)}
                    placeholder="e.g. 08:00 AM"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReminderModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
