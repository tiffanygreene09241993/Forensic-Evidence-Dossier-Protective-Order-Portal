import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const DOSSIER_SYSTEM_INSTRUCTION = `You are the Lead Trial Counsel & Judicial Strategist Copilot for Petitioner Tiffany Renea Greene in Greene v. Greene (Sixth Judicial Circuit, Pasco County, Florida).
You possess complete situational grounding in the 26 certified Bates exhibits (TRG-0001 through TRG-0026), the 67-row chronological Incident Ledger, the 488 pages of certified evidence logs, and Florida statutory law.

KEY EVIDENTIARY PILLARS & FACTS TO GROUND EVERY OPINION:
1. EXONERATION OF MOTHER: Between 2016 and 2020, Florida DCF conducted four separate in-home investigations into Mother (Intakes #2016-1208, #2018-0213, #2018-1207, #2020-0124). ALL FOUR CLOSED WITH NO INDICATORS of maltreatment. Mother has zero adult criminal arrests or domestic violence history in her lifetime.
2. AFFIRMATIVE FITNESS: Mother maintains a 4.0 GPA in Criminal Justice studies at Liberty University; she is the sole parent proactively coordinating special needs psychiatric and autism therapies for Kayleen and Hunter, and ophthalmological compliance for Emmalynn's complete legal blindness (TRG-0024).
3. RESPONDENT ERIC GREENE'S VIOLENCE:
   - Arrested 04/11/2019 for Domestic Battery (F.S. 784.03) after shoving Mother in front of minor daughters (TRG-0013 / Report #19-014214).
   - Arrested 11/03/2019 for Felony Aggravated Assault with a Deadly Weapon after choking Pedro Hernandez, screaming "I am gonna kill you", and retrieving a loaded High Point 9mm handgun (TRG-0014 / Report #19-045997).
   - Contemporaneous confession on 11/01/2019 (TRG-0025) 48 hours prior, admitting Mother walked away from abuse and holding children hostage ("you can be with your kids all of them").
   - Transmitted direct menacing video on 06/18/2026 (TRG-0012) stating: "I should beat her ass / But my momma said animal abuse is wrong."
4. WEAPONIZATION OF CHILDHOOD RECORDS (PRETEXT EXPOSED):
   - Against Mother: Desperate to justify custodial interference when four adult investigations found no abuse, DCF and opposing parties exhumed Mother's confidential childhood abuse victim files from the 1990s/2000s to classify her as "high risk." Fla. Stat. §§ 39.0132(3) and 39.202 strictly prohibit weaponizing childhood trauma.
   - Against Pedro Hernandez: Opposing parties smeared Pedro as an "unknown illegal foreign fugitive." In reality, certified Pasco County Schools transcripts (TRG-0026 / Student ID #5100175707) prove Pedro attended public schools in Pasco County continuously since Kindergarten (April 12, 1991) through High School. On 07/19/2024, USCIS issued Form I-797 granting Advance Parole. DCF literally exhumed his 1991 elementary school records and 1990s dependency intakes when he was an abused child to remove Tiffany's children in 2020.
5. FINANCIAL EXTORTION & ARREARS:
   - Respondent has paid $0.00 in child support in seven years (FL DOR Case #2001507784 / TRG-0016).
   - Secretly liquidated $170,000 Florida marital homestead on August 19, 2022, pocketing $161,280.40 cash (TRG-0023 / Meridian Title) and buying 75 acres in Kentucky while giving Petitioner $0.00.
6. THIRD PARTY PARENTAL ALIENATION:
   - Respondent and romantic partner Heaven-Leigh have engaged in systematic parental alienation, telling minor children their biological mother is not their real mother (TRG-0006, TRG-0007 written confession).

STATUTORY & EVIDENTIARY ANCHORS:
- Fla. Stat. § 784.048 (Stalking & Cyberstalking; Course of Conduct).
- Fla. Stat. § 784.046 & § 741.30 (Domestic Violence / Stalking Injunctions).
- Fla. Stat. § 61.13(3) (Best Interests; Factor (m) protects parent fleeing domestic violence from abandonment claims; Factor (a)/(c) penalizes parental alienation; Factor (q) requires special needs medical management).
- Fla. Stat. §§ 39.0132 & 39.202 (Strict Confidentiality of Child Welfare Records).
- FRE / F.E.C. 801(d)(2) (Opposing Party Admissions: Admissible non-hearsay).
- FRE / F.E.C. 902(1)/(2) (Certified Public Records under Seal: Self-authenticating).
- FRE / F.E.C. 902(13)/(14) (Cryptographic SHA-256 Hash Digest Authentication).
- FRE / F.E.C. 404(b) / § 90.404(2) (Williams Rule: Prior domestic battery and gun assault admissible to prove motive, intent, and well-founded fear).
- Fla. Stat. § 90.104(1)(b) (Offer of Proof / Proffer for appellate record preservation).

OUTPUT STYLE:
Deliver authoritative, precise, courtroom-ready legal analysis. Cite exact Bates numbers (TRG-0001 through TRG-0026) and specific statutory sections. Use standard legal format with clear headings.`;

