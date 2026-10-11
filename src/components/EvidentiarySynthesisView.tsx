import React, { useState } from 'react';
import { Network, ShieldAlert, Sparkles, AlertTriangle, Check, Copy, UserCheck, Shield } from 'lucide-react';

export const EvidentiarySynthesisView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider">
          Section 3 · Trial Strategy &amp; Defense Vulnerability Audit
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1">
          Evidentiary Synthesis &amp; Intent Assessment
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Forensic synthesis mapping subjective malice, coordinated multi-actor harassment between Respondent and
          Third Party Heaven-Leigh, and tactical trial analysis of Petitioner&apos;s defensive disclosures.
        </p>
      </div>

      {/* Synthesis 1: Subjective Malice & Motive Matrix */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100 font-serif-court">
              A. Subjective Malice: Private Transmissions as Proof of Smear Intent
            </h3>
          </div>
          <button
            onClick={() =>
              handleCopy(
                'malice-analysis',
                `ACTUAL MALICE SYNTHESIS: Under New York Times v. Sullivan and common law standards, private communications between the parties establish actual malice—defined as publication with knowledge of falsity or reckless disregard of the truth. Respondent's private DMs attacking Petitioner's weight, postpartum body, and partner Pedro demonstrate that his public broadcasts were calculated to inflict reputational and emotional injury.`
              )
            }
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded border border-slate-800"
          >
            {copiedId === 'malice-analysis' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Malice Brief</span>
          </button>
        </div>

        <div className="text-xs text-slate-300 leading-relaxed space-y-3">
          <p>
            In civil defamation litigation, proving <strong>actual malice</strong> (or common-law express malice) is essential to defeat qualified privileges and sustain punitive damage claims. The evidentiary record establishes a direct causal continuum between Respondent’s private anger and his public smear campaign:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-rose-400 font-semibold text-[11px]">1. Intimate &amp; Bodily Shaming (Ex. 09)</div>
              <p className="text-[11px] text-slate-400">
                Respondent’s private DMs systematically targeted Petitioner’s postpartum physical changes, weight, and private marital sexual history. This reveals personal spite, malice, and a motive of sexualized degradation rather than legitimate parental concern.
              </p>
            </div>

            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-amber-400 font-semibold text-[11px]">2. Partner Taunts &amp; Slurs (Ex. 05)</div>
              <p className="text-[11px] text-slate-400">
                Transmitting racialized slurs regarding partner Pedro (&quot;Mexican boyfriend&quot;) and mocking Petitioner’s college degree proves resentment toward Petitioner’s new life, directly prompting the subsequent public video posting Pedro’s photograph.
              </p>
            </div>

            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-semibold text-[11px]">3. Contempt of Law Memes (Ex. 05)</div>
              <p className="text-[11px] text-slate-400">
                Transmitting a meme mocking court orders (&quot;When she thinks a piece of paper stops real life&quot;) establishes a premeditated mindset of contempt toward prospective judicial injunctions, supporting punitive relief.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis 2: Coordinated Joint Harassment Campaign */}
      <div className="rounded-lg border border-purple-900/40 bg-slate-900 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-bold text-slate-100 font-serif-court">
              B. Coordinated Multi-Platform Campaign: Eric Greene &amp; Heaven-Leigh
            </h3>
          </div>
          <span className="text-[11px] text-purple-400 font-mono-legal">
            Civil Conspiracy &amp; Third-Party Agency
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The evidentiary timeline demonstrates an orchestrated division of labor between Respondent Eric Greene and his romantic partner, Third Party Heaven-Leigh. While Eric focused his public attacks on TikTok (claiming 12 years of violent battery, warrants, and loan fraud), Heaven-Leigh simultaneously deployed Facebook posts and direct messaging to alienate the minor children:
        </p>

        {/* Timeline Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-semibold text-rose-400">
              <span>Respondent: Eric Greene (&quot;hulk&quot;)</span>
              <span className="text-[10px] font-mono-legal text-slate-500">TikTok Public Anchor</span>
            </div>
            <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc list-inside">
              <li>Posts photo of Tiffany and Pedro labeling them abusers (Jan 18).</li>
              <li>Falsely publishes warrants and drug rehab flight in comments (Jan 19).</li>
              <li>Broadcasts children’s names and questions youngest child’s paternity (Feb 14).</li>
              <li>Sends violent video threat directly to inbox (Jun 18).</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-semibold text-purple-400">
              <span>Third Party: Heaven-Leigh</span>
              <span className="text-[10px] font-mono-legal text-slate-500">Facebook &amp; Household Child Infiltration</span>
            </div>
            <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc list-inside">
              <li>Publishes child abandonment accusations on Facebook (Feb 4).</li>
              <li>Claims Tiffany is not the biological mother to public community (Feb 4).</li>
              <li>Expressly confirms direct disparagement to minor children (Feb 5).</li>
              <li>Maintains access to children inside Respondent&apos;s physical residence.</li>
            </ul>
          </div>
        </div>

        <div className="p-3 rounded bg-purple-950/30 border border-purple-900/30 text-purple-300 text-xs">
          <strong>Litigation Rule:</strong> Under common-law civil conspiracy and agency principles, the acts of Heaven-Leigh are directly attributable to Respondent Eric Greene because he knowingly harbors, permits, and acts in concert with her to accomplish the common objective of destroying Petitioner&apos;s maternal bond and community reputation.
        </div>
      </div>

      {/* Synthesis 3: Defense Vulnerability & Tactical Mitigation (Mugshot Post) */}
      <div className="rounded-lg border border-amber-900/50 bg-slate-900 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-amber-300 font-serif-court">
              C. Defense Vulnerability Audit: Evaluation of Petitioner&apos;s Public Mugshot Comment (Ex. 04)
            </h3>
          </div>
          <span className="text-[11px] text-amber-400 font-mono-legal">
            Tactical Risk &amp; DARVO Mitigation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-2 p-3.5 rounded bg-slate-950 border border-slate-800">
            <h4 className="font-semibold text-rose-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Opposing Counsel&apos;s Anticipated Arguments
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc list-inside">
              <li>
                <strong>Doctrine of Unclean Hands:</strong> Respondent’s counsel will argue that Petitioner engaged in reciprocal online defamation by publishing his 2019 arrest docket photograph in a public comment section on January 22, 2026.
              </li>
              <li>
                <strong>Mutual Combat / Mutual Injunction:</strong> Opposing counsel will seek to dilute Petitioner’s claims by requesting a &quot;mutual protective order,&quot; framing both parties as toxic co-combatants in an internet brawl.
              </li>
              <li>
                <strong>Social Media Exposure:</strong> Opposing counsel will claim Petitioner escalated marital litigation into the public sphere accessible to mutual acquaintances and children.
              </li>
            </ul>
          </div>

          <div className="space-y-2 p-3.5 rounded bg-slate-950 border border-slate-800">
            <h4 className="font-semibold text-emerald-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Litigation Counter-Strategy &amp; Defense of Truth
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc list-inside">
              <li>
                <strong>Absolute Truth of Certified Record:</strong> The 2019 booking docket is a certified public record. Defamation requires falsity; truth is an absolute bar. Unlike Respondent’s fabricated claims of warrants and rehab flight, Petitioner’s post was 100% factually accurate.
              </li>
              <li>
                <strong>Rebuttal of 12-Year Abuse Narrative (DARVO Defense):</strong> Petitioner’s single comment was an immediate defensive rebuttal to Respondent’s false claim that she abused him for 12 years—showing that the sole domestic violence arrest in the marriage was committed by Respondent against Petitioner.
              </li>
              <li>
                <strong>Mandatory Disengagement Protocol:</strong> Litigation counsel must instruct Petitioner to <strong>cease all social media engagement immediately</strong>. Continued replies dilute standing for emergency equitable relief.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
