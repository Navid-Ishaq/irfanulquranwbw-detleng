# Irfan-ul-Quran — Word-by-Word Learning

An independent educational initiative by DeTLeng.

## Structure

- `index.html`: Home, Learn & Practice, complete dedication and prayer, flashcard workspace
- `about.html`: About Irfan-ul-Quran (text supplied by the project owner; no scholar photograph)
- `app.js`: original DeTLeng Flashcard engine, unchanged
- `irfan-paras.js`: new Para / quarter modal and automatic DOCX selector
- `styles.css`: working presentation styles derived from the Understand Quran reference
- `irfan.css`: new Irfan-ul-Quran visual design
- `vendor/jszip.min.js`: original DOCX library, unchanged
- `data/docx/`: add your 120 vocabulary DOCX documents here
- `CNAME`: irfanulquranwbw.detleng.com

## DOCX file naming

30 Paras × 4 quarters = 120 expected files. Each individual file is named `IQ-Para-PP-QQ.docx` (two-digit Para and quarter values).

Examples:
- `data/docx/IQ-Para-01-01.docx` — Para 01, first quarter (sample provided)
- `data/docx/IQ-Para-01-02.docx` — Para 01, second quarter
- `data/docx/IQ-Para-15-03.docx` — Para 15, third quarter
- `data/docx/IQ-Para-30-04.docx` — Para 30, fourth quarter

**Put the remaining 119 files directly inside `data/docx/`.** There are no translation-language tabs. Each answer contains both Urdu and English. The original DOCX files are not rewritten or converted. For missing or empty/template-only files the interface shows "Coming Soon, Insha Allah!" Valid DOCX files use the existing `handleFile(file)` pathway.

## Testing locally

Opening `index.html` directly with `file://` may block fetch requests. Run a simple local HTTP server instead:

```powershell
cd D:\DETLENG2\irfanulquranwbw-detleng
python -m http.server 8000
```

Then open `http://localhost:8000/` and choose **Learn & Practice** → **Para 01** → **First Quarter**. Use question range / MCQ / Classic / Learning / Test and the export tools. Missing files should show Coming Soon.

## Deployment

The GitHub repository `Navid-Ishaq/irfanulquranwbw-detleng` has its own existing history. **Do not use `git init` inside an unrelated copy and force push.** Prefer cloning the repository and copying these files into that clone:

```powershell
git clone https://github.com/Navid-Ishaq/irfanulquranwbw-detleng.git
cd irfanulquranwbw-detleng
# Copy the contents of this ZIP folder into this cloned folder, replacing CNAME/README as needed.
git add .
git commit -m "Launch Irfan-ul-Quran Word-by-Word Learning"
git push origin main
```

Set GitHub Pages to `main` branch, `/ (root)` and confirm DNS / HTTPS for `irfanulquranwbw.detleng.com`. Do not modify the original Flashcard or Understand Quran repositories.

## Editorial and permissions

The website About and prayer content come from the supplied Word documents. The long dedication is kept on the Home page. No scholar photograph is embedded. Public redistribution/adaptation of the Irfan-ul-Quran translations requires appropriate permission from the rights holder; attribution alone does not grant rights. The project must not be described as officially endorsed unless authorised. The Word-by-Word vocabulary segmentation is a learning aid, not a replacement for whole-verse translation.
