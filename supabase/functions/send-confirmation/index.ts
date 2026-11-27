// Supabase Edge Function: send-confirmation
// Sends Appathon emails via Resend.
// The RESEND_API_KEY lives ONLY here (server-side). Never in frontend code.
// The frontend calls this with supabase.functions.invoke('send-confirmation', ...)
// and records the result in the Admin > Emails log (queued vs sent).

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return json({ error: 'POST only' }, 405)
  }
  try {
    const { type, to, subject, body } = await req.json()
    if (!to || !subject || !body) {
      return json({ error: 'to, subject and body are required' }, 400)
    }
    const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? ''
    if (!resendApiKey) {
      // Honest failure: the caller keeps the email "queued" in Admin.
      return json({ error: 'RESEND_API_KEY is not configured' }, 500)
    }
    const from = Deno.env.get('RESEND_FROM') ?? 'Appathon <noreply@appthon.in>'
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: body,
        tags: [{ name: 'type', value: String(type ?? 'confirmation') }],
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      return json({ error: data }, res.status)
    }
    return json({ ok: true, id: data.id })
  } catch (_err) {
    return json({ error: 'Unexpected error while sending email' }, 500)
  }
})
