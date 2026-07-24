/**
 * Generates the non-founder team member pages in the SAME rich format as the
 * founder page (team/cesare-trebeschi.html): bio hero with framed photo,
 * expertise grid, career timeline, belief interlude, education, contact CTA.
 *
 * Members have no photos yet → the framed photo shows a serif monogram.
 * Hero summaries describe each role honestly; timeline "prior" and education
 * are clearly marked "[In arrivo]" for the client to fill in later.
 *
 * Usage: node scripts/gen-team.mjs   (run after editing members[] / XP data)
 * Cesare's founder page is hand-built separately and NOT touched by this script.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const teamDir = join(__dirname, '..', 'team');
mkdirSync(teamDir, { recursive: true });

/* ---- expertise card sets, keyed by area type ---- */
const XP = {
  formazione: [
    { t:{it:'Formazione obbligatoria',en:'Mandatory training'}, d:{it:'Sicurezza sul lavoro (D.Lgs. 81/08), primo soccorso, antincendio, RSPP, RLS e HACCP: i percorsi che mettono l’impresa in regola.',en:'Workplace safety (Decree 81/08), first aid, fire safety, RSPP, RLS and HACCP: the courses that keep a company compliant.'} },
    { t:{it:'Fondi interprofessionali',en:'Interprofessional funds'}, d:{it:'Individuazione e gestione dei fondi (Fondimpresa, Fonarcom, Formazienda…) perché la formazione sia a costo zero per l’azienda.',en:'Finding and managing the funds (Fondimpresa, Fonarcom, Formazienda…) so training comes at no cost to the company.'} },
    { t:{it:'Accreditamenti & rendicontazione',en:'Accreditation & reporting'}, d:{it:'Gestione degli accreditamenti, dei registri e della rendicontazione dei percorsi finanziati.',en:'Handling accreditation, registers and the reporting of funded programmes.'} },
    { t:{it:'Analisi del fabbisogno',en:'Needs analysis'}, d:{it:'Lettura del fabbisogno formativo e costruzione del piano accanto al cliente.',en:'Reading the training need and building the plan alongside the client.'} },
  ],
  sumisura: [
    { t:{it:'Analisi del fabbisogno',en:'Needs analysis'}, d:{it:'Ascolto dell’azienda per tradurre obiettivi e criticità in un percorso formativo concreto.',en:'Listening to the company to turn goals and pain points into a concrete programme.'} },
    { t:{it:'Leadership & team building',en:'Leadership & team building'}, d:{it:'Programmi di sviluppo manageriale, team building e change management.',en:'Managerial development, team building and change-management programmes.'} },
    { t:{it:'Progettazione su misura',en:'Tailor-made design'}, d:{it:'Contenuti e metodologie aderenti al contesto specifico di ogni impresa.',en:'Content and methods built around each company’s specific context.'} },
    { t:{it:'Misurazione dei risultati',en:'Measuring results'}, d:{it:'Verifica dell’impatto del percorso, oltre la semplice erogazione.',en:'Checking the programme’s impact, beyond simple delivery.'} },
  ],
  advisory: [
    { t:{it:'Riassetti & processi',en:'Restructuring & processes'}, d:{it:'Riorganizzazione di assetti e processi accanto alla proprietà.',en:'Reorganising structures and processes alongside ownership.'} },
    { t:{it:'Passaggi generazionali',en:'Generational handover'}, d:{it:'Governance familiare e continuità d’impresa nel tempo.',en:'Family governance and business continuity over time.'} },
    { t:{it:'Operazioni straordinarie',en:'Extraordinary operations'}, d:{it:'Preparazione a M&A, ingresso soci e operazioni di finanza straordinaria.',en:'Preparation for M&A, new partners and extraordinary finance.'} },
    { t:{it:'Coordinamento advisor',en:'Advisor coordination'}, d:{it:'Regia dei tavoli con commercialisti, banche e advisor.',en:'Directing the table with accountants, banks and advisors.'} },
  ],
  invoice: [
    { t:{it:'Invoice trading',en:'Invoice trading'}, d:{it:'Cessione di fatture a investitori qualificati su piattaforme regolamentate.',en:'Selling invoices to qualified investors on regulated platforms.'} },
    { t:{it:'Finanza non bancaria',en:'Non-bank finance'}, d:{it:'Strumenti che non impattano la Centrale Rischi né consumano i castelletti.',en:'Tools that don’t affect the credit registry or use up credit lines.'} },
    { t:{it:'Direzione finanziaria',en:'Financial direction'}, d:{it:'CFO in outsourcing, controllo di gestione e analisi del cash flow.',en:'Outsourced CFO, management control and cash-flow analysis.'} },
    { t:{it:'Profilazione & rischio',en:'Profiling & risk'}, d:{it:'Analisi dei debitori e strutturazione delle operazioni.',en:'Debtor analysis and structuring of operations.'} },
  ],
  operations: [
    { t:{it:'Coordinamento operativo',en:'Operational coordination'}, d:{it:'Tiene insieme l’operatività quotidiana del Gruppo.',en:'Holds the Group’s daily operations together.'} },
    { t:{it:'Primo contatto',en:'First contact'}, d:{it:'Spesso la prima voce che il cliente sente quando chiama Polaris.',en:'Often the first voice clients hear when they call Polaris.'} },
    { t:{it:'Amministrazione',en:'Administration'}, d:{it:'Gestione amministrativa, pianificazione e flussi documentali.',en:'Administration, scheduling and document flows.'} },
    { t:{it:'Relazione clienti',en:'Client relations'}, d:{it:'Punto di riferimento per appuntamenti, pratiche e follow-up.',en:'A reference point for appointments, paperwork and follow-up.'} },
  ],
  amministrazione: [
    { t:{it:'Contabilità',en:'Accounting'}, d:{it:'Tenuta della contabilità ordinaria del Gruppo e delle società collegate.',en:'Keeping the ordinary bookkeeping of the Group and its related companies.'} },
    { t:{it:'Fatturazione & pagamenti',en:'Invoicing & payments'}, d:{it:'Ciclo attivo e passivo: fatturazione, scadenziario e gestione dei pagamenti.',en:'Accounts payable and receivable: invoicing, due dates and payment management.'} },
    { t:{it:'Adempimenti',en:'Compliance'}, d:{it:'Adempimenti amministrativi e fiscali, in raccordo con i consulenti.',en:'Administrative and tax compliance, in coordination with advisors.'} },
    { t:{it:'Dati economico-finanziari',en:'Financial data'}, d:{it:'Supporto alla predisposizione dei dati economico-finanziari del Gruppo.',en:'Support in preparing the Group’s economic-financial data.'} },
  ],
};

