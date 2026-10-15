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
  Printer,
  Download,
  ExternalLink,
  Globe,
  Landmark,
  BookOpen,
  Compass,
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
  const [copiedExhibitText, setCopiedExhibitText] = useState(false);
  const [copiedStatutoryProffer, setCopiedStatutoryProffer] = useState(false);
  const [copiedCriterionId, setCopiedCriterionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pillars' | 'statute-criteria' | 'dcf-timeline' | 'victim-records-legal' | 'court-exhibit-a'>('pillars');
  const [selectedStatuteJurisdiction, setSelectedStatuteJurisdiction] = useState<'all' | 'fl' | 'ky' | 'intl'>('all');

  const handlePrintExhibitA = () => {
    setActiveTab('court-exhibit-a');
    setTimeout(() => {
      window.print();
    }, 150);
  };

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

  const handleCopyStatutoryProffer = () => {
    const text = `TRI-JURISDICTIONAL STATUTORY PROFFER: EVIDENTIARY RELEVANCE OF MOTHER'S ACADEMIC EXCELLENCE & NATIONAL HONOR SOCIETY CREDENTIALS (IR-030, IR-030A, IR-030B)
CASE NO.: 2020-DP-000113 · SIXTH JUDICIAL CIRCUIT, PASCO COUNTY, FLORIDA
MATTER: TIFFANY RENEA GREENE (PETITIONER/MOTHER) v. ERIC JOSHUA GREENE (RESPONDENT/FATHER)

I. FLORIDA STATUTES § 61.13(3) — BEST INTERESTS OF THE CHILD
1. Moral Fitness of the Parents (Fla. Stat. § 61.13(3)(f)):
   - Certified Exhibits: Liberty University Official Transcript (IR-030); Omega Nu Lambda National Honor Society Certificate of Induction (IR-030A); Order of the Sword & Shield / Omicron Sigma Sigma Certificate of Induction (IR-030B).
   - Factual Record: Petitioner maintains an unblemished 4.00 Cumulative GPA across 88 semester credits in Criminal Justice studies (Major: Criminal Psychology, Government; Minor: Public Administration), earning consecutive Dean's List honors (Spring & Summer 2026). Inducted into two national honor societies dedicated to collegiate excellence and criminal justice/homeland security ethics (Motto: "Ex Scientia Pax").
   - Legal Relevance: Under Florida law, moral fitness encompasses ethical character, personal discipline, respect for law, and constructive modeling for minor children. This objective institutional proof completely demolishes opposing party's unsubstantiated social media smears.

2. Capacity to Provide for Child's Needs as Opposed to Parental Desires (Fla. Stat. § 61.13(3)(c)):
   - Certified Exhibits: IR-030, TRG-0016 (FL DOR Child Support Arrears), TRG-0023 (HUD-1 Homestead Settlement).
   - Factual Record: While Respondent paid $0.00 in child support across seven years and secretly liquidated $161,280.40 from marital homestead equity, Petitioner dedicated her efforts to earning a professional Bachelor of Science degree to establish permanent economic self-sufficiency and developmental stability for her minor children.

3. Home, School, Community Record & Academic Mentorship (Fla. Stat. § 61.13(3)(h) & (j)):
   - Certified Exhibits: IR-030, TRG-0024 (Special Needs Record).
   - Factual Record: Petitioner applies her upper-division academic training in Juvenile Justice, Crisis Intervention, and Educational Psychology to provide daily structured routines and advocacy for special needs children Kayleen and Hunter (autism spectrum) and Emmalynn (legal blindness).

4. Protective Parenting vs. Domestic Violence (Fla. Stat. § 61.13(3)(m)):
   - Certified Exhibits: IR-030, TRG-0013 (PSO Battery Arrest #19-014214), TRG-0014 (PSO Felony Handgun Assault #19-045997).
   - Factual Record: Petitioner accomplished this unblemished 4.0 GPA while escaping and prosecuting Respondent's armed domestic violence, demonstrating extraordinary personal resilience and protective maternal capacity.

II. KENTUCKY REVISED STATUTES (KRS) — CUSTODY & UCCJEA (FLOYD COUNTY DEFENSE)
1. Best Interests & Custodial Character (KRS § 403.270(2) & (3)):
   - Under Kentucky law, custody is governed by the child's best interests. KRS § 403.270(3) explicitly mandates: "The court shall not consider conduct of a proposed custodian that does not affect his relationship to the child." Petitioner's unblemished academic records prove exemplary custodial character, whereas Respondent's verified domestic battery statutorily disqualifies him from primary custody under KRS § 403.270(2)(f).

2. Mandatory UCCJEA Jurisdiction Bar for Unjustifiable Conduct (KRS § 403.836):
   - Under KRS § 403.836, Kentucky courts MUST decline jurisdiction where a parent seeking relief has engaged in unjustifiable conduct (retaining children to evade sister-state proceedings). Florida retains exclusive continuing jurisdiction as the established home state under KRS § 403.822 and Fla. Stat. § 61.515.

III. INTERNATIONAL & TRANSNATIONAL LAW (HAGUE CONVENTION, UCCJEA § 61.506, PKPA)
1. 1980 Hague Convention on Civil Aspects of International Child Abduction (22 U.S.C. §§ 9001 et seq.):
   - Articles 3, 12, & 13 protect the habitual residence of minor children. Respondent's prior scheme transporting the family to Mexico, confiscating travel documents, and abandoning Mother and children across an international border constitutes an aggravated wrongful removal and breach of custody under international treaties. Habitual residence remains Florida.

2. Transnational UCCJEA (Fla. Stat. § 61.506) & Federal PKPA (28 U.S.C. § 1738A):
   - Florida courts treat foreign countries as U.S. states under Fla. Stat. § 61.506, preventing jurisdictional manipulation across international borders. The Federal Parental Kidnapping Prevention Act mandates full faith and credit to Florida's home state proceedings, foreclosing any interstate or international jurisdictional challenge.`;

    navigator.clipboard.writeText(text);
    setCopiedStatutoryProffer(true);
    setTimeout(() => setCopiedStatutoryProffer(false), 2000);
  };

  const handleCopyIndividualCriterion = (crit: typeof STATUTORY_CRITERIA[0]) => {
    const text = `STATUTORY CRITERION: ${crit.title} (${crit.statuteCitation})
JURISDICTION: ${crit.jurisdictionName}
STATUTORY RULE:
${crit.statutoryRule}

CERTIFIED ACADEMIC RECORD EVIDENCE (EXHIBITS: ${crit.exhibits.join(', ')}):
${crit.academicEvidence}

COURTROOM BENCH PROFFER:
${crit.benchProffer}

PROBATIVE EVIDENTIARY IMPACT:
${crit.judicialImpact}`;

    navigator.clipboard.writeText(text);
    setCopiedCriterionId(crit.id);
    setTimeout(() => setCopiedCriterionId(null), 2000);
  };

  const STATUTORY_CRITERIA = [
    {
      id: 'fl-61-13-f',
      jurisdiction: 'fl' as const,
      jurisdictionBadge: 'Florida § 61.13(3)(f)',
      jurisdictionName: 'Florida Sixth Judicial Circuit (Pasco County)',
      statuteCitation: 'Fla. Stat. § 61.13(3)(f)',
      title: 'Moral Fitness of the Parents',
      statutoryRule:
        '“The moral fitness of the parents.” The court examines each parent’s ethical integrity, personal discipline, respect for law, and behavioral role-modeling for the minor children.',
      academicEvidence:
        'Liberty University Official Academic Transcript (IR-030) verifying an unblemished 4.00 Cumulative GPA across 88 semester credits; consecutive Dean’s List honors (Spring & Summer 2026); induction into Omega Nu Lambda National Honor Society for Online Students (IR-030A); and induction into Omicron Sigma Sigma / Order of the Sword & Shield National Honor Society for Criminal Justice & Homeland Security (IR-030B; Motto: “Ex Scientia Pax”).',
      exhibits: ['IR-030', 'IR-030A', 'IR-030B'],
      benchProffer:
        '“Your Honor, under Florida Statute § 61.13(3)(f), Petitioner’s perfect 4.00 cumulative GPA in Criminal Justice studies and dual inductions into national honor societies constitute conclusive, unassailable institutional evidence of moral fitness, personal discipline, and ethical commitment to the law—demolishing Respondent’s unsubstantiated character attacks.”',
      judicialImpact:
        'Irrefutable institutional rebuttal to opposing party’s defamatory assertions on social media. Conclusively proves disciplined character, academic excellence, and adherence to public justice standards.',
    },
    {
      id: 'fl-61-13-c',
      jurisdiction: 'fl' as const,
      jurisdictionBadge: 'Florida § 61.13(3)(c)',
      jurisdictionName: 'Florida Sixth Judicial Circuit (Pasco County)',
      statuteCitation: 'Fla. Stat. § 61.13(3)(c)',
      title: 'Capacity & Disposition to Provide for Child’s Needs',
      statutoryRule:
        '“The capacity and disposition of each parent to determine, consider, and act upon the needs of the child as opposed to the needs or desires of the parent.”',
      academicEvidence:
        'Petitioner completed 88 credit hours (60 transfer credits from Ultimate Medical Academy + 28 Liberty University institutional credits) in Criminal Justice (Major: Criminal Psychology, Government; Minor: Public Administration), maintaining a 4.0 GPA while raising minor children. Contrast: Respondent Eric Greene paid $0.00 in child support in seven years and secretly liquidated $161,280.40 in homestead equity.',
      exhibits: ['IR-030', 'TRG-0016', 'TRG-0023'],
      benchProffer:
        '“Under § 61.13(3)(c), while Respondent paid zero dollars in child support over seven years and dissipated over $161,000 in marital equity, Petitioner actively earned a 4.00 GPA in Criminal Justice to build permanent economic self-sufficiency and institutional stability for her children.”',
      judicialImpact:
        'Conclusively demonstrates that Petitioner acts affirmatively upon the long-term educational and material needs of the children, establishing an independent career foundation.',
    },
    {
      id: 'fl-61-13-h-j',
      jurisdiction: 'fl' as const,
      jurisdictionBadge: 'Florida § 61.13(3)(h) & (j)',
      jurisdictionName: 'Florida Sixth Judicial Circuit (Pasco County)',
      statuteCitation: 'Fla. Stat. § 61.13(3)(h) & (j)',
      title: 'Home, School, Community Record & Academic Routine',
      statutoryRule:
        '“The home, school, and community record of the child” & “The demonstrated capacity and disposition of each parent to maintain an environment, including a reasonable routine, and to foster academic progress.”',
      academicEvidence:
        'Petitioner’s upper-division coursework includes Constitutional Criminal Procedure, Report Writing, Juvenile Justice, and Crisis Intervention. She actively supervises the educational and developmental therapies of special needs children Kayleen and Hunter (autism) and Emmalynn (complete legal blindness), directly serving as an academic role model.',
      exhibits: ['IR-030', 'TRG-0024'],
      benchProffer:
        '“Under § 61.13(3)(h) and (j), Petitioner’s academic excellence and mastery of Juvenile Justice and Crisis Intervention directly empower her to provide structured routines, homework guidance, and developmental mentorship for her special needs children.”',
      judicialImpact:
        'Establishes superior parenting capacity to foster academic achievement and emotional stability in minor children with complex developmental needs.',
    },
    {
      id: 'fl-61-13-m',
      jurisdiction: 'fl' as const,
      jurisdictionBadge: 'Florida § 61.13(3)(m)',
      jurisdictionName: 'Florida Sixth Judicial Circuit (Pasco County)',
      statuteCitation: 'Fla. Stat. § 61.13(3)(m)',
      title: 'Protective Parenting vs. Domestic Violence',
      statutoryRule:
        '“Evidence of domestic violence, sexual violence, child abuse, child abandonment, or child neglect...” Fleeing domestic violence cannot be penalized as abandonment.',
      academicEvidence:
        'Petitioner achieved consecutive Dean’s List standing and dual national honor society inductions while actively recovering from documented domestic battery (PSO Arrest #19-014214) and armed assault with a 9mm handgun (PSO Felony Report #19-045997) perpetrated by Respondent Eric Greene.',
      exhibits: ['IR-030', 'IR-030A', 'TRG-0013', 'TRG-0014'],
      benchProffer:
        '“Under § 61.13(3)(m), Petitioner’s extraordinary academic achievements while escaping and prosecuting Respondent’s armed domestic violence prove supreme personal resilience, protective commitment, and lawful parenting.”',
      judicialImpact:
        'Completely forecloses Respondent’s attempt to claim Petitioner was incapacitated or unstable following domestic violence; affirms protective mother status.',
    },
    {
      id: 'ky-403-270',
      jurisdiction: 'ky' as const,
      jurisdictionBadge: 'Kentucky KRS § 403.270',
      jurisdictionName: 'Kentucky Commonwealth / Floyd County',
      statuteCitation: 'KRS § 403.270(2) & (3)',
      title: 'Kentucky Best Interests & Custodial Character Standard',
      statutoryRule:
        'Custody determined in accordance with best interests; court evaluates interaction of child with parents, child’s adjustment to home, school, and community, and domestic violence history. KRS § 403.270(3) explicitly mandates: “The court shall not consider conduct of a proposed custodian that does not affect his relationship to the child.”',
      academicEvidence:
        'Certified transcript confirming 4.00 Cumulative GPA in B.S. Criminal Justice at Liberty University (IR-030) and inductions into Omega Nu Lambda (IR-030A) and Order of the Sword & Shield (IR-030B), verifying high ethical standing and academic leadership under Kentucky evidentiary standards.',
      exhibits: ['IR-030', 'IR-030A', 'IR-030B'],
      benchProffer:
        '“Should Respondent seek to invoke Kentucky law in Floyd County, KRS § 403.270(2) and (3) compel recognition of Petitioner’s academic excellence and clean record as conclusive proof of fitness, while Respondent’s verified domestic violence statutorily disqualifies him.”',
      judicialImpact:
        'Neutralizes any collateral attempt by Respondent to initiate bad-faith custody proceedings in Kentucky by establishing that Mother satisfies every Kentucky statutory benchmark.',
    },
    {
      id: 'ky-403-836',
      jurisdiction: 'ky' as const,
      jurisdictionBadge: 'Kentucky UCCJEA § 403.836',
      jurisdictionName: 'Kentucky Commonwealth / Interstate UCCJEA',
      statuteCitation: 'KRS § 403.822 & KRS § 403.836',
      title: 'Jurisdiction Declined by Reason of Unjustifiable Conduct',
      statutoryRule:
        'Under KRS § 403.836, a Kentucky court MUST decline jurisdiction if a person seeking to invoke its authority has engaged in unjustifiable conduct (such as wrongfully absconding with or retaining children in Kentucky to evade another state’s jurisdiction). Florida retains exclusive continuing jurisdiction under KRS § 403.822 and Fla. Stat. § 61.515.',
      academicEvidence:
        'Mother’s academic records verify continuous Florida residency and lawful online enrollment at Liberty University, while Father relocated to 16968 KY Route 122, McDowell, KY to evade Florida Sixth Judicial Circuit orders (Case #2020-DP-000113 / 2019-DR-006262).',
      exhibits: ['IR-030', 'TRG-0016', 'TRG-0017'],
      benchProffer:
        '“Pursuant to KRS § 403.836 and Florida Statute § 61.515, Florida is the child’s exclusive home state; Kentucky courts must decline any jurisdiction created through Respondent’s unjustifiable interstate flight to Floyd County.”',
      judicialImpact:
        'Enforces interstate UCCJEA jurisdictional priority, preventing forum shopping and confirming Florida Sixth Judicial Circuit’s sole authority.',
    },
    {
      id: 'intl-hague-art3',
      jurisdiction: 'intl' as const,
      jurisdictionBadge: '1980 Hague Convention Art. 3 & 12',
      jurisdictionName: 'International Child Abduction / ICARA',
      statuteCitation: '1980 Hague Convention Articles 3, 12, & 13 (22 U.S.C. §§ 9001 et seq.)',
      title: 'Wrongful Removal / Retention & Habitual Residence Protection',
      statutoryRule:
        'Protects children from wrongful cross-border removal or retention, mandating respect for habitual residence and preventing a parent from manipulating international borders to extinguish maternal custody rights.',
      academicEvidence:
        'Documented history of Respondent transporting Mother and minor children into Mexico, seizing passports and official documents, and abandoning Mother and children without funds. Mother’s subsequent Criminal Justice studies (IR-030) and Homeland Security honor society induction (IR-030B) demonstrate direct mastery of international border and custody enforcement laws.',
      exhibits: ['IR-030', 'IR-030B', 'TRG-0015', 'TRG-0017'],
      benchProffer:
        '“Under the 1980 Hague Convention and ICARA, Respondent’s transnational abandonment of the family in Mexico constitutes an aggravated wrongful breach of custody rights. Petitioner’s subsequent mastery of criminal justice and public administration proves her unwavering dedication to the rule of law.”',
      judicialImpact:
        'Frames Father’s international actions as wrongful cross-border interference, reinforcing that the children’s habitual residence never shifted from Florida.',
    },
    {
      id: 'intl-uccjea-61-506',
      jurisdiction: 'intl' as const,
      jurisdictionBadge: 'Fla. Stat. § 61.506 & PKPA',
      jurisdictionName: 'Transnational & Federal Full Faith and Credit',
      statuteCitation: 'Fla. Stat. § 61.506 · 28 U.S.C. § 1738A (PKPA) · 18 U.S.C. § 1204',
      title: 'International Application of Custody Law & Federal PKPA',
      statutoryRule:
        'Florida Statute § 61.506 mandates that Florida courts treat foreign countries as U.S. states for custody jurisdiction, barring forum shopping across borders. The Federal Parental Kidnapping Prevention Act (28 U.S.C. § 1738A) requires all sister states (including Kentucky) to accord full faith and credit to Florida decrees.',
      academicEvidence:
        'Petitioner’s Liberty University transcript (IR-030) demonstrates rigorous academic coursework in Constitutional Criminal Procedure and Judicial Process, confirming evidentiary conformity with both federal PKPA and international UCCJEA enforcement requirements.',
      exhibits: ['IR-030', 'IR-030A', 'TRG-0015'],
      benchProffer:
        '“Under Florida Statute § 61.506 and 28 U.S.C. § 1738A, Florida exercises exclusive home state authority over both interstate (Kentucky) and international dimensions. Petitioner’s verified credentials confirm complete compliance with the statutory framework.”',
      judicialImpact:
        'Precludes any multi-jurisdictional defense, empowering the presiding judge to issue definitive nationwide and international custody enforcement orders.',
    },
  ];

  const filteredStatutoryCriteria = STATUTORY_CRITERIA.filter((item) => {
    if (selectedStatuteJurisdiction === 'all') return true;
    return item.jurisdiction === selectedStatuteJurisdiction;
  });

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

        {/* Actions & View Tabs */}
        <div className="no-print flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* View Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
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
              onClick={() => setActiveTab('statute-criteria')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                activeTab === 'statute-criteria'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Statute 61.13 / KY / Int&apos;l Criteria</span>
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
            <button
              onClick={() => setActiveTab('court-exhibit-a')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                activeTab === 'court-exhibit-a'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Exhibit A (Court PDF)</span>
            </button>
          </div>

          {/* Quick Print Exhibit A Button */}
          <button
            onClick={handlePrintExhibitA}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow shrink-0"
            title="Print official Court Exhibit A (Academic & Honor Society Verification)"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Exhibit A</span>
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

                      {/* Cross-Jurisdictional Statutory Alignment Callout */}
                      <div className="pt-2 border-t border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono-legal text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Statutory Alignment · Fla. Stat. § 61.13 / KY KRS § 403 / Hague Custody</span>
                          </span>
                          <button
                            onClick={() => setActiveTab('statute-criteria')}
                            className="text-[10px] font-mono-legal text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 underline"
                          >
                            <span>Inspect Full Statutory Matrix →</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-sans">
                          <div className="p-2 bg-slate-900 rounded border border-amber-500/30 space-y-0.5">
                            <span className="text-amber-400 font-mono-legal font-bold block text-[10px]">
                              FL § 61.13(3)(f) · Moral Fitness
                            </span>
                            <span className="text-slate-300 text-[10px] leading-tight block">
                              4.00 GPA &amp; Dual National Honor Societies (IR-030A/B) definitively establish moral fitness and disciplined character.
                            </span>
                          </div>
                          <div className="p-2 bg-slate-900 rounded border border-cyan-500/30 space-y-0.5">
                            <span className="text-cyan-400 font-mono-legal font-bold block text-[10px]">
                              KY KRS § 403.836 · UCCJEA Bar
                            </span>
                            <span className="text-slate-300 text-[10px] leading-tight block">
                              Kentucky courts must decline jurisdiction due to Father&apos;s bad-faith flight; Florida retains exclusive jurisdiction.
                            </span>
                          </div>
                          <div className="p-2 bg-slate-900 rounded border border-purple-500/30 space-y-0.5">
                            <span className="text-purple-400 font-mono-legal font-bold block text-[10px]">
                              1980 Hague Conv. Art. 3/12
                            </span>
                            <span className="text-slate-300 text-[10px] leading-tight block">
                              Protects Florida habitual residence; cross-border Mexican abandonment constitutes aggravated interference.
                            </span>
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
      {/* TAB 2: MULTI-JURISDICTIONAL STATUTORY CRITERIA (FL / KY / INT) */}
      {/* ============================================================== */}
      {activeTab === 'statute-criteria' && (
        <div className="space-y-6">
          {/* Top Explanatory Banner & Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 border border-amber-500/40 rounded-xl">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-mono-legal text-xs text-amber-400 font-bold uppercase tracking-wider">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Statutory Best Interests &amp; Jurisdictional Standards</span>
                <span className="text-slate-600">·</span>
                <span className="text-emerald-400">FL § 61.13 · KY KRS § 403 · Hague / UCCJEA</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-serif-court">
                Cross-Jurisdictional Evidentiary Mapping: Academic Record &amp; National Honor Societies
              </h3>
              <p className="text-xs text-slate-300 max-w-4xl leading-relaxed">
                Objective statutory cross-examination and trial proffer demonstrating that Petitioner Tiffany Greene&apos;s unblemished academic achievements at Liberty University (4.00 GPA, 88 Credits, Dean&apos;s List) and dual national honor society inductions (IR-030, IR-030A, IR-030B) affirmatively satisfy the statutory best-interests criteria in Florida and Kentucky, while legally defeating opposing party&apos;s forum manipulation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleCopyStatutoryProffer}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg text-xs transition-colors shadow"
                title="Copy formal trial proffer to clipboard"
              >
                {copiedStatutoryProffer ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedStatutoryProffer ? 'Copied Proffer' : 'Copy Motion Proffer'}</span>
              </button>
              <button
                onClick={handlePrintExhibitA}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow"
                title="Print court-ready Exhibit A dossier"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Exhibit A</span>
              </button>
            </div>
          </div>

          {/* Academic Evidence Anchor Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-legal text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Exhibit IR-030</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-legal bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  4.00 Cumulative GPA
                </span>
              </div>
              <div className="font-serif-court font-bold text-xs text-slate-100">
                Liberty University Official Academic Transcript
              </div>
              <div className="text-[11px] text-slate-300">
                88.00 total earned credits (60 transfer + 28 Liberty institutional); B.S. Criminal Justice (Major: Criminal Psychology, Government; Minor: Public Admin). Consecutive Dean&apos;s List (Spring &amp; Summer 2026).
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-legal text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Exhibit IR-030A</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-legal bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  Inducted 07/17/2026
                </span>
              </div>
              <div className="font-serif-court font-bold text-xs text-slate-100">
                Omega Nu Lambda National Honor Society
              </div>
              <div className="text-[11px] text-slate-300">
                Alpha Chapter at Liberty University. Conferred for academic excellence, intellectual integrity, and personal discipline in collegiate studies.
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-cyan-500/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-legal text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Exhibit IR-030B</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-legal bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                  Inducted 05/05/2026
                </span>
              </div>
              <div className="font-serif-court font-bold text-xs text-slate-100">
                Order of the Sword &amp; Shield (Omicron Sigma Sigma)
              </div>
              <div className="text-[11px] text-slate-300">
                National Honor Society for Criminal Justice, Homeland Security, and Intelligence disciplines. National Motto: &quot;Ex Scientia Pax&quot; (Out of Knowledge, Peace).
              </div>
            </div>
          </div>

          {/* Jurisdiction Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-500 font-mono-legal text-[11px] px-2">Filter Criterion:</span>
            <button
              onClick={() => setSelectedStatuteJurisdiction('all')}
              className={`px-3 py-1 rounded transition-colors ${
                selectedStatuteJurisdiction === 'all'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Jurisdictions ({STATUTORY_CRITERIA.length})
            </button>
            <button
              onClick={() => setSelectedStatuteJurisdiction('fl')}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
                selectedStatuteJurisdiction === 'fl'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Florida § 61.13(3) (4 Criteria)</span>
            </button>
            <button
              onClick={() => setSelectedStatuteJurisdiction('ky')}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
                selectedStatuteJurisdiction === 'ky'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>Kentucky KRS § 403 (2 Criteria)</span>
            </button>
            <button
              onClick={() => setSelectedStatuteJurisdiction('intl')}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
                selectedStatuteJurisdiction === 'intl'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>International &amp; Transnational (2 Criteria)</span>
            </button>
          </div>

          {/* Detailed Criteria Cards Grid */}
          <div className="space-y-4">
            {filteredStatutoryCriteria.map((crit) => {
              const isFL = crit.jurisdiction === 'fl';
              const isKY = crit.jurisdiction === 'ky';
              const isIntl = crit.jurisdiction === 'intl';

              return (
                <div
                  key={crit.id}
                  className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-xl hover:border-slate-700 transition-colors"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`font-mono-legal font-bold text-xs px-2.5 py-0.5 rounded border ${
                            isFL
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              : isKY
                              ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                              : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                          }`}
                        >
                          {crit.jurisdictionBadge}
                        </span>
                        <span className="text-xs font-mono-legal text-slate-400">{crit.jurisdictionName}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-100 font-serif-court">
                        {crit.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleCopyIndividualCriterion(crit)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
                        title="Copy this statutory criterion proffer"
                      >
                        {copiedCriterionId === crit.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedCriterionId === crit.id ? 'Copied Proffer' : 'Copy Proffer'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Statutory Rule */}
                  <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 space-y-1 text-xs">
                    <span className="font-mono-legal text-[10px] text-amber-400 uppercase tracking-wider block font-bold">
                      STATUTORY STANDARD &amp; MANDATE ({crit.statuteCitation}):
                    </span>
                    <p className="text-slate-300 leading-relaxed font-serif-court italic">
                      {crit.statutoryRule}
                    </p>
                  </div>

                  {/* Certified Academic Evidence Mapping */}
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-emerald-500/30 space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                      <span className="font-mono-legal text-[10px] text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Certified Academic Record Proof (Exhibits: {crit.exhibits.join(', ')})</span>
                      </span>
                      <span className="text-[10px] font-mono-legal text-slate-400">
                        Liberty University 4.0 GPA · Dean&apos;s List
                      </span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-sans">
                      {crit.academicEvidence}
                    </p>
                  </div>

                  {/* Courtroom Bench Proffer */}
                  <div className="p-3.5 bg-amber-950/20 rounded-lg border border-amber-500/40 space-y-1.5 text-xs font-serif-court">
                    <div className="flex items-center gap-1.5 font-sans font-bold text-amber-400 text-[10px] uppercase font-mono-legal tracking-wider">
                      <Scale className="w-3.5 h-3.5 text-amber-400" />
                      <span>Formal Courtroom Bench Proffer (Scripted Trial Presentation):</span>
                    </div>
                    <p className="text-amber-100/90 leading-relaxed italic text-xs sm:text-sm">
                      {crit.benchProffer}
                    </p>
                  </div>

                  {/* Judicial Probative Value */}
                  <div className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
                    <span className="font-mono-legal text-[10px] text-cyan-400 uppercase font-bold shrink-0 mt-0.5">
                      JUDICIAL IMPACT:
                    </span>
                    <span className="leading-relaxed font-sans">{crit.judicialImpact}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Statutory Comparison Matrix Table */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900 shadow-xl">
            <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono-legal font-bold text-slate-200 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Summary Tri-Jurisdictional Cross-Examination &amp; Evidentiary Reference Table</span>
              </span>
              <span className="text-[10px] font-mono-legal text-slate-500">
                Florida Sixth Judicial Circuit Case No. 2020-DP-000113
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-slate-800">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono-legal text-[10px]">
                  <tr>
                    <th className="px-3.5 py-3 w-40">Statute &amp; Jurisdiction</th>
                    <th className="px-3.5 py-3 w-44">Legal Requirement</th>
                    <th className="px-3.5 py-3 min-w-[200px]">Mother&apos;s Academic Record (IR-030/A/B)</th>
                    <th className="px-3.5 py-3 min-w-[180px]">Opposing Deficiency / Pretext</th>
                    <th className="px-3.5 py-3 w-48">Court Finding Requested</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
                  <tr className="hover:bg-slate-850/60 transition-colors">
                    <td className="px-3.5 py-2.5 font-mono-legal text-amber-400 font-bold align-top">
                      Fla. Stat. § 61.13(3)(f)
                    </td>
                    <td className="px-3.5 py-2.5 align-top font-medium text-slate-200">
                      Moral fitness, ethical integrity, personal discipline
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-slate-300">
                      Unblemished 4.00 GPA in Criminal Justice, consecutive Dean&apos;s List, Omega Nu Lambda &amp; Order of the Sword &amp; Shield inductions.
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-rose-300 font-sans">
                      Baseless social media defamation claiming unfitness and weaponizing 25-year-old childhood victim records.
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-emerald-300 font-medium">
                      Finding of superior moral fitness and ethical character.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-850/60 transition-colors">
                    <td className="px-3.5 py-2.5 font-mono-legal text-amber-400 font-bold align-top">
                      Fla. Stat. § 61.13(3)(c)
                    </td>
                    <td className="px-3.5 py-2.5 align-top font-medium text-slate-200">
                      Capacity to provide for children&apos;s needs vs. parental desires
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-slate-300">
                      88 credit hours completed toward B.S. degree to build permanent career and independent financial security.
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-rose-300 font-sans">
                      Father paid $0.00 child support in 7 years; liquidated $161,280.40 from marital home for personal land purchase.
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-emerald-300 font-medium">
                      Finding that Mother prioritizes children&apos;s long-term welfare.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-850/60 transition-colors">
                    <td className="px-3.5 py-2.5 font-mono-legal text-cyan-400 font-bold align-top">
                      KY KRS § 403.270(2)&amp;(3)
                    </td>
                    <td className="px-3.5 py-2.5 align-top font-medium text-slate-200">
                      Kentucky best interests &amp; custodial character standard
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-slate-300">
                      Liberty University certified transcripts confirm academic excellence and clean adult record under Kentucky law.
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-rose-300 font-sans">
                      Father&apos;s verified domestic battery and handgun assaults disqualify him from custody preference.
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-emerald-300 font-medium">
                      Finding that Mother satisfies all Kentucky custody criteria.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-850/60 transition-colors">
                    <td className="px-3.5 py-2.5 font-mono-legal text-cyan-400 font-bold align-top">
                      KY KRS § 403.836
                    </td>
                    <td className="px-3.5 py-2.5 align-top font-medium text-slate-200">
                      UCCJEA mandatory jurisdiction decline for unjustifiable conduct
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-slate-300">
                      Mother maintains Florida residence and court participation while studying online at Liberty University.
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-rose-300 font-sans">
                      Father fled to Floyd County, KY to evade Florida court orders and domestic violence prosecution.
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-emerald-300 font-medium">
                      Mandatory order barring Kentucky courts from modifying FL decrees.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-850/60 transition-colors">
                    <td className="px-3.5 py-2.5 font-mono-legal text-purple-400 font-bold align-top">
                      1980 Hague Conv. Art. 3/12
                    </td>
                    <td className="px-3.5 py-2.5 align-top font-medium text-slate-200">
                      Protection of habitual residence against cross-border removal
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-slate-300">
                      Mother mastered Criminal Justice &amp; Homeland Security ethics (IR-030/B) to enforce lawful international child rights.
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-rose-300 font-sans">
                      Father orchestrated Mexican trip, confiscated passports, and abandoned Mother and minor children across borders.
                    </td>
                    <td className="px-3.5 py-2.5 align-top text-emerald-300 font-medium">
                      Finding that international displacement was wrongful parental breach.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: COMPARATIVE DCF TIMELINE & AGENCY AUDIT                 */}
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

      {/* ============================================================== */}
      {/* TAB 4: COURT EXHIBIT A (FORMAL PRINTABLE PDF DOSSIER)         */}
      {/* ============================================================== */}
      {activeTab === 'court-exhibit-a' && (
        <div className="space-y-6">
          {/* Action Bar (Hidden in Print) */}
          <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 font-mono-legal text-amber-400 font-bold uppercase text-[11px]">
                <Scale className="w-3.5 h-3.5" />
                <span>Court-Ready Exhibit Layout · Florida Sixth Judicial Circuit</span>
              </div>
              <p className="text-slate-300">
                Formatted for filing or direct bench submission under Florida Statutes § 61.13 and Florida Evidence Code § 90.902. Use your browser&apos;s Print / Save as PDF dialog.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  const exhibitText = `IN THE CIRCUIT COURT OF THE SIXTH JUDICIAL CIRCUIT
IN AND FOR PASCO COUNTY, FLORIDA
FAMILY LAW / DOMESTIC RELATIONS DIVISION
CASE NO.: 2020-DP-000113

TIFFANY RENEA GREENE,
    Petitioner / Mother,
v.
ERIC JOSHUA GREENE,
    Respondent / Father.
________________________________________/

PETITIONER'S EXHIBIT A: CERTIFIED ACADEMIC TRANSCRIPT & DUAL NATIONAL HONOR SOCIETY VERIFICATION DOSSIER
(SUBMITTED PURSUANT TO FLA. STAT. § 61.13(3)(c) & (f) AND FLA. STAT. § 90.902)

OFFICIAL DOCUMENT MANIFEST:
• Item 1 (IR-030): Liberty University Certified Academic Transcript (B.S. Criminal Justice, 88 Credits, 4.00 Cumulative GPA, Dean's List)
• Item 2 (IR-030A): Omega Nu Lambda National Honor Society Official Certificate of Induction (Liberty University Alpha Chapter · July 17, 2026)
• Item 3 (IR-030B): Omicron Sigma Sigma (Order of the Sword & Shield) National Honor Society Official Certificate of Membership (May 5, 2026)`;
                  navigator.clipboard.writeText(exhibitText);
                  setCopiedExhibitText(true);
                  setTimeout(() => setCopiedExhibitText(false), 2000);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-lg text-xs transition-colors"
              >
                {copiedExhibitText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedExhibitText ? 'Copied' : 'Copy Exhibit Caption'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>

          {/* Formal Court Exhibit Document */}
          <div className="court-exhibit-sheet p-8 sm:p-12 bg-white text-black font-serif-court rounded-xl border border-slate-300 shadow-2xl space-y-6">
            {/* Header Stamp */}
            <div className="flex items-center justify-between border-b-2 border-black pb-3 text-xs font-mono-legal">
              <span className="font-bold tracking-wider">FILED: PASCO COUNTY, FLORIDA</span>
              <span className="bg-black text-white px-2 py-0.5 font-bold uppercase tracking-wider">
                PETITIONER&apos;S EXHIBIT A
              </span>
              <span>BATES: TRG-IR-030 – TRG-IR-030B</span>
            </div>

            {/* Circuit Court Formal Caption */}
            <div className="text-center space-y-1 pt-2">
              <div className="text-xs uppercase tracking-widest font-bold">
                IN THE CIRCUIT COURT OF THE SIXTH JUDICIAL CIRCUIT
              </div>
              <div className="text-xs uppercase tracking-wider">
                IN AND FOR PASCO COUNTY, FLORIDA · FAMILY LAW DIVISION
              </div>
              <div className="text-xs font-mono-legal mt-1">
                CASE NO.: <strong>2020-DP-000113</strong> · SECTION: Family Division
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-b border-black py-3 text-xs">
              <div>
                <div className="font-bold">TIFFANY RENEA GREENE,</div>
                <div className="italic ml-4">Petitioner / Mother,</div>
                <div className="my-1 font-bold">v.</div>
                <div className="font-bold">ERIC JOSHUA GREENE,</div>
                <div className="italic ml-4">Respondent / Father.</div>
              </div>
              <div className="text-right text-[11px] font-mono-legal flex flex-col justify-center space-y-0.5">
                <div className="font-bold uppercase">PETITIONER&apos;S COMPREHENSIVE EXHIBIT A</div>
                <div>ACADEMIC TRANSCRIPT &amp; HONOR SOCIETY DOSSIER</div>
                <div>STATUTORY BASIS: FLA. STAT. § 61.13(3)(c) &amp; (f)</div>
                <div>AUTHENTICATION: FRE 902 / FLA. STAT. § 90.902</div>
              </div>
            </div>

            {/* Document Title */}
            <div className="text-center pt-2 pb-1">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wide">
                PETITIONER&apos;S EXHIBIT A: CERTIFIED ACADEMIC TRANSCRIPT &amp; DUAL NATIONAL HONOR SOCIETY INDUCTION DOSSIER
              </h2>
              <p className="text-xs italic text-slate-700 mt-1 font-sans">
                Offered in affirmative proof of maternal stability, intellectual dedication, moral character, and educational leadership.
              </p>
            </div>

            {/* Exhibit Manifest Summary */}
            <div className="p-3 bg-slate-50 border border-slate-300 rounded text-xs space-y-1 font-sans">
              <div className="font-bold font-mono-legal text-[11px] uppercase tracking-wider text-black">
                Certified Evidentiary Manifest:
              </div>
              <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
                <li>
                  <strong>Exhibit A-1 (IR-030):</strong> Liberty University Official Academic Transcript (88.00 Earned Credits, 4.00 Cumulative GPA, Consecutive Dean&apos;s List Honors).
                </li>
                <li>
                  <strong>Exhibit A-2 (IR-030A):</strong> Omega Nu Lambda National Honor Society Certificate of Induction (Liberty University, Alpha Chapter · Effective July 17, 2026).
                </li>
                <li>
                  <strong>Exhibit A-3 (IR-030B):</strong> Omicron Sigma Sigma (Order of the Sword &amp; Shield) National Academic &amp; Professional Honor Society Certificate (May 5, 2026 · Motto: <em>&quot;Ex Scientia Pax&quot;</em>).
                </li>
              </ul>
            </div>

            {/* SECTION 1: LIBERTY UNIVERSITY TRANSCRIPT VERIFICATION */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold font-mono-legal uppercase border-b border-black pb-1 flex items-center justify-between">
                <span>SECTION 1: LIBERTY UNIVERSITY OFFICIAL ACADEMIC TRANSCRIPT (IR-030)</span>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.2 rounded font-sans">F.R.E. 902 Verified</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans">
                <div className="p-2 border border-slate-300 bg-slate-50">
                  <span className="text-[10px] text-slate-600 block">Student:</span>
                  <strong>Mrs. Tiffany Renea Greene</strong>
                  <span className="text-[10px] text-slate-500 block">DOB: Sep 24, 1993</span>
                </div>
                <div className="p-2 border border-slate-300 bg-slate-50">
                  <span className="text-[10px] text-slate-600 block">Degree &amp; Program:</span>
                  <strong>Bachelor of Science</strong>
                  <span className="text-[10px] text-slate-700 block">Major: Criminal Justice</span>
                </div>
                <div className="p-2 border border-slate-300 bg-slate-50">
                  <span className="text-[10px] text-slate-600 block">Total Earned Credits:</span>
                  <strong className="text-black">88.00 Semester Hours</strong>
                  <span className="text-[10px] text-slate-600 block">(60 Transfer + 28 LU)</span>
                </div>
                <div className="p-2 border border-slate-300 bg-slate-50">
                  <span className="text-[10px] text-slate-600 block">Cumulative GPA:</span>
                  <strong className="text-black">4.00 / 4.00</strong>
                  <span className="text-[10px] text-slate-700 block">Standing: Dean&apos;s List</span>
                </div>
              </div>

              {/* Course Detail Breakdown Table */}
              <div className="border border-slate-300 overflow-hidden text-[11px] font-sans">
                <table className="w-full text-left divide-y divide-slate-300">
                  <thead className="bg-slate-100 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2 w-20">Term</th>
                      <th className="p-2 w-24">Course ID</th>
                      <th className="p-2">Course Title</th>
                      <th className="p-2 w-16 text-center">Credits</th>
                      <th className="p-2 w-16 text-center">Grade</th>
                      <th className="p-2 w-24 text-center">Standing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2 font-mono-legal text-[10px] align-top" rowSpan={5}>Spring 2026</td>
                      <td className="p-1.5 font-mono-legal font-bold">BIBL 104</td>
                      <td className="p-1.5">Survey of Old &amp; New Testament</td>
                      <td className="p-1.5 text-center">4.00</td>
                      <td className="p-1.5 text-center font-bold">A</td>
                      <td className="p-1.5 text-center text-[10px] font-semibold text-slate-700" rowSpan={5}>
                        Dean&apos;s List · 4.00
                      </td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-mono-legal font-bold">CJUS 200</td>
                      <td className="p-1.5">Introduction to Criminal Justice</td>
                      <td className="p-1.5 text-center">3.00</td>
                      <td className="p-1.5 text-center font-bold">A</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-mono-legal font-bold">GOVT 200</td>
                      <td className="p-1.5">Constitutional Government &amp; Free Enterprise</td>
                      <td className="p-1.5 text-center">3.00</td>
                      <td className="p-1.5 text-center font-bold">A</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-mono-legal font-bold">GOVT 220</td>
                      <td className="p-1.5">American Government</td>
                      <td className="p-1.5 text-center">3.00</td>
                      <td className="p-1.5 text-center font-bold">A</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-mono-legal font-bold">WRSP 101</td>
                      <td className="p-1.5">Introduction to Worship Studies</td>
                      <td className="p-1.5 text-center">3.00</td>
                      <td className="p-1.5 text-center font-bold">A</td>
                    </tr>

                    <tr className="border-t-2 border-slate-300">
                      <td className="p-2 font-mono-legal text-[10px] align-top" rowSpan={4}>Summer 2026</td>
                      <td className="p-1.5 font-mono-legal font-bold">CJUS 230</td>
                      <td className="p-1.5">Criminal Justice Writing &amp; Research</td>
                      <td className="p-1.5 text-center">3.00</td>
                      <td className="p-1.5 text-center font-bold">A</td>
                      <td className="p-1.5 text-center text-[10px] font-semibold text-slate-700" rowSpan={4}>
                        Dean&apos;s List · 4.00
                      </td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-mono-legal font-bold">HIUS 221</td>
                      <td className="p-1.5">Survey of American History I</td>
                      <td className="p-1.5 text-center">3.00</td>
                      <td className="p-1.5 text-center font-bold">A</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-mono-legal font-bold">PADM 360</td>
                      <td className="p-1.5">Introduction to Public Administration</td>
                      <td className="p-1.5 text-center">3.00</td>
                      <td className="p-1.5 text-center font-bold">A</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 font-mono-legal font-bold">PADM 462</td>
                      <td className="p-1.5">Public Finance &amp; Budgeting</td>
                      <td className="p-1.5 text-center">3.00</td>
                      <td className="p-1.5 text-center font-bold">A</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-[10px] text-slate-600 font-sans">
                <strong>In-Progress Upper-Division Curriculum:</strong> Constitutional Criminal Procedure (CJUS 410), Criminal Justice Report Writing (CJUS 231), Judicial Process (CJUS 330), Juvenile Justice (CJUS 310), Criminal Law (CJUS 400), Advanced Public Administration (PADM 475), and Crisis Intervention (PSYC 317).
              </div>
            </div>

            {/* SECTION 2 & 3: DUAL NATIONAL HONOR SOCIETIES */}
            <div className="space-y-3 pt-2 page-break">
              <h3 className="text-xs font-bold font-mono-legal uppercase border-b border-black pb-1">
                SECTION 2 &amp; 3: DUAL NATIONAL HONOR SOCIETY INDUCTIONS (IR-030A &amp; IR-030B)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                {/* Omega Nu Lambda */}
                <div className="p-4 border-2 border-black rounded bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between border-b border-black pb-1.5">
                    <span className="font-bold text-xs uppercase tracking-wider">OMEGA NU LAMBDA</span>
                    <span className="text-[10px] font-mono-legal font-bold">EXHIBIT A-2 · IR-030A</span>
                  </div>
                  <div className="font-serif-court text-xs italic text-center py-1">
                    National Honor Society for Online Students
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    Certifies that <strong>Tiffany Renea Greene</strong> is an inducted member of Omega Nu Lambda National Honor Society as confirmed by <strong>Liberty University, Alpha Chapter</strong>, granted all honors, benefits, and privileges effective:
                  </div>
                  <div className="text-center font-mono-legal font-bold text-xs pt-1 border-t border-slate-300">
                    17th Day of July, 2026
                  </div>
                  <div className="text-[9px] text-slate-600 text-center">
                    Signed by Advisory Chair &amp; Founder · Attested under Seal
                  </div>
                </div>

                {/* Order of the Sword & Shield */}
                <div className="p-4 border-2 border-black rounded bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between border-b border-black pb-1.5">
                    <span className="font-bold text-xs uppercase tracking-wider">OMICRON SIGMA SIGMA</span>
                    <span className="text-[10px] font-mono-legal font-bold">EXHIBIT A-3 · IR-030B</span>
                  </div>
                  <div className="font-serif-court text-xs italic text-center py-1">
                    Order of the Sword &amp; Shield Academic &amp; Professional Honor Society
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    Certifies that <strong>Tiffany Renea Greene</strong> has complied with all requirements for membership in the premier honor society for Criminal Justice &amp; Homeland Security.
                  </div>
                  <div className="text-center font-serif-court font-bold text-xs pt-1 border-t border-slate-300">
                    National Motto: &quot;Ex Scientia Pax&quot; · May 5, 2026
                  </div>
                  <div className="text-[9px] text-slate-600 text-center">
                    Executive National Directorate · Official National Seal Attached
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: TRI-JURISDICTIONAL STATUTORY RELEVANCE UNDER FLORIDA STATUTES § 61.13, KENTUCKY KRS § 403 & INTERNATIONAL LAW */}
            <div className="space-y-3 pt-3 text-xs font-serif-court leading-relaxed border-t-2 border-black">
              <div className="flex items-center justify-between border-b border-black pb-1">
                <h3 className="font-bold font-sans uppercase text-xs tracking-wider">
                  SECTION 4: TRI-JURISDICTIONAL STATUTORY RELEVANCE (FLA. STAT. § 61.13 · KY KRS § 403 · HAGUE / UCCJEA)
                </h3>
                <span className="font-mono-legal text-[10px] text-slate-700 uppercase">SUBMITTED FOR BENCH ADJUDICATION</span>
              </div>

              {/* Part A: Florida Statutes § 61.13 */}
              <div className="space-y-1.5">
                <div className="font-bold font-sans text-[11px] uppercase tracking-wide bg-slate-100 p-1 border-l-2 border-black">
                  PART A: FLORIDA STATUTES § 61.13(3) BEST INTERESTS CRITERIA
                </div>
                <p>
                  <strong>1. Moral Fitness of the Parents (Fla. Stat. § 61.13(3)(f)):</strong> Petitioner&apos;s unblemished academic excellence at Liberty University (perfect 4.00 Cumulative GPA across 88 semester credits, consecutive Dean&apos;s List honors) and dual induction into national honor societies (Omega Nu Lambda, IR-030A; Order of the Sword &amp; Shield, IR-030B) conclusively establishes extraordinary moral fitness, personal discipline, and ethical leadership, thoroughly refuting unsubstantiated opposing defamation.
                </p>
                <p>
                  <strong>2. Capacity to Provide for the Child&apos;s Educational &amp; Material Needs (§ 61.13(3)(c)):</strong> While Respondent Eric Greene paid $0.00 in child support over seven years and secretly liquidated $161,280.40 from marital homestead equity, Petitioner actively advanced her higher education in Criminal Justice and Public Administration to establish permanent, independent career stability and economic self-sufficiency for her children.
                </p>
                <p>
                  <strong>3. Home, School, Community Record &amp; Educational Routine (§ 61.13(3)(h) &amp; (j)):</strong> Petitioner&apos;s upper-division studies in Juvenile Justice and Educational Psychology directly reinforce her proven capacity to maintain constructive daily routines and educational advocacy for her special needs children Kayleen and Hunter (autism) and Emmalynn (legal blindness).
                </p>
                <p>
                  <strong>4. Protective Action vs. Domestic Violence (§ 61.13(3)(m)):</strong> Petitioner accomplished this unblemished 4.0 academic record while recovering from documented domestic battery and armed handgun assaults perpetrated by Respondent (Pasco County Sheriff&apos;s Office Reports #19-014214 &amp; #19-045997), proving supreme resilience and protective parental devotion.
                </p>
              </div>

              {/* Part B: Kentucky Revised Statutes KRS § 403 */}
              <div className="space-y-1.5 pt-1">
                <div className="font-bold font-sans text-[11px] uppercase tracking-wide bg-slate-100 p-1 border-l-2 border-black">
                  PART B: KENTUCKY REVISED STATUTES KRS § 403.270 &amp; UCCJEA JURISDICTIONAL BAR
                </div>
                <p>
                  <strong>1. Kentucky Best Interests &amp; Character Standard (KRS § 403.270(2) &amp; (3)):</strong> Under Kentucky law, custody is governed by the child&apos;s best interests, and KRS § 403.270(3) explicitly mandates that &quot;the court shall not consider conduct of a proposed custodian that does not affect his relationship to the child.&quot; Petitioner&apos;s academic excellence establishes superior custodial character, whereas Respondent&apos;s verified domestic violence history statutorily bars him from primary custody.
                </p>
                <p>
                  <strong>2. Mandatory UCCJEA Jurisdiction Bar for Unjustifiable Conduct (KRS § 403.836):</strong> Should Respondent attempt to initiate collateral proceedings in Floyd County, Kentucky, KRS § 403.836 mandates that Kentucky courts decline jurisdiction obtained through unjustifiable conduct (wrongfully retaining children across state lines). Florida maintains exclusive continuing jurisdiction as the established home state under KRS § 403.822 and Fla. Stat. § 61.515.
                </p>
              </div>

              {/* Part C: International & Federal Law */}
              <div className="space-y-1.5 pt-1">
                <div className="font-bold font-sans text-[11px] uppercase tracking-wide bg-slate-100 p-1 border-l-2 border-black">
                  PART C: INTERNATIONAL HAGUE CONVENTION, UCCJEA § 61.506 &amp; FEDERAL PKPA
                </div>
                <p>
                  <strong>1. 1980 Hague Convention on Civil Aspects of International Child Abduction (22 U.S.C. §§ 9001 et seq.):</strong> Articles 3, 12, and 13 protect the habitual residence of minor children. Respondent&apos;s prior scheme transporting the family to Mexico, confiscating travel documents, and abandoning Mother and children across an international border constitutes an aggravated wrongful removal and breach of custody under international treaties.
                </p>
                <p>
                  <strong>2. Transnational UCCJEA &amp; Federal PKPA (Fla. Stat. § 61.506 &amp; 28 U.S.C. § 1738A):</strong> Florida courts treat foreign countries as U.S. states under Fla. Stat. § 61.506, preventing jurisdictional manipulation across international borders. The Federal Parental Kidnapping Prevention Act mandates full faith and credit to Florida&apos;s home state proceedings, foreclosing any multi-state or international jurisdictional challenge.
                </p>
              </div>
            </div>

            {/* SECTION 5: NOTARIAL ATTESTATION */}
            <div className="border-t-2 border-black pt-3 text-[11px] font-sans space-y-2 avoid-break">
              <div className="font-bold uppercase text-[10px] font-mono-legal">
                CERTIFICATE OF SERVICE &amp; VERIFICATION UNDER FLA. STAT. § 92.525:
              </div>
              <p className="italic text-slate-800 leading-normal">
                &quot;Under penalties of perjury, I declare that I have read the foregoing Petitioner&apos;s Exhibit A and the factual statements and exhibits attached hereto are true, correct, and certified official records.&quot;
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="border-t border-black pt-1">
                  <div className="font-bold">Tiffany Renea Greene</div>
                  <div className="text-[10px] text-slate-600">Petitioner / Mother Appearing Pro Se</div>
                  <div className="text-[10px] text-slate-500 font-mono-legal">Date: October 2026</div>
                </div>
                <div className="border-t border-black pt-1 text-right">
                  <div className="text-[10px] text-slate-600">Sixth Judicial Circuit of Florida</div>
                  <div className="text-[10px] text-slate-600">Family Law / Unified Family Court</div>
                  <div className="text-[10px] font-mono-legal text-slate-500">Case No. 2020-DP-000113</div>
                </div>
              </div>
            </div>

            {/* Print Watermark */}
            <div className="print-only court-watermark">
              AUTHENTICATED COURT EXHIBIT · TIFFANY RENEA GREENE v. ERIC JOSHUA GREENE · CASE NO.: 2020-DP-000113 · BATES: TRG-IR-030 - TRG-IR-030B
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
