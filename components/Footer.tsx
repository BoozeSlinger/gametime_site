'use client';

import { useVibe } from '@/context/VibeContext';

export default function Footer() {
  const { isAfterHours } = useVibe();

  return (
    <footer
      style={{
        background: isAfterHours ? '#050005' : '#0a0a0a',
        borderTop: '1px solid rgba(200,16,46,0.15)',
        padding: 'clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px) 32px',
        transition: 'background 0.6s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <svg width="28" height="32" viewBox="0 0 96 112" fill="none">
                <rect x="38" y="2" width="20" height="8" rx="4" fill="#2a2a2a" />
                <circle cx="48" cy="64" r="42" stroke="#C8102E" strokeWidth="3" fill="none" />
                <circle cx="48" cy="64" r="38" fill="#121212" />
                <circle cx="48" cy="64" r="3" fill="#C8102E" />
                <line x1="48" y1="64" x2="48" y2="30" stroke="#C8102E" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="48" y1="64" x2="64" y2="52" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <div>
                <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.1rem', letterSpacing: '0.06em', color: 'white' }}>GAMETIME</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.5rem', letterSpacing: '0.3em', color: '#C8102E', textTransform: 'uppercase' }}>Sports Bar & Grill</p>
              </div>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 220 }}>
              Your game. Our passion. Every screen, every game, every night.
            </p>
          </div>

          {/* Hours */}
          <div>
            <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', color: '#C8102E', textTransform: 'uppercase', marginBottom: 16 }}>
              Hours
            </p>
            {[
              { day: 'Mon – Thu', time: '11am – 12am' },
              { day: 'Friday', time: '11am – 2am' },
              { day: 'Saturday', time: '10am – 2am' },
              { day: 'Sunday', time: '10am – 12am' },
            ].map(({ day, time }) => (
              <div key={day} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, gap: 16 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>{day}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'white' }}>{time}</span>
              </div>
            ))}
          </div>

          {/* Links */}
          <div>
            <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', color: '#C8102E', textTransform: 'uppercase', marginBottom: 16 }}>
              Quick Links
            </p>
            {[
              { label: 'Menu', href: '/menu' },
              { label: 'Taps & Games', href: '#taps' },
              { label: 'Reserve a Booth', href: '#reserve' },
              { label: 'Private Events', href: '#' },
              { label: 'Catering', href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: 'block',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  marginBottom: 10,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C8102E'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', color: '#C8102E', textTransform: 'uppercase', marginBottom: 16 }}>
              Find Us
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 16 }}>
              123 Game Day Blvd<br />
              Your City, ST 00000
            </p>
            <a
              href="tel:5555555555"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'white', textDecoration: 'none', display: 'block', marginBottom: 8 }}
            >
              (555) 555-5555
            </a>
            <a
              href="mailto:hello@gametimebar.com"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
            >
              hello@gametimebar.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} GameTime Sports Bar & Grill. All rights reserved. Please drink responsibly.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Accessibility'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.25)',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
