"use client";

import { useEffect, useState } from 'react';
import ListingCard from './ListingCard';
import ListingsGrid from './ListingsGrid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ListingsSection({ title, query = {}, viewAllHref }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const supabase = createClientComponentClient();
    const fetchListings = async () => {
      let builder = supabase
        .from('listings')
        .select('*, loops(name, slug)')
        .order('created_at', { ascending: false });

      if (query.status) builder = builder.eq('status', query.status);
      if (query.loop) builder = builder.eq('loops.slug', query.loop);
      if (query.limit) builder = builder.limit(query.limit);

      const { data, error } = await builder;
      if (!error) setListings(data || []);
      else console.error('Failed to fetch listings:', error.message);
    };

    fetchListings();
  }, [JSON.stringify(query)]);

  return (
    <section style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>{title}</h2>
      <ListingsGrid>
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </ListingsGrid>
      {viewAllHref && (
        <a href={viewAllHref} style={{ marginTop: '1rem', fontWeight: 'bold', textDecoration: 'underline' }}>
          View all
        </a>
      )}
    </section>
  );
}
