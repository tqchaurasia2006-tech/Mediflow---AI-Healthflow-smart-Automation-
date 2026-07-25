import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown, Sparkles, Languages } from 'lucide-react';
import { useLanguage, LanguageMode } from '../context/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions: { id: LanguageMode; label: string; sublabel: string; flag: string }[] = [
    { id: 'en', label: 'English', sublabel: 'English UI', flag: '🇬🇧' },
    { id: 'hi', label: 'हिंदी (Hindi)', sublabel: 'हिंदी इंटरफेस', flag: '🇮🇳' },
    { id: 'dual', label: 'Dual Mode', sublabel: 'English + हिंदी', flag: '🌐' },
  ];

  const currentOption = languageOptions.find((o) => o.id === language) || languageOptions[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Header Button next to Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Switch Web Page Language (English / Hindi / Dual)"
        aria-label="Language Switcher Module"
        className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
      >
        <Languages className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
        <span className="text-xs font-bold uppercase tracking-wider">{currentOption.flag} {language.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Language Selection Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {t('lang.title', 'Language Translator')}
              </span>
            </div>
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-md">
              LIVE
            </span>
          </div>

          {/* Language Options */}
          <div className="p-1.5 space-y-1">
            {languageOptions.map((opt) => {
              const isSelected = language === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setLanguage(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800/60'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-base">{opt.flag}</span>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center space-x-1">
                        <span>{opt.label}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">{opt.sublabel}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Footer Badge */}
          <div className="px-3.5 pt-2 mt-1 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Real-time Translation</span>
            </span>
            <span className="text-teal-600 dark:text-teal-400 font-semibold">EN • HI</span>
          </div>
        </div>
      )}
    </div>
  );
};