const XPHEAD = {
  formazione:{ h:{it:'Formazione che mette in regola e fa <span class=\'hl\'>crescere</span>.',en:'Training that ensures compliance and drives <span class=\'hl\'>growth</span>.'},
    intro:{it:'Percorsi obbligatori e di sviluppo, finanziati dai fondi interprofessionali e gestiti accanto all’impresa.',en:'Mandatory and development courses, funded by interprofessional funds and managed alongside the company.'} },
  sumisura:{ h:{it:'Percorsi costruiti <span class=\'hl\'>sull’impresa</span>.',en:'Programmes built <span class=\'hl\'>around the company</span>.'},
    intro:{it:'Formazione su misura che parte dal bisogno reale dell’azienda e ne misura l’impatto.',en:'Tailor-made training that starts from the company’s real need and measures its impact.'} },
  advisory:{ h:{it:'Le scelte che <span class=\'hl\'>non si delegano</span>.',en:'The decisions you <span class=\'hl\'>can’t delegate</span>.'},
    intro:{it:'Advisory direzionale accanto alla proprietà nelle decisioni strategiche, fino al momento in cui la scelta prende forma.',en:'Strategic advisory beside ownership in the decisions that matter, right up to the moment the choice takes shape.'} },
  invoice:{ h:{it:'Liquidità <span class=\'hl\'>oltre la banca</span>.',en:'Liquidity <span class=\'hl\'>beyond the bank</span>.'},
    intro:{it:'Finanza non bancaria e invoice trading attraverso Hazard srl, società del Gruppo.',en:'Non-bank finance and invoice trading through Hazard srl, a Group company.'} },
  operations:{ h:{it:'L’operatività che <span class=\'hl\'>tiene tutto insieme</span>.',en:'The operations that <span class=\'hl\'>hold it all together</span>.'},
    intro:{it:'Coordinamento, amministrazione e relazione con i clienti: la struttura su cui poggia il lavoro del Gruppo.',en:'Coordination, administration and client relations: the backbone the Group’s work rests on.'} },
  amministrazione:{ h:{it:'I conti che <span class=\'hl\'>tornano</span>.',en:'The numbers that <span class=\'hl\'>add up</span>.'},
    intro:{it:'Contabilità, fatturazione e adempimenti dell’area economico-finanziaria, giorno dopo giorno.',en:'Accounting, invoicing and compliance in the finance area, day after day.'} },
};

/* shared Polaris belief (company method, not a personal quote) */
const BELIEF = {
  eyebrow:{it:'Il metodo',en:'The method'},
  quote:{it:'La crescita passa prima dalle <em>persone</em> e dalla <em>cultura</em>, poi dalla tecnica.',en:'Growth comes first from <em>people</em> and <em>culture</em>, then from technique.'},
  by:'Polaris Group',
};

