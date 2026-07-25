import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageMode = 'en' | 'hi' | 'dual';

interface LanguageContextType {
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  t: (key: string, fallback?: string) => string;
  translateText: (text: string) => string;
}

// Master Dictionary for English & Hindi
export const translations: Record<string, { en: string; hi: string }> = {
  // Navigation & Header
  'nav.brand': { en: 'MediFlow AI', hi: 'मेडीफ्लो एआई' },
  'nav.home': { en: 'Home', hi: 'मुख्य पृष्ठ' },
  'nav.tagline': { en: 'Clinical Intelligence System', hi: 'क्लिनिकल इंटेलिजेंस सिस्टम' },
  'nav.triage': { en: 'AI Symptom Assessment', hi: 'एआई लक्षण मूल्यांकन' },
  'nav.patient': { en: 'Patient Portal', hi: 'मरीज़ पोर्टल' },
  'nav.doctor': { en: 'Doctor Portal', hi: 'डॉक्टर पोर्टल' },
  'nav.admin': { en: 'Admin Hub', hi: 'प्रशासन केंद्र' },
  'nav.beds': { en: 'Bed Matrix', hi: 'बेड उपलब्धता ग्रिड' },
  'nav.blockchain': { en: 'Blockchain Security', hi: 'ब्लॉकचेन सुरक्षा' },
  'nav.signOut': { en: 'Sign Out', hi: 'साइन आउट' },
  'nav.notifications': { en: 'Notifications', hi: 'सूचनाएं' },
  'nav.markRead': { en: 'Mark all as read', hi: 'सभी को पढ़ा हुआ चिह्नित करें' },
  'nav.noNotifs': { en: 'No recent notifications', hi: 'कोई हाल की सूचनाएं नहीं' },
  'nav.aiAssistant': { en: 'AI Assistant', hi: 'एआई सहायक' },
  'nav.emergency': { en: 'Emergency 24/7', hi: 'आपातकालीन 24/7' },

  // Language Selector
  'lang.title': { en: 'Language Translator', hi: 'भाषा अनुवादक' },
  'lang.selectLanguage': { en: 'Select Language', hi: 'भाषा चुनें' },
  'lang.english': { en: 'English', hi: 'अंग्रेज़ी' },
  'lang.hindi': { en: 'Hindi (हिंदी)', hi: 'हिंदी' },
  'lang.dual': { en: 'Dual Mode (English + हिंदी)', hi: 'द्विभाषी (English + हिंदी)' },
  'lang.active': { en: 'Real-time Translation Active', hi: 'रियल-टाइम अनुवाद सक्रिय' },

  // Hero & Landing
  'hero.badge': { en: 'Autonomous Hospital Management & AI Clinical Engine', hi: 'स्वायत्त अस्पताल प्रबंधन एवं एआई क्लिनिकल इंजन' },
  'hero.title': { en: 'Healthcare Access Portal', hi: 'स्वास्थ्य देखभाल एक्सेस पोर्टल' },
  'hero.title1': { en: 'Next-Gen Clinical Workflow', hi: 'अगली पीढ़ी क्लिनिकल वर्कफ़्लो' },
  'hero.title2': { en: 'Powered by Gemini AI', hi: 'जेमिनी एआई द्वारा संचालित' },
  'hero.desc': { en: 'Instant symptom triage, real-time ICU & bed allocation matrix, secure doctor consultations, and cryptographic blockchain medical ledger.', hi: 'तत्काल लक्षण मूल्यांकन, रियल-टाइम आईसीयू एवं बेड आवंटन, सुरक्षित डॉक्टर परामर्श, और ब्लॉकचेन मेडिकल लेजर।' },
  'hero.startAssessment': { en: 'Start AI Assessment', hi: 'एआई मूल्यांकन शुरू करें' },
  'hero.openPatient': { en: 'Open Patient Portal', hi: 'मरीज़ पोर्टल खोलें' },
  'hero.doctorAccess': { en: 'Doctor Portal Access', hi: 'डॉक्टर पोर्टल प्रवेश' },
  'hero.bedMatrix': { en: 'Live Bed & OT Matrix', hi: 'लाइव बेड एवं ओटी मैट्रिक्स' },

  // Care Assessment & Triage Orchestrator
  'triage.title': { en: 'AI Symptom Assessment & Care Orchestrator', hi: 'एआई लक्षण मूल्यांकन एवं देखभाल समन्वयक' },
  'triage.desc': { en: 'Describe your symptoms naturally. The AI Orchestrator executes differential analysis, assigns emergency priority, and routes you directly to the correct department.', hi: 'प्राकृतिक भाषा में अपने लक्षणों का वर्णन करें। एआई समन्वयक विश्लेषण करता है, आपातकालीन प्राथमिकता तय करता है, और सही विभाग में रिडायरेक्ट करता है।' },
  'triage.quickSelect': { en: 'Select Common Symptoms', hi: 'सामान्य लक्षण चुनें' },
  'triage.runButton': { en: 'Run AI Symptom Assessment', hi: 'एआई लक्षण मूल्यांकन चलाएं' },
  'triage.orchestrating': { en: 'Orchestrating Assessment Pipeline...', hi: 'मूल्यांकन प्रक्रिया चल रही है...' },
  'triage.recommendedDept': { en: 'Recommended Department', hi: 'अनुशंसित विभाग' },
  'triage.priority': { en: 'Priority Urgency', hi: 'प्राथमिकता स्तर' },
  'triage.emergency': { en: 'EMERGENCY PRIORITY', hi: 'आपातकालीन प्राथमिकता' },
  'triage.urgent': { en: 'URGENT PRIORITY', hi: 'अति आवश्यक प्राथमिकता' },
  'triage.routine': { en: 'ROUTINE PRIORITY', hi: 'सामान्य प्राथमिकता' },
  'triage.possibleConditions': { en: 'Possible Differential Diagnoses', hi: 'संभावित निदान' },
  'triage.extractedSymptoms': { en: 'Extracted Clinical Symptoms', hi: 'पहचाने गए लक्षण' },
  'triage.recommendedTests': { en: 'Recommended Diagnostic Tests', hi: 'अनुशंसित लैब परीक्षण' },
  'triage.suggestedAction': { en: 'AI Clinical Recommendation', hi: 'एआई क्लिनिकल सिफारिश' },
  'triage.scheduleConsult': { en: 'Book Specialist Consultation', hi: 'विशेषज्ञ डॉक्टर अपॉइंटमेंट बुक करें' },

  // Doctor Dashboard
  'doctor.title': { en: 'Doctor Clinical Workspace', hi: 'डॉक्टर क्लिनिकल कार्यक्षेत्र' },
  'doctor.queue': { en: 'Patient Care Queue', hi: 'मरीज़ देखभाल कतार' },
  'doctor.patientDetails': { en: 'Patient Clinical Overview', hi: 'मरीज़ क्लिनिकल अवलोकन' },
  'doctor.vitals': { en: 'Live Vitals & Telemetry', hi: 'लाइव वाइटल्स एवं टेलीमेट्री' },
  'doctor.heartRate': { en: 'Heart Rate', hi: 'हृदय गति' },
  'doctor.bp': { en: 'Blood Pressure', hi: 'रक्तचाप' },
  'doctor.oxygen': { en: 'SpO2 Oxygen', hi: 'ऑक्सीजन स्तर' },
  'doctor.temp': { en: 'Temperature', hi: 'शरीर का तापमान' },
  'doctor.signRx': { en: 'Sign Digital Prescription', hi: 'डिजिटल पर्ची पर हस्ताक्षर करें' },
  'doctor.orderLabs': { en: 'Order Diagnostic Labs', hi: 'लैब टेस्ट का आदेश दें' },

  // Patient Dashboard
  'patient.title': { en: 'Patient Personal Health Hub', hi: 'मरीज़ व्यक्तिगत स्वास्थ्य हब' },
  'patient.appointments': { en: 'Upcoming Consultations', hi: 'आगामी परामर्श' },
  'patient.prescriptions': { en: 'Active Prescriptions & Reminders', hi: 'सक्रिय दवाएं एवं अनुस्मारक' },
  'patient.addMed': { en: 'Add Medication Reminder', hi: 'दवा अनुस्मारक जोड़ें' },
  'patient.vitalHistory': { en: 'Vitals & Health Logs', hi: 'वाइटल्स एवं स्वास्थ्य लॉग' },

  // Admin Dashboard & Bed Matrix
  'admin.title': { en: 'Hospital OT & Bed Matrix', hi: 'अस्पताल ओटी एवं बेड मैट्रिक्स' },
  'admin.liveSystem': { en: 'LIVE SYSTEM', hi: 'लाइव सिस्टम' },
  'admin.totalBeds': { en: 'Total Bed Capacity', hi: 'कुल बेड क्षमता' },
  'admin.available': { en: 'Available Beds', hi: 'उपलब्ध बेड' },
  'admin.occupied': { en: 'Occupied Beds', hi: 'भरे हुए बेड' },
  'admin.icu': { en: 'ICU Beds', hi: 'आईसीयू बेड' },
  'admin.assignBed': { en: 'Assign Patient Bed', hi: 'मरीज़ को बेड आवंटित करें' },

  // Blockchain Ledger
  'chain.title': { en: 'Cryptographic Health Audit Ledger', hi: 'क्रिप्टोग्राफिक स्वास्थ्य ऑडिट लेजर' },
  'chain.desc': { en: 'MediFlow AI secures patient assessment reports, doctor prescriptions, bed allocations, and privacy consents with cryptographic hashes stored on an immutable ledger.', hi: 'मेडीफ्लो एआई रोगी मूल्यांकन, डॉक्टर पर्चियों, बेड आवंटन और गोपनीयता सम्मतियों को ब्लॉकचेन लेजर पर सुरक्षित रखता है।' },
  'chain.blockHash': { en: 'Block Hash', hi: 'ब्लॉक हैश' },
  'chain.verifyRecord': { en: 'Verify Block', hi: 'ब्लॉक सत्यापित करें' },

  // AI Chatbot
  'chat.title': { en: 'MediFlow AI Clinical Assistant', hi: 'मेडीफ्लो एआई क्लिनिकल सहायक' },
  'chat.placeholder': { en: 'Type a message in English or Hindi...', hi: 'अंग्रेज़ी या हिंदी में संदेश लिखें...' },
  'chat.send': { en: 'Send', hi: 'भेजें' },
  'chat.quickPrompt': { en: 'Ask a question', hi: 'प्रश्न पूछें' },

  // Common UI Buttons & Badges
  'common.close': { en: 'Close', hi: 'बंद करें' },
  'common.cancel': { en: 'Cancel', hi: 'रद्द करें' },
  'common.save': { en: 'Save', hi: 'सहेजें' },
  'common.confirm': { en: 'Confirm', hi: 'पुष्टि करें' },
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },
  'common.search': { en: 'Search...', hi: 'खोजें...' },
  'common.filter': { en: 'Filter', hi: 'फ़िल्टर' },
  'common.status': { en: 'Status', hi: 'स्थिति' },
  'common.action': { en: 'Action', hi: 'कार्रवाई' },
  'common.active': { en: 'Active', hi: 'सक्रिय' },
  'common.completed': { en: 'Completed', hi: 'पूरा हुआ' },
  'common.pending': { en: 'Pending', hi: 'लंबित' },
};

