// src/lib/supabaseServerClient.js
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function getSupabaseServerClient() {
  const cookieStore = await cookies(); // ✅ await it
  return createServerComponentClient({ cookies: () => cookieStore });
}