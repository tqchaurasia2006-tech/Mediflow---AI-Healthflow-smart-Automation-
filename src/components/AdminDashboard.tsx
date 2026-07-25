import React, { useState } from 'react';
import { 
  Building2, 
  Bed, 
  BarChart3, 
  Users, 
  Clock, 
  Activity, 
  ShieldCheck, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Sliders,
  Filter,
  UserPlus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Bed as BedType, Doctor, Appointment } from '../types';

interface AdminDashboardProps {
  beds: BedType[];
  doctors: Doctor[];
  appointments: Appointment[];
  onUpdateBedStatus: (bedId: string, status: BedType['status'], patientName?: string, doctorName?: string) => void;
  onToggleDoctorAvailability: (doctorId: string) => void;
  onConfirmAppointment: (appointmentId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  beds,
  doctors,
  appointments,
  onUpdateBedStatus,
  onToggleDoctorAvailability,
  onConfirmAppointment, 
}) => {
  const [activeTab, setActiveTab] = useState<'beds' | 'doctors' | 'appointments'>('beds');
  const [bedFilterStatus, setBedFilterStatus] = useState<string>('ALL');
  const [bedTypeFilter, setBedTypeFilter] = useState<string>('ALL');

  // Modal for assigning bed
  const [selectedBedToAssign, setSelectedBedToAssign] = useState<BedType | null>(null);
  const [assignPatientName, setAssignPatientName] = useState('');
  const [assignDoctorName, setAssignDoctorName] = useState('Dr. Priya Sharma');

  const filteredBeds = beds.filter(b => {
    const matchesStatus = bedFilterStatus === 'ALL' || b.status === bedFilterStatus;
    const matchesType = bedTypeFilter === 'ALL' || b.type === bedTypeFilter;
    return matchesStatus && matchesType;
  });

  const occupiedBedsCount = beds.filter(b => b.status === 'OCCUPIED').length;
  const availableBedsCount = beds.filter(b => b.status === 'AVAILABLE').length;

  const handleAssignBedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBedToAssign || !assignPatientName) return;

    onUpdateBedStatus(selectedBedToAssign.id, 'OCCUPIED', assignPatientName, assignDoctorName);
    setSelectedBedToAssign(null);
    setAssignPatientName('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Admin Control Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Hospital OT & Bed Matrix</h1>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-full">
              LIVE SYSTEM
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time bed matrix control, ICU allocation, and doctor shift management.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
          <button
            onClick={() => setActiveTab('beds')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'beds' ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Bed className="w-3.5 h-3.5" />
            <span>Beds ({occupiedBedsCount}/{beds.length} Used)</span>
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'doctors' ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Doctor Shifts</span>
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'appointments' ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Queue Management</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Bed Management System Matrix */}
      {activeTab === 'beds' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                <Bed className="w-5 h-5 text-teal-500" />
                <span>Real-Time Bed Matrix & Allocation Hub</span>
              </h2>
              <p className="text-xs text-slate-500">Monitor ICU, Emergency Bays, Wards, and Operating Theaters.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={bedFilterStatus}
                onChange={(e) => setBedFilterStatus(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="ALL">All Statuses</option>
                <option value="AVAILABLE">Available Only</option>
                <option value="OCCUPIED">Occupied Only</option>
                <option value="CLEANING">Cleaning / Prep</option>
                <option value="MAINTENANCE">Maintenance</option>
              </select>

              <select
                value={bedTypeFilter}
                onChange={(e) => setBedTypeFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="ALL">All Unit Types</option>
                <option value="ICU">ICU Units</option>
                <option value="EMERGENCY_BAY">Emergency Bays</option>
                <option value="GENERAL_WARD">General Wards</option>
                <option value="OPERATION_THEATER">Operating Theater</option>
              </select>
            </div>
          </div>

          {/* Beds Grid Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredBeds.map((bed) => (
              <div 
                key={bed.id}
                className={`p-4 rounded-3xl border transition-all space-y-3 relative overflow-hidden ${
                  bed.status === 'OCCUPIED'
                    ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/80'
                    : bed.status === 'AVAILABLE'
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/80'
                    : bed.status === 'CLEANING'
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/80'
                    : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{bed.code}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                    bed.status === 'OCCUPIED'
                      ? 'bg-rose-500 text-white'
                      : bed.status === 'AVAILABLE'
                      ? 'bg-emerald-600 text-white'
                      : bed.status === 'CLEANING'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-500 text-white'
                  }`}>
                    {bed.status}
                  </span>
                </div>

                <div className="text-xs space-y-0.5">
                  <div className="text-[10px] text-slate-400">{bed.type.replace('_', ' ')} • Floor {bed.floor}</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">{bed.wing}</div>
                </div>

                {bed.status === 'OCCUPIED' ? (
                  <div className="p-2 bg-white/80 dark:bg-slate-800/80 rounded-xl text-[11px] space-y-0.5 border border-slate-200/50 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white">{bed.currentPatientName}</div>
                    <div className="text-slate-500 text-[10px]">Doctor: {bed.assignedDoctorName}</div>
                    <button
                      onClick={() => onUpdateBedStatus(bed.id, 'CLEANING')}
                      className="w-full mt-1.5 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] rounded-lg transition-colors"
                    >
                      Discharge & Sanitize
                    </button>
                  </div>
                ) : bed.status === 'AVAILABLE' ? (
                  <button
                    onClick={() => setSelectedBedToAssign(bed)}
                    className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    + Assign Patient
                  </button>
                ) : bed.status === 'CLEANING' ? (
                  <button
                    onClick={() => onUpdateBedStatus(bed.id, 'AVAILABLE')}
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Mark Ready
                  </button>
                ) : (
                  <button
                    onClick={() => onUpdateBedStatus(bed.id, 'AVAILABLE')}
                    className="w-full py-1.5 bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Restore Status
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Doctor Shift & Availability Manager */}
      {activeTab === 'doctors' && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-teal-500" />
            <span>Doctor Shift Roster & Availability Toggles</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map((doc) => (
              <div 
                key={doc.id}
                className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-2xl object-cover border" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{doc.name}</h3>
                    <p className="text-xs text-slate-500">{doc.specialty} • {doc.department}</p>
                    <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold mt-0.5">
                      Active Load: {doc.currentPatientsCount} / {doc.maxPatientsPerDay} Patients
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onToggleDoctorAvailability(doc.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    doc.isAvailable
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {doc.isAvailable ? 'ON DUTY ✓' : 'OFF DUTY'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assign Bed Modal */}
      {selectedBedToAssign && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Assign Bed: {selectedBedToAssign.code} ({selectedBedToAssign.type})
            </h3>

            <form onSubmit={handleAssignBedSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  value={assignPatientName}
                  onChange={(e) => setAssignPatientName(e.target.value)}
                  placeholder="e.g. Jessica Taylor"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Assigned Physician
                </label>
                <select
                  value={assignDoctorName}
                  onChange={(e) => setAssignDoctorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.department})</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBedToAssign(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md"
                >
                  Confirm Bed Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
