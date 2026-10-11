import React, { useState } from 'react';
import { ForensicExhibit } from '../types/forensic';
import {
  Scale,
  Copy,
  Check,
  ShieldAlert,
  Flame,
  FileCheck2,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  UserCheck,
  UserX,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface CrossExaminationMatrixViewProps {
  exhibits: ForensicExhibit[];
  onSelectExhibit: (exhibit: ForensicExhibit) => void;
}

type WitnessType = 'eric' | 'dcf' | 'heaven' | 'stepmother';

interface BranchingQuestion {
  id: string;
  leadQuestion: string;
  exhibitCitations: string[];
  yesBranch: {
    witnessResponseSummary: string;
    followUpQuestion: string;
    tacticalPincer: string;
  };
  noBranch: {
    witnessResponseSummary: string;
    impeachmentAction: string;
    verbatimContradiction: string;
    tenderExhibitSpeech: string;
  };
}

interface WitnessProfile {
  id: WitnessType;
  name: string;
  role: string;
  vulnerabilitySummary: string;
  keyExhibits: string[];
  questions: BranchingQuestion[];
}

export const CrossExaminationMatrixView: React.FC<CrossExaminationMatrixViewProps> = ({
  exhibits,
  onSelectExhibit,
}) => {
  const [selectedWitness, setSelectedWitness] = useState<WitnessType>('eric');
  const [activeQuestionId, setActiveQuestionId] = useState<string>('eric-q1');
  const [expandedBranch, setExpandedBranch] = useState<'yes' | 'no' | null>('no');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const WITNESS_PROFILES: WitnessProfile[] = [
    {
      id: 'eric',
      name: 'Respondent Eric Joshua Greene ("hulk")',
      role: 'Opposing Party / Father',
      vulnerabilitySummary:
        'Confronted with certified criminal arrest dockets (TRG-0013 domestic battery, TRG-0014 loaded 9mm assault), contemporaneous written hostage confession (TRG-0025), $0.00 child support arrears across 7 years (TRG-0016), and $161,280.40 cash homestead liquidation (TRG-0023).',
      keyExhibits: ['TRG-0013', 'TRG-0014', 'TRG-0016', 'TRG-0023', 'TRG-0025', 'TRG-0012'],
      questions: [
        {
          id: 'eric-q1',
          leadQuestion:
            'Isn\'t it true that on November 1, 2019, you sent a message admitting that Mother walked away from you, and you told her she could only see her children if she returned home to you?',
          exhibitCitations: ['TRG-0025 (Nov 1, 2019 Confession)', 'Fla. Stat. § 61.13(3)(m)'],
          yesBranch: {
            witnessResponseSummary: 'Witness admits sending the November 1, 2019 message.',
            followUpQuestion:
              '“And when you conditioned Mother seeing her minor children on her returning to your marital bed, you were using the children as leverage to force her compliance, weren’t you?”',
            tacticalPincer:
              'Establishes coercive control and intentional parental gatekeeping under Fla. Stat. § 61.13(3)(a). Disproves abandonment defense.',
          },
          noBranch: {
            witnessResponseSummary: 'Witness denies or minimizes sending the message.',
            impeachmentAction:
              'IMPEACHMENT UNDER FLA. STAT. § 90.608 & FRE 801(d)(2) (Party Admission):',
            verbatimContradiction:
              'Hand witness Exhibit TRG-0025. “Directing your attention to Line 3 of Exhibit TRG-0025: Didn’t you write in your own words: ‘i let you walk away last night i wont do it again let me know i will come to you tonight and grab you... and you can be with your kids all of them baby girl please come home’?”',
            tenderExhibitSpeech:
              '“Your Honor, Petitioner moves for the admission of Exhibit TRG-0025 as a self-authenticating party admission under Florida Statutes § 90.803(18).”',
          },
        },
        {
          id: 'eric-q2',
          leadQuestion:
            'Isn\'t it true that exactly two days after Mother refused to return to you, you were arrested by the Pasco County Sheriff for choking Pedro Hernandez and pulling a loaded 9mm handgun on him?',
          exhibitCitations: ['TRG-0014 (Report #19-045997)', 'Fla. Stat. § 784.021'],
          yesBranch: {
            witnessResponseSummary: 'Witness admits to the armed assault altercation.',
            followUpQuestion:
              '“And during that violent encounter, you screamed ‘I am gonna kill you’ before retrieving that loaded High Point 9mm handgun, correct?”',
            tacticalPincer:
              'Establishes lethal violent propensity and objective reasonable fear of imminent harm under Fla. Stat. § 784.048 and § 741.30.',
          },
          noBranch: {
            witnessResponseSummary: 'Witness claims it was mutual combat or denies the gun.',
            impeachmentAction:
              'IMPEACHMENT WITH CERTIFIED SHERIFF ARREST AFFIDAVIT (TRG-0014):',
            verbatimContradiction:
              '“I show you Petitioner’s Exhibit TRG-0014, certified by the Pasco County Clerk under seal. Deputy Salto documented that your own father had to physically wrestle the loaded 9mm handgun out of your hands after you threatened to kill him. Isn’t that what is sworn to in this official police record?”',
            tenderExhibitSpeech:
              '“Your Honor, Petitioner offers Exhibit TRG-0014 into evidence as a certified public record under Florida Statutes § 90.902(1).”',
          },
        },
        {
          id: 'eric-q3',
          leadQuestion:
            'Isn\'t it true that in seven consecutive years, you have paid exactly zero dollars in court-ordered child support for your minor children?',
          exhibitCitations: ['TRG-0016 (FL DOR Case #2001507784)', 'Fla. Stat. § 61.13(3)(c)'],
          yesBranch: {
            witnessResponseSummary: 'Witness admits $0.00 support payments.',
            followUpQuestion:
              '“And yet, on August 19, 2022, you liquidated the Florida marital homestead and pocketed $161,280.40 in cash at the closing table without paying a single dollar toward your children’s medical care or food, correct?”',
            tacticalPincer:
              'Completely destroys claim of being the sole responsible provider under Florida Statutes § 61.13(3)(c).',
          },
          noBranch: {
            witnessResponseSummary: 'Witness claims he paid cash or supported children outside court.',
            impeachmentAction:
              'IMPEACHMENT WITH CERTIFIED FL DEPARTMENT OF REVENUE LEDGER (TRG-0016):',
            verbatimContradiction:
              '“Directing your attention to Exhibit TRG-0016 from the Florida Department of Revenue, Title IV-D: Official total payments credited: $0.00. Are you telling this Court that the official state child support enforcement agency is falsifying its official accounting?”',
            tenderExhibitSpeech:
              '“Your Honor, Petitioner offers Exhibit TRG-0016 as a self-authenticating official agency record under § 90.902(1).”',
          },
        },
        {
          id: 'eric-q4',
          leadQuestion:
            'Isn\'t it true that in 2013–2014, while stationed in New York, you were investigated, disciplined, and involuntarily separated from the United States Armed Forces for domestic violence involving the physical strangulation of Petitioner Tiffany Greene?',
          exhibitCitations: ['U.S. Military Service Record DD-214', 'Military Police Blotter', 'FRE 608/609', 'Fla. Stat. § 90.608'],
          yesBranch: {
            witnessResponseSummary: 'Witness admits military discipline or involuntary separation for strangling Petitioner.',
            followUpQuestion:
              '“And that domestic strangulation occurred at the very inception of your marriage, disproving your public broadcast claim that you were the passive victim for 12 years, correct?”',
            tacticalPincer:
              'Proves a 13-year continuous trajectory of life-threatening strangulation and firearm violence under Fla. Stat. § 61.13(3)(m), disproving social media victim narratives and mandating protective injunction.',
          },
          noBranch: {
            witnessResponseSummary: 'Witness denies being discharged for domestic strangulation or claims honorable transition.',
            impeachmentAction:
              'DEMAND FOR UNREDACTED DD-214 & MILITARY POLICE RECORDS (FLA. STAT. § 90.608):',
            verbatimContradiction:
              '“Mr. Greene, under penalty of perjury, did your military separation authority issue your discharge under honorable conditions, or was your service characterized following a command investigation into domestic battery and choking?”',
            tenderExhibitSpeech:
              '“Your Honor, Petitioner requests that this Court compel Respondent to produce his unredacted DD-214 Member-4 copy and Military Police incident reports, and moves for an adverse inference under Florida law for false testimony on the stand.”',
          },
        },
        {
          id: 'eric-q5',
          leadQuestion:
            'Isn\'t it true that Petitioner applied your minor daughter\'s Social Security disability benefits directly to the monthly mortgage to purchase the marital home from your parents, yet when that property sold on August 19, 2022, you pocketed $161,280.40 in net cash and paid zero dollars toward child support?',
          exhibitCitations: ['TRG-0023 (Meridian Title Closing Statement)', 'TRG-0016 (FL DOR IV-D Ledger)', 'Fla. Stat. § 61.11'],
          yesBranch: {
            witnessResponseSummary: 'Witness admits disability mortgage payments and keeping closing cash.',
            followUpQuestion:
              '“And you did not escrow or set aside a single dollar from that $161,280.40 for your daughter’s specialized medical care or court-ordered support, did you?”',
            tacticalPincer:
              'Conclusively establishes unjust enrichment, wrongful conversion of child disability equity, and mandates an immediate Constructive Trust and Asset Freeze under Florida Statutes § 61.11.',
          },
          noBranch: {
            witnessResponseSummary: 'Witness claims he paid the mortgage himself or received no net proceeds.',
            impeachmentAction:
              'CONFRONTATION WITH CERTIFIED MERIDIAN TITLE CLOSING STATEMENT (TRG-0023):',
            verbatimContradiction:
              '“Mr. Greene, directing your attention to Exhibit TRG-0023, Line 303: Cash to Seller Eric Joshua Greene: $161,280.40 paid via certified wire disbursement. And bank records show every monthly payment prior to separation came from Mother applying the disability check. Are you telling this Court that the title company’s certified disbursement statement is counterfeit?”',
            tenderExhibitSpeech:
              '“Your Honor, Petitioner moves to enter Exhibit TRG-0023 into evidence and requests an immediate ex parte order freezing the remaining proceeds in Respondent’s depository accounts.”',
          },
        },
      ],
    },
    {
      id: 'dcf',
      name: 'Florida DCF Case Worker / Child Welfare Investigator',
      role: 'Agency Witness',
      vulnerabilitySummary:
        'Must admit under oath that Mother has 4 consecutive adult in-home investigations closed with NO INDICATORS (2016–2020), and that the agency improperly exhumed confidential 1990s childhood victim records in violation of Fla. Stat. § 39.0132.',
      keyExhibits: ['TRG-0026', 'IR-001', 'IR-002', 'IR-003', 'IR-004'],
      questions: [
        {
          id: 'dcf-q1',
          leadQuestion:
            'Isn\'t it true that between 2016 and 2020, Florida DCF conducted four separate in-home investigations into Mother Tiffany Greene, and all four closed with NO INDICATORS of maltreatment?',
          exhibitCitations: ['Intakes #2016-1208, #2018-0213, #2018-1207, #2020-0124'],
          yesBranch: {
            witnessResponseSummary: 'Caseworker admits four consecutive clean closures.',
            followUpQuestion:
              '“And in none of those four investigations did your agency discover any evidence of physical abuse, substance abuse, or neglect committed by Mother against her children, correct?”',
            tacticalPincer:
              'Establishes unimpeachable adult parenting fitness on the official agency record under Florida Statutes § 61.13.',
          },
          noBranch: {
            witnessResponseSummary: 'Caseworker equivocates or claims "high risk" concerns.',
            impeachmentAction:
              'CONFRONTATION ON STATUTORY CLOSURE FINDINGS UNDER CHAPTER 39:',
            verbatimContradiction:
              '“Caseworker, under Florida Administrative Code and Chapter 39, ‘No Indicators’ is an official legal classification meaning the agency found zero credible evidence to support maltreatment. You are not testifying that DCF violated its own statutory standards in closing those cases, are you?”',
            tenderExhibitSpeech:
              '“Your Honor, Petitioner requests that this Court take judicial notice of the certified Department of Children and Families closure dispositions pursuant to Florida Statutes § 90.202.”',
          },
        },
        {
          id: 'dcf-q2',
          leadQuestion:
            'Isn\'t it true that when your agency sought removal in 2020, your report relied upon dependency records from the 1990s when Mother and Pedro Hernandez were minor children themselves?',
          exhibitCitations: ['TRG-0026 (Pasco School Records)', 'Fla. Stat. §§ 39.0132 & 39.202'],
          yesBranch: {
            witnessResponseSummary: 'Caseworker admits relying on childhood records.',
            followUpQuestion:
              '“And you are aware that Florida Statutes § 39.0132(3) strictly prohibits using confidential childhood victim records to prejudice an adult parent in subsequent proceedings, correct?”',
            tacticalPincer:
              'Direct proof of ultra vires administrative overreach and violation of Fourteenth Amendment Substantive Due Process.',
          },
          noBranch: {
            witnessResponseSummary: 'Caseworker denies relying on childhood records.',
            impeachmentAction:
              'CONFRONTATION WITH CERTIFIED TRANSCRIPT TRG-0026:',
            verbatimContradiction:
              '“Directing your attention to Exhibit TRG-0026: Pedro Hernandez has been continuously enrolled in Pasco County public schools since Kindergarten on April 12, 1991. The only records your agency could find connecting him to child protection were files from when he was an abused child in the 1990s. How did those 1991 records appear in your 2020 report?”',
            tenderExhibitSpeech:
              '“Your Honor, Petitioner moves to strike agency findings grounded in confidential childhood records pursuant to Fla. Stat. § 39.0132.”',
          },
        },
      ],
    },
    {
      id: 'heaven',
      name: 'Third-Party Heaven-Leigh Horton ("Goddess")',
      role: 'Respondent\'s Romantic Partner / Co-Conspirator',
      vulnerabilitySummary:
        'Confronted with written admissions engaging in systematic parental alienation telling minor children their biological mother is not their real mother (TRG-0006, TRG-0007), and coordinated cyberstalking broadcasts on TikTok (TRG-0008).',
      keyExhibits: ['TRG-0006', 'TRG-0007', 'TRG-0008'],
      questions: [
        {
          id: 'heaven-q1',
          leadQuestion:
            'Isn\'t it true that you sent messages admitting that you told the minor children that Petitioner Tiffany Greene is not their real mother?',
          exhibitCitations: ['TRG-0006 & TRG-0007 (Written Alienation Confession)'],
          yesBranch: {
            witnessResponseSummary: 'Witness admits telling children Mother is not real mother.',
            followUpQuestion:
              '“And you did that while residing in the home with Respondent Eric Greene, with his full knowledge and consent, did you not?”',
            tacticalPincer:
              'Direct evidence of egregious parental alienation under Fla. Stat. § 61.13(3)(a). Severely harms Respondent’s custodial standing.',
          },
          noBranch: {
            witnessResponseSummary: 'Witness denies making the statement to the children.',
            impeachmentAction:
              'IMPEACHMENT WITH CONTEMPORANEOUS WRITTEN CHAT (TRG-0007):',
            verbatimContradiction:
              '“I show you Petitioner’s Exhibit TRG-0007. In your own text message sent from your verified account, you wrote: ‘i told them she is not their real mom... eric knows about it’. That is your account, that is your phone number, and those are your words, correct?”',
            tenderExhibitSpeech:
              '“Your Honor, Petitioner tenders Exhibit TRG-0007 as a party-agent admission under Florida Statutes § 90.803(18).”',
          },
        },
        {
          id: 'heaven-q2',
          leadQuestion:
            'Isn\'t it true that for approximately six years, from the time the minor daughter was two years old until she turned eight, you coached and encouraged her to believe that YOU were her biological mother, and to call you "Mom"?',
          exhibitCitations: ['TRG-0006', 'TRG-0007', 'Fla. Stat. § 787.03', 'Stone v. Wall, 734 So. 2d 1038'],
          yesBranch: {
            witnessResponseSummary: 'Witness admits coaching minor child to believe she is biological mother.',
            followUpQuestion:
              '“And you did this knowing you have zero biological relation, zero adoption order, and zero legal parental rights over this child, did you not?”',
            tacticalPincer:
              'Establishes willful and malicious custodial interference under Stone v. Wall and intentional infliction of emotional distress (IIED), guaranteeing civil tort liability and family court sanctions.',
          },
          noBranch: {
            witnessResponseSummary: 'Witness denies coaching child or claims child called her Mom voluntarily.',
            impeachmentAction:
              'CONFRONTATION WITH TEXT ADMISSION (TRG-0007) & DIRECT RECORD PROOF:',
            verbatimContradiction:
              '“Ms. Horton, directing your attention to Exhibit TRG-0007: you explicitly boasted that the children didn’t know their mother because you told them she wasn’t their real mom. How could an eight-year-old child spontaneously forget who carried and birthed her unless you and Eric Greene actively deceived her?”',
            tenderExhibitSpeech:
              '“Your Honor, Petitioner requests that this witness’s denial be noted on the record for criminal referral under Florida Statutes § 787.03 and impeachment under § 90.608.”',
          },
        },
      ],
    },
    {
      id: 'stepmother',
      name: 'Paternal Stepmother / Grandparent Actors',
      role: 'Third-Party Instigators / Collusive Actors',
      vulnerabilitySummary:
        'Confronted with weaponizing a void 2014 New York temporary paper to mislead DCF, followed by filing a retaliatory false fraud report with the Social Security Administration against Mother—despite Mother being the parent who held her seizing 3-year-old daughter during an emergency spinal tap.',
      keyExhibits: ['TRG-0024 (Hospital Records)', 'Pasco School Records', 'SSA Representative Payee Logs'],
      questions: [
        {
          id: 'stepmother-q1',
          leadQuestion:
            'Isn\'t it true that in 2020, you brandished an expired 2014 New York temporary emergency paper to Florida DCF to falsely claim Mother was not legally allowed to have her children, even though Mother was actively living with and caring for them in Florida?',
          exhibitCitations: ['Pasco Public School Enrollments', 'Fla. Stat. § 61.516 (UCCJEA)'],
          yesBranch: {
            witnessResponseSummary: 'Witness admits using 2014 paper despite Mother caring for children.',
            followUpQuestion:
              '“And you knew that paper was executed six years earlier in New York following Eric’s military discharge and had zero legal force in Florida, did you not?”',
            tacticalPincer:
              'Proves deliberate fraud on administrative authorities and coordinated third-party bad faith under Florida Statutes § 61.13(3)(a).',
          },
          noBranch: {
            witnessResponseSummary: 'Witness claims the paper gave them permanent legal custody.',
            impeachmentAction:
              'CONFRONTATION WITH UCCJEA & OFFICIAL PASCO COUNTY SCHOOL RECORDS:',
            verbatimContradiction:
              '“If you possessed legal custody, why did the District School Board of Pasco County register Tiffany Greene as the primary custodial mother enrolling the children and authorizing all emergency medical contacts throughout those years?”',
            tenderExhibitSpeech:
              '“Your Honor, Petitioner requests that this witness’s testimony be stricken as legally frivolous under the UCCJEA, Fla. Stat. § 61.514.”',
          },
        },
        {
          id: 'stepmother-q2',
          leadQuestion:
            'Isn\'t it true that after misleading DCF, you called the Social Security Administration to report Mother for SSI fraud, knowing full well that Mother was the parent who rushed that child to emergency care and physically held her motionless through an emergency spinal tap while she suffered seizures at three years old?',
          exhibitCitations: ['TRG-0024 (Hospital Emergency / Neurology Records)', 'SSA Representative Payee Accounting'],
          yesBranch: {
            witnessResponseSummary: 'Witness admits reporting Mother to SSA despite Mother\'s frontline medical care.',
            followUpQuestion:
              '“And you did that to retaliate against Mother and cut off the funds she was using to pay the mortgage on the house you were selling to her, correct?”',
            tacticalPincer:
              'Exposes malicious administrative retaliation and financial abuse, cementing Mother’s moral and parental fitness under Florida Statutes § 61.13(3)(f) & (q).',
          },
          noBranch: {
            witnessResponseSummary: 'Witness denies reporting Mother or claims Mother stole benefits.',
            impeachmentAction:
              'IMPEACHMENT WITH VERIFIED HOSPITAL RECORDS & SSA CLEARANCE ACCOUNTING:',
            verbatimContradiction:
              '“Here are the pediatric neurology and hospital records: Tiffany Greene is documented at the bedside, signing consents, and holding the child during lumbar puncture while Eric and his family were nowhere to be found. How could you report a dedicated mother for fraud when she applied every dollar to that child’s home and health?”',
            tenderExhibitSpeech:
              '“Your Honor, Petitioner offers the certified hospital records under Florida Statutes § 90.803(6) as conclusive proof of maternal dedication and bad-faith witness malice.”',
          },
        },
      ],
    },
  ];

  const currentProfile = WITNESS_PROFILES.find((p) => p.id === selectedWitness) || WITNESS_PROFILES[0];
  const activeQuestion =
    currentProfile.questions.find((q) => q.id === activeQuestionId) || currentProfile.questions[0];

  const handleCopyBranch = (type: 'yes' | 'no') => {
    const branchText =
      type === 'yes'
        ? `WITNESS: ${currentProfile.name}
QUESTION: "${activeQuestion.leadQuestion}"
IF WITNESS ANSWERS "YES":
Follow-Up: ${activeQuestion.yesBranch.followUpQuestion}
Tactical Goal: ${activeQuestion.yesBranch.tacticalPincer}`
        : `WITNESS: ${currentProfile.name}
QUESTION: "${activeQuestion.leadQuestion}"
IF WITNESS ANSWERS "NO":
Impeachment Action: ${activeQuestion.noBranch.impeachmentAction}
Verbatim Contradiction: ${activeQuestion.noBranch.verbatimContradiction}
Tender Speech to Judge: ${activeQuestion.noBranch.tenderExhibitSpeech}`;

    navigator.clipboard.writeText(branchText);
    setCopiedId(`${activeQuestion.id}-${type}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider flex items-center gap-2">
            <span>Trial Binder · FRE 607 / Fla. Stat. § 90.608 Impeachment Branching</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>Witness Cross-Examination &amp; Impeachment Branching Cards</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Real-time leading questions tailored to each witness with dynamic <strong>&quot;If Witness Answers YES&quot;</strong> and <strong>&quot;If Witness Answers NO&quot;</strong> branching paths to trap and impeach on the stand.
          </p>
        </div>
      </div>

      {/* Witness Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
        {WITNESS_PROFILES.map((profile) => (
          <button
            key={profile.id}
            onClick={() => {
              setSelectedWitness(profile.id);
              setActiveQuestionId(profile.questions[0].id);
              setExpandedBranch('no');
            }}
            className={`p-3 rounded-lg text-left transition-colors flex items-start gap-3 ${
              selectedWitness === profile.id
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-md shrink-0 ${selectedWitness === profile.id ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
              {profile.id === 'eric' ? (
                <UserX className="w-4 h-4" />
              ) : profile.id === 'dcf' ? (
                <Scale className="w-4 h-4" />
              ) : profile.id === 'heaven' ? (
                <ShieldAlert className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
            </div>
            <div>
              <div className="text-xs font-serif-court font-bold leading-tight">
                {profile.name}
              </div>
              <div className={`text-[10px] font-mono-legal ${selectedWitness === profile.id ? 'text-slate-800' : 'text-slate-500'}`}>
                {profile.role} · {profile.questions.length} Question Sets
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Witness Strategic Profile */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-mono-legal font-bold text-amber-400 uppercase text-[11px]">
            Target Witness Vulnerabilities &amp; Key Records:
          </span>
          <div className="flex items-center gap-1.5">
            {currentProfile.keyExhibits.map((ex) => (
              <span key={ex} className="px-2 py-0.5 rounded text-[10px] font-mono-legal bg-slate-950 text-amber-300 border border-slate-800">
                {ex}
              </span>
            ))}
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed font-serif-court">
          {currentProfile.vulnerabilitySummary}
        </p>
      </div>

      {/* Question Selector & Active Question Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Questions List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[10px] font-mono-legal text-slate-400 uppercase tracking-wider block">
            Select Cross-Examination Path:
          </span>
          {currentProfile.questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setActiveQuestionId(q.id);
                setExpandedBranch('no');
              }}
              className={`w-full p-3 rounded-lg border text-left transition-colors space-y-1.5 ${
                activeQuestionId === q.id
                  ? 'bg-slate-900 border-amber-400 text-slate-100 shadow'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono-legal">
                <span className="text-amber-400 font-bold">Path #{idx + 1}</span>
                <span className="text-slate-500">2-Way Branch</span>
              </div>
              <p className="text-xs font-serif-court line-clamp-2 text-slate-200">
                {q.leadQuestion}
              </p>
            </button>
          ))}
        </div>

        {/* Right: Interactive Branching Execution Card (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5 shadow-lg">
          {/* Question Banner */}
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-legal font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Primary Leading Question for Witness:</span>
              </span>
              <div className="flex items-center gap-1 text-[11px] font-mono-legal text-slate-400">
                Citing: {activeQuestion.exhibitCitations.join(' · ')}
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-serif-court text-sm sm:text-base text-slate-100 font-semibold leading-relaxed">
              &ldquo;{activeQuestion.leadQuestion}&rdquo;
            </div>
          </div>

          {/* Branch Decision Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-legal text-slate-400 uppercase">
                Select Witness Response on Stand:
              </span>
              <span className="text-[10px] font-mono-legal text-emerald-400">
                Instant Courtroom Pivot
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => setExpandedBranch('yes')}
                className={`p-3 rounded-lg border font-bold flex items-center justify-center gap-2 transition-colors ${
                  expandedBranch === 'yes'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow'
                    : 'bg-slate-950 border-emerald-900/60 text-emerald-400 hover:bg-emerald-950/40'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>If Witness Answers &quot;YES&quot;</span>
              </button>

              <button
                onClick={() => setExpandedBranch('no')}
                className={`p-3 rounded-lg border font-bold flex items-center justify-center gap-2 transition-colors ${
                  expandedBranch === 'no'
                    ? 'bg-rose-500 text-white border-rose-400 shadow'
                    : 'bg-slate-950 border-rose-900/60 text-rose-400 hover:bg-rose-950/40'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>If Witness Answers &quot;NO&quot; (Impeach)</span>
              </button>
            </div>
          </div>

          {/* Expanded Branch Content */}
          {expandedBranch === 'yes' && (
            <div className="p-4 bg-emerald-950/20 border border-emerald-800/80 rounded-xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-2">
                <span className="text-xs font-mono-legal font-bold text-emerald-300 uppercase">
                  BRANCH A: WITNESS ADMITS FACT · ENTRAPMENT SEQUENCE
                </span>
                <button
                  onClick={() => handleCopyBranch('yes')}
                  className="flex items-center gap-1 text-[11px] font-mono-legal text-emerald-300 bg-emerald-900/40 hover:bg-emerald-900/70 px-2.5 py-1 rounded border border-emerald-700/60"
                >
                  {copiedId === `${activeQuestion.id}-yes` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Follow-Up</span>
                </button>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-emerald-400 font-mono-legal text-[11px] block font-bold">
                  Next Scripted Question to Lock in Admission:
                </span>
                <p className="font-serif-court text-sm text-slate-100 font-semibold p-3 bg-slate-950 rounded border border-emerald-900/60 leading-relaxed">
                  {activeQuestion.yesBranch.followUpQuestion}
                </p>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed">
                <strong>Tactical Benefit:</strong> {activeQuestion.yesBranch.tacticalPincer}
              </div>
            </div>
          )}

          {expandedBranch === 'no' && (
            <div className="p-4 bg-rose-950/20 border border-rose-800/80 rounded-xl space-y-3.5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-rose-900/60 pb-2">
                <span className="text-xs font-mono-legal font-bold text-rose-300 uppercase">
                  BRANCH B: WITNESS DENIES / EVADES · IMMEDIATE PERJURY TRAP
                </span>
                <button
                  onClick={() => handleCopyBranch('no')}
                  className="flex items-center gap-1 text-[11px] font-mono-legal text-rose-300 bg-rose-900/40 hover:bg-rose-900/70 px-2.5 py-1 rounded border border-rose-700/60"
                >
                  {copiedId === `${activeQuestion.id}-no` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Impeachment</span>
                </button>
              </div>

              <div className="text-xs text-rose-200 font-mono-legal font-bold">
                {activeQuestion.noBranch.impeachmentAction}
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-rose-400 font-mono-legal text-[11px] block font-bold">
                  1. Scripted Impeachment Confrontation (Read Aloud):
                </span>
                <p className="font-serif-court text-sm text-slate-100 font-semibold p-3 bg-slate-950 rounded border border-rose-900/60 leading-relaxed">
                  {activeQuestion.noBranch.verbatimContradiction}
                </p>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-amber-400 font-mono-legal text-[11px] block font-bold">
                  2. Motion to Tender Exhibit to Judge:
                </span>
                <p className="font-serif-court text-xs text-slate-200 p-2.5 bg-slate-950 rounded border border-slate-800 italic">
                  {activeQuestion.noBranch.tenderExhibitSpeech}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
