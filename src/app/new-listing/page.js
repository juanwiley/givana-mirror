import Link from 'next/link';

export const metadata = {
  title: 'Offer Help — Coming Soon • Givana',
  description: 'The full offer form will appear at launch. For now, learn how it will work.',
};

export default function NewListingTeaser() {
  return (
    <main className="container" style={{ padding: '2rem 0' }}>
      <h1>Offer Help (Coming Soon)</h1>
      <p>We’re finalizing the offer flow. In the meantime, here’s what to expect and what you can do today.</p>
      <ul>
        <li>Preview the steps on the teaser page.</li>
        <li>See what’s already live on <Link href="/listings">Listings</Link>.</li>
        <li>Want to be part of the pilot? <Link href="/#contact">Get in touch</Link>.</li>
      </ul>
    </main>
  );
}
