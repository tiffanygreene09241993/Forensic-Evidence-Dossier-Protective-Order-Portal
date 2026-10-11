import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Scale, FileText, ChevronRight, Copy, Check, Globe } from 'lucide-react';
import { JurisdictionCode } from '../types/forensic';
import { JURISDICTIONS } from '../data/jurisdictionData';

interface HighLiabilityViewProps {
  jurisdiction?: JurisdictionCode;
}

export const HighLiabilityView: React.FC<HighLiabilityViewProps> = ({ jurisdiction = 'universal' }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const currentJurisdiction = JURISDICTIONS[jurisdiction];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider flex items-center gap-2">
            <span>Section 4 · Substantive Causes of Action</span>
            <span>·</span>
            <span className="text-amber-400 font-medium">{currentJurisdiction.name}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1">
            Proof of Specific High-Liability Conduct
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Detailed civil trial and family law analysis isolating the primary evidentiary pillars for emergency
            injunctive relief, punitive damages, and immediate protective order issuance.
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span>Active Code Base: <strong>{currentJurisdiction.shortLabel}</strong></span>
        </div>
      </div>

      {/* Claim 1: Direct Threat of Physical Violence */}
      <div className="rounded-lg border border-rose-900/60 bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950/20 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-900/40 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <h3 className="text-base font-bold text-rose-300 font-serif-court">
              1. Threat of Bodily Harm &amp; Physical Violence (Emergency DVPO Threshold)
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-rose-400 font-mono-legal">
              Ex. 12 · Transmitted June 18, 2026 · 23:42 EDT
            </span>
            <button
              onClick={() =>
                handleCopy(
                  'threat-brief',
                  `CAUSE OF ACTION: THREAT OF BODILY HARM & DOMESTIC BATTERY\nEXHIBIT: Ex. 12 / Bates TRG-0012 (June 18, 2026 23:42 EDT)\nVERBATIM TRANSCRIPTION: "I should beat her ass / But my momma said animal abuse is wrong."\nGOVERNING STATUTE: ${currentJurisdiction.dvpoStatute}\nLEGAL STANDARD: Imminent apprehension of harmful physical contact; establishes prima facie statutory grounds for ex parte Domestic Violence Protection Order (DVPO).`
                )
              }
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
            >
              {copiedSection === 'threat-brief' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Legal Analysis</span>
            </button>
          </div>
        </div>

        {/* Verbatim Excerpt Box */}
        <div className="bg-slate-950 p-4 rounded border border-rose-900/50">
          <div className="text-[11px] text-slate-500 uppercase tracking-wider font-mono-legal mb-1">
            Direct Transmission Transcript (Preserved Video File · Bates TRG-0012):
          </div>
          <div className="text-sm font-mono-legal text-rose-200 font-semibold">
            &quot;I should beat her ass / But my momma said animal abuse is wrong.&quot;
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-rose-400" />
              Statutory DVPO &amp; Domestic Battery Standard ({currentJurisdiction.shortLabel})
            </h4>
            <p>
              Under <strong>{currentJurisdiction.dvpoStatute}</strong> and common-law battery standards, actionable domestic violence does not require a physical blow to have already landed. A communication constitutes an actionable threat of domestic battery when the perpetrator intentionally places a former domestic partner in reasonable apprehension of imminent serious bodily injury.
            </p>
            <p>
              Respondent did not post this as an abstract public thought; he <strong>directly transmitted this video recording into Petitioner’s private electronic inbox</strong> at 23:42 EDT on June 18, 2026. The direct delivery satisfies the threshold of targeted menace intended to induce fear.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              Judicial Finding &amp; Dehumanization Factor
            </h4>
            <p>
              The explicit conditional clause (&quot;I should beat her ass...&quot;) coupled with severe dehumanizing language (&quot;...animal abuse is wrong&quot;) is recognized in forensic domestic violence risk assessments as a primary indicator of escalating lethal risk and severe psychological intimidation.
            </p>
            <div className="p-2.5 rounded bg-rose-950/40 border border-rose-900/30 text-rose-300 text-[11px]">
              <strong>Trial Brief Conclusion:</strong> This single transmission alone satisfies the requisite evidentiary standard for the entry of an emergency <em>ex parte</em> Domestic Violence Temporary Restraining Order without prior notice to Respondent.
            </div>
          </div>
        </div>
      </div>

      {/* Claim 2: Defamation Per Se */}
      <div className="rounded-lg border border-amber-900/60 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/20 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-900/40 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h3 className="text-base font-bold text-amber-300 font-serif-court">
              2. Defamation Per Se: False Accusations of Indictable Crimes of Moral Turpitude
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-amber-400 font-mono-legal">
              Ex. 02, Ex. 03, Ex. 11 · {currentJurisdiction.defamationStatute}
            </span>
            <button
              onClick={() =>
                handleCopy(
                  'defamation-brief',
                  `CAUSE OF ACTION: DEFAMATION PER SE (FELONY CRIMES OF MORAL TURPITUDE)\nAUTHORITY: ${currentJurisdiction.defamationStatute}\nALLEGATIONS: 12-Year Domestic Battery (Ex. 02), Active Arrest Warrant & Drug Rehab Flight (Ex. 03), Felony Bank Loan Fraud (Ex. 11).\nLEGAL EFFECT: General damages are conclusively presumed as a matter of law. No special pecuniary damages required.`
                )
              }
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
            >
              {copiedSection === 'defamation-brief' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Legal Analysis</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          {/* Sub-item A: Loan Fraud */}
          <div className="p-3.5 rounded bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-semibold flex items-center justify-between">
              <span>Felony Bank Loan Fraud</span>
              <span className="text-[10px] font-mono-legal text-slate-500">Ex. 11 · Jun 15</span>
            </div>
            <div className="font-mono-legal text-[11px] text-slate-200 bg-slate-900 p-2 rounded">
              &quot;Nope u just take out loans in my name to pay ur stupid bills...&quot;
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Accuses Petitioner of federal bank fraud (18 U.S.C. § 1344) and identity theft. Loan fraud is an indictable crime of moral turpitude carrying severe prison terms. Petitioner maintains pristine credit records and has never forged or taken unauthorized loans.
            </p>
          </div>

          {/* Sub-item B: Active Warrant & Rehab */}
          <div className="p-3.5 rounded bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-semibold flex items-center justify-between">
              <span>Active Warrant &amp; Rehab Flight</span>
              <span className="text-[10px] font-mono-legal text-slate-500">Ex. 03 · Jan 19</span>
            </div>
            <div className="font-mono-legal text-[11px] text-slate-200 bg-slate-900 p-2 rounded">
              &quot;She has an active warrant out for her arrest. She ran from the state so she wouldn&apos;t have to go to court-ordered rehab.&quot;
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              A warrant and court-ordered substance rehab are official judicial matters. Respondent’s assertions are objective falsehoods; state and national CJIS criminal databases confirm Petitioner has zero arrest warrants, zero fugitive status, and zero drug rehab orders.
            </p>
          </div>

          {/* Sub-item C: 12-Year Domestic Violence */}
          <div className="p-3.5 rounded bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-semibold flex items-center justify-between">
              <span>12 Years of Domestic Battery</span>
              <span className="text-[10px] font-mono-legal text-slate-500">Ex. 02 · Jan 18</span>
            </div>
            <div className="font-mono-legal text-[11px] text-slate-200 bg-slate-900 p-2 rounded">
              &quot;My abuser and her fling... She would hit me for 12 years and now plays the victim.&quot;
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Imputes continuous violent felony battery against a spouse. In truth, Petitioner has never been arrested or charged with domestic violence. In stark contrast, Respondent was arrested for domestic violence against Petitioner in 2019 (Exhibit TRG-0004).
            </p>
          </div>
        </div>

        {/* Legal Presumption Note */}
        <div className="p-3 rounded bg-amber-950/30 border border-amber-900/40 text-amber-300 text-xs">
          <strong>Defamation Per Se Doctrine ({currentJurisdiction.shortLabel}):</strong> Under <strong>{currentJurisdiction.defamationStatute}</strong>, where the defamatory statement falsely imputes an indictable criminal offense punishable by imprisonment or an offense involving moral turpitude, <strong>damages to reputation are conclusively presumed by law</strong>. Petitioner is not required to plead or prove special pecuniary harm to recover substantial compensatory and punitive damages.
        </div>
      </div>

      {/* Claim 3: Parental Alienation & Third-Party Interference */}
      <div className="rounded-lg border border-purple-900/60 bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/20 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-900/40 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <h3 className="text-base font-bold text-purple-300 font-serif-court">
              3. Third-Party Parental Alienation &amp; Direct Disparagement to Minor Children
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-purple-400 font-mono-legal">
              Ex. 06, Ex. 07, Ex. 08 · FRE 801(d)(2) Opposing Party Admission
            </span>
            <button
              onClick={() =>
                handleCopy(
                  'alienation-brief',
                  `PARENTAL ALIENATION ANALYSIS: Written admission by Third Party Heaven-Leigh ("I just tell your the kids the truth..."). Respondent is actively delegating custodial alienation to a non-parent partner residing in the home. Direct violation of ${currentJurisdiction.alienationStandard}.`
                )
              }
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
            >
              {copiedSection === 'alienation-brief' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Legal Analysis</span>
            </button>
          </div>
        </div>

        {/* Written Confession Callout */}
        <div className="bg-slate-950 p-4 rounded border border-purple-900/50 space-y-2">
          <div className="text-[11px] text-purple-400 uppercase tracking-wider font-mono-legal">
            Direct Admission of Parental Alienation (Facebook Messenger · Ex. 07 / Bates TRG-0007):
          </div>
          <div className="font-mono-legal text-xs text-slate-200 bg-slate-900 p-3 rounded border border-slate-800 space-y-1">
            <div className="text-emerald-400">Petitioner: &quot;Stop telling my children lies about my custody and my life. It is confusing them and hurting them.&quot;</div>
            <div className="text-purple-300 font-semibold">Heaven-Leigh: &quot;I just tell your the kids the truth. I ain&apos;t gonna lie to em. They know what kind of woman you are.&quot;</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100">Vicarious Liability &amp; Co-Parenting Standard ({currentJurisdiction.shortLabel})</h4>
            <p>
              Under <strong>{currentJurisdiction.alienationStandard}</strong>, each biological parent has an affirmative legal duty to protect minor children from inter-parental litigation conflict and nurture the child&apos;s bond with the other parent.
            </p>
            <p>
              Respondent Eric Greene has violated this duty by introducing his romantic partner, Heaven-Leigh, into the domestic sphere and permitting her to actively denigrate the children&apos;s biological mother. Her explicit written admission (&quot;I just tell your the kids the truth... They know what kind of woman you are&quot;) operates as a party-admission under FRE 801(d)(2) that she systematically poisons the children&apos;s minds against Petitioner.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100">Public Weaponization of Minor Identities (TRG-0008 / Ex. 08)</h4>
            <p>
              On February 14, 2026, Respondent hosted a public video broadcast specifically broadcasting the minor children&apos;s names ([H.G.], [P.G.], [E.G.]) and falsely asserting that Petitioner committed paternity fraud and abandonment.
            </p>
            <div className="p-2.5 rounded bg-purple-950/40 border border-purple-900/30 text-purple-300 text-[11px]">
              <strong>Judicial Relief Required:</strong> An immediate mandatory gag order restraining both Respondent and all household third parties (specifically Heaven-Leigh) from discussing custody or disparaging Petitioner in the presence of minor children.
            </div>
          </div>
        </div>
      </div>

      {/* Claim 4: Electronic Stalking & Likeness Taunting */}
      <div className="rounded-lg border border-cyan-900/60 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/20 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-900/40 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            <h3 className="text-base font-bold text-cyan-300 font-serif-court">
              4. Electronic Stalking, Likeness Appropriation &amp; Taunting Post-Revocation
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-cyan-400 font-mono-legal">
              Ex. 01, Ex. 05, Ex. 09, Ex. 10 · {currentJurisdiction.stalkingStatute}
            </span>
            <button
              onClick={() =>
                handleCopy(
                  'stalking-brief',
                  `ELECTRONIC STALKING & LIKENESS HARASSMENT: Petitioner revoked consent on Jan 14, 2026 (TRG-0001). Respondent engaged in a continuous, willful course of conduct under ${currentJurisdiction.stalkingStatute} transmitting mocking memes, non-consensual postpartum sexual harassment, and weaponized unauthorized photo collages.`
                )
              }
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
            >
              {copiedSection === 'stalking-brief' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Legal Analysis</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100">Bright-Line Notice of Revocation (Jan 14, 2026 · TRG-0001)</h4>
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono-legal text-[11px] text-emerald-400">
              &quot;Do not contact me anymore unless it is strictly about the kids. Do not post my pictures online. You do not have permission to post my face or my life.&quot; (Ex. 01)
            </div>
            <p>
              This text established actual, unambiguous notice. Under common law likeness protection and state privacy standards, any marital license or implied consent to use Petitioner&apos;s photograph, likeness, or private image was immediately and irrevocably terminated.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100">Willful Breach &amp; In-Your-Face Inbox Taunting</h4>
            <p>
              Rather than respecting the revocation, Respondent escalated by repeatedly sending direct links of his unauthorized video posts directly into Petitioner&apos;s inbox (including images of Petitioner in uniform/work cap, photo collages with children in Ex. 10, and court-order mockery memes in Ex. 05).
            </p>
            <p>
              In March 2026 (Ex. 09), Respondent weaponized private electronic channels to send multi-paragraph critiques attacking Petitioner&apos;s physical appearance, postpartum recovery, and past private marital sexual history—demonstrating a pattern of stalking designed solely to harass and intimidate under <strong>{currentJurisdiction.stalkingStatute}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
