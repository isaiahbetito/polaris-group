# Polaris Group — Handover to Ice

Lisa → Ice, handed off 2026-05-28.

## Client context

**Cesare Fontana**, founder of Polaris Group, based in **Crema, Lombardy**.
Warm referral via Luca (Run Capital co-founder) — Cesare loved the RCP redesign and asked for the same treatment.

- **Discovery call:** 2026-05-20 (Lisa took notes; key constraints below)
- **Launch target:** September 2026 — coordinated with site + LinkedIn + new training-season opportunities
- **Cesare's communication:** WhatsApp or email, no preference
- **Decision-maker:** Cesare alone

## What Polaris actually is

Italian SME services group. Brand "Polaris Group" sits over two legal entities + two strategic partners.

**Two legal entities:**
1. **Polaris HR srl** — formazione (training) + advisory. P.IVA 01616620199. Office in Crema.
2. **Hazard srl** — invoice trading. Society of the Group. Allowed to surface publicly per Cesare.

**Two strategic partners (NOT Polaris-owned):**
3. **Run Capital Partners** (Luxembourg) — Cesare is co-founder but has ZERO RCP clients
4. **3DOTS Capital** (New York) — Nasdaq listing advisory for Southern European companies

**Polaris Credito** was sold; do NOT reference. Remove any link to `polaris-credito.it`.

## Critical content constraints (non-negotiable)

