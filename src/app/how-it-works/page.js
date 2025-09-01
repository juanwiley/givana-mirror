import Link from 'next/link';

export const metadata = {
  title: 'How It Works • Givana',
  description: 'Givana Principles and how Loops, Listings, and Charities connect.',
};

export default function HowItWorksPage() {
  return (
    <main className="container" style={{ padding: '2rem 0' }}>
      <h1>How it Works</h1>
      <p style={{ maxWidth: 820 }}>
        Givana is built on three simple ideas: <strong>Give</strong>, <strong>Thrive</strong>, and <strong>Activate</strong>.
        Here’s how the pieces fit together as we prepare for launch.
      </p>

      <section style={{ marginTop: '1.5rem' }}>
        <h2 style={{ color: '#c18343' }}>Givana Principles</h2>
        <ul>
          <li><strong>Local first:</strong> connect nearby people and organizations.</li>
          <li><strong>Trust &amp; safety:</strong> clear guidelines, verified partners.</li>
          <li><strong>Simplicity:</strong> fast matching, minimal friction.</li>
          <li><strong>Impact:</strong> celebrate useful outcomes, not vanity metrics.</li>
        </ul>
      </section>

      <section style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginTop: '1.5rem' }}>
        <article style={{ border: '1px solid #eee', borderRadius: 12, padding: '1rem' }}>
          <h3>Loops</h3>
          <p>Local circles that coordinate help. Join one, or help us start the first in your area.</p>
          <Link href="/loops">Learn about Loops →</Link>
        </article>
        <article style={{ border: '1px solid #eee', borderRadius: 12, padding: '1rem' }}>
          <h3>Listings</h3>
          <p>Browse what’s available or needed now. During the teaser period, Listings are live.</p>
          <Link href="/listings">Browse Listings →</Link>
        </article>
        <article style={{ border: '1px solid #eee', borderRadius: 12, padding: '1rem' }}>
          <h3>Charities</h3>
          <p>Local partners help route items and services efficiently and safely.</p>
        </article>
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h2 style={{ color: '#c18343' }}>What’s launching soon</h2>
        <ol>
          <li>Join a Loop for your neighborhood.</li>
          <li>Create Offers or Requests with photos and details.</li>
          <li>Matched introductions and safe exchange suggestions.</li>
          <li>Impact summaries (items rehomed, time volunteered).</li>
        </ol>
      </section>

      <p style={{ marginTop: '1.5rem' }}>Ready to help shape the launch? <Link href="/#contact">Get in touch →</Link></p>
    </main>
  );
}
