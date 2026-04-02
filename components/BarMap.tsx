'use client';

import { useState } from 'react';
import { useVibe } from '@/context/VibeContext';

interface Zone {
  id: string;
  label: string;
  crowd: 'Full House' | 'Busy' | 'Open Seating';
  sports: string;
  seats: string;
  feature?: string;
  color: string;
  // Isometric SVG polygon points
  points: string;
  labelX: number;
  labelY: number;
}

const ZONES: Zone[] = [
  {
    id: 'main-bar',
    label: 'Main Bar',
    crowd: 'Full House',
    sports: 'NFL Sunday Ticket · Sound-ON',
    seats: '18 bar stools',
    feature: 'Sound-On Premier League',
    color: '#C8102E',
    points: '200,80 340,140 340,220 200,280 60,220 60,140',
    labelX: 200,
    labelY: 185,
  },
  {
    id: 'booth-a',
    label: 'Booth Zone A',
    crowd: 'Busy',
    sports: 'NBA on ESPN · HD Display',
    seats: '6 booths · 4 guests each',
    color: '#8B1020',
    points: '340,140 460,80 460,180 340,220',
    labelX: 400,
    labelY: 155,
  },
  {
    id: 'booth-b',
    label: 'Booth Zone B',
    crowd: 'Open Seating',
    sports: 'MLB Extra Innings · All Games',
    seats: '8 booths · 4-6 guests',
    color: '#6B0C18',
    points: '60,140 200,80 200,160 60,220',
    labelX: 118,
    labelY: 155,
  },
  {
    id: 'patio',
    label: 'Patio Bar',
    crowd: 'Open Seating',
    sports: 'NHL Center Ice · Patio Screens',
    seats: 'Outdoor · 40 seats',
    feature: 'Dog-Friendly',
    color: '#4a0a10',
    points: '200,280 340,220 380,310 200,380 20,310 60,220',
    labelX: 200,
    labelY: 315,
  },
  {
    id: 'vip',
    label: 'VIP Loft',
    crowd: 'Open Seating',
    sports: 'All Packages · Private Sound System',
    seats: 'Private · Up to 20 guests',
    feature: 'Reservations Required',
    color: '#C8102E',
    points: '200,40 270,10 400,60 340,100 200,80 60,100',
    labelX: 200,
    labelY: 62,
  },
];

const CROWD_CONFIG = {
  'Full House': { bg: 'rgba(200,16,46,0.15)', border: '#C8102E', color: '#C8102E', dot: '#C8102E' },
  'Busy': { bg: 'rgba(251,146,60,0.1)', border: '#f97316', color: '#f97316', dot: '#f97316' },
  'Open Seating': { bg: 'rgba(34,197,94,0.1)', border: '#22c55e', color: '#22c55e', dot: '#22c55e' },
};

