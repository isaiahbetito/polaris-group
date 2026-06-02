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
};

/* shared Polaris belief (company method, not a personal quote) */
const BELIEF = {
  eyebrow:{it:'— Il metodo',en:'— The method'},
  quote:{it:'La crescita passa prima dalle <em>persone</em> e dalla <em>cultura</em>, poi dalla tecnica.',en:'Growth comes first from <em>people</em> and <em>culture</em>, then from technique.'},
  by:'Polaris Group',
};

const members = [
  { slug:'cristina', initials:'C', name:'Cristina', xptype:'formazione',
    role:{it:'Coordinamento Formazione',en:'Training Coordinator'}, area:{it:'Formazione',en:'Training'},
    specialty:{it:'Fondi interprofessionali, accreditamenti',en:'Interprofessional funds, accreditation'},
    summary:{it:'Coordina i percorsi di formazione obbligatoria e finanziata, dall’analisi del fabbisogno aziendale alla gestione dei fondi interprofessionali e degli accreditamenti.',en:'Coordinates mandatory and funded training, from analysing the company’s needs to managing interprofessional funds and accreditation.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Coordinamento dei percorsi formativi e dei rapporti con i fondi interprofessionali.',en:'Coordinating training programmes and relations with the interprofessional funds.'} },
  { slug:'alessio', initials:'A', name:'Alessio', xptype:'advisory',
    role:{it:'Advisory',en:'Advisory'}, area:{it:'Advisory direzionale',en:'Strategic advisory'},
    specialty:{it:'Governance familiare, operazioni straordinarie',en:'Family governance, extraordinary operations'},
    summary:{it:'Segue i mandati di advisory direzionale — riassetti, passaggi generazionali e operazioni straordinarie — accanto alla proprietà fino alla decisione.',en:'Follows strategic advisory mandates — restructuring, generational handovers and extraordinary operations — beside ownership up to the decision.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Advisory direzionale accanto alla proprietà nelle scelte strategiche.',en:'Strategic advisory beside ownership in the choices that matter.'} },
  { slug:'gianmaria', initials:'G', name:'Gianmaria', xptype:'invoice',
    role:{it:'Invoice Trading',en:'Invoice Trading'}, area:{it:'Invoice trading · Hazard srl',en:'Invoice trading · Hazard srl'},
    specialty:{it:'Piattaforme regolamentate, profilazione debitori',en:'Regulated platforms, debtor profiling'},
    summary:{it:'Cura le operazioni di finanza non bancaria e invoice trading attraverso Hazard srl, società del Gruppo, su piattaforme regolamentate.',en:'Runs non-bank finance and invoice-trading operations through Hazard srl, a Group company, on regulated platforms.'},
    company:{it:'Hazard srl · Gruppo Polaris',en:'Hazard srl · Polaris Group'},
    focus:{it:'Invoice trading e finanza non bancaria via Hazard srl.',en:'Invoice trading and non-bank finance via Hazard srl.'} },
  { slug:'mara', initials:'M', name:'Mara', xptype:'sumisura',
    role:{it:'Formazione su misura',en:'Tailor-made Training'}, area:{it:'Formazione su misura',en:'Tailor-made training'},
    specialty:{it:'Team building, leadership, change management',en:'Team building, leadership, change management'},
    summary:{it:'Progetta percorsi di formazione su misura — leadership, team building e change management — costruiti sul bisogno specifico di ogni impresa.',en:'Designs tailor-made training — leadership, team building and change management — built around each company’s specific need.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Progettazione e regia della formazione su misura.',en:'Designing and directing tailor-made training.'} },
  { slug:'paola', initials:'P', name:'Paola', xptype:'operations',
    role:{it:'Operations',en:'Operations'}, area:{it:'Amministrazione & Operations',en:'Administration & Operations'},
    specialty:{it:'Coordinamento operativo, primo contatto clienti',en:'Operational coordination, first client contact'},
    summary:{it:'Tiene insieme l’operatività quotidiana del Gruppo ed è spesso la prima voce che il cliente sente quando chiama Polaris.',en:'Holds the Group’s daily operations together and is often the first voice clients hear when they call Polaris.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Coordinamento operativo e primo contatto con i clienti.',en:'Operational coordination and first client contact.'} },
  { slug:'andrea', initials:'A', name:'Andrea', xptype:'formazione',
    role:{it:'Coordinamento Formazione',en:'Training Coordinator'}, area:{it:'Formazione',en:'Training'},
    specialty:{it:'Corsi tecnici, settori specifici',en:'Technical courses, specific sectors'},
    summary:{it:'Affianca il team formazione sui corsi tecnici e i settori specifici, coordinando i docenti e i percorsi finanziati.',en:'Supports the training team on technical courses and specific sectors, coordinating instructors and funded programmes.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Corsi tecnici, settori specifici e coordinamento docenti.',en:'Technical courses, specific sectors and instructor coordination.'} },
  { slug:'giovanni', initials:'G', name:'Giovanni', xptype:'advisory',
    role:{it:'Advisory',en:'Advisory'}, area:{it:'Advisory direzionale',en:'Strategic advisory'},
    specialty:{it:'Due diligence finanziaria, supporto a operazioni M&A',en:'Financial due diligence, M&A support'},
    summary:{it:'Segue i progetti di advisory accanto al team, dalla due diligence finanziaria al supporto nelle operazioni straordinarie.',en:'Works on advisory projects alongside the team, from financial due diligence to support on extraordinary operations.'},
    company:{it:'Polaris Group',en:'Polaris Group'},
    focus:{it:'Advisory e due diligence a supporto delle operazioni.',en:'Advisory and due diligence supporting operations.'} },
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
<title>${m.name} — ${m.role.it} | Polaris Group</title>
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
  .belief__inner{max-width:860px;margin:0 auto;padding:var(--sp-12) 32px}
  .belief__eyebrow{font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--blue);font-weight:600;margin-bottom:24px}
  .belief__quote{font-family:var(--serif);font-weight:500;font-size:clamp(1.8rem,3.6vw,2.8rem);line-height:1.25;letter-spacing:-.01em}
  .belief__quote em{font-style:italic;color:var(--blue)}
  .belief__by{margin-top:22px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.5)}

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
        <div class="bio-photo__frame"><div class="bio-photo__mono" aria-hidden="true">${m.initials}</div></div>
        <div class="bio-photo__accent" aria-hidden="true"></div>
        <div class="bio-photo__accent-2" aria-hidden="true"></div>
      </div>
      <div class="bio-intro">
        <div class="bio-eyebrow" data-it="${escA(m.role.it)}" data-en="${escA(m.role.en)}">${m.role.it}</div>
        <h1 class="bio-name">${m.name}</h1>
        <p class="bio-title" data-it="${escA(m.area.it)}" data-en="${escA(m.area.en)}">${m.area.it}</p>
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

  <!-- EXPERTISE -->
  <section class="section section--ink-navy reveal">
    <video class="xp-bg" autoplay muted loop playsinline preload="auto" poster="/img/expertise-flow.jpg" aria-hidden="true">
      <source src="/img/expertise-flow.mp4" type="video/mp4">
    </video>
    <div class="xp-bg__grade" aria-hidden="true"></div>
    <div class="container">
      <div class="xp-head text-center">
        <span class="eyebrow eyebrow--center" data-it="Competenze" data-en="Expertise">Competenze</span>
        <h2 data-it-html="${escH(head.h.it)}" data-en-html="${escH(head.h.en)}">${head.h.it}</h2>
        <p data-it="${escA(head.intro.it)}" data-en="${escA(head.intro.en)}">${head.intro.it}</p>
      </div>
      <div class="xp-grid">
