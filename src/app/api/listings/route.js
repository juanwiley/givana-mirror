// src/app/api/listings/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase-server';

export const dynamic = 'force-dynamic';
// If you run into Edge runtime issues, uncomment the next line:
// export const runtime = 'nodejs';

export async function GET(req) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(req.url);
    const loop = (searchParams.get('loop') || '').trim();
    const q = (searchParams.get('q') || '').trim();
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    let query = supabase
      .from('listings')
      .select(
        'id, title, description, loop_slug, category, images, status, created_at',
        { count: 'exact' }
      )
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (loop) query = query.eq('loop_slug', loop);
    if (q) query = query.ilike('title', `%${q}%`);

    const { data, count, error } = await query.range(offset, offset + limit - 1);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data ?? [], count, limit, offset }, { status: 200 });
  } catch (err) {
    // Ensure we NEVER return HTML—always JSON for the client
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
