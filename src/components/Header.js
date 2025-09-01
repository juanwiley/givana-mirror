'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Logo → splash, Home → landing
const NAV = [
  { label: 'Home', href: '/landing' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Loops', href: '/loops' },
  { label: 'Browse Listings', href: '/listings' },
  { label: 'Offer Help', href: '/new-listing' },
  { label: 'Impact', href: '/impact' },
  { label: 'Account', href: '/account' },
];


  const isActive = (href) =>
    href && (pathname === href || (href !== '/' && pathname.startsWith(href)));

  if (pathname === '/splash') return null;

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo -> /splash */}
        <Link href="/splash" aria-label="Givana Splash" className="logo">
          <img src="/givana-horizontal.png" alt="Givana Logo"
               style={{ height: 80, width: 'auto', display: 'block' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop" aria-label="Primary">
          {NAV.map(({ label, href }) =>
            href ? (
              <Link key={label} href={href} className={isActive(href) ? 'active' : ''}>
                {label}
              </Link>
            ) : (
              <span key={label} className="inactive desktop-only">{label}</span>
            )
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          <span className={`bar ${open ? 'open' : ''}`} />
        </button>

        {/* Mobile dropdown (links only) */}
        <nav id="mobile-menu" className={`nav-mobile ${open ? 'show' : ''}`} aria-label="Mobile Primary">
          <ul className="nav-mobile-list">
            {NAV.filter(i => i.href).map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className={isActive(href) ? 'active' : ''}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
