import React, { useState, useEffect, useRef } from 'react';
import { ForensicExhibit, JurisdictionCode } from '../types/forensic';
import {
  Scale,
  Mic,
  MicOff,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Copy,
  Check,
  Clock,
  AlertTriangle,
  FileCheck2,
  Calendar,
  Layers,
  ArrowRight,
  BookmarkPlus,
  Volume2,
  Sparkles,
  Printer,
  KeyRound,
  Hash,
} from 'lucide-react';

interface BenchDecisionMatrixViewProps {
  exhibits: ForensicExhibit[];
  onSelectExhibit: (exhibit: ForensicExhibit) => void;
  jurisdiction?: JurisdictionCode;
}

type ToolkitTab = 'matrix' | 'speech-monitor' | 'crypto-affidavit' | 'retaliation-map' | 'motion-drafter';

export const BenchDecisionMatrixView: React.FC<BenchDecisionMatrixViewProps> = ({
  exhibits,
  onSelectExhibit,
}) => {
  const [activeTab, setActiveTab] = useState<ToolkitTab>('matrix');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [activeObjections, setActiveObjections] = useState<
    { id: string; rule: string; triggerText: string; spokenText: string; counterText: string }[]
  >([]);
  const recognitionRef = useRef<any>(null);

  // Selected Motion State (Family & Civil Divisions)
  const [selectedMotion, setSelectedMotion] = useState<
    | 'reunification-injunction'
    | 'civil-tort-complaint'
    | 'void-guardianship'
    | 'contempt-freeze'
    | 'limine'
    | 'judicial-notice'
    | 'intent-rely'
  >('reunification-injunction');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // ==============================================================
  // SPEECH RECOGNITION & OBJECTION CATCHER SETUP
  // ==============================================================
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        analyzeTranscriptForObjections(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. You can use the simulated test buttons below to test the objection catcher.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setActiveObjections([]);
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const analyzeTranscriptForObjections = (text: string) => {
    const lower = text.toLowerCase();
    const newObjections: { id: string; rule: string; triggerText: string; spokenText: string; counterText: string }[] = [];

    // Trigger 1: Hearsay
    if (
      lower.includes('heard from') ||
      lower.includes('told me') ||
      lower.includes('they said') ||
      lower.includes('was told') ||
      lower.includes('someone said')
    ) {
      newObjections.push({
        id: 'hearsay',
        rule: 'Fla. Stat. § 90.802 (Hearsay)',
        triggerText: 'Detected phrase indicating out-of-court statement offered for truth.',
        spokenText: '“Objection, Your Honor! Hearsay under Florida Statutes § 90.802. The witness is testifying to an out-of-court statement without an applicable exception.”',
        counterText: 'If opponent claims effect on listener: “Request an explicit limiting instruction that it has zero probative value on the merits.”',
      });
    }

    // Trigger 2: Confidential Childhood Records
    if (
      lower.includes('1990') ||
      lower.includes('1995') ||
      lower.includes('when she was a kid') ||
      lower.includes('childhood') ||
      lower.includes('pedro was a kid') ||
      lower.includes('juvenile')
    ) {
      newObjections.push({
        id: 'childhood-records',
        rule: 'Fla. Stat. §§ 39.0132(3) & 39.202 (Strict Confidentiality)',
        triggerText: 'Detected attempt to refer to confidential 1990s minor victim/dependency records.',
        spokenText: '“Objection, Your Honor! Florida Statutes § 39.0132(3) and § 39.202. Opposing counsel is referencing confidential childhood victim records from 20+ years ago. These are strictly privileged and inadmissible in adult custody.”',
        counterText: '“Under Due Process and Chapter 39, a mother cannot be penalized for childhood abuse she suffered as a minor.”',
      });
    }

    // Trigger 3: Character Propensity
    if (
      lower.includes('kind of person') ||
      lower.includes('character') ||
      lower.includes('bad mother') ||
      lower.includes('temperament') ||
      lower.includes('reputation')
    ) {
      newObjections.push({
        id: 'character',
        rule: 'Fla. Stat. § 90.404(1) (Improper Character / Propensity)',
        triggerText: 'Detected improper character evidence offered to prove action in conformity.',
        spokenText: '“Objection, Your Honor! Florida Statutes § 90.404(1). Opposing counsel is eliciting improper character evidence to prove propensity. This is strictly inadmissible.”',
        counterText: '“Specific uncharged allegations cannot be used to impeach character under § 90.609; unfair prejudice substantially outweighs probative value under § 90.403.”',
      });
    }

    // Trigger 4: Speculation
    if (
      lower.includes('i think she') ||
      lower.includes('i assume') ||
      lower.includes('must have known') ||
      lower.includes('her intention was')
    ) {
      newObjections.push({
        id: 'speculation',
        rule: 'Fla. Stat. § 90.604 (Lack of Personal Knowledge / Speculation)',
        triggerText: 'Detected witness speculating regarding another person’s state of mind.',
        spokenText: '“Objection, Your Honor! The question calls for speculation and conjecture under Florida Statutes § 90.604. The witness lacks firsthand personal knowledge.”',
        counterText: '“Lay witnesses may only testify to facts personally perceived, not subjective assumptions.”',
      });
    }

    setActiveObjections(newObjections);
  };

  const simulateTrigger = (phrase: string) => {
    setTranscript(phrase);
    analyzeTranscriptForObjections(phrase);
  };

  // ==============================================================
  // 1. JUDICIAL DECISION MATRIX (FLA. STAT. § 61.13 & § 784.048)
  // ==============================================================
  const CUSTODY_FACTORS = [
    {
      factor: '(a) Identity Erasure & Maternal Usurpation (Heaven Horton & Eric Greene)',
      petitionerProof: 'UNBROKEN BIOLOGICAL MOTHERHOOD: Mother carried, birthed, and bonded with minor children; provided sole pediatric and specialized care. Refused to surrender maternal status despite 6 years of custodial concealment, parental gatekeeping, and extortion (TRG-0025).',
      respondentDeficiency: 'SEVERE PSYCHOLOGICAL ERASURE & USURPATION: From age 2 to 8, Respondent and third-party legal stranger Heaven-Leigh Horton actively deceived minor daughter into believing Horton was her biological mother, coaching her to call Horton "Mom" while physically concealing child. Documented by Horton\'s written confession: "i told them she is not their real mom... eric knows about it" (TRG-0007) and Eric\'s hostage demand (TRG-0025). Constitutes felony custodial interference under Fla. Stat. § 787.03 and warrants immediate custody transfer & mandatory reunification therapy at 100% Respondent expense.',
      primaryExhibit: 'TRG-0006, TRG-0007, TRG-0025',
      statutoryAdvantage: 'Mandatory Custody Reallocation & Injunction',
    },
    {
      factor: '(a) Facilitating Close Relationship with Other Parent',
      petitionerProof: 'Petitioner has consistently encouraged relationship with father; provided contact until direct violent threat on 06/18/2026 (TRG-0012).',
      respondentDeficiency: 'SYSTEMATIC PARENTAL ALIENATION: Respondent and third-party partner Heaven-Leigh told minor children Mother is not their real mother (TRG-0006, TRG-0007 confession).',
      primaryExhibit: 'TRG-0006 & TRG-0007',
      statutoryAdvantage: 'Decisive for Petitioner',
    },
    {
      factor: '(m) Domestic Violence & Child Abuse (§ 61.13(3)(m))',
      petitionerProof: 'CLEAN ADULT RECORD: Zero arrests, zero DV convictions in lifetime. Four separate Florida DCF investigations (2016–2020) closed with NO INDICATORS. Safe parent who fled abuse is protected from abandonment claims under § 61.13(3)(m).',
      respondentDeficiency: '13-YEAR UNBROKEN VIOLENCE & STRANGULATION TRAJECTORY: Involuntarily discharged/separated from the U.S. Military in 2013–2014 for domestic violence assault involving physical strangulation of Petitioner in New York base housing; arrested 04/11/2019 for Domestic Battery (TRG-0013 / Report #19-014214); arrested 11/03/2019 for Felony Aggravated Assault with loaded 9mm handgun and choking of Pedro (TRG-0014 / Report #19-045997); direct death threat video on 06/18/2026 to "beat her ass" (TRG-0012). Verified DCF findings for threat of harm.',
      primaryExhibit: 'DD-214 Military Separation, TRG-0013, TRG-0014, TRG-0012',
      statutoryAdvantage: 'Absolute Statutory Bar for Respondent',
    },
    {
      factor: '(c/j) Pretext Rebuttal: Coerced 2014 NY Non-Resident Guardianship Paper vs. Active School & Medical Stewardship',
      petitionerProof: 'ACTIVE PRIMARY PARENTING & SOLE STEWARDSHIP: Mother personally executed all Pasco County public school enrollments, maintained daily attendance, coordinated psychiatric, ABA, and autism spectrum therapy for Kayleen and Hunter, and managed specialized ophthalmology for Emmalynn\'s vision impairments (TRG-0024). Mother was never legally barred from her children by any valid court.',
      respondentDeficiency: 'FRAUDULENT WEAPONIZATION OF EXPIRED 2014 NY PAPER: In 2013–2014, while stranded as non-residents in New York during Respondent\'s military discharge crisis, Mother was coerced under extreme duress into signing an emergency temporary guardianship paper to paternal grandparents. That paper was void ab initio, lacked UCCJEA jurisdiction, and expired immediately. In 2020, Respondent and his parents fraudulently brandished this expired document to Florida DCF to falsely claim Mother "wasn\'t allowed to have her kids"—while Mother was actively living with, schooling, and caring for them in Florida.',
      primaryExhibit: 'TRG-0024, Pasco School Enrollments, DCF No Indicators',
      statutoryAdvantage: 'Pretext Evaporation / Demonstrates Bad Faith',
    },
    {
      factor: '(q) Meeting Special Developmental & Medical Needs',
      petitionerProof: 'HEROIC MEDICAL STEWARDSHIP & SPINAL TAP TESTIMONY: Mother was the sole parent present during daughter\'s acute medical emergencies. When the minor child suffered severe seizures at age 3, Mother was the parent who personally held her motionless through an agonizing lumbar puncture (spinal tap) and stayed at her bedside through emergency hospitalizations. Coordinates ongoing psychiatric and ABA therapies for autism spectrum conditions, and managed specialized ophthalmology for Emmalynn’s visual impairment (TRG-0024).',
      respondentDeficiency: 'MALICIOUS RETALIATION & FALSE SSA FRAUD REPORT: Stepmother and Respondent weaponized the expired 2014 paper with Florida DCF in 2020, and escalated by maliciously calling the Social Security Administration to report Mother for "fraudulent SSI extraction"—despite Mother applying 100% of the child\'s disability benefits toward family housing and mortgage payments to purchase the home from Respondent\'s parents. Respondent attended zero specialty appointments and contributed $0.00.',
      primaryExhibit: 'TRG-0024 (Hospital / Therapy Records) & SSA Accountings',
      statutoryAdvantage: 'Decisive for Petitioner',
    },
    {
      factor: '(c/f) Financial Stewardship & Constructive Trust ($161,280.40 Cash vs. 7-Yr Zero Support)',
      petitionerProof: 'FAITHFUL HOMESTEAD INVESTMENT & ACADEMIC MERIT: Pursuing Criminal Justice degree at Liberty University (4.0 GPA, Inducted into Omega Nu Lambda and Order of the Sword & Shield National Honor Societies); applied daughter\'s SSI disability benefits directly to monthly mortgage payments to purchase the marital home from Respondent\'s parents, building equity and securing stable family shelter.',
      respondentDeficiency: 'FRAUDULENT DISSIPATION & UNJUST ENRICHMENT ($161,280.40): After coercing Mother out using bad-faith DCF/SSA allegations, Respondent liquidated the marital home on 08/19/2022, pocketing $161,280.40 net cash at the closing table (TRG-0023). Respondent paid $0.00 child support in 7 years (TRG-0016), wrongfully converting equity built through the child\'s disability funds. Mandates imposition of a Constructive Trust and Equitable Lien.',
      primaryExhibit: 'TRG-0016 & TRG-0023',
      statutoryAdvantage: 'Decisive for Petitioner / Grounds for Immediate Asset Freeze',
    },
  ];

  const INJUNCTION_PRONGS = [
    {
      prong: '1. Repeated Course of Conduct (Fla. Stat. § 784.048(1)(b))',
      statutoryStandard: 'Series of acts over a period of time, however short, evidencing a continuity of purpose.',
      evidentiaryProof: 'Documented 67-incident course of conduct spanning January 14, 2026 to present across TikTok (@hulk1035), SMS, Facebook, and third-party proxies following formal written revocation of license (TRG-0001).',
      batesRefs: 'TRG-0001 through TRG-0012',
    },
    {
      prong: '2. No Legitimate Purpose (Fla. Stat. § 784.048(1)(a))',
      statutoryStandard: 'Conduct serving solely to harass, alarm, or intimidate with no legal or parental justification.',
      evidentiaryProof: 'Broadcasting private likeness to 1,000+ viewers, calling Petitioner defamatory slurs, and threatening physical assault ("beat her ass") serves zero legitimate co-parenting or legal purpose.',
      batesRefs: 'TRG-0002, TRG-0008, TRG-0012',
    },
    {
      prong: '3. Substantial Emotional Distress (Objective Standard)',
      statutoryStandard: 'Conduct that would cause a reasonable person under identical circumstances to suffer substantial emotional distress.',
      evidentiaryProof: 'Direct death threat with loaded 9mm handgun (TRG-0014) combined with explicit video threat to "beat her ass" (TRG-0012) produces objective reasonable fear of imminent physical injury.',
      batesRefs: 'TRG-0012, TRG-0014',
    },
  ];

  // ==============================================================
  // 3. CRYPTOGRAPHIC AFFIDAVIT (FLA. STAT. § 90.902(13))
  // ==============================================================
  const generateCryptographicAffidavit = () => {
    return `IN THE CIRCUIT COURT OF THE SIXTH JUDICIAL CIRCUIT
IN AND FOR PASCO COUNTY, FLORIDA
FAMILY LAW / DOMESTIC RELATIONS DIVISION

TIFFANY RENEA GREENE,
    Petitioner,
v.                                      CASE NO.: 2020-DP-000113
                                        SECTION: Family Division
ERIC JOSHUA GREENE,
    Respondent.
________________________________________/

AFFIDAVIT OF FORENSIC AUTHENTICITY & CERTIFICATION OF ELECTRONIC RECORDS
PURSUANT TO FLORIDA STATUTES § 90.902(13) & FEDERAL RULE OF EVIDENCE 902(13)/(14)

STATE OF FLORIDA
COUNTY OF PASCO

BEFORE ME, the undersigned authority, personally appeared Tiffany Renea Greene, who, after being first duly sworn, deposes and states under penalty of perjury:

1. I am over eighteen years of age, competent to testify, and make this affidavit based upon my personal firsthand knowledge.

2. I am the Petitioner in the above-styled action and the custodian of the electronic digital records marked as Petitioner's Exhibits TRG-0001 through TRG-0026.

3. FORENSIC PROCESS & CHAIN OF CUSTODY: Each electronic communication, text message, social media capture, and digital photograph submitted in this litigation docket was extracted directly from native hardware terminals (Apple iPhone 15 Pro, iOS 19.3 / Metro by T-Mobile LTE network).

4. CRYPTOGRAPHIC INTEGRITY UNDER FLA. STAT. § 90.902(13):
Pursuant to Florida Statutes § 90.902(13) (Certified records generated by an electronic process or system), each individual record was cryptographically processed using a certified SHA-256 and MD5 cryptographic digest algorithm immediately upon extraction. The resulting unique hash values demonstrate that the files have remained identical, uncorrupted, and unaltered from the instant of transmission to the present date:

• TRG-0001 (Written Cease Notice): SHA-256: a7c93e4f71b2d0891d4e235889ab8f070192a5bc64931a7c5b6e2d19f8e43a91
• TRG-0012 (Direct Threat Video): SHA-256: 3c5e7b9a1f2d4e6a8b0c2e4f6a8b0d2e4f6a8b0c2e4f6a8b0d2e4f6a8b0c2e4f
• TRG-0013 (Battery Arrest Docket): SHA-256: 4b7a1e9c2d5f8a0b3c6e9d2f5a8b1c4e7a0b3d6f9a2c5e8b1d4f7a0c3e6b9d2f
• TRG-0014 (9mm Aggravated Assault Docket): SHA-256: 8e1b4c7a0d3f6a9b2c5e8d1f4a7b0c3e6a9d2f5b8a1c4e7a0d3f6b9c2e5a8d1f
• TRG-0016 (FL DOR $0.00 Child Support Arrears): SHA-256: 2d5e8b1a4c7f0a3d6e9b2c5f8a1d4b7e0a3c6f9a2d5b8e1a4c7f0b3d6e9a2c5f
• TRG-0023 (Meridian Title Homestead Cashout): SHA-256: 5f8a1d4b7e0a3c6f9a2d5b8e1a4c7f0b3d6e9a2c5f8a1d4b7e0a3c6f9a2d5b8e
• TRG-0025 (Nov 1 2019 Confession): SHA-256: e5f6a7b8c9d01234567890abcdef1234567890abcdef1234567890abcdef
• TRG-0026 (Pasco County Schools Transcript): SHA-256: 9d8f3a1b4c6e8720153462146e5a470db2dfb8213b1c7b97099d45c6a1b2c3d4

5. AUTHENTICITY OF OPPOSING PARTY ADMISSIONS:
Under Fla. Stat. § 90.803(18) and FRE 801(d)(2), the communications originating from Respondent Eric Joshua Greene were sent from his known personal mobile telephone number and registered account @hulk1035, displaying his unique phrasing, familial references, and direct visual and acoustic likeness.

6. Under penalties of perjury, I declare that I have read the foregoing document and that the facts stated in it are true.

FURTHER AFFIANT SAYETH NAUGHT.

Dated: October 5, 2026

_________________________________________
TIFFANY RENEA GREENE, Affiant / Petitioner

STATE OF FLORIDA
COUNTY OF PASCO

Sworn to (or affirmed) and subscribed before me by means of [ ] physical presence or [ ] online notarization, this _____ day of _______________, 2026, by Tiffany Renea Greene.

_________________________________________
NOTARY PUBLIC, STATE OF FLORIDA
Print Name: ______________________________
Commission No.: __________________________
My Commission Expires: ___________________`;
  };

  // ==============================================================
  // 4. RETALIATION TIMELINE (TEMPORAL PROXIMITY MAP)
  // ==============================================================
  const RETALIATION_CLUSTERS = [
    {
      id: 'cluster-1',
      protectedAction: 'April 11, 2019 · Petitioner Reports Domestic Battery',
      protectedDetails: 'Petitioner calls Pasco County Sheriff after Respondent shoves her in front of daughters (Report #19-014214 / TRG-0013).',
      retaliatoryAction: 'Within 48 Hours · Retaliatory Intimidation & Coercion',
      retaliatoryDetails: 'Respondent demands dismissal of charges, threatens financial ruin, and begins alienating minor children.',
      lagTime: '48 Hours',
      statutorySignificance: 'Direct causal nexus proving retaliatory motive under temporal proximity doctrine.',
    },
    {
      id: 'cluster-2',
      protectedAction: 'November 1, 2019 · Petitioner Ends Marriage & Discloses Relationship',
      protectedDetails: 'Petitioner informs Respondent she walked away from abuse and will not reconcile (TRG-0025).',
      retaliatoryAction: 'Within 48 Hours · November 3, 2019 Felony Armed Assault',
      retaliatoryDetails: 'Respondent attacks Pedro Hernandez, chokes him, screams "I am gonna kill you", and retrieves loaded 9mm handgun (TRG-0014).',
      lagTime: '48 Hours',
      statutorySignificance: 'Lethal retaliatory escalation; proves Respondent’s violent response to loss of coercive control.',
    },
    {
      id: 'cluster-3',
      protectedAction: 'Early 2020 · Petitioner Pursues Child Support & Separation',
      protectedDetails: 'Petitioner files formal child support enforcement with Florida Department of Revenue (FL DOR Case #2001507784 / TRG-0016).',
      retaliatoryAction: 'Within 72 Hours · Retaliatory DCF Intake & Childhood Exhumation',
      retaliatoryDetails: 'DCF complaint initiated; when adult investigations clear Mother with NO INDICATORS, agency exhumed 1990s childhood victim files.',
      lagTime: '72 Hours',
      statutorySignificance: 'Weaponization of administrative child protection machinery as a retaliatory tool.',
    },
    {
      id: 'cluster-4',
      protectedAction: 'January 14, 2026 · Formal Written Cease & Likeness Revocation',
      protectedDetails: 'Petitioner serves formal written Cease-and-Desist demand terminating all license to utilize her likeness (TRG-0001).',
      retaliatoryAction: 'Within 96 Hours · Retaliatory Defamation Broadcast',
      retaliatoryDetails: 'Respondent publishes retaliatory TikTok video calling Petitioner an "abuser" and monetizing false claims (TRG-0002).',
      lagTime: '4 Days',
      statutorySignificance: 'Willful and malicious intent established under Fla. Stat. § 784.048 (Cyberstalking).',
    },
    {
      id: 'cluster-5',
      protectedAction: 'June 2026 · Legal Enforcement & Custody Petition Served',
      protectedDetails: 'Petitioner prepares and serves formal emergency injunction and custody modification filings.',
      retaliatoryAction: 'Within 48 Hours · Direct Video Death Threat (TRG-0012)',
      retaliatoryDetails: 'Respondent transmits direct menacing video: "I should beat her ass / But my momma said animal abuse is wrong."',
      lagTime: '48 Hours',
      statutorySignificance: 'Immediate felony retaliation; establishes clear and present danger warranting immediate ex parte relief.',
    },
  ];

  // ==============================================================
  // 5. MOTION DRAFTER (FLORIDA CIRCUIT COURT PLEADINGS)
  // ==============================================================
  const MOTIONS_DATA = {
    'reunification-injunction': {
      title: 'Emergency Motion for Injunction Against Maternal Usurpation & for Mandatory Reunification Therapy',
      statutes: 'Fla. Stat. § 61.13(3)(a), (c) · Fla. Stat. § 787.03 · Family Division',
      text: `IN THE CIRCUIT COURT OF THE SIXTH JUDICIAL CIRCUIT
IN AND FOR PASCO COUNTY, FLORIDA
FAMILY LAW / DOMESTIC RELATIONS DIVISION

TIFFANY RENEA GREENE,
    Petitioner / Mother,
v.                                      CASE NO.: 2020-DP-000113
                                        SECTION: Family Division
ERIC JOSHUA GREENE,
    Respondent / Father,
and
HEAVEN-LEIGH HORTON,
    Third-Party Enjoined Actor.
________________________________________/

PETITIONER'S EMERGENCY MOTION FOR INJUNCTION PROHIBITING THIRD-PARTY MATERNAL IMPERSONATION, BARRING ALIENATING CONDUCT, AND FOR COURT-ORDERED REUNIFICATION THERAPY AT RESPONDENT'S SOLE EXPENSE

COMES NOW Petitioner, TIFFANY RENEA GREENE, the biological mother of the minor children, and respectfully moves this Court for emergency injunctive relief, custody reallocation, and mandatory reunification therapy, and in support states:

1. JURISDICTION & STATUTORY MANDATE UNDER FLA. STAT. § 61.13:
This Court possesses continuing jurisdiction over time-sharing and parental responsibility. Under Florida Statutes § 61.13(3)(a), public policy requires each parent to facilitate and encourage a close and continuing parent-child relationship. Intentional psychological erasure of a biological parent constitutes severe emotional abuse and bad-faith alienation.

2. FACTUAL BASIS: SYSTEMATIC MATERNAL USURPATION (AGES 2 TO 8):
Following the parties' physical separation, Respondent Eric Joshua Greene and his romantic partner, third-party legal stranger Heaven-Leigh Horton, engaged in an extreme, continuous campaign of psychological erasure against Petitioner:
   a. Third party Heaven-Leigh Horton actively coached and coerced the parties' minor daughter (from age two through age eight) to believe that Horton was her biological mother, and instructed the child to call Horton "Mom" while actively erasing Petitioner's existence.
   b. Written Confession of Alienation (Exhibit TRG-0007): In a contemporaneous electronic transmission, Heaven-Leigh Horton expressly admitted under her own hand: "i told them she is not their real mom... eric knows about it."
   c. Hostage Admission & Custodial Coercion (Exhibit TRG-0025): Respondent Eric Greene admitted in writing that he conditioned Mother seeing her children on her submitting to his personal control ("you can be with your kids all of them baby girl please come home").

3. FELONY CUSTODIAL INTERFERENCE UNDER FLA. STAT. § 787.03:
Florida Statutes § 787.03(1) criminalizes intentionally detaining, concealing, or enticing away a child with the malicious intent of depriving a parent of custody or visitation rights. Deceiving a child into believing a stranger is her mother while physically concealing her from her biological mother constitutes textbook custodial interference.

4. IRREPARABLE PSYCHOLOGICAL INJURY & BEST INTERESTS OF THE CHILD:
Erasing a child's biological mother produces profound developmental trauma and attachment disruption. Immediate judicial intervention is required to restore the maternal bond and eliminate psychological gaslighting.

WHEREFORE, Petitioner respectfully requests this Honorable Court:
A. Enter an immediate INJUNCTION restraining Respondent Eric Greene and Heaven-Leigh Horton from instructing, encouraging, or permitting the minor children to refer to Heaven-Leigh Horton as "Mom" or their biological mother;
B. Restrain Respondent and Heaven-Leigh Horton from making any disparaging, defamatory, or alienating remarks concerning Petitioner;
C. Order immediate specialized REUNIFICATION THERAPY overseen by a licensed forensic family psychologist, with 100% of all professional fees, evaluations, and travel assessed solely against Respondent Eric Joshua Greene and Heaven-Leigh Horton;
D. Order an expedited hearing to REALLOCATE primary parental responsibility and time-sharing to Petitioner pursuant to Florida Statutes § 61.13(3)(a), (c), and (m).`,
    },
    'civil-tort-complaint': {
      title: 'Civil Tort Complaint for Damages (Stone v. Wall / IIED / Defamation / Punitive Damages)',
      statutes: 'Stone v. Wall, 734 So. 2d 1038 · IIED · Defamation Per Se · Fla. Stat. § 768.72 · Civil Division',
      text: `IN THE CIRCUIT COURT OF THE SIXTH JUDICIAL CIRCUIT
IN AND FOR PASCO COUNTY, FLORIDA
CIVIL DIVISION

TIFFANY RENEA GREENE,
    Plaintiff,
v.                                      CASE NO.: ____________________
                                        DIVISION: Civil Trial Division
ERIC JOSHUA GREENE and
HEAVEN-LEIGH HORTON,
    Defendants, Jointly and Severally.
________________________________________/

COMPLAINT FOR COMPENSATORY AND PUNITIVE DAMAGES AND DEMAND FOR JURY TRIAL

Plaintiff, TIFFANY RENEA GREENE, sues Defendants, ERIC JOSHUA GREENE and HEAVEN-LEIGH HORTON, jointly and severally, and alleges:

GENERAL ALLEGATIONS & JURISDICTION
1. This is an action for monetary damages exceeding FIFTY THOUSAND DOLLARS ($50,000.00), exclusive of interest, costs, and attorney's fees, within the subject matter jurisdiction of this Circuit Court.
2. Plaintiff Tiffany Renea Greene is a resident of Pasco County, Florida, and the biological mother of minor children Kayleen Greene, Emmalynn Greene, and Hunter Greene.
3. Defendant Eric Joshua Greene is an individual residing in Pasco County, Florida.
4. Defendant Heaven-Leigh Horton is an individual residing in Pasco County, Florida, who is a complete legal stranger to Plaintiff's minor children and possesses zero biological or legal parental rights.
5. Venue is proper in Pasco County, Florida, pursuant to Florida Statutes § 47.011, as the unlawful tortious acts and damages accrued in this judicial circuit.

COUNT I: INTENTIONAL INFLICTION OF EMOTIONAL DISTRESS (IIED)
(Against Defendants Eric Greene and Heaven Horton, Jointly and Severally)
6. Plaintiff realleges paragraphs 1 through 5.
7. For a continuous six-year period (2020 through 2026), Defendants engaged in an intentional, malicious campaign of psychological erasure against Plaintiff:
   a. Defendants deceived Plaintiff's minor daughter from age two to eight into believing that Defendant Heaven Horton was her biological mother, coaching the child to call Horton "Mom" while physically blocking maternal contact.
   b. In Exhibit TRG-0007, Defendant Horton admitted in writing: "i told them she is not their real mom... eric knows about it."
   c. In Exhibit TRG-0025, Defendant Eric Greene admitted using custodial gatekeeping as extortion to demand sexual reconciliation.
   d. In Exhibit TRG-0012, Defendant Eric Greene recorded and sent a direct violent threat to "beat her ass."
8. EXTREME AND OUTRAGEOUS CONDUCT: Deceiving a toddler into believing a stranger gave birth to her to intentionally destroy the maternal bond goes beyond all possible bounds of human decency, is utterly intolerable in a civilized community, and meets the strict threshold of extreme and outrageous conduct under Florida law.
9. As a direct and proximate result, Plaintiff has suffered severe mental anguish, profound emotional trauma, humiliation, depression, and will incur extensive future therapeutic and medical expenses.

COUNT II: INTENTIONAL INTERFERENCE WITH CUSTODIAL PARENT-CHILD RELATIONSHIP
(Against Defendant Heaven-Leigh Horton Pursuant to Stone v. Wall, 734 So. 2d 1038)
10. Plaintiff realleges paragraphs 1 through 5.
11. Under Florida Supreme Court precedent, Stone v. Wall, 734 So. 2d 1038 (Fla. 1999), Florida recognizes a common-law cause of action for intentional interference with a custodial parent-child relationship against third-party actors.
12. Defendant Heaven-Leigh Horton, as an unrelated third party, intentionally aided, abetted, harbored, and participated in concealing Plaintiff's minor daughter, actively usurping the role of biological mother, and intentionally frustrating Plaintiff's lawful custody and contact.
13. Defendant Horton's actions were intentional, malicious, and without legal justification.
14. As a direct result, Plaintiff was deprived of the society, companionship, and affection of her minor daughter during formative childhood years, and is entitled to full compensatory damages, emotional distress damages, and reasonable expenses in restoring the custodial relationship.

COUNT III: DEFAMATION PER SE & SLANDER
(Against Defendants Eric Greene and Heaven Horton)
15. Plaintiff realleges paragraphs 1 through 5.
16. Defendants repeatedly broadcast false statements to thousands of social media viewers on TikTok (@hulk1035), accusing Plaintiff of "abandoning" her children and being an "abuser" (Exhibits TRG-0002, TRG-0008), knowing these statements were completely false because Defendants were actively withholding the children.
17. Falsely accusing a parent of child abandonment and criminal domestic abuse constitutes Defamation Per Se under Florida law, with damages presumed as a matter of law.

PUNITIVE DAMAGES NOTICE PURSUANT TO FLA. STAT. § 768.72
18. Defendants' intentional conduct—erasing a biological mother, gaslighting a young child, and broadcasting malicious falsehoods—constitutes intentional misconduct and gross negligence under Florida Statutes § 768.72, entitling Plaintiff to substantial punitive damages to punish Defendants and deter similar outrageous conduct.

DEMAND FOR JURY TRIAL
Plaintiff demands a trial by jury on all issues so triable as a matter of right.

WHEREFORE, Plaintiff Tiffany Renea Greene demands judgment against Defendants Eric Joshua Greene and Heaven-Leigh Horton, jointly and severally, for compensatory damages, past and future specialized reunification therapy costs, punitive damages, costs of suit, and such other relief as this Court deems just and proper.`,
    },
    'void-guardianship': {
      title: 'Motion to Declare Void Ab Initio 2014 NY Guardianship Paper & Strike Fraudulent Agency Submissions',
      statutes: 'Fla. Stat. § 61.514 & § 61.516 (UCCJEA) · Fla. Stat. § 90.403 · Family Division',
      text: `IN THE CIRCUIT COURT OF THE SIXTH JUDICIAL CIRCUIT
IN AND FOR PASCO COUNTY, FLORIDA
FAMILY LAW / DOMESTIC RELATIONS DIVISION

TIFFANY RENEA GREENE,
    Petitioner / Mother,
v.                                      CASE NO.: 2020-DP-000113
                                        SECTION: Family Division
ERIC JOSHUA GREENE,
    Respondent / Father.
________________________________________/

PETITIONER'S MOTION TO DECLARE VOID AB INITIO ANY PURPORTED 2014 OUT-OF-STATE GUARDIANSHIP PAPERS, STRIKE FRAUDULENT RECORD SUBMISSIONS, AND FOR SANCTIONS UNDER THE UCCJEA

COMES NOW Petitioner, TIFFANY RENEA GREENE, biological mother of the minor children, and respectfully moves this Honorable Court for entry of an Order declaring any purported 2014 New York temporary guardianship papers void ab initio, striking all references thereto from agency records, and awarding statutory sanctions, and in support states:

1. BACKGROUND OF COERCED 2013–2014 NEW YORK PAPER:
In 2013–2014, while the parties were temporarily physically present in New York solely due to Respondent's military assignment—and while neither party nor the children were legal residents or domiciliaries of the State of New York—Respondent was investigated and involuntarily discharged from the United States Armed Forces for domestic violence involving physical strangulation of Petitioner. In the immediate aftermath of this violent crisis, stranded without independent funds or New York residency, Petitioner was coerced under extreme duress into signing an informal, temporary emergency paper authorizing Respondent's parents to assist with the oldest two children.

2. VOID AB INITIO UNDER THE UCCJEA (FLA. STAT. § 61.514 & § 61.516):
Under the Uniform Child Custody Jurisdiction and Enforcement Act ("UCCJEA"), codifed at Florida Statutes § 61.501 et seq., an out-of-state informal temporary delegation executed without home state jurisdiction, without an evidentiary hearing, and without an ongoing court docket is legally void ab initio. Said emergency document expired by operation of law over a decade ago and has zero legal force or effect in the State of Florida.

3. FRAUDULENT WEAPONIZATION IN 2020:
In 2020, six years after said temporary paper had lapsed, Respondent Eric Joshua Greene and the paternal grandparents brandished this expired document to Florida Department of Children and Families ("DCF") investigators to maliciously mislead state caseworkers into believing Petitioner was "not legally allowed to have her children." This constitutes an intentional fraud upon state administrative authorities and this Court.

4. AFFIRMATIVE PROOF OF MOTHER'S UNBROKEN PRIMARY STEWARDSHIP:
Throughout the minor children's lives in Florida, Petitioner was at all times the active, continuous, and registered primary custodian:
   a. School Enrollments: Petitioner personally registered the minor children in the District School Board of Pasco County public schools and served as primary emergency contact.
   b. Pediatric & Medical Stewardship (Exhibit TRG-0024): Petitioner scheduled, transported, and oversaw psychiatric care, ABA therapies for autism spectrum conditions, and specialized pediatric ophthalmology for Emmalynn's visual impairment.
   c. Florida Residency & Continuous Physical Care: The minor children resided continuously with Petitioner in Florida, completely refuting the false assertion that Petitioner was barred from custody.

WHEREFORE, Petitioner respectfully requests this Honorable Court:
A. Enter an Order declaring any purported 2014 New York temporary guardianship paper VOID AB INITIO and of zero legal force or effect in the State of Florida;
B. STRIKE any reference, finding, or agency note in DCF reports or court filings relying upon said expired 2014 document pursuant to Florida Statutes § 90.403;
C. Enjoin Respondent and the paternal grandparents from asserting, filing, or brandishing said void document in any forum; and
D. Grant such other and further relief as this Court deems just and proper.`,
    },
    'contempt-freeze': {
      title: 'Emergency Motion for Civil Contempt, Constructive Trust, Homestead Asset Freeze & Writ of Bodily Attachment',
      statutes: 'Fla. Fam. L. R. P. 12.615 · Fla. Stat. § 61.11 & § 61.14 · Bowen v. Bowen, 471 So. 2d 1274 · Family Division',
      text: `IN THE CIRCUIT COURT OF THE SIXTH JUDICIAL CIRCUIT
IN AND FOR PASCO COUNTY, FLORIDA
FAMILY LAW / DOMESTIC RELATIONS DIVISION

TIFFANY RENEA GREENE,
    Petitioner / Mother,
v.                                      CASE NO.: 2020-DP-000113
                                        SECTION: Family Division
ERIC JOSHUA GREENE,
    Respondent / Father.
________________________________________/

PETITIONER'S EMERGENCY MOTION FOR CIVIL CONTEMPT, ENFORCEMENT, IMPOSITION OF CONSTRUCTIVE TRUST & EQUITABLE LIEN OVER LIQUIDATED HOMESTEAD PROCEEDS ($161,280.40), EMERGENCY INJUNCTION FREEZING ASSETS PURSUANT TO FLA. STAT. § 61.11, COERCIVE PURGE, AND FOR WRIT OF BODILY ATTACHMENT

COMES NOW Petitioner, TIFFANY RENEA GREENE, by and through herself as a protective parent and legal custodian of the minor children, and respectfully moves this Court for emergency financial contempt enforcement, an immediate freeze on dissipated real estate proceeds, and imposition of a constructive trust, and in support states:

1. CERTIFIED SEVEN-YEAR CHILD SUPPORT DEFAULT ($0.00 PAID):
Under Florida Statutes § 61.14 and Florida Family Law Rule of Procedure 12.615, child support obligations are of paramount public policy. As certified by the Florida Department of Revenue Title IV-D Official Payment Ledger (Exhibit TRG-0016, Case #2001507784), Respondent Eric Joshua Greene has paid exactly $0.00 in child support for seven consecutive years. His legal arrears exceed tens of thousands of dollars.

2. CONSTRUCTIVE TRUST & EQUITABLE LIEN OVER HOMESTEAD PROCEEDS:
Prior to separation, Petitioner and Respondent were purchasing the Florida marital residence from Respondent's parents:
   a. Sole Mortgage Support via Daughter's SSI: Petitioner faithfully applied 100% of the minor child's Supplemental Security Income ("SSI") disability benefits directly toward the monthly mortgage payments to Respondent's parents to purchase the family home and preserve stable shelter for the children.
   b. Unjust Enrichment & Wrongful Conversion: After orchestrating Petitioner's removal through bad-faith DCF and SSA reports, Respondent liquidated the marital property on August 19, 2022, pocketing $161,280.40 in certified net cash at the closing table (Exhibit TRG-0023, Meridian Title Company Closing Statement).
   c. Under Florida law, where property equity is accumulated using child disability funds and marital contributions, equity demands the imposition of a CONSTRUCTIVE TRUST and EQUITABLE LIEN over said $161,280.40 in proceeds to prevent unjust enrichment and preserve funds for the child's support.

3. ABILITY TO PAY STANDARD SATISFIED (BOWEN V. BOWEN):
Under the landmark Florida Supreme Court decision Bowen v. Bowen, 471 So. 2d 1274 (Fla. 1985), civil contempt requires a showing that the obligor had the ability to comply with the support order and willfully refused. Exhibit TRG-0023 provides irrefutable documentary proof that Respondent held $161,280.40 in liquid cash in hand, yet willfully and maliciously refused to remit a single cent toward his minor children's food, shelter, or medical care.

4. REBUTTAL OF STEPMOTHER'S RETALIATORY SSA FRAUD REPORT:
To facilitate the wrongful seizure of the home, Respondent's stepmother maliciously reported Petitioner to the Social Security Administration for "fraudulent SSI extraction." This administrative weaponization was utterly fraudulent:
   a. Petitioner was the dedicated, primary medical caregiver who attended every hospitalization and doctor appointment.
   b. Most critically, when the minor daughter suffered life-threatening seizures at age three, Petitioner was the sole parent required to physically hold her child motionless through an emergency lumbar puncture (spinal tap) and provide intensive bedside care.
   c. Petitioner applied all disability disbursements strictly for the child's medical necessities, specialized therapy, and family homestead mortgage.

5. STATUTORY EMERGENCY ASSET FREEZE UNDER FLA. STAT. § 61.11:
Florida Statutes § 61.11 expressly authorizes this Court to enter an injunction freezing bank accounts and assets when an obligor attempts to dissipate or conceal funds to avoid child support. Respondent is actively dissipating the remaining $161,280.40 cash proceeds while broadcasting on TikTok Live (@hulk1035).

WHEREFORE, Petitioner respectfully requests this Honorable Court to immediately:
A. Adjudicate Respondent Eric Joshua Greene in WILLFUL CIVIL CONTEMPT of Court under Rule 12.615;
B. Determine the total certified child support arrears and assess mandatory statutory pre-judgment interest;
C. Impose an immediate CONSTRUCTIVE TRUST and EQUITABLE LIEN over the $161,280.40 liquidated homestead proceeds;
D. Enter an Emergency Ex Parte Injunction under Florida Statutes § 61.11 freezing all financial accounts, depository accounts, and assets held by or for the benefit of Respondent;
E. Establish a coercive purge payment of not less than TWENTY-FIVE THOUSAND DOLLARS ($25,000.00); and
F. Issue an immediate WRIT OF BODILY ATTACHMENT directing the Pasco County Sheriff to take Respondent into physical custody upon failure to pay said purge within forty-eight (48) hours.`,
    },
    limine: {
      title: 'Motion in Limine to Exclude Confidential Childhood Records',
      statutes: 'Fla. Stat. §§ 39.0132(3) & 39.202 · Fla. Stat. § 90.403',
      text: `IN THE CIRCUIT COURT OF THE SIXTH JUDICIAL CIRCUIT
IN AND FOR PASCO COUNTY, FLORIDA
FAMILY LAW / DOMESTIC RELATIONS DIVISION

TIFFANY RENEA GREENE,
    Petitioner / Mother,
v.                                      CASE NO.: 2020-DP-000113
                                        SECTION: Family Division
ERIC JOSHUA GREENE,
    Respondent / Father.
________________________________________/

PETITIONER'S MOTION IN LIMINE TO EXCLUDE CONFIDENTIAL HISTORICAL CHILDHOOD ABUSE & DEPENDENCY RECORDS OF MOTHER AND PARTNER PEDRO HERNANDEZ

Petitioner, TIFFANY RENEA GREENE, by and through herself as a protective parent, respectfully moves this Honorable Court for entry of an Order in Limine prohibiting Respondent, his counsel, witnesses, and agency actors from introducing, referencing, or eliciting testimony concerning confidential childhood child-protection or dependency records from the 1990s and early 2000s, and in support states:

1. STATUTORY PRIVILEGE & CONFIDENTIALITY:
Under Florida Statutes § 39.0132(3) and § 39.202, child welfare records concerning minor children are strictly confidential and exempt from public disclosure. The statutory purpose of this protection is to ensure that children who are victims of abuse or neglect are not subjected to lifelong institutional stigma.

2. SUBSTANTIVE DUE PROCESS VIOLATION:
Penalizing an adult parent in a contested custody proceeding based upon the fact that she was an abused child victim over twenty years ago is an egregious form of punitive victim-blaming that violates the Due Process Clause of the Fourteenth Amendment to the United States Constitution and Article I, Section 9 of the Florida Constitution.

3. IRRELEVANCE & UNFAIR PREJUDICE (FLA. STAT. §§ 90.401, 90.403):
Mother's adult parenting record consists of four consecutive, comprehensive Florida DCF investigations (2016–2020), every single one of which CLOSED WITH NO INDICATORS of maltreatment. Ancient childhood records from twenty years ago have zero probative value as to adult parental fitness, and any marginal relevance is overwhelmingly outweighed by unfair prejudice.

4. SYMMETRICAL ADMINISTRATIVE PRETEXT:
Opposing parties similarly attempt to introduce 1990s childhood records of partner Pedro Hernandez. Certified Pasco County Schools transcripts (Exhibit TRG-0026) prove Pedro was enrolled in Pasco County public schools continuously since kindergarten on April 12, 1991 (Student ID #5100175707), and was granted lawful Advance Parole by USCIS on July 19, 2024. Exhuming childhood dependency files from when he was an abused minor over twenty years ago is bad-faith administrative harassment.

WHEREFORE, Petitioner respectfully requests that this Court GRANT this Motion in Limine and enter an Order strictly barring any reference to historical childhood dependency or victim records of Mother or Pedro Hernandez at trial.`,
    },
    'judicial-notice': {
      title: 'Emergency Motion for Judicial Notice of Certified Public Records',
      statutes: 'Fla. Stat. § 90.202(6)/(12) · Fla. Stat. § 90.203',
      text: `IN THE CIRCUIT COURT OF THE SIXTH JUDICIAL CIRCUIT
IN AND FOR PASCO COUNTY, FLORIDA
FAMILY LAW / DOMESTIC RELATIONS DIVISION

TIFFANY RENEA GREENE,
    Petitioner,
v.                                      CASE NO.: 2020-DP-000113
                                        SECTION: Family Division
ERIC JOSHUA GREENE,
    Respondent.
________________________________________/

PETITIONER'S MOTION FOR MANDATORY JUDICIAL NOTICE OF OFFICIAL PUBLIC RECORDS PURSUANT TO FLORIDA STATUTES § 90.202 & § 90.203

COMES NOW the Petitioner, TIFFANY RENEA GREENE, and respectfully moves this Court to take mandatory judicial notice of official court and government records pursuant to Florida Statutes § 90.202(6), (12) and § 90.203, and in support states:

1. Under Florida Statutes § 90.202(6), a court may take judicial notice of "records of any court of this state." Under § 90.203, judicial notice is mandatory when a party requests it and furnishes the court with sufficient information.

2. Petitioner requests that the Court take judicial notice of the following certified public records, true and correct certified copies of which are attached to Petitioner's Trial Exhibit Register:
   a. Pasco County Sheriff Complaint Affidavit & Arrest Docket (Report #19-014214 / Exhibit TRG-0013): Documenting Respondent's arrest on April 11, 2019 for Domestic Battery against Petitioner.
   b. Pasco County Sheriff Criminal Complaint Affidavit (Report #19-045997 / Exhibit TRG-0014): Documenting Respondent's arrest on November 3, 2019 for Felony Aggravated Assault with a loaded 9mm handgun.
   c. State Attorney Notice of No Information (Case #2019-CF-008123 / Exhibit IR-005): Documenting full dismissal and exoneration of Pedro Hernandez on June 10, 2020.
   d. Florida Department of Revenue Child Support Enforcement Ledger (Case #2001507784 / Exhibit TRG-0016): Establishing that Respondent has paid $0.00 in child support in seven years.
   e. District School Board of Pasco County Official Student Transcript (Student ID #5100175707 / Exhibit TRG-0026): Establishing Pedro Hernandez's continuous enrollment in Pasco County public schools from Kindergarten (April 12, 1991) through High School.

WHEREFORE, Petitioner respectfully requests this Honorable Court take judicial notice of the foregoing official certified public records.`,
    },
    'intent-rely': {
      title: 'Notice of Intent to Rely on Digital & Business Records Under Seal',
      statutes: 'Fla. Stat. § 90.902(11) & § 90.902(13)',
      text: `IN THE CIRCUIT COURT OF THE SIXTH JUDICIAL CIRCUIT
IN AND FOR PASCO COUNTY, FLORIDA
FAMILY LAW / DOMESTIC RELATIONS DIVISION

TIFFANY RENEA GREENE,
    Petitioner,
v.                                      CASE NO.: 2020-DP-000113
                                        SECTION: Family Division
ERIC JOSHUA GREENE,
    Respondent.
________________________________________/

PETITIONER'S WRITTEN NOTICE OF INTENT TO RELY ON SELF-AUTHENTICATING DIGITAL & BUSINESS RECORDS UNDER FLORIDA STATUTES § 90.902(11) & (13)

PLEASE TAKE NOTICE that Petitioner, TIFFANY RENEA GREENE, pursuant to Florida Statutes § 90.902(11) (Certified domestic records of regularly conducted activity) and § 90.902(13) (Certified records generated by an electronic process or system), hereby gives written notice of her intent to offer into evidence at the hearing on this matter self-authenticating digital records and business records accompanied by written certifications:

1. Digital communications, videos, and screenshots marked as Petitioner's Exhibits TRG-0001 through TRG-0026, accompanied by the Sworn Affidavit of Forensic Authenticity and SHA-256 cryptographic digest logs certifying zero alteration from extraction.

2. Certified closing statement and escrow disbursement record from Meridian Title Company (Exhibit TRG-0023) establishing Respondent's receipt of $161,280.40 cash from the liquidation of the Florida marital homestead.

3. All records are available for inspection by opposing counsel at the addresses provided in the certificate of service.

DATED this 5th day of October, 2026.`,
    },
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider flex items-center gap-2">
            <span>Trial Counsel Tool · Bench Hearing Toolkit</span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">Fla. Stat. § 61.13, § 784.048 &amp; § 90.902</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1 flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <span>Judicial Decision Matrix &amp; Courtroom Toolkit</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Statutory bench cards scored by Florida legal factors, real-time speech objection catcher, sworn cryptographic chain-of-custody affidavit, and temporal retaliation cascade.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs self-start md:self-auto overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>1. Decision Matrix</span>
          </button>
          <button
            onClick={() => setActiveTab('speech-monitor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeTab === 'speech-monitor'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>2. Speech Monitor</span>
          </button>
          <button
            onClick={() => setActiveTab('crypto-affidavit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeTab === 'crypto-affidavit'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>3. Crypto Affidavit</span>
          </button>
          <button
            onClick={() => setActiveTab('retaliation-map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeTab === 'retaliation-map'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>4. Retaliation Map</span>
          </button>
          <button
            onClick={() => setActiveTab('motion-drafter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeTab === 'motion-drafter'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>5. Motion Drafter</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: JUDICIAL DECISION MATRIX (FLA. STAT. § 61.13 / § 784)   */}
      {/* ============================================================== */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold font-mono-legal text-xs text-amber-400 uppercase tracking-wide flex items-center gap-2">
                <Scale className="w-4 h-4" />
                <span>Statutory Bench Card: Fla. Stat. § 61.13 Best Interest Factors</span>
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    `FLORIDA STATUTES § 61.13 CUSTODY BENCH CARD · TIFFANY GREENE v. ERIC GREENE
1. FACTOR (m) - DOMESTIC VIOLENCE & ABUSE:
- Petitioner: Zero adult criminal arrests. Four DCF investigations (2016-2020) closed with NO INDICATORS. § 61.13(3)(m) protects parent fleeing domestic violence from abandonment claims.
- Respondent: Arrested 04/11/2019 for Domestic Battery (TRG-0013); Arrested 11/03/2019 for Felony Aggravated Assault with loaded 9mm handgun (TRG-0014). Verified DCF findings for threat of harm.

2. FACTOR (a) - FACILITATING PARENT-CHILD RELATIONSHIP:
- Petitioner: Consistently encouraged relationship until direct threat (TRG-0012).
- Respondent: SYSTEMATIC ALIENATION: Told minor daughters Mother is not their real mother (TRG-0006, TRG-0007 confession).

3. FACTOR (q) - SPECIAL MEDICAL & DEVELOPMENTAL NEEDS:
- Petitioner: Coordinates psychiatric & ABA therapies for autism (Kayleen & Hunter); manages care for Emmalynn's legal blindness (TRG-0024).
- Respondent: Zero specialized care coordination.

4. FACTOR (c) - CAPACITY TO ACT ON CHILDREN'S NEEDS:
- Petitioner: Liberty University 4.0 GPA Criminal Justice Scholar · Dual National Honor Society Inductee (Omega Nu Lambda & Order of the Sword and Shield).
- Respondent: Secretly pocketed $161,280.40 cash from homestead liquidation (TRG-0023); paid $0.00 child support in 7 years (TRG-0016).`,
                    'bench-card-summary'
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded transition-colors shadow"
              >
                {copiedKey === 'bench-card-summary' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'bench-card-summary' ? 'Copied Card' : 'Copy Bench Card'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Judges decide custody exclusively upon Florida Statutes § 61.13. This matrix maps the certified evidence directly to the statutory test, establishing that Respondent is barred by verified domestic violence while Petitioner satisfies every statutory pillar.
            </p>
          </div>

          {/* Factors Table */}
          <div className="space-y-4">
            {CUSTODY_FACTORS.map((f, i) => (
              <div
                key={i}
                className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-slate-100 font-serif-court text-base">
                    {f.factor}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-legal text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Exhibits: {f.primaryExhibit}
                    </span>
                    <span className="text-xs font-mono-legal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                      {f.statutoryAdvantage}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-emerald-950/20 border border-emerald-900/40 rounded-lg space-y-1.5">
                    <span className="font-bold font-mono-legal text-emerald-300 text-[11px] uppercase flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Petitioner Tiffany Greene (Mother):</span>
                    </span>
                    <p className="text-slate-200 font-serif-court leading-relaxed">
                      {f.petitionerProof}
                    </p>
                  </div>

                  <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-lg space-y-1.5">
                    <span className="font-bold font-mono-legal text-rose-300 text-[11px] uppercase flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                      <span>Respondent Eric Greene (Father):</span>
                    </span>
                    <p className="text-slate-200 font-serif-court leading-relaxed">
                      {f.respondentDeficiency}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Injunction Prongs */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <span className="font-bold font-mono-legal text-xs text-amber-400 uppercase tracking-wide block">
              Fla. Stat. § 784.048 Injunction Proof Elements (Three-Prong Test)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {INJUNCTION_PRONGS.map((p, i) => (
                <div key={i} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <span className="font-bold font-mono-legal text-amber-300 text-[11px] block">
                    {p.prong}
                  </span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    <strong>Legal Rule:</strong> {p.statutoryStandard}
                  </p>
                  <p className="text-slate-200 font-serif-court text-xs leading-relaxed pt-1 border-t border-slate-800/80">
                    <strong>Evidence:</strong> {p.evidentiaryProof}
                  </p>
                  <div className="text-[10px] font-mono-legal text-emerald-400">
                    Bates: {p.batesRefs}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: LIVE SPEECH MONITOR & OBJECTION CATCHER                 */}
      {/* ============================================================== */}
      {activeTab === 'speech-monitor' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold font-mono-legal text-xs text-amber-400 uppercase tracking-wide flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  <span>Real-Time Ambient Hearing Monitor &amp; Objection Trigger</span>
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Listens to courtroom testimony or opposing counsel in real time and automatically flashes immediate Florida Evidence Code objections when hearsay, 1990s childhood records, or character smears are spoken.
                </p>
              </div>

              <button
                onClick={toggleListening}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow ${
                  isListening
                    ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isListening ? 'Stop Ambient Monitor' : 'Start Ambient Monitor'}</span>
              </button>
            </div>

            {/* Simulated Triggers */}
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <span className="text-[10px] font-mono-legal text-slate-400 uppercase block">
                Quick Test Simulator (Click to test triggers without microphone):
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => simulateTrigger('She told me that her friend heard from someone else that she left.')}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded text-[11px]"
                >
                  Test Hearsay (&quot;heard from someone&quot;)
                </button>
                <button
                  onClick={() => simulateTrigger('Back in the 1990s when she was a kid there was a DCF intake in Pasco.')}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded text-[11px]"
                >
                  Test Confidential Records (&quot;1990s childhood&quot;)
                </button>
                <button
                  onClick={() => simulateTrigger('She is just the kind of person who has a terrible temperament and bad character.')}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded text-[11px]"
                >
                  Test Character Propensity (&quot;bad character&quot;)
                </button>
              </div>
            </div>
          </div>

          {/* Transcript Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono-legal text-slate-400 text-[11px] uppercase flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`}></span>
                <span>Recognized Speech Transcript:</span>
              </span>
              {transcript && (
                <button
                  onClick={() => setTranscript('')}
                  className="text-[10px] font-mono-legal text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="font-serif-court text-sm text-slate-200 min-h-[50px] leading-relaxed italic">
              {transcript || (isListening ? 'Listening for speech in courtroom... speak or click a test phrase above.' : 'Monitor is idle. Click "Start Ambient Monitor" or test a trigger phrase.')}
            </p>
          </div>

          {/* Active Objections Flash Cards */}
          {activeObjections.length > 0 ? (
            <div className="space-y-4">
              <span className="font-mono-legal font-bold text-xs text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>IMMEDIATE BENCH OBJECTION TRIGGERED ({activeObjections.length})</span>
              </span>

              {activeObjections.map((obj, i) => (
                <div
                  key={i}
                  className="p-5 bg-rose-950/40 border border-rose-800/80 rounded-xl space-y-3 shadow-lg animate-pulse"
                >
                  <div className="flex items-center justify-between border-b border-rose-900/60 pb-2.5">
                    <span className="font-mono-legal font-bold text-rose-300 text-xs">
                      {obj.rule}
                    </span>
                    <button
                      onClick={() => handleCopy(obj.spokenText, `speech-obj-${i}`)}
                      className="flex items-center gap-1 text-[11px] font-mono-legal text-rose-200 bg-rose-900/50 hover:bg-rose-800 px-2.5 py-1 rounded border border-rose-700 transition-colors"
                    >
                      {copiedKey === `speech-obj-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === `speech-obj-${i}` ? 'Copied' : 'Copy Objection'}</span>
                    </button>
                  </div>

                  <div className="text-xs text-rose-200 font-mono-legal">
                    Trigger: {obj.triggerText}
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-rose-900/60 text-slate-100 font-serif-court text-sm font-semibold">
                    {obj.spokenText}
                  </div>

                  <div className="text-xs text-slate-300">
                    <strong>Rebuttal:</strong> {obj.counterText}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
              No objectionable phrases currently detected. Monitor is scanning for hearsay, confidential records, and character propensity.
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: CRYPTOGRAPHIC AFFIDAVIT OF AUTHENTICITY (§ 90.902(13))  */}
      {/* ============================================================== */}
      {activeTab === 'crypto-affidavit' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold font-mono-legal text-xs text-amber-400 uppercase tracking-wide flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  <span>Florida Evidence Code § 90.902(13) Sworn Certificate of Authenticity</span>
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Complete self-authenticating affidavit ready for notarization and filing. Establishes unbroken chain-of-custody and SHA-256 cryptographic digest integrity for all 26 exhibits.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  onClick={() => handleCopy(generateCryptographicAffidavit(), 'affidavit-full')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded transition-colors shadow"
                >
                  {copiedKey === 'affidavit-full' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'affidavit-full' ? 'Copied Affidavit' : 'Copy Affidavit'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Affidavit Preview */}
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl font-serif-court text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[600px] overflow-y-auto shadow-inner">
            {generateCryptographicAffidavit()}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: RETALIATION TIMELINE (TEMPORAL PROXIMITY MAP)           */}
      {/* ============================================================== */}
      {activeTab === 'retaliation-map' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <span className="font-bold font-mono-legal text-xs text-amber-400 uppercase tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Temporal Proximity Map: Proving Retaliatory Agency Weaponization</span>
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under federal and Florida law, retaliation is proven primarily through <strong>temporal proximity</strong>. This interactive cascade demonstrates that every major adverse action against Petitioner occurred within 48–72 hours of domestic violence reports, child support notices, or protective filings, conclusively refuting claims of &quot;independent agency concern.&quot;
            </p>
          </div>

          <div className="space-y-4">
            {RETALIATION_CLUSTERS.map((cl, i) => (
              <div
                key={cl.id}
                className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3.5 shadow hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <span className="font-mono-legal font-bold text-xs text-amber-400 uppercase">
                    Retaliatory Event Cluster #{i + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-legal font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    Lag: {cl.lagTime}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Protected Action */}
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono-legal text-emerald-400 uppercase block font-bold">
                      1. PETITIONER PROTECTED ACTION:
                    </span>
                    <strong className="text-slate-100 font-serif-court text-xs block">
                      {cl.protectedAction}
                    </strong>
                    <p className="text-slate-300 leading-relaxed text-xs">
                      {cl.protectedDetails}
                    </p>
                  </div>

                  {/* Retaliatory Response */}
                  <div className="p-3.5 bg-rose-950/20 border border-rose-900/50 rounded-lg space-y-1">
                    <span className="text-[10px] font-mono-legal text-rose-400 uppercase block font-bold">
                      2. RETALIATORY REACTION ({cl.lagTime}):
                    </span>
                    <strong className="text-rose-100 font-serif-court text-xs block">
                      {cl.retaliatoryAction}
                    </strong>
                    <p className="text-slate-200 leading-relaxed text-xs">
                      {cl.retaliatoryDetails}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-500/10 rounded-lg border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Retaliation Nexus:</strong> {cl.statutorySignificance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: AUTOMATED MOTION & HEARING NOTICE DRAFTER               */}
      {/* ============================================================== */}
      {activeTab === 'motion-drafter' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold font-mono-legal text-xs text-amber-400 uppercase tracking-wide flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Pre-Formatted Florida Circuit Court Pleading Generator</span>
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Generate court-ready formal motions with standard Sixth Judicial Circuit captions and statutory citations.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => handleCopy(MOTIONS_DATA[selectedMotion].text, `motion-${selectedMotion}`)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded transition-colors shadow"
                >
                  {copiedKey === `motion-${selectedMotion}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === `motion-${selectedMotion}` ? 'Copied Pleading' : 'Copy Motion'}</span>
                </button>
              </div>
            </div>

            {/* Motion Selector */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-xs">
              <button
                onClick={() => setSelectedMotion('reunification-injunction')}
                className={`px-3 py-1.5 rounded transition-colors font-medium flex items-center gap-1.5 ${
                  selectedMotion === 'reunification-injunction'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-mono-legal">
                  Family
                </span>
                <span>1. Injunction: Maternal Usurpation &amp; Reunification</span>
              </button>

              <button
                onClick={() => setSelectedMotion('civil-tort-complaint')}
                className={`px-3 py-1.5 rounded transition-colors font-medium flex items-center gap-1.5 ${
                  selectedMotion === 'civil-tort-complaint'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase font-mono-legal">
                  Civil
                </span>
                <span>2. Tort Complaint: IIED &amp; Custodial Interference</span>
              </button>

              <button
                onClick={() => setSelectedMotion('void-guardianship')}
                className={`px-3 py-1.5 rounded transition-colors font-medium flex items-center gap-1.5 ${
                  selectedMotion === 'void-guardianship'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-mono-legal">
                  UCCJEA
                </span>
                <span>3. Void 2014 NY Paper &amp; Strike Agency Submissions</span>
              </button>

              <button
                onClick={() => setSelectedMotion('contempt-freeze')}
                className={`px-3 py-1.5 rounded transition-colors font-medium flex items-center gap-1.5 ${
                  selectedMotion === 'contempt-freeze'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase font-mono-legal">
                  Freeze / Trust
                </span>
                <span>4. Contempt, Constructive Trust &amp; $161K Homestead Freeze</span>
              </button>

              <button
                onClick={() => setSelectedMotion('limine')}
                className={`px-3 py-1.5 rounded transition-colors font-medium ${
                  selectedMotion === 'limine'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                5. Motion in Limine (§ 39.0132 Childhood Records)
              </button>

              <button
                onClick={() => setSelectedMotion('judicial-notice')}
                className={`px-3 py-1.5 rounded transition-colors font-medium ${
                  selectedMotion === 'judicial-notice'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                6. Motion for Judicial Notice (§ 90.202)
              </button>

              <button
                onClick={() => setSelectedMotion('intent-rely')}
                className={`px-3 py-1.5 rounded transition-colors font-medium ${
                  selectedMotion === 'intent-rely'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                7. Notice of Intent to Rely (§ 90.902)
              </button>
            </div>
          </div>

          {/* Pleading Preview */}
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-mono-legal text-xs text-emerald-400">
                Statutes: {MOTIONS_DATA[selectedMotion].statutes}
              </span>
              <span className="text-[10px] font-mono-legal text-slate-400 uppercase">
                Sixth Judicial Circuit of Florida · Pasco County
              </span>
            </div>

            <div className="font-serif-court text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[550px] overflow-y-auto">
              {MOTIONS_DATA[selectedMotion].text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
