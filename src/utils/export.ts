import { ForensicExhibit } from '../types/forensic';

/**
 * Generates an FRE 902 / Court Clerk compliant CSV exhibit log
 */
export function generateExhibitRegisterCsv(exhibits: ForensicExhibit[]): string {
  const headers = [
    'Bates Number',
    'Exhibit ID',
    'UTC Timestamp',
    'Standardized Local Time',
    'Platform Source',
    'Originating Party / Account',
    'Target Account / Entity',
    'SHA-256 Hash Digest',
    'File Name',
    'File Size (Bytes)',
    'MIME Type',
    'Statutory Classifications',
    'Supported Claims',
    'Certified Transcription',
    'Redaction Status',
    'Severity / Priority',
  ];

  const escapeCsvField = (value: string | number | boolean | null | undefined): string => {
    if (value === null || value === undefined) return '""';
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = exhibits.map((ex) => [
    escapeCsvField(ex.batesNumber),
    escapeCsvField(ex.id),
    escapeCsvField(ex.timestampUtc),
    escapeCsvField(ex.timestampLocal),
    escapeCsvField(ex.platform),
    escapeCsvField(ex.sourceAccount),
    escapeCsvField(ex.targetAccount),
    escapeCsvField(ex.sha256Hash),
    escapeCsvField(ex.sourceFile.fileName),
    escapeCsvField(ex.sourceFile.fileSizeBytes),
    escapeCsvField(ex.sourceFile.mimeType),
    escapeCsvField(ex.statutoryTags.join('; ')),
    escapeCsvField(ex.claimsSupported.join('; ')),
    escapeCsvField(ex.transcription.rawText),
    escapeCsvField(ex.redactionStatus.isRedacted ? 'FRCP 5.2 Redacted' : 'Unredacted'),
    escapeCsvField(ex.severity),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
}

/**
 * Triggers a client-side file download for CSV or text content
 */
export function triggerFileDownload(fileName: string, mimeType: string, content: string): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates a clean CSV export for the 67-Row Inter-Agency Legal & Incident Records Ledger
 */
export function generateIncidentRecordsCsv(records: any[]): string {
  const headers = [
    'Row #',
    'Date / Time',
    'Document / Incident Title',
    'Subject Party',
    'Legal Domain / Category',
    'Official Agency / Court / Jurisdiction',
    'Disposition / Outcome / Status',
    'Factual Description',
    'Strategic Evidentiary Impact',
  ];

  const escapeCsvField = (value: string | number | boolean | null | undefined): string => {
    if (value === null || value === undefined) return '""';
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = records.map((rec) => [
    escapeCsvField(rec.rowNumber),
    escapeCsvField(rec.dateStr),
    escapeCsvField(rec.title),
    escapeCsvField(rec.subject),
    escapeCsvField(rec.category),
    escapeCsvField(rec.agencyCourt),
    escapeCsvField(rec.dispositionOutcome),
    escapeCsvField(rec.description),
    escapeCsvField(rec.evidentiaryImpact),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
}
