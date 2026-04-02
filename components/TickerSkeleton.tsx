import { useVibe } from '@/context/VibeContext';

export default function TickerSkeleton() {
  const { isAfterHours } = useVibe();

  return (
    <div
      className="ticker-wrap"
      style={{
        background: isAfterHours ? '#0a0005' : 'var(--charcoal-mid)',
        borderColor: '#C8102E',
        transition: 'background 0.6s ease',
        opacity: 0.6,
      }}
    >
      <div className="ticker-tape">
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.72rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.6)',
            padding: '0 40px',
          }}
        >
          Loading games...
        </span>
      </div>
    </div>
  );
}
