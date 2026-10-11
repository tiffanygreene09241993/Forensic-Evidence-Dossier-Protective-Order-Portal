import React from 'react';
import { ActiveSection, JurisdictionCode } from '../types/forensic';
import { JURISDICTIONS } from '../data/jurisdictionData';
import {
  Printer,
  PlusCircle,
  Scale,
  FileCheck,
  Shield,
  EyeOff,
  Globe,
  ChevronDown,
  Zap,
} from 'lucide-react';

interface TopNavProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  onOpenAddModal: () => void;
  onOpenPresenter: () => void;
  onOpenLegalCounsel: () => void;
  onPrint: () => void;
  jurisdiction: JurisdictionCode;
  onSelectJurisdiction: (code: JurisdictionCode) => void;
  isRedacted: boolean;
  onToggleRedacted: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeSection,
  setActiveSection,
  onOpenAddModal,
  onOpenPresenter,
  onOpenLegalCounsel,
  onPrint,
  jurisdiction,
  onSelectJurisdiction,
  isRedacted,
  onToggleRedacted,
}) => {
  const navItems: { id: ActiveSection; label: string; badge?: string }[] = [
    { id: 'register', label: '1. Master Register' },
    { id: 'decision-matrix', label: '2. Decision Matrix & Toolkit', badge: 'Bench Cards' },
    { id: 'dockets', label: '3. Police Dockets', badge: 'Certified' },
    { id: 'fitness', label: '4. Parental Fitness & DCF', badge: 'Clearance' },
    { id: 'authorities', label: '5. Table of Authorities', badge: 'Statutes' },
    { id: 'objections', label: '6. Foundation & Objections', badge: 'Trial Shield' },
    { id: 'timeline', label: '7. Incident Heatmap', badge: 'Velocity' },
    { id: 'impeachment', label: '8. Cross-Exam Matrix', badge: 'Impeach' },
    { id: 'liability', label: '9. High-Liability Proofs' },
    { id: 'synthesis', label: '10. Evidentiary Synthesis' },
    { id: 'declaration', label: '11. Verified Declaration' },
    { id: 'orders', label: '12. Proposed Order' },
    { id: 'takedown', label: '13. Takedown Notice' },
    { id: 'packet', label: '14. Court Packet (FRE 902)' },
  ];

  const currentJurisdiction = JURISDICTIONS[jurisdiction];

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark & Case ID */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-500" aria-hidden="true" />
            <span className="text-base font-semibold tracking-tight text-slate-100 font-serif-court">
              Forensic Litigation Dossier
            </span>
          </div>

          {/* Quick Jurisdiction Selector */}
          <div className="relative group hidden md:block">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-700/80 text-[11px] text-amber-300 font-medium cursor-pointer hover:bg-slate-800 transition-colors">
              <Globe className="w-3 h-3 text-amber-400" />
              <span>{currentJurisdiction.shortLabel}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <select
              aria-label="Select Legal Jurisdiction"
              value={jurisdiction}
              onChange={(e) => onSelectJurisdiction(e.target.value as JurisdictionCode)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            >
              <option value="universal">Universal Uniform State &amp; Federal Standard</option>
              <option value="california">State of California (DVPA § 6200 / Civ § 45a)</option>
              <option value="texas">State of Texas (Fam Code § 85.001 / CPRC § 73.001)</option>
              <option value="florida">State of Florida (Fla. Stat. § 741.30 / § 784.048)</option>
            </select>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden 2xl:flex items-center gap-2.5 text-xs font-medium text-slate-400">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`whitespace-nowrap transition-colors py-1 px-1.5 relative flex items-center gap-1 ${
                activeSection === item.id
                  ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                  : 'hover:text-slate-200'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && activeSection !== item.id && (
                <span className="px-1 py-0.2 text-[9px] bg-slate-800 text-amber-400/90 rounded border border-slate-700/50">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* FRCP 5.2 Minor Redaction Toggle */}
          <button
            onClick={onToggleRedacted}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors ${
              isRedacted
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/40'
                : 'bg-rose-950/40 text-rose-300 border-rose-700/60 hover:bg-rose-900/40'
            }`}
            title={
              isRedacted
                ? 'FRCP 5.2 Minor PII Redaction is ACTIVE (Initials Masked for Court Filing)'
                : 'FRCP 5.2 Redaction is OFF (Full Names Displayed for Counsel Eyes Only)'
            }
          >
            {isRedacted ? (
              <>
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">FRCP 5.2: Masked</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Unredacted</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenPresenter}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 rounded-md transition-colors shadow-sm"
            title="Open Courtroom Proffer & Impeachment Mode for Live Bench Hearings"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Hearing Mode</span>
          </button>

          <button
            onClick={onOpenLegalCounsel}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 rounded-md transition-colors shadow-sm"
            title="Open Live Legal Analyst & Trial Counsel Copilot"
          >
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span>⚖️ Legal Counsel</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Add Exhibit</span>
          </button>

          <button
            onClick={() => setActiveSection('packet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors border ${
              activeSection === 'packet'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'text-slate-300 bg-slate-800/80 hover:bg-slate-700 border-slate-700'
            }`}
            title="Open Court Packet & Pleading Divider Sheets"
          >
            <FileCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Court Packet</span>
          </button>

          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-sm"
            title="Print or Export Court Packet to PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Bar for viewports below 2xl */}
      <div className="2xl:hidden border-t border-slate-800/80 px-4 py-2 overflow-x-auto flex items-center gap-2.5 text-xs bg-slate-900/90 scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`whitespace-nowrap py-1 px-2.5 rounded transition-colors ${
              activeSection === item.id
                ? 'bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