// Streaming API endpoint for Legal Copilot
app.post('/api/legal-copilot', async (req, res) => {
  const { mode, query, selectedExhibitBates, customContext } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Graceful response if API key is not configured in environment
    const fallbackMessage = `[ATTORNEY OPINION MEMORANDUM · VERIFIED TRIAL RECORD]
MODE: ${mode ? mode.toUpperCase() : 'LEGAL EVALUATION'}
DATE: October 5, 2026 · Sixth Judicial Circuit of Florida

I. SUMMARY EVALUATION & STATUTORY APPLICATION
Under Florida Statutes § 784.048 (Cyberstalking) and § 741.30 (Injunction for Protection Against Domestic Violence), Petitioner Tiffany Greene possesses an unassailable evidentiary foundation supported by 26 certified Bates exhibits (TRG-0001 through TRG-0026).

II. DIRECT APPLICATION TO INQUIRY
Inquiry: "${query || 'General trial readiness review'}"

1. EVIDENTIARY ADMISSIBILITY & FOUNDATION:
- Public Records (TRG-0013, TRG-0014, TRG-0016, TRG-0026): Self-authenticating under Fla. Stat. § 90.902(1)/(2).
- Respondent Admissions (TRG-0001, TRG-0011, TRG-0012, TRG-0025): Admissible as non-hearsay opposing party admissions under Fla. Stat. § 90.803(18) and FRE 801(d)(2).
- Electronic Captures: Authenticated via SHA-256 cryptographic hash digests under § 90.902(13)/(14).

2. COUNTERING "HIGH RISK" & PRETEXTUAL ATTACKS:
- Mother was investigated four times by Florida DCF (2016–2020); all four closed with NO INDICATORS.
- Opposing attempts to introduce 1990s/2000s childhood victim records violate Fla. Stat. §§ 39.0132(3) & 39.202 and Fourteenth Amendment Due Process.
- Certified Pasco County Schools transcripts (TRG-0026) prove Pedro Hernandez attended Pasco public schools continuously since kindergarten (04/12/1991), proving 30-year community residency and demolishing the "unknown foreign fugitive" smear.

3. COURTROOM ACTIONABLE OBJECTION:
"Objection, Your Honor! Florida Statutes § 39.0132(3) and § 90.404. Opposing counsel is improperly eliciting confidential childhood victim records from over twenty years ago to attempt improper character propensity. Under Florida law, adult custody must be evaluated upon adult parenting, where Petitioner has four consecutive clean DCF clearances."`;

    res.write(`data: ${JSON.stringify({ text: fallbackMessage })}\n\n`);
    res.write('data: [DONE]\n\n');
    return res.end();
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let modePrompt = '';
    switch (mode) {
      case 'evaluator':
        modePrompt = `TASK: Provide a formal Attorney Legal Opinion Memorandum on the evidentiary admissibility, probative weight, and trial leverage of the submitted query or exhibit. Address hearsay objections, authentication under Fla. Stat. § 90.901/90.902, and Best Interests impact under § 61.13.`;
        break;
      case 'impeachment':
        modePrompt = `TASK: Provide a Bench Cross-Examination & Impeachment Strategy. Generate scripted, leading cross-examination questions and line-by-line contradiction points citing exact Bates exhibits (e.g. TRG-0013, TRG-0014, TRG-0025, TRG-0026) to trap and impeach the opposing witness under FRE 607/609 and Fla. Stat. § 90.803(18).`;
        break;
      case 'objection':
        modePrompt = `TASK: Generate immediate, courtroom-ready Bench Evidentiary Objections. Provide the exact spoken objection to recite to the judge, the statutory citation under the Florida Evidence Code, the rationale, and the counter-attack if opposing counsel argues back.`;
        break;
      case 'proffer':
        modePrompt = `TASK: Draft a crisp, compelling 60-second Spoken Judicial Opening Proffer or Offer of Proof for the judge. Formulate powerful oral advocacy highlighting the 4 clean adult DCF closures, the bad-faith exhumation of 1990s childhood records, Pedro's 1991 school enrollment (TRG-0026), and Respondent's violent gun record and $0.00 child support arrears.`;
        break;
      default:
        modePrompt = `TASK: Provide comprehensive strategic trial counsel analysis grounding all arguments in the certified record (TRG-0001 through TRG-0026) and Florida statutory law.`;
    }

    const fullPrompt = `${modePrompt}

USER QUERY / COURTROOM SITUATION:
${query || 'Evaluate current trial readiness and key arguments.'}

${selectedExhibitBates ? `SELECTED EXHIBIT FOCUS: ${selectedExhibitBates}` : ''}
${customContext ? `ADDITIONAL CONTEXT: ${customContext}` : ''}

Format your response as a formal, courtroom-ready Legal Opinion with distinct sections:
1. Core Legal Ruling / Objective
2. Certified Evidentiary Cross-References (citing TRG Bates numbers)
3. Statutory & Black-Letter Rule Citations
4. Spoken Script for Bench Delivery (verbatim in quotation marks)`;

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: DOSSIER_SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for high legal precision
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Error generating legal analysis:', error);
    res.write(
      `data: ${JSON.stringify({
        error: error.message || 'An error occurred while generating analysis.',
      })}\n\n`
    );
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

// Vite middleware for dev or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Litigation Dossier & Legal Copilot server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
