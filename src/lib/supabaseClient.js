// /src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anon) {
  throw new Error('Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// CHANGE: persistSession -> true (so auth works in the client)
const supabase = createClient(url, anon, {
  auth: { persistSession: true, autoRefreshToken: true },
});

export default supabase;
