# Polaris Group — Website

Plain HTML/CSS/JS, bilingual IT/EN via inline `data-it`/`data-en` attributes.

## Pages (13 total)

- `/` — Home
- `/chi-siamo.html` — Chi Siamo
- `/team/cesare-fontana.html` — Cesare's founder page (custom layout)
- `/team/{cristina,alessio,gianmaria,mara,paola,andrea,giovanni}.html` — 7 team members (generated from `scripts/gen-team.mjs`)
- `/servizi.html` — Servizi
- `/casi-testimonianze.html` — Casi & Testimonianze
- `/lavora-con-noi.html` — Lavora con noi
- `/contatti.html` — Contatti
- `/privacy.html`, `/cookie.html` — legal stubs

## Local dev

```bash
# Any static server works. Python is easiest:
python3 -m http.server 8000

# Then open http://localhost:8000
```

## Editing team pages

The 7 non-founder team pages are generated from data in `scripts/gen-team.mjs`. To edit a team member's bio or role:

1. Open `scripts/gen-team.mjs`
2. Edit the `members[]` array
3. Run `node scripts/gen-team.mjs`

Cesare's page (`team/cesare-fontana.html`) is hand-edited — it has a custom layout.

## Brand system

See `DESIGN.md` for the full design system: colors, typography, voice, layout rules, partnership constraints (Run Capital, Hazard srl).

## Placeholders

Search the codebase for `[PLACEHOLDER` to find every spot that needs Cesare-supplied content:
- Founder story (Cesare's 4 paragraphs + quote)
- Team bios + facts
- Case studies (3, problem → solution → result)
- Testimonials (3, from different client types)
- Client logos (4)
- Phone number + full address
- LinkedIn URLs

## Deploy

Vercel: `vercel --prod` from the repo root. Static, no build step.
