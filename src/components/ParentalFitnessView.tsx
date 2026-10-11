import React, { useState } from 'react';
import { ForensicExhibit, JurisdictionCode } from '../types/forensic';
import {
  ShieldCheck,
  Award,
  HeartPulse,
  Home,
  DollarSign,
  Scale,
  CheckCircle2,
  AlertTriangle,
  BadgeAlert,
  Copy,
  Check,
  FileText,
  UserCheck,
  Layers,
  Eye,
  GraduationCap,
  History,
  Lock,
} from 'lucide-react';

interface ParentalFitnessViewProps {
  exhibits: ForensicExhibit[];
  onSelectExhibit: (exhibit: ForensicExhibit) => void;
  jurisdiction?: JurisdictionCode;
}

export const ParentalFitnessView: React.FC<ParentalFitnessViewProps> = ({
  exhibits,
  onSelectExhibit,
}) => {
  const [copiedMemo, setCopiedMemo] = useState(false);
  const [activeTab, setActiveTab] = useState<'pillars' | 'dcf-timeline' | 'victim-records-legal'>('pillars');

  const handleCopyLegalMemo = () => {
    const text = `MEMORANDUM OF LAW REGARDING IMPROPER WEAPONIZATION OF HISTORICAL CHILDHOOD VICTIMIZATION RECORDS UNDER FLORIDA STATUTES CHAPTER 39

I. PRELIMINARY STATEMENT & CONSTITUTIONAL PROTECTIONS
Petitioner Tiffany Renea Greene moves this Court to strike, disregard, and reject any administrative designation or opposing claim asserting Petitioner is a "high risk parent" based upon confidential childhood records from the 1990s and early 2000s wherein Petitioner was herself an adjudicated minor victim of abuse.

II. STATUTORY MANDATE OF CONFIDENTIALITY (FLA. STAT. §§ 39.0132 & 39.202)
Under Florida Statutes § 39.0132(3) and § 39.202, child welfare records concerning minor victims are strictly confidential and shielded from public dissemination. The legislative intent is unequivocally to protect child victims from stigma, revictimization, and collateral prejudice in their adult lives.

III. PUNITIVE VICTIM-BLAMING VIOLATES DUE PROCESS
Classifying a fit, competent adult parent as "high risk" based solely on historical childhood victimization that occurred over two decades ago constitutes an extreme violation of substantive and procedural Due Process under the Fourteenth Amendment of the United States Constitution and Article I, Section 9 of the Florida Constitution. A parent cannot be penalized for abuse suffered as a minor.

IV. UNCONTESTED RECORD OF ADULT PARENTAL EXONERATION
Between 2016 and 2020, the Florida Department of Children and Families (DCF) conducted four separate, comprehensive in-home investigations concerning Petitioner:
  1. Intake #2016-1208 (12/08/2016): CLOSED WITH NO INDICATORS.
  2. Intake #2018-0213 (02/13/2018): Medical Neglect Allegations — CLOSED WITH NO INDICATORS.
  3. Intake #2018-1207 (12/07/2018): Environmental Allegations — CLOSED WITH NO INDICATORS.
  4. Intake #2020-0124 (01/24/2020): Retaliatory Allegations — CLOSED WITH NO INDICATORS.

V. SYMMETRICAL BAD-FAITH PRETEXT
The bad-faith nature of this administrative maneuvering is demonstrated by its symmetry:
  A. Against Pedro Hernandez: When the manufactured immigration smear was rebutted by USCIS Form I-797 Advance Parole (07/19/2024), Florida DCF and opposing parties exhumed his childhood dependency files from the 1990s AND his K-12 public school records dating back to 1991 (Pasco County Schools Student ID #5100175707; enrolled at Rodney B. Cox Elementary on April 12, 1991). These official school transcripts prove continuous lawful residency in Pasco County since kindergarten at age 5, completely disproving claims of being an "unknown foreign fugitive" and exposing the bad faith of weaponizing 30-year-old elementary school attendance records.
  B. Against Mother Tiffany Greene: When four adult investigations found zero abuse or neglect, DCF exhumed her childhood abuse victim reports to manufacture a "high risk" designation.

The necessity of exhuming childhood trauma and elementary school records from 20-30 years ago conclusively demonstrates that opposing parties possess zero legitimate evidence of adult parental inadequacy. Petitioner requests that all such improper references be excluded and stricken from the record.`;

    navigator.clipboard.writeText(text);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2000);
  };

  const FITNESS_PILLARS = [
    {
      id: 'pillar-academic',
      icon: GraduationCap,
      color: 'amber',
      title: '1. Academic Dedication & Professional Purpose',
      headline: 'Liberty University 4.0 GPA Criminal Justice Scholar · Dual National Honor Society Inductee',
      details:
        'Petitioner has demonstrated extraordinary academic discipline and moral integrity, maintaining an unblemished 4.00 cumulative GPA in Criminal Justice studies (Major: Criminal Psychology, Government; Minor: Public Administration) at Liberty University. Officially inducted into two prestigious national honor societies: (1) Omega Nu Lambda National Honor Society for Online Students (Alpha Chapter, Liberty University · Inducted July 17, 2026), and (2) Omicron Sigma Sigma (Order of the Sword & Shield Academic and Professional Honor Society for Criminal Justice & Homeland Security · Inducted May 5, 2026). Certified transcript verifies 88 total credit hours (60 transfer credits from Ultimate Medical Academy plus 28 Liberty institutional credits) with consecutive Dean\'s List honors.',
      impact:
        'Conclusively demonstrates personal stability, intellectual rigor, exemplary moral fitness under Fla. Stat. § 61.13(3)(f), and a dedicated, forward-looking commitment to the rule of law and child welfare.',
      exhibitRef: 'TRG-0015 (FBI Dossier § 1) · IR-030, IR-030A & IR-030B (Omega Nu Lambda & Order of the Sword & Shield Certificates)',
    },
    {
      id: 'pillar-agency',
      icon: ShieldCheck,
      color: 'emerald',
      title: '2. 100% Clean Adult Criminal & Agency Clearance',
      headline: 'Zero Adult Arrests & 4/4 Florida DCF Investigations Cleared',
      details:
        'In her entire adult life, Petitioner has never been arrested, charged, or convicted of any crime of violence, domestic battery, theft, or substance abuse. Furthermore, Florida DCF conducted four separate, comprehensive in-home investigations between 2016 and 2020—every single investigation closed with "NO INDICATORS" of abuse or neglect.',
      impact:
        'Completely rebuts the bad-faith "high risk" label. The official state agency investigated Petitioner four times and found zero parental deficiency.',
      exhibitRef: 'IR-020, IR-021, IR-022, IR-026 · Paragraph 13 Declaration',
    },
    {
      id: 'pillar-medical',
      icon: HeartPulse,
      color: 'cyan',
      title: '3. Special Needs & Pediatric Medical Compliance',
      headline: 'Autism Therapies, Psychiatric Care & Legal Blindness Advocacy',
      details:
        'Petitioner has been the primary advocate and caretaker for the minor children\'s severe medical conditions: actively coordinating specialized autism therapies and psychiatric evaluations for Kayleen and Hunter, and managing specialized pediatric ophthalmological treatment for Emmalynn\'s complete legal blindness. Contrast: Respondent Eric Greene completely cut off Mother from medical records and paid $0.00 in medical support.',
      impact:
        'Demonstrates superior parental responsibility directly aligned with Fla. Stat. § 61.13(3) Best Interests factors.',
      exhibitRef: 'TRG-0024 (Special Needs Pleading) · TRG-0016 (FL DOR)',
    },
    {
      id: 'pillar-protective',
      icon: Home,
      color: 'purple',
      title: '4. Protective Action & Domestic Violence Mitigation',
      headline: 'Lawful Escape from Armed Violence & Protective Court Actions',
      details:
        'Petitioner took courageous, necessary protective steps to remove herself and children from escalating lethal violence: following the April 11, 2019 domestic battery and November 3, 2019 9mm handgun assault, Petitioner filed emergency domestic violence petitions, sought circuit court injunctions, and maintained a safe, violence-free residence.',
      impact:
        'Under Fla. Stat. § 61.13(3)(m), fleeing domestic violence cannot be penalized as "abandonment"; it is legally recognized protective parenting.',
      exhibitRef: 'TRG-0013, TRG-0014, TRG-0025, TRG-0017',
    },
    {
      id: 'pillar-financial',
      icon: DollarSign,
      color: 'rose',
      title: '5. Financial Diligence & Economic Resilience',
      headline: 'Independent Household Management Despite $0.00 Child Support',
      details:
        'Despite Respondent paying exactly $0.00 in child support across 7 years of separation and secretly liquidating $161,280.40 from the marital homestead, Petitioner has maintained economic independence, sought federal student loan discharge through Borrower Defense to undo coerced debt, and reported corporate tax fraud to the IRS.',
      impact:
        'Proves financial resilience, economic integrity, and protective steps against economic coercion and identity theft.',
      exhibitRef: 'TRG-0016 (FL DOR Arrears) · TRG-0023 (HUD-1) · IR-032 (IRS 3949-A)',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider flex items-center gap-2">
            <span>Affirmative Parental Fitness · Countering the &quot;High Risk&quot; Pretext</span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">Fla. Stat. § 61.13 / Best Interests Factors</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1">
            Parental Fitness Affirmation &amp; Comparative DCF History
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Documenting affirmative parental fitness, special needs pediatric care, clean adult agency clearances, and exposing the unlawful weaponization of 1990s/2000s childhood victim records.
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs self-start md:self-auto">
          <button
            onClick={() => setActiveTab('pillars')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              activeTab === 'pillars'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>5 Fitness Pillars</span>
          </button>
          <button
            onClick={() => setActiveTab('dcf-timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              activeTab === 'dcf-timeline'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Comparative DCF Audit</span>
          </button>
          <button
            onClick={() => setActiveTab('victim-records-legal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              activeTab === 'victim-records-legal'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Childhood Records Memo</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: 5 AFFIRMATIVE FITNESS & RISK MITIGATION PILLARS         */}
      {/* ============================================================== */}
      {activeTab === 'pillars' && (
        <div className="space-y-6">
          {/* Executive Summary Card */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-amber-950/40 border border-emerald-500/40 rounded-xl space-y-2.5">
            <div className="flex items-center gap-2 font-bold font-mono-legal text-xs text-emerald-300 uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct Rebuttal to Opposing &quot;High Risk&quot; Allegations</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              Under Florida law (Fla. Stat. § 61.13), custody determinations rest upon the parent&apos;s demonstrated capacity to provide for the physical, emotional, and educational well-being of the minor children. The record affirmatively establishes that Petitioner Tiffany Greene possesses exemplary personal stability, a 4.0 academic record, zero adult criminal or child welfare blemishes, and has been the sole parent actively championing the children&apos;s severe autism therapies and pediatric blindness treatments.
            </p>
          </div>

          {/* Pillars Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FITNESS_PILLARS.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3.5 shadow-lg hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-amber-400">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono-legal text-slate-400">{pillar.title}</div>
                        <h3 className="font-bold text-slate-100 font-serif-court text-sm sm:text-base">
                          {pillar.headline}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{pillar.details}</p>

                  {pillar.id === 'pillar-academic' && (
                    <div className="p-3 bg-slate-950/80 rounded-lg border border-amber-500/30 space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                        <span className="font-mono-legal text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                          <span>Official Transcript Verification (Liberty University)</span>
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono-legal bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                          Dean&apos;s List · 4.00 GPA
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono-legal text-slate-300">
                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 block">Institution:</span>
                          <span className="text-slate-100 font-bold">Liberty University</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 block">Degree / Major:</span>
                          <span className="text-slate-100 font-bold">B.S. Criminal Justice</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 block">Total Earned:</span>
                          <span className="text-amber-300 font-bold">88.00 Credits</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 block">Cumulative GPA:</span>
                          <span className="text-emerald-400 font-bold">4.00 / 4.00</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 space-y-1 pt-1 border-t border-slate-800/60 font-sans">
                        <div>
                          <strong className="text-slate-300 font-mono-legal">Major &amp; Minor:</strong> Criminal Justice: Criminal Psychology &amp; Government | Minor: Public Administration.
                        </div>
                        <div>
                          <strong className="text-slate-300 font-mono-legal">Transfer Hours:</strong> 60.00 credits accepted from Ultimate Medical Academy (Math, Biology, English, Sociology, Psychology, Business).
                        </div>
                        <div>
                          <strong className="text-slate-300 font-mono-legal">Institutional Hours:</strong> 28.00 upper-division Liberty credits (100% Grade A, 112.00 Quality Points, Dean&apos;s List Spring &amp; Summer 2026).
                        </div>
                        <div>
                          <strong className="text-slate-300 font-mono-legal">In-Progress Focus:</strong> Constitutional Criminal Procedure, Report Writing, Juvenile Justice, Judicial Process &amp; Crisis Intervention.
                        </div>
                      </div>

                      {/* Dual Honor Society Inductions Showcase */}
                      <div className="pt-2 border-t border-slate-800/80 space-y-2">
                        <span className="text-[10px] font-mono-legal text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>Official National Honor Society Inductions (Exhibits IR-030A &amp; IR-030B)</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="p-2.5 bg-gradient-to-br from-slate-900 to-amber-950/30 rounded border border-amber-500/30 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-100 text-[11px] font-serif-court">Omega Nu Lambda</span>
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono-legal bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                July 17, 2026
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-300">
                              National Honor Society for Online Students · Liberty University, Alpha Chapter
                            </div>
                            <div className="text-[9px] font-mono-legal text-amber-400/90 flex items-center gap-1">
                              <span>Ref: IR-030A · High Collegiate Academic Distinction</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-gradient-to-br from-slate-900 to-cyan-950/30 rounded border border-cyan-500/30 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-100 text-[11px] font-serif-court">Omicron Sigma Sigma</span>
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono-legal bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                May 5, 2026
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-300">
                              Order of the Sword &amp; Shield · Criminal Justice &amp; Homeland Security Honor Society
                            </div>
                            <div className="text-[9px] font-mono-legal text-cyan-400/90 flex items-center gap-1">
                              <span>Motto: &quot;Ex Scientia Pax&quot; · Ref: IR-030B</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1 text-xs">
                    <span className="text-[10px] font-mono-legal text-emerald-400 block font-semibold">
                      JUDICIAL PROBATIVE VALUE:
                    </span>
                    <span className="text-slate-200 text-xs leading-relaxed">{pillar.impact}</span>
                  </div>

                  <div className="text-[10px] text-amber-400/90 font-mono-legal pt-1 flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-amber-400" />
                    <span>Cross-References: {pillar.exhibitRef}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: COMPARATIVE DCF TIMELINE & AGENCY AUDIT                 */}
      {/* ============================================================== */}
      {activeTab === 'dcf-timeline' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold font-mono-legal text-xs text-amber-400 uppercase tracking-wide">
              <Scale className="w-4 h-4" />
              <span>Comparative In-Home Investigation History: Mother vs. Father</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Between 2016 and 2020, Florida Department of Children and Families conducted seven investigations regarding the parties. This comparative chart demonstrates that while Mother was investigated four times and repeatedly cleared with zero findings, Father was found to present verified domestic violence and lethal threats of harm.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Mother's 100% Clean Clearance Record */}
            <div className="space-y-4">
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex items-center justify-between">
                <span className="font-bold text-emerald-300 font-mono-legal text-xs uppercase">
                  ✓ MOTHER TIFFANY GREENE · 4/4 CLOSED WITH NO INDICATORS
                </span>
                <span className="text-[10px] font-mono-legal px-2 py-0.5 bg-emerald-900/60 text-emerald-200 rounded">
                  100% Exonerated
                </span>
              </div>

              {[
                {
                  date: 'December 8, 2016 · 15:19',
                  intake: 'Intake #2016-1208',
                  allegation: 'Third-party anonymous report alleging parental inadequacy.',
                  result: 'CLOSED WITH NO INDICATORS',
                  notes: 'DCF verified proper home care, food, utilities, and loving parental bond.',
                },
                {
                  date: 'February 13, 2018 · 10:37',
                  intake: 'Intake #2018-0213',
                  allegation: 'Malicious report alleging medical neglect of minor children.',
                  result: 'CLOSED WITH NO INDICATORS',
                  notes: 'DCF verified routine pediatric compliance, vaccinations, and prompt medical care.',
                },
                {
                  date: 'December 7, 2018 · 17:25',
                  intake: 'Intake #2018-1207',
                  allegation: 'Allegation of dirty living environment and lack of supervision.',
                  result: 'CLOSED WITH NO INDICATORS',
                  notes: 'Home inspection confirmed adequate sanitation, bedding, and food reserves.',
                },
                {
                  date: 'January 24, 2020 · 10:48',
                  intake: 'Intake #2020-0124',
                  allegation: 'Retaliatory complaint filed by Respondent following separation.',
                  result: 'CLOSED WITH NO INDICATORS',
                  notes: 'Fourth consecutive investigation thoroughly disproving bad-faith claims.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-950 border border-emerald-900/40 rounded-xl space-y-2 shadow"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono-legal text-emerald-400 font-bold">{item.intake}</span>
                    <span className="text-slate-400 font-mono-legal text-[11px]">{item.date}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <strong className="text-slate-200">Allegation:</strong> {item.allegation}
                  </div>
                  <div className="p-2 bg-emerald-950/60 rounded border border-emerald-800/80 text-[11px] font-mono-legal font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>OFFICIAL DISPOSITION: {item.result}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{item.notes}</p>
                </div>
              ))}
            </div>

            {/* Right Column: Father's Verified Findings of Domestic Violence & Threats */}
            <div className="space-y-4">
              <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl flex items-center justify-between">
                <span className="font-bold text-rose-300 font-mono-legal text-xs uppercase">
                  ✕ FATHER ERIC GREENE · VERIFIED VIOLENCE &amp; THREATS
                </span>
                <span className="text-[10px] font-mono-legal px-2 py-0.5 bg-rose-900/60 text-rose-200 rounded">
                  State Findings
                </span>
              </div>

              {[
                {
                  date: 'April 6, 2019 · 16:07',
                  intake: 'Intake #2019-0406',
                  allegation: 'Physical domestic altercation witnessed by minor daughters Sarah & Kayleen.',
                  result: 'VERIFIED FINDINGS: Domestic Violence by Father',
                  notes: 'Pasco Sheriff arrested Eric Greene for Domestic Battery (TRG-0013). DCF officially substantiated findings of physical domestic violence against Father.',
                },
                {
                  date: 'November 3, 2019 · 14:20',
                  intake: 'Intake #2019-1103',
                  allegation: 'Armed assault with deadly weapon; choking victim; retrieving 9mm handgun.',
                  result: 'VERIFIED FINDINGS: Threat of Harm by Father',
                  notes: 'Pasco Sheriff booked Eric for Felony Aggravated Assault with a Deadly Weapon (TRG-0014). DCF confirmed Father created an imminent verified threat of lethal harm to children.',
                },
                {
                  date: 'May 7, 2020 · 16:56',
                  intake: 'Intake #2020-0507',
                  allegation: 'Domestic disturbance following Eric Greene dispatching law enforcement.',
                  result: 'VERIFIED FINDINGS Against Father Eric Greene',
                  notes: 'State investigators sustained disturbance findings against Father while completely clearing Mother.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-950 border border-rose-900/40 rounded-xl space-y-2 shadow"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono-legal text-rose-400 font-bold">{item.intake}</span>
                    <span className="text-slate-400 font-mono-legal text-[11px]">{item.date}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <strong className="text-slate-200">Incident:</strong> {item.allegation}
                  </div>
                  <div className="p-2 bg-rose-950/60 rounded border border-rose-800/80 text-[11px] font-mono-legal font-bold text-rose-300 flex items-center gap-1.5">
                    <BadgeAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>OFFICIAL DISPOSITION: {item.result}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{item.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: LEGAL MEMORANDUM ON WEAPONIZING CHILDHOOD VICTIM RECORDS */}
      {/* ============================================================== */}
      {activeTab === 'victim-records-legal' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-purple-950/40 border border-purple-800/60 rounded-xl text-xs">
            <div className="space-y-1">
              <span className="font-bold text-purple-300 font-mono-legal uppercase text-[11px] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>Confidentiality of Child Victim Records · Fla. Stat. §§ 39.0132 &amp; 39.202</span>
              </span>
              <p className="text-slate-300">
                Formal legal argument to strike and disregard any attempt to penalize Mother or partner Pedro based on confidential childhood abuse records from the 1990s/2000s.
              </p>
            </div>
            <button
              onClick={handleCopyLegalMemo}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow shrink-0 self-start sm:self-auto"
            >
              {copiedMemo ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMemo ? 'Copied Legal Memo' : 'Copy Motion Memo'}</span>
            </button>
          </div>

          <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4 font-serif-court text-xs sm:text-sm text-slate-200 leading-relaxed">
            <h3 className="text-base font-bold text-amber-400 font-sans uppercase tracking-wider border-b border-slate-800 pb-2">
              MEMORANDUM OF LAW: IMPROPER WEAPONIZATION OF CHILDHOOD VICTIMIZATION RECORDS
            </h3>

            <p>
              <strong>I. Absolute Prohibition Against Penalizing Adult Victims for Historic Childhood Abuse</strong>
              <br />
              Under Florida Statutes § 39.0132(3) and § 39.202, child welfare records concerning minor victims are strictly confidential and shielded from public disclosure. The Florida Legislature enacted these statutory protections specifically to ensure that children who suffer abuse or dependency are safeguarded from lifelong institutional stigma.
            </p>

            <p>
              Attempting to classify an adult parent as &quot;high risk&quot; based solely upon the fact that she was a minor victim of abuse in her own childhood more than twenty years ago violates basic Florida child welfare standards and constitutes an extreme form of punitive victim-blaming.
            </p>

            <p>
              <strong>II. Constitutional Due Process Violation</strong>
              <br />
              Under the Due Process Clause of the Fourteenth Amendment to the United States Constitution and Article I, Section 9 of the Florida Constitution, state action depriving a fit parent of the fundamental liberty interest in the care, custody, and management of her children cannot rest upon arbitrary, discriminatory, or irrational classifications. To use an adult&apos;s childhood victimization as a proxy for adult unfitness is per se arbitrary and unconstitutional.
            </p>

            <p>
              <strong>III. The Symmetrical Pattern of Administrative Pretext</strong>
              <br />
              The Court must take judicial notice of the striking symmetry employed by opposing parties and complicit agency actors:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>Against Partner Pedro Hernandez:</strong> When the manufactured smear that Pedro was an &quot;illegal deportee fugitive&quot; was demolished by USCIS Form I-797 granting Advance Parole (07/19/2024), DCF literally exhumed Pedro&apos;s childhood dependency files from the 1990s AND his K-12 public school records dating back to 1991 (Pasco County Schools Student ID #5100175707; enrolled at Rodney B. Cox Elementary on April 12, 1991). These official school transcripts prove continuous lawful residency in Pasco County since kindergarten at age 5, completely disproving claims of being an &quot;unknown foreign fugitive&quot; and exposing the bad faith of weaponizing 30-year-old elementary school attendance records to remove children in 2020.
              </li>
              <li>
                <strong>Against Mother Tiffany Greene:</strong> When four separate adult investigations (2016–2020) resulted in 100% exoneration with NO INDICATORS, DCF exhumed Mother&apos;s own confidential childhood victim reports from the 1990s/2000s to label her &quot;high risk.&quot;
              </li>
            </ul>

            <p>
              <strong>IV. Conclusion &amp; Request for Relief</strong>
              <br />
              The fact that opposing parties were forced to exhume confidential childhood records from two decades ago proves beyond question that they possess <strong>ZERO legitimate evidence of adult parental inadequacy</strong>. Petitioner respectfully requests that this Court strike all references to historical childhood victim records and evaluate this custody matter exclusively upon the parties&apos; documented adult conduct.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
