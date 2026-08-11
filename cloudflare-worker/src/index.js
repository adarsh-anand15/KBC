const DEFAULT_STATE = {
  questions: null,
  topscores: [],
  savedgames: [],
  adminPassword: null,
};

// Origins allowed to call this API. Add more if the webapp is ever
// served from another domain (e.g. a custom domain on GitHub Pages).
const ALLOWED_ORIGINS = new Set([
  'https://adarsh-anand15.github.io',
  'http://localhost:8000',
  // Capacitor's default Android WebView origin (androidScheme: 'https',
  // host: 'localhost') — the packaged Android app.
  'https://localhost',
]);

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : '';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

async function loadState(env) {
  const raw = await env.KBC_DATA.get('state');
  if (!raw) return { ...DEFAULT_STATE };
  try {
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (e) {
    return { ...DEFAULT_STATE };
  }
}

async function saveState(env, state) {
  await env.KBC_DATA.put('state', JSON.stringify(state));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (url.pathname !== '/api/data') {
      return json({ error: 'not found' }, 404, headers);
    }

    if (request.method === 'GET') {
      const state = await loadState(env);
      return json(state, 200, { ...headers, 'Cache-Control': 'no-store' });
    }

    if (request.method === 'POST') {
      let incoming;
      try {
        incoming = await request.json();
      } catch (e) {
        return json({ error: 'invalid json' }, 400, headers);
      }
      const state = await loadState(env);
      Object.assign(state, incoming);
      await saveState(env, state);
      return json(state, 200, { ...headers, 'Cache-Control': 'no-store' });
    }

    return json({ error: 'method not allowed' }, 405, headers);
  },
};
