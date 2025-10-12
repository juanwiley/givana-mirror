// src/components/Header.js
'use client';
import Link from 'next/link';
import Image from 'next/image';
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

function isActive(href, pathname) {
  if (href === '/') return pathname === '/' || pathname === '/landing';
  return pathname === href;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // close on ESC
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const isProd = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link href="/" className={s.brand} aria-label="Givana home">
          <Image
            src="/givana-horizontal.png"
            alt="Givana logo"
            className={s.logo}
            width={320}
            height={80}
            priority
          />
          {!isProd && <span className={s.envBadge}>STAGING</span>}
        </Link>

        {/* Desktop nav */}
        <nav className={s.navDesktop} aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${s.navLink} ${
                isActive(item.href, pathname) ? s.navLinkActive : ''
              }`}
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
          <span className={s.burger} aria-hidden="true" />
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
              className={`${s.navMobileLink} ${
                isActive(item.href, pathname) ? s.navLinkActive : ''
              }`}
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
