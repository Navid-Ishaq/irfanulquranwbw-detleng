# Irfan-ul-Quran — Verse-by-Verse Learning

An independent Qur'anic educational initiative by DeTLeng. Learners study the meaning of each complete Ayat through the Irfan-ul-Quran translations, with MCQs and classic flashcards.

## What's active

- **Verse by Verse:** active. Choose one of **Urdu + English**, **Urdu Only**, **English Only**, then one of 30 Paras and four learning sections.
- **Word by Word:** future project with a *Coming in a Future Update, Insha Allah* notice. The old `data/docx/` sample is retained only as legacy material, not the active learning source.
- **Four focused views:** Para selection → quarter modal → full-width question-group selection → full-width practice.
- **Practice:** original MCQ / Classic Flashcard / Learning / Test scoring, question groups, saved in-page attempts, navigation and exports remain in `app.js`.
- **Safe restart:** separate top control asks for confirmation. Back to Question Groups returns to the range chooser.
- **Dedication & Dua:** link in top navigation jumps to the complete existing dedication on Home.

## File placement — 360 documents, exact names

Put the Word files directly in these folders. **Do not rename them**:

| Button | Folder | Example |
| --- | --- | --- |
| Urdu + English | `data/verse-bilingual/` | `IQV-Para-01-01.docx` |
| Urdu Only | `data/verse-urdu/` | `UR-IQV-Para-01-01.docx` |
| English Only | `data/verse-english/` | `EN-IQV-Para-01-01.docx` |

Each collection contains **30 Paras × 4 sections = 120 files** when complete. This ZIP includes the owner-supplied **01-01 sample in each folder**. The owner will add the remaining 357 DOCX files later. Missing or empty files show a *Coming Soon* notice, never fictional questions.

The DOCX format is a 3-column table: **S. No. | Code – Arabic Ayat | Translation & Notes**. Each verse is one row. The original `parseDocx` and `handleFile(file)` are used without changing `app.js`.

Run `python tools/verify_files.py` to see how many files are in place. The three sample documents each contain 53 numbered entries.

## Main files

- `index.html`, `about.html`: pages and content
- `styles.css`, `irfan.css`: existing styles
- `iq-experience.css`: new typography, mobile header and full-window practice styles
- `irfan-paras.js`: Para, quarter and 3-language folder loader
- `iq-experience.js`: view transitions, safe Restart confirmation, back navigation
- `app.js`: **original engine, byte-for-byte unchanged**
- `vendor/jszip.min.js`: original ZIP/DOCX library unchanged
- `CNAME`: existing domain configuration unchanged

## Run locally

Because document loading uses `fetch`, don't open `index.html` directly as a `file://` page. From Windows PowerShell:

```powershell
cd D:\DETLENG2\irfanulquranwbw-detleng
python -m http.server 8000
```

Then browse to `http://localhost:8000/` and test Para 01 / First Quarter in all 3 translation modes. Check MCQ, Classic, Learning/Test, Restart Cancel, return to groups, and mobile navigation.

## Copy into existing Git working directory

**Do not delete the `.git` directory.** Extract the ZIP and copy the **contents** of the included `irfanulquranwbw-detleng` folder over your existing `D:\DETLENG2\irfanulquranwbw-detleng` project folder. Add remaining DOCX files to the three specified folders. Once verified locally:

```powershell
cd D:\DETLENG2\irfanulquranwbw-detleng
git status
git add .
git commit -m "Launch Verse-by-Verse learning and focused practice UI"
git push origin main
```

GitHub Pages remains attached to the existing repository and domain. Don't use `git init` or `git push --force`.

## Editorial and permissions

The site retains the supplied dedication, dua, About information and attribution. Irfan-ul-Quran translations belong to their respective rights holder(s); public redistribution or adaptation requires appropriate permission. This is an independent educational initiative and should not be described as officially endorsed unless authorized.
