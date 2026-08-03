# KBC - Web Edition

A browser port of the original Turbo C++ "Kaun Banega Crorepati" quiz game
(`KBC.CPP`). Same rules, same 10-level prize ladder, same 50 questions
pulled straight out of the original `LEVEL*.DAT` files — just running in
any modern browser instead of DOSBox.

## Running it

No build step, no dependencies. Either:

- Open `index.html` directly in a browser, or
- Serve the folder locally for best `localStorage` reliability:

  ```bash
  cd webapp
  python3 -m http.server 8000
  ```

  then visit `http://localhost:8000`.

## What carried over from the original

- 10 levels, prize ladder from ₹25,000 up to ₹1,00,00,000 (Crorepati)
- Pause mid-game and resume later with your name + password
- Top score board (kept across sessions)
- Help and About screens
- Hidden "Modifications" admin panel — type `1503` into the main menu's
  choice box (or use the quick-access button) to edit questions per
  level, reset high scores, or change the admin password

## What's different

- Data is stored in the browser's `localStorage` instead of `.DAT` files
  next to the executable. When hosted statically (e.g. GitHub Pages),
  it can optionally also sync to a Cloudflare Worker for real
  persistence across visits/devices — see `../cloudflare/README.md`.
- The admin "Saved Games" view no longer displays player passwords in
  plain text (the original console tool printed them directly).
- A couple of obvious typos in the original question bank were fixed
  (e.g. "Thiland" → "Thailand", "Bankok" → "Bangkok").