export default function BarMap() {
  const { isAfterHours } = useVibe();
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const active = ZONES.find((z) => z.id === activeZone);
  const crowdConfig = active ? CROWD_CONFIG[active.crowd] : null;

  return (
    <section
      id="map"
      style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
        background: isAfterHours ? '#080008' : '#0a0a0a',
        transition: 'background 0.6s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <p className="quarter-label" style={{ justifyContent: 'center' }}>Overtime</p>
          <h2
            className="distort-header"
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              marginBottom: 8,
            }}
          >
            Find Your Spot
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
            Hover a zone to see live availability and what&apos;s playing.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 48,
            alignItems: 'center',
          }}
        >
          {/* Isometric SVG Map */}
          <div style={{ position: 'relative' }}>
            <svg
              viewBox="0 0 460 400"
              style={{
                width: '100%',
                maxWidth: 460,
                filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.6))',
                display: 'block',
                margin: '0 auto',
              }}
            >
              {/* Background */}
              <rect x="0" y="0" width="460" height="400" fill="#0f0f0f" rx="12" />

              {/* Grid lines */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0" y1={i * 40} x2="460" y2={i * 40}
                  stroke="rgba(255,255,255,0.03)" strokeWidth="1"
                />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * 40} y1="0" x2={i * 40} y2="400"
                  stroke="rgba(255,255,255,0.03)" strokeWidth="1"
                />
              ))}

              {/* Zone polygons */}
              {ZONES.map((zone) => {
                const isActive = activeZone === zone.id;
                return (
                  <g key={zone.id}>
                    <polygon
                      points={zone.points}
                      fill={zone.color}
                      opacity={isActive ? 0.85 : 0.3}
                      stroke={isActive ? zone.color : 'rgba(200,16,46,0.2)'}
                      strokeWidth={isActive ? 2 : 1}
                      className="zone-path"
                      onMouseEnter={() => setActiveZone(zone.id)}
                      onMouseLeave={() => setActiveZone(null)}
                      style={{
                        filter: isActive
                          ? `drop-shadow(0 0 12px ${zone.color})`
                          : 'none',
                        transition: 'opacity 0.25s ease, filter 0.25s ease',
                        cursor: 'pointer',
                      }}
                    />
                    <text
                      x={zone.labelX}
                      y={zone.labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontFamily: "'Anton', Impact, sans-serif",
                        fontSize: 10,
                        fill: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        pointerEvents: 'none',
                        transition: 'fill 0.25s ease',
                      }}
                    >
                      {zone.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}

              {/* Bar label */}
              <text
                x="230"
                y="392"
                textAnchor="middle"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 8,
                  fill: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                GAMETIME SPORTS BAR &amp; GRILL — FLOOR PLAN
              </text>
            </svg>
          </div>

          {/* Zone info panel */}
          <div>
            {active && crowdConfig ? (
              <div
                style={{
                  background: '#111',
                  border: `1px solid ${active.color}`,
                  borderRadius: 12,
                  padding: 32,
                  boxShadow: `0 0 40px rgba(200,16,46,0.12)`,
                  transition: 'all 0.3s ease',
                }}
              >
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', letterSpacing: '0.35em', color: '#888', textTransform: 'uppercase', marginBottom: 8 }}>
                  Zone Details
                </p>
                <h3
                  style={{
                    fontFamily: "'Anton', Impact, sans-serif",
                    fontSize: '1.8rem',
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: 20,
                  }}
                >
                  {active.label}
                </h3>

                {/* Crowd status */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    borderRadius: 100,
                    background: crowdConfig.bg,
                    border: `1px solid ${crowdConfig.border}`,
                    marginBottom: 24,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: crowdConfig.dot,
                      animation: active.crowd === 'Full House' ? 'livePulse 1.5s ease-in-out infinite' : 'none',
                    }}
                  />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: crowdConfig.color, letterSpacing: '0.08em' }}>
                    {active.crowd}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#555', textTransform: 'uppercase', marginBottom: 4 }}>
                      What&apos;s Playing
                    </p>
                    <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '1rem', color: 'white', letterSpacing: '0.04em' }}>
                      {active.sports}
                    </p>
                  </div>

                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#555', textTransform: 'uppercase', marginBottom: 4 }}>
                      Seating
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)' }}>
                      {active.seats}
                    </p>
                  </div>

                  {active.feature && (
                    <div
                      style={{
                        padding: '10px 16px',
                        background: 'rgba(200,16,46,0.08)',
                        border: '1px solid rgba(200,16,46,0.2)',
                        borderRadius: 6,
                      }}
                    >
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#C8102E', fontWeight: 600 }}>
                        ★ {active.feature}
                      </p>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 28 }}>
                  <a href="#reserve" className="btn-crimson" style={{ fontSize: '0.8rem', padding: '12px 28px' }}>
                    Reserve This Zone
                  </a>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: '#111',
                  border: '1px solid #1e1e1e',
                  borderRadius: 12,
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Anton', Impact, sans-serif",
                    fontSize: '1.4rem',
                    color: 'rgba(255,255,255,0.25)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Hover a Zone
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
                  Select any zone on the map to see live crowd levels, available sports packages, and reservation options.
                </p>

                {/* Zone legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                  {ZONES.map((z) => {
                    const cc = CROWD_CONFIG[z.crowd];
                    return (
                      <div
                        key={z.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderBottom: '1px solid #1a1a1a',
                        }}
                      >
                        <span style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>
                          {z.label.toUpperCase()}
                        </span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: cc.color, fontWeight: 600 }}>
                          {z.crowd}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
