import Link from 'next/link';
import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';
import styles from './LandingPersonalized.module.css';

export default function LandingPersonalized({ user }) {
  const name = user?.user_metadata?.full_name || user?.email || 'friend';

  return (
    <main className={styles.container}>
      <div className={styles.banner}>You’re logged in as <strong>{name}</strong></div>

      <section className={styles.hero}>
        <HeroCarousel
          items={[
            { id: 1, kind: 'video', src: '/media/splash-desktop.mp4', alt: 'Givana splash intro' },
            { id: 2, kind: 'image', src: 'https://images.unsplash.com/photo-1603052875538-dfbdcd6dce6e', alt: 'Neighbors rehoming books' },
            { id: 3, kind: 'image', src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c', alt: 'Community support moment' },
            { id: 4, kind: 'image', src: 'https://images.unsplash.com/photo-1593113599312-9d04ed6c96f6', alt: 'Kids with shared toys' },
          ]}
          autoAdvanceMs={6000}
          showIndicators
        />
        <h1 className={styles.headline}>Real Help. <em>Right Here.</em></h1>
        <p className={styles.subheadline}>Local generosity made simple.</p>
        <div className={styles.ctaRow}>
          <Link href="/listings">Browse Listings</Link>
          <Link href="/new-listing">Offer Help</Link>
        </div>
      </section>
    </main>
  );
}
