/* file: src/app/api/debug/route.js */
export const dynamic = 'force-dynamic';

export async function GET(request) {
  // Optional header guard in prod: set DEBUG_SECRET in Vercel env to require a header.
  const debugSecret = process.env.DEBUG_SECRET || '';
  if (debugSecret) {
    const provided = request.headers.get('x-debug-secret') || '';
    if (provided !== debugSecret) {
      return new Response('Not found', { status: 404 });
    }
  }

  // Determine which Supabase project is being used
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL_STAGING ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    'unset';

  const body = {
    ok: true,
    siteEnv: process.env.NEXT_PUBLIC_SITE_ENV || 'unknown',
    vercelEnv: process.env.VERCEL_ENV || 'unknown',
    supabaseUrl,
    hasAnonKey:
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_STAGING) ||
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    writeGate: Boolean(process.env.NEXT_PUBLIC_WRITE_GATE),
    usingStagingProject: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL_STAGING
    ),
    now: new Date().toISOString(),
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}
