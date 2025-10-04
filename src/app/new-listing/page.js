'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function NewListingPage() {
  const supabase = createClientComponentClient();
  const [loops, setLoops] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    loop_id: '',
    category: '',
    image_url: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isProd = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

  useEffect(() => {
    const fetchLoops = async () => {
      const { data, error } = await supabase.from('loops').select('id, name');
      if (error) console.error('Error fetching loops:', error);
      else setLoops(data || []);
    };
    fetchLoops();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProd) return;

    setIsSubmitting(true);
    const { error } = await supabase.from('listings').insert([formData]);
    setIsSubmitting(false);

    if (error) {
      console.error(error);
      alert('Failed to create listing');
    } else {
      alert('Listing created successfully');
      setFormData({ title: '', description: '', loop_id: '', category: '', image_url: '' });
    }
  };

  return (
    <div className="form-wrapper" style={{ padding: '2rem' }}>
      <h1>Create a Listing</h1>
      {isProd && <p>Listing creation is disabled in this environment.</p>}
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title *" disabled={isProd} required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" disabled={isProd} />
        <select name="loop_id" value={formData.loop_id} onChange={handleChange} disabled={isProd} required>
          <option value="">— Select loop —</option>
          {loops.map(loop => (
            <option key={loop.id} value={loop.id}>{loop.name}</option>
          ))}
        </select>
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" disabled={isProd} />
        <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Image URL (https)" disabled={isProd} />
        <button type="submit" disabled={isProd || isSubmitting}>
          {isProd ? 'Creation disabled' : isSubmitting ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
