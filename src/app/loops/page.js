import Link from 'next/link';

export const metadata = {
  title: 'Loops — Coming Soon • Givana',
  description: 'Learn how Givana Loops work and what they enable.',
};

export default function LoopsTeaserPage() {
  return (
    <main className="container" style={{ padding: '2rem 0' }}>
      <h1>Loops (Coming Soon)</h1>
      <p style={{ maxWidth: 800 }}>
        A <strong>Loop</strong> is a local circle of neighbors and partners who coordinate
        giving and getting—quickly, safely, and with trust. Loops make it easy to match
        what someone can offer with what someone nearby needs.
      </p>

      <figure style={{ margin: '2rem 0' }} aria-label="Loop diagram">
        <svg
          viewBox="0 0 760 210"
          role="img"
          aria-labelledby="loop-diagram-title"
          style={{ width: '100%', maxWidth: 760, display: 'block', margin: '0 auto' }}
        >
          <title id="loop-diagram-title">How a Givana Loop Works</title>
          <defs>
            <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
              <path d="M0,0 L12,6 L0,12 z" fill="#c59547" />
            </marker>
          </defs>

          {/* Nodes */}
          <g>
            <rect x="10"  y="60" width="160" height="80" rx="12" fill="#fff" stroke="#c59547" />
            <text x="90"  y="105" textAnchor="middle" fontWeight="700" fill="#344f63">Offer</text>
          </g>
          <g>
            <rect x="200" y="60" width="160" height="80" rx="12" fill="#fff" stroke="#c59547" />
            <text x="280" y="105" textAnchor="middle" fontWeight="700" fill="#344f63">Match</text>
          </g>
          <g>
            <rect x="390" y="60" width="160" height="80" rx="12" fill="#fff" stroke="#c59547" />
            <text x="470" y="105" textAnchor="middle" fontWeight="700" fill="#344f63">Exchange</text>
          </g>
          <g>
            <rect x="580" y="60" width="160" height="80" rx="12" fill="#fff" stroke="#c59547" />
            <text x="660" y="105" textAnchor="middle" fontWeight="700" fill="#344f63">Thanks</text>
          </g>

          {/* Arrows */}
          <line x1="170" y1="100" x2="200" y2="100" stroke="#c59547" strokeWidth="3" markerEnd="url(#arrow)" />
          <line x1="360" y1="100" x2="390" y2="100" stroke="#c59547" strokeWidth="3" markerEnd="url(#arrow)" />
          <line x1="550" y1="100" x2="580" y2="100" stroke="#c59547" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M 660 145 C 660 190, 100 190, 100 145" fill="none" stroke="#c59547" strokeWidth="3" markerEnd="url(#arrow)" />

        </svg>
        <figcaption style={{ textAlign: 'center', color: '#666', marginTop: '.5rem' }}>
          Offer → Match → Exchange → Thanks → back to Offer. A community‑powered loop.
        </figcaption>
      </figure>

      <section style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <article style={{ border: '1px solid #eee', borderRadius: 12, padding: '1rem' }}>
          <h3>Why Loops?</h3>
          <p>Fast matches, less waste, real local impact, and safer exchanges.</p>
        </article>
        <article style={{ border: '1px solid #eee', borderRadius: 12, padding: '1rem' }}>
          <h3>Who’s in a Loop?</h3>
          <p>Neighbors, organizers, and local charities who vouch for the community.</p>
        </article>
        <article style={{ border: '1px solid #eee', borderRadius: 12, padding: '1rem' }}>
          <h3>What can I give?</h3>
          <p>Gently‑used items, skills, time, or services—whatever helps nearby.</p>
        </article>
      </section>

      <p style={{ marginTop: '1.5rem' }}>
        Want to organize the first Loop in your neighborhood? <Link href="/#contact">Get in touch →</Link>
      </p>
    </main>
  );
}
