// src/utils/supabase-server.js
import { createClient as createSupabase } from '@supabase/supabase-js';

/**
 * Server-side Supabase client for read-only operations.
 * Uses public anon key; no session persistence or token refresh.
 * Ensure these env vars are set in Vercel:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment.'
    );
  }

  return createSupabase(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        // Optional: add any server-only headers here
      },
    },
  });
}