${xpCards(m)}
      </div>
    </div>
  </section>

  <!-- TIMELINE -->
  <section class="section reveal">
    <div class="container">
      <div class="split">
        <div class="split__left">
          <span class="eyebrow" data-it="Percorso" data-en="Path">Percorso</span>
          <h2 data-it-html="In <span class='hl'>Polaris</span>." data-en-html="At <span class='hl'>Polaris</span>.">In <span class="hl">Polaris</span>.</h2>
          <p data-it="Il ruolo di ${escA(m.name)} nel Gruppo e il percorso che lo accompagna." data-en="${escA(m.name)}'s role in the Group and the path behind it.">Il ruolo di ${m.name} nel Gruppo e il percorso che lo accompagna.</p>
        </div>
        <div class="split__right">
          <div class="timeline">
            <div class="tl-item tl-item--now">
              <p class="tl-item__date" data-it="Oggi" data-en="Present">Oggi</p>
              <h3 class="tl-item__role" data-it="${escA(m.role.it)}" data-en="${escA(m.role.en)}">${m.role.it}</h3>
              <p class="tl-item__co" data-it="${escA(m.company.it)}" data-en="${escA(m.company.en)}">${m.company.it}</p>
              <p class="tl-item__d" data-it="${escA(m.focus.it)}" data-en="${escA(m.focus.en)}">${m.focus.it}</p>
            </div>
            <div class="tl-item">
              <p class="tl-item__date" data-it="Prima" data-en="Before">Prima</p>
              <h3 class="tl-item__role" data-it="Esperienza precedente" data-en="Prior experience">Esperienza precedente</h3>
              <p class="tl-item__co">—</p>
              <p class="tl-item__d" data-it="[In arrivo — formazione ed esperienze precedenti di ${escA(m.name)}, dall’intervista con il team.]" data-en="[Coming soon — ${escA(m.name)}'s prior education and experience, from the team interview.]">[In arrivo — formazione ed esperienze precedenti di ${m.name}, dall’intervista con il team.]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BELIEF -->
  <section class="belief reveal">
    <div class="belief__inner">
      <p class="belief__eyebrow" data-it="${escA(BELIEF.eyebrow.it)}" data-en="${escA(BELIEF.eyebrow.en)}">${BELIEF.eyebrow.it}</p>
      <h2 class="belief__quote" data-it-html="${escH(BELIEF.quote.it)}" data-en-html="${escH(BELIEF.quote.en)}">${BELIEF.quote.it}</h2>
      <p class="belief__by">${BELIEF.by}</p>
    </div>
  </section>

  <!-- FORMAZIONE / CREDENZIALI -->
  <section class="section section--cream reveal">
    <div class="container">
      <div class="section__head">
        <span class="eyebrow eyebrow--center" data-it="Credenziali" data-en="Credentials">Credenziali</span>
        <h2 data-it="Formazione &amp; percorso." data-en="Education &amp; background.">Formazione &amp; percorso.</h2>
      </div>
      <div class="cred-grid">
        <div class="cred-card">
          <p class="cred-card__year" data-it="In arrivo" data-en="Coming soon">In arrivo</p>
          <h3 class="cred-card__t" data-it="Formazione" data-en="Education">Formazione</h3>
          <p class="cred-card__d" data-it="[In arrivo — titoli di studio e formazione di ${escA(m.name)}.]" data-en="[Coming soon — ${escA(m.name)}'s degrees and education.]">[In arrivo — titoli di studio e formazione di ${m.name}.]</p>
        </div>
        <div class="cred-card">
          <p class="cred-card__year" data-it="In arrivo" data-en="Coming soon">In arrivo</p>
          <h3 class="cred-card__t" data-it="Certificazioni" data-en="Certifications">Certificazioni</h3>
          <p class="cred-card__d" data-it="[In arrivo — certificazioni e abilitazioni rilevanti.]" data-en="[Coming soon — relevant certifications and qualifications.]">[In arrivo — certificazioni e abilitazioni rilevanti.]</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="section reveal">
    <div class="container container--narrow text-center">
      <div class="git">
        <div class="git__eyebrow" data-it="Parliamone" data-en="Get in touch">Parliamone</div>
        <h2 class="git__title" data-it-html="Lavoriamo <em>insieme</em>?" data-en-html="Shall we <em>work together</em>?">Lavoriamo <em>insieme</em>?</h2>
        <p class="git__sub" data-it="Scrivici una mail all'indirizzo qui sotto e ci faremo sentire." data-en="Send us a message at the address below and we'll be in touch.">Scrivici una mail all'indirizzo qui sotto e ci faremo sentire.</p>
        <div class="git__box">
          <span class="git__email">info@polaris-group.it</span>
          <button class="git__copy" type="button" data-copy="info@polaris-group.it">COPY</button>
        </div>
        <a class="git__cta" href="mailto:info@polaris-group.it" data-it-html="Apri nella tua mail &rarr;" data-en-html="Open in email app &rarr;">Open in email app →</a>
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
