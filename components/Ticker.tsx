'use client';

import { useVibe } from '@/context/VibeContext';

interface TickerProps {
  items: string[];
}

export default function Ticker({ items }: TickerProps) {
  const { isAfterHours } = useVibe();
  const doubled = [...items, ...items];

  return (
    <div
      className="ticker-wrap"
      style={{
        background: isAfterHours ? '#0a0005' : 'var(--charcoal-mid)',
        borderColor: '#C8102E',
        transition: 'background 0.6s ease',
      }}
    >
      <div className="ticker-tape">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: i % 2 === 0 ? 'white' : 'rgba(255,255,255,0.6)',
              padding: '0 40px',
            }}
          >
            {item}
            <span style={{ color: '#C8102E', margin: '0 16px' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
