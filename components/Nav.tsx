'use client';

import { useEffect, useState } from 'react';
import { useVibe } from '@/context/VibeContext';
import VibeToggle from './VibeToggle';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { isAfterHours } = useVibe();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: '0 40px',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled
          ? isAfterHours
            ? 'rgba(8,0,8,0.92)'
            : 'rgba(12,12,12,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,16,46,0.15)' : 'none',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <svg width="32" height="36" viewBox="0 0 96 112" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="38" y="2" width="20" height="8" rx="4" fill="#3a3a3a" />
          <circle cx="48" cy="64" r="42" stroke="#C8102E" strokeWidth="3" fill="none" />
          <circle cx="48" cy="64" r="38" fill="#121212" />
          <circle cx="48" cy="64" r="3" fill="#C8102E" />
          <line x1="48" y1="64" x2="48" y2="30" stroke="#C8102E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="48" y1="64" x2="64" y2="52" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div>
          <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.2rem', letterSpacing: '0.06em', color: 'white', lineHeight: 1 }}>
            GAMETIME
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.5rem', letterSpacing: '0.35em', color: '#C8102E', textTransform: 'uppercase' }}>
            Sports Bar &amp; Grill
          </p>
        </div>
      </a>

      {/* Nav links — desktop */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <div
          style={{ display: 'flex', gap: 28 }}
          className="hidden md:flex"
        >
          {[
            { label: 'Menu', href: '/menu' },
            { label: 'Taps', href: '#taps' },
            { label: 'Games', href: '#games' },
            { label: 'Our Girls', href: '/our-girls' },
            { label: 'Reserve', href: '#reserve' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C8102E'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <VibeToggle compact />

        <a
          href="#reserve"
          className="btn-crimson hidden md:inline-block"
          style={{ fontSize: '0.75rem', padding: '10px 24px' }}
        >
          Reserve
        </a>
      </div>
    </nav>
  );
}
