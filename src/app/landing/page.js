import Link from 'next/link';

// src/app/landing/page.js

export const metadata = {
  title: 'Give. Thrive. Activate.',
  description: 'Real Help. Right Here.',
};

import ScrollTopOnMount from '@/components/ScrollTopOnMount';

export default function LandingPage() {
  return (
    <main
      className="container min-h-screen overflow-x-hidden"
      style={{ padding: '2rem 0', minHeight: '100vh' }}
    >
      <ScrollTopOnMount />

      {/* Hero */}
      <section className="hero">
        <img
          src="/toys.png"
          alt="Give. Thrive. Activate."
          className="hero-img"
          loading="eager"
        />
        <h1>Real Help. Right Here.</h1>
        <p style={{ maxWidth: 640, margin: '0 auto 1.25rem' }}>
          Givana is where generosity meets real need. Whether you’re offering a helping hand
          or looking for one, you’ll find trusted neighbors and meaningful support—just
          around the corner.
        </p>
        <div className="cta-buttons">
          <Link href="/listings">Browse Listings</Link>
	<Link href="/new-listing">Offer Help</Link>
        </div>
      </section>

      {/* Pillars (Give • Thrive • Activate) */}
      <section className="pillars" aria-label="Givana pillars">
        {/* Give */}
        <div className="section-box">
          <h2>Give</h2>
          <p>Donate goods</p>
          <p>Volunteer your time</p>
          <p>Support local initiatives</p>
        </div>

        {/* Thrive */}
        <div className="section-box">
          <h2>Thrive</h2>
          <p>Improve lives</p>
          <p>Strengthen community</p>
          <p>Create joy and belonging</p>
        </div>

        {/* Activate (fewer bullets is fine; grid keeps top alignment) */}
        <div className="section-box">
          <h2>Activate</h2>
          <p>Launch community projects</p>
          <p>Donate to charities</p>
        </div>
      </section>

      {/* Stories */}
      <section id="impact" className="stories">
        <h2>Success Stories</h2>
        <p>“Thanks to Givana, I found help when I needed it.”</p>
        <p>“I gave extra coats to a family two blocks away.”</p>
        <p>“My daughter and I joined a local loop and made friends.”</p>
      </section>

      {/* About / Contact anchors for nav */}
      <section id="about" className="page-section container" style={{ padding: '2rem 0' }}>
        <h2 style={{ color: '#c18343', textAlign: 'center' }}>About</h2>
        <p style={{ maxWidth: 700, margin: '0.75rem auto 0', textAlign: 'center' }}>
          We’re building neighbor-to-neighbor generosity you can trust.
        </p>
      </section>

      <section id="contact" className="page-section container" style={{ padding: '2rem 0' }}>
        <h2 style={{ color: '#c18343', textAlign: 'center' }}>Contact</h2>
        <p style={{ maxWidth: 700, margin: '0.75rem auto 0', textAlign: 'center' }}>
          Have ideas or want to help? Reach out and we’ll get back to you.
        </p>
      </section>
    </main>
  );
}
