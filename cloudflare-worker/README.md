# KBC API — Cloudflare Worker

Replaces `webapp/server.py`'s `/api/data` endpoint for the GitHub Pages
deployment (which can only serve static files, not run Python). State is
stored in a Workers KV namespace instead of a JSON file on disk, so it
persists across requests, redeploys, and worker restarts.

## Deploy (free, no credit card required)

```bash
cd cloudflare-worker
npm install -g wrangler   # or use `npx wrangler` for every command below
wrangler login             # opens a browser to authorize your Cloudflare account

# Create the KV namespace that will hold the game data
wrangler kv namespace create KBC_DATA
```

That last command prints an `id` — copy it into `wrangler.toml`, replacing
`REPLACE_WITH_YOUR_KV_NAMESPACE_ID`.

```bash
wrangler deploy
```

This prints your Worker's URL, something like:

```
https://kbc-api.<your-subdomain>.workers.dev
```

Copy that URL into `webapp/app.js` — set the `API_BASE` constant near the
top of the file to it, then commit and push so GitHub Pages picks it up.

## Notes

- `ALLOWED_ORIGINS` in `src/index.js` is a CORS allowlist. It already
  includes the GitHub Pages origin (`https://adarsh-anand15.github.io`)
  and `http://localhost:8000` for local testing — add any other origin
  the webapp gets served from.
- Cloudflare's free tier: 100,000 requests/day, 1,000 KV writes/day,
  100,000 KV reads/day — comfortably enough for this app.
