# KBC persistence API (Cloudflare Worker)

The webapp is hosted statically on GitHub Pages, which can't run
`webapp/server.py`. This Worker replaces that backend so top scores,
saved games, custom questions, and the admin password persist across
visits instead of living only in each browser's `localStorage`.

## One-time setup

1. Install Wrangler and log in to your Cloudflare account:

   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. Create the KV namespace that stores the state blob:

   ```bash
   cd cloudflare
   wrangler kv namespace create KBC_DATA
   ```

   This prints an `id`. Paste it into `wrangler.toml` in place of
   `REPLACE_WITH_KV_NAMESPACE_ID`.

3. Deploy:

   ```bash
   wrangler deploy
   ```

   Wrangler prints the Worker's URL, e.g.
   `https://kbc-api.<your-subdomain>.workers.dev`.

## Wiring it up to the GitHub Pages frontend

Open `webapp/index.html` and set `window.KBC_API_BASE` to the deployed
Worker's `/api/data` endpoint (see the commented-out example already in
that file), then commit and push so the next GitHub Pages deploy picks
it up. Leave it unset for local development — `app.js` falls back to
the relative `/api/data` path, which `server.py` serves directly.

## Redeploying on push (optional)

`.github/workflows/deploy-worker.yml` runs `wrangler deploy` whenever
`cloudflare/**` changes on `master`. It needs two repository secrets:

- `CLOUDFLARE_API_TOKEN` — a token with "Edit Cloudflare Workers" permission
- `CLOUDFLARE_ACCOUNT_ID` — found on the Cloudflare dashboard's overview page

Add them under **Settings → Secrets and variables → Actions**. Without
them the workflow is simply skipped-by-failure; deploying manually via
`wrangler deploy` always works regardless.

## Notes

- State is a single shared JSON blob (same as the original `server.py`
  design) — there's no per-user separation or auth, matching the
  original console app and local server.
- CORS is wide open (`Access-Control-Allow-Origin: *`) since the data
  isn't sensitive (quiz scores/saved games) and the admin "password"
  was never more than a client-side gate in the original design either.
