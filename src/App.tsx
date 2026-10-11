import React, { useState, useEffect } from 'react';
import { ForensicExhibit, ActiveSection, JurisdictionCode } from './types/forensic';
import { INITIAL_EXHIBITS } from './data/seedExhibits';
import { formatBatesNumber } from './utils/crypto';
import { TopNav } from './components/TopNav';
import { CaseSummaryBanner } from './components/CaseSummaryBanner';
import { EvidenceRegisterView } from './components/EvidenceRegisterView';
import { CertifiedDocketsView } from './components/CertifiedDocketsView';
import { TimelineEscalationView } from './components/TimelineEscalationView';
import { CrossExaminationMatrixView } from './components/CrossExaminationMatrixView';
import { HighLiabilityView } from './components/HighLiabilityView';
import { EvidentiarySynthesisView } from './components/EvidentiarySynthesisView';
import { VerifiedDeclarationView } from './components/VerifiedDeclarationView';
import { InjunctiveOrderView } from './components/InjunctiveOrderView';
import { TakedownNoticeView } from './components/TakedownNoticeView';
import { CourtPacketPrintView } from './components/CourtPacketPrintView';
import { ParentalFitnessView } from './components/ParentalFitnessView';
import { TableOfAuthoritiesView } from './components/TableOfAuthoritiesView';
import { EvidentiaryFoundationView } from './components/EvidentiaryFoundationView';
import { BenchDecisionMatrixView } from './components/BenchDecisionMatrixView';
import { AddExhibitModal } from './components/AddExhibitModal';
import { ExhibitDetailModal } from './components/ExhibitDetailModal';
import { CourtroomPresenterModal } from './components/CourtroomPresenterModal';
import { LegalCounselCopilotDrawer } from './components/LegalCounselCopilotDrawer';
import { Scale, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'forensic_litigation_dossier_exhibits_v9';

export default function App() {
  const [exhibits, setExhibits] = useState<ForensicExhibit[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          parsed.length >= INITIAL_EXHIBITS.length &&
          parsed[0].batesNumber &&
          parsed[0].timestampUtc
        ) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading exhibits from localStorage:', e);
    }
    return INITIAL_EXHIBITS;
  });

  const [activeSection, setActiveSection] = useState<ActiveSection>('register');
  const [jurisdiction, setJurisdiction] = useState<JurisdictionCode>('universal');
  const [isRedacted, setIsRedacted] = useState<boolean>(true);
  const [selectedExhibit, setSelectedExhibit] = useState<ForensicExhibit | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPresenterOpen, setIsPresenterOpen] = useState(false);
  const [isLegalCounselOpen, setIsLegalCounselOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exhibits));
    } catch (e) {
      console.error('Error saving exhibits to localStorage:', e);
    }
  }, [exhibits]);

  const handleAddExhibit = (newExhibit: ForensicExhibit) => {
    setExhibits((prev) => [newExhibit, ...prev]);
  };

  const handleResetExhibits = () => {
    if (window.confirm('Reset exhibit register to the original forensic case record (TRG-0001 to TRG-0025)?')) {
      setExhibits(INITIAL_EXHIBITS);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handlePrint = () => {
    // If not already in Court Packet view, switch to Court Packet view so that the full legal packet with divider sheets is printed
    if (activeSection !== 'packet') {
      setActiveSection('packet');
      setTimeout(() => {
        window.print();
      }, 200);
    } else {
      window.print();
    }
  };

  const emergencyCount = exhibits.filter(
    (e) =>
      e.severity === 'Emergency / Immediate Threat' ||
      e.statutoryTags.includes('Child Endangerment / Best Interest Factor')
  ).length;

  // Calculate next IDs
  const nextNumber = exhibits.length + 1;
  const nextId = `EX-${nextNumber < 10 ? '00' + nextNumber : nextNumber < 100 ? '0' + nextNumber : nextNumber}`;
  const nextBatesNumber = formatBatesNumber(nextNumber);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar Navigation with Jurisdiction & Redaction Controls */}
      <TopNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenPresenter={() => setIsPresenterOpen(true)}
        onOpenLegalCounsel={() => setIsLegalCounselOpen(true)}
        onPrint={handlePrint}
        jurisdiction={jurisdiction}
        onSelectJurisdiction={setJurisdiction}
        isRedacted={isRedacted}
        onToggleRedacted={() => setIsRedacted((prev) => !prev)}
      />

      {/* Case Header Banner with Live Statutory Alignment */}
      <div className="no-print">
        <CaseSummaryBanner
          exhibitCount={exhibits.length}
          emergencyCount={emergencyCount}
          jurisdiction={jurisdiction}
          onSelectJurisdiction={setJurisdiction}
          isRedacted={isRedacted}
          onToggleRedacted={() => setIsRedacted((prev) => !prev)}
        />
      </div>

      {/* Main Section Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'register' && (
          <EvidenceRegisterView
            exhibits={exhibits}
            onSelectExhibit={(ex) => setSelectedExhibit(ex)}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            isRedacted={isRedacted}
          />
        )}

        {activeSection === 'decision-matrix' && (
          <BenchDecisionMatrixView
            exhibits={exhibits}
            onSelectExhibit={(ex) => setSelectedExhibit(ex)}
            jurisdiction={jurisdiction}
          />
        )}

        {activeSection === 'dockets' && (
          <CertifiedDocketsView
            exhibits={exhibits}
            onSelectExhibit={(ex) => setSelectedExhibit(ex)}
            jurisdiction={jurisdiction}
          />
        )}

        {activeSection === 'fitness' && (
          <ParentalFitnessView
            exhibits={exhibits}
            onSelectExhibit={(ex) => setSelectedExhibit(ex)}
            jurisdiction={jurisdiction}
          />
        )}

        {activeSection === 'authorities' && (
          <TableOfAuthoritiesView
            exhibits={exhibits}
            onSelectExhibit={(ex) => setSelectedExhibit(ex)}
            jurisdiction={jurisdiction}
          />
        )}

        {activeSection === 'objections' && (
          <EvidentiaryFoundationView
            exhibits={exhibits}
            onSelectExhibit={(ex) => setSelectedExhibit(ex)}
            jurisdiction={jurisdiction}
          />
        )}

        {activeSection === 'timeline' && (
          <TimelineEscalationView
            exhibits={exhibits}
            onSelectExhibit={(ex) => setSelectedExhibit(ex)}
          />
        )}

        {activeSection === 'impeachment' && (
          <CrossExaminationMatrixView
            exhibits={exhibits}
            onSelectExhibit={(ex) => setSelectedExhibit(ex)}
          />
        )}

        {activeSection === 'liability' && (
          <HighLiabilityView jurisdiction={jurisdiction} />
        )}

        {activeSection === 'synthesis' && (
          <EvidentiarySynthesisView />
        )}

        {activeSection === 'declaration' && (
          <VerifiedDeclarationView
            isRedacted={isRedacted}
            jurisdiction={jurisdiction}
          />
        )}

        {activeSection === 'orders' && (
          <InjunctiveOrderView
            isRedacted={isRedacted}
            jurisdiction={jurisdiction}
          />
        )}

        {activeSection === 'takedown' && (
          <TakedownNoticeView />
        )}

        {activeSection === 'packet' && (
          <CourtPacketPrintView exhibits={exhibits} />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-slate-800/80 bg-slate-950 py-6 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-500" />
            <span>
              Forensic Litigation Dossier · Tiffany Greene v. Eric Greene (&quot;hulk&quot;) · Bates Range: TRG-0001+
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>F.R.E. 901 &amp; 902(14) Certified Record · Web Crypto SHA-256 Authenticated</span>
            <button
              onClick={handleResetExhibits}
              className="text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
              title="Reset to default 12 Bates-stamped exhibits"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Case Record</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddExhibitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddExhibit={handleAddExhibit}
        nextId={nextId}
        nextBatesNumber={nextBatesNumber}
      />

      <ExhibitDetailModal
        exhibit={selectedExhibit}
        onClose={() => setSelectedExhibit(null)}
      />

      <CourtroomPresenterModal
        isOpen={isPresenterOpen}
        onClose={() => setIsPresenterOpen(false)}
        exhibits={exhibits}
        jurisdiction={jurisdiction}
      />

      <LegalCounselCopilotDrawer
        isOpen={isLegalCounselOpen}
        onClose={() => setIsLegalCounselOpen(false)}
        exhibits={exhibits}
        jurisdiction={jurisdiction}
        initialExhibitBates={selectedExhibit?.batesNumber}
      />
    </div>
  );
}
