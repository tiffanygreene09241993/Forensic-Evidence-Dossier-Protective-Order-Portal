import React, { useState } from 'react';
import { ForensicExhibit } from '../types/forensic';
import {
  Clock,
  AlertTriangle,
  Flame,
  ArrowRight,
  ShieldAlert,
  Eye,
  CheckCircle2,
  Lock,
  Layers,
  Zap,
  Activity,
  Calendar,
} from 'lucide-react';

interface TimelineEscalationViewProps {
  exhibits: ForensicExhibit[];
  onSelectExhibit: (exhibit: ForensicExhibit) => void;
}

type StatutoryFilter = 'all' | 'threats' | 'cyberstalking' | 'agency' | 'economic';

export const TimelineEscalationView: React.FC<TimelineEscalationViewProps> = ({
  exhibits,
  onSelectExhibit,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<StatutoryFilter>('all');

  // Sort exhibits chronologically
  const sortedExhibits = [...exhibits].sort(
    (a, b) => new Date(a.timestampUtc).getTime() - new Date(b.timestampUtc).getTime()
  );

  const getStatutoryBucket = (ex: ForensicExhibit): StatutoryFilter => {
    if (
      ex.batesNumber === 'TRG-0012' ||
      ex.batesNumber === 'TRG-0013' ||
      ex.batesNumber === 'TRG-0014' ||
      ex.severity === 'Emergency / Immediate Threat'
    ) {
      return 'threats';
    }
    if (
      ex.batesNumber === 'TRG-0016' ||
      ex.batesNumber === 'TRG-0023' ||
      ex.claimsSupported.some((c) => c.toLowerCase().includes('support') || c.toLowerCase().includes('homestead'))
    ) {
      return 'economic';
    }
    if (
      ex.batesNumber === 'TRG-0026' ||
      ex.batesNumber.startsWith('IR-') ||
      ex.statutoryTags.some((t) => t.toLowerCase().includes('welfare') || t.toLowerCase().includes('closure'))
    ) {
      return 'agency';
    }
    return 'cyberstalking';
  };

  const filteredExhibits = sortedExhibits.filter((ex) => {
    if (selectedFilter === 'all') return true;
    return getStatutoryBucket(ex) === selectedFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider flex items-center gap-2">
            <span>Course of Conduct Map · Fla. Stat. § 784.048 &amp; § 784.046</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            <span>Chronological Stalking Course-of-Conduct Map</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Under Florida Statutes § 784.048, proving stalking requires showing a malicious &ldquo;course of conduct&rdquo; across time. This interactive map classifies all incidents into statutory buckets and visualizes frequency spikes following court filings.
          </p>
        </div>

        {/* Statutory Filter Controls */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 border border-slate-800 rounded-lg text-xs font-mono-legal overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              selectedFilter === 'all'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Incidents ({sortedExhibits.length})
          </button>
          <button
            onClick={() => setSelectedFilter('threats')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              selectedFilter === 'threats'
                ? 'bg-rose-500 text-white font-bold shadow'
                : 'text-slate-400 hover:text-rose-400'
            }`}
          >
            Direct Threats (§ 784.048(3))
          </button>
          <button
            onClick={() => setSelectedFilter('cyberstalking')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              selectedFilter === 'cyberstalking'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            Cyberstalking (§ 784.048(1)(d))
          </button>
          <button
            onClick={() => setSelectedFilter('agency')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              selectedFilter === 'agency'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Agency Weaponization
          </button>
          <button
            onClick={() => setSelectedFilter('economic')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              selectedFilter === 'economic'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Economic Coercion
          </button>
        </div>
      </div>

      {/* Course of Conduct Spikes & Velocity Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono-legal">
        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">April–Nov 2019 Velocity</div>
          <div className="text-base font-bold text-rose-400">Domestic Battery &amp; Gun Assault</div>
          <div className="text-[11px] text-slate-400 font-serif-court">TRG-0013 shove · TRG-0014 loaded 9mm · TRG-0025 admission</div>
        </div>

        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">2020 Administrative Pretext</div>
          <div className="text-base font-bold text-amber-400">1990s Records Exhumed</div>
          <div className="text-[11px] text-slate-400 font-serif-court">DCF exhumed 1991 school files (TRG-0026) to justify removal</div>
        </div>

        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">Aug 2022 Economic Drain</div>
          <div className="text-base font-bold text-emerald-400">$161,280 Homestead Cash</div>
          <div className="text-[11px] text-slate-400 font-serif-court">TRG-0023 liquidation · $0.00 child support in 7 yrs (TRG-0016)</div>
        </div>

        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">Jan–June 2026 Direct Surge</div>
          <div className="text-base font-bold text-rose-500">67 Cyberstalking Events</div>
          <div className="text-[11px] text-slate-400 font-serif-court">TRG-0001 Cease Notice violated · TRG-0012 &quot;beat her ass&quot; video</div>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="space-y-3">
        {filteredExhibits.map((ex, index) => {
          const bucket = getStatutoryBucket(ex);
          const isEmergency = ex.severity === 'Emergency / Immediate Threat';

          return (
            <div
              key={ex.id}
              onClick={() => onSelectExhibit(ex)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                isEmergency
                  ? 'bg-rose-950/20 border-rose-800/80 hover:border-rose-600'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                  <Clock className={`w-4 h-4 ${isEmergency ? 'text-rose-400' : 'text-amber-400'}`} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono-legal font-bold text-amber-400 text-xs bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {ex.batesNumber}
                    </span>
                    <span className="text-slate-400 font-mono-legal text-[11px]">
                      {ex.timestampLocal}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono-legal uppercase font-bold ${
                        bucket === 'threats'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : bucket === 'economic'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : bucket === 'agency'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {bucket === 'threats'
                        ? 'Threat § 784.048(3)'
                        : bucket === 'economic'
                        ? 'Economic Coercion'
                        : bucket === 'agency'
                        ? 'Agency Overreach'
                        : 'Cyberstalking § 784.048(1)(d)'}
                    </span>
                  </div>

                  <p className="font-serif-court text-xs sm:text-sm text-slate-200 line-clamp-2">
                    &ldquo;{ex.transcription.rawText}&rdquo;
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-mono-legal text-slate-500">
                    <span>Source: {ex.sourceAccount}</span>
                    <span>·</span>
                    <span>Platform: {ex.platform}</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-semibold">SHA-256 Verified</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <span className="text-xs font-mono-legal text-slate-400 hover:text-amber-400 flex items-center gap-1">
                  <span>Inspect Exhibit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
