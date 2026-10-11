/**
 * Evidentiary-Grade Forensic Litigation Dossier Types
 * Adheres to FRE 901, FRE 902(1)/(2)/(13)/(14), FRE 801(d)(2), FRCP 5.2, and Domestic Relations Civil Standards
 */

export type StatutoryTag =
  | 'Formal Cease Notice / Baseline Legal Cutoff'
  | 'FRE 801(d)(2) Opposing Party Admission'
  | 'FRE 902(13)/(14) Certified Electronic Record'
  | 'FRE 902(1)/(2) Certified Public Record'
  | 'Post-Cease Notice Violation (Post-01/14/2026)'
  | 'Child Endangerment / Best Interest Factor'
  | 'Defamation Per Se / Likeness Exploitation'
  | 'Interstate Harassment / Stalking Element'
  | 'Affirmative Defense / Evidentiary Rebuttal of Truth'
  | 'Official Law Enforcement / Agency Docket';

export type ForensicPlatform =
  | 'TikTok'
  | 'Facebook'
  | 'SMS'
  | 'Call Audio'
  | 'Direct Message'
  | 'Court / Agency Record'
  | 'Law Enforcement Record';

export type JurisdictionCode = 'universal' | 'california' | 'texas' | 'florida';

export type CustodyAction = 'Extracted' | 'Hashed' | 'Redacted' | 'Indexed';

export interface CustodyChainEvent {
  timestamp: string; // ISO-8601 UTC timestamp
  action: CustodyAction;
  operator: string;
  deviceInfo: string;
}

export interface RedactionMetadata {
  isRedacted: boolean;
  unredactedHash: string;
  redactedHash: string;
  redactionReason?: string;
}

export interface SourceFileMetadata {
  fileName: string;
  mimeType: string;
  fileSizeBytes: number;
  originalCaptureDevice?: 'iOS' | 'Android' | 'Web' | string;
  mediaType: 'image' | 'video' | 'audio' | 'document';
  previewUrl?: string;
  officialCaseNumber?: string;
  agencyName?: string;
}

export interface CertifiedTranscription {
  rawText: string;
  certified: boolean;
  certifierName: string;
  certificationDate: string;
}

export interface ForensicExhibit {
  id: string; // e.g., "EX-001"
  batesNumber: string; // Continuous pagination formatted as TRG-XXXX (e.g., "TRG-0001")
  timestampUtc: string; // Strict ISO-8601 UTC timestamp (YYYY-MM-DDTHH:MM:SSZ)
  timestampLocal: string; // Local device timestamp with explicit standardized timezone offset (EST / EDT)
  platform: ForensicPlatform;
  sourceAccount: string; // Handle, phone number, or agency ID
  targetAccount: string;
  sha256Hash: string; // 64-character SHA-256 cryptographic hash
  sourceFile: SourceFileMetadata;
  custodyChain: CustodyChainEvent[];
  statutoryTags: StatutoryTag[];
  claimsSupported: string[]; // Specific legal counts
  transcription: CertifiedTranscription;
  redactionStatus: RedactionMetadata;
  evidentiaryNote?: string;
  severity: 'Emergency / Immediate Threat' | 'High Civil Liability' | 'Corroborating Malice';
}

export interface CrossExamTopic {
  id: string;
  witness: 'Respondent Eric Greene ("hulk")' | 'Third Party Heaven-Leigh';
  title: string;
  impeachmentExhibitBates: string;
  impeachmentExhibitId: string;
  witnessExpectedTestimony: string;
  scriptedQuestions: string[];
  evidentiaryTrap: string;
  governingRule: string;
}

export type ActiveSection =
  | 'register'
  | 'decision-matrix'
  | 'dockets'
  | 'fitness'
  | 'authorities'
  | 'objections'
  | 'timeline'
  | 'impeachment'
  | 'liability'
  | 'synthesis'
  | 'declaration'
  | 'orders'
  | 'takedown'
  | 'packet';
