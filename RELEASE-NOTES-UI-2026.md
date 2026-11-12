# Irfan-ul-Quran UI/UX Update — November 2026

## Completed
- Sticky responsive navigation across Home, About, and Video Guide.
- Independent Video Guide page: YouTube player placeholder above six interactive walkthrough steps.
- Future video URL configuration in `config/tutorial.js`, no HTML edits needed.
- Replaced Home dedication section with English + soft Urdu Learning Motivation.
- Reading-size slider, minus/plus/reset (18–40 px) for verse and translation text; remembers preference in local browser storage when available.
- Arabic verse centered prominently, smaller reference on next line.
- Center-aligned MCQ options with balanced A/B/C labels.
- For mixed Urdu–English meaning, split on the actual spaced en/em dash between Urdu and English and show separate lines; applies to MCQ and answer side.
- Hide stray converter-circle `O` / `o` / `○` immediately following Arabic script in on-screen content, preserving original DOCX files and scoring data.
- Updated About page to focus on complete Ayat rather than per-word segmentation.
- Retained 30 Para cards, 4 quarter selectors, all 3 language collections, scoring, saved in-page group attempts, safety controls, exports and original parser.

## Files deliberately untouched
- `app.js`
- `vendor/jszip.min.js`
- `CNAME`
- All `data/**/*.docx` source files

## Basic manual checks before publishing
1. Choose Verse by Verse > Urdu + English > Para 30 > Fourth Quarter. Generate any group. Arabic and its smaller reference should appear separately; translations should have two clear lines where both exist.
2. Choose Urdu Only and English Only; verify both still load and use MCQ / Classic modes.
3. Test Reset/plus/minus Reading Size, reload and check preference persists.
4. Verify Back to Groups and safe Restart confirmation.
5. Open Video Guide and click all six step buttons; the video placeholder should appear at the top.
6. Check Learning Motivation Urdu and English tabs, mobile menu, dark mode and the About page.
7. Test on localhost over HTTP or on GitHub Pages, not by opening HTML via `file://`.
