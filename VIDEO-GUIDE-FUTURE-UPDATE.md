# Future YouTube Video — Irfan-ul-Quran

The Video Guide page and player placeholder are already included. You do not need to edit the HTML.

1. Upload the walkthrough video to YouTube.
2. Edit `config/tutorial.js` and set `window.DETLENG_TUTORIAL_URL` to the exact YouTube watch URL (example: `https://www.youtube.com/watch?v=XXXXXXXXXXX`).
3. Commit only `config/tutorial.js` and push to GitHub Pages:

```powershell
cd D:\DETLENG2\irfanulquranwbw-detleng
git add config/tutorial.js
git commit -m "Add Irfan-ul-Quran video walkthrough"
git push origin main
```

The placeholder will turn into the video when the URL is valid. Video links are opened on YouTube as well.
