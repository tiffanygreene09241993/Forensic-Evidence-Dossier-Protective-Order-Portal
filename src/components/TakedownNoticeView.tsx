import React, { useState } from 'react';
import { Copy, Check, Send, AlertTriangle, ShieldAlert, ExternalLink } from 'lucide-react';

export const TakedownNoticeView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const noticeText = `FORMAL LEGAL DEMAND & EMERGENCY PRE-LITIGATION TAKEDOWN NOTICE
DATE: October 5, 2026

TO:
TIKTOK INC. / BYTEDANCE LTD.
ATTN: LEGAL OPERATIONS & TRUST & SAFETY / LAW ENFORCEMENT RESPONSE TEAM
5800 BRISTOL PARKWAY, CULVER CITY, CA 90230
ELECTRONIC SUBMISSION: legal@tiktok.com / reports@tiktok.com

CC: META PLATFORMS, INC. (LEGAL OPERATIONS - FACEBOOK / INSTAGRAM)

RE: EMERGENCY NOTICE OF CYBER-HARASSMENT, THREATS OF VIOLENCE, NON-CONSENSUAL LIKENESS APPROPRIATION, AND DEFAMATION PER SE
REPORTED ACCOUNT: @hulk (USER: ERIC GREENE)
REPORTED THIRD-PARTY ACCOUNT: HEAVEN-LEIGH (FACEBOOK / INSTAGRAM)
TARGET / VICTIM: TIFFANY RENEA GREENE & MINOR CHILDREN

Dear Legal Operations and Trust & Safety Directors:

This formal communication serves as formal pre-litigation notice on behalf of Tiffany Renea Greene ("Petitioner"). You are hereby formally notified that the TikTok user account @hulk (operated by Eric Greene) is being willfully and maliciously utilized to conduct an ongoing, systemic campaign of targeted cyber-harassment, threats of physical domestic violence, defamation per se, and non-consensual exploitation of minor children's identities and images.

1. SPECIFIC VIOLATIONS OF TIKTOK COMMUNITY GUIDELINES & APPLICABLE LAW

A. Direct Threats of Bodily Harm & Physical Violence:
Under TikTok's "Violent and Hateful Entities / Threats of Violence" policy, users are strictly prohibited from publishing or transmitting threats of physical injury. On June 18, 2026, user @hulk recorded and transmitted a video stating: "I should beat her ass / But my momma said animal abuse is wrong." This constitutes an actionable threat of physical battery, dehumanizing the victim and inciting real-world violence.

B. Defamation Per Se & Harassment / Bullying:
User @hulk has repeatedly published video broadcasts and comment replies falsely accusing Petitioner of felony criminal offenses, including:
- Falsely publishing on January 18, 2026: "My abuser and her fling... She would hit me for 12 years and now plays the victim."
- Falsely publishing on January 19, 2026: "She has an active warrant out for her arrest. She ran from the state so she wouldn't have to go to court-ordered rehab."
- Falsely publishing on June 15, 2026: Accusing Petitioner of felony bank loan fraud and identity theft.
These statements are demonstrably false. Petitioner has no criminal record, zero active warrants, and has never been subject to drug rehabilitation orders. These publications violate TikTok's policies against Harassment, Bullying, and Hateful Behavior.

C. Non-Consensual Personal Information & Minor Likeness Exploitation:
On January 14, 2026, Petitioner served an express written revocation of consent barring Eric Greene from posting her photographs, likeness, or private life. In direct defiance:
- On February 14, 2026, user @hulk broadcast a live stream disclosing the identities and names of five minor children (including Hunter and Peighton), asserting false claims of child abandonment and paternity fraud.
- On March 15, 2026, user @hulk uploaded photo collages displaying the uncropped faces of minor children without consent.
This violates TikTok's strict protections regarding Youth Safety and Non-Consensual Personal Imagery.

2. PRESERVATION DEMAND (18 U.S.C. § 2703(f) & CIVIL EVIDENCE PRESERVATION)
TikTok Inc. and its parent ByteDance Ltd. are hereby demanded to IMMEDIATELY PRESERVE all digital evidence, including:
- Native video files, drafts, live stream archives, comment logs, and direct messaging logs for account @hulk.
- User registration data, IP login histories, MAC addresses, device identifiers, and telephone verification records associated with account @hulk.
Failure to preserve these records will be cited in pending judicial proceedings as intentional spoliation of evidence.

3. DEMAND FOR IMMEDIATE TAKEDOWN & ACCOUNT SUSPENSION
Due to the imminent threat of domestic violence and ongoing reputational destruction, demand is hereby made for:
1. Immediate permanent removal and deletion of all reported video posts, comments, live broadcast archives, and image collages referencing Tiffany Renea Greene or her minor children.
2. Immediate permanent suspension or termination of TikTok account @hulk for repeated, catastrophic violations of Community Guidelines.
3. Written confirmation of compliance within twenty-four (24) hours of receipt of this notice.

Failure to promptly remediate this unlawful conduct will expose the platform to third-party liability for maintaining defamatory, threatening material following actual, verified notice.

Respectfully submitted,

/s/ Legal Counsel & Forensic Case Specialist for Tiffany Renea Greene
Email: hisqueen073119@gmail.com`;

  const handleCopy = () => {
    navigator.clipboard.writeText(noticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider">
            Section 6 · Platform Operations Dispatch
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1">
            Platform Legal Operations Takedown Notice
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Formal 24-hour demand letter for TikTok Trust &amp; Safety and Meta Legal Operations, citing specific policy
            infractions, 18 U.S.C. § 2703(f) evidence preservation, and demanding immediate account suspension.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors font-semibold"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Legal Notice' : 'Copy Takedown Notice'}</span>
          </button>
        </div>
      </div>

      {/* Target Accounts Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="text-slate-400 text-xs font-medium">Primary Target Account</div>
          <div className="text-rose-400 font-mono-legal font-bold text-sm">TikTok: @hulk</div>
          <div className="text-[11px] text-slate-400">User: Eric Greene (Respondent)</div>
        </div>

        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="text-slate-400 text-xs font-medium">Third-Party Domestic Account</div>
          <div className="text-purple-400 font-mono-legal font-bold text-sm">Meta: Heaven-Leigh</div>
          <div className="text-[11px] text-slate-400">Platform: Facebook / Instagram Messenger</div>
        </div>

        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
          <div className="text-slate-400 text-xs font-medium">Demand Window</div>
          <div className="text-amber-400 font-mono-legal font-bold text-sm">24-Hour Mandatory Purge</div>
          <div className="text-[11px] text-slate-400">18 U.S.C. § 2703(f) Evidence Preservation</div>
        </div>
      </div>

      {/* Document View */}
      <div className="rounded-lg border border-slate-700 bg-slate-950 p-6 sm:p-10 font-mono-legal text-xs text-slate-300 shadow-xl space-y-4 whitespace-pre-wrap leading-relaxed">
        {noticeText}
      </div>
    </div>
  );
};
