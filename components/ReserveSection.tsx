'use client';

import { useState } from 'react';
import { useVibe } from '@/context/VibeContext';

export default function ReserveSection() {
  const { isAfterHours } = useVibe();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="reserve"
      style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
        background: isAfterHours
          ? 'linear-gradient(to bottom, #080008, #0a0005)'
          : 'linear-gradient(to bottom, #0a0a0a, var(--charcoal))',
        transition: 'background 0.6s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vw',
          maxWidth: 800,
          maxHeight: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,16,46,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="quarter-label" style={{ justifyContent: 'center' }}>Final Play</p>
          <h2
            className="distort-header"
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            Reserve Your Booth
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
            Game day groups, private events, or just claiming the best seat in the house — we&apos;ve got you.
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              textAlign: 'center',
              padding: 48,
              background: 'rgba(200,16,46,0.08)',
              border: '1px solid rgba(200,16,46,0.3)',
              borderRadius: 12,
            }}
          >
            <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '2rem', color: 'white', letterSpacing: '0.04em', marginBottom: 12 }}>
              YOU&apos;RE IN THE GAME
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
              We&apos;ll confirm your reservation within 2 hours. See you at the bar!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              background: '#111',
              border: '1px solid #1e1e1e',
              borderRadius: 12,
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>
                  First Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="First"
                  style={{
                    background: '#0f0f0f',
                    border: '1px solid #2a2a2a',
                    borderRadius: 6,
                    padding: '12px 16px',
                    color: 'white',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#C8102E'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#2a2a2a'; }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Last"
                  style={{
                    background: '#0f0f0f',
                    border: '1px solid #2a2a2a',
                    borderRadius: 6,
                    padding: '12px 16px',
                    color: 'white',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#C8102E'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#2a2a2a'; }}
                />
              </div>
            </div>

            {[
              { label: 'Email', type: 'email', placeholder: 'your@email.com' },
              { label: 'Phone', type: 'tel', placeholder: '(555) 555-5555' },
            ].map(({ label, type, placeholder }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>
                  {label}
                </label>
                <input
                  type={type}
                  required
                  placeholder={placeholder}
                  style={{
                    background: '#0f0f0f',
                    border: '1px solid #2a2a2a',
                    borderRadius: 6,
                    padding: '12px 16px',
                    color: 'white',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#C8102E'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#2a2a2a'; }}
                />
              </div>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>
                  Date
                </label>
                <input
                  type="date"
                  required
                  style={{
                    background: '#0f0f0f',
                    border: '1px solid #2a2a2a',
                    borderRadius: 6,
                    padding: '12px 16px',
                    color: 'white',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    outline: 'none',
                    colorScheme: 'dark',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#C8102E'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#2a2a2a'; }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>
                  Party Size
                </label>
                <select
                  style={{
                    background: '#0f0f0f',
                    border: '1px solid #2a2a2a',
                    borderRadius: 6,
                    padding: '12px 16px',
                    color: 'white',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#C8102E'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#2a2a2a'; }}
                >
                  {[2,3,4,5,6,8,10,'10+'].map((n) => (
                    <option key={n} value={n}>{n} guests</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>
                Special Requests (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Game preference, accessibility needs, occasion..."
                style={{
                  background: '#0f0f0f',
                  border: '1px solid #2a2a2a',
                  borderRadius: 6,
                  padding: '12px 16px',
                  color: 'white',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#C8102E'; }}
                onBlur={(e) => { e.target.style.borderColor = '#2a2a2a'; }}
              />
            </div>

            <button type="submit" className="btn-crimson" style={{ width: '100%', marginTop: 8 }}>
              Confirm Reservation <span className="btn-arrow">→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
