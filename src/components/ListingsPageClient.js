// src/components/ListingsPageClient.js
'use client';

import { useState, useMemo } from 'react';
import FiltersBar from '@/components/FiltersBar';
import ListingsSection from '@/components/ListingsSection';

export default function ListingsPageClient({ initialQuery }) {
  const [filters, setFilters] = useState({
    q: initialQuery?.q || '',
    type: initialQuery?.type || 'all',
    category: initialQuery?.category || 'all',
  });

  // Build the API query for the main section
  const sectionQuery = useMemo(() => {
    return {
      q: filters.q,
      type: filters.type,
      category: filters.category,
      status: 'open',
      limit: 24,
      // add loop, sort, etc. here if desired
    };
  }, [filters]);

console.log('Filters:', filters);

  return (
    <>
      <FiltersBar value={filters} onChange={setFilters} />
      <ListingsSection
        title="All listings"
        query={sectionQuery}
        viewAllHref="/listings"
      />
    </>
  );
}
