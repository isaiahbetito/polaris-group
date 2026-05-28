# Polaris Group — Design System

The source of truth for Polaris Group's brand and site.

## Positioning

**Polaris is the steady reference point for businesses navigating their growth.**
Not a vendor. A reference. The North Star.

**Tagline (IT):** "La stella polare per chi guida un'impresa."
**Tagline (EN):** "The North Star for those who run a business."

**Functional descriptor:** Formazione, finanza non bancaria, advisory. Per le PMI italiane, commercialisti e consulenti del lavoro.

## Audience

Two reads in one site, equally important:
1. **PMI italiane** (small-to-mid Italian companies) — direct clients
2. **Commercialisti + consulenti del lavoro** — referral channels who need to feel confident sending clients to Polaris

The design has to land for both at once: serious enough for a 60-year-old commercialista, clear enough for an SME owner who just needs to know what Polaris does.

## Voice

Serio ma caldo. Like RCP. Concrete, never philosophical. Specific claims, not vibes.

- ✅ "Tre giorni di formazione obbligatoria per 40 dipendenti, gestita end-to-end."
- ❌ "Crediamo nelle persone e nella visione di lungo periodo."

No emojis. No personal names in copy (except Cesare's founder page). No AI vocabulary.

## Brand colors

Cesare's constraint: keep white, silver, blue. Refined into a system:

```
--ink:        #0A1419   /* text on light */
--navy-deep:  #0B2E4F   /* primary brand, dark surfaces, hero */
--navy-mid:   #1A3A5F   /* hover, secondary dark */
--steel:      #3D5A75   /* links, secondary accent — darkened from #4A6B8A for WCAG AA */
--silver-1:   #B8C2CC   /* borders, dividers */
--silver-2:   #D6DCE2   /* light borders, muted bg */
--cream:      #FAF8F3   /* section bg, warm white */
--white:      #FFFFFF   /* page bg */
--gold-warm:  #6B7B8C   /* refined cool silver, used for polestar mark + accents */
```

Silver-only palette per Cesare's brief (bianco/argento/blu). The `--gold-warm` variable name is kept for stability; the actual color is a cool refined silver. Used for the polestar mark in the logo, the partnership callout border accent, decorative quote marks, and case study labels.

## Typography

```
--serif: "Cormorant Garamond", Georgia, serif;   /* display */
--sans:  "Inter", -apple-system, sans-serif;     /* body, UI */
```

- Display headlines: serif, regular weight (400), tight tracking (-0.02em)
- Body: sans, 16px base, 1.6 line-height
- Eyebrows / labels: sans uppercase, letter-spacing 0.15em, 0.75rem, --steel color

## Spacing (8px grid)

```
--space-1: 0.5rem  /* 8 */
--space-2: 1rem    /* 16 */
--space-3: 1.5rem  /* 24 */
--space-4: 2rem    /* 32 */
--space-6: 3rem    /* 48 */
--space-8: 4rem    /* 64 */
--space-12: 6rem   /* 96 */
--space-16: 8rem   /* 128 */
--space-20: 10rem  /* 160 */
```

Section padding: `--space-16` desktop, `--space-8` mobile.

## Layout

- Container max-width: 1200px, side padding 24px
- Hero: full viewport height, type-led (no stock photos)
- Sections: alternating cream / white backgrounds for rhythm
- Grid: 12-col on desktop, 1-col on mobile, 2-col tablet for some cards

## Motion

Subtle, fast, never gratuitous.
- Fade-in-up on scroll for sections (200ms, ease-out)
- Link underlines animate width left-to-right on hover (150ms)
- Page-load: hero text fades in staggered (200ms, 350ms, 500ms)
- No parallax. No hero videos. No flashy.

## Imagery rules

- Editorial > stock. If we don't have a real photo, use typography.
- Team photos: square, B&W or warm-tinted color, consistent treatment
- NO consulting stock photos (handshakes, board rooms, laptops on tables)
- One large photo of Cesare on his founder page — the only place a single human face dominates

## Information architecture (13 pages)

```
/                                  Home
/chi-siamo                         Chi Siamo (overview + team grid)
/team/cesare-fontana               Cesare's founder page
/team/cristina                     Team member
/team/alessio                      Team member
/team/gianmaria                    Team member
/team/mara                         Team member
/team/paola                        Team member
/team/andrea                       Team member
/team/giovanni                     Team member
/servizi                           Servizi (Formazione, Invoice Trading, Advisory + RCP)
/casi-testimonianze                Case studies + testimonials
/lavora-con-noi                    Careers (simple email-based)
/contatti                          Contacts + sede
```

## Bilingual strategy

Single-document, inline `data-en="..." data-it="..."` attributes, JS toggle.
Italian shown by default (`html[lang="it"]`). Toggle persists in localStorage.

Italian is the source of truth. English is a translation, not a separate site. Don't compose English-first.

## Run Capital partnership rule (NON-NEGOTIABLE)

Cesare has ZERO RCP clients. He is a connector. The site must never imply Polaris provides wealth management.

The RCP card on /servizi reads (IT):
> "Tramite la partnership con Run Capital Partners, mettiamo in contatto le imprese italiane e i loro advisor con opportunità di investimento alternativo e operazioni di quotazione (incluso il programma Nasdaq tramite Three Dots). Run Capital eroga il servizio di gestione patrimoniale; Polaris cura la presentazione."

Card is visually distinct (silver border, gold-warm accent) to signal it's a partner offering, not a Polaris service.

## Hazard srl handling

Brand: "Polaris Group" everywhere. Hazard appears only:
- In the footer alongside Polaris HR srl
- In a single line under the invoice trading service description: "Servizio erogato tramite Hazard srl, società del Gruppo."

## Polaris Credito

This entity was sold. The current `polaris-credito.it` link must be removed from everywhere. The new site does not reference Polaris Credito.
