import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Stethoscope, 
  Send, 
  ShieldAlert,
  Calendar,
  User,
  HeartPulse,
  ArrowRight
} from 'lucide-react';
import { SymptomAnalysisResult, Doctor, Appointment, PriorityLevel } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SymptomTriageOrchestratorProps {
  doctors: Doctor[];
  onBookAppointment: (appointmentData: Partial<Appointment>) => void;
  onNavigateToDoctorPortal: () => void;
}

export const SymptomTriageOrchestrator: React.FC<SymptomTriageOrchestratorProps> = ({
  doctors,
  onBookAppointment,
  onNavigateToDoctorPortal,
}) => {
  const { t } = useLanguage();
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('1 hour');
  const [age, setAge] = useState(42);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [vitals, setVitals] = useState('');
  const [patientName, setPatientName] = useState('Jessica Taylor');

  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [triageResult, setTriageResult] = useState<SymptomAnalysisResult | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:30 AM');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const pipelineSteps = [
    { title: 'Symptom Analysis AI', desc: 'Parsing clinical natural language' },
    { title: 'Disease Prediction AI', desc: 'Running differential diagnostic models' },
    { title: 'Department Recommendation AI', desc: 'Matching specialized hospital department' },
    { title: 'Priority Classification AI', desc: 'Assigning emergency care urgency' },
    { title: 'Appointment Scheduler', desc: 'Finding optimal specialist doctor' },
  ];

  const handleRunOrchestration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsOrchestrating(true);
    setTriageResult(null);
    setBookingSuccess(false);

    // Animate pipeline steps for visual UX
    for (let i = 0; i < pipelineSteps.length; i++) {
      setActiveStep(i);
      await new Promise(r => setTimeout(r, 400));
    }

    try {
      const response = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms,
          duration,
          age,
          gender,
          vitals
        })
      });

      const data: SymptomAnalysisResult = await response.json();
      setTriageResult(data);

      // Auto-select best matching doctor
      const matchingDoctor = doctors.find(
        d => d.department.toLowerCase() === data.recommendedDepartment.toLowerCase()
      ) || doctors[0];
      if (matchingDoctor) setSelectedDoctorId(matchingDoctor.id);

    } catch (err) {
      console.error('Triage error:', err);
    } finally {
      setIsOrchestrating(false);
    }
  };

  const handleBookNow = () => {
    if (!triageResult) return;

    const chosenDoc = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

    const newAppointment: Partial<Appointment> = {
      patientId: 'pat-' + Date.now(),
      patientName: patientName || 'Jessica Taylor',
      patientAge: Number(age),
      patientGender: gender,
      patientContact: '+1 (555) 019-2831',
      department: triageResult.recommendedDepartment,
      doctorId: chosenDoc.id,
      doctorName: chosenDoc.name,
      doctorSpecialty: chosenDoc.specialty,
      date: new Date().toISOString().split('T')[0],
      timeSlot: selectedTimeSlot,
      priority: triageResult.urgencyLevel,
      status: 'CONFIRMED',
      symptomSummary: symptoms,
      aiTriageResult: triageResult,
    };

    onBookAppointment(newAppointment);
    setBookingSuccess(true);
  };

  const setPresetSymptom = (text: string, presetDuration: string, presetVitals?: string) => {
    setSymptoms(text);
    setDuration(presetDuration);
    if (presetVitals) setVitals(presetVitals);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-teal-800/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Multi-Stage Gemini AI Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('triage.title', 'AI Symptom Assessment & Care Orchestrator')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {t('triage.desc', 'Describe your symptoms naturally. The AI Orchestrator executes differential analysis, assigns emergency priority, and routes you directly to the correct department.')}
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
            <HeartPulse className="w-8 h-8 text-rose-400 animate-pulse" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400">Emergency Protocol</div>
              <div className="text-xs font-bold text-rose-300">24/7 Priority Intake</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Input & Preset Symptoms */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <BrainCircuit className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Patient Intake Form</span>
              </h2>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Real-time analysis</span>
            </div>

            {/* Quick Sample Presets */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Quick Sample Cases (Click to populate)
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setPresetSymptom('Severe radiating chest pressure, left arm heaviness, cold sweat, nausea', '45 mins', 'BP 155/95, HR 108 bpm')}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors"
                >
                  🔴 Chest Pain (Cardiac)
                </button>
                <button
                  type="button"
                  onClick={() => setPresetSymptom('Sudden severe headache like thunderclap, right side face weakness, blurred vision', '30 mins', 'BP 160/100, HR 88 bpm')}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors"
                >
                  🟡 Thunderclap Headache (Neuro)
                </button>
                <button
                  type="button"
                  onClick={() => setPresetSymptom('Persistent wheezing cough, low grade fever, shortness of breath climbing stairs', '3 days', 'SpO2 94%, Temp 100.8 F')}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 transition-colors"
                >
                  🟢 Wheezing & Cough (Pulmonary)
                </button>
              </div>
            </div>

            <form onSubmit={handleRunOrchestration} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Symptoms Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Describe how you feel, pain locations, onset, dizziness, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. 2 hours / 3 days"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Vitals (Optional)
                  </label>
                  <input
                    type="text"
                    value={vitals}
                    onChange={(e) => setVitals(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="BP / Pulse / Temp"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isOrchestrating || !symptoms.trim()}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                {isOrchestrating ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>{t('triage.orchestrating', 'Orchestrating Assessment Pipeline...')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t('triage.runButton', 'Run AI Symptom Assessment')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Orchestrator Pipeline Animation & Clinical Output */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Stepper Animation during processing */}
          {isOrchestrating && (
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center space-x-3">
                <BrainCircuit className="w-6 h-6 text-teal-400 animate-pulse" />
                <h3 className="font-bold text-lg">AI Orchestration Pipeline Executing</h3>
              </div>
              <div className="space-y-4">
                {pipelineSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      idx < activeStep 
                        ? 'bg-emerald-500 text-white' 
                        : idx === activeStep 
                        ? 'bg-teal-500 text-white animate-bounce' 
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {idx < activeStep ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className={`text-xs font-semibold ${idx === activeStep ? 'text-teal-300' : 'text-slate-300'}`}>
                        {step.title}
                      </div>
                      <div className="text-[10px] text-slate-500">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clinical Assessment Output Card */}
          {!isOrchestrating && triageResult && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              
              {/* Top Banner with Priority Tag */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assessment ID: {triageResult.id}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    Recommended Department: <span className="text-teal-600 dark:text-teal-400">{triageResult.recommendedDepartment}</span>
                  </h3>
                </div>

                {/* Urgency Badge */}
                <div className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
                  triageResult.urgencyLevel === 'EMERGENCY'
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                    : triageResult.urgencyLevel === 'URGENT'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                }`}>
                  <ShieldAlert className="w-4 h-4" />
                  <span>{triageResult.urgencyLevel} PRIORITY</span>
                </div>
              </div>

              {/* Differential Diagnosis Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-teal-500" />
                  <span>Predicted Conditions & Probabilities</span>
                </h4>
                <div className="space-y-2.5">
                  {triageResult.possibleConditions.map((cond, i) => (
                    <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-white">
                        <span>{cond.condition}</span>
                        <span className="text-teal-600 dark:text-teal-400">{cond.probability}% Match</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${cond.probability}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{cond.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extracted Symptoms & Recommended Tests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Extracted Symptom Tags
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {triageResult.extractedSymptoms.map((sym, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-[10px] font-medium border border-slate-200 dark:border-slate-700">
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Recommended Diagnostics
                  </span>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    {triageResult.recommendedTests.map((test, idx) => (
                      <li key={idx} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Immediate Clinical Recommendation Note */}
              <div className="p-4 bg-teal-50/70 dark:bg-teal-950/30 rounded-2xl border border-teal-200 dark:border-teal-800/60 text-xs text-teal-900 dark:text-teal-200 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">AI Clinical Guidance: </span>
                  {triageResult.suggestedAction}
                </div>
              </div>

              {/* Direct Smart Appointment Booking Section */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-5 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Stethoscope className="w-4 h-4 text-teal-500" />
                  <span>Smart Appointment Scheduler & Doctor Match</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Assigned Specialist Doctor
                    </label>
                    <select
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      {doctors.map(doc => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} ({doc.department} - {doc.specialty})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Time Slot
                    </label>
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="09:30 AM">09:30 AM (Immediate)</option>
                      <option value="10:15 AM">10:15 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                    </select>
                  </div>
                </div>

                {bookingSuccess ? (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <div>
                        <div className="font-bold">Appointment Confirmed & Added to Queue!</div>
                        <div>Priority: {triageResult.urgencyLevel} • Doctor notified</div>
                      </div>
                    </div>
                    <button
                      onClick={onNavigateToDoctorPortal}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs"
                    >
                      View in Doctor Queue
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleBookNow}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Booking & Dispatch to Doctor Queue</span>
                  </button>
                )}
              </div>

            </div>
          )}

          {/* Placeholder state when no result yet */}
          {!isOrchestrating && !triageResult && (
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-10 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3">
              <BrainCircuit className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">Awaiting Clinical Intake Input</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Fill out the symptoms on the left or select a sample case to trigger the AI Orchestration pipeline.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
