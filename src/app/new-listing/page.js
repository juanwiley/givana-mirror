// src/app/new-listing/page.js
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function NewListingPage() {
  const router = useRouter();

  const [loops, setLoops] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    loop_slug: '',
    category: '',
    image: '',
  });

  // Enable submit only in Preview (where NEXT_PUBLIC_WRITE_GATE is set)
  const writeEnabled = Boolean(process.env.NEXT_PUBLIC_WRITE_GATE);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('loops')
        .select('slug, name')
        .order('name', { ascending: true });

      if (!error && data) setLoops(data);
    })();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const httpsImage = useMemo(() => {
    const v = form.image.trim();
    if (!v) return '';
    try {
      const u = new URL(v);
      return u.protocol === 'https:' ? v : '';
    } catch {
      return '';
    }
  }, [form.image]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const title = form.title.trim();
    if (!title) return setError('Title is required.');

    setSubmitting(true);
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Checked by API route; only present in Preview
          'x-givana-secret': process.env.NEXT_PUBLIC_WRITE_GATE || '',
        },
        body: JSON.stringify({
          ...form,
          loop_slug: form.loop_slug || null,
          category: form.category || null,
          image: httpsImage || '',
        }),
      });

      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.error || `Request failed (${res.status})`);
      }

      router.push('/listings');
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Create a Listing</h1>

      {!writeEnabled && (
        <p style={{ color: '#666', marginTop: 8 }}>
          Listing creation is disabled in this environment.
        </p>
      )}
      {error && (
        <p role="alert" style={{ color: 'crimson', marginTop: 8 }}>
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '.9rem', marginTop: '1rem', maxWidth: 720 }}>
        <label>
          <div>Title *</div>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            required
            maxLength={120}
            placeholder="e.g., Winter coats for 2 kids"
            autoComplete="off"
            style={{ width: '100%', padding: '.7rem', borderRadius: 10, border: '1px solid #ddd' }}
          />
        </label>

        <label>
          <div>Description</div>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
            maxLength={1200}
            placeholder="Short details, timing, condition…"
            style={{ width: '100%', padding: '.7rem', borderRadius: 10, border: '1px solid #ddd' }}
          />
        </label>

        <label>
          <div>Loop</div>
          <select
            name="loop_slug"
            value={form.loop_slug}
            onChange={onChange}
            style={{ width: '100%', padding: '.7rem', borderRadius: 10, border: '1px solid #ddd' }}
          >
            <option value="">— Select loop —</option>
            {loops.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name} ({l.slug})
              </option>
            ))}
          </select>
        </label>

        <label>
          <div>Category</div>
          <input
            name="category"
            value={form.category}
            onChange={onChange}
            placeholder="e.g., Clothing, Furniture"
            style={{ width: '100%', padding: '.7rem', borderRadius: 10, border: '1px solid #ddd' }}
          />
        </label>

        <label>
          <div>Image URL (https)</div>
          <input
            name="image"
            value={form.image}
            onChange={onChange}
            placeholder="https://…"
            inputMode="url"
            style={{ width: '100%', padding: '.7rem', borderRadius: 10, border: '1px solid #ddd' }}
          />
          {httpsImage && (
            <img
              src={httpsImage}
              alt="Preview"
              style={{ marginTop: 8, width: '100%', height: 180, objectFit: 'cover', borderRadius: 10, border: '1px solid #eee' }}
              loading="lazy"
            />
          )}
        </label>

        <div style={{ display: 'flex', gap: '.6rem', marginTop: '.4rem' }}>
          <button
            type="submit"
            disabled={submitting || !writeEnabled}
            style={{
              background: writeEnabled ? '#0f766e' : '#9ca3af',
              color: '#fff',
              border: 'none',
              padding: '.8rem 1.1rem',
              borderRadius: 12,
              fontWeight: 700,
              cursor: writeEnabled ? 'pointer' : 'not-allowed',
            }}
          >
            {writeEnabled ? (submitting ? 'Saving…' : 'Create Listing') : 'Creation disabled'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/listings')}
            style={{ background: '#fff', border: '1px solid #ccc', padding: '.8rem 1.1rem', borderRadius: 12 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
