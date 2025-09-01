import Link from 'next/link';

export const metadata = {
  title: 'Givana — Coming Soon',
  description: 'Real Help. Right Here. A new way to connect generosity with local need.',
};

export default function LandingTeaser() {
  return (
    <main className="container" style={{ padding: '2rem 0', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="hero">
        <img
          src="/toys.png"
          alt="Give. Thrive. Activate."
          className="hero-img"
          loading="eager"
        />
        <h1>Real Help. Right Here — <em>coming soon</em></h1>
        <p style={{ maxWidth: 720, margin: '0 auto 1.25rem' }}>
          We’re preparing a neighbor‑to‑neighbor exchange that makes it easy to offer help
          and find it—safely, locally, and with purpose. While we finish building,
          you can preview what’s planned and see what’s already live below.
        </p>
        <div className="cta-buttons">
          <Link href="/listings" aria-label="See what is live now">See What’s Live</Link>
          <Link href="/new-listing" aria-label="Learn how to offer help">Offer Help (Preview)</Link>
        </div>
      </section>

      {/* What’s coming */}
      <section className="sections" style={{ gap: '2rem' }}>
        <div className="section-box">
          <h2>Loops</h2>
          <p>Neighborhood groups that coordinate giving and getting.</p>
          <Link href="/loops">Learn about Loops →</Link>
        </div>
        <div className="section-box">
          <h2>Listings</h2>
          <p>Browse offers and needs from nearby neighbors.</p>
          <Link href="/listings">Open Listings →</Link>
        </div>
        <div className="section-box">
          <h2>How it Works</h2>
          <p>Principles, safety, and how pieces fit together.</p>
          <Link href="/how-it-works">See the plan →</Link>
        </div>
      </section>

      {/* Contact anchor for CTA links */}
      <section id="contact" className="page-section container" style={{ padding: '2rem 0' }}>
        <h2 style={{ color: '#c18343', textAlign: 'center' }}>Get Involved</h2>
        <p style={{ maxWidth: 720, margin: '0.75rem auto 0', textAlign: 'center' }}>
          Want to be part of Givana’s early launch—organize a Loop, partner as a local charity,
          or help test features? Tell us how you’d like to help and we’ll reach out.
        </p>
      </section>
    </main>
  );
}
