import { CrossExamTopic } from '../types/forensic';

export const CROSS_EXAM_TOPICS: CrossExamTopic[] = [
  {
    id: 'topic-1',
    witness: 'Respondent Eric Greene ("hulk")',
    title: '1. Rebuttal of 12-Year Continuous Abuse Smear & Certified Domestic Battery Arrest',
    impeachmentExhibitBates: 'TRG-0013',
    impeachmentExhibitId: 'EX-013',
    witnessExpectedTestimony:
      'Respondent will claim that Petitioner was the exclusive physical aggressor and batterer throughout the 12-year marriage.',
    scriptedQuestions: [
      'Q: "Mr. Greene, on January 18, 2026, you published a video to hundreds of TikTok viewers labeling Petitioner your \'abuser\' who hit you for 12 years, correct?"',
      'Q: "You intended your social media audience to believe Petitioner committed criminal domestic violence against you, correct?"',
      'Q: "In the entire 12-year span of your marriage, has Petitioner ever been arrested, charged, or convicted of domestic battery against you in any court?" (Witness must answer: No).',
      'Q: "In fact, Mr. Greene, isn\'t it true that on April 11, 2019, YOU were arrested and booked by the Pasco County Sheriff\'s Office for Domestic Battery under Florida Statute 784.03?"',
      'Q: "I hand you what has been marked as Petitioner\'s Exhibit TRG-0013, Pasco Sheriff Report #19-014214. Isn\'t it true that Deputy Salto interviewed your minor daughters, Sarah and Kayleen, and both children reported watching you physically shove Petitioner out of the home?"',
      'Q: "So when you told hundreds of strangers online that Petitioner was your \'abuser for 12 years\', you knew that the only certified domestic battery arrest in this marriage was YOUR arrest for shoving her in front of your children, didn\'t you?"',
    ],
    evidentiaryTrap:
      'If Respondent attempts to minimize or deny the April 2019 arrest, counsel moves for admission of TRG-0013 under FRE 902(1)/(2) (Certified Public Record), completely destroying Respondent\'s credibility regarding who was the domestic aggressor and impeaching his core defamation defense.',
    governingRule: 'FRE 607 (Impeachment), FRE 609 (Prior Record), FRE 902(1)/(2) (Certified Public Records), FRE 404(b)',
  },
  {
    id: 'topic-2',
    witness: 'Respondent Eric Greene ("hulk")',
    title: '2. Premeditation, Motive & Armed Felony 9mm Handgun Assault on Pedro Hernandez',
    impeachmentExhibitBates: 'TRG-0014 & TRG-0025',
    impeachmentExhibitId: 'EX-014 / EX-025',
    witnessExpectedTestimony:
      'Respondent will claim he is a peaceful individual who never threatened violence, or that the altercation with Pedro Hernandez was sudden mutual combat unrelated to domestic jealousy or custodial control.',
    scriptedQuestions: [
      'Q: "Mr. Greene, you have sworn in this proceeding that you pose no threat of physical violence to Petitioner or her partner Pedro Hernandez, correct?"',
      'Q: "Directing your attention to November 1, 2019—exactly 48 hours before the violent assault on Drew Drive—you sent a desperate message to Petitioner on Facebook Messenger, didn\'t you?"',
      'Q: "I hand you Petitioner\'s Exhibit TRG-0025. In that message, you admitted: \'i let you walk away last night i wont do it again let me know i will come to you tonight and grab you... and you can be with your kids all of them baby girl please come home\', didn\'t you?"',
      'Q: "When you wrote \'you can be with your kids all of them\', you were conditioning Petitioner\'s access to her own biological children on her returning to your control, were you not?"',
      'Q: "And in response, Petitioner unequivocally rejected you, telling you: \'I can\'t be with you anymore. He [Pedro] is what makes me happy and the kids love him too... already use to me being with Pedro\', did she not?"',
      'Q: "And Petitioner specifically warned you: \'I know telling you this is just going to make you rip everything else that I have left from me\', didn\'t she?"',
      'Q: "Mr. Greene, exactly two days after receiving that rejection—on November 3, 2019—Pasco County Sheriff deputies were dispatched to Drew Drive for an aggravated assault with a firearm, correct?"',
      'Q: "I hand you Petitioner\'s Exhibit TRG-0014, Pasco Sheriff Criminal Complaint #19-045997. Isn\'t it true that in retaliatory rage, you grabbed Pedro Hernandez by the neck, threw him to the ground, and punched him?"',
      'Q: "Isn\'t it true that after releasing him, you looked at him and shouted: \'I am gonna kill you\'?"',
      'Q: "And immediately after stating \'I am gonna kill you\', you went into your home and retrieved a High Point Black 9mm handgun in an attempt to shoot him outside the residence, didn\'t you?"',
      'Q: "And the only reason you didn\'t shoot Pedro Hernandez is because your own father physically wrestled the 9mm handgun away from your hands, isn\'t that right?"',
    ],
    evidentiaryTrap:
      'Completely connects the causal chain between TRG-0025 (48-hour pre-assault motive, coercive custodial gatekeeping, and financial threats) and TRG-0014 (armed felony 9mm assault and express death threats). Establishes premeditated retaliation, destroying any claim of spontaneous altercation or peaceful character.',
    governingRule: 'FRE 801(d)(2) (Party Admission), FRE 902(1)/(2) & 902(14), FRE 404(b) (Motive & Intent)',
  },
  {
    id: 'topic-3',
    witness: 'Respondent Eric Greene ("hulk")',
    title: '3. Confrontation on Direct Threat of Physical Violence ("I Should Beat Her Ass")',
    impeachmentExhibitBates: 'TRG-0012',
    impeachmentExhibitId: 'EX-012',
    witnessExpectedTestimony:
      'Respondent will testify that he never physically threatened Petitioner, claiming it was just an internet joke or non-directed venting.',
    scriptedQuestions: [
      'Q: "Mr. Greene, you have sworn in your pleadings that you bear no violent malice toward Petitioner, correct?"',
      'Q: "Directing your attention to June 18, 2026, at 11:42 PM—late at night—you recorded a video of yourself, didn\'t you?"',
      'Q: "You didn\'t just save that video to your camera roll; you transmitted it directly to Petitioner\'s private inbox, correct?"',
      'Q: "In that video, you looked into the camera and stated: \'I should beat her ass / But my momma said animal abuse is wrong\', did you not?"',
      'Q: "When you said \'beat her ass\', you were referring to physically assaulting Petitioner Tiffany Greene, weren\'t you?"',
      'Q: "And when you referred to \'animal abuse\', you were intentionally comparing the mother of your five children to an animal, were you not?"',
    ],
    evidentiaryTrap:
      'If Respondent claims it was a joke or song lyrics, counsel immediately plays native video file (TRG-0012) into the courtroom record, demonstrating menacing demeanor and establishing prima facie grounds for the Domestic Violence Protective Order.',
    governingRule: 'FRE 801(d)(2) (Party Admission), State Domestic Violence Prevention Act Threat Standard',
  },
  {
    id: 'topic-4',
    witness: 'Third Party Heaven-Leigh',
    title: '4. FRE 801(d)(2) Examination on Direct Parental Alienation & Written Confession',
    impeachmentExhibitBates: 'TRG-0007',
    impeachmentExhibitId: 'EX-007',
    witnessExpectedTestimony:
      'Heaven-Leigh will claim she loves the children, stays out of adult custody disputes, and never disparages their mother in the household.',
    scriptedQuestions: [
      'Q: "Ms. Heaven-Leigh, you reside in Respondent\'s home and are present when minor children [H.G.], [P.G.], and [E.G.] are staying there, correct?"',
      'Q: "You understand that a child\'s bond with their biological mother is vital to their emotional development, don\'t you?"',
      'Q: "You told this Court today that you never speak ill of Petitioner to the children, correct?"',
      'Q: "Directing your attention to February 5, 2026, Petitioner sent you a private message begging: \'Stop telling my children lies about my custody and my life\', didn\'t she?"',
      'Q: "And you typed back immediately: \'I just tell your the kids the truth. I ain\'t gonna lie to em. They know what kind of woman you are\', didn\'t you?"',
      'Q: "When you told Petitioner \'they know what kind of woman you are\', you were admitting that you actively discuss Petitioner\'s character directly with the minor children, were you not?"',
    ],
    evidentiaryTrap:
      'Witness is trapped by her own verbatim written admission in Exhibit TRG-0007. Any denial allows counsel to confront her with the authentic Messenger screenshot, establishing custodial parental alienation and justifying a strict third-party non-disparagement order.',
    governingRule: 'FRE 801(d)(2) (Opposing Party Admission / Co-Conspirator Statement), Family Code Child Best Interest Factor',
  },
  {
    id: 'topic-5',
    witness: 'Respondent Eric Greene ("hulk")',
    title: '5. Child Support Arrears, $170K Marital Home Liquidation & Child Conceived with Heaven Horton',
    impeachmentExhibitBates: 'TRG-0016',
    impeachmentExhibitId: 'EX-016',
    witnessExpectedTestimony:
      'Respondent will claim that he financially supports the family, that Petitioner abandoned them, and that he has acted in good faith.',
    scriptedQuestions: [
      'Q: "Mr. Greene, you have claimed in public broadcasts that you pay for everything while Petitioner contributes nothing, correct?"',
      'Q: "I hand you Petitioner\'s Exhibit TRG-0016, Florida Department of Revenue Child Support Record Case #2001507784. Isn\'t it true that since you separated in 2019, you have paid exactly ZERO dollars in direct child support to Petitioner?"',
      'Q: "Isn\'t it true that on August 19, 2022, you sold the Florida marital home at 39605 Drew Dr for $170,000 without Petitioner\'s written consent?"',
      'Q: "And isn\'t it true that three days later, you used $90,000 cash from those Florida proceeds to buy 75 acres in Kentucky?"',
      'Q: "And while still legally married to Petitioner, on December 13, 2024, you fathered another child, Amelia, with Third Party Heaven Horton, did you not?"',
    ],
    evidentiaryTrap:
      'Corroborates financial dissipation under Fla. Stat. § 61.075 and disproves claims of abandonment; establishes that Eric fled the jurisdiction with marital funds while fathering a child with the third-party partner whom he now uses to alienate the children.',
    governingRule: 'Fla. Stat. § 61.075 (Equitable Distribution), UIFSA Child Support Enforcement, FRE 902(1)/(2)',
  },
  {
    id: 'topic-6',
    witness: 'Respondent Eric Greene ("hulk")',
    title: '6. Public Slander of Minor Paternity & Child Welfare Compromise',
    impeachmentExhibitBates: 'TRG-0008',
    impeachmentExhibitId: 'EX-008',
    witnessExpectedTestimony:
      'Respondent will claim he is a protective father who never brings the children into public disputes.',
    scriptedQuestions: [
      'Q: "Mr. Greene, on February 14, 2026, you conducted a public broadcast on TikTok to your online audience, correct?"',
      'Q: "During that live broadcast, you specifically uttered the first names of minor children [H.G.] and [P.G.], correct?"',
      'Q: "You publicly accused Petitioner of abandoning the children, correct?"',
      'Q: "And before that public audience, you stated: \'Paternity is completely questioned on the youngest [E.G.]\', did you not?"',
      'Q: "Do you believe it promotes the emotional security of your infant daughter to have her biological paternity slandered before hundreds of strangers on the internet?"',
    ],
    evidentiaryTrap:
      'Demonstrates that Respondent prioritizes public humiliation over minor child welfare, supporting Petitioner’s petition for sole legal custody and child social media gag orders.',
    governingRule: 'UCCJEA / Uniform Child Custody Act § 402, FRCP 5.2 Minor Privacy Standard',
  },
];
