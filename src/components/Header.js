// src/components/Header.js
'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import s from './Header.module.css';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/loops', label: 'Loops' },
  { href: '/listings', label: 'Browse Listings' },
  { href: '/new-listing', label: 'Offer Help' },
  { href: '/impact', label: 'Impact' },
  { href: '/account', label: 'Account' },
];

// Treat "/" as active for both "/" and "/landing"
function isActive(href, pathname) {
  if (href === '/') return pathname === '/' || pathname === '/landing';
  return pathname === href;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e) {
      if (!panelRef.current || !btnRef.current) return;
      const withinPanel = panelRef.current.contains(e.target);
      const withinButton = btnRef.current.contains(e.target);
      if (!withinPanel && !withinButton) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : prev || '';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [open]);

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link href="/" className={s.brand} aria-label="Givana home">
          <img
            src="/givana-horizontal.png"
            alt="Givana logo"
            className={s.logo}
          />
        </Link>

        {/* Desktop nav */}
        <nav className={s.navDesktop} aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${s.navLink} ${isActive(item.href, pathname) ? s.navLinkActive : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          ref={btnRef}
          className={s.mobileToggle}
          type="button"
          aria-expanded={open ? 'true' : 'false'}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={s.toggleBar} />
          <span className={s.toggleBar} />
          <span className={s.toggleBar} />
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        className={`${s.mobilePanel} ${open ? s.open : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <nav className={s.navMobile} aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={s.navMobileLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
