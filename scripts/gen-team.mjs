/**
 * Generates the 7 non-founder team member pages from `members` data.
 * Usage: node scripts/gen-team.mjs
 * Run after editing the data below; each run overwrites the HTML files.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const teamDir = join(__dirname, '..', 'team');
mkdirSync(teamDir, { recursive: true });

const members = [
  {
    slug: 'cristina',
    initials: 'C',
    name: 'Cristina',
    role: { it: 'Coordinamento Formazione', en: 'Training Coordinator' },
    area: { it: 'Formazione', en: 'Training' },
    bio: {
      it: [
        '[PLACEHOLDER — paragrafo 1: chi è Cristina professionalmente. Da dove arriva, da quanti anni è in Polaris, cosa segue. Es: "Cristina coordina i percorsi di formazione obbligatoria. Gestisce il calendario, i rapporti con i docenti, la rendicontazione verso i fondi interprofessionali e la Regione."]',
        '[PLACEHOLDER — paragrafo 2: cosa la distingue. Una specificità del suo lavoro, un cliente che la cita, un mestiere imparato in anni di pratica.]',
      ],
      en: [
        '[PLACEHOLDER — paragraph 1: who Cristina is professionally. Where she comes from, how many years at Polaris, what she handles.]',
        '[PLACEHOLDER — paragraph 2: what sets her apart. A specific skill, a client who praises her, a craft learned through years of practice.]',
      ],
    },
    facts: [
      { it: ['Ruolo', 'Coordinamento programmi di formazione obbligatoria e su misura'], en: ['Role', 'Coordination of mandatory and tailor-made training programs'] },
      { it: ['Area', 'Formazione'], en: ['Area', 'Training'] },
      { it: ['Specialità', '[PLACEHOLDER — es: gestione fondi interprofessionali, accreditamento Regione Lombardia]'], en: ['Specialty', '[PLACEHOLDER — e.g. interprofessional fund management, Lombardy Region accreditation]'] },
      { it: ['In Polaris dal', '[PLACEHOLDER — anno]'], en: ['At Polaris since', '[PLACEHOLDER — year]'] },
    ],
  },
  {
    slug: 'alessio',
    initials: 'A',
    name: 'Alessio',
    role: { it: 'Advisory', en: 'Advisory' },
    area: { it: 'Advisory', en: 'Advisory' },
    bio: {
      it: [
        '[PLACEHOLDER — paragrafo 1: chi è Alessio. Es: "Alessio segue i mandati di advisory direzionale. Lavora con le proprietà su organizzazione, riassetti, gestione finanziaria. Viene da [esperienza precedente]."]',
        '[PLACEHOLDER — paragrafo 2: come lavora. Qualcosa di concreto su un caso, una rete, un metodo.]',
      ],
      en: [
        '[PLACEHOLDER — paragraph 1: who Alessio is. Background, what he does at Polaris.]',
        '[PLACEHOLDER — paragraph 2: how he works. Something concrete on a case, a network, a method.]',
      ],
    },
    facts: [
      { it: ['Ruolo', 'Advisor — riassetti, passaggi generazionali, gestione finanziaria'], en: ['Role', 'Advisor — restructuring, generational transitions, financial management'] },
      { it: ['Area', 'Advisory direzionale'], en: ['Area', 'Strategic advisory'] },
      { it: ['Specialità', '[PLACEHOLDER — es: governance familiare, preparazione operazioni M&A]'], en: ['Specialty', '[PLACEHOLDER — e.g. family governance, M&A preparation]'] },
      { it: ['In Polaris dal', '[PLACEHOLDER — anno]'], en: ['At Polaris since', '[PLACEHOLDER — year]'] },
    ],
  },
  {
    slug: 'gianmaria',
    initials: 'G',
    name: 'Gianmaria',
    role: { it: 'Invoice Trading', en: 'Invoice Trading' },
    area: { it: 'Invoice Trading', en: 'Invoice Trading' },
    bio: {
      it: [
        '[PLACEHOLDER — paragrafo 1: Gianmaria segue le operazioni di invoice trading. Da chi viene, che esperienza ha sui mercati finanziari non bancari.]',
        '[PLACEHOLDER — paragrafo 2: come affianca le aziende, che piattaforme conosce meglio, quanto volume gestisce in un anno.]',
      ],
      en: [
        '[PLACEHOLDER — paragraph 1: Gianmaria handles invoice trading operations.]',
        '[PLACEHOLDER — paragraph 2: how he supports companies, which platforms he knows best, annual volume managed.]',
      ],
    },
    facts: [
      { it: ['Ruolo', 'Responsabile invoice trading'], en: ['Role', 'Invoice trading lead'] },
      { it: ['Area', 'Hazard srl'], en: ['Area', 'Hazard srl'] },
      { it: ['Specialità', '[PLACEHOLDER — es: selezione piattaforme regolamentate, profilazione debitori]'], en: ['Specialty', '[PLACEHOLDER — e.g. regulated platform selection, debtor profiling]'] },
      { it: ['In Polaris dal', '[PLACEHOLDER — anno]'], en: ['At Polaris since', '[PLACEHOLDER — year]'] },
    ],
  },
  {
    slug: 'mara',
    initials: 'M',
    name: 'Mara',
    role: { it: 'Formazione su Misura', en: 'Tailor-made Training' },
    area: { it: 'Formazione', en: 'Training' },
    bio: {
      it: [
        '[PLACEHOLDER — paragrafo 1: Mara progetta i percorsi di formazione su misura. Background formativo, anni di esperienza in aula e in azienda.]',
        '[PLACEHOLDER — paragrafo 2: come costruisce un programma, una metodologia che la distingue, una citazione di un cliente.]',
      ],
      en: [
        '[PLACEHOLDER — paragraph 1: Mara designs tailor-made training programs.]',
        '[PLACEHOLDER — paragraph 2: how she builds a program, a distinctive methodology.]',
      ],
    },
    facts: [
      { it: ['Ruolo', 'Progettazione percorsi formativi su misura'], en: ['Role', 'Tailor-made training design'] },
      { it: ['Area', 'Formazione'], en: ['Area', 'Training'] },
      { it: ['Specialità', '[PLACEHOLDER — es: team building esperienziale, change management, sviluppo leadership]'], en: ['Specialty', '[PLACEHOLDER — e.g. experiential team building, change management, leadership development]'] },
      { it: ['In Polaris dal', '[PLACEHOLDER — anno]'], en: ['At Polaris since', '[PLACEHOLDER — year]'] },
    ],
  },
  {
    slug: 'paola',
    initials: 'P',
    name: 'Paola',
    role: { it: 'Amministrazione & Operations', en: 'Operations' },
    area: { it: 'Operations', en: 'Operations' },
    bio: {
      it: [
        '[PLACEHOLDER — paragrafo 1: Paola tiene insieme l&rsquo;operatività quotidiana. È la persona che il cliente sente quando chiama Polaris. Da quanti anni è in azienda, cosa segue.]',
        '[PLACEHOLDER — paragrafo 2: la sua capacità di tenere insieme dieci cose contemporaneamente, una nota concreta su come lavora.]',
      ],
      en: [
        '[PLACEHOLDER — paragraph 1: Paola holds daily operations together. The voice clients hear when they call Polaris.]',
        '[PLACEHOLDER — paragraph 2: her ability to juggle ten things at once.]',
      ],
    },
    facts: [
      { it: ['Ruolo', 'Amministrazione, coordinamento operativo, primo contatto clienti'], en: ['Role', 'Administration, operational coordination, first client contact'] },
      { it: ['Area', 'Operations'], en: ['Area', 'Operations'] },
      { it: ['Specialità', '[PLACEHOLDER — es: organizzazione interna, gestione fornitori, primo screening richieste]'], en: ['Specialty', '[PLACEHOLDER — e.g. internal organization, vendor management, request screening]'] },
      { it: ['In Polaris dal', '[PLACEHOLDER — anno]'], en: ['At Polaris since', '[PLACEHOLDER — year]'] },
    ],
  },
  {
    slug: 'andrea',
    initials: 'A',
    name: 'Andrea',
    role: { it: 'Coordinamento Formazione', en: 'Training Coordinator' },
    area: { it: 'Formazione', en: 'Training' },
    bio: {
      it: [
        '[PLACEHOLDER — paragrafo 1: Andrea affianca Cristina sui programmi formativi. Da dove viene, che corsi segue tipicamente.]',
        '[PLACEHOLDER — paragrafo 2: una specificità del suo ruolo, una rete di docenti, un tipo di cliente che gestisce particolarmente bene.]',
      ],
      en: [
        '[PLACEHOLDER — paragraph 1: Andrea supports Cristina on training programs.]',
        '[PLACEHOLDER — paragraph 2: a specific aspect of his role, instructor network, client type he handles well.]',
      ],
    },
    facts: [
      { it: ['Ruolo', 'Coordinamento programmi di formazione'], en: ['Role', 'Training program coordination'] },
      { it: ['Area', 'Formazione'], en: ['Area', 'Training'] },
      { it: ['Specialità', '[PLACEHOLDER — es: corsi tecnici, settori specifici come edilizia o manifatturiero]'], en: ['Specialty', '[PLACEHOLDER — e.g. technical courses, specific sectors like construction or manufacturing]'] },
      { it: ['In Polaris dal', '[PLACEHOLDER — anno]'], en: ['At Polaris since', '[PLACEHOLDER — year]'] },
    ],
  },
  {
    slug: 'giovanni',
    initials: 'G',
    name: 'Giovanni',
    role: { it: 'Advisory', en: 'Advisory' },
    area: { it: 'Advisory', en: 'Advisory' },
    bio: {
      it: [
        '[PLACEHOLDER — paragrafo 1: Giovanni segue progetti di advisory accanto a Cesare e Alessio. Background, percorso.]',
        '[PLACEHOLDER — paragrafo 2: in cosa è particolarmente forte, una nota su un caso recente.]',
      ],
      en: [
        '[PLACEHOLDER — paragraph 1: Giovanni works on advisory projects alongside Cesare and Alessio.]',
        '[PLACEHOLDER — paragraph 2: his particular strengths, note on a recent case.]',
      ],
    },
    facts: [
      { it: ['Ruolo', 'Advisor — analisi finanziaria e operazioni straordinarie'], en: ['Role', 'Advisor — financial analysis and extraordinary operations'] },
      { it: ['Area', 'Advisory direzionale'], en: ['Area', 'Strategic advisory'] },
      { it: ['Specialità', '[PLACEHOLDER — es: due diligence finanziaria, modellizzazione, supporto a operazioni M&A]'], en: ['Specialty', '[PLACEHOLDER — e.g. financial due diligence, modeling, M&A support]'] },
      { it: ['In Polaris dal', '[PLACEHOLDER — anno]'], en: ['At Polaris since', '[PLACEHOLDER — year]'] },
    ],
  },
];

const escape = (s) => s.replace(/"/g, '&quot;');

const factsHtml = (member) => member.facts.map((f) => `
            <dt data-it="${escape(f.it[0])}" data-en="${escape(f.en[0])}">${f.it[0]}</dt>
            <dd data-it="${escape(f.it[1])}" data-en="${escape(f.en[1])}">${f.it[1]}</dd>`).join('');

const bioHtml = (member) => member.bio.it.map((p, i) => `
            <p data-it="${escape(p)}" data-en="${escape(member.bio.en[i])}">${p}</p>`).join('');

const pageHtml = (m) => `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title data-it="${m.name} — ${m.role.it} | Polaris Group" data-en="${m.name} — ${m.role.en} | Polaris Group">${m.name} — ${m.role.it} | Polaris Group</title>
  <meta name="description" data-it-content="${m.name}, ${m.role.it} di Polaris Group.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css">
</head>
<body>

  <a href="#main" class="skip-link" data-it="Vai al contenuto" data-en="Skip to content">Vai al contenuto</a>

  <nav class="nav" id="nav">
    <div class="nav__inner">
      <a href="/" class="nav__logo" aria-label="Polaris Group">
        <svg class="nav__logo-mark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1L13.5 9L21 10.5L13.5 12L12 20L10.5 12L3 10.5L10.5 9L12 1Z" fill="#6B7B8C"/>
          <circle cx="12" cy="10.5" r="1" fill="#0B2E4F"/>
        </svg>
        <span>Polaris Group</span>
      </a>
      <button class="nav__toggle" id="navToggle" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav__links" id="navLinks">
        <li><a href="/chi-siamo.html" class="is-current" data-it="Chi Siamo" data-en="About">Chi Siamo</a></li>
        <li><a href="/servizi.html" data-it="Servizi" data-en="Services">Servizi</a></li>
        <li><a href="/casi-testimonianze.html" data-it="Casi & Testimonianze" data-en="Cases & Testimonials">Casi & Testimonianze</a></li>
        <li><a href="/lavora-con-noi.html" data-it="Lavora con noi" data-en="Careers">Lavora con noi</a></li>
        <li><a href="/contatti.html" class="nav__cta" data-it="Contattaci" data-en="Get in Touch">Contattaci</a></li>
        <li>
          <button type="button" class="lang-switch" aria-label="Cambia lingua">
            <span class="lang-switch__opt" data-lang="it">IT</span>
            <span class="lang-switch__sep">/</span>
            <span class="lang-switch__opt" data-lang="en">EN</span>
          </button>
        </li>
      </ul>
    </div>
  </nav>

  <main id="main" class="member">

    <div class="container">
      <a href="/chi-siamo.html" class="member__back" data-it="Torna al team" data-en="Back to the team">Torna al team</a>
    </div>

    <section class="container" style="padding-top: var(--space-4);">
      <div class="member__inner reveal">
        <div class="member__photo" aria-hidden="true">${m.initials}</div>
        <div>
          <span class="eyebrow" data-it="${m.area.it}" data-en="${m.area.en}">${m.area.it}</span>
          <h1 class="member__name">${m.name}</h1>
          <p class="member__role" data-it="${m.role.it}" data-en="${m.role.en}">${m.role.it}</p>
          <div class="member__bio">${bioHtml(m)}
          </div>
          <div class="member__facts">
            <span class="eyebrow" data-it="In sintesi" data-en="At a glance">In sintesi</span>
            <dl style="margin-top: var(--space-2);">${factsHtml(m)}
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container container--narrow text-center">
        <div class="reveal">
          <h2 style="margin-bottom: var(--space-3);" data-it="Vuoi lavorare con ${m.name}?" data-en="Want to work with ${m.name}?">Vuoi lavorare con ${m.name}?</h2>
          <p class="lead" style="margin-bottom: var(--space-4);" data-it="Scrivici a info@polaris-group.it indicando &ldquo;${m.area.it}&rdquo; nell&rsquo;oggetto. Ti rimettiamo in contatto entro 24 ore lavorative." data-en="Email info@polaris-group.it with &ldquo;${m.area.en}&rdquo; in the subject. We'll put you in touch within 24 working hours.">Scrivici a info@polaris-group.it indicando "${m.area.it}" nell'oggetto. Ti rimettiamo in contatto entro 24 ore lavorative.</p>
          <a href="/contatti.html" class="btn btn--primary" data-it="Contattaci" data-en="Contact us">Contattaci</a>
        </div>
      </div>
    </section>

  </main>

  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <h3>Polaris Group</h3>
        <p data-it="La stella polare per chi guida un'impresa. Formazione, finanza non bancaria, advisory direzionale." data-en="The North Star for those who run a business. Training, non-bank finance, strategic advisory.">La stella polare per chi guida un'impresa. Formazione, finanza non bancaria, advisory direzionale.</p>
      </div>
      <div class="footer__col">
        <h4 data-it="Sito" data-en="Site">Sito</h4>
        <ul>
          <li><a href="/chi-siamo.html" data-it="Chi Siamo" data-en="About">Chi Siamo</a></li>
          <li><a href="/servizi.html" data-it="Servizi" data-en="Services">Servizi</a></li>
          <li><a href="/casi-testimonianze.html" data-it="Casi & Testimonianze" data-en="Cases">Casi</a></li>
          <li><a href="/lavora-con-noi.html" data-it="Lavora con noi" data-en="Careers">Lavora con noi</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4 data-it="Contatti" data-en="Contact">Contatti</h4>
        <ul>
          <li><a href="mailto:info@polaris-group.it">info@polaris-group.it</a></li>
          <li><a data-it="Crema, Lombardia" data-en="Crema, Lombardy">Crema, Lombardia</a></li>
          <li><a href="/contatti.html" data-it="Tutti i contatti" data-en="All contact info">Tutti i contatti</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4 data-it="Gruppo" data-en="Group">Gruppo</h4>
        <ul>
          <li><a data-it="Polaris HR srl" data-en="Polaris HR srl">Polaris HR srl</a></li>
          <li><a data-it="Hazard srl" data-en="Hazard srl">Hazard srl</a></li>
          <li><a href="https://runcapital.partners" target="_blank" rel="noopener" data-it="Run Capital Partners ↗" data-en="Run Capital Partners ↗">Run Capital Partners ↗</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__legal">
      <span data-it="© 2026 Polaris Group · P.IVA 01616620199 · Tutti i diritti riservati" data-en="© 2026 Polaris Group · VAT 01616620199 · All rights reserved">© 2026 Polaris Group · P.IVA 01616620199 · Tutti i diritti riservati</span>
      <span>
        <a href="/privacy.html" data-it="Privacy" data-en="Privacy">Privacy</a> &nbsp;·&nbsp;
        <a href="/cookie.html" data-it="Cookie" data-en="Cookie">Cookie</a>
      </span>
    </div>
  </footer>

  <script src="../scripts/main.js"></script>
</body>
</html>
`;

members.forEach((m) => {
  const file = join(teamDir, `${m.slug}.html`);
  writeFileSync(file, pageHtml(m));
  console.log(`wrote ${file}`);
});
