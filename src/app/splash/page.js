'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const navigatedRef = useRef(false);

  const goNext = useCallback(() => {
    if (navigatedRef.current) return;
    navigatedRef.current = true;

// ⬅️ ADD: stop browser from restoring scroll on nav
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // ⬅️ ADD: make sure we start at the top
    window.scrollTo(0, 0);

    // ⬅️ ADD: ensure Next.js scrolls to top (belt & suspenders)
    router.replace('/landing', { scroll: true }); // was: router.replace('/landing')
  }, [router]);

  useEffect(() => {
	router.prefetch('/landing');
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    const t = setTimeout(goNext, 8000);
    return () => clearTimeout(t);
  }, [goNext]);

  return (
    <div
      className="splash"
      style={{
        backgroundColor: '#ffffff',
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        position: 'fixed',
	inset: 0,
      }}
    >
      <video
        className="video-fit"
        autoPlay
        muted
        playsInline
        onCanPlay={() => setReady(true)}
        onEnded={goNext}
      >
        <source
          src={isMobile ? '/videos/splash-mobile.mp4' : '/videos/splash-desktop.mp4'}
          type="video/mp4"
        />
      </video>

      {!ready && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            pointerEvents: 'none',
            background: 'rgba(255,255,255,0.85)',
          }}
        >
          <p style={{ color: '#344f63', fontWeight: 700, letterSpacing: 0.2 }}>
            Loading Givana…
          </p>
        </div>
      )}
    </div>
  );
}
