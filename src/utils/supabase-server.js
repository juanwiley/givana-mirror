// src/utils/supabase-server.js
import { createClient as createSupabase } from '@supabase/supabase-js';

/**
 * Server-side Supabase client.
 * Always points to the Givana-staging project for both environments.
 * Uses public anon key; no session persistence or token refresh.
 */
export function createClient() {
  // --- Hard-pointed to staging project ---
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL_STAGING ??
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_STAGING ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL_STAGING or NEXT_PUBLIC_SUPABASE_ANON_KEY_STAGING.'
    );
  }

  return createSupabase(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
