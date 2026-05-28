# Polaris Group — Brief for Ice

Lisa → Ice, 2026-05-28.

**Important:** the code currently in this repo is a v0 Lisa built to validate direction with the client. **The visual direction wasn't right.** Ice rebuilds from scratch. Treat the existing code as **reference only** — don't continue from it.

This doc tells you what to build, the constraints, and the mistakes not to repeat.

---

## Client

- **Cesare Fontana**, founder of Polaris Group. Based in **Crema, Lombardy**.
- Warm referral via Luca (Run Capital co-founder) — Cesare specifically said he likes the RCP redesign and wants the "same treatment".
- **Sole decision-maker**, no committee.
- Contact via WhatsApp or email (Lisa handles the client relationship).
- Great client but particular about visual taste. Iterate fast, screenshot often, don't overbuild before alignment.

**Discovery call:** 2026-05-20. Lisa has the full transcript if you need raw quotes.
**Launch target:** September 2026 — coordinated with site + LinkedIn + new training-season opportunities.

---

## What we promised the client

**Proposal accepted by Cesare:**
- Brand refresh — keep name "Polaris Group" + keep colors (white, silver, blue)
- Bilingual 6-page site IT/EN + founder page for Cesare + 7 team pages
- LinkedIn (Cesare personal rebuild + Polaris company page)
- Ongoing weekly social retainer (Phase 2)
- Launch by September 2026
- **€3,500 brand + site (one-off)** + **€1,000 LinkedIn setup** + **€1,000/month ongoing social**

