import { JurisdictionCode } from '../types/forensic';

export interface JurisdictionProfile {
  code: JurisdictionCode;
  name: string;
  shortLabel: string;
  courtTitle: string;
  dvpoStatute: string;
  stalkingStatute: string;
  defamationStatute: string;
  alienationStandard: string;
  evidenceCodeRules: string;
  citationPrefix: string;
}

export const JURISDICTIONS: Record<JurisdictionCode, JurisdictionProfile> = {
  universal: {
    code: 'universal',
    name: 'Universal Uniform State & Federal Standard',
    shortLabel: 'Universal Standard',
    courtTitle: 'In the District Court of the Judicial District',
    dvpoStatute: 'Uniform Interstate Family Enforcement & Model Domestic Violence Acts',
    stalkingStatute: '18 U.S.C. § 2261A (Interstate Cyberstalking) & Model Harassment Act',
    defamationStatute: 'Restatement (Second) of Torts § 559, § 570 (Per Se Crimes of Moral Turpitude)',
    alienationStandard: 'Uniform Marriage and Divorce Act (UMDA) § 402 (Best Interests of Child)',
    evidenceCodeRules: 'Federal Rules of Evidence 901, 902(13)/(14), 801(d)(2)',
    citationPrefix: 'Fed. / Uniform Standard',
  },
  california: {
    code: 'california',
    name: 'State of California (Superior Court)',
    shortLabel: 'California',
    courtTitle: 'In the Superior Court of the State of California, County of Los Angeles/Orange',
    dvpoStatute: 'California Family Code § 6200 et seq. (Domestic Violence Prevention Act - DVPA)',
    stalkingStatute: 'California Penal Code § 646.9 & Civil Code § 1708.7 (Stalking Injunction)',
    defamationStatute: 'California Civil Code § 45, § 45a (Defamation Per Se / False Light)',
    alienationStandard: 'California Family Code § 3011, § 3020 (Frequent and Continuing Contact Standard)',
    evidenceCodeRules: 'California Evidence Code § 1400 (Authentication), § 1521, § 1220 (Party Admissions)',
    citationPrefix: 'Cal. Fam. Code / Evid. Code',
  },
  texas: {
    code: 'texas',
    name: 'State of Texas (District Court)',
    shortLabel: 'Texas',
    courtTitle: 'In the District Court of Texas, Judicial District, County of Harris/Dallas',
    dvpoStatute: 'Texas Family Code Title 4 § 85.001 (Protective Orders & Family Violence Findings)',
    stalkingStatute: 'Texas Penal Code § 42.072 (Stalking) & Civ. Prac. & Rem. Code § 129A.002',
    defamationStatute: 'Texas Civ. Prac. & Rem. Code § 73.001 (Libel Per Se / Accusation of Crime)',
    alienationStandard: 'Texas Family Code § 153.002 (Best Interest of the Child & Parental Denigration)',
    evidenceCodeRules: 'Texas Rules of Evidence 901, 902(10), 801(e)(2) (Statement by Opposing Party)',
    citationPrefix: 'Tex. Fam. Code / CPRC',
  },
  florida: {
    code: 'florida',
    name: 'State of Florida (Circuit Court)',
    shortLabel: 'Florida',
    courtTitle: 'In the Circuit Court of the Judicial Circuit, In and For the County of Miami-Dade/Orange',
    dvpoStatute: 'Florida Statutes § 741.30 (Domestic Violence Injunction for Protection)',
    stalkingStatute: 'Florida Statutes § 784.048 & § 784.0485 (Injunction for Protection Against Cyberstalking)',
    defamationStatute: 'Florida Statutes § 770.01 et seq. & Common Law Defamation Per Se',
    alienationStandard: 'Florida Statutes § 61.13(3) (Parental Responsibility & Child Best Interests)',
    evidenceCodeRules: 'Florida Evidence Code § 90.901, § 90.902, § 90.803(18) (Admissions by Party)',
    citationPrefix: 'Fla. Stat. § 741.30 / § 784.048',
  },
};
