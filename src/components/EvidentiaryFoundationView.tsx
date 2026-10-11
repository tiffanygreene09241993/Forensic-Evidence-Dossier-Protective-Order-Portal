import React, { useState } from 'react';
import { ForensicExhibit, JurisdictionCode } from '../types/forensic';
import {
  Mic,
  ShieldAlert,
  ShieldCheck,
  Scale,
  Copy,
  Check,
  Search,
  BookOpen,
  FileCheck2,
  AlertTriangle,
  Flame,
  Layers,
  ChevronRight,
  HelpCircle,
  Volume2,
  BookmarkPlus,
  CheckCircle2,
} from 'lucide-react';

interface EvidentiaryFoundationViewProps {
  exhibits: ForensicExhibit[];
  onSelectExhibit: (exhibit: ForensicExhibit) => void;
  jurisdiction?: JurisdictionCode;
}

type SubTab = 'foundation' | 'objection-shield' | 'counter-objections' | 'proffer-preservation';

export const EvidentiaryFoundationView: React.FC<EvidentiaryFoundationViewProps> = ({
  exhibits,
  onSelectExhibit,
}) => {
  const [subTab, setSubTab] = useState<SubTab>('foundation');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>('all');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // ==============================================================
  // 1. LAYING FOUNDATION SCRIPTS
  // ==============================================================
  const FOUNDATION_SCRIPTS = [
    {
      id: 'found-public-records',
      category: 'Certified Public Records',
      title: 'Certified Police Affidavits, Court Dockets & Agency Orders',
      batesExamples: 'TRG-0013 (Battery), TRG-0014 (9mm Handgun), TRG-0016 (FL DOR), TRG-0004 (Answer)',
      statute: 'Fla. Stat. § 90.902(1)/(2) & FRE 902(1)/(2)',
      steps: [
        {
          speaker: 'Step 1: Marking',
          text: '“Your Honor, I ask that this document be marked as Petitioner’s Exhibit [Number] for identification.”',
        },
        {
          speaker: 'Step 2: Tender to Opposing Counsel',
          text: '“I am tendering a true copy of Exhibit [Number] to opposing counsel for inspection.”',
        },
        {
          speaker: 'Step 3: Stating Self-Authentication Under Seal',
          text: '“Your Honor, Exhibit [Number] is a certified public record bearing the official seal and stamp of [Agency Name, e.g. Pasco County Sheriff / Clerk of the Sixth Judicial Circuit]. Under Florida Statutes § 90.902(1) and (2), certified domestic public records under seal are self-authenticating as a matter of law, requiring no extrinsic testimony of authenticity.”',
        },
        {
          speaker: 'Step 4: Formal Move Into Evidence',
          text: '“Petitioner respectfully moves Petitioner’s Exhibit [Number] into evidence as a full trial exhibit.”',
        },
      ],
      profferTips:
        'If opposing counsel objects to hearsay within a police report: Clarify that the affidavit is offered to establish the official judicial criminal complaint and arrest, not for third-party hearsay statements.',
    },
    {
      id: 'found-school-records',
      category: 'Certified Public Records',
      title: 'Official Pasco County Schools Student Transcript (Pedro Hernandez)',
      batesExamples: 'TRG-0026 (Pasco County Schools Transcript & Permanent Record Card)',
      statute: 'Fla. Stat. § 90.902(1)/(2) & Fla. Stat. § 90.803(6)',
      steps: [
        {
          speaker: 'Step 1: Marking',
          text: '“Your Honor, I ask that this certified transcript from the District School Board of Pasco County be marked as Petitioner’s Exhibit 26 for identification.”',
        },
        {
          speaker: 'Step 2: Tender to Opposing Counsel',
          text: '“I am showing a copy to opposing counsel.”',
        },
        {
          speaker: 'Step 3: Stating Foundation & Continuous Residency',
          text: '“Your Honor, Exhibit 26 is an official certified student transcript and permanent record card from Pasco County Schools, Student ID #5100175707. It documents that Pedro Villanueva Hernandez entered kindergarten at Rodney B. Cox Elementary in Pasco County on April 12, 1991, and attended public schools continuously through high school in this exact county. Under Fla. Stat. § 90.902 and § 90.803(6), this certified government education record is self-authenticating and admissible.”',
        },
        {
          speaker: 'Step 4: Formal Move Into Evidence',
          text: '“Petitioner moves Exhibit 26 into evidence to conclusively rebut Respondent’s false claims that Pedro Hernandez was an unknown foreign fugitive.”',
        },
      ],
      profferTips:
        'Highlights 30-year continuous presence in Pasco County, Florida since age 5, proving that 2020 DCF allegations of "illegal status" were a pretextual smoke screen.',
    },
    {
      id: 'found-party-admissions',
      category: 'Opposing Party Admissions',
      title: 'Respondent Texts, DMs & Admitted Voice Messages',
      batesExamples: 'TRG-0001 (Cease Notice), TRG-0011 (Text), TRG-0025 (Nov 1 2019 Confession), TRG-0007 (Heaven Confession)',
      statute: 'Fla. Stat. § 90.803(18) & FRE 801(d)(2)',
      steps: [
        {
          speaker: 'Step 1: Personal Knowledge of Communication',
          text: '“Witness / Petitioner: Did you receive electronic communications from Respondent Eric Greene on [Date]?” “Yes.”',
        },
        {
          speaker: 'Step 2: Distinctive Characteristics & Phone Number',
          text: '“How do you recognize these messages as originating from Respondent?” “I have known Respondent for over twelve years. The messages originated from his personal phone number / verified account, addressed our minor children by name, discussed private marital homestead matters, and exhibited his distinctive phrasing.”',
        },
        {
          speaker: 'Step 3: Hash Authentication (§ 90.902(13)/(14))',
          text: '“Your Honor, this digital record was extracted directly from the native device and bears an unbroken cryptographic SHA-256 hash digest ensuring zero tampering or alteration since transmission.”',
        },
        {
          speaker: 'Step 4: Admission of Opposing Party Non-Hearsay',
          text: '“Under Florida Statutes § 90.803(18) and FRE 801(d)(2), statements made by an opposing party offered against him are non-hearsay admissions. Petitioner moves Exhibit [Number] into evidence.”',
        },
      ],
      profferTips:
        'Party admissions under Fla. Stat. § 90.803(18) do NOT require an exception to hearsay because they are by definition not hearsay when offered against the declarant.',
    },
    {
      id: 'found-social-media',
      category: 'Digital & Social Media Evidence',
      title: 'TikTok Videos, Photos & Public Slander Broadcasts',
      batesExamples: 'TRG-0002 (TikTok Post), TRG-0008 (Live Broadcast), TRG-0012 (Direct Menacing Video)',
      statute: 'Fla. Stat. § 90.901 & § 90.902(13)/(14)',
      steps: [
        {
          speaker: 'Step 1: Platform & Handle Identification',
          text: '“Your Honor, I ask to mark the certified digital capture of Respondent’s public broadcast from account @hulk1035 as Petitioner’s Exhibit [Number].”',
        },
        {
          speaker: 'Step 2: Proof of Distinctive Context',
          text: '“Witness: Does this video depict Respondent Eric Joshua Greene’s physical likeness, voice, and his residence at 16968 KY Route 122?” “Yes, it shows Respondent speaking directly to the camera.”',
        },
        {
          speaker: 'Step 3: Temporal Alignment with Cease Notice',
          text: '“Your Honor, this publication occurred on [Date], following Petitioner’s formal written cease-and-desist demand of January 14, 2026, establishing willful and malicious intent under Fla. Stat. § 784.048.”',
        },
        {
          speaker: 'Step 4: Move Into Evidence',
          text: '“Petitioner moves Exhibit [Number] into evidence to demonstrate Respondent’s active course of conduct and cyberstalking.”',
        },
      ],
      profferTips:
        'Point to the video’s exact time stamps and Respondent’s face/voice in the video. Direct visual evidence of the party speaking authenticates itself under § 90.901.',
    },
  ];

  // ==============================================================
  // 2. INSTANT OBJECTION QUICK-SHIELD
  // ==============================================================
  const BENCH_OBJECTIONS = [
    {
      id: 'obj-childhood-records',
      title: 'Confidentiality of Child Welfare Records (§ 39.0132)',
      triggerScenario: 'Opposing party or DCF mentions Mother’s or Pedro’s childhood DCF reports from the 1990s/2000s.',
      spokenObjection:
        '“Objection, Your Honor! Florida Statutes § 39.0132(3) and § 39.202. Opposing counsel is improperly referring to confidential childhood dependency files from over twenty years ago when Petitioner was an abused minor. These records are strictly confidential and inadmissible to prove adult parental fitness.”',
      statutoryCitation: 'Fla. Stat. § 39.0132(3), § 39.202 & 14th Amendment Due Process',
      ifOpponentArgues: 'Opponent: “It shows the family history and risk factors.”',
      counterAttack:
        '“Your Honor, punishing a fit adult mother based on childhood abuse she suffered as a minor violates substantive Due Process and the express confidentiality mandates of Chapter 39. The only relevant inquiry is Petitioner’s adult record, which consists of four consecutive closed DCF investigations with NO INDICATORS.”',
    },
    {
      id: 'obj-improper-character',
      title: 'Improper Character Evidence / Propensity (§ 90.404)',
      triggerScenario: 'Opponent attempts to bring up ancient rumors, alleged bad character, or uncharged past acts.',
      spokenObjection:
        '“Objection, Your Honor. Florida Statutes § 90.404(1). Opposing counsel is eliciting improper character evidence to prove bad character or propensity. Evidence of character is strictly inadmissible to prove action in conformity therewith.”',
      statutoryCitation: 'Fla. Stat. § 90.404(1) & § 90.403',
      ifOpponentArgues: 'Opponent: “This goes to credibility and fitness.”',
      counterAttack:
        '“Your Honor, specific instances of conduct cannot be used to impeach character under § 90.609, and unadjudicated allegations are strictly excluded. Any marginal relevance is substantially outweighed by unfair prejudice under § 90.403.”',
    },
    {
      id: 'obj-hearsay',
      title: 'Hearsay (§ 90.801 / § 90.802)',
      triggerScenario: 'Witness testifies to what someone else told them (e.g. “Heaven said”, “The kids’ grandmother told me”).',
      spokenObjection:
        '“Objection, Your Honor. Hearsay under Florida Statutes § 90.802. The witness is testifying to an out-of-court statement offered for the truth of the matter asserted, with no applicable exception.”',
      statutoryCitation: 'Fla. Stat. § 90.801 & § 90.802',
      ifOpponentArgues: 'Opponent: “It explains why my client took action.”',
      counterAttack:
        '“Your Honor, if it is not offered for the truth, Petitioner requests an explicit limiting instruction that the statement cannot be considered for its factual truth, and that it has zero probative value on custody or protective injunction grounds.”',
    },
    {
      id: 'obj-speculation',
      title: 'Speculation / Lack of Personal Knowledge (§ 90.604)',
      triggerScenario: 'Respondent guesses what Petitioner was thinking or asserts facts without firsthand observation.',
      spokenObjection:
        '“Objection, Your Honor. Lack of personal knowledge under Florida Statutes § 90.604, and the question calls for pure speculation and conjecture.”',
      statutoryCitation: 'Fla. Stat. § 90.604 & § 90.701',
      ifOpponentArgues: 'Opponent: “The witness is drawing a reasonable inference.”',
      counterAttack:
        '“Your Honor, lay witnesses may only testify to facts personally perceived. Speculating about Petitioner’s mental state or actions taken outside the witness’s presence is incompetent testimony.”',
    },
    {
      id: 'obj-best-evidence',
      title: 'Best Evidence Rule (§ 90.952)',
      triggerScenario: 'Opponent tries to testify about what a text, letter, or court order says without producing the document.',
      spokenObjection:
        '“Objection, Your Honor. Best Evidence Rule under Florida Statutes § 90.952. The witness is testifying to the contents of a written instrument or electronic communication without introducing the writing itself into evidence.”',
      statutoryCitation: 'Fla. Stat. § 90.952',
      ifOpponentArgues: 'Opponent: “The witness remembers what the message said.”',
      counterAttack:
        '“Your Honor, under § 90.952, to prove the contents of a writing or recording, the original or a certified duplicate is required. Oral testimony regarding the terms of a document is legally barred.”',
    },
    {
      id: 'obj-relevance-prejudice',
      title: 'Unfair Prejudice Outweighs Probative Value (§ 90.403)',
      triggerScenario: 'Opponent introduces irrelevant sensational accusations designed solely to inflame.',
      spokenObjection:
        '“Objection, Your Honor. Florida Statutes § 90.403. This line of questioning is irrelevant, and any conceivable probative value is substantially outweighed by the danger of unfair prejudice, confusion of issues, and waste of court time.”',
      statutoryCitation: 'Fla. Stat. § 90.401, § 90.402 & § 90.403',
      ifOpponentArgues: 'Opponent: “Everything between the parents is relevant.”',
      counterAttack:
        '“Your Honor, this proceeding is governed by the specific statutory elements of Fla. Stat. § 784.048 for stalking and § 61.13 for child safety. Scurrilous personal attacks that do not bear on immediate safety or statutory factors must be excluded.”',
    },
  ];

  // ==============================================================
  // 3. COUNTERING OPPOSING OBJECTIONS
  // ==============================================================
  const DEFENSE_COUNTERS = [
    {
      opponentObjection: '“Objection! Hearsay on Respondent’s text messages and TikTok videos!”',
      petitionerCounter:
        '“Your Honor, this is NOT hearsay. Under Florida Statutes § 90.803(18) and Federal Rule of Evidence 801(d)(2), these are admissions of an opposing party offered against him. Statements made by the adverse party are non-hearsay and admissible as substantive evidence.”',
      statute: 'Fla. Stat. § 90.803(18) / FRE 801(d)(2)',
    },
    {
      opponentObjection: '“Objection! Lack of foundation on electronic screenshots!”',
      petitionerCounter:
        '“Your Honor, under Florida Statutes § 90.901 and § 90.902(13), authentication is satisfied by evidence sufficient to support a finding that the matter in question is what its proponent claims. Here, Petitioner has testified to personal receipt, distinctive phone numbers, dates, times, and an unbroken cryptographic SHA-256 hash digest verifying that the file has remained unaltered.”',
      statute: 'Fla. Stat. § 90.901 & § 90.902(13)/(14)',
    },
    {
      opponentObjection: '“Objection! Police reports are inadmissible hearsay!”',
      petitionerCounter:
        '“Your Honor, Petitioner is not offering narrative hearsay from third parties. We are offering the official Complaint Affidavit under seal pursuant to Florida Statutes § 90.902(1) as a self-authenticating public record, to establish the official judicial charging document and the fact of Respondent’s arrest for Domestic Battery and Aggravated Assault with a Deadly Weapon.”',
      statute: 'Fla. Stat. § 90.902(1) / Public Records Exception § 90.803(8)',
    },
    {
      opponentObjection: '“Objection! The 2019 domestic battery and gun assault are too old / irrelevant!”',
      petitionerCounter:
        '“Your Honor, under Florida Statutes § 90.404(2) (the Williams Rule) and domestic violence injunction jurisprudence, prior acts of domestic battery and firearm violence against these exact same victims are directly admissible to prove Respondent’s intent, motive, and the reasonableness of Petitioner’s well-founded fear of imminent harm.”',
      statute: 'Fla. Stat. § 90.404(2) & Fla. Stat. § 784.046',
    },
  ];

  // Filtered lists
  const filteredFoundation = FOUNDATION_SCRIPTS.filter((f) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      q === '' ||
      f.title.toLowerCase().includes(q) ||
      f.statute.toLowerCase().includes(q) ||
      f.batesExamples.toLowerCase().includes(q);
    const matchesCat = selectedDocCategory === 'all' || f.category === selectedDocCategory;
    return matchesSearch && matchesCat;
  });

  const filteredObjections = BENCH_OBJECTIONS.filter((o) => {
    const q = searchTerm.toLowerCase();
    return (
      q === '' ||
      o.title.toLowerCase().includes(q) ||
      o.spokenObjection.toLowerCase().includes(q) ||
      o.triggerScenario.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider flex items-center gap-2">
            <span>Trial Counsel Tool · Bench Hearing Companion</span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">Florida Evidence Code (Ch. 90) &amp; FRE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1 flex items-center gap-2">
            <Mic className="w-5 h-5 text-amber-400" />
            <span>Courtroom Foundation &amp; Objection Shield</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Verbatim spoken scripts for laying evidentiary foundation, raising immediate bench objections, defeating opposing counsel challenges, and preserving errors on the record for appeal.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs self-start md:self-auto overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSubTab('foundation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              subTab === 'foundation'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Laying Foundation</span>
          </button>
          <button
            onClick={() => setSubTab('objection-shield')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              subTab === 'objection-shield'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Objection Quick-Shield</span>
          </button>
          <button
            onClick={() => setSubTab('counter-objections')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              subTab === 'counter-objections'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Defending Evidence</span>
          </button>
          <button
            onClick={() => setSubTab('proffer-preservation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              subTab === 'proffer-preservation'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span>Offer of Proof (Proffer)</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: LAYING FOUNDATION SCRIPTS                           */}
      {/* ============================================================== */}
      {subTab === 'foundation' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold font-mono-legal text-xs text-amber-400 uppercase tracking-wide">
              <Scale className="w-4 h-4" />
              <span>Step-by-Step Spoken Scripts: How to Admit Exhibits Into Evidence</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In Florida courts, physical and digital documents cannot be considered by the judge until formally admitted into evidence. Follow these four mandatory steps for each exhibit category.
            </p>
          </div>

          <div className="space-y-5">
            {filteredFoundation.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono-legal text-emerald-400 uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-slate-100 font-serif-court text-base mt-0.5">
                      {item.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono-legal">
                      Exhibits: {item.batesExamples}
                    </span>
                  </div>

                  <span className="text-xs font-mono-legal text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 self-start sm:self-auto">
                    {item.statute}
                  </span>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  {item.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono-legal font-bold text-amber-400 text-[11px] uppercase">
                          {step.speaker}
                        </span>
                        <button
                          onClick={() => handleCopy(step.text, `${item.id}-step-${idx}`)}
                          className="flex items-center gap-1 text-[10px] font-mono-legal text-slate-400 hover:text-amber-300 transition-colors"
                        >
                          {copiedKey === `${item.id}-step-${idx}` ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>
                            {copiedKey === `${item.id}-step-${idx}` ? 'Copied' : 'Copy'}
                          </span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 font-serif-court italic leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Bench Tactical Tip:</strong> {item.profferTips}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: INSTANT OBJECTION QUICK-SHIELD                      */}
      {/* ============================================================== */}
      {subTab === 'objection-shield' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold font-mono-legal text-xs text-rose-400 uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Instant Bench Objections: Recite Verbatim When Opponent Speaks</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When opposing counsel or Respondent attempts improper testimony, stand up immediately and speak the exact bolded objection. If you do not object, the error is waived for appeal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredObjections.map((obj) => (
              <div
                key={obj.id}
                className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3.5 shadow hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5">
                    <div>
                      <span className="text-[10px] font-mono-legal text-rose-400 font-bold uppercase tracking-wider block">
                        BENCH OBJECTION
                      </span>
                      <h3 className="font-bold text-slate-100 font-serif-court text-base">
                        {obj.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono-legal text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {obj.statutoryCitation}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 space-y-0.5">
                    <strong className="text-slate-300 font-mono-legal text-[11px] block">
                      TRIGGER SITUATION:
                    </strong>
                    <p className="text-slate-300 text-xs leading-relaxed">{obj.triggerScenario}</p>
                  </div>

                  {/* Spoken Objection */}
                  <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-900/60 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold font-mono-legal text-rose-300 text-[11px] flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>SPEAK THIS EXACT PHRASE TO JUDGE:</span>
                      </span>
                      <button
                        onClick={() => handleCopy(obj.spokenObjection, `${obj.id}-speech`)}
                        className="text-[10px] font-mono-legal text-rose-300 hover:text-white flex items-center gap-1"
                      >
                        {copiedKey === `${obj.id}-speech` ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedKey === `${obj.id}-speech` ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-rose-100 font-serif-court font-semibold leading-relaxed">
                      {obj.spokenObjection}
                    </p>
                  </div>

                  {/* Counter Attack */}
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-xs">
                    <span className="text-[10px] font-mono-legal text-amber-400 font-bold block">
                      IF OPPONENT ARGUES: {obj.ifOpponentArgues}
                    </span>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      <strong>Rebuttal:</strong> {obj.counterAttack}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 3: COUNTERING OPPOSING OBJECTIONS                      */}
      {/* ============================================================== */}
      {subTab === 'counter-objections' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold font-mono-legal text-xs text-emerald-400 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Defending Petitioner’s Evidence: How to Defeat Opponent’s Objections</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When opposing counsel tries to block your evidence by claiming hearsay, lack of foundation, or irrelevance, recite these exact legal rebuttals to ensure your exhibits are admitted.
            </p>
          </div>

          <div className="space-y-4">
            {DEFENSE_COUNTERS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 shadow"
              >
                <div className="p-3 bg-rose-950/30 rounded-lg border border-rose-900/40 text-xs text-rose-200">
                  <span className="font-mono-legal font-bold text-rose-400 text-[10px] uppercase block">
                    OPPOSING COUNSEL’S OBJECTION:
                  </span>
                  <span className="font-serif-court text-sm italic font-semibold">
                    {item.opponentObjection}
                  </span>
                </div>

                <div className="p-4 bg-emerald-950/30 rounded-lg border border-emerald-900/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-legal font-bold text-emerald-300 text-[11px] uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>YOUR WINNING COUNTER-RESPONSE:</span>
                    </span>
                    <button
                      onClick={() => handleCopy(item.petitionerCounter, `def-counter-${idx}`)}
                      className="text-[10px] font-mono-legal text-emerald-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedKey === `def-counter-${idx}` ? (
                        <Check className="w-3 h-3 text-emerald-300" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedKey === `def-counter-${idx}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 font-serif-court leading-relaxed">
                    {item.petitionerCounter}
                  </p>
                  <div className="text-[10px] font-mono-legal text-emerald-400/80 pt-1">
                    Governing Law: {item.statute}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 4: OFFER OF PROOF & RECORD PRESERVATION                */}
      {/* ============================================================== */}
      {subTab === 'proffer-preservation' && (
        <div className="space-y-6">
          <div className="p-4 bg-purple-950/40 border border-purple-800/60 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold font-mono-legal text-xs text-purple-300 uppercase tracking-wide">
              <BookmarkPlus className="w-4 h-4 text-purple-400" />
              <span>Record Preservation: How to Make an &quot;Offer of Proof&quot; (Proffer)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              If the judge sustains an objection and refuses to allow your witness to answer or excludes an exhibit, you MUST make an Offer of Proof under <strong>Fla. Stat. § 90.104(1)(b)</strong>. Without an Offer of Proof, the appellate court cannot review the exclusion, and the issue is lost forever.
            </p>
          </div>

          <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-amber-400 font-serif-court text-base">
                Verbatim Script for Making an Offer of Proof (Proffer)
              </h3>
              <button
                onClick={() =>
                  handleCopy(
                    `Your Honor, in light of the Court's ruling sustaining the objection, Petitioner respectfully requests leave of Court to make a brief Offer of Proof pursuant to Florida Statutes § 90.104(1)(b) to preserve the record for appellate review.

For the record: If permitted to testify and introduce this exhibit, the evidence would establish [state what the document shows, e.g., that Pedro Hernandez was enrolled in Pasco County Schools continuously since April 12, 1991, under Student ID #5100175707].

This evidence is directly relevant to rebut Respondent's claim that Pedro was an unknown foreign fugitive and to establish that Florida DCF's child removal in 2020 was founded upon pretextual administrative overreach.

Petitioner respectfully requests that this excluded exhibit be marked as Petitioner's Proffer Exhibit [Number] and placed into the official court file for appellate preservation.`,
                    'proffer-full-script'
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded transition-colors shadow"
              >
                {copiedKey === 'proffer-full-script' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copiedKey === 'proffer-full-script' ? 'Copied Proffer' : 'Copy Full Proffer Script'}
                </span>
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-200 font-serif-court leading-relaxed pl-2 sm:pl-4 border-l-2 border-amber-500/40">
              <p>
                <strong>Step 1 (Ask for leave):</strong>
                <br />
                &ldquo;Your Honor, in light of the Court&apos;s ruling sustaining the objection, Petitioner respectfully requests leave of Court to make a brief Offer of Proof pursuant to Florida Statutes § 90.104(1)(b) to preserve the record for appellate review.&rdquo;
              </p>

              <p>
                <strong>Step 2 (State the substance):</strong>
                <br />
                &ldquo;For the record: If permitted to testify and introduce this exhibit, the evidence would establish [State specifically what the witness would say or what the document proves].&rdquo;
              </p>

              <p>
                <strong>Step 3 (State the relevance):</strong>
                <br />
                &ldquo;This evidence is directly relevant under Florida law to prove [State the statutory factor, e.g., course of conduct under Fla. Stat. § 784.048, or bad-faith pretext in child removal under Chapter 39].&rdquo;
              </p>

              <p>
                <strong>Step 4 (Tender for appellate record):</strong>
                <br />
                &ldquo;Petitioner respectfully requests that this excluded exhibit be marked as Petitioner&apos;s Proffer Exhibit [Number] and placed in the official court file so that the record is complete for review.&rdquo;
              </p>
            </div>

            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <span className="text-[10px] font-mono-legal text-emerald-400 font-bold block uppercase">
                WHY THIS PROTECTS YOU:
              </span>
              <p className="leading-relaxed">
                Under Florida law (e.g., <em>Finney v. State</em>, 660 So. 2d 674), an appellate court will decline to review an excluded question or document unless counsel or the pro se party made a proffer of what the testimony or exhibit would have shown. By making this 30-second statement, you guarantee your appellate rights remain intact.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
