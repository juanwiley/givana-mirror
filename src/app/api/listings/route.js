// src/app/api/listings/route.js
import { createClient } from '@/utils/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const loop = searchParams.get('loop');
  const status = searchParams.get('status') || 'open';

  let query = supabase
    .from('listings')
    .select(
      `
      id,
      title,
      description,
      loop_slug,
      category,
      status,
      images,
      created_at,
      loops (
        name
      )
      `,
      { count: 'exact' }
    )
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (loop) query = query.eq('loop_slug', loop);

  const { data, count, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const listings = (data ?? []).map((listing) => ({
    ...listing,
    loop_name: listing.loops?.name || listing.loop_slug,
  }));

  return Response.json({ data: listings, count, limit: 5, offset: 0 });
}

// --- Future-proofed write protection ---
export async function POST() {
  if (process.env.NEXT_PUBLIC_SITE_ENV === 'production') {
    return Response.json(
      { error: 'Write operations are disabled in production (read-only mode).' },
      { status: 403 }
    );
  }

  return Response.json({ ok: true, message: 'Write enabled (staging only).' });
}
