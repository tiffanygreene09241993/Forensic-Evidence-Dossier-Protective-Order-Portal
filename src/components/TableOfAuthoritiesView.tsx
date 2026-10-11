import React, { useState, useMemo } from 'react';
import { ForensicExhibit, JurisdictionCode } from '../types/forensic';
import {
  Scale,
  BookOpen,
  Copy,
  Check,
  Download,
  Search,
  FileText,
  Shield,
  Layers,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { triggerFileDownload } from '../utils/export';

interface TableOfAuthoritiesViewProps {
  exhibits: ForensicExhibit[];
  onSelectExhibit: (exhibit: ForensicExhibit) => void;
  jurisdiction?: JurisdictionCode;
}

interface AuthorityEntry {
  citation: string;
  category: 'Florida Child Welfare (Ch. 39)' | 'Florida Protective Injunctions' | 'Florida Family & Custody (Ch. 61)' | 'Federal Criminal & Cyber' | 'Evidentiary Rules (FRE & FEC)';
  title: string;
  coreRule: string;
  supportingExhibits: string[];
  relevanceExplanation: string;
}

export const TableOfAuthoritiesView: React.FC<TableOfAuthoritiesViewProps> = ({
  exhibits,
  onSelectExhibit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedPleading, setCopiedPleading] = useState(false);

  const AUTHORITIES: AuthorityEntry[] = [
    // Florida Child Welfare (Chapter 39)
    {
      citation: 'Fla. Stat. § 39.0132(3) & § 39.202',
      category: 'Florida Child Welfare (Ch. 39)',
      title: 'Confidentiality of Child Welfare & Abuse Records',
      coreRule:
        'All records concerning child abuse, abandonment, or neglect in the possession of the department are strictly confidential and exempt from public disclosure to safeguard minor victims from lifelong prejudice.',
      supportingExhibits: ['IR-019 (DHS CRCL)', 'IR-020 to IR-026 (DCF Intakes)', 'TRG-0015 (FBI Dossier)'],
      relevanceExplanation:
        'Conclusive authority requiring this Court to disregard and strike opposing claims attempting to label Mother "high risk" based on her confidential childhood victimization reports from the 1990s/2000s.',
    },
    {
      citation: 'Fla. Stat. § 39.01(2) & (35)',
      category: 'Florida Child Welfare (Ch. 39)',
      title: 'Statutory Definition of Child Harm & Domestic Violence Exposure',
      coreRule:
        'Exposing minor children to domestic violence constitutes statutory harm to the child, placing the violent perpetrator at fault under dependency and child welfare standards.',
      supportingExhibits: ['TRG-0013 (PSO Battery)', 'TRG-0014 (PSO Handgun)', 'IR-023 (DCF 2019-0406)'],
      relevanceExplanation:
        'Directly supports DCF verified findings of domestic violence and threat of harm against Father Eric Greene for battering Mother in presence of minor daughters Sarah and Kayleen.',
    },
    {
      citation: 'Fla. Stat. § 39.501',
      category: 'Florida Child Welfare (Ch. 39)',
      title: 'Dependency Petition Probable Cause Standards',
      coreRule:
        'A petition for dependency must articulate specific, contemporaneous factual allegations of imminent abuse or neglect by the custodial parent.',
      supportingExhibits: ['IR-020 to IR-026 (4 Clean Mother Clearances)', 'IR-053', 'IR-064'],
      relevanceExplanation:
        'Proves that all four adult investigations into Mother closed with "NO INDICATORS", leaving zero lawful basis for dependency intervention against Mother.',
    },

    // Florida Injunctions & Stalking
    {
      citation: 'Fla. Stat. § 784.048',
      category: 'Florida Protective Injunctions',
      title: 'Stalking & Cyberstalking Statute',
      coreRule:
        'Prohibits willfully, maliciously, and repeatedly following, harassing, or cyberstalking another person. Cyberstalking includes engaging in a course of conduct to communicate words, images, or language causing substantial emotional distress with no legitimate purpose.',
      supportingExhibits: ['TRG-0001 (Cease Notice)', 'TRG-0002 (TikTok Post)', 'TRG-0008 (Live Broadcast)', 'TRG-0012 (Direct Threat)'],
      relevanceExplanation:
        'Foundational statutory anchor establishing that Respondent engaged in an escalating course of conduct across TikTok and private electronic channels following the January 14, 2026 legal cutoff.',
    },
    {
      citation: 'Fla. Stat. § 784.046 & § 741.30',
      category: 'Florida Protective Injunctions',
      title: 'Injunction for Protection Against Domestic Violence & Stalking',
      coreRule:
        'Any person who is the victim of domestic violence or stalking, or has reasonable cause to believe he or she is in imminent danger of becoming the victim of any act of domestic violence, has standing to petition for an injunction.',
      supportingExhibits: ['TRG-0012 (Assault Threat)', 'TRG-0013 (Battery)', 'TRG-0014 (9mm Handgun)', 'TRG-0025 (Hostage Motive)'],
      relevanceExplanation:
        'Provides jurisdiction and legal authority for the proposed temporary and permanent restraining orders entered in Section 8.',
    },

    // Florida Family & Custody (Chapter 61)
    {
      citation: 'Fla. Stat. § 61.13(3)(m)',
      category: 'Florida Family & Custody (Ch. 61)',
      title: 'Best Interests: Evidence of Domestic Violence & Protection',
      coreRule:
        'The court shall consider evidence of domestic violence or child abuse. A parent fleeing domestic violence to safeguard herself and children cannot be penalized as having abandoned the children.',
      supportingExhibits: ['TRG-0013 (Battery)', 'TRG-0014 (Handgun)', 'TRG-0025 (Nov 1 2019 Text)', 'TRG-0017 (Divorce)'],
      relevanceExplanation:
        'Directly refutes Respondent’s online defamation that Mother "abandoned" her family; confirms Mother’s physical exit was legally protected domestic violence mitigation.',
    },
    {
      citation: 'Fla. Stat. § 61.13(3)(a) & (c)',
      category: 'Florida Family & Custody (Ch. 61)',
      title: 'Best Interests: Parental Alienation & Fostering Close Relationship',
      coreRule:
        'Evaluates the demonstrated capacity of each parent to facilitate and encourage a close and continuing parent-child relationship, and penalizes intentional parental alienation.',
      supportingExhibits: ['TRG-0006 (Third Party Defamation)', 'TRG-0007 (Written Confession)', 'TRG-0008 (Live Slander)'],
      relevanceExplanation:
        'Establishes that Respondent and Third Party Heaven Horton engaged in egregious parental alienation by telling minor children their biological mother is not their real mother.',
    },
    {
      citation: 'Fla. Stat. § 61.13(3)(q)',
      category: 'Florida Family & Custody (Ch. 61)',
      title: 'Best Interests: Special Needs & Pediatric Medical Care',
      coreRule:
        'Requires the court to consider the particular developmental, psychiatric, and specialized medical needs of each child.',
      supportingExhibits: ['TRG-0024 (Special Needs Record)', 'TRG-0016 (FL DOR Support)'],
      relevanceExplanation:
        'Corroborates Emmalynn’s full legal blindness, Kayleen and Hunter’s autism therapies, and Mother’s superior capacity to manage pediatric care while Father blocks records.',
    },
    {
      citation: 'Fla. Stat. § 61.075 & § 61.30',
      category: 'Florida Family & Custody (Ch. 61)',
      title: 'Equitable Distribution, Dissipation of Marital Assets & Child Support',
      coreRule:
        'Authorizes unequal distribution and monetary judgments where a party intentionally dissipates marital assets, and enforces statutory child support guidelines without deviation.',
      supportingExhibits: ['TRG-0023 (Meridian Title HUD-1)', 'TRG-0016 (FL DOR $0.00 Record)'],
      relevanceExplanation:
        'Direct proof of Respondent pocketing $161,280.40 from marital homestead and paying $0.00 in child support across seven years.',
    },

    // Federal Criminal & Cyber
    {
      citation: '18 U.S.C. § 2261A(2)',
      category: 'Federal Criminal & Cyber',
      title: 'Federal Interstate Cyberstalking',
      coreRule:
        'Whoever uses the mail, any interactive computer service, or electronic communication service with the intent to kill, injure, harass, intimidate, or place under surveillance with intent to kill, injure, harass, or intimidate another person across state lines.',
      supportingExhibits: ['TRG-0015 (FBI IC3)', 'TRG-0002 (TikTok Post)', 'TRG-0012 (Threat Video)'],
      relevanceExplanation:
        'Federal basis for FBI IC3 Dossier (TRG-0015) based upon transmissions sent from McDowell, Kentucky targeting Petitioner in Florida.',
    },
    {
      citation: '18 U.S.C. § 1512 & § 1513',
      category: 'Federal Criminal & Cyber',
      title: 'Witness Tampering & Retaliation Against Witnesses',
      coreRule:
        'Prohibits knowingly harassing, threatening, or engaging in corrupt conduct toward a witness or victim to obstruct criminal justice proceedings.',
      supportingExhibits: ['TRG-0014 (Assault)', 'IR-004 to IR-019 (Pedro Neutralization Arc)'],
      relevanceExplanation:
        'Supports the documented pattern of weaponizing 287(g) immigration detention to remove star witness Pedro Hernandez prior to Eric Greene’s felony trial.',
    },
    {
      citation: '18 U.S.C. §§ 1028 & 1028A',
      category: 'Federal Criminal & Cyber',
      title: 'Fraud & Related Activity in Connection with Identification Documents',
      coreRule:
        'Federal felony prohibition against unauthorized use, theft, or conversion of personal identification information to obtain financial benefits or alter public records.',
      supportingExhibits: ['TRG-0015 (FBI IC3)', 'IR-029 (Title IV-D Audit)', 'IR-031 (Borrower Defense)'],
      relevanceExplanation:
        'Federal basis for investigations into identity theft, student loan diversion, and benefit appropriation.',
    },

    // Rules of Evidence
    {
      citation: 'FRE 801(d)(2) / Fla. Stat. § 90.803(18)',
      category: 'Evidentiary Rules (FRE & FEC)',
      title: 'Admissibility of Opposing Party Admissions (Non-Hearsay)',
      coreRule:
        'A statement is not hearsay when offered against an opposing party and is the party\'s own statement in either an individual or representative capacity.',
      supportingExhibits: ['TRG-0025 (Nov 1 2019 Text)', 'TRG-0007 (Heaven Confession)', 'TRG-0011 (Text)', 'TRG-0012 (Threat Video)'],
      relevanceExplanation:
        'Makes Eric\'s written admissions that Tiffany walked away from abuse and Heaven\'s admission that she talks to the children directly admissible without hearsay objection.',
    },
    {
      citation: 'FRE 902(1)/(2) / Fla. Stat. § 90.902',
      category: 'Evidentiary Rules (FRE & FEC)',
      title: 'Self-Authenticating Certified Public Records Under Seal',
      coreRule:
        'Extrinsic evidence of authenticity as a condition precedent to admissibility is not required for domestic public documents under seal or certified copies of public records.',
      supportingExhibits: ['TRG-0013 (PSO Battery)', 'TRG-0014 (PSO Handgun)', 'TRG-0016 (FL DOR)', 'TRG-0023 (HUD-1)'],
      relevanceExplanation:
        'All certified police complaint affidavits and government orders are self-authenticating, requiring zero witness testimony to enter evidence.',
    },
    {
      citation: 'FRE 902(13)/(14)',
      category: 'Evidentiary Rules (FRE & FEC)',
      title: 'Certified Data Records Generated by Electronic Process / SHA-256 Digest',
      coreRule:
        'Electronic records certified by a qualified custodian using cryptographic hash digests (SHA-256) are self-authenticating electronic evidence.',
      supportingExhibits: ['TRG-0001 through TRG-0025 (SHA-256 Cryptographic Hashes)'],
      relevanceExplanation:
        'Provides the legal foundation for every SHA-256 hash generated in the Evidence Register and certified in the Master Court Packet.',
    },
    {
      citation: 'FRE 404(b) / Fla. Stat. § 90.404(2)',
      category: 'Evidentiary Rules (FRE & FEC)',
      title: 'Williams Rule: Admissibility of Prior Domestic Violence & Weapon Acts',
      coreRule:
        'Evidence of other crimes or wrongs is admissible when relevant to prove motive, opportunity, intent, plan, identity, or absence of mistake or accident.',
      supportingExhibits: ['TRG-0013 (Battery)', 'TRG-0014 (Handgun)', 'TRG-0025 (Pre-Assault Motive)'],
      relevanceExplanation:
        'Permits introduction of the 2019 domestic battery and 9mm gun assault to prove Respondent’s intent, motive, and lethal capacity in the current threat cycle.',
    },
  ];

  const filteredAuthorities = useMemo(() => {
    return AUTHORITIES.filter((item) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.citation.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.coreRule.toLowerCase().includes(q) ||
        item.relevanceExplanation.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  const handleCopyPleadingText = () => {
    const lines = [
      'TABLE OF AUTHORITIES & STATUTORY CONCORDANCE',
      'IN THE CIRCUIT COURT OF THE SIXTH JUDICIAL CIRCUIT',
      'IN AND FOR PASCO COUNTY, FLORIDA',
      'CASE NO: 2019DR006262DRAXES\n',
      'I. FLORIDA STATUTES CHAPTER 39 (CHILD WELFARE & RECORD CONFIDENTIALITY)',
      'Fla. Stat. § 39.0132(3) & § 39.202 (Strict Confidentiality of Child Victim Records)',
      'Fla. Stat. § 39.01(2) & (35) (Exposing Children to Domestic Violence Constitutes Child Harm)',
      'Fla. Stat. § 39.501 (Dependency Petition Probable Cause Standards)\n',
      'II. FLORIDA PROTECTIVE INJUNCTION & STALKING STATUTES',
      'Fla. Stat. § 784.048 (Stalking & Cyberstalking; Course of Conduct Standard)',
      'Fla. Stat. § 784.046 & § 741.30 (Domestic Violence & Stalking Injunction Jurisdictional Standards)\n',
      'III. FLORIDA DOMESTIC RELATIONS & CUSTODY STATUTES (CHAPTER 61)',
      'Fla. Stat. § 61.13(3)(m) (Domestic Violence Factor; Non-Penalization of Fleeing Parent)',
      'Fla. Stat. § 61.13(3)(a) & (c) (Parental Alienation & Continuing Relationship Factors)',
      'Fla. Stat. § 61.13(3)(q) (Special Needs & Pediatric Medical Management)',
      'Fla. Stat. § 61.075 & § 61.30 (Equitable Distribution & Dissipation of Homestead)\n',
      'IV. FEDERAL CRIMINAL & CYBERSTATUTES',
      '18 U.S.C. § 2261A (Interstate Cyberstalking via Interactive Computer Services)',
      '18 U.S.C. § 1512 (Witness Tampering & Retaliation Against Witnesses)',
      '18 U.S.C. §§ 1028, 1028A (Aggravated Identity Theft & Fraud)\n',
      'V. RULES OF EVIDENCE & AUTHENTICATION',
      'FRE 801(d)(2) / Fla. Stat. § 90.803(18) (Admissibility of Opposing Party Admissions)',
      'FRE 902(1)/(2) / Fla. Stat. § 90.902 (Self-Authenticating Certified Public Records)',
      'FRE 902(13)/(14) (Certified Electronic Records Verified via SHA-256 Digest)',
      'FRE 404(b) / Fla. Stat. § 90.404(2) (Prior Domestic Violence to Prove Motive & Intent)',
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedPleading(true);
    setTimeout(() => setCopiedPleading(false), 2000);
  };

  const handleExportCsv = () => {
    const headers = ['Citation', 'Category', 'Statutory Title', 'Legal Principle / Rule', 'Bates Exhibits Cross-Referenced', 'Judicial Relevance & Trial Impact'];
    const rows = filteredAuthorities.map((a) => [
      `"${a.citation.replace(/"/g, '""')}"`,
      `"${a.category.replace(/"/g, '""')}"`,
      `"${a.title.replace(/"/g, '""')}"`,
      `"${a.coreRule.replace(/"/g, '""')}"`,
      `"${a.supportingExhibits.join('; ').replace(/"/g, '""')}"`,
      `"${a.relevanceExplanation.replace(/"/g, '""')}"`,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    triggerFileDownload(`Table_Of_Authorities_Concordance_${Date.now()}.csv`, 'text/csv', csv);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider flex items-center gap-2">
            <span>Automated Pleading Appendix · Legal Authorities</span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">Florida &amp; Federal Standard</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1">
            Table of Authorities &amp; Statutory Concordance
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Complete legal concordance mapping Florida Statutes Chapter 39, Chapter 61, Chapter 784, 18 U.S.C. § 2261A, and Federal Rules of Evidence directly to certified Bates exhibits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyPleadingText}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded border border-slate-700 transition-colors"
          >
            {copiedPleading ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPleading ? 'Copied Pleading TOA' : 'Copy TOA Text'}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded transition-colors shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Concordance (CSV)</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search authorities by statute, rule, topic, or legal concept..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
          <span className="text-slate-500 font-mono-legal">Category:</span>
          {['all', 'Florida Child Welfare (Ch. 39)', 'Florida Protective Injunctions', 'Florida Family & Custody (Ch. 61)', 'Federal Criminal & Cyber', 'Evidentiary Rules (FRE & FEC)'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? 'All Authorities' : cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Authorities Cards */}
      <div className="space-y-4">
        {filteredAuthorities.map((auth, index) => (
          <div
            key={index}
            className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 shadow hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono-legal font-bold text-amber-400 text-xs bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {auth.citation}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono-legal px-2 py-0.5 bg-slate-800 rounded">
                    {auth.category}
                  </span>
                </div>
                <h3 className="font-bold text-slate-100 font-serif-court text-base mt-1">
                  {auth.title}
                </h3>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <span className="text-[10px] font-mono-legal text-slate-400 uppercase font-bold block">
                Statutory Principle &amp; Black-Letter Rule:
              </span>
              <p className="bg-slate-950/70 p-3 rounded border border-slate-800/80 leading-relaxed font-sans">
                {auth.coreRule}
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-xs">
              <span className="text-[10px] font-mono-legal text-emerald-400 font-bold block">
                TRIAL APPLICATION &amp; RELEVANCE:
              </span>
              <p className="text-slate-200 leading-relaxed">{auth.relevanceExplanation}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800 text-[11px] font-mono-legal">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Supporting Bates Exhibits:</span>
              </span>
              {auth.supportingExhibits.map((ex, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-700 text-[10px] font-medium"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
