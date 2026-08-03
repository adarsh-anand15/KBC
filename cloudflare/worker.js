/**
 * Cloudflare Worker backing KBC's persistence API.
 *
 * Mirrors webapp/server.py's GET/POST /api/data contract so the same
 * app.js code works whether it's talking to the local Python server
 * (during development) or this Worker (when the frontend is hosted
 * statically, e.g. on GitHub Pages). State is a single shared JSON blob
 * kept in Workers KV, matching the original single-instance design.
 */

const DEFAULT_STATE = {
  questions: null,
  topscores: [],
  savedgames: [],
  adminPassword: null,
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...CORS_HEADERS,
    },
  });
}

async function loadState(env) {
  const raw = await env.KBC_DATA.get("state");
  if (!raw) return { ...DEFAULT_STATE };
  try {
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (e) {
    return { ...DEFAULT_STATE };
  }
}

async function saveState(env, state) {
  await env.KBC_DATA.put("state", JSON.stringify(state));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (url.pathname !== "/api/data") {
      return jsonResponse({ error: "not found" }, 404);
    }

    if (request.method === "GET") {
      return jsonResponse(await loadState(env));
    }

    if (request.method === "POST") {
      let incoming;
      try {
        incoming = await request.json();
      } catch (e) {
        return jsonResponse({ error: "invalid json" }, 400);
      }
      const state = await loadState(env);
      Object.assign(state, incoming);
      await saveState(env, state);
      return jsonResponse(state);
    }

    return jsonResponse({ error: "method not allowed" }, 405);
  },
};
