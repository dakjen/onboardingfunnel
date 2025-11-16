// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // IMPORTANT: In production, replace '*' with your Vercel app's origin (e.g., 'https://onboardingfunnel.vercel.app')
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle preflight OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const { to, subject, html } = await req.json();
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Elitewise Escapes <travel@elitewiseescapes.com>', // Updated from 'you@example.com'
      to,
      subject,
      html,
    }),
  });
  const data = await res.json();

  // Combine existing headers with CORS headers
  const responseHeaders = {
    ...corsHeaders,
    'Content-Type': 'application/json',
  };

  return new Response(JSON.stringify(data), {
    headers: responseHeaders,
  });
});