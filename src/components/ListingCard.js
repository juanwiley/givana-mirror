import Link from 'next/link';

export default function ListingCard({ listing }) {
  return (
    <article
      style={{
        border: '1px solid #eee',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      {listing.images?.[0] && (
        <img
          src={listing.images[0]}
          alt={listing.title}
          style={{ width: '100%', height: 160, objectFit: 'cover' }}
          loading="lazy"
        />
      )}

      <div style={{ padding: '0.75rem 1rem' }}>
        <h3 style={{ margin: '0 0 .25rem' }}>
          <Link href={`/listings/${listing.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {listing.title}
          </Link>
        </h3>

        {listing.loop_slug && (
          <small style={{ color: '#666' }}>Loop: {listing.loop_slug}</small>
        )}

        {listing.description && (
          <p style={{ margin: '.5rem 0 0', color: '#333' }}>
            {listing.description}
          </p>
        )}
      </div>
    </article>
  );
}
