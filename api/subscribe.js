export const config = { runtime: 'edge' };

var ALLOWED_ORIGINS = [
  'https://rajkashyap.studio',
  'http://localhost:8080'
];

// RFC-5321-compatible email regex
var EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function respond(body, status, allowedOrigin) {
  var headers = { 'Content-Type': 'application/json' };
  if (allowedOrigin) {
    headers['Access-Control-Allow-Origin'] = allowedOrigin;
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
  }
  return new Response(JSON.stringify(body), { status: status, headers: headers });
}

export default async function handler(request) {
  var origin = request.headers.get('origin') || '';
  var allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : null;

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin || '',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  if (request.method !== 'POST') {
    return respond({ error: 'Method not allowed' }, 405, allowedOrigin);
  }

  // Block browser requests from unknown origins (non-browser requests have no Origin header)
  if (origin && !allowedOrigin) {
    return respond({ error: 'Forbidden' }, 403, null);
  }

  var body;
  try {
    body = await request.json();
  } catch (e) {
    return respond({ error: 'Invalid request' }, 400, allowedOrigin);
  }

  var email = typeof body.email === 'string'
    ? body.email.trim().toLowerCase().slice(0, 254)
    : '';

  if (!email || !EMAIL_RE.test(email)) {
    return respond({ error: 'Invalid email' }, 400, allowedOrigin);
  }

  var resendKey = process.env.RESEND_API_KEY;
  var audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!resendKey || !audienceId) {
    return respond({ error: 'Service unavailable' }, 503, allowedOrigin);
  }

  var resendRes = await fetch(
    'https://api.resend.com/audiences/' + audienceId + '/contacts',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + resendKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, unsubscribed: false })
    }
  );

  // 409 = contact already exists — treat as success (idempotent)
  if (!resendRes.ok && resendRes.status !== 409) {
    return respond({ error: 'Failed to subscribe' }, 500, allowedOrigin);
  }

  return respond({ ok: true }, 200, allowedOrigin);
}
