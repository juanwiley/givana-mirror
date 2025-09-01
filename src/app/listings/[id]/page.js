// src/app/listings/page.js
import supabase from '@/lib/supabaseClient';
import ListingCard from '@/components/ListingCard';

export const metadata = {
  title: 'Listings • Givana',
  description: 'Neighborhood exchange listings',
};

export default async function ListingsPage() {
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, description, loop_slug, category, images, status, created_at')
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    return (
      <main>
        <h1>Listings</h1>
        <p style={{ color: 'crimson' }}>Couldn’t load listings. Try refresh.</p>
        <pre style={{ whiteSpace: 'pre-wrap', color: '#666' }}>{String(error.message || error)}</pre>
      </main>
    );
  }

  const listings = data ?? [];

  return (
    <main>
      <h1>Listings</h1>
      {!listings.length && <p>No listings yet.</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}
      >
        {listings.map(item => (
          <ListingCard key={item.id} listing={item} />
        ))}
      </div>
    </main>
  );
}
