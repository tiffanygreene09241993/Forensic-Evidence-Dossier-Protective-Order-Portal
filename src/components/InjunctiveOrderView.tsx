import React, { useState } from 'react';
import { Copy, Check, Scale, ShieldCheck, AlertCircle, Bookmark } from 'lucide-react';
import { JurisdictionCode } from '../types/forensic';
import { JURISDICTIONS } from '../data/jurisdictionData';

interface InjunctiveOrderViewProps {
  isRedacted?: boolean;
  jurisdiction?: JurisdictionCode;
}

export const InjunctiveOrderView: React.FC<InjunctiveOrderViewProps> = ({
  isRedacted = true,
  jurisdiction = 'universal',
}) => {
  const [copied, setCopied] = useState(false);
  const currentJurisdiction = JURISDICTIONS[jurisdiction];

  const minorChildrenText = isRedacted
    ? "[S.G.], [K.G.], [P.G.], [H.G.], and [E.G.] (minor identities shielded pursuant to FRCP 5.2 and Family Court privacy rules)"
    : "Sarah Greene, Kayleen Greene, Peighton Greene, Hunter Greene, and Emmalynn Greene";

  const orderText = `${currentJurisdiction.courtTitle.toUpperCase()}
IN AND FOR THE COUNTY OF ________________, STATE OF ${currentJurisdiction.name.toUpperCase()}

IN RE THE MARRIAGE / CUSTODY OF:
TIFFANY RENEA GREENE,
    Petitioner,
and                                             CASE NO.: 2026-CV-0891
ERIC GREENE,
    Respondent.
_______________________________________________/

ORDER GRANTING PRELIMINARY INJUNCTION AND SOCIAL MEDIA PROTECTIVE RESTRAINTS
PURSUANT TO: ${currentJurisdiction.dvpoStatute} & ${currentJurisdiction.stalkingStatute}

Upon consideration of Petitioner Tiffany Renea Greene's Verified Application for Injunctive Relief and Verified Declaration, the evidentiary exhibits submitted therewith, and the Court having found that immediate and irreparable injury will result before a full trial on the merits can be conducted, it is hereby:

ORDERED, ADJUDGED, AND DECREED AS FOLLOWS:

1. IMMEDIATE PERMANENT REMOVAL OF DEFAMATORY & UNAUTHORIZED CONTENT (24-HOUR TAKEDOWN MANDATE)
   a. Respondent, Eric Greene (including under his social media handle "hulk"), his agents, domestic partners (including Third Party Heaven-Leigh), servants, and all persons acting in active concert with him, are ORDERED to immediately and permanently delete, remove, and take down all public and private social media posts, videos, comments, audio recordings, live broadcasts, photo collages, and digital media published across all platforms—including but not limited to TikTok, Facebook, Instagram, YouTube, X, and Snapchat—that depict, name, tag, or reference Petitioner (Tiffany Renea Greene), Petitioner's partner/fiancé (Pedro), or the parties' minor children (${minorChildrenText}).
   b. Compliance with this takedown requirement must be fully completed within twenty-four (24) hours of formal service or electronic notice of this Order.

2. STRICT SOCIAL MEDIA NON-DISPARAGEMENT & GAG RESTRAINTS
   a. Prospective Gag Order: Respondent and all third parties acting on his behalf are strictly ENJOINED and PROHIBITED from publishing, posting, reposting, commenting upon, streaming, or broadcasting any statements, images, likenesses, or audio recordings regarding Petitioner, her current domestic life, her physical appearance, her employment, her character, or the subject matter of this pending domestic litigation.
   b. Child Likeness & Identifying Information Ban: Respondent is strictly RESTRAINED from posting, uploading, or broadcasting the names, likenesses, images, school locations, or identifying details of the minor children on any public or private internet platform during the pendency of this litigation.
   c. Anti-Circumvention / Subtext Prohibition: Respondent is expressly prohibited from engaging in "vague-posting," indirect quoting, or sharing memes or audio tracks designed to refer to or disparage Petitioner without explicitly naming her.

3. THIRD-PARTY AGENCY & VICARIOUS DOMESTIC RESTRAINT
   a. Respondent is strictly ENJOINED from directing, encouraging, inciting, or permitting any third party—specifically including his romantic partner Third Party Heaven-Leigh, family members, household members, or online followers—to contact, harass, publish statements about, or defame Petitioner or her partner Pedro.
   b. Household Disparagement Ban: Respondent shall take all reasonable affirmative measures to ensure that third parties within his physical household or custody do not discuss this litigation, custody proceedings, or disparaging characterizations of Petitioner in the presence of or directly to the minor children. Any violation by an individual residing in Respondent's household shall be imputed directly to Respondent as a constructive violation of this Order.

4. COMPLETE NO-CONTACT RESTRAINT & MANDATORY MONITORED CO-PARENTING PORTAL
   a. Termination of Unofficial Direct Electronic Channels: All direct, informal communications between Respondent and Petitioner via regular cellular SMS, phone calls, voice notes, direct social media messages (e.g., TikTok, Instagram, Facebook Messenger), or email are hereby STRICTLY TERMINATED AND ENJOINED.
   b. Exclusive Communication Portal (OurFamilyWizard / TalkingParents): All legitimate, non-emergency communications strictly necessary for the health, schooling, medical care, and physical custody transitions of the minor children shall occur exclusively through OurFamilyWizard (or alternatively, TalkingParents).
   c. Onboarding Timeline: Both parties shall register for an active account on the designated portal within five (5) business days of the entry of this Order.
   d. Civil Tone & Scope: Communications over the secure portal shall be strictly restricted to factual child-related logistics. Neither party shall use the application to transmit derogatory, demeaning, accusatory, or harassing remarks.

5. ENFORCEMENT, CONTEMPT SANCTIONS & ATTORNEYS' FEES
   a. Willful failure to comply with any provision of this Order shall subject the non-compliant party to immediate civil or criminal contempt proceedings before this Court.
   b. Sanctions for contempt may include monetary fines, an award of reasonable attorneys' fees and costs incurred by the non-offending party in enforcing this Order, and/or compensatory or coercive incarceration in the county jail.

SO ORDERED this _____ day of ________________, 2026.

_______________________________________________
JUDGE OF THE COURT`;

  const handleCopy = () => {
    navigator.clipboard.writeText(orderText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider flex items-center gap-2">
            <span>Section 7 · Judicial Decree Terms</span>
            <span>·</span>
            <span className="text-amber-400 font-medium">{currentJurisdiction.name}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1">
            Proposed Preliminary Injunction &amp; Protective Restraints
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Court-ready proposed order with exact judicial clauses for signature, establishing a 24-hour social media
            takedown, strict non-disparagement gag order, third-party agency liability, and OurFamilyWizard channelization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors font-semibold"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Order Terms' : 'Copy Proposed Order'}</span>
          </button>
        </div>
      </div>

      {/* Structured Judicial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-rose-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            1. 24-Hour Social Media Takedown Mandate
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Mandates immediate deletion of all public and private videos, photos, audio tracks, and comment threads across
            TikTok, Facebook, and Instagram depicting or naming Petitioner, Pedro, or the minor children within 24 hours.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-amber-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            2. Prospective Gag &amp; Anti-Circumvention Restraints
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Enjoins future online posts, live streams, comments, and indirect &quot;vague-posting&quot; regarding Petitioner,
            and prohibits posting names, likenesses, or schools of the minor children.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-purple-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            3. Third-Party Agency Clause (Heaven-Leigh)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Restrains Respondent from encouraging third parties to harass Petitioner, and directly imputes household members&apos;
            child disparagement to Respondent as constructive contempt.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-emerald-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            4. Monitored Co-Parenting Portal (OurFamilyWizard)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Terminates all unofficial SMS/DM correspondence. Mandates registration on OurFamilyWizard or TalkingParents
            within 5 business days for child-related logistical communications only.
          </p>
        </div>
      </div>

      {/* Formal Pleading Paper Sheet */}
      <div className="pleading-paper-sheet rounded-lg border border-slate-700 bg-slate-950 p-6 sm:p-10 shadow-2xl overflow-x-auto text-slate-200">
        <div className="max-w-4xl mx-auto space-y-6 text-xs sm:text-sm leading-relaxed">
          {/* Header */}
          <div className="border-b-2 border-slate-700 pb-4 text-center space-y-1">
            <div className="font-serif-court font-semibold text-sm sm:text-base tracking-wide uppercase text-slate-100">
              {currentJurisdiction.courtTitle.toUpperCase()}
            </div>
            <div className="font-serif-court text-xs sm:text-sm text-slate-300">
              IN AND FOR THE COUNTY OF ________________, STATE OF {currentJurisdiction.name.toUpperCase()}
            </div>
          </div>

          {/* Caption */}
          <div className="grid grid-cols-12 gap-2 border-b-2 border-slate-700 pb-4 font-mono-legal text-xs">
            <div className="col-span-7 space-y-1">
              <div>IN RE THE MARRIAGE / CUSTODY OF:</div>
              <div className="font-bold text-slate-100">TIFFANY RENEA GREENE,</div>
              <div className="pl-6 italic text-slate-400">Petitioner,</div>
              <div>and</div>
              <div className="font-bold text-slate-100">ERIC GREENE,</div>
              <div className="pl-6 italic text-slate-400">Respondent.</div>
            </div>
            <div className="col-span-1 border-r border-slate-700 flex items-center justify-center text-slate-500">
              )
            </div>
            <div className="col-span-4 pl-3 space-y-1">
              <div>CASE NO.: 2026-CV-0891</div>
              <div className="font-bold text-amber-400 pt-2 text-[11px]">
                ORDER GRANTING PRELIMINARY INJUNCTION &amp; SOCIAL MEDIA PROTECTIVE RESTRAINTS
              </div>
              <div className="text-[10px] text-slate-400">{currentJurisdiction.citationPrefix}</div>
            </div>
          </div>

          {/* Order Text Body */}
          <div className="space-y-4 font-serif-court">
            <p className="italic">
              Upon consideration of Petitioner Tiffany Renea Greene&apos;s Verified Application for Injunctive Relief and
              Verified Declaration, the exhibits preserved in the Forensic Dossier, and good cause appearing:
            </p>

            <div className="space-y-4 text-xs sm:text-sm font-sans">
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-100 uppercase text-xs tracking-wider">
                  1. Immediate Permanent Removal of Defamatory &amp; Unauthorized Content
                </h4>
                <p className="text-slate-300 pl-4">
                  Respondent, Eric Greene (including under TikTok handle &quot;hulk&quot;), his agents, domestic associates (including Heaven-Leigh), and all persons acting in concert with him, are <strong>ORDERED to immediately and permanently delete and remove all social media posts, videos, comments, and image collages</strong> across TikTok, Facebook, Instagram, and other networks depicting or referencing Petitioner, Pedro, or the parties&apos; five minor children ({minorChildrenText}) within <strong>twenty-four (24) hours</strong> of service of this Order.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-100 uppercase text-xs tracking-wider">
                  2. Strict Social Media Non-Disparagement &amp; Anti-Circumvention Restraints
                </h4>
                <p className="text-slate-300 pl-4">
                  Respondent is <strong>strictly ENJOINED</strong> from publishing, streaming, posting, or reposting any statements, images, likenesses, or audio recordings concerning Petitioner, her character, or her domestic life. Respondent is explicitly prohibited from posting minor children&apos;s images, school locations, or engaging in indirect &quot;vague-posting.&quot;
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-100 uppercase text-xs tracking-wider">
                  3. Household Agency Injunction (Heaven-Leigh)
                </h4>
                <p className="text-slate-300 pl-4">
                  Respondent shall take all affirmative measures to ensure that Third Party Heaven-Leigh and household members do not defame Petitioner or discuss custody in the presence of the minor children. Any violation by household members shall be imputed directly to Respondent as constructive contempt.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-100 uppercase text-xs tracking-wider">
                  4. Complete Termination of Direct Electronic Contact &amp; Exclusive Portal Mandate
                </h4>
                <p className="text-slate-300 pl-4">
                  All direct SMS, cellular, and social media communications between Respondent and Petitioner are <strong>TERMINATED</strong>. All legitimate child-related logistical communications shall occur exclusively via <strong>OurFamilyWizard</strong> (or TalkingParents). Both parties shall onboard within five (5) business days.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-100 uppercase text-xs tracking-wider">
                  5. Contempt Sanctions &amp; Fee Shifting
                </h4>
                <p className="text-slate-300 pl-4">
                  Willful violation of this Order shall subject Respondent to coercive fines, mandatory incarceration in the county jail, and full reimbursement of Petitioner&apos;s reasonable attorney fees and costs.
                </p>
              </div>
            </div>
          </div>

          {/* Signature Block */}
          <div className="pt-8 border-t-2 border-slate-700 flex justify-between items-end text-xs font-mono-legal">
            <div>
              <div>SO ORDERED this _____ day of ________________, 2026.</div>
            </div>
            <div className="text-right">
              <div className="inline-block border-b border-slate-400 w-64 pb-1">
                &nbsp;
              </div>
              <div className="font-bold text-slate-100 mt-1">JUDGE OF THE COURT</div>
              <div className="text-slate-400">{currentJurisdiction.courtTitle}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
