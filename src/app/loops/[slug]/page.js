// src/app/loops/[slug]/page.js
import { createClient } from '@/utils/supabase-server';
import { notFound } from 'next/navigation';

import LoopHeader from '@/components/LoopHeader';
import CharityPanel from '@/components/CharityPanel';
import ImpactPanel from '@/components/ImpactPanel';
import LoopListingGrid from '@/components/LoopListingGrid';
import LoopActionsBar from '@/components/LoopActionsBar';

export const dynamic = 'force-dynamic';

export default async function LoopPage({ params }) {
  const supabase = createClient();
  const { slug } = params;

  const { data: loop, error } = await supabase
    .from('loops')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !loop) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <LoopHeader
        name={loop.name}
        description={loop.description}
        imageUrl={loop.image_url}
      />

      {/* Pass an explicit slug so links include ?loop=<slug> */}
      <LoopActionsBar loopSlug={loop.slug} />

      <div className="mt-8">
        <LoopListingGrid loopSlug={loop.slug} />
      </div>

      {loop.charity_ein && (
        <div className="my-6">
          <CharityPanel ein={loop.charity_ein} />
        </div>
      )}

      <div className="mt-12">
        <ImpactPanel loopSlug={loop.slug} />
      </div>
    </main>
  );
}
