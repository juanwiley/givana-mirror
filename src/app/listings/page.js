// src/app/listings/page.js
import ErrorBoundary from '@/components/ErrorBoundary';
import ListingsPageClient from '@/components/ListingsPageClient';

export const metadata = {
  title: 'Listings • Givana',
  description: 'Browse and discover listings',
};

export const dynamic = 'force-dynamic';

export default function ListingsPage({ searchParams }) {
  const initialQuery = {
    q: searchParams?.q || '',
    category: searchParams?.category || 'all',
    type: searchParams?.type || 'all',
  };

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '16px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '8px 0 12px' }}>Listings</h1>
      <ErrorBoundary>
        <ListingsPageClient initialQuery={initialQuery} />
      </ErrorBoundary>
    </main>
  );
}
