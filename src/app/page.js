import { getSupabaseServerClient } from '@/lib/supabaseServerClient';
import LandingPublic from '@/landing/public/LandingPublic';
import LandingPersonalized from '@/landing/personalized/LandingPersonalized';

export const revalidate = 60;

async function getUser() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export default async function HomePage() {
  const user = await getUser();
  return user
    ? <LandingPersonalized user={user} />
    : <LandingPublic />;
}
