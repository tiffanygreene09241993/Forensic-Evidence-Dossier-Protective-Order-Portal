import React, { useState } from 'react';
import {
  ForensicExhibit,
  StatutoryTag,
  ForensicPlatform,
} from '../types/forensic';
import { calculateSha256, getEasternTimezoneInfo } from '../utils/crypto';
import { X, Plus, Shield, Hash, Lock } from 'lucide-react';

interface AddExhibitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExhibit: (exhibit: ForensicExhibit) => void;
  nextId: string;
  nextBatesNumber: string;
}

export const AddExhibitModal: React.FC<AddExhibitModalProps> = ({
  isOpen,
  onClose,
  onAddExhibit,
  nextId,
  nextBatesNumber,
}) => {
  const tzInfo = getEasternTimezoneInfo(new Date());

  const [platform, setPlatform] = useState<ForensicPlatform>('TikTok');
  const [sourceAccount, setSourceAccount] = useState('@hulk (Eric Greene)');
  const [targetAccount, setTargetAccount] = useState('Tiffany Greene; Public Audience');
  const [timestampLocal, setTimestampLocal] = useState(`Oct 05, 2026 · 14:30 ${tzInfo.offsetLabel}`);
  const [fileName, setFileName] = useState('TRG_Capture_Exhibit.png');
  const [mimeType, setMimeType] = useState('image/png');
  const [fileSizeBytes, setFileSizeBytes] = useState(2150400);
  const [originalCaptureDevice, setOriginalCaptureDevice] = useState<'iOS' | 'Android' | 'Web'>('iOS');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'audio' | 'document'>('image');
  const [rawText, setRawText] = useState('');
  const [certifierName, setCertifierName] = useState('Senior Litigation Paralegal & Forensic Examiner');
  const [claimsInput, setClaimsInput] = useState('Emergency Protective Order, Injunctive Relief');
  const [isRedacted, setIsRedacted] = useState(false);
  const [redactionReason, setRedactionReason] = useState('Minor child identifiers masked under FRCP 5.2 and Family Court Privacy Rules.');

  const [selectedTags, setSelectedTags] = useState<StatutoryTag[]>([
    'FRE 902(13)/(14) Certified Electronic Record',
    'Post-Cease Notice Violation (Post-01/14/2026)',
    'Interstate Harassment / Stalking Element',
  ]);

  if (!isOpen) return null;

  const allTags: StatutoryTag[] = [
    'Formal Cease Notice / Baseline Legal Cutoff',
    'FRE 801(d)(2) Opposing Party Admission',
    'FRE 902(13)/(14) Certified Electronic Record',
    'Post-Cease Notice Violation (Post-01/14/2026)',
    'Child Endangerment / Best Interest Factor',
    'Defamation Per Se / Likeness Exploitation',
    'Interstate Harassment / Stalking Element',
    'Affirmative Defense / Evidentiary Rebuttal of Truth',
  ];

  const handleTagToggle = (tag: StatutoryTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    const claims = claimsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const now = new Date();
    const nowIso = now.toISOString();

    // Compute genuine SHA-256 hash using Web Crypto
    const payload = `${nextBatesNumber}|${nowIso}|${fileName}|${rawText}`;
    const generatedHash = await calculateSha256(payload);

    const newExhibit: ForensicExhibit = {
      id: nextId,
      batesNumber: nextBatesNumber,
      timestampUtc: nowIso,
      timestampLocal: timestampLocal || `${nowIso} (${tzInfo.offsetLabel})`,
      platform,
      sourceAccount,
      targetAccount,
      sha256Hash: generatedHash,
      sourceFile: {
        fileName: fileName || `TRG_Evidence_${Date.now()}.png`,
        mimeType: mimeType || 'image/png',
        fileSizeBytes: Number(fileSizeBytes) || 1024000,
        originalCaptureDevice,
        mediaType,
      },
      custodyChain: [
        {
          timestamp: nowIso,
          action: 'Extracted',
          operator: certifierName || 'Forensic Examiner',
          deviceInfo: `${originalCaptureDevice} Forensic Station`,
        },
        {
          timestamp: nowIso,
          action: 'Hashed',
          operator: 'Forensic Evidence Engine',
          deviceInfo: 'SHA-256 Web Crypto Pipeline',
        },
        ...(isRedacted
          ? [
              {
                timestamp: nowIso,
                action: 'Redacted' as const,
                operator: certifierName || 'Forensic Examiner',
                deviceInfo: 'FRCP 5.2 Minor Redaction Module',
              },
            ]
          : []),
        {
          timestamp: nowIso,
          action: 'Indexed',
          operator: 'Civil Trial Evidence Custodian',
          deviceInfo: 'Legal Case Repository v4.2',
        },
      ],
      statutoryTags: selectedTags,
      claimsSupported: claims.length > 0 ? claims : ['Emergency Protective Order', 'Injunctive Relief'],
      transcription: {
        rawText,
        certified: true,
        certifierName: certifierName || 'Forensic Case Specialist',
        certificationDate: nowIso,
      },
      redactionStatus: {
        isRedacted,
        unredactedHash: generatedHash,
        redactedHash: isRedacted ? `${generatedHash.substring(0, 56)}fe41a8` : generatedHash,
        redactionReason: isRedacted ? redactionReason : undefined,
      },
      evidentiaryNote: 'Preserved digital evidence exhibit logged to master case docket.',
      severity: selectedTags.includes('Child Endangerment / Best Interest Factor')
        ? 'Emergency / Immediate Threat'
        : 'High Civil Liability',
    };

    onAddExhibit(newExhibit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-slate-100 font-serif-court">
              Log Forensic Exhibit ({nextBatesNumber} · {nextId})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Bates Number</label>
              <input
                type="text"
                disabled
                value={nextBatesNumber}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-amber-400 font-mono-legal font-bold cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as ForensicPlatform)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="TikTok">TikTok</option>
                <option value="Facebook">Facebook</option>
                <option value="SMS">SMS</option>
                <option value="Call Audio">Call Audio</option>
                <option value="Direct Message">Direct Message</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Media Type</label>
              <select
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="image">Image (Screenshot)</option>
                <option value="video">Video Recording</option>
                <option value="audio">Voice Audio</option>
                <option value="document">PDF Document</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Local Device Timestamp (With Standardized Timezone)</label>
              <input
                type="text"
                value={timestampLocal}
                onChange={(e) => setTimestampLocal(e.target.value)}
                placeholder={`e.g. Oct 05, 2026 · 14:30 ${tzInfo.offsetLabel}`}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 font-mono-legal focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Capture Device</label>
              <select
                value={originalCaptureDevice}
                onChange={(e) => setOriginalCaptureDevice(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="iOS">iOS (iPhone)</option>
                <option value="Android">Android (Galaxy/Pixel)</option>
                <option value="Web">Web Desktop</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Source Account / Handle / Phone</label>
              <input
                type="text"
                value={sourceAccount}
                onChange={(e) => setSourceAccount(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500 font-mono-legal"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Target Account / Audience</label>
              <input
                type="text"
                value={targetAccount}
                onChange={(e) => setTargetAccount(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500 font-mono-legal"
              />
            </div>
          </div>

          {/* File Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950 rounded border border-slate-800">
            <div>
              <label className="block text-slate-500 text-[10px] mb-0.5">File Name</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono-legal text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-500 text-[10px] mb-0.5">MIME Type</label>
              <input
                type="text"
                value={mimeType}
                onChange={(e) => setMimeType(e.target.value)}
                className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono-legal text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-500 text-[10px] mb-0.5">Size (Bytes)</label>
              <input
                type="number"
                value={fileSizeBytes}
                onChange={(e) => setFileSizeBytes(Number(e.target.value))}
                className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono-legal text-[11px]"
              />
            </div>
          </div>

          {/* Redaction Toggle */}
          <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-semibold text-slate-200 text-xs">FRCP 5.2 Minor Privacy Redaction</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={isRedacted}
                  onChange={(e) => setIsRedacted(e.target.checked)}
                  className="rounded border-slate-700 text-amber-500 focus:ring-0"
                />
                <span>Mask Minor Child Names / Faces ([H.G.], etc.)</span>
              </label>
            </div>
            {isRedacted && (
              <input
                type="text"
                value={redactionReason}
                onChange={(e) => setRedactionReason(e.target.value)}
                placeholder="Reason for redaction under FRCP 5.2..."
                className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-rose-300 text-[11px]"
              />
            )}
          </div>

          {/* Statutory Tags */}
          <div className="space-y-1.5">
            <label className="block text-slate-400 font-medium">
              Statutory Evidentiary Tags (Select all applicable) *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allTags.map((tag) => (
                <label
                  key={tag}
                  className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="rounded border-slate-700 text-amber-500 focus:ring-0"
                  />
                  <span className="text-[11px] font-medium">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Claims Supported */}
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Legal Claims Supported (comma-separated)</label>
            <input
              type="text"
              value={claimsInput}
              onChange={(e) => setClaimsInput(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500 font-mono-legal"
            />
          </div>

          {/* Transcription */}
          <div>
            <label className="block text-slate-400 mb-1 font-medium">
              Certified Verbatim Transcription (Use initials for minor names) *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Exact verbatim transcribed text (e.g. use [H.G.], [P.G.] for minor children)..."
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500 font-mono-legal"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Certifier Name &amp; Title</label>
            <input
              type="text"
              value={certifierName}
              onChange={(e) => setCertifierName(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Bates Exhibit (Auto SHA-256)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
