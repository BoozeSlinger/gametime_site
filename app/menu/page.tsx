'use client';

import { useState, useCallback } from 'react';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import MenuSection from '@/components/MenuSection';
import Footer from '@/components/Footer';
import ScrollStopwatch from '@/components/ScrollStopwatch';
import { useVibe } from '@/context/VibeContext';

export default function FullMenuPage() {
  const [loaded, setLoaded] = useState(false);
  const { isAfterHours } = useVibe();

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease 0.2s',
          background: isAfterHours ? '#080008' : 'var(--charcoal)',
          minHeight: '100vh',
          paddingTop: 72, // for Nav
        }}
      >
        <Nav />

        <main>
          {/* Header Section */}
          <section
            style={{
              padding: '120px 40px 60px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'var(--crimson)',
                marginBottom: 20,
                opacity: 0.9,
              }}
            >
              — CRAFTED FOR THE GAME —
            </p>
            <h1
              style={{
                fontFamily: "'Anton', Impact, sans-serif",
                fontSize: 'clamp(3rem, 10vw, 6rem)',
                lineHeight: 0.9,
                color: 'white',
                marginBottom: 24,
                textTransform: 'uppercase',
              }}
            >
              THE FULL MENU
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.2rem',
                color: 'rgba(255,255,255,0.65)',
                maxWidth: 700,
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              From scratch-made appetizers to our legendary entrees and signature cocktails. Every item is a playmaker.
            </p>
          </section>

          {/* Full Organized Menu */}
          <MenuSection />
          
          <div className="section-sep" />
        </main>

        <Footer />
        <ScrollStopwatch />
      </div>
    </>
  );
}