const members = [
  { slug:'cristina', initials:'C', name:'Cristina Milanesi', xptype:'operations',
    photo:true, photoPos:'center 26%',
    role:{it:'Front & Back Office',en:'Front & Back Office'}, area:{it:'Area Segreteria',en:'Administration'},
    specialty:{it:'Gestione piani, front e back office, assistenza clienti',en:'Plan management, front and back office, client support'},
    summary:{it:'In Polaris da un anno, segue la gestione dei piani e le attività di front e back office: organizzazione delle pratiche, coordinamento operativo e assistenza ai clienti, con attenzione ai dettagli e spirito di collaborazione.',en:'With Polaris for a year, she handles plan management and front- and back-office work: organising paperwork, coordinating day-to-day operations and supporting clients, with attention to detail and a collaborative spirit.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    prior:{it:'Entrata in Polaris nel 2025, porta nel Gruppo organizzazione, precisione e capacità di problem solving al servizio dei clienti.',en:'She joined Polaris in 2025, bringing organisation, precision and problem-solving in service of clients.'},
    focus:{it:'Gestione dei piani e attività di front e back office.',en:'Plan management and front- and back-office work.'} },
  { slug:'alessio', initials:'A', name:'Alessio Di Cesare', xptype:'amministrazione',
    photo:true, photoPos:'center 32%',
    role:{it:'Responsabile Amministrativo',en:'Head of Administration'}, area:{it:'Area Economico-Finanziaria',en:'Finance & Control'},
    specialty:{it:'Contabilità, fatturazione e gestione dei pagamenti',en:'Accounting, invoicing and payment management'},
    summary:{it:'In Polaris dal 2020, è il responsabile amministrativo del Gruppo: cura la tenuta della contabilità, la fatturazione e la gestione dei pagamenti dell’area economico-finanziaria.',en:'With Polaris since 2020, he is the Group’s head of administration: he looks after bookkeeping, invoicing and the management of payments in the finance area.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    prior:{it:'In Polaris dal 2020, tiene la contabilità del Gruppo insieme al collega Gianmaria, occupandosi di fatturazione, scadenze e pagamenti.',en:'With Polaris since 2020, he keeps the Group’s accounts together with his colleague Gianmaria, handling invoicing, deadlines and payments.'},
    focus:{it:'Contabilità, fatturazione e gestione dei pagamenti.',en:'Accounting, invoicing and payment management.'} },
  { slug:'gianmaria', initials:'G', name:'Gianmaria Bassani', xptype:'invoice',
    role:{it:'Amministrazione',en:'Administration'}, area:{it:'Area Economico-Finanziaria',en:'Finance & Control'},
    specialty:{it:'Contabilità, adempimenti amministrativi, supporto al controller',en:'Accounting, administrative compliance, controller support'},
    summary:{it:'Collaboratore contabile e amministrativo dell’area economico-finanziaria. Tiene insieme la contabilità ordinaria e gli adempimenti del Gruppo.',en:'Accounting and administrative collaborator in the finance & control area. Holds together everyday bookkeeping and the Group’s compliance.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Contabilità e adempimenti amministrativi.',en:'Accounting and administrative compliance.'} },
  { slug:'mara', initials:'M', name:'Mara Carioni', xptype:'sumisura',
    photo:true, photoPos:'center 22%',
    linkedin:'https://www.linkedin.com/in/mara-carioni-a48b0616b/',
    role:{it:'Responsabile Formazione',en:'Head of Training'}, area:{it:'Area Formazione',en:'Training'},
    specialty:{it:'Direzione dell’area formazione, regia dei percorsi',en:'Direction of the training area, programme design'},
    summary:{it:'Responsabile dell’Area Formazione: dirige la squadra, definisce la regia dei percorsi e tiene la relazione con gli imprenditori che ci affidano i propri team.',en:'Head of the Training area: leads the team, defines programme design and keeps the relationship with the entrepreneurs who entrust their people to us.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    prior:{it:'In Polaris dal 2015. Entrata subito dopo il percorso di studi, è cresciuta all’interno dell’azienda fino a guidare l’Area Formazione, che coordina progettazione, gestione e rendicontazione dei progetti formativi.',en:'With Polaris since 2015. She joined straight after her studies and grew within the company to lead the Training area, coordinating the design, delivery and reporting of training projects.'},
    focus:{it:'Direzione dell’area formazione.',en:'Leading the training area.'} },
  { slug:'paola', initials:'P', name:'Paola Franzoni', xptype:'formazione',
    photo:true, photoPos:'center 20%',
    linkedin:'https://www.linkedin.com/in/paola-franzoni-072759345/',
    role:{it:'Formazione',en:'Training'}, area:{it:'Area Formazione',en:'Training'},
    specialty:{it:'Progettazione e gestione di percorsi formativi finanziati e aziendali',en:'Design and management of funded and corporate training programmes'},
    summary:{it:'Professionista della formazione e delle risorse umane. Da oltre sei anni, con Polaris HR, progetta e gestisce percorsi formativi finanziati e aziendali, dalla sicurezza alla valorizzazione del capitale umano.',en:'A training and human-resources professional. For over six years, with Polaris HR, she has designed and managed funded and corporate training programmes, from workplace safety to developing human capital.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    prior:{it:'Oltre sei anni di esperienza nella progettazione e gestione di percorsi formativi finanziati e aziendali, con un approccio che unisce competenza tecnica, ascolto delle aziende e orientamento ai risultati.',en:'Over six years of experience designing and managing funded and corporate training programmes, with an approach that blends technical expertise, listening to companies and a focus on results.'},
    focus:{it:'Progettazione e gestione dei percorsi formativi.',en:'Designing and managing training programmes.'} },
  { slug:'andrea', initials:'A', name:'Andrea Ungaro', xptype:'formazione',
    photo:true, photoPos:'center 20%',
    role:{it:'Formazione',en:'Training'}, area:{it:'Area Formazione',en:'Training'},
    specialty:{it:'Supporto alla gestione dei piani formativi',en:'Support to the management of training plans'},
    summary:{it:'Giovane collaboratore dell’Area Formazione. Segue con serietà e dedizione le attività che gli vengono affidate, con spirito di collaborazione e attenzione all’ordine.',en:'A young collaborator in the Training area. He follows the tasks entrusted to him with seriousness and dedication, a collaborative spirit and attention to detail.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Supporto alla gestione dei piani formativi.',en:'Supporting the management of training plans.'} },
  { slug:'giovanni', initials:'G', name:'Giovanni Di Genio', xptype:'sumisura',
    photo:true, photoPos:'center 26%', hideCredentials:true,
    role:{it:'Collaboratore Senior',en:'Senior Collaborator'}, area:{it:'Area Formazione',en:'Training'},
    specialty:{it:'Docenza senior, percorsi per imprenditori e dirigenti',en:'Senior faculty, programmes for entrepreneurs and managers'},
    summary:{it:'Collaboratore senior dell’Area Formazione: porta nei percorsi un’esperienza consolidata e un approccio concreto, dedicato in particolare a imprenditori e dirigenti.',en:'Senior collaborator in the Training area: brings established experience and a concrete approach to the programmes, dedicated in particular to entrepreneurs and managers.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    prior:{it:'Mette a disposizione dell’Area Formazione un’esperienza maturata sul campo, portando in aula uno stile diretto e vicino alle esigenze di chi guida un’impresa.',en:'He brings to the Training area experience built in the field, with a direct classroom style close to the needs of those who run a company.'},
    focus:{it:'Docenza senior e percorsi per imprenditori e dirigenti.',en:'Senior faculty and programmes for entrepreneurs and managers.'} },
  { slug:'silvia', initials:'S', name:'Silvia Ungaro', xptype:'formazione',
    role:{it:'Senior Partner',en:'Senior Partner'}, area:{it:'Area Formazione',en:'Training'},
    specialty:{it:'Docenza senior, percorsi formativi avanzati',en:'Senior faculty, advanced training programmes'},
    summary:{it:'Senior partner dell’Area Formazione. Affianca i partecipanti dei percorsi avanzati con un approccio costruito sull’esperienza diretta in azienda.',en:'Senior partner in the Training area. Supports participants of advanced programmes with an approach built on direct in-company experience.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Docenza senior nei percorsi formativi avanzati.',en:'Senior faculty in advanced training programmes.'} },
  { slug:'roberto', initials:'R', name:'Roberto James Aloi', xptype:'formazione',
    role:{it:'Senior Partner',en:'Senior Partner'}, area:{it:'Area Formazione',en:'Training'},
    specialty:{it:'Docenza senior, percorsi per imprenditori e dirigenti',en:'Senior faculty, programmes for entrepreneurs and managers'},
    summary:{it:'Senior partner dell’Area Formazione. Porta in aula l’esperienza dei percorsi rivolti a imprenditori e dirigenti, con uno stile didattico concreto e orientato ai risultati.',en:'Senior partner in the Training area. Brings to the classroom the experience of programmes aimed at entrepreneurs and managers, with a concrete, results-oriented teaching style.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Docenza senior per imprenditori e dirigenti.',en:'Senior faculty for entrepreneurs and managers.'} },
  { slug:'carole', initials:'C', name:'Carole Conti', xptype:'formazione',
    role:{it:'Senior Partner',en:'Senior Partner'}, area:{it:'Area Formazione',en:'Training'},
    specialty:{it:'Docenza senior, soft skills e sviluppo delle persone',en:'Senior faculty, soft skills and people development'},
    summary:{it:'Senior partner dell’Area Formazione. Si occupa dei percorsi su soft skills e sviluppo delle persone, con un approccio basato sulla relazione e sull’ascolto.',en:'Senior partner in the Training area. Works on programmes for soft skills and people development, with an approach grounded in relationship and listening.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Docenza senior su soft skills e sviluppo delle persone.',en:'Senior faculty on soft skills and people development.'} },
  { slug:'roberta', initials:'R', name:'Roberta Tagliani', xptype:'formazione',
    photo:true, photoPos:'center 26%',
    linkedin:'https://www.linkedin.com/in/roberta-tagliani-57957b73/',
    role:{it:'Senior Partner',en:'Senior Partner'}, area:{it:'Area Formazione',en:'Training'},
    specialty:{it:'RSPP, HACCP, accreditamento regionale, fondi interprofessionali',en:'RSPP, HACCP, regional accreditation, interprofessional funds'},
    summary:{it:'Consulente ed esperta nella progettazione e gestione dei processi formativi, specializzata in Salute e Sicurezza sul Lavoro (RSPP) e Igiene degli Alimenti (HACCP). Oltre quindici anni sul campo al fianco delle imprese.',en:'A consultant and expert in the design and management of training processes, specialised in Workplace Health & Safety (RSPP) and Food Hygiene (HACCP). Over fifteen years in the field alongside companies.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    prior:{it:'Oltre quindici anni di esperienza con enti di formazione, associazioni di categoria e imprese: docenze specialistiche, incarichi esterni di RSPP e igiene degli alimenti, accreditamento regionale, sistemi di gestione Qualità e Privacy (GDPR). Accompagna le aziende nell’accesso ai fondi interprofessionali e ai bandi regionali e camerali.',en:'Over fifteen years of experience with training bodies, trade associations and companies: specialist teaching, external RSPP and food-hygiene assignments, regional accreditation, Quality and Privacy (GDPR) management systems. She supports companies in accessing interprofessional funds and regional and chamber grants.'},
    education:{it:'Laurea in Scienze della Formazione, Università di Verona.',en:'Degree in Education Sciences, University of Verona.'},
    focus:{it:'Docenza specialistica su sicurezza (RSPP) e igiene degli alimenti (HACCP).',en:'Specialist teaching on safety (RSPP) and food hygiene (HACCP).'} },
  { slug:'francesca', initials:'F', name:'Francesca Rossini', xptype:'formazione',
    role:{it:'Junior Partner',en:'Junior Partner'}, area:{it:'Area Formazione',en:'Training'},
    specialty:{it:'Affiancamento ai senior, supporto in aula',en:'Senior support, classroom assistance'},
    summary:{it:'Junior partner dell’Area Formazione. Affianca i senior nei percorsi formativi, dalla preparazione dei materiali alla gestione dell’aula.',en:'Junior partner in the Training area. Supports senior partners across training programmes, from preparing materials to running the classroom.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Affiancamento ai senior nei percorsi formativi.',en:'Supporting senior partners across training programmes.'} },
  { slug:'lavinia', initials:'L', name:'Lavinia Di Genio', xptype:'formazione',
    photo:true, photoPos:'center 12%', hideCredentials:true,
    role:{it:'Collaboratrice Junior',en:'Junior Collaborator'}, area:{it:'Area Formazione',en:'Training'},
    specialty:{it:'Affiancamento ai senior, supporto in aula',en:'Senior support, classroom assistance'},
    summary:{it:'Collaboratrice junior dell’Area Formazione. Affianca i collaboratori senior nei percorsi formativi, contribuendo alla preparazione dei materiali e alla gestione operativa delle aule.',en:'Junior collaborator in the Training area. She supports the senior collaborators across training programmes, contributing to the preparation of materials and the day-to-day running of the classroom.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    prior:{it:'Al fianco dei collaboratori senior, segue la parte operativa dei percorsi: preparazione dei materiali, organizzazione delle aule e supporto ai partecipanti.',en:'Alongside the senior collaborators, she handles the operational side of the programmes: preparing materials, organising classrooms and supporting participants.'},
    focus:{it:'Affiancamento ai senior nei percorsi formativi.',en:'Supporting the senior collaborators across training programmes.'} },
];

/* escapers: a) plain attribute text (escape & and "), b) html-bearing attr (escape & only; inner markup uses single quotes) */
const escA = s => String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
const escH = s => String(s).replace(/&/g,'&amp;');

const xpCards = m => XP[m.xptype].map(c =>
`        <div class="xp-card">
          <h3 class="xp-card__t" data-it="${escA(c.t.it)}" data-en="${escA(c.t.en)}">${c.t.it}</h3>
          <p class="xp-card__d" data-it="${escA(c.d.it)}" data-en="${escA(c.d.en)}">${c.d.it}</p>
        </div>`).join('\n');

const page = m => {
  const head = XPHEAD[m.xptype];
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${m.name}, ${m.role.it} | Polaris Group</title>
<meta name="description" content="${escA(m.name)}, ${escA(m.role.it)} di Polaris Group. ${escA(m.summary.it)}">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png">
<link rel="apple-touch-icon" href="/favicon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
<style>
  :root{ --blue:#7FA8DC; }
  .bio-hero{position:relative;overflow:hidden;color:#fff;
    background:radial-gradient(78% 90% at 76% 38%,#0e3258,transparent 60%),linear-gradient(180deg,#0B2E4F,#08233c)}
  .bio-hero__inner{max-width:1200px;margin:0 auto;padding:calc(88px + 72px) 32px 96px;
    display:grid;grid-template-columns:340px 1fr;gap:72px;align-items:center}
  .bio-back{grid-column:1 / -1;display:inline-block;font-size:13px;font-weight:600;color:var(--silver-1);margin-bottom:-34px}
  .bio-back:hover{color:#fff}
  .bio-photo{position:relative}
  .bio-photo__frame{width:340px;height:424px;border-radius:18px;overflow:hidden;
    border:1px solid rgba(184,194,204,.2);box-shadow:0 30px 70px rgba(0,0,0,.45);position:relative}
  .bio-photo__frame img{width:100%;height:100%;object-fit:cover;object-position:center 10%}
  .bio-photo__mono{width:100%;height:100%;display:flex;align-items:center;justify-content:center;
    font-family:var(--serif);font-size:9rem;font-weight:500;color:rgba(255,255,255,.92);
    background:radial-gradient(120% 90% at 30% 20%,#13406d,#0a2742)}
  .bio-photo__accent{position:absolute;top:-12px;right:-12px;width:84px;height:84px;border:2px solid var(--blue);border-radius:16px;opacity:.32}
  .bio-photo__accent-2{position:absolute;bottom:-10px;left:-10px;width:60px;height:60px;border:1px solid var(--silver-1);border-radius:12px;opacity:.22}
  .bio-eyebrow{display:flex;align-items:center;gap:12px;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--silver-1);margin-bottom:18px}
  .bio-eyebrow::before{content:"";width:32px;height:1px;background:var(--silver-1)}
  .bio-name{font-family:var(--serif);font-size:clamp(40px,5vw,58px);font-weight:500;line-height:1.05;color:#fff}
  .bio-title{font-size:20px;color:var(--blue);font-weight:500;margin-top:10px}
  .bio-linkedin{display:inline-flex;align-items:center;gap:8px;margin-top:24px;padding:7px 15px;border:1px solid rgba(127,168,220,.4);border-radius:6px;color:var(--blue);font-size:13px;font-weight:600;transition:background .25s,border-color .25s;text-decoration:none}
  .bio-linkedin:hover{background:rgba(127,168,220,.12);border-color:var(--blue)}
  .bio-summary{font-size:18px;color:rgba(255,255,255,.62);line-height:1.8;margin-top:28px;max-width:560px}
  .bio-meta{display:flex;flex-wrap:wrap;gap:36px;margin-top:34px;padding-top:28px;border-top:1px solid rgba(184,194,204,.16)}
  .bio-meta__label{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:5px}
  .bio-meta__value{font-size:14px;font-weight:500;color:rgba(255,255,255,.78)}

  .section--ink-navy{position:relative;overflow:hidden;background:linear-gradient(180deg,#08233c,#0B2E4F);color:#fff}
  .xp-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;filter:saturate(.28) brightness(1.12) contrast(1.02)}
  .xp-bg__grade{position:absolute;inset:0;z-index:2;background:radial-gradient(100% 90% at 50% 32%,rgba(14,18,22,.14),rgba(14,18,22,.4))}
  .section--ink-navy>.container{position:relative;z-index:3}
  .xp-head{max-width:780px;margin:0 auto var(--sp-8)}
  .xp-head .eyebrow{color:var(--silver-1);text-shadow:0 1px 10px rgba(8,14,22,.5)}
  .xp-head h2{font-size:clamp(2rem,4vw,3rem);color:#fff;margin-top:16px;text-shadow:0 2px 18px rgba(8,14,22,.55)}
  .xp-head h2 .hl{color:var(--blue)}
  .xp-head p{margin-top:18px;font-size:1.05rem;color:rgba(255,255,255,.8);line-height:1.7;text-shadow:0 1px 12px rgba(8,14,22,.55)}
  .xp-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;max-width:980px;margin:0 auto}
  .xp-card{position:relative;overflow:hidden;padding:32px;border-radius:16px;
    background:linear-gradient(135deg,#10324f,#0c2741);border:1px solid rgba(184,194,204,.16);
    transition:transform .4s var(--ease),border-color .4s var(--ease)}
  .xp-card::before{content:"";position:absolute;top:0;left:0;width:3px;height:0;background:linear-gradient(180deg,var(--blue),#335f93);transition:height .4s var(--ease)}
  .xp-card:hover{transform:translateY(-4px);border-color:rgba(127,168,220,.42)}
  .xp-card:hover::before{height:100%}
  .xp-card__t{font-family:var(--serif);font-size:1.35rem;font-weight:600;color:var(--blue);margin-bottom:12px}
  .xp-card__d{font-size:.95rem;color:rgba(255,255,255,.55);line-height:1.7}

  .split{display:grid;grid-template-columns:1fr 1.15fr;gap:64px;align-items:start;max-width:1100px;margin:0 auto}
  .split__left .eyebrow{margin-bottom:16px}
  .split__left h2{font-size:clamp(2rem,3.6vw,2.8rem);color:var(--navy-deep);line-height:1.08}
  .split__left h2 .hl{color:var(--steel)}
  .split__left p{margin-top:18px;font-size:1rem;color:var(--ink);opacity:.78;line-height:1.7;max-width:42ch}
  .timeline{position:relative;padding-left:48px}
  .timeline::before{content:"";position:absolute;left:16px;top:4px;bottom:4px;width:1px;background:linear-gradient(180deg,var(--navy-deep),rgba(11,46,79,.08))}
  .tl-item{position:relative;margin-bottom:42px}
  .tl-item:last-child{margin-bottom:0}
  .tl-item::before{content:"";position:absolute;left:-36px;top:6px;width:11px;height:11px;border-radius:50%;background:#fff;border:2px solid var(--navy-deep)}
  .tl-item--now::before{background:var(--navy-deep);box-shadow:0 0 0 4px rgba(11,46,79,.12)}
  .tl-item__date{font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--steel);margin-bottom:6px}
  .tl-item__role{font-family:var(--serif);font-size:1.3rem;font-weight:600;color:var(--navy-deep);margin-bottom:3px}
  .tl-item__co{font-size:13px;font-weight:600;color:var(--silver-accent);margin-bottom:10px}
  .tl-item__d{font-size:.92rem;color:var(--ink);opacity:.78;line-height:1.7;max-width:480px}

  .belief{background:radial-gradient(70% 100% at 50% 0%,#0e3258,transparent 60%),linear-gradient(180deg,#08233c,#0B2E4F);color:#fff;text-align:center}
  .belief__inner{max-width:860px;margin:0 auto;padding:var(--sp-12) 32px;position:relative;text-align:center}
  .belief__mk{display:block;width:100%;text-align:center;font-family:var(--serif);font-size:clamp(4.5rem,8vw,7rem);line-height:1;color:var(--blue);opacity:.55;margin:0 auto 24px}
  .belief__quote{font-family:var(--serif);font-weight:500;font-style:italic;font-size:clamp(1.8rem,3.6vw,2.8rem);line-height:1.3;letter-spacing:-.01em;quotes:none;margin:0}
  .belief__quote em{font-style:italic;color:var(--blue);font-weight:500}
  .belief__by{margin-top:28px;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.55);font-weight:600}
  /* attribution prefix removed (no em-dash) */

  .cred-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;max-width:840px;margin:0 auto}
  .cred-card{padding:28px;background:#fff;border-radius:14px;border:1px solid var(--silver-2);transition:border-color .3s var(--ease),transform .3s var(--ease)}
  .cred-card:hover{border-color:var(--navy-deep);transform:translateY(-3px)}
  .cred-card__year{font-size:12px;font-weight:600;letter-spacing:.05em;color:var(--steel);margin-bottom:8px}
  .cred-card__t{font-family:var(--serif);font-size:1.2rem;font-weight:600;color:var(--navy-deep);margin-bottom:6px;line-height:1.2}
  .cred-card__d{font-size:.9rem;color:var(--ink);opacity:.74;line-height:1.55}

  .bio-cta{text-align:center;max-width:560px;margin:0 auto}
  .bio-cta h2{font-size:clamp(2rem,4vw,3rem);color:#fff}
  .bio-cta p{margin:16px auto 30px;color:var(--silver-2);max-width:44ch}
  .bio-cta__links{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
  .bio-cta .btn--primary{background:#fff;color:var(--navy-deep)}
  .bio-cta .btn--primary:hover{background:var(--silver-2)}

  @media(max-width:860px){
    .bio-hero__inner{grid-template-columns:1fr;gap:40px;padding:calc(88px + 48px) 24px 64px;text-align:center}
    .bio-photo{justify-self:center}
    .bio-eyebrow{justify-content:center}.bio-eyebrow::before{display:none}
    .bio-meta{justify-content:center}
    .bio-photo__accent,.bio-photo__accent-2{display:none}
    .xp-grid,.cred-grid{grid-template-columns:1fr}
    .split{grid-template-columns:1fr;gap:36px}
    .timeline{padding-left:36px}
  }
  @media(max-width:420px){ .bio-photo__frame{width:280px;height:350px} }
  @media(prefers-reduced-motion:reduce){
    .xp-bg{display:none}
    .section--ink-navy{background:#0B2E4F url("/img/expertise-flow.jpg") center/cover}
  }
</style>
</head>
<body>

<nav class="nav" id="nav">
  <div class="nav__inner">
    <a href="/" class="nav__logo" aria-label="Polaris Group"><img src="/img/logo-lockup.png" alt="Polaris Group"></a>
    <button class="nav__toggle" aria-label="Menu"><span></span><span></span><span></span></button>
    <ul class="nav__links">
      <li><a href="/chi-siamo.html" class="is-active" data-it="Chi Siamo" data-en="About">Chi Siamo</a></li>
      <li><a href="/servizi.html" data-it="Servizi" data-en="Services">Servizi</a></li>
      <li><a href="/numeri.html" data-it="Progetti" data-en="Projects">Progetti</a></li>
      <li><a href="/chi-siamo.html#team" data-it="Team" data-en="Team">Team</a></li>
      <li><a href="/casi-testimonianze.html" data-it="Casi &amp; Testimonianze" data-en="Cases">Casi &amp; Testimonianze</a></li>
      <li><a href="/lavora-con-noi.html" data-it="Lavora con noi" data-en="Careers">Lavora con noi</a></li>
      <li><a href="/contatti.html" class="nav__cta" data-it="Contattaci" data-en="Get in Touch">Contattaci</a></li>
      <li><button type="button" class="lang-switch" aria-label="Cambia lingua"><span class="lang-switch__opt on" data-lang="it">IT</span><span>/</span><span class="lang-switch__opt" data-lang="en">EN</span></button></li>
    </ul>
  </div>
</nav>

<main>

  <!-- BIO HERO -->
  <section class="bio-hero">
    <div class="bio-hero__inner">
      <a href="/chi-siamo.html#team" class="bio-back" data-it-html="&larr; Torna al team" data-en-html="&larr; Back to the team">← Torna al team</a>
      <div class="bio-photo">
        <div class="bio-photo__frame">${m.photo ? `<img src="/img/team/${m.slug}.jpg" alt="${escA(m.name)}" style="object-position:${m.photoPos || 'center 22%'}">` : `<div class="bio-photo__mono" aria-hidden="true">${m.initials}</div>`}</div>
        <div class="bio-photo__accent" aria-hidden="true"></div>
        <div class="bio-photo__accent-2" aria-hidden="true"></div>
      </div>
      <div class="bio-intro">
        <div class="bio-eyebrow" data-it="${escA(m.role.it)}" data-en="${escA(m.role.en)}">${m.role.it}</div>
        <h1 class="bio-name">${m.name}</h1>
        <p class="bio-title" data-it="${escA(m.area.it)}" data-en="${escA(m.area.en)}">${m.area.it}</p>${m.linkedin ? `
        <a href="${m.linkedin}" target="_blank" rel="noopener" class="bio-linkedin">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          <span data-it="Profilo LinkedIn" data-en="LinkedIn Profile">Profilo LinkedIn</span>
        </a>` : ''}
        <p class="bio-summary" data-it="${escA(m.summary.it)}" data-en="${escA(m.summary.en)}">${m.summary.it}</p>
        <div class="bio-meta">
          <div class="bio-meta__item">
            <span class="bio-meta__label" data-it="Sede" data-en="Based in">Sede</span>
            <span class="bio-meta__value" data-it="Crema (CR)" data-en="Crema (CR)">Crema (CR)</span>
          </div>
          <div class="bio-meta__item">
            <span class="bio-meta__label" data-it="Area" data-en="Area">Area</span>
            <span class="bio-meta__value" data-it="${escA(m.area.it)}" data-en="${escA(m.area.en)}">${m.area.it}</span>
          </div>
          <div class="bio-meta__item">
            <span class="bio-meta__label" data-it="Specialità" data-en="Specialty">Specialità</span>
            <span class="bio-meta__value" data-it="${escA(m.specialty.it)}" data-en="${escA(m.specialty.en)}">${m.specialty.it}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="section reveal">
    <div class="container text-center">
      <div class="ask">
        <h2 class="ask__title" data-it-html="Hai <em>domande?</em>" data-en-html="Have <em>questions?</em>">Hai <em>domande?</em></h2>
        <div class="ask__buttons">
          <button class="btn btn--primary" type="button" data-open-contact data-it-html="Contattaci &rarr;" data-en-html="Contact us &rarr;">Contattaci &rarr;</button>
          <a href="/chi-siamo.html#team" class="btn btn--ghost" data-it="Conosci il team" data-en="Meet the team">Conosci il team</a>
        </div>
      </div>
    </div>
  </section>

</main>

<footer class="footer">
  <div class="footer__inner">
    <div class="footer__brand">
      <img class="footer__logo" src="/img/logo-lockup.png" alt="Polaris Group">
      <p data-it="La forza della visione, al servizio delle imprese. Formazione, finanza non bancaria, advisory direzionale." data-en="The power of vision, at the service of businesses. Training, non-bank finance, strategic advisory.">La forza della visione, al servizio delle imprese. Formazione, finanza non bancaria, advisory direzionale.</p>
    </div>
    <div class="footer__col">
      <h4 data-it="Sito" data-en="Site">Sito</h4>
      <ul>
        <li><a href="/chi-siamo.html" data-it="Chi Siamo" data-en="About">Chi Siamo</a></li>
        <li><a href="/servizi.html" data-it="Servizi" data-en="Services">Servizi</a></li>
        <li><a href="/numeri.html" data-it="Progetti" data-en="Projects">Progetti</a></li>
        <li><a href="/casi-testimonianze.html" data-it="Casi &amp; Testimonianze" data-en="Cases">Casi</a></li>
        <li><a href="/lavora-con-noi.html" data-it="Lavora con noi" data-en="Careers">Lavora con noi</a></li>
      </ul>
    </div>
    <div class="footer__col">
      <h4 data-it="Contatti" data-en="Contact">Contatti</h4>
      <ul>
        <li><a href="mailto:info@polaris-group.it">info@polaris-group.it</a></li>
        <li><a href="tel:+390373250072">+39 0373 250072</a></li>
        <li><a data-it="Via del Commercio 29, 26013 Crema (CR)" data-en="Via del Commercio 29, 26013 Crema (CR)">Via del Commercio 29, 26013 Crema (CR)</a></li>
      </ul>
    </div>
    <div class="footer__col">
      <h4 data-it="Gruppo" data-en="Group">Gruppo</h4>
      <ul>
        <li><a>Polaris HR srl</a></li>
        <li><a>Hazard srl</a></li>
        <li><a href="https://runcapital.partners" target="_blank" rel="noopener">Run Capital Partners ↗</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__legal">
    <span data-it="© 2026 Polaris Group · P.IVA 01616620199 · Tutti i diritti riservati" data-en="© 2026 Polaris Group · VAT 01616620199 · All rights reserved">© 2026 Polaris Group · P.IVA 01616620199 · Tutti i diritti riservati</span>
    <span><a href="/privacy.html" data-it="Privacy" data-en="Privacy">Privacy</a> &nbsp;·&nbsp; <a href="/cookie.html" data-it="Cookie" data-en="Cookie">Cookie</a></span>
  </div>
</footer>

<script src="/assets/site.js"></script>
</body>
</html>
`;
};

members.forEach(m => { const f = join(teamDir, `${m.slug}.html`); writeFileSync(f, page(m)); console.log('wrote', f); });
