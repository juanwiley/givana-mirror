// src/app/page.js
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import LandingPublic from '@/landing/public/LandingPublic';
import LandingPersonalized from '@/landing/personalized/LandingPersonalized';

// Revalidate occasionally, but keep this route dynamic because it depends on auth
export const revalidate = 60;
export const dynamic = 'force-dynamic';

async function getUser() {
  // IMPORTANT: pass the cookies reference, do not call cookies() yourself here
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // optional: log or gracefully handle
    // console.error('supabase.auth.getUser error:', error.message);
    return null;
  }

  return data?.user ?? null;
}

export default async function HomePage() {
  const user = await getUser();
  return user ? <LandingPersonalized user={user} /> : <LandingPublic />;
}
