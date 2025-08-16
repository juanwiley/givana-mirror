const BASE =
  process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL ? 'https://givana.us' : 'http://localhost:3000');

async function fetchListings() {
  const res = await fetch(`${BASE}/api/listings?limit=20`, {
    method: 'GET',
    cache: 'no-store',
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}

export default async function ListingsPage() {
  let payload;
  try {
    payload = await fetchListings();
  } catch (e) {
    return (
      <main>
        <h1>Listings</h1>
        <p style={{ color: 'crimson' }}>Couldn’t load listings. Try refresh.</p>
        <pre style={{ whiteSpace: 'pre-wrap', color: '#666' }}>{String(e)}</pre>
      </main>
    );
  }

  const listings = payload?.data ?? [];

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
