// ✅ File: src/app/loops/[slug]/page.js
import { createClient } from '@/utils/supabase-server';
import styles from './slug.module.css';
import ListingCard from '@/components/ListingCard';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  return {
    title: `Loop • ${params.slug}`,
    description: `Community loop page for ${params.slug}`,
  };
}

export default async function LoopPage({ params }) {
  const supabase = createClient();
  const { slug } = params;

  // ✅ Fetch loop info
  const { data: loop, error: loopError } = await supabase
    .from('loops')
    .select('name, description, image_url')
    .eq('slug', slug)
    .single();

  // ✅ Fetch listings that belong to this loop
  const { data: listings, error: listingError } = await supabase
    .from('listings')
    .select('*, loops(name, slug)')
    .eq('status', 'open')
    .eq('loop_slug', slug)  // ← FIXED: correct FK field
    .limit(100);

  return (
    <main className={styles.page}>
      {!loop ? (
        <p className={styles.error}>Loop not found.</p>
      ) : (
        <>
          {/* ✅ Hero Section */}
          <div className={styles.hero}>
            {loop.image_url ? (
              <img src={loop.image_url} alt={loop.name} className={styles.heroImage} />
            ) : (
              <img src="/loop-placeholder.png" alt="No image" className={styles.heroImage} />
            )}

            <div className={styles.heroContent}>
              <h1>{loop.name}</h1>
              <p>{loop.description || 'No description provided.'}</p>
              <div className={styles.impact}>
                <span><strong>{loop.impact_items ?? 0}</strong> items rehomed</span>
                <span><strong>{loop.impact_members ?? 0}</strong> members</span>
              </div>
            </div>
          </div>

          {/* ✅ Listings Section */}
          <section className={styles.listingsSection}>
            <h2>Listings in {loop.name}</h2>
            {listingError && (
              <p className={styles.error}>Error loading listings: {listingError.message}</p>
            )}
            {!listings?.length ? (
              <p>No listings yet for this loop.</p>
            ) : (
              <div className={styles.grid}>
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
