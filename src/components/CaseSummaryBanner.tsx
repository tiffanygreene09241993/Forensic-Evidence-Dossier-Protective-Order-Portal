import React from 'react';
import { JurisdictionCode } from '../types/forensic';
import { JURISDICTIONS } from '../data/jurisdictionData';
import { AlertTriangle, ShieldAlert, Globe, Shield, BookOpen } from 'lucide-react';

interface CaseSummaryBannerProps {
  exhibitCount: number;
  emergencyCount: number;
  jurisdiction: JurisdictionCode;
  onSelectJurisdiction: (code: JurisdictionCode) => void;
  isRedacted: boolean;
  onToggleRedacted: () => void;
}

export const CaseSummaryBanner: React.FC<CaseSummaryBannerProps> = ({
  exhibitCount,
  emergencyCount,
  jurisdiction,
  onSelectJurisdiction,
  isRedacted,
  onToggleRedacted,
}) => {
  const currentJurisdiction = JURISDICTIONS[jurisdiction];

  return (
    <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Caption Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-500 font-mono-legal tracking-wide uppercase">
              <span>{currentJurisdiction.courtTitle}</span>
              <span aria-hidden="true">·</span>
              <span>Case Audit No. 2026-CV-0891</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400 font-semibold">{currentJurisdiction.citationPrefix}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1 tracking-tight">
              Tiffany Renea Greene v. Eric Greene (&quot;hulk&quot;)
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              In Re Custody of Minor Children &amp; In Re: Third Party Heaven-Leigh · Interstate Civil Tort &amp; Restraining Order Dossier
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Jurisdiction Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-mono-legal">Jurisdiction</div>
                <select
                  aria-label="Jurisdiction selector"
                  value={jurisdiction}
                  onChange={(e) => onSelectJurisdiction(e.target.value as JurisdictionCode)}
                  className="bg-transparent text-xs font-semibold text-amber-300 focus:outline-none cursor-pointer"
                >
                  <option value="universal" className="bg-slate-900 text-slate-100">Universal State / Fed Standard</option>
                  <option value="california" className="bg-slate-900 text-slate-100">California Superior (DVPA § 6200)</option>
                  <option value="texas" className="bg-slate-900 text-slate-100">Texas District (Fam Code § 85)</option>
                  <option value="florida" className="bg-slate-900 text-slate-100">Florida Circuit (F.S. § 741.30)</option>
                </select>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/50 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <div className="text-left">
                <div className="text-[11px] font-semibold text-rose-300">
                  {emergencyCount} Emergency Threat Triggers
                </div>
                <div className="text-[10px] text-rose-400/80">
                  Physical Threat &amp; FRE 801(d)(2) Admissions
                </div>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <div className="text-[11px] font-semibold text-slate-200">
                  {exhibitCount} Preserved Exhibits
                </div>
                <div className="text-[10px] text-slate-400">
                  Bates Range: TRG-0001 to TRG-{exhibitCount.toString().padStart(4, '0')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Factual Ledger Grid with Statutory Rule Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-slate-500 font-medium">Petitioner</div>
            <div className="text-slate-200 font-medium mt-0.5">Tiffany Renea Greene</div>
            <div className="text-[11px] text-slate-400">Partner: Pedro</div>
          </div>

          <div>
            <div className="text-slate-500 font-medium">Respondent &amp; Domestic Agent</div>
            <div className="text-slate-200 font-medium mt-0.5">Eric Greene (TikTok: &quot;hulk&quot;)</div>
            <div className="text-[11px] text-slate-400">Third Party: Heaven-Leigh</div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Minor Children Involved</span>
              <button
                onClick={onToggleRedacted}
                className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5"
                title="Toggle minor redaction"
              >
                <Shield className="w-2.5 h-2.5" />
                <span>{isRedacted ? 'FRCP 5.2 Masked' : 'Show Masked'}</span>
              </button>
            </div>
            <div className="text-slate-200 font-medium mt-0.5">
              {isRedacted ? (
                <span className="text-emerald-300 font-mono-legal">[S.G.], [K.G.], [P.G.], [H.G.], [E.G.]</span>
              ) : (
                <span>Sarah (11), Kayleen (9), Peighton (6), Hunter (4), Emmalynn (1)</span>
              )}
            </div>
            <div className="text-[10px] text-slate-400">
              {isRedacted ? 'Minor identities shielded for court filing' : 'Confidential Counsel Working View'}
            </div>
          </div>

          <div>
            <div className="text-slate-500 font-medium">Bright-Line Separation &amp; Cease Notice</div>
            <div className="text-slate-200 font-medium mt-0.5">Married May 2012</div>
            <div className="text-[11px] text-amber-400/90 font-mono-legal">
              Cease Notice: Jan 14, 2026 (TRG-0001)
            </div>
          </div>
        </div>

        {/* Dynamic Statutory Framework Bar */}
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2 text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-slate-400">Governing Statutes:</span>
            <span className="text-slate-200 font-medium">{currentJurisdiction.dvpoStatute}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200">{currentJurisdiction.stalkingStatute}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200">{currentJurisdiction.evidenceCodeRules}</span>
          </div>
          <div className="text-slate-400 font-mono-legal text-[10px]">
            Authentication: FRE 902(13)/(14) Self-Authenticating Digital Media
          </div>
        </div>
      </div>
    </div>
  );
};
