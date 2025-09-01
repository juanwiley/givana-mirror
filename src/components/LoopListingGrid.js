// src/components/LoopListingGrid.js
'use client';
import { useEffect, useState } from 'react';
import ListingCard from './ListingCard';

export default function LoopListingGrid({ loopSlug }) {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loopSlug) return;

    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError('');

        const res = await fetch(`/api/listings?loop=${encodeURIComponent(loopSlug)}`, {
          cache: 'no-store',
          signal: ctrl.signal,
        });

        const ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('application/json')) {
          const txt = await res.text();
          throw new Error(`Non-JSON response (${res.status}): ${txt.slice(0, 140)}…`);
        }

        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || 'Failed to load listings');

        setListings(Array.isArray(json?.data) ? json.data : []);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message || String(e));
          setListings([]);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [loopSlug]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading listings…</p>;
  }

  if (error) {
    return <p style={{ color: 'crimson' }}>Couldn’t load listings for this loop. {error}</p>;
  }

  if (!listings.length) {
    return <p className="text-center text-gray-500">No listings yet. Be the first to post!</p>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1rem',
        marginTop: '1rem',
      }}
    >
      {listings.map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
    </div>
  );
}
