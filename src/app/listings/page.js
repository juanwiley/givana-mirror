// src/app/listings/page.js
import supabase from '@/lib/supabaseClient';

export const metadata = {
  title: 'Listings • Givana',
  description: 'Neighborhood exchange listings',
};

export default async function ListingsPage() {
  // Server Component: runs on Vercel; safe to use anon client due to RLS
  const { data, error } = await supabase
    .from('listings')
    .select('id, title, description, loop_slug, category, images, status, created_at')
    .eq('status', 'open')                           // matches your schema default
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
          <article key={item.id} style={{ border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
            {item.images?.[0] && (
              <img
                src={item.images[0]}
                alt={item.title}
                style={{ width: '100%', height: 160, objectFit: 'cover' }}
                loading="lazy"
              />
            )}
            <div style={{ padding: '0.75rem 1rem' }}>
              <h3 style={{ margin: '0 0 .25rem' }}>{item.title}</h3>
              {item.loop_slug && <small style={{ color: '#666' }}>Loop: {item.loop_slug}</small>}
              {item.description && <p style={{ margin: '.5rem 0 0', color: '#333' }}>{item.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