**Pages (Cesare's stated structure):**
1. **Home** — who Polaris is, the services, proof, clear contact CTA
2. **Chi Siamo** — Cesare's story, the team (one card per person)
3. **Servizi** — Formazione (obbligatoria + su misura), Invoice trading, RCP + 3Dots partner callout
4. **Casi e Testimonianze** — case studies + testimonials
5. **Lavora con noi** — simple application invite
6. **Contatti** — email, phone, sede

**Team to feature:** Cesare + Cristina, Alessio, Gianmaria, Mara, Paola, Andrea, Giovanni (8 people total).

---

## Brand constraints — non-negotiable (per Cesare)

1. **Logo locked.** Navy compass mark + "POLARIS" navy + "GROUP" silver + tagline "human resources | credit and finance". Brand file in `img/logo-mark.svg` (and `img/logo-full.svg` if you want the full lockup).
2. **Palette: white + silver + blue only.** No gold, no warm tones. Cesare was explicit on the call (also during iteration when Lisa tried adding gold-warm as an accent — got rejected). Silver/blue/cream only.
3. **Tone: serious but warm**, like RCP. Cesare's verbatim: "serio al punto giusto, però anche caldo." Not flashy. Not AI. Not corporate-stiff.
4. **Italian-first**, English second. Italian audience is the primary one.

---

## Content rules — also non-negotiable

1. **Run Capital honesty.** Cesare has **ZERO RCP clients**. Never imply Polaris does wealth management. Quoting Cesare from the call: *"io non ho clienti su Rank Capital. Zero. Infatti avete messo una descrizione che è sulle mie competenze che mi ha agitato perché ho detto minchia ma io quella roba lì non l'ho mai fatta."* If RCP appears on the site, it's a clearly-labeled partner card. RCP eroga; Polaris cura la presentazione.
2. **Hazard srl** is the legal entity for invoice trading. Cesare is fine surfacing it publicly. Reference it on the invoice trading service + footer.
3. **Polaris Credito was sold.** Never reference it. Remove any link to polaris-credito.it.
4. **Three Dots / Nasdaq** — light callout only. Cesare's verbatim: *"non dobbiamo enfatizzarlo. può anche essere una scelta quella di dire 'lo fa Ran, vanno a vederlo su Ran e lo trovano lì'."*
5. **No emojis anywhere** — UI, copy, emails. SVG / typography / color only.
6. **No personal names in body copy** (except Cesare's founder page). No "Lisa or Davide" patterns.
7. **Not an AI product.** Never use AI vocabulary or position Polaris as an AI thing.

---

## Audience

Three reads, equally important:

1. **PMI italiane** — direct clients (training, financing, advisory)
2. **Commercialisti** — both clients AND referral channel
3. **Consulenti del lavoro** — both clients AND referral channel

Design + copy need to land for all three at once. The latter two are key — Cesare's growth comes from referrals.

---

## What Polaris actually does

### 1. Formazione (Training)
- **Obbligatoria** — mandatory courses: primo soccorso, sicurezza sul lavoro (D.Lgs. 81/08), antincendio, RSPP, RLS, HACCP, formazione preposti/dirigenti
- **Su misura** — tailor-made programs: team building, leadership, sviluppo manageriale, change management
- Funded via interprofessional funds: **Fondimpresa, Fonarcom, Formazienda, Fondolavoro, Fondo Nuove Competenze (FNC)** — name them, both competitors lead with this and SMEs/commercialisti recognize these acronyms
- Polaris manages end-to-end: needs analysis, scheduling, instructors, registers, certificates, regional reporting

### 2. Invoice Trading
- Cessione fatture to qualified investors on regulated Italian platforms
- Benefits: fast liquidity, no Centrale Rischi impact, no castelletti consumati
- Erogated by **Hazard srl** (legal entity, fine to mention)

### 3. Advisory direzionale
- Riassetti organizzativi
- Passaggi generazionali, governance familiare
- Gestione finanziaria + efficientamento
- Preparazione a operazioni straordinarie (M&A, ingresso soci)
- Coordinamento tavoli con commercialisti, banche, advisor

### Partner callout
- **Run Capital Partners** (Luxembourg) — alternative investments, securitization, wealth management (RCP delivers; Polaris introduces)
- **Three Dots** — Nasdaq listing advisory for Southern European companies

---

## Competitors (browse these to understand the category)

1. **https://gruppomagistra.it/** — bright, busy, mass-market. Heavy on fondi interprofessionali. Strong Regione Campania focus. Cluttered icon-card grids.
2. **https://www.rts-srl.it** — corporate-clean blue/teal, stock-photo-heavy. ISO 9001:2015 certified front and center. Catalog of pre-built courses by area. Targets Consulenti del Lavoro explicitly. Toll-free 800 010 333 prominent.
3. **https://runcapital.partners** — Cesare's reference. RCP redesign Lisa built (gold + dark, editorial premium). Polaris's silver/blue version aims for the same boutique premium feel.

Both Italian competitors are mid-market and visually cluttered. Polaris's positioning is premium-boutique. The differentiation lives in restraint + craft, not in feature count.

---

## What's in this repo (reference only)

```
HANDOVER.md                         # this file
DESIGN.md                           # Lisa's v0 design notes — keep, ignore, or remix
README.md                           # file map
Polaris-checklist-Cesare.docx       # Italian content checklist Lisa is sending Cesare
img/
  logo-mark.svg                     # USE — the brand logo (4-chevron compass)
  logo-full.svg                     # USE if you want the full lockup
  favicon.svg                       # USE
  polaris-bg.mp4, pin-2.mp4, pin-5.mp4   # Pinterest videos Cesare's team sent as reference (see below)
  svc-*.jpg, aud-*.jpg, team-action.jpg  # Pexels stock photos from Lisa's iteration
*.html                              # v0 pages — read for content reference, don't continue from them
style.css, scripts/main.js          # v0 styling — reference only
team/                               # generated v0 team pages
```

**The logo + favicon + Pinterest videos are worth keeping.** Everything else is reference.

---

## Pinterest video pattern (worth knowing)

Cesare's team sends visual references via Pinterest links. You can't download those normally — they're gated.

I installed `yt-dlp` at `~/.local/bin/yt-dlp` (Mach-O standalone binary). To download from a Pinterest pin URL:

```bash
~/.local/bin/yt-dlp "https://pin.it/XXXXXX" -o "video.%(ext)s"
```

Some pins are videos, some are images (yt-dlp will say "no video formats" for the latter). 3 of the 5 references Cesare's team sent were videos and are now in `img/`.

---

## What Cesare still needs to provide

Lisa is sending Cesare **`Polaris-checklist-Cesare.docx`** (Italian, natural tone, not AI-stiff). When content lands, Lisa forwards to you.

Summary of what's pending:
1. 8 team portraits (photographer ~€500-800 for the day — Lisa is proposing 3 photographers)
2. Cesare's founder story (4 paragraphs + 1 quote — needs 30-min interview)
3. 7 team bios (5 min each member)
4. 3 case studies (Problem → Solution → Result)
5. 3 client testimonials with name/role/company
6. 4 client logos with display authorization
7. Phone number for contatti page
8. Full address in Crema
9. Cesare's LinkedIn URL (after Lisa rebuilds his profile)
10. Privacy + Cookie policy text from his lawyer
11. Polaris LinkedIn company page URL (after Lisa creates it)

If team photos + interview + testimonials land within 2 weeks, September is realistic.

---

## Hard-learned feedback (READ before designing)

These are condensed from many iterations Lisa burned on the v0. Save the cycles.

1. **The brand brief is "bianco/argento/blu"** — strict. Cesare doesn't want gold or warm tones. Don't try.
2. **Cesare's main critique was "looks like a journal paper / dead fish / boring."** Editorial-minimalist doesn't work for him. Lean into card-based layouts, motion, cool effects, visual variety.
3. **Cesare also likes RCP** — but RCP is dark + gold. Polaris equivalent has to be silver + blue. Polarity reversal: light-majority with one dark navy section as punctuation feels more Italian-daylight; full-dark feels too RCP-clone.
4. **Service names (Formazione / Invoice Trading / Advisory) must be the dominant heading**, not a small kicker. Cesare burned cycles fixing this twice.
5. **Stock photos look generic** unless heavily branded. Pexels photos of strangers in suits felt wrong. Real team portraits (when they land) will be the lift.
6. **Don't position Polaris as wealth manager.** See Run Capital rule above. Cesare was visibly alarmed by v0 copy that overclaimed.
7. **Cache problems are the #1 cause of false "this is broken" reports.** Hard-reload (Cmd+Shift+R), incognito, or no-cache meta tags. Don't burn cycles thinking layout is broken when it's just stale CSS.
8. **Verify localhost is running before asking Lisa to refresh** something.
9. **Iterate fast and screenshot often.** Lisa screenshots and gives concrete pointed feedback. Build the loop tight.

---

## Tech stack — your call

Lisa built v0 in plain HTML/CSS/JS (matching her `runcapital-redesign` pattern). You can:

- Continue with plain HTML (fastest, no build step, easy to maintain)
- Switch to Astro / Next.js / SvelteKit / whatever you and Claude Code prefer
- Whatever feels right for the rebuild

**Hosting:** Vercel works fine for static (free tier). Domain `polaris-group.it` is Cesare's — he keeps it.

**Bilingual approach choice:**
- Lisa used inline `data-it` / `data-en` attributes + JS toggle. Works but adds complexity. SEO trade-off: only IT indexes (single URL).
- Alternative: separate `/it/` and `/en/` URL trees for real bilingual SEO. More maintenance.
- v1: IT-only SEO is acceptable per Cesare. The English version is for partner-audience direct-link visitors.

---

## How to proceed

1. Read this whole doc + DESIGN.md (for brand constraints — the colors and content rules survive any rebuild)
2. Browse the competitors (Magistra + RTS) and RCP (runcapital.partners)
3. Look at the v0 code as content reference (the copy + structure are decent)
4. Propose 1-2 strong directions to Lisa before building anything (Lisa wants to see direction, not a full v1)
5. Build, screenshot, iterate
6. Send Cesare to look once Lisa says it's ready for client review

---

## Sign-off

Ice — the hardest part is over: client is signed, brand constraints are locked, content collection is in motion via the Italian checklist. What didn't work in v0 was the visual taste. Pick a fresh direction, ship faster, talk to Lisa often.

Lisa
