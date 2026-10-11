import React, { useState } from 'react';
import { ForensicExhibit, JurisdictionCode } from '../types/forensic';
import {
  X,
  Scale,
  ShieldCheck,
  AlertTriangle,
  BadgeAlert,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  Layers,
  ArrowRight,
  Landmark,
  Shield,
  FileCheck2,
  Flame,
  Zap,
  UserCheck,
} from 'lucide-react';

interface CourtroomPresenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  exhibits: ForensicExhibit[];
  jurisdiction?: JurisdictionCode;
}

export const CourtroomPresenterModal: React.FC<CourtroomPresenterModalProps> = ({
  isOpen,
  onClose,
  exhibits,
}) => {
  const [activeTab, setActiveTab] = useState<
    'perjury-traps' | 'witness-retaliation' | 'fitness-rebuttal' | 'proffer-speech'
  >('perjury-traps');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const PERJURY_TRAPS = [
    {
      id: 'trap-1',
      title: '1. The Manufactured "Illegal Fugitive" & 1990s Childhood Records Pretext',
      smearStatement:
        'Respondent public broadcast: "Pedro is an illegal deportee fugitive who puts the children in danger and got removed."',
      smearContext: 'TikTok Live Broadcasts & Facebook comments to hundreds of viewers',
      certifiedTruth: [
        'USCIS Form I-797 Notice of Action (July 19, 2024): Pedro Hernandez was officially granted lawful Advance Parole travel authorization by DHS/USCIS.',
        'Pasco County Schools Certified Transcript (TRG-0026): Pedro Villanueva Hernandez has been an enrolled, documented resident of Pasco County since Kindergarten on April 12, 1991 (Student ID: 5100175707; Rodney B. Cox Elementary, Lacoochee Elementary, Weightman Middle, Wesley Chapel High). Proves 30-year continuous local residency since age 5 and obliterates the "unknown foreign fugitive" smear.',
        'Sixth Judicial Circuit State Attorney Notice of No Information (June 10, 2020): All criminal charges initiated by Eric Greene were completely dismissed with full exoneration.',
        'CRITICAL FACT — 1990s Childhood Records Weaponization: Claims of "illegal status" were a redundant, manufactured smoke screen. Florida DCF literally exhumed Pedro\'s 1990s childhood dependency files AND his 1991 elementary school records to manufacture grounds to displace Tiffany\'s children in Case #2020-DP-000113!',
      ],
      supportingExhibits: ['TRG-0026 (Pasco Schools Transcript)', 'TRG-0015 (FBI IC3)', 'IR-002 (USCIS I-797)', 'IR-005 (No Info Exoneration)', 'IR-019 (CRCL Complaint)'],
      statutoryRule: 'Defamation Per Se · FRE 902(1)/(2) Public Records · Bad-Faith Pretextual Administrative Collusion',
    },
    {
      id: 'trap-2',
      title: '2. The "12-Year Continuous Domestic Abuser" Smear',
      smearStatement:
        'Respondent video caption (TRG-0002): "My abuser and her fling. Left her family and ran off. She would hit me for 12 years and now plays the victim."',
      smearContext: 'Published on TikTok January 18, 2026, 4 days after formal Cease-and-Desist Notice',
      certifiedTruth: [
        'Zero Arrests for Petitioner: In 12 years of marriage, Petitioner Tiffany Greene has NEVER been arrested, charged, or convicted of domestic battery.',
        'Respondent was the Sole Batterer: On April 11, 2019, Pasco County Sheriff deputies arrested Eric Joshua Greene for Domestic Battery (F.S. 784.03) after he physically shoved Tiffany out of the home (Exhibit TRG-0013 / Report #19-014214).',
        'Eyewitness Corroboration: Minor daughters Sarah and Kayleen reported watching their father physically batter their mother.',
      ],
      supportingExhibits: ['TRG-0013 (PSO Arrest Affidavit)', 'TRG-0002 (TikTok Video)', 'TRG-0004 (Certified Affirmative Defense)'],
      statutoryRule: 'FRE 607 / 609 Impeachment · Defamation Per Se (Crime of Moral Turpitude) · FRE 801(d)(2)',
    },
    {
      id: 'trap-3',
      title: '3. The "Mother Abandoned Her Children" Smear',
      smearStatement:
        'Respondent broadcast (TRG-0008) & Heaven-Leigh post (TRG-0006): "She abandoned her kids, walked out on her family, and isn\'t even their real mother."',
      smearContext: 'TikTok Live broadcasts and Facebook posts',
      certifiedTruth: [
        'Florida DCF Exoneration: 4 consecutive Florida DCF in-home investigations into Mother (2016-1208, 2018-0213, 2018-1207, 2020-0124) were ALL closed with NO INDICATORS of maltreatment.',
        'Weaponization of Mother\'s Childhood Victim Reports: Having zero evidence of adult unfitness, DCF and opposing parties exhumed Mother\'s confidential childhood DCF records where SHE was an abused minor victim to attempt to classify her as a "high risk parent"—an egregious violation of due process proving the total absence of adult neglect.',
        'Eric\'s Contemporaneous Confession (TRG-0025): On Nov 1, 2019, Eric texted Tiffany: "i let you walk away last night i wont do it again... come home and you can be with your kids all of them." Conceding she fled abuse and he held the children hostage.',
        'Contrasting Findings Against Father: DCF sustained VERIFIED FINDINGS of Domestic Violence (04/06/2019) and Threat of Harm (11/03/2019) against Eric Greene.',
      ],
      supportingExhibits: ['TRG-0025 (Nov 1 2019 Text)', 'IR-020 to IR-026 (DCF Intakes)', 'TRG-0017 (Dissolution Petition)'],
      statutoryRule: 'FRE 801(d)(2) Party Admission · Child Best Interests (Fla. Stat. § 61.13) · Due Process Violation',
    },
    {
      id: 'trap-4',
      title: '4. The "Peaceful Father / Internet Joke" Defense',
      smearStatement:
        'Respondent anticipated defense: "I never physically threatened her; it was just a country song lip-sync and private joke."',
      smearContext: 'Defense to June 18, 2026 direct menacing video (TRG-0012)',
      certifiedTruth: [
        'Felony 9mm Gun Assault (TRG-0014): On Nov 3, 2019, Eric was booked for Felony Aggravated Assault with a Deadly Weapon after choking Pedro, punching him, screaming "I am gonna kill you", and retrieving a loaded High Point Black 9mm handgun.',
        'Direct Menacing Transmission: On June 18, 2026 at 23:42 EDT, Eric transmitted a private video to Tiffany declaring: "I should beat her ass / But my momma said animal abuse is wrong."',
        'Demonstrated Lethal Propensity: Respondent possesses actual history of firearm violence and death threats against these exact individuals.',
      ],
      supportingExhibits: ['TRG-0014 (Felony Gun Arrest)', 'TRG-0012 (Direct Threat Video)', 'TRG-0025 (48-Hr Pre-Assault Motive)'],
      statutoryRule: 'Emergency Domestic Violence Injunction Standard · Reasonable Apprehension of Imminent Bodily Harm',
    },
    {
      id: 'trap-5',
      title: '5. The "I Financially Paid For Everything" Lie',
      smearStatement:
        'Respondent public claims: "I paid for the house, pay for everything, and she took loans in my name and paid zero."',
      smearContext: 'TikTok statements and private text accusations (TRG-0011)',
      certifiedTruth: [
        'Florida DOR Arrears (TRG-0016): Respondent has paid exactly $0.00 in child support across 7 years of separation (Case #2001507784).',
        'Homestead Cash-Out ($161,280.40): On August 19, 2022, Eric secretly sold the Florida marital home (39605 Drew Dr) for $170,000, pocketed $161,280.40 cash, and bought 75 acres in Kentucky while giving Petitioner $0.00 (TRG-0023).',
        'Child Conceived During Marriage: On Dec 13, 2024, Eric fathered daughter Amelia with Third Party Heaven Horton while still married to Tiffany.',
      ],
      supportingExhibits: ['TRG-0016 (FL DOR Support)', 'TRG-0023 (Meridian Title HUD-1)', 'TRG-0017 (Divorce Petition)'],
      statutoryRule: 'Dissipation of Marital Assets (Fla. Stat. § 61.075) · Child Support Arrears (UIFSA)',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-lg">
      <div className="relative w-full max-w-6xl max-h-[94vh] overflow-y-auto rounded-2xl border border-amber-500/40 bg-slate-900 shadow-2xl flex flex-col">
        {/* Top Courtroom Presentation Header */}
        <div className="sticky top-0 z-20 bg-slate-950/95 border-b border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-xs font-mono-legal font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Courtroom Proffer &amp; Live Impeachment Mode</span>
              </span>
              <span className="text-slate-500 text-xs">·</span>
              <span className="text-xs text-slate-300 font-mono-legal">
                Sixth Judicial Circuit · Case #2019DR006262DRAXES
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-serif-court flex items-center gap-2">
              <span>Greene v. Greene &amp; Horton · Bench Presentation Suite</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Proffer</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
              title="Close Presenter Mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="bg-slate-950 px-4 sm:px-6 py-2.5 border-b border-slate-800 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveTab('perjury-traps')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'perjury-traps'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>5 Direct Perjury &amp; Contradiction Traps</span>
          </button>
          <button
            onClick={() => setActiveTab('witness-retaliation')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'witness-retaliation'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2020 Witness Tampering &amp; Deportation Flow</span>
          </button>
          <button
            onClick={() => setActiveTab('fitness-rebuttal')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'fitness-rebuttal'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Parental Fitness &amp; &apos;High-Risk&apos; Rebuttal</span>
          </button>
          <button
            onClick={() => setActiveTab('proffer-speech')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'proffer-speech'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>3-Minute Oral Hearing Proffer</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 flex-1 overflow-y-auto">
          {/* TAB 1: PERJURY TRAPS */}
          {activeTab === 'perjury-traps' && (
            <div className="space-y-6">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Bench Impeachment Protocol:</strong> When Respondent testifies or submits sworn statements asserting these false claims, present these side-by-side certified exhibits under <strong>FRE 801(d)(2)</strong> and <strong>FRE 902(1)/(2)</strong> to destroy credibility and establish bad faith.
                </div>
              </div>

              <div className="space-y-5">
                {PERJURY_TRAPS.map((trap) => (
                  <div
                    key={trap.id}
                    className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 hover:border-slate-700 transition-colors shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                      <h3 className="font-bold text-slate-100 font-serif-court text-base">
                        {trap.title}
                      </h3>
                      <span className="text-[10px] font-mono-legal text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                        {trap.statutoryRule}
                      </span>
                    </div>

                    {/* Side-by-side comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Left: The False Smear */}
                      <div className="p-4 bg-rose-950/40 border border-rose-900/60 rounded-lg space-y-2">
                        <div className="flex items-center gap-1.5 font-bold font-mono-legal text-[11px] text-rose-300 uppercase">
                          <Flame className="w-3.5 h-3.5 text-rose-400" />
                          <span>Respondent&apos;s False Smear / Defense</span>
                        </div>
                        <p className="text-rose-200 font-serif-court italic text-sm leading-relaxed">
                          &ldquo;{trap.smearStatement}&rdquo;
                        </p>
                        <div className="text-[10px] text-rose-400/80 font-mono-legal pt-1 border-t border-rose-900/40">
                          Venue: {trap.smearContext}
                        </div>
                      </div>

                      {/* Right: The Certified Judicial Truth */}
                      <div className="p-4 bg-emerald-950/40 border border-emerald-900/60 rounded-lg space-y-2">
                        <div className="flex items-center gap-1.5 font-bold font-mono-legal text-[11px] text-emerald-300 uppercase">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Certified Judicial Proof (FRE 902)</span>
                        </div>
                        <ul className="space-y-1.5 text-slate-200 text-xs list-disc pl-4 leading-relaxed">
                          {trap.certifiedTruth.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-emerald-900/40">
                          {trap.supportingExhibits.map((ex, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-emerald-900/60 text-emerald-300 rounded font-mono-legal text-[10px] font-semibold"
                            >
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: WITNESS RETALIATION & REMOVAL FLOW */}
          {activeTab === 'witness-retaliation' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-2 font-bold font-mono-legal text-amber-400 text-xs uppercase tracking-wide">
                  <BadgeAlert className="w-4 h-4 text-amber-400" />
                  <span>The 2020 Witness Tampering &amp; Retaliatory Neutralization Arc</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                  This chronological sequence demonstrates how Respondent Eric Joshua Greene coordinated with law enforcement contacts to eliminate the sole eyewitness/victim in his pending 9mm handgun felony prosecution, directly establishing bad-faith obstruction and witness retaliation under 18 U.S.C. § 2261A and state protective order standards.
                </p>
              </div>

              {/* Step-by-Step Visual Timeline */}
              <div className="space-y-3">
                {[
                  {
                    step: 'STEP 1',
                    date: 'November 3, 2019',
                    title: 'The Crime: Armed 9mm Handgun Assault on Pedro Hernandez',
                    agency: "Pasco County Sheriff's Office · Case #2019CF006660AES.1",
                    bates: 'TRG-0014',
                    detail:
                      'Eric Greene choked Pedro Hernandez, punched him, stated "I am gonna kill you," and retrieved a loaded 9mm handgun. Eric was arrested for Felony Aggravated Assault with a Deadly Weapon. Pedro was the sole victim and primary prosecuting witness.',
                    severity: 'rose',
                  },
                  {
                    step: 'STEP 2',
                    date: 'May 7, 2020',
                    title: 'The Retaliatory Arrest of Star Witness Pedro Hernandez',
                    agency: "Pasco County Sheriff's Office Booking Report",
                    bates: 'IR-004',
                    detail:
                      'Following a domestic report generated by Eric Greene, deputies booked Pedro Hernandez. Notice: This occurred while Eric was actively awaiting felony trial for assaulting Pedro!',
                    severity: 'amber',
                  },
                  {
                    step: 'STEP 3',
                    date: 'June 10, 2020',
                    title: 'State Attorney Exoneration: Notice of No Information',
                    agency: "Sixth Judicial Circuit State Attorney's Office",
                    bates: 'IR-005',
                    detail:
                      'State prosecutors reviewed the allegations, determined they were completely unfounded, and officially filed a "Notice of No Information," completely dismissing all charges against Pedro Hernandez.',
                    severity: 'emerald',
                  },
                  {
                    step: 'STEP 4',
                    date: 'June 20 – 23, 2020',
                    title: 'Unlawful 287(g) Detainer & Transfer to ICE Krome / Laredo',
                    agency: 'DHS / ICE Enforcement and Removal Operations',
                    bates: 'IR-013 to IR-017',
                    detail:
                      'Instead of mandatory release following dismissal, Pedro was subjected to a 287(g) administrative detainer, interrogated without counsel, and transferred to Krome Detention Center to expedite deportation.',
                    severity: 'amber',
                  },
                  {
                    step: 'STEP 5',
                    date: 'July 1, 2020',
                    title: 'Expedited Physical Removal to Mexico',
                    agency: 'ICE Orlando Enforcement and Removal',
                    bates: 'IR-018',
                    detail:
                      'Pedro Hernandez was physically removed across the border, effectively silencing the star witness in the pending Florida criminal court prosecution of Eric Greene.',
                    severity: 'rose',
                  },
                  {
                    step: 'STEP 6',
                    date: 'August 12, 2020 (42 Days Later)',
                    title: 'State Attorney Forced to Enter Nolle Prosequi on Eric Greene',
                    agency: 'Pasco County Circuit Court (Sixth Judicial Circuit)',
                    bates: 'TRG-0014 Docket',
                    detail:
                      'With the victim and star witness physically deported and unavailable to testify at trial, the State Attorney in Pasco County had no choice but to enter a Nolle Prosequi on Eric Greene\'s felony gun charges. The retaliation succeeded.',
                    severity: 'purple',
                  },
                  {
                    step: 'STEP 7',
                    date: '2020 Dependency & The 1990s Childhood Records Pretext',
                    title: 'Florida DCF Weaponizes Pedro\'s Childhood Dependency Files from 1990s',
                    agency: 'Pasco Dependency Case #2020-DP-000113',
                    bates: 'TRG-0015 & TRG-0022',
                    detail:
                      'Concurrently, to justify displacing Tiffany\'s minor children, Florida DCF exhumed Pedro\'s childhood dependency files from the 1990s (when Pedro was an abused child over 20 years earlier) to manufacture grounds for child removal, proving gross administrative overreach.',
                    severity: 'purple',
                  },
                  {
                    step: 'STEP 8',
                    date: 'July 19, 2024',
                    title: 'Federal Vindication: USCIS Grants Form I-797 Advance Parole',
                    agency: 'U.S. Citizenship and Immigration Services (USCIS) / DHS',
                    bates: 'IR-002',
                    detail:
                      'USCIS formally granted Pedro Hernandez lawful Advance Parole travel authorization, confirming valid federal status and completely refuting Respondent\'s public claims that Pedro is an "illegal fugitive."',
                    severity: 'emerald',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 flex flex-col sm:flex-row sm:items-start gap-4"
                  >
                    <div className="shrink-0">
                      <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-amber-400 font-mono-legal font-bold text-xs rounded">
                        {item.step}
                      </span>
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono-legal text-xs text-slate-400">{item.date}</span>
                        <span className="text-slate-600">·</span>
                        <span className="font-semibold text-slate-100 text-sm">{item.title}</span>
                      </div>
                      <div className="text-xs text-amber-500 font-mono-legal">{item.agency} · {item.bates}</div>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PARENTAL FITNESS & HIGH-RISK REBUTTAL */}
          {activeTab === 'fitness-rebuttal' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold font-mono-legal text-emerald-300 text-xs uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Affirmative Parental Fitness vs. The &quot;High-Risk&quot; Pretext</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Use this presentation tab when Respondent or opposing counsel asserts that Mother is &quot;high risk&quot; or unfit. This presents the five unassailable pillars of affirmative fitness and exposes the illegal weaponization of confidential childhood abuse victim files.
                </p>
              </div>

              {/* Side-by-Side: The Pretext vs. The Five Affirmative Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Left: The Pretextual Smear */}
                <div className="p-4 bg-rose-950/40 border border-rose-900/60 rounded-xl space-y-3">
                  <div className="font-mono-legal font-bold text-rose-300 uppercase text-[11px] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span>The Bad-Faith State &amp; Defense Smear</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded border border-rose-900/40 font-serif-court text-rose-200 text-sm leading-relaxed italic">
                    &ldquo;Mother is classified as a &apos;high risk parent&apos; and abandoned her children; partner Pedro is an illegal threat.&rdquo;
                  </div>
                  <div className="space-y-2 text-slate-300 text-xs leading-relaxed">
                    <div className="font-semibold text-rose-300">How the Smear Was Manufactured:</div>
                    <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                      <li>
                        <strong>Exhuming Mother&apos;s Childhood Trauma:</strong> DCF pulled confidential records from when Mother was an abused child victim in the 1990s/2000s to label her &quot;high risk.&quot;
                      </li>
                      <li>
                        <strong>Exhuming Pedro&apos;s Childhood Trauma:</strong> DCF exhumed Pedro&apos;s 1990s childhood dependency records when he was an abused child.
                      </li>
                      <li>
                        <strong>Ignoring Adult Record:</strong> Blatantly disregarded that all four adult in-home investigations into Mother were closed with NO INDICATORS.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right: The 5 Uncontested Proofs */}
                <div className="p-4 bg-emerald-950/40 border border-emerald-900/60 rounded-xl space-y-3">
                  <div className="font-mono-legal font-bold text-emerald-300 uppercase text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Certified Affirmative Proofs &amp; Clean Record</span>
                  </div>
                  <div className="space-y-2.5 text-xs text-slate-200">
                    <div className="p-2.5 bg-slate-950 rounded border border-emerald-900/40 space-y-1">
                      <span className="font-bold text-emerald-300 block text-[11px]">1. 4/4 DCF ADULT CLEARANCES:</span>
                      <span className="text-[11px] text-slate-300">
                        Intakes #2016-1208, #2018-0213, #2018-1207, #2020-0124 were all investigated and CLOSED WITH NO INDICATORS.
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded border border-emerald-900/40 space-y-1">
                      <span className="font-bold text-emerald-300 block text-[11px]">2. LIBERTY UNIVERSITY 4.0 GPA:</span>
                      <span className="text-[11px] text-slate-300">
                        Maintains perfect 4.0 academic standing in Criminal Justice, pursuing legal career to support family.
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded border border-emerald-900/40 space-y-1">
                      <span className="font-bold text-emerald-300 block text-[11px]">3. PEDIATRIC SPECIAL NEEDS MANAGEMENT:</span>
                      <span className="text-[11px] text-slate-300">
                        Sole parent coordinating autism therapies for Kayleen and Hunter, and ophthalmological care for Emmalynn&apos;s legal blindness.
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded border border-emerald-900/40 space-y-1">
                      <span className="font-bold text-emerald-300 block text-[11px]">4. STATUTORY VICTIM CONFIDENTIALITY (FLA. STAT. § 39.0132):</span>
                      <span className="text-[11px] text-slate-300">
                        Florida law strictly protects child victims; penalizing an adult mother for childhood abuse violates substantive due process.
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded border border-emerald-900/40 space-y-1">
                      <span className="font-bold text-emerald-300 block text-[11px]">5. 0 ADULT CRIMINAL ARRESTS:</span>
                      <span className="text-[11px] text-slate-300">
                        Zero arrests, zero domestic violence charges in life. Eric Greene was the sole batterer (TRG-0013 &amp; TRG-0014).
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ORAL HEARING PROFFER SPEECH */}
          {activeTab === 'proffer-speech' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-legal text-amber-400 font-bold uppercase tracking-wider">
                  Scripted 3-Minute Bench Hearing Opening Proffer
                </span>
                <button
                  onClick={() =>
                    handleCopyText(
                      `May it please the Court. Petitioner Tiffany Greene appears today seeking an Emergency Injunction for Protection Against Stalking and Domestic Violence against Respondent Eric Joshua Greene.

This is not a routine post-separation disagreement. This is an escalating, multi-year campaign of interstate cyberstalking, intentional likeness exploitation, and direct physical threats—culminating on June 18, 2026, when Respondent sent a direct video into Petitioner's private inbox threatening to 'beat her ass'.

Respondent will attempt to paint Petitioner as an unfit mother and domestic abuser. Every certified government record in this 25-exhibit binder disproves that claim under FRE 902. In 12 years of marriage, Petitioner has never been arrested for any crime. By contrast, on April 11, 2019, Respondent Eric Greene was arrested by the Pasco County Sheriff for Domestic Battery after shoving Petitioner in front of their minor daughters (Exhibit TRG-0013).

On November 3, 2019, Respondent was arrested for Felony Aggravated Assault with a loaded 9mm handgun after choking Pedro Hernandez and screaming 'I am gonna kill you' (Exhibit TRG-0014). And 48 hours prior, on November 1, 2019, Eric admitted in writing that Petitioner walked away from his abuse and attempted to use their children as leverage (Exhibit TRG-0025).

Between 2016 and 2020, Florida DCF investigated Mother four separate times—and every single adult investigation closed with NO INDICATORS. In contrast, DCF sustained VERIFIED FINDINGS of domestic violence and threat of harm against Eric Greene. 

Desperate to manufacture grounds when zero adult neglect existed, DCF literally exhumed Pedro's childhood dependency records from the 1990s AND his 1991 elementary school records, and shockingly did the same to Mother—using her own childhood abuse records where SHE was a victim to attempt to classify her as a 'high risk parent'. Punishing a mother for being a victim of abuse as a child is an egregious violation of due process that proves opposing parties have zero legitimate evidence of adult parental inadequacy.

Moreover, the certified records from Pasco County Schools (Exhibit TRG-0026) prove Pedro was enrolled right here in Pasco County public schools continuously since kindergarten on April 12, 1991—attending Rodney B. Cox and Lacoochee Elementary. And on July 19, 2024, USCIS issued Form I-797 granting Pedro lawful Advance Parole.

Respondent has paid $0.00 in child support in seven years, pocketed $161,280 in marital equity, and fathered a child with Third Party Heaven Horton while still married.

We ask this Court to enter the proposed temporary injunction immediately to protect Petitioner, gag the minor children from social media exploitation, and preserve her safety.`,
                      'proffer-speech'
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded transition-colors"
                >
                  {copiedKey === 'proffer-speech' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'proffer-speech' ? 'Copied Speech' : 'Copy Speech Script'}</span>
                </button>
              </div>

              <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4 text-slate-200 font-serif-court text-sm sm:text-base leading-relaxed">
                <p>
                  &ldquo;May it please the Court. Petitioner Tiffany Greene appears today seeking an Emergency Injunction for Protection Against Stalking and Domestic Violence against Respondent Eric Joshua Greene.
                </p>
                <p>
                  This is not a routine post-separation disagreement. This is an escalating, multi-year campaign of interstate cyberstalking, intentional likeness exploitation, and direct physical threats—culminating on June 18, 2026, when Respondent sent a direct video into Petitioner&apos;s private inbox threatening to <em>&apos;beat her ass&apos;</em> (Exhibit TRG-0012).
                </p>
                <p>
                  Respondent will attempt to paint Petitioner as an unfit mother and domestic abuser. Every certified government record in this 26-exhibit binder disproves that claim under FRE 902. In 12 years of marriage, Petitioner has never been arrested for any crime. By contrast, on April 11, 2019, Respondent Eric Greene was arrested by the Pasco County Sheriff for Domestic Battery after shoving Petitioner in front of their minor daughters (Exhibit TRG-0013).
                </p>
                <p>
                  On November 3, 2019, Respondent was arrested for Felony Aggravated Assault with a loaded 9mm handgun after choking Pedro Hernandez and screaming <em>&apos;I am gonna kill you&apos;</em> (Exhibit TRG-0014). And 48 hours prior, on November 1, 2019, Eric admitted in writing that Petitioner walked away from his abuse and attempted to use their children as leverage (Exhibit TRG-0025).
                </p>
                <p>
                  Between 2016 and 2020, Florida DCF investigated Mother four separate times—and every single adult investigation closed with <strong>NO INDICATORS</strong>. In contrast, DCF sustained <strong>VERIFIED FINDINGS</strong> of domestic violence and threat of harm against Eric Greene.
                </p>
                <p>
                  Desperate to manufacture grounds when zero adult neglect existed, DCF literally exhumed Pedro&apos;s childhood dependency records from the 1990s AND his 1991 elementary school records, and shockingly did the same to Mother—using her own childhood abuse records where <em>she was a victim as a minor</em> to attempt to classify her as a &apos;high risk parent&apos;. Punishing a mother for being a victim of abuse as a child is an egregious violation of due process that proves opposing parties have zero legitimate evidence of adult parental inadequacy.
                </p>
                <p>
                  Moreover, the certified records from Pasco County Schools (Exhibit TRG-0026) prove Pedro Hernandez was enrolled right here in Pasco County public schools continuously since kindergarten on April 12, 1991—attending Rodney B. Cox and Lacoochee Elementary. And on July 19, 2024, USCIS issued Form I-797 granting Pedro lawful Advance Parole.
                </p>
                <p>
                  Respondent has paid $0.00 in child support in seven years, pocketed $161,280 in marital equity, and fathered a child with Third Party Heaven Horton while still married.
                </p>
                <p>
                  We ask this Court to enter the proposed temporary injunction immediately to protect Petitioner, gag the minor children from social media exploitation, and preserve her safety.&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
