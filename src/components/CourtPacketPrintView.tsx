import React, { useState } from 'react';
import { ForensicExhibit } from '../types/forensic';
import {
  Printer,
  Copy,
  Check,
  ShieldCheck,
  FileText,
  Lock,
  Download,
  Scale,
  Hash,
} from 'lucide-react';

interface CourtPacketPrintViewProps {
  exhibits: ForensicExhibit[];
}

export const CourtPacketPrintView: React.FC<CourtPacketPrintViewProps> = ({ exhibits }) => {
  const [copiedDeclaration, setCopiedDeclaration] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyDeclaration = () => {
    const text = `DECLARATION OF CUSTODIAN OF ELECTRONIC RECORDS
PURSUANT TO FEDERAL RULE OF EVIDENCE 902(14) AND STATE EVIDENCE CODES

IN THE DISTRICT COURT OF THE FIRST JUDICIAL DISTRICT
IN AND FOR THE COUNTY OF ________________, STATE OF ________________
CASE NO.: 2026-CV-0891

TIFFANY RENEA GREENE, Petitioner, v. ERIC GREENE, Respondent.

I, the undersigned Digital Forensic Case Specialist and Custodian of Electronic Records, declare under penalty of perjury under the laws of the United States and the State of ________________:

1. I am an adult individual over the age of eighteen years, of sound mind, and fully competent to make this declaration. I make this declaration in support of Petitioner Tiffany Renea Greene's Verified Application for Injunctive Relief and Master Evidentiary Packet.
2. In my capacity as Forensic Case Custodian, I was tasked with the acquisition, preservation, forensic hashing, and indexing of all electronic data, digital screen captures, video archives, and direct correspondence comprising Exhibits TRG-0001 through TRG-${exhibits.length.toString().padStart(4, '0')}.
3. The records described in the Master Evidence Register attached hereto were generated, transmitted, and received through electronic communication platforms (including TikTok, Facebook, SMS, and Instagram Direct Messaging).
4. Each electronic file was acquired using industry-standard digital forensic extraction techniques designed to preserve native bitstream integrity without alteration, truncation, or editorial deletion.
5. Immediately upon acquisition, a sixty-four (64) character cryptographic hash digest was generated for each artifact utilizing the Secure Hash Algorithm 256 (SHA-256) via standard cryptographic hardware/software engines.
6. The SHA-256 hash value for each exhibit is set forth in the Unified Master Evidence Table. Any unauthorized modification, deletion, or bitstream alteration of an exhibit would result in a completely divergent hash digest.
7. Exhibit TRG-0001 constitutes the formal Written Cease Notice establishing the baseline legal cutoff for all subsequent harassment and likeness claims.
8. Exhibit TRG-0004 constitutes Petitioner's certified affirmative defense and factual rebuttal of truth pursuant to certified public records, rebutting Respondent's false claims of domestic violence.
9. Pursuant to applicable Family Court Privacy Rules and Federal Rule of Civil Procedure 5.2, exhibits containing depictions or names of the parties' minor children (including TRG-0008 and TRG-0010) have been redacted solely to mask minor child identifiers to initials ([H.G.], [P.G.], [E.G.]), with original unredacted master hashes securely preserved.
10. All timestamps have been standardized against canonical ISO-8601 UTC time, with local Eastern Time properly distinguishing Eastern Standard Time (EST / UTC-5) and Eastern Daylight Time (EDT / UTC-4) based on the March 8, 2026 Daylight Saving Time transition.
11. Exhibits TRG-0013 through TRG-${exhibits.length.toString().padStart(4, '0')} constitute certified self-authenticating public records and official law enforcement affidavits pursuant to Federal Rules of Evidence 902(1) and 902(2), incorporating certified Pasco County Sheriff criminal arrest affidavits, FBI Internet Crime Complaint Center (IC3) filings, Florida Department of Revenue child support establishment and pediatric medical deprivation dockets, FTC TakeItDown / Identity Theft reports, and Florida Sixth Judicial Circuit dissolution pleadings.

I declare under penalty of perjury under the laws of the State of ________________ that the foregoing is true and correct.

Executed this 5th day of October, 2026.

_______________________________________________
FORENSIC CUSTODIAN OF ELECTRONIC RECORDS`;

    navigator.clipboard.writeText(text);
    setCopiedDeclaration(true);
    setTimeout(() => setCopiedDeclaration(false), 2000);
  };

  const downloadJsonDigest = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exhibits, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `TRG_Court_Packet_Master_Digest_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Control Bar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-slate-900 p-5 rounded-lg border border-slate-800">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider">
            Court-Admissible Export Engine · FRE 902(14) · FRCP 5.2 Compliant
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1">
            Master Litigation Packet &amp; Exhibit Cover Sheets
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Complete court-filing packet containing the Pleading Cover Sheet, FRE 902(14) Custodian Declaration,
            Master Bates Index (TRG-0001+), standardized EDT/EST timestamps, and individual Exhibit Divider Sheets with FRCP 5.2 minor privacy redactions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={downloadJsonDigest}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors font-mono-legal"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Download JSON Digest</span>
          </button>
          <button
            onClick={handleCopyDeclaration}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors font-mono-legal"
          >
            {copiedDeclaration ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedDeclaration ? 'Declaration Copied' : 'Copy FRE 902(14) Affidavit'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors shadow-lg"
          >
            <Printer className="w-4 h-4" />
            <span>Print Court Packet (PDF)</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE COURT PACKET BODY */}
      <div className="pleading-paper-sheet bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-12 shadow-2xl space-y-12 text-slate-200">
        {/* ============================================================== */}
        {/* PART I: FORMAL PLEADING HEADER & CAPTION                       */}
        {/* ============================================================== */}
        <section className="space-y-6">
          <div className="text-center border-b-2 border-slate-700 pb-5 space-y-1.5">
            <div className="font-serif-court font-bold text-base sm:text-lg tracking-wider uppercase text-slate-100 print-text-black">
              IN THE DISTRICT COURT OF THE FIRST JUDICIAL DISTRICT
            </div>
            <div className="font-serif-court text-xs sm:text-sm text-slate-300 print-text-black">
              IN AND FOR THE COUNTY OF ________________, STATE OF ________________
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 border-b-2 border-slate-700 pb-6 font-mono-legal text-xs print-text-black">
            <div className="col-span-7 space-y-1">
              <div>IN RE THE MARRIAGE / CUSTODY OF:</div>
              <div className="font-bold text-slate-100 print-text-black text-sm">TIFFANY RENEA GREENE,</div>
              <div className="pl-6 italic text-slate-400 print-text-black">Petitioner,</div>
              <div>and</div>
              <div className="font-bold text-slate-100 print-text-black text-sm">ERIC GREENE,</div>
              <div className="pl-6 italic text-slate-400 print-text-black">Respondent.</div>
            </div>
            <div className="col-span-1 border-r border-slate-700 flex items-center justify-center text-slate-500 font-bold text-lg">
              )
            </div>
            <div className="col-span-4 pl-3 space-y-1">
              <div>CASE NO.: <span className="font-bold">2026-CV-0891</span></div>
              <div className="font-bold text-amber-400 print-text-black pt-2 uppercase text-[11px] leading-tight">
                MASTER FORENSIC EVIDENCE PACKET &amp; CUSTODIAN CERTIFICATION (FRE 902(14))
              </div>
              <div className="text-[10px] text-slate-400 print-text-black">
                BATES RANGE: TRG-0001 THROUGH TRG-{exhibits.length.toString().padStart(4, '0')}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PART II: DECLARATION OF CUSTODIAN OF ELECTRONIC RECORDS       */}
        {/* ============================================================== */}
        <section className="space-y-4 font-serif-court text-xs sm:text-sm leading-relaxed border-b-2 border-slate-700 pb-8 print-text-black">
          <h3 className="font-bold text-slate-100 print-text-black text-sm uppercase tracking-wide text-center">
            DECLARATION OF CUSTODIAN OF ELECTRONIC RECORDS PURSUANT TO FEDERAL RULE OF EVIDENCE 902(14)
          </h3>

          <p className="italic text-slate-300 print-text-black">
            I, the undersigned Certified Forensic Case Custodian and Litigation Specialist, declare under penalty of perjury
            pursuant to the laws of the United States and the State of ________________:
          </p>

          <div className="space-y-2.5 font-sans text-xs text-slate-300 print-text-black pl-2 sm:pl-4">
            <p>
              <strong>1. Competency &amp; Role:</strong> I am an adult of sound mind, over eighteen years of age, and fully competent to testify to the authenticity, preservation, and forensic chain of custody of the electronic evidence compiled herein.
            </p>
            <p>
              <strong>2. Forensic Acquisition:</strong> All digital files, video recordings, audio tracks, and communications indexed in this Master Evidence Packet under Bates numbers <strong>TRG-0001 through TRG-{exhibits.length.toString().padStart(4, '0')}</strong> were acquired from native device exports and authenticated web repositories using reliable electronic forensic extraction methodologies (Fed. R. Evid. 901).
            </p>
            <p>
              <strong>3. SHA-256 Cryptographic Verification:</strong> Immediately upon extraction, a sixty-four (64) character SHA-256 cryptographic hash digest was generated for each digital artifact using verified cryptographic hashing processes. These hash values are set forth in the Master Evidence Table below and constitute self-authenticating digital fingerprints under <strong>Federal Rule of Evidence 902(14)</strong>. Any modification to any artifact would produce an irreconcilable variance in its hash value.
            </p>
            <p>
              <strong>4. Baseline Notice &amp; Affirmative Defense Distinction:</strong> Exhibit TRG-0001 represents the formal Written Cease Notice establishing the legal cutoff baseline. Exhibit TRG-0004 constitutes Petitioner&apos;s affirmative defense and evidentiary rebuttal of truth, authenticated by certified criminal docket records.
            </p>
            <p>
              <strong>5. Standardized Timezone &amp; FRCP 5.2 Redaction:</strong> All timestamps have been mapped to canonical ISO-8601 UTC with standardized Eastern Standard (EST / UTC-5) and Eastern Daylight (EDT / UTC-4) time. In full compliance with FRCP 5.2 and Family Court privacy rules, minor child names and vocal identifiers have been redacted to initials ([H.G.], [P.G.], [E.G.]), with original unredacted master hashes securely preserved.
            </p>
            <p>
              <strong>6. Certified Public Records &amp; Agency Dockets (FRE 902(1)/(2)):</strong> Exhibits TRG-0013 through TRG-{exhibits.length.toString().padStart(4, '0')} comprise self-authenticating official records under Federal Rule of Evidence 902(1) and 902(2), including certified law enforcement arrest affidavits (Pasco County Sheriff Domestic Battery &amp; Aggravated Assault with a Handgun), Federal Bureau of Investigation (FBI) IC3 filings, Florida Department of Revenue child support establishment and medical records access filings, FTC TakeItDown / Identity Theft reports, and Florida Sixth Judicial Circuit dissolution pleadings.
            </p>
          </div>

          <div className="pt-6 font-mono-legal text-xs grid grid-cols-1 sm:grid-cols-2 gap-6 print-text-black">
            <div>
              <div>Executed this 5th day of October, 2026.</div>
              <div className="mt-1 text-slate-400 print-text-black">Location: ________________________</div>
            </div>
            <div className="text-right">
              <div className="inline-block border-b border-slate-400 w-56 pb-1">&nbsp;</div>
              <div className="font-bold text-slate-100 print-text-black mt-1">FORENSIC CASE CUSTODIAN</div>
              <div className="text-[11px] text-slate-400 print-text-black">Certified Digital Records Examiner</div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PART III: UNIFIED MASTER EVIDENCE TABLE                        */}
        {/* ============================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 print-text-black text-sm uppercase tracking-wide font-serif-court">
              Unified Master Evidence Table (Cryptographic Checksum Ledger)
            </h3>
            <span className="text-[11px] font-mono-legal text-amber-400 print-text-black">
              {exhibits.length} Preserved Artifacts
            </span>
          </div>

          <div className="overflow-x-auto rounded border border-slate-700 bg-slate-950">
            <table className="w-full text-left text-[11px] font-mono-legal divide-y divide-slate-800 print-text-black">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] print-text-black">
                <tr>
                  <th className="px-3 py-2">Bates No.</th>
                  <th className="px-3 py-2">Standardized Time (UTC &amp; Local)</th>
                  <th className="px-3 py-2">Platform &amp; Parties</th>
                  <th className="px-3 py-2 min-w-[200px]">Statutory Classifications</th>
                  <th className="px-3 py-2 min-w-[180px]">SHA-256 Cryptographic Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 print-text-black">
                {exhibits.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-900/40">
                    <td className="px-3 py-2 font-bold text-amber-400 print-text-black align-top whitespace-nowrap">
                      {ex.batesNumber}
                    </td>
                    <td className="px-3 py-2 align-top text-[10px]">
                      <div>{ex.timestampUtc}</div>
                      <div className="text-slate-400 print-text-black">{ex.timestampLocal}</div>
                    </td>
                    <td className="px-3 py-2 align-top text-[10px]">
                      <div className="font-semibold text-slate-200 print-text-black">{ex.platform}</div>
                      <div className="truncate max-w-[140px] text-slate-400 print-text-black">{ex.sourceAccount}</div>
                    </td>
                    <td className="px-3 py-2 align-top text-[10px] space-y-0.5">
                      {ex.statutoryTags.map((t) => (
                        <div key={t} className="text-slate-300 print-text-black">· {t}</div>
                      ))}
                    </td>
                    <td className="px-3 py-2 align-top text-[10px] text-amber-300 print-text-black break-all select-all font-mono">
                      {ex.sha256Hash}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PART IV: EXHIBIT DIVIDER SHEETS (PAGE BREAK BEFORE EACH)       */}
        {/* ============================================================== */}
        <section className="space-y-12">
          {exhibits.map((ex) => (
            <div
              key={ex.id}
              className="page-break pt-8 border-t-2 border-slate-700 space-y-6 print-text-black"
            >
              {/* Florida Standard Exhibit Cover Tab Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-700 pb-3 gap-2">
                <div>
                  <div className="text-[11px] text-amber-400 font-mono-legal print-text-black uppercase tracking-wider">
                    PETITIONER&apos;S EXHIBIT MARKED FOR IDENTIFICATION
                  </div>
                  <h4 className="text-2xl font-bold font-mono-legal text-slate-100 print-text-black">
                    EXHIBIT {ex.batesNumber}
                  </h4>
                </div>
                <div className="text-left sm:text-right font-mono-legal text-xs space-y-0.5">
                  <div className="text-slate-400 print-text-black">Reference: {ex.id} · {ex.platform}</div>
                  <div className="text-emerald-400 print-text-black font-semibold text-[11px]">
                    Self-Authenticating: Fla. Stat. § 90.902 / FRE 902
                  </div>
                </div>
              </div>

              {/* Redaction Compliance Banner (if applicable) */}
              {ex.redactionStatus.isRedacted && (
                <div className="p-3 bg-rose-950/60 border border-rose-800 rounded text-rose-200 text-xs font-mono-legal space-y-1 print-text-black">
                  <div className="flex items-center gap-1.5 font-bold uppercase text-[11px] text-rose-300 print-text-black">
                    <Lock className="w-3.5 h-3.5" />
                    <span>REDACTED PURSUANT TO FAMILY COURT PRIVACY RULES (FRCP 5.2) — MINOR PII MASKED</span>
                  </div>
                  <p className="text-[11px]">
                    {ex.redactionStatus.redactionReason ||
                      'Minor children vocal and visual likenesses masked pursuant to FRCP 5.2 and Family Court Privacy Rules.'}
                  </p>
                  <div className="text-[10px] text-slate-400 print-text-black">
                    Master Unredacted Hash: {ex.redactionStatus.unredactedHash}
                  </div>
                </div>
              )}

              {/* Exhibit Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded border border-slate-800 font-mono-legal text-xs print-text-black">
                <div>
                  <div className="text-slate-500 text-[10px] uppercase print-text-black">UTC Timestamp</div>
                  <div className="font-semibold text-slate-200 print-text-black text-[11px] mt-0.5">{ex.timestampUtc}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase print-text-black">Local Device Time</div>
                  <div className="font-semibold text-slate-200 print-text-black text-[11px] mt-0.5">{ex.timestampLocal}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase print-text-black">Originating Account</div>
                  <div className="font-semibold text-slate-200 print-text-black text-[11px] mt-0.5 truncate">{ex.sourceAccount}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase print-text-black">Target Account</div>
                  <div className="font-semibold text-slate-200 print-text-black text-[11px] mt-0.5 truncate">{ex.targetAccount}</div>
                </div>
              </div>

              {/* Certified Transcription */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold print-text-black">
                  <span className="text-slate-400 font-mono-legal uppercase print-text-black">
                    Certified Verbatim Transcription (F.R.E. 902):
                  </span>
                  <span className="text-emerald-400 text-[11px] font-mono-legal print-text-black">
                    Certified by {ex.transcription.certifierName}
                  </span>
                </div>
                <div className="p-4 bg-slate-900 rounded border border-slate-800 font-mono-legal text-xs text-slate-100 whitespace-pre-wrap leading-relaxed print-text-black">
                  {ex.transcription.rawText}
                </div>
              </div>

              {/* Cryptographic Hash Verification Box */}
              <div className="p-3 bg-slate-950 rounded border border-slate-800 font-mono-legal text-xs space-y-1 print-text-black">
                <div className="text-amber-400 text-[11px] font-bold uppercase print-text-black flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" />
                  <span>SHA-256 Cryptographic Checksum:</span>
                </div>
                <div className="text-slate-200 break-all select-all print-text-black text-[11px]">
                  {ex.sha256Hash}
                </div>
                <div className="text-[10px] text-slate-400 print-text-black">
                  File: {ex.sourceFile.fileName} ({ex.sourceFile.fileSizeBytes.toLocaleString()} bytes, {ex.sourceFile.mimeType})
                </div>
              </div>

              {/* Chain of Custody Table */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase font-mono-legal print-text-black">
                  Chain of Custody Log (F.R.E. 901):
                </div>
                <table className="w-full text-left text-[10px] font-mono-legal divide-y divide-slate-800 border border-slate-800 print-text-black">
                  <thead className="bg-slate-900 text-slate-400 print-text-black">
                    <tr>
                      <th className="px-2.5 py-1.5">Action</th>
                      <th className="px-2.5 py-1.5">Timestamp (UTC)</th>
                      <th className="px-2.5 py-1.5">Operator</th>
                      <th className="px-2.5 py-1.5">Forensic Station</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 print-text-black">
                    {ex.custodyChain.map((c, i) => (
                      <tr key={i}>
                        <td className="px-2.5 py-1.5 text-amber-400 font-bold print-text-black">{c.action}</td>
                        <td className="px-2.5 py-1.5">{c.timestamp}</td>
                        <td className="px-2.5 py-1.5">{c.operator}</td>
                        <td className="px-2.5 py-1.5 text-slate-400 print-text-black">{c.deviceInfo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
