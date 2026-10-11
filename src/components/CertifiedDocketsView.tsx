import React, { useState, useMemo } from 'react';
import { ForensicExhibit, JurisdictionCode } from '../types/forensic';
import { INCIDENT_RECORDS, IncidentRecord } from '../data/incidentRecordsData';
import { generateIncidentRecordsCsv, triggerFileDownload } from '../utils/export';
import {
  ShieldAlert,
  FileCheck,
  Scale,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle,
  Building2,
  DollarSign,
  Landmark,
  Eye,
  FileText,
  BadgeAlert,
  Hash,
  Download,
  Search,
  Filter,
  Users,
  CheckCircle2,
  FileSpreadsheet,
  Calendar,
  Layers,
  Shield,
} from 'lucide-react';

interface CertifiedDocketsViewProps {
  exhibits: ForensicExhibit[];
  onSelectExhibit: (exhibit: ForensicExhibit) => void;
  jurisdiction?: JurisdictionCode;
}

export const CertifiedDocketsView: React.FC<CertifiedDocketsViewProps> = ({
  exhibits,
  onSelectExhibit,
}) => {
  const [subView, setSubView] = useState<'primary-dockets' | 'master-ledger'>('master-ledger');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Primary Stamped Exhibits filter
  const [selectedDocket, setSelectedDocket] = useState<
    'all' | 'pso-battery' | 'pso-felony' | 'ic3' | 'dor' | 'dissolution' | 'dor-special-needs' | 'ftc-takeitdown' | 'meridian-homestead'
  >('all');

  // Master Spreadsheet filter state
  const [ledgerSearch, setLedgerSearch] = useState('');
  const [ledgerCategory, setLedgerCategory] = useState<string>('all');
  const [ledgerSubject, setLedgerSubject] = useState<string>('all');

  const dockets = [
    {
      id: 'pso-battery',
      bates: 'TRG-0013',
      exhibitId: 'EX-013',
      agency: "Pasco County Sheriff's Office (Florida)",
      caseNumber: 'Agency Report #19-014214 · Court Case #2019MM001955AES.1',
      title: 'Domestic Battery Arrest of Eric Joshua Greene',
      date: 'April 11, 2019 · Incident: April 6, 2019 13:20 EST',
      defendant: 'Greene, Eric Joshua (DOB: 01/23/1994)',
      victim: 'Tiffany Greene (Petitioner)',
      eyewitnesses: 'Sarah Greene & Kayleen Greene (Minor Daughters)',
      cjisDeputy: 'Deputy T. Salto, CJIS #6116',
      charges: 'Domestic Battery (F.S. 784.03.1A1 DOM)',
      severity: 'Emergency / Immediate Threat',
      keyImpact:
        'Conclusive proof directly rebutting Eric\'s public TikTok claim that Tiffany "abused him for 12 years." Stamped police affidavit proves Eric was arrested for physical battery on Tiffany in front of their minor daughters.',
      statutes: 'FRE 902(1)/(2) Certified Public Record · FRE 404(b) Admissibility of Prior Domestic Abuse',
    },
    {
      id: 'pso-felony',
      bates: 'TRG-0014',
      exhibitId: 'EX-014',
      agency: "Pasco County Sheriff's Office (Florida)",
      caseNumber: 'Agency Report #19-045997 · Court Case #2019CF006660AES.1',
      title: 'Felony Aggravated Assault with Deadly Weapon & Battery',
      date: 'November 3, 2019 · 12:22 EST',
      defendant: 'Greene, Eric Joshua (DOB: 01/23/1994)',
      victim: 'Pedro Hernandez',
      weapon: 'High Point Black 9mm Handgun',
      cjisDeputy: 'Deputy W.A. Allman, CJIS #5597',
      charges: 'Aggravated Assault with Deadly Weapon (F.S. 784.021.1A [Felony]) & Battery (F.S. 784.03.1A1)',
      severity: 'Emergency / Immediate Threat',
      keyImpact:
        'Certified proof of violent armed confrontation by Respondent Eric Greene. Eric choked Pedro, stated "I am gonna kill you," and retrieved a 9mm handgun before his father wrestled the weapon away. Directly corroborates the lethal menace of June 18 threat (TRG-0012).',
      statutes: 'FRE 902(1)/(2) Certified Record · Evidence of Lethal Threat Pattern & Handgun Access',
    },
    {
      id: 'ic3',
      bates: 'TRG-0015',
      exhibitId: 'EX-015',
      agency: 'Federal Bureau of Investigation (FBI) / Internet Crime Complaint Center',
      caseNumber: 'Submission ID: 05279c5fe54949208d87da7f14601dba (Prior ID: 2263edba53654980b2e361c2316ca966)',
      title: 'FBI IC3 Federal Criminal, Extortion & Cyber-Harassment Dossier',
      date: 'September 16, 2026 · Prior Filing: December 18, 2025',
      complainant: 'Tiffany Greene (Liberty University 4.0 GPA Criminal Justice Student)',
      subjects: 'Eric Joshua Greene & Heaven Leigh Dawn Horton (16968 KY Route 122, McDowell, KY)',
      federalCharges: '18 U.S.C. §§ 1028, 1028A (Identity Theft), 1029, 1030 (Computer Fraud), 1343 (Wire Fraud), 2261A (Cyberstalking)',
      crossAgencies:
        'FTC ID Theft #185634819 · FTC NCII #201973456 · HHS OCR #636337 · SSA SSI Benefit Diversion ($53,227 diverted from Kayleen Greene) · Pasco Dependency #2020-DP-000113',
      severity: 'High Civil Liability',
      keyImpact:
        'Unified federal investigation linking Eric and Heaven Horton\'s coordinated actions: 2020 retaliatory deportation of witness Pedro Hernandez, transnational displacement, liquidation of $170,000 marital home, and online extortion demanding coerced confessions.',
      statutes: '18 U.S.C. § 2261A · Federal Rule of Evidence 902(13)/(14) & 902(1)/(2)',
    },
    {
      id: 'dor',
      bates: 'TRG-0016',
      exhibitId: 'EX-016',
      agency: 'Florida Department of Revenue · Child Support Program',
      caseNumber: 'Child Support Case: #2001507784 · Activity: #190787043 · Pasco Case: #2019DR006262DRAXES',
      title: 'Interstate Child Support Establishment & Arrears Record',
      date: 'July 18, 2026 (Notice Under Rule 12E-1.040 F.A.C.)',
      petitioner: 'Tiffany Renea Greene (Obligee)',
      respondent: 'Eric Joshua Greene (NCP / Obligor · 16968 KY Route 122, McDowell, KY 41636)',
      arrearsToDate: '$0.00 Paid by Respondent since Separation (12/19/2019)',
      specialNeeds: 'Kayleen, Hunter, Emmalynn (Autism care, psychiatric and specialized medical needs)',
      infantBornToHeaven: 'Amelia Horton/Greene (DOB: 12/13/2024 to Eric Greene & Heaven Horton during marriage)',
      severity: 'High Civil Liability',
      keyImpact:
        'Proves non-support by Respondent over 7 years, official documentation of children\'s severe special needs / autism treatments, and official administrative evidence of Eric fathering child Amelia with Third Party Heaven Horton during the legal marriage.',
      statutes: 'Fla. Stat. § 61.30 · Uniform Interstate Family Support Act (UIFSA)',
    },
    {
      id: 'dissolution',
      bates: 'TRG-0017',
      exhibitId: 'EX-017',
      agency: 'Sixth Judicial Circuit Court · Pasco County, Florida',
      caseNumber: 'Florida Supreme Court Approved Form 12.901(b)(1)',
      title: 'Verified Petition for Dissolution of Marriage & Custody Injunction',
      date: 'Executed Under Oath: December 24, 2025',
      petitioner: 'Tiffany Renea Greene',
      respondent: 'Eric Joshua Greene',
      reliefSought:
        'Sole Parental Responsibility, Restricted Supervised Time-Sharing, $170,000 Dissipated Homestead Accounting, Alimony, Name Restoration to Sheffield',
      severity: 'High Civil Liability',
      keyImpact:
        'Sworn, notarized petition establishing 13-year marriage, 5 minor children, international abandonment in Mexico, theft of identification, and affirmative demands for sole parental responsibility and recovery of liquidated marital assets.',
      statutes: 'Fla. Stat. § 61.075 (Equitable Distribution) · Fla. Stat. § 61.13 (Best Interests / Sole Custody)',
    },
    {
      id: 'dor-special-needs',
      bates: 'TRG-0024',
      exhibitId: 'EX-024',
      agency: 'Florida Department of Revenue · Child Support Program',
      caseNumber: 'Child Support Case: #2001507784 (Executed Sept 3, 2026)',
      title: 'Special Needs & Pediatric Medical Deprivation Official Filing',
      date: 'September 3, 2026 (Under Oath to FL DOR)',
      petitioner: 'Tiffany Renea Greene (Obligee / Mother)',
      respondent: 'Eric Joshua Greene (Father / Relocated to McDowell, KY)',
      specialNeeds: 'Kayleen & Hunter (Autism care, psychiatric treatment) · Emmalynn (Full Legal Blindness)',
      charges: 'Child Medical Records Deprivation & Parental Alienation',
      severity: 'Emergency / Immediate Threat',
      keyImpact:
        'Crucial sworn administrative record documenting Emmalynn\'s full legal blindness, specialized autism therapies for Kayleen and Hunter, and proves Respondent Eric Greene has completely blocked Mother from accessing pediatric medical records.',
      statutes: 'FRE 902(1)/(2) Public Record · Fla. Stat. § 61.13(3) Best Interests / Medical Access',
    },
    {
      id: 'ftc-takeitdown',
      bates: 'TRG-0018',
      exhibitId: 'EX-018',
      agency: 'Federal Trade Commission (FTC)',
      caseNumber: 'FTC Report Number: #201973456 / TakeItDown.ftc.gov',
      title: 'FTC Non-Consensual Imagery & Minor Exploitation Intake',
      date: 'May 21, 2026 · 16:38 EDT',
      petitioner: 'Tiffany Greene (Complainant)',
      respondent: 'TikTok Accounts: hulk & GreeneH420',
      charges: 'Non-Consensual Intimate Imagery (NCII) & 18 U.S.C. § 2261A',
      severity: 'High Civil Liability',
      keyImpact:
        'Federal Trade Commission formal report documenting unauthorized dissemination of private intimate media across TikTok and third-party web platforms, supporting nationwide takedown orders and permanent injunctive relief.',
      statutes: '18 U.S.C. § 2261A · FTC Act Section 5 · FRE 902(1)/(2)',
    },
    {
      id: 'meridian-homestead',
      bates: 'TRG-0023',
      exhibitId: 'EX-023',
      agency: 'Meridian Title Company (Pasco County, Florida)',
      caseNumber: 'File Number: #22-06-64JF (Recorded Public Record)',
      title: 'HUD-1 Settlement Statement: $170,000 Homestead Dissipation',
      date: 'August 19, 2022',
      petitioner: 'Tiffany Greene (Excluded Co-Owner)',
      respondent: 'Eric Joshua Greene (Sole Cash Disbursant: $161,280.40)',
      charges: 'Dissipation of Marital Homestead & Fraudulent Conveyance',
      severity: 'High Civil Liability',
      keyImpact:
        'Official closing document proving Eric sold the marital home at 39605 Drew Dr, Dade City, FL for $170,000 cash, took $161,280.40 in net proceeds, and used it to purchase 75 acres in Floyd County, KY while Petitioner received zero dollars.',
      statutes: 'Fla. Stat. § 61.075 · Uniform Fraudulent Transfer Act (UFTA)',
    },
  ];

  const handleCopyCitation = (docket: typeof dockets[0]) => {
    const text = `OFFICIAL DOCKET RECORD: ${docket.title}
AGENCY: ${docket.agency}
CASE / DOCKET NO: ${docket.caseNumber}
BATES NUMBER: ${docket.bates} (${docket.exhibitId})
DATE: ${docket.date}
GOVERNING STATUTES: ${docket.statutes}
EVIDENTIARY VALUE & IMPACT:
${docket.keyImpact}`;

    navigator.clipboard.writeText(text);
    setCopiedId(docket.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDockets = selectedDocket === 'all' ? dockets : dockets.filter((d) => d.id === selectedDocket);

  // Filter master spreadsheet ledger
  const filteredLedger = useMemo(() => {
    return INCIDENT_RECORDS.filter((rec) => {
      const q = ledgerSearch.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        rec.title.toLowerCase().includes(q) ||
        rec.subject.toLowerCase().includes(q) ||
        rec.agencyCourt.toLowerCase().includes(q) ||
        rec.description.toLowerCase().includes(q) ||
        rec.dispositionOutcome.toLowerCase().includes(q) ||
        rec.dateStr.toLowerCase().includes(q);

      const matchesCat = ledgerCategory === 'all' || rec.category === ledgerCategory;
      const matchesSubj = ledgerSubject === 'all' || rec.subject === ledgerSubject;

      return matchesSearch && matchesCat && matchesSubj;
    });
  }, [ledgerSearch, ledgerCategory, ledgerSubject]);

  const handleExportLedgerCsv = () => {
    const csv = generateIncidentRecordsCsv(filteredLedger);
    triggerFileDownload(`Inter_Agency_Incident_Records_Analysis_${Date.now()}.csv`, 'text/csv', csv);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-Navigation Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider flex items-center gap-2">
            <span>Section 2 · Official Government &amp; Law Enforcement Dockets</span>
            <span>·</span>
            <span className="text-amber-400 font-medium">FRE 902(1)/(2) Stamped Judicial Records</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1">
            Certified Police Affidavits, FBI IC3 &amp; Master Inter-Agency Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Official judicial complaint affidavits, DCF child welfare intakes, federal civil rights complaints, and full 67-proceeding inter-agency chronological analysis.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs self-start md:self-auto">
          <button
            onClick={() => setSubView('master-ledger')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              subView === 'master-ledger'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Master 67-Row Incident Ledger</span>
          </button>
          <button
            onClick={() => setSubView('primary-dockets')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              subView === 'primary-dockets'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Key Stamped Exhibits ({dockets.length})</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIEW A: MASTER 67-ROW INTER-AGENCY SPREADSHEET ANALYSIS       */}
      {/* ============================================================== */}
      {subView === 'master-ledger' && (
        <div className="space-y-6">
          {/* Key Strategic Forensic Insights Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
            {/* Box 1: The Pedro Hernandez Witness Neutralization Arc */}
            <div className="p-3.5 bg-slate-900/90 border border-rose-900/60 rounded-xl space-y-2 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-rose-300 font-mono-legal text-[11px] uppercase tracking-wide">
                  <BadgeAlert className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Witness Neutralization (2020)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Retaliatory Sequence:</strong> 05/07/2020 star witness Pedro Hernandez booked; 06/10/2020 State Attorney filed <em>No Information</em> (exoneration). Rather than release, routed to ICE Krome (06/20) and removed 07/01/2020. 42 days later (08/12/2020), State entered <em>Nolle Prosequi</em> on Eric&apos;s felony gun assault because the star witness was gone!
                </p>
              </div>
              <div className="text-[10px] text-amber-400 font-mono-legal pt-1 border-t border-slate-800">
                ★ Corroborates FBI IC3 (TRG-0015)
              </div>
            </div>

            {/* Box 2: Pretextual Redundancy & 1990s Childhood Records */}
            <div className="p-3.5 bg-slate-900/90 border border-purple-900/60 rounded-xl space-y-2 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-purple-300 font-mono-legal text-[11px] uppercase tracking-wide">
                  <Layers className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>1990s Childhood Records Pretext</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Pretextual Redundancy:</strong> Claims of &quot;illegal status&quot; were a manufactured smoke screen. When scrutinizing the home, Florida DCF literally exhumed Pedro&apos;s <em>childhood</em> dependency files from the <strong>1990s</strong> (when Pedro was an abused minor over 20 years earlier) to manufacture grounds to displace Tiffany&apos;s children in Case #2020-DP-000113!
                </p>
              </div>
              <div className="text-[10px] text-purple-400 font-mono-legal pt-1 border-t border-slate-800">
                ★ Demonstrates Bad-Faith Administrative Pretext
              </div>
            </div>

            {/* Box 3: Complete Florida DCF Exoneration of Mother */}
            <div className="p-3.5 bg-slate-900/90 border border-emerald-900/60 rounded-xl space-y-2 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300 font-mono-legal text-[11px] uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>DCF Child Welfare Exoneration</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>100% Clearance of Mother:</strong> All 4 DCF intakes into Mother Tiffany (2016-1208, 2018-0213, 2018-1207, 2020-0124) closed with <strong>NO INDICATORS</strong>. In contrast, Father Eric Greene sustained <strong>VERIFIED FINDINGS of Domestic Violence (04/06/2019)</strong> and <strong>Threat of Harm (11/03/2019)</strong>.
                </p>
              </div>
              <div className="text-[10px] text-emerald-400 font-mono-legal pt-1 border-t border-slate-800">
                ★ Refutes online parental neglect smears
              </div>
            </div>

            {/* Box 4: Form I-797 Advance Parole Lawful Status */}
            <div className="p-3.5 bg-slate-900/90 border border-cyan-900/60 rounded-xl space-y-2 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-cyan-300 font-mono-legal text-[11px] uppercase tracking-wide">
                  <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>USCIS Form I-797 Advance Parole</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Lawful Federal Status (07/19/2024):</strong> USCIS &amp; DHS officially issued Form I-797 granting Pedro Hernandez lawful <strong>Advance Parole travel authorization</strong>, completely legitimizing his legal standing and rendering Respondent&apos;s online claims of harboring a &quot;deported fugitive&quot; per se defamatory.
                </p>
              </div>
              <div className="text-[10px] text-cyan-400 font-mono-legal pt-1 border-t border-slate-800">
                ★ Defamation Per Se / Likeness Rebuttal
              </div>
            </div>
          </div>

          {/* Controls Bar: Search, Category, Subject & CSV Export */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  value={ledgerSearch}
                  onChange={(e) => setLedgerSearch(e.target.value)}
                  placeholder="Search 67 records by date, title, agency, disposition, or description..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* CSV Export Button */}
              <button
                onClick={handleExportLedgerCsv}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Ledger (CSV)</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80 text-[11px]">
              <span className="text-slate-500 font-mono-legal">Category:</span>
              <button
                onClick={() => setLedgerCategory('all')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  ledgerCategory === 'all'
                    ? 'bg-slate-700 text-slate-100 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({INCIDENT_RECORDS.length})
              </button>
              <button
                onClick={() => setLedgerCategory('Immigration & Witness Neutralization')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  ledgerCategory === 'Immigration & Witness Neutralization'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Immigration &amp; Witness Removal
              </button>
              <button
                onClick={() => setLedgerCategory('DCF Child Welfare Intake')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  ledgerCategory === 'DCF Child Welfare Intake'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Florida DCF Child Welfare
              </button>
              <button
                onClick={() => setLedgerCategory('Criminal Prosecution & Arrest')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  ledgerCategory === 'Criminal Prosecution & Arrest'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Criminal Dockets &amp; Arrests
              </button>
              <button
                onClick={() => setLedgerCategory('Family Law & Domestic Injunction')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  ledgerCategory === 'Family Law & Domestic Injunction'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Family Law &amp; Injunctions
              </button>
              <button
                onClick={() => setLedgerCategory('Federal Civil Rights & Regulatory')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  ledgerCategory === 'Federal Civil Rights & Regulatory'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Federal Civil Rights
              </button>
            </div>

            {/* Subject Filters */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] pt-1">
              <span className="text-slate-500 font-mono-legal">Subject Party:</span>
              {['all', 'Pedro Hernandez', 'Tiffany Renea Greene', 'Eric Joshua Greene'].map((subj) => (
                <button
                  key={subj}
                  onClick={() => setLedgerSubject(subj)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    ledgerSubject === subj
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {subj === 'all' ? 'All Subjects' : subj}
                </button>
              ))}
            </div>
          </div>

          {/* Master Table */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900 shadow-xl">
            <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono-legal text-slate-400">
                Displaying <strong className="text-amber-400">{filteredLedger.length}</strong> of {INCIDENT_RECORDS.length} Legal Records
              </span>
              <span className="text-[11px] text-slate-500 font-mono-legal">
                Source: Master Evidence, Complaints &amp; Incident Records Analysis
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-slate-800">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono-legal text-[10px]">
                  <tr>
                    <th className="px-3.5 py-3 w-12 text-center">Row</th>
                    <th className="px-3.5 py-3 w-28">Date / Time</th>
                    <th className="px-3.5 py-3 w-48">Document / Title</th>
                    <th className="px-3.5 py-3 w-36">Subject Party</th>
                    <th className="px-3.5 py-3 w-48">Agency / Jurisdiction</th>
                    <th className="px-3.5 py-3 w-48">Disposition / Outcome</th>
                    <th className="px-3.5 py-3 min-w-[260px]">Strategic Evidentiary Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredLedger.map((rec) => {
                    const isExonerated = rec.dispositionOutcome.includes('NO INDICATORS') || rec.dispositionOutcome.includes('Exoneration');
                    const isVerifiedHarm = rec.dispositionOutcome.includes('VERIFIED') || rec.dispositionOutcome.includes('Felony');

                    return (
                      <tr key={rec.id} className="hover:bg-slate-850/60 transition-colors">
                        <td className="px-3.5 py-2.5 font-mono-legal text-[11px] text-slate-500 text-center align-top">
                          #{rec.rowNumber}
                        </td>
                        <td className="px-3.5 py-2.5 font-mono-legal text-[11px] text-slate-300 align-top whitespace-nowrap">
                          {rec.dateStr}
                        </td>
                        <td className="px-3.5 py-2.5 align-top">
                          <div className="font-semibold text-slate-100">{rec.title}</div>
                          <div className="text-[10px] text-amber-500 font-mono-legal">{rec.category}</div>
                        </td>
                        <td className="px-3.5 py-2.5 align-top">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono-legal font-medium ${
                              rec.subject === 'Tiffany Renea Greene'
                                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60'
                                : rec.subject === 'Eric Joshua Greene'
                                ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
                                : rec.subject === 'Pedro Hernandez'
                                ? 'bg-purple-950/60 text-purple-300 border border-purple-800/60'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {rec.subject}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 align-top text-[11px] text-slate-300 font-medium">
                          {rec.agencyCourt}
                        </td>
                        <td className="px-3.5 py-2.5 align-top">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold leading-tight ${
                              isExonerated
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : isVerifiedHarm
                                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {rec.dispositionOutcome}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 align-top text-[11px] text-slate-300 leading-relaxed font-sans">
                          {rec.evidentiaryImpact}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW B: PRIMARY STAMPED EXHIBITS & DEEP DIVE CARDS              */}
      {/* ============================================================== */}
      {subView === 'primary-dockets' && (
        <div className="space-y-6">
          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedDocket('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedDocket === 'all' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Stamped Dockets ({dockets.length})
            </button>
            <button
              onClick={() => setSelectedDocket('pso-battery')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedDocket === 'pso-battery' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              PSO Battery (TRG-0013)
            </button>
            <button
              onClick={() => setSelectedDocket('pso-felony')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedDocket === 'pso-felony' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              PSO 9mm Handgun (TRG-0014)
            </button>
            <button
              onClick={() => setSelectedDocket('ic3')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedDocket === 'ic3' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              FBI IC3 Federal (TRG-0015)
            </button>
            <button
              onClick={() => setSelectedDocket('dor')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedDocket === 'dor' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Child Support (TRG-0016)
            </button>
            <button
              onClick={() => setSelectedDocket('dor-special-needs')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedDocket === 'dor-special-needs' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Special Needs &amp; Blindness (TRG-0024)
            </button>
            <button
              onClick={() => setSelectedDocket('dissolution')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedDocket === 'dissolution' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dissolution Petition (TRG-0017)
            </button>
            <button
              onClick={() => setSelectedDocket('meridian-homestead')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedDocket === 'meridian-homestead' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Homestead Cash-Out (TRG-0023)
            </button>
          </div>

          {/* Dockets Cards Grid */}
          <div className="space-y-6">
            {filteredDockets.map((docket) => {
              const matchedEx = exhibits.find((e) => e.batesNumber === docket.bates);

              return (
                <div
                  key={docket.id}
                  className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-xl hover:border-slate-700 transition-colors"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-legal font-bold text-amber-400 text-xs bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {docket.bates}
                        </span>
                        <span className="text-xs font-mono-legal text-slate-400">{docket.exhibitId}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80 font-semibold">
                          FRE 902(1)/(2) Certified Record
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-100 font-serif-court">
                        {docket.title}
                      </h3>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Landmark className="w-3.5 h-3.5 text-amber-400" />
                        <span>{docket.agency}</span>
                        <span className="text-slate-600">·</span>
                        <span className="font-mono-legal text-[11px] text-slate-300">{docket.caseNumber}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <button
                        onClick={() => handleCopyCitation(docket)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
                        title="Copy court pleading citation"
                      >
                        {copiedId === docket.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedId === docket.id ? 'Copied' : 'Copy Citation'}</span>
                      </button>

                      {matchedEx && (
                        <button
                          onClick={() => onSelectExhibit(matchedEx)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded border border-amber-500/30 transition-colors"
                          title="Inspect full forensic exhibit drawer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Exhibit</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sub-grid of factual metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-3.5 rounded-lg border border-slate-800/80 font-mono-legal">
                    <div>
                      <span className="text-slate-500 block text-[10px]">RECORD DATE / TIMESTAMP:</span>
                      <span className="text-slate-200 font-medium">{docket.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">OFFICIAL CHARGES / NATURE:</span>
                      <span className="text-amber-300 font-medium">
                        {docket.charges || docket.reliefSought || 'Official Agency Docket'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">EVIDENTIARY CLASSIFICATION:</span>
                      <span className="text-emerald-400 font-medium">{docket.statutes}</span>
                    </div>
                  </div>

                  {/* Factual Analysis & Trial Impact */}
                  <div className="space-y-2 text-xs">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono-legal flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Strategic Evidentiary Impact &amp; Trial Purpose:</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded border border-slate-800">
                      {docket.keyImpact}
                    </p>
                  </div>

                  {/* Verbatim Excerpt if exhibit found */}
                  {matchedEx && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono-legal">
                        Verbatim Certified Transcription ({matchedEx.transcription.certifierName}):
                      </div>
                      <div className="text-xs font-mono-legal text-slate-200 bg-slate-950 p-3 rounded border border-slate-800 whitespace-pre-wrap leading-relaxed">
                        {matchedEx.transcription.rawText}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
