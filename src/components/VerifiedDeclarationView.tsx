import React, { useState } from 'react';
import { Copy, Check, FileCheck, Shield, Globe } from 'lucide-react';
import { JurisdictionCode } from '../types/forensic';
import { JURISDICTIONS } from '../data/jurisdictionData';

interface VerifiedDeclarationViewProps {
  isRedacted?: boolean;
  jurisdiction?: JurisdictionCode;
}

export const VerifiedDeclarationView: React.FC<VerifiedDeclarationViewProps> = ({
  isRedacted = true,
  jurisdiction = 'universal',
}) => {
  const [copied, setCopied] = useState(false);
  const currentJurisdiction = JURISDICTIONS[jurisdiction];

  const minorChildrenList = isRedacted
    ? '[S.G.] (Age 11), [K.G.] (Age 9), [P.G.] (Age 6), [H.G.] (Age 4), and [E.G.] (Age 1) (minor identities protected pursuant to FRCP 5.2 and Family Court Confidential Records Rules)'
    : 'Sarah Greene, Kayleen Greene, Peighton Greene, Hunter Greene, and Emmalynn Greene';

  const declarationText = `${currentJurisdiction.courtTitle.toUpperCase()}
IN AND FOR THE COUNTY OF ________________, STATE OF ${currentJurisdiction.name.toUpperCase()}

IN RE THE MARRIAGE / CUSTODY OF:
TIFFANY RENEA GREENE,
    Petitioner,
and                                             CASE NO.: 2026-CV-0891
ERIC GREENE,
    Respondent.
_______________________________________________/

VERIFIED DECLARATION OF TIFFANY RENEA GREENE IN SUPPORT OF PETITION FOR 
TEMPORARY RESTRAINING ORDER AND PRELIMINARY INJUNCTIVE RELIEF
PURSUANT TO: ${currentJurisdiction.dvpoStatute}

I, Tiffany Renea Greene, declare under penalty of perjury pursuant to the laws of ${currentJurisdiction.name}, that the following statements are true and correct based upon my own personal, firsthand knowledge, and that if called as a witness, I could and would competently testify thereto:

PARTIES, MARRIAGE, AND MINOR CHILDREN
1. I am an adult individual of sound mind, fully competent to testify to all matters set forth herein. I am the Petitioner in the above-captioned proceeding.
2. Respondent, Eric Greene (who operates publicly on social media under the moniker "hulk"), and I were lawfully married in May 2012.
3. Five (5) minor children were born of or associated with this union: ${minorChildrenList}.
4. The parties are currently living separate and apart in distinct residences, and there are active, disputed domestic relations proceedings regarding the physical care, legal custody, and welfare of our minor children.

BRIGHT-LINE CEASE-AND-DESIST & REVOCATION OF CONSENT
5. Following our physical separation, Respondent commenced a persistent pattern of sending harassing and intimidating private electronic correspondence that was wholly unrelated to the health, education, welfare, or logistical needs of our minor children.
6. On January 14, 2026, at approximately 09:14 EST, I served an express, unequivocal written demand upon Respondent via SMS text message, stating verbatim: "Do not contact me anymore unless it is strictly about the kids. Do not post my pictures online. You do not have permission to post my face or my life." (Preserved as Exhibit 01 / Bates TRG-0001).
7. Through this written transmission, Respondent received actual, immediate notice that any marital license, implied consent, or permission to use my photograph, likeness, name, or identity in any public or online medium was permanently revoked.

DEFAMATORY SOCIAL MEDIA CAMPAIGN & FALSE LIGHT INVASION
8. Despite having received my express revocation four days prior, on January 18, 2026, Respondent published a publicly viewable video on TikTok featuring a photograph of myself alongside my fiancé, Pedro, displaying the text caption: "My abuser and her fling. Left her family and ran off. She would hit me for 12 years and now plays the victim." (Preserved as Exhibit 02 / Bates TRG-0002).
9. On January 19, 2026, in the public comment thread beneath that same video publication, Respondent knowingly and maliciously published the following false statement to hundreds of viewers: "She has an active warrant out for her arrest. She ran from the state so she wouldn't have to go to court-ordered rehab." (Preserved as Exhibit 03 / Bates TRG-0003).
10. On February 14, 2026, Respondent hosted a public video broadcast on TikTok wherein he specifically identified our minor children by their first names (specifically [H.G.] and [P.G.]), falsely claiming that I had abandoned them and publicly slandering the paternity of our youngest infant daughter [E.G.]. (Preserved as Exhibit TRG-0008).
11. On March 15, 2026, Respondent created and published a public photo collage on TikTok utilizing uncropped, private family photographs depicting my face and the minor children, set to a commercial musical track regarding parental abandonment and spousal infidelity. (Preserved as Exhibit 10 / Bates TRG-0010).
12. On June 15, 2026, Respondent transmitted an electronic accusation stating: "Nope u just take out loans in my name to pay ur stupid bills...", falsely accusing me of committing felony identity theft and bank fraud. (Preserved as Exhibit 11 / Bates TRG-0011).

ABSOLUTE FALSITY OF RESPONDENT'S ALLEGATIONS
13. I swear and affirm under penalty of perjury that I have never been arrested, charged, investigated, or convicted of domestic assault, battery, spousal abuse, or any crime of violence against Respondent during our twelve-year marriage or at any other time in my life.
14. I swear and affirm under penalty of perjury that there are no active, pending, or historical criminal arrest warrants issued against me in this State, in any other State of the United States, or by any federal authority. In stark contrast, Respondent Eric Joshua Greene was arrested on April 11, 2019, by the Pasco County Sheriff's Office for Domestic Battery (F.S. 784.03) after shoving me out of our mobile home in front of our minor daughters Sarah and Kayleen (Preserved as Exhibit TRG-0013 / Report #19-014214). Furthermore, on November 1, 2019—exactly 48 hours prior to the armed attack on Pedro Hernandez—Respondent sent me a Facebook Messenger communication pleading with me to return, offering financial restitution, and explicitly conditioning my access to our children on my returning to his control ("you can be with your kids all of them baby girl please come home"). When I unequivocally rejected him, confirmed my relationship with Pedro Hernandez, and warned him that he would attempt to "rip everything else that I have left from me" (Preserved as Exhibit TRG-0025), Respondent erupted in violent retaliation two days later: on November 3, 2019, Respondent was arrested for Felony Aggravated Assault with a Deadly Weapon after violently choking Pedro Hernandez, punching him, screaming "I am gonna kill you", and retrieving a High Point Black 9mm handgun (Preserved as Exhibit TRG-0014 / Report #19-045997).
15. I swear and affirm under penalty of perjury that I have never been ordered, remanded, or requested by any court, probation officer, or judicial agency to attend, enter, or complete drug, alcohol, or substance rehabilitation, nor have I ever fled any jurisdiction to avoid legal process or court-mandated treatment.
16. I swear and affirm under penalty of perjury that I have never forged Respondent's signature, opened fraudulent accounts, or obtained loans or credit lines in Respondent's name.
17. I have never abandoned my minor children. My physical departure from the former marital residence was necessitated by escalating domestic violence, threats, and forced displacement. As documented in my federal complaint to the FBI Internet Crime Complaint Center (IC3 Submission ID: 05279c5fe54949208d87da7f14601dba, Preserved as Exhibit TRG-0015) and my sworn Florida dissolution petition (Preserved as Exhibit TRG-0017), Respondent stranded me in Mexico, stole my identification, liquidated our $170,000 Florida marital homestead without consent, and moved our children across state lines to Kentucky to sever their bond with me.
17b. As officially certified by the Florida Department of Revenue Child Support Program (Case #2001507784, Preserved as Exhibit TRG-0016), Respondent has paid exactly $0.00 in child support since separation, while three of our minor children require intensive autism and psychiatric treatment, and while Respondent fathered a child with Third Party Heaven Horton during our marriage.
17c. When four consecutive adult DCF in-home investigations (2016–2020) closed with zero indicators of abuse or neglect, Florida DCF and opposing parties improperly accessed and weaponized my own confidential childhood DCF records—from when I was a minor child victim of abuse—in an egregious attempt to classify me as a "high risk parent". Punishing a mother and depriving her of custody based solely on her historic victimization as a child violates Florida Statutes Chapter 39 and Constitutional Due Process, and conclusively proves that opposing parties possess zero legitimate evidence of adult parental inadequacy.

DIRECT THREAT OF PHYSICAL VIOLENCE
18. On June 18, 2026, at approximately 23:42 EDT (Eastern Daylight Time), Respondent directly transmitted a video recording into my private electronic inbox wherein he declared: "I should beat her ass / But my momma said animal abuse is wrong." (Preserved as Exhibit 12 / Bates TRG-0012).
19. This direct statement placed me in reasonable, imminent apprehension of severe physical battery and bodily injury. Coupled with Respondent's escalating hostility, this communication demonstrates an immediate and ongoing danger to my physical safety and psychological well-being.

COORDINATED PARENTAL ALIENATION BY THIRD PARTY HEAVEN-LEIGH
20. Respondent has introduced his romantic partner, Third Party Heaven-Leigh, into his residence, actively permitting and enabling her to disparage me in the presence of my minor children.
21. On February 4, 2026, Heaven-Leigh published defamatory accusations on Facebook claiming that I walked out on my children and asserting that I am not their biological mother. (Preserved as Exhibit 06 / Bates TRG-0006).
22. On February 5, 2026, when I privately demanded that Heaven-Leigh cease discussing custody and defaming me to my children, Heaven-Leigh provided a written confession via Facebook Messenger, stating: "I just tell your the kids the truth. I ain't gonna lie to em. They know what kind of woman you are." (Preserved as Exhibit 07 / Bates TRG-0007).
23. This ongoing disparagement directly undermines the emotional health of my children, confuses their perception of their mother, and constitutes severe, intentional parental alienation directly facilitated by Respondent.

CONTINUOUS HARASSMENT & NEED FOR EMERGENCY RELIEF
24. Respondent has repeatedly transmitted mocking messages, including memes ridiculing court orders (Exhibit 05), racialized slurs regarding my partner, and unsolicited multi-paragraph messages attacking my physical body, weight, postpartum recovery, and private marital sexual history (Exhibit 09).
25. Unless this Court intervenes with an immediate temporary restraining order and preliminary protective injunction, Respondent and his domestic agents will continue to publish defamatory statements, defame my character, incite public harassment, alienate my children, and place my physical safety at risk.

I declare under penalty of perjury under the laws of ${currentJurisdiction.name} that the foregoing is true and correct.

Executed this 5th day of October, 2026.

_______________________________________________
TIFFANY RENEA GREENE, Declarant / Petitioner`;

  const handleCopy = () => {
    navigator.clipboard.writeText(declarationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs text-amber-500 font-mono-legal uppercase tracking-wider flex items-center gap-2">
            <span>Section 6 · Formal Court Pleading</span>
            <span>·</span>
            <span className="text-amber-400 font-medium">{currentJurisdiction.name}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-court mt-1">
            Verified Declaration of Tiffany Renea Greene
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Court-ready sworn affidavit executed under penalty of perjury, chronologically setting forth jurisdictional
            facts, written notices, defamatory publications, physical threats, and explicit perjury-backed rebuttals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors font-semibold"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Full Declaration'}</span>
          </button>
        </div>
      </div>

      {/* Pleading Paper Container */}
      <div className="pleading-paper-sheet rounded-lg border border-slate-700 bg-slate-950 p-6 sm:p-10 shadow-2xl overflow-x-auto text-slate-200">
        <div className="max-w-4xl mx-auto space-y-6 text-xs sm:text-sm leading-relaxed">
          {/* Court Caption */}
          <div className="border-b-2 border-slate-700 pb-6 text-center space-y-2">
            <div className="font-serif-court font-semibold text-sm sm:text-base tracking-wide uppercase text-slate-100">
              {currentJurisdiction.courtTitle.toUpperCase()}
            </div>
            <div className="font-serif-court text-xs sm:text-sm text-slate-300">
              IN AND FOR THE COUNTY OF ________________, STATE OF {currentJurisdiction.name.toUpperCase()}
            </div>
          </div>

          {/* Caption Box */}
          <div className="grid grid-cols-12 gap-2 border-b-2 border-slate-700 pb-6 font-mono-legal text-xs">
            <div className="col-span-7 space-y-1">
              <div>IN RE THE MARRIAGE / CUSTODY OF:</div>
              <div className="font-bold text-slate-100">TIFFANY RENEA GREENE,</div>
              <div className="pl-6 italic text-slate-400">Petitioner,</div>
              <div>and</div>
              <div className="font-bold text-slate-100">ERIC GREENE,</div>
              <div className="pl-6 italic text-slate-400">Respondent.</div>
            </div>
            <div className="col-span-1 border-r border-slate-700 flex items-center justify-center text-slate-500">
              )
            </div>
            <div className="col-span-4 pl-3 space-y-1">
              <div>CASE NO.: 2026-CV-0891</div>
              <div className="font-semibold text-amber-400 pt-2 text-[11px]">
                VERIFIED DECLARATION IN SUPPORT OF EX PARTE INJUNCTIVE RELIEF
              </div>
              <div className="text-[10px] text-slate-400">{currentJurisdiction.citationPrefix}</div>
            </div>
          </div>

          {/* Preamble */}
          <p className="font-serif-court italic text-slate-300">
            I, Tiffany Renea Greene, declare under penalty of perjury pursuant to the laws of {currentJurisdiction.name},
            that the following statements are true and correct based upon my own personal, firsthand knowledge:
          </p>

          {/* Numbered Paragraphs */}
          <div className="space-y-4">
            <h4 className="font-bold text-amber-400 uppercase text-xs tracking-wider border-b border-slate-800 pb-1 font-mono-legal">
              I. Parties, Marriage, and Minor Children
            </h4>
            <div className="space-y-2.5 pl-2 sm:pl-4">
              <p>
                <strong>1.</strong> I am an adult individual of sound mind, fully competent to testify to all matters set forth herein. I am the Petitioner in the above-captioned proceeding.
              </p>
              <p>
                <strong>2.</strong> Respondent, Eric Greene (who operates publicly on social media under the moniker &quot;hulk&quot;), and I were lawfully married in May 2012.
              </p>
              <p>
                <strong>3.</strong> Five (5) minor children were born of or associated with this union:{' '}
                {isRedacted ? (
                  <span className="text-emerald-300 font-mono-legal">
                    [S.G.] (Age 11), [K.G.] (Age 9), [P.G.] (Age 6), [H.G.] (Age 4), and [E.G.] (Age 1) (identifying details masked pursuant to FRCP 5.2 and Family Court privacy rules)
                  </span>
                ) : (
                  <span>Sarah Greene, Kayleen Greene, Peighton Greene, Hunter Greene, and Emmalynn Greene</span>
                )}
                .
              </p>
              <p>
                <strong>4.</strong> The parties are currently living separate and apart in distinct residences, and there are active domestic relations proceedings regarding the custody, care, and welfare of our minor children.
              </p>
            </div>

            <h4 className="font-bold text-amber-400 uppercase text-xs tracking-wider border-b border-slate-800 pb-1 font-mono-legal pt-4">
              II. Bright-Line Cease-and-Desist &amp; Revocation of Consent
            </h4>
            <div className="space-y-2.5 pl-2 sm:pl-4">
              <p>
                <strong>5.</strong> Following our separation, Respondent commenced a persistent pattern of sending harassing private electronic correspondence wholly unrelated to the medical, educational, or logistical needs of our children.
              </p>
              <p>
                <strong>6.</strong> On January 14, 2026, at 09:14 EST, I served an express written demand upon Respondent via SMS text message, stating verbatim: <em>&quot;Do not contact me anymore unless it is strictly about the kids. Do not post my pictures online. You do not have permission to post my face or my life.&quot;</em> (Preserved as Exhibit 01 / Bates TRG-0001).
              </p>
              <p>
                <strong>7.</strong> Through this transmission, Respondent received actual, unambiguous notice that any license or permission to use my photograph, likeness, or identity online was permanently revoked.
              </p>
            </div>

            <h4 className="font-bold text-amber-400 uppercase text-xs tracking-wider border-b border-slate-800 pb-1 font-mono-legal pt-4">
              III. Defamatory Publications &amp; False Light Invasions
            </h4>
            <div className="space-y-2.5 pl-2 sm:pl-4">
              <p>
                <strong>8.</strong> On January 18, 2026, Respondent published a public video on TikTok featuring a photograph of myself alongside my fiancé, Pedro, captioned: <em>&quot;My abuser and her fling. Left her family and ran off. She would hit me for 12 years and now plays the victim.&quot;</em> (Preserved as Exhibit 02 / Bates TRG-0002).
              </p>
              <p>
                <strong>9.</strong> On January 19, 2026, Respondent knowingly published false statements in the public comment thread beneath that post claiming that I have an <em>&quot;active warrant out for [my] arrest&quot;</em> and that I <em>&quot;ran from the state so [I] wouldn&apos;t have to go to court-ordered rehab.&quot;</em> (Preserved as Exhibit 03 / Bates TRG-0003).
              </p>
              <p>
                <strong>10.</strong> On February 14, 2026, Respondent hosted a public broadcast on TikTok specifically naming minor children [H.G.] and [P.G.], claiming I abandoned them and questioning the paternity of our infant daughter [E.G.]. (Preserved as Exhibit TRG-0008).
              </p>
              <p>
                <strong>11.</strong> On March 15, 2026, Respondent published an unauthorized photo collage of myself and the children set to audio regarding parental absence and infidelity. (Preserved as Exhibit 10 / Bates TRG-0010).
              </p>
              <p>
                <strong>12.</strong> On June 15, 2026, Respondent accused me in writing: <em>&quot;Nope u just take out loans in my name to pay ur stupid bills...&quot;</em>, falsely claiming I committed federal loan fraud. (Preserved as Exhibit 11 / Bates TRG-0011).
              </p>
            </div>

            <h4 className="font-bold text-amber-400 uppercase text-xs tracking-wider border-b border-slate-800 pb-1 font-mono-legal pt-4">
              IV. Absolute Falsity of Respondent&apos;s Criminal &amp; Moral Turpitude Allegations
            </h4>
            <div className="space-y-2.5 pl-2 sm:pl-4">
              <p>
                <strong>13.</strong> I attest under penalty of perjury that I have never been arrested, charged, investigated, or convicted of domestic battery, assault, or any crime of violence against Respondent during our twelve-year marriage or at any time.
              </p>
              <p>
                <strong>14.</strong> I attest under penalty of perjury that there are no active, pending, or historical criminal arrest warrants for my arrest in this jurisdiction or any other jurisdiction. In stark contrast, Respondent Eric Joshua Greene was arrested on April 11, 2019, by the Pasco County Sheriff's Office for Domestic Battery (F.S. 784.03) after violently shoving me out of our mobile home in front of our minor daughters Sarah and Kayleen (Preserved as Exhibit TRG-0013 / Report #19-014214). Furthermore, on November 1, 2019—exactly 48 hours prior to the armed attack on Pedro Hernandez—Respondent sent me a Facebook Messenger communication pleading with me to return, offering financial restitution, and explicitly conditioning my access to our children on my returning to his control (&quot;you can be with your kids all of them baby girl please come home&quot;). When I unequivocally rejected him, confirmed my relationship with Pedro Hernandez, and warned him that he would attempt to &quot;rip everything else that I have left from me&quot; (Preserved as Exhibit TRG-0025), Respondent erupted in violent retaliation two days later: on November 3, 2019, Respondent was arrested for Felony Aggravated Assault with a Deadly Weapon after choking Pedro Hernandez, screaming &quot;I am gonna kill you&quot;, and retrieving a High Point Black 9mm handgun (Preserved as Exhibit TRG-0014 / Report #19-045997).
              </p>
              <p>
                <strong>15.</strong> I attest under penalty of perjury that I have never been ordered by any court to attend, submit to, or complete mandatory drug, alcohol, or substance rehabilitation, nor have I ever fled any jurisdiction to avoid legal process.
              </p>
              <p>
                <strong>16.</strong> I attest under penalty of perjury that I have never committed loan fraud, forged Respondent&apos;s name, or taken out unauthorized loans in Respondent&apos;s name.
              </p>
              <p>
                <strong>17.</strong> I have never abandoned my minor children; my physical departure from the former residence was necessitated by escalating domestic violence, threats, and forced displacement. As documented in my federal complaint to the FBI Internet Crime Complaint Center (IC3 Submission ID: 05279c5fe54949208d87da7f14601dba, Preserved as Exhibit TRG-0015) and my sworn Florida dissolution petition (Preserved as Exhibit TRG-0017), Respondent stranded me in Mexico, stole my identification, liquidated our $170,000 Florida marital homestead without consent, and moved our children across state lines to Kentucky to sever their bond with me.
              </p>
              <p>
                <strong>17b.</strong> As officially certified by the Florida Department of Revenue Child Support Program (Case #2001507784, Preserved as Exhibit TRG-0016), Respondent has paid exactly $0.00 in child support since separation, while three of our minor children require intensive autism and psychiatric treatment, and while Respondent fathered a child with Third Party Heaven Horton during our marriage.
              </p>
              <p>
                <strong>17c.</strong> When four consecutive adult DCF in-home investigations (2016–2020) closed with zero indicators of abuse or neglect, Florida DCF and opposing parties improperly accessed and weaponized my own confidential childhood DCF records—from when I was a minor child victim of abuse—in an egregious attempt to classify me as a &quot;high risk parent&quot;. Punishing a mother and depriving her of custody based solely on her historic victimization as a child violates Florida Statutes Chapter 39 and Constitutional Due Process, and conclusively proves that opposing parties possess zero legitimate evidence of adult parental inadequacy.
              </p>
            </div>

            <h4 className="font-bold text-amber-400 uppercase text-xs tracking-wider border-b border-slate-800 pb-1 font-mono-legal pt-4">
              V. Direct Threat of Physical Violence
            </h4>
            <div className="space-y-2.5 pl-2 sm:pl-4">
              <p>
                <strong>18.</strong> On June 18, 2026, at 23:42 EDT (Eastern Daylight Time), Respondent directly transmitted a video recording into my private electronic inbox stating: <em>&quot;I should beat her ass / But my momma said animal abuse is wrong.&quot;</em> (Preserved as Exhibit 12 / Bates TRG-0012).
              </p>
              <p>
                <strong>19.</strong> This menacing communication placed me in imminent fear of physical violence and severe bodily injury, demonstrating a clear and present danger requiring emergency judicial restraint.
              </p>
            </div>

            <h4 className="font-bold text-amber-400 uppercase text-xs tracking-wider border-b border-slate-800 pb-1 font-mono-legal pt-4">
              VI. Third-Party Parental Alienation &amp; Need for Restraining Order
            </h4>
            <div className="space-y-2.5 pl-2 sm:pl-4">
              <p>
                <strong>20.</strong> Respondent has permitted Third Party Heaven-Leigh to live in his home and actively denigrate me directly to our minor children.
              </p>
              <p>
                <strong>21.</strong> On February 5, 2026, Heaven-Leigh admitted in writing via Messenger: <em>&quot;I just tell your the kids the truth. I ain&apos;t gonna lie to em. They know what kind of woman you are.&quot;</em> (Preserved as Exhibit 07 / Bates TRG-0007).
              </p>
              <p>
                <strong>22.</strong> Unless this Court enters an immediate protective injunction and gag order, Respondent and his associates will continue to harass me, defame my character, alienate my minor children, and endanger my safety.
              </p>
            </div>
          </div>

          {/* Jurat and Signature Block */}
          <div className="pt-8 border-t-2 border-slate-700 space-y-6">
            <p className="font-serif-court italic text-slate-300">
              I declare under penalty of perjury under the laws of {currentJurisdiction.name} that the foregoing declaration is true and correct.
            </p>

            <div className="flex flex-col sm:flex-row justify-between gap-6 pt-4 text-xs font-mono-legal">
              <div>
                <div>Executed this 5th day of October, 2026.</div>
                <div className="mt-1 text-slate-400">Location: ________________________</div>
              </div>
              <div className="text-right">
                <div className="inline-block border-b border-slate-400 w-64 pb-1">
                  &nbsp;
                </div>
                <div className="font-bold text-slate-100 mt-1">TIFFANY RENEA GREENE</div>
                <div className="text-slate-400">Declarant / Petitioner</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