// Word & Phrase level direct dynamic lookup dictionary
export const dynamicWordMap: Record<string, string> = {
  'Patient Portal': 'मरीज़ पोर्टल',
  'Doctor Portal': 'डॉक्टर पोर्टल',
  'Admin Hub': 'प्रशासन केंद्र',
  'Bed Matrix': 'बेड मैट्रिक्स',
  'Blockchain Security': 'ब्लॉकचेन सुरक्षा',
  'AI Symptom Assessment': 'एआई लक्षण मूल्यांकन',
  'Sign Out': 'साइन आउट',
  'Emergency': 'आपातकालीन',
  'Urgent': 'अति आवश्यक',
  'Routine': 'सामान्य',
  'Heart Rate': 'हृदय गति',
  'Blood Pressure': 'रक्तचाप',
  'Available': 'उपलब्ध',
  'Occupied': 'भरा हुआ',
  'Notifications': 'सूचनाएं',
  'Dark Mode': 'डार्क मोड',
  'Light Mode': 'लाइट मोड',
  'Doctor': 'डॉक्टर',
  'Patient': 'मरीज़',
  'Hospital': 'अस्पताल',
  'Appointments': 'अपॉइंटमेंट',
  'Prescription': 'दवा की पर्ची',
  'Medication': 'दवाएं',
  'Vitals': 'वाइटल्स',
  'Department': 'विभाग',
  'Priority': 'प्राथमिकता',
  'Symptoms': 'लक्षण',
  'Diagnosis': 'निदान',
  'Recommended': 'अनुशंसित',
  'Live Capacity': 'लाइव क्षमता',
  'Search': 'खोजें',
  'Submit': 'जमा करें',
  'Cancel': 'रद्द करें',
  'Close': 'बंद करें',
  'ON DUTY': 'ऑन ड्यूटी',
  'Total Bed Capacity': 'कुल बेड क्षमता',
  'Available Beds': 'उपलब्ध बेड',
  'Occupied Beds': 'भरे हुए बेड',
  'ICU Beds': 'आईसीयू बेड',
  'Upcoming Consultations': 'आगामी परामर्श',
  'Active Prescriptions & Reminders': 'सक्रिय दवाएं एवं अनुस्मारक',
  'Vitals & Health Logs': 'वाइटल्स एवं स्वास्थ्य लॉग',
  'Sign Digital Prescription': 'डिजिटल पर्ची पर हस्ताक्षर करें',
  'Order Diagnostic Labs': 'लैब टेस्ट का आदेश दें',
  'Patient Care Queue': 'मरीज़ देखभाल कतार',
  'Patient Clinical Overview': 'मरीज़ क्लिनिकल अवलोकन',
  'Cryptographic Health Audit Ledger': 'क्रिप्टोग्राफिक स्वास्थ्य ऑडिट लेजर',
  'Select Common Symptoms': 'सामान्य लक्षण चुनें',
  'Book Specialist Consultation': 'विशेषज्ञ डॉक्टर अपॉइंटमेंट बुक करें',
  'Healthcare Access Portal': 'स्वास्थ्य देखभाल एक्सेस पोर्टल',
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key, fallback) => fallback || key,
  translateText: (text) => text,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageMode>(() => {
    const saved = localStorage.getItem('mediflow_lang');
    return (saved as LanguageMode) || 'en';
  });

  const setLanguage = (lang: LanguageMode) => {
    setLanguageState(lang);
    localStorage.setItem('mediflow_lang', lang);
  };

  const translateText = (text: string): string => {
    if (!text || language === 'en') return text;

    // Check direct match in dynamicWordMap
    if (dynamicWordMap[text]) {
      if (language === 'hi') return dynamicWordMap[text];
      if (language === 'dual') return `${text} (${dynamicWordMap[text]})`;
    }

    // Check match in translations dictionary
    for (const item of Object.values(translations)) {
      if (item.en.toLowerCase() === text.toLowerCase()) {
        if (language === 'hi') return item.hi;
        if (language === 'dual') return `${text} (${item.hi})`;
      }
    }

    return text;
  };

  const t = (key: string, fallback?: string): string => {
    const entry = translations[key];
    if (!entry) {
      if (fallback) return translateText(fallback);
      return key;
    }

    if (language === 'en') return entry.en;
    if (language === 'hi') return entry.hi;
    if (language === 'dual') return `${entry.en} (${entry.hi})`;

    return entry.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

/**
 * Component to inline translate any string or key
 */
export const T: React.FC<{ k?: string; fallback?: string; children?: string }> = ({ k, fallback, children }) => {
  const { t, translateText, language } = useLanguage();

  if (k) {
    return <>{t(k, fallback || children)}</>;
  }

  if (children) {
    if (language === 'en') return <>{children}</>;
    return <>{translateText(children)}</>;
  }

  return null;
};