1. **Run Capital honesty rule** — Cesare was visibly alarmed by earlier copy claiming he provides wealth management. He doesn't. He's a connector. Site copy must say "Run Capital eroga; Polaris cura la presentazione." Never imply Polaris does wealth management.
2. **Hazard srl** — fine to mention publicly, used only on invoice trading service legal line + group section + footer.
3. **No personal names** in body copy (except Cesare's founder page). No "Lisa or Davide" patterns.
4. **No emojis anywhere** — UI, copy, emails. SVG / typography / color only.
5. **Not an AI product** — never position Polaris with AI vocabulary.
6. **Italian first**, English second. Italian audience is primary (PMI italiane + commercialisti + consulenti del lavoro).

## Tech stack

Plain HTML/CSS/JS. No framework. Same convention as `runcapital-redesign`.

- **16 HTML pages** (home, chi-siamo, servizi, casi-testimonianze, lavora-con-noi, contatti, privacy, cookie, 8 team pages)
- **Bilingual** via inline `data-it` / `data-en` attributes + JS toggle in `scripts/main.js`
- **`data-html="1"`** opt-in attribute on elements whose data values contain HTML markup
- **Single `style.css`** (~1800 lines) — brand tokens at the top
- **Team pages generated** from `scripts/gen-team.mjs` (re-run `node scripts/gen-team.mjs` after editing bios)
- **Cesare's founder page** is hand-edited (custom layout), not generated
- **Cache-busting meta tags** on every page (no-cache / no-store) — keep them, browser caching has caused many false-positive "this is broken" reports

## Design system (locked — see DESIGN.md for full)

**Palette — strict, blue/silver/cream only:**
- Navy `#1A3A5C` (POLARIS wordmark color, primary brand)
- Silver `#8E9499` (GROUP wordmark color, silver-italic accent)
- Silver scale `#A8B0B6 → #E5E9EC`
- Cream `#FAF8F3` (section backgrounds)
- White (page base)
- **No gold, no teal, no warm tones anywhere.**

**Typography:**
- Display: Cormorant Garamond (serif, 400/500, italic for accents)
- Body + UI: Inter (400/500/600/700)
- Wordmark in nav: Inter 700, uppercase, letter-spacing 0.06em

**Signature visual moves:**
- One italic word per heading gets the `silver-italic` class (metallic gradient text). e.g. "Conosci il *team.*", "Tre servizi. *Un metodo.*"
- Eyebrows preceded by `eyebrow-dash` class which adds "— " before
- RCP-style cards with silver borders + hover lift + silver glow + top accent bar
- Aurora animated background on hero (`.aurora` class) — silver/blue gradient streaks, ported from Aceternity UI to plain CSS
- Twinkling stars / counter animations / cursor-follow card glow (`scripts/main.js`)
- Silver-gradient filled buttons (`.btn--silver`) with shimmer sweep on hover

**Layout rhythm:** light-majority site with ONE dark navy "Il Gruppo" section as punctuation. Reverse of RCP polarity.

## Lisa's hard-learned feedback (read this BEFORE editing)

This is condensed from many iterations. Save yourself the pain.

1. **Cesare's brief is "bianco/argento/blu"** — strictly. Lisa tried adding gold-warm as a tertiary accent for refinement; Cesare's stated preferences override design taste here. Stay silver-only.
2. **Cards must have visible borders.** Lisa tried opacity-0.20 borders on dark bg — looked invisible. Use opacity 0.40+ minimum on dark sections.
3. **Don't make it look like a journal/editorial paper.** Iteration #N+1 will always be "more cool effects, less wall of text." Lean into card-based layouts with stat callouts.
4. **Service names (Formazione / Invoice Trading / Advisory) must be the dominant heading**, not a small kicker label. Lisa burned cycles fixing this twice.
5. **Hero must be vertically centered with content readable.** Body text MUST be pure white on the navy hero (use `.hero p.hero__lead, .hero__lead { color: #FFFFFF }` — the `p.lead` selector has higher specificity than `.hero__lead` alone, gotcha).
6. **Pinterest videos** can be downloaded via `~/.local/bin/yt-dlp <pin.it URL>`. Cesare doesn't have his own video assets yet. Some pin URLs turn out to be images, not videos.
7. **Always verify localhost is running before asking Lisa to refresh.** `cd ~/polaris-group && python3 -m http.server 4323`
8. **Cache problems are the #1 cause of false "this is broken" reports.** Always cache-bust via `?v=$(date +%s)` when screenshotting.

## Files & layout

```
~/polaris-group/
  index.html                              # Home — most polished
  chi-siamo.html                          # About + team grid
  servizi.html                            # Services detail (3 RCP cards)
  casi-testimonianze.html                 # Case studies + testimonials
  lavora-con-noi.html                     # Careers (email-based)
  contatti.html                           # Contact form + info
  privacy.html, cookie.html               # Legal stubs
  team/
    cesare-fontana.html                   # Custom founder layout (hand-edited)
    cristina.html, alessio.html, ...      # 7 generated team pages
  style.css                               # ~1800 lines, brand tokens at top
  scripts/
    main.js                               # Lang toggle, mobile nav, counters
    gen-team.mjs                          # Team page generator (run via node)
  img/
    logo-mark.svg                         # 4-chevron compass mark, navy
    logo-full.svg                         # Full lockup with wordmark
    favicon.svg
    svc-formazione.jpg, svc-invoice.jpg, svc-advisory.jpg
    aud-pmi.jpg, aud-commercialisti.jpg, aud-consulenti.jpg
    team-action.jpg
    polaris-bg.mp4                        # Background video (Pinterest pin #1)
    pin-2.mp4, pin-5.mp4                  # Spare Pinterest videos
  robots.txt, sitemap.xml
  favicon.svg
  DESIGN.md                               # Brand system documentation
  README.md                               # Project conventions
  HANDOVER.md                             # This file
```

## What still needs Cesare's input (grep `[PLACEHOLDER`)

This was Lisa's punch list for the client call. Ice should pick up wherever Cesare's at:

1. **8 team portraits** (Cesare + 7 team)
2. **Cesare's founder story** — 4 paragraphs + 1 quote (needs 30-min interview)
3. **7 team member bios** (1-2 sentences each, edit `scripts/gen-team.mjs`)
4. **3 case studies** (Problem → Solution → Result format)
5. **3 client testimonials** with name/role/company
6. **4 client logos** with display authorization
7. **Phone number** for `contatti.html`
8. **Full address** in Crema for `contatti.html`
9. **Cesare's LinkedIn URL**
10. **Privacy + Cookie policy text** from Cesare's lawyer
11. **Polaris LinkedIn company page** URL (after Lisa creates it)

## Recent iteration history (so you don't relearn the same lessons)

- Initial build: editorial/minimal — felt "like a journal", Cesare unhappy
- Cartolina photo cards iteration: Pexels stock photos rate-limited; tried local downloads; eventually pulled photos in favor of RCP-style typed cards
- Hero went through 5 iterations: cream/text-only → navy + aurora + silver-italic title → centered properly with pure-white lead
- Service cards finally landed as: small "01/02/03" top-right + BIG serif service name + italic silver tagline + body + meta + "LEARN MORE →"
- "Il Gruppo" RCP-style 4-card section added (Polaris HR / Hazard / RCP / 3DOTS) — 3DOTS is the filled-silver accent card
- Team avatars: dark navy circles with silver-ringed border + silver initials (until real photos arrive)

## Deploy

Static. Whatever host Lisa picks (Vercel works — `vercel --prod` from project root).

DNS: `polaris-group.it` is the production domain. Cesare confirmed keeping the existing domain.

## Memory references

- [Polaris Group website](~/.claude/projects/-Users-lisatyshchenko/memory/project_polaris_group.md) — client context, corporate structure
- [Polaris site v1 build](~/.claude/projects/-Users-lisatyshchenko/memory/project_polaris_site_build.md) — what shipped on 2026-05-26
- [Verify localhost](~/.claude/projects/-Users-lisatyshchenko/memory/feedback_localhost.md) — Lisa's rule

## Good luck

Ice — Cesare's a great client but particular about visual taste. Iterate fast, screenshot often, and respect the silver-only palette religiously. The hardest part is over (system + structure locked); now it's content + polish until September.
