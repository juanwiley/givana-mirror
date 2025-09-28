// src/app/loops/page.js
import { createClient } from '@/utils/supabase-server';
import LoopCard from '@/components/LoopCard';
import styles from './loops.module.css';

export const metadata = {
  title: 'Loops • Givana',
  description: 'Browse community loops',
};

export const dynamic = 'force-dynamic';

export default async function LoopsIndexPage() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('loops')
    .select('slug, name, description, image_url')
    .order('name', { ascending: true })
    .limit(200);

  if (error) {
    return (
      <main className={styles.page}>
        <h1>Loops</h1>
        <p style={{ color: 'crimson' }}>Couldn’t load loops.</p>
        <pre style={{ whiteSpace: 'pre-wrap', color: '#666' }}>
          {String(error.message || error)}
        </pre>
      </main>
    );
  }

  const loops = data ?? [];

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Loops</h1>
      {!loops.length && <p>No loops yet.</p>}
      <div className={styles.grid}>
        {loops.map((loop) => (
          <LoopCard key={loop.slug} loop={loop} />
        ))}
      </div>
    </main>
  );
}
