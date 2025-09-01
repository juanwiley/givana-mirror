import { createClient } from '@/utils/supabase-server';
import Link from 'next/link';

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
    .limit(100);

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold">Loops</h1>
        <p className="text-red-600 mt-2">Couldn’t load loops.</p>
        <pre className="text-gray-600 mt-2 whitespace-pre-wrap">{String(error.message || error)}</pre>
      </main>
    );
  }

  const loops = data ?? [];

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Loops</h1>

      {!loops.length && <p className="mt-3">No loops yet.</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}
      >
        {loops.map((loop) => (
          <Link
            key={loop.slug}
            href={`/loops/${loop.slug}`}
            className="block border rounded overflow-hidden hover:shadow-sm transition"
          >
            {loop.image_url && (
              <img
                src={loop.image_url}
                alt={loop.name}
                style={{ width: '100%', height: 140, objectFit: 'cover' }}
                loading="lazy"
              />
            )}
            <div style={{ padding: '0.75rem 1rem' }}>
              <h3 style={{ margin: '0 0 .25rem' }}>{loop.name}</h3>
              {loop.description && (
                <p style={{ margin: '.25rem 0 0', color: '#333' }}>
                  {loop.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
