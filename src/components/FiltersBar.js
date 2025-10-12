// src/components/FiltersBar.js
'use client';

import styles from './FiltersBar.module.css';

const CATEGORIES = ['All', 'Furniture', 'Clothing', 'Toys', 'Electronics', 'Free'];

export default function FiltersBar({ value, onChange }) {
  const { q = '', type = 'all', category = 'all' } = value || {};

  function patch(update) {
    onChange?.({ ...value, ...update });
  }

  return (
    <div className={styles.wrap} role="search">
      <input
        className={styles.input}
        type="search"
        placeholder="Search listings…"
        value={q}
        onChange={(e) => patch({ q: e.target.value })}
        aria-label="Search listings"
      />

      <select
        className={styles.select}
        value={type}
        onChange={(e) => patch({ type: e.target.value })}
        aria-label="Listing type"
      >
        <option value="all">All types</option>
        <option value="offer">Offers</option>
        <option value="request">Requests</option>
      </select>

      <select
        className={styles.select}
        value={category}
        onChange={(e) => patch({ category: e.target.value })}
        aria-label="Category"
      >
        {CATEGORIES.map((c) => {
          const val = c.toLowerCase();
          return (
            <option key={val} value={val}>
              {c}
            </option>
          );
        })}
      </select>
    </div>
  );
}
