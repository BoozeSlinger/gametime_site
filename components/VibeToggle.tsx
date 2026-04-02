'use client';

import { useVibe } from '@/context/VibeContext';
import { motion } from 'framer-motion';

interface Props {
  compact?: boolean;
}

export default function VibeToggle({ compact = false }: Props) {
  const { isAfterHours, toggleVibe } = useVibe();

  if (compact) {
    return (
      <button
        onClick={toggleVibe}
        title={isAfterHours ? 'Switch to Gameday Mode' : 'Switch to After Hours Mode'}
        style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 100,
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          transition: 'border-color 0.3s ease',
          borderColor: isAfterHours ? 'rgba(200,16,46,0.6)' : 'rgba(255,255,255,0.15)',
        }}
      >
        <div
          style={{
            width: 28,
            height: 16,
            borderRadius: 8,
            background: isAfterHours ? '#1a0008' : '#2a2a2a',
            border: `1px solid ${isAfterHours ? '#C8102E' : '#444'}`,
            position: 'relative',
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
        >
          <motion.div
            animate={{ x: isAfterHours ? 12 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              position: 'absolute',
              top: 2,
              left: 2,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: isAfterHours ? '#C8102E' : '#888',
            }}
          />
        </div>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: isAfterHours ? '#C8102E' : 'rgba(255,255,255,0.5)',
          fontWeight: 600,
        }}>
          {isAfterHours ? 'After Hours' : 'Gameday'}
        </span>
      </button>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '12px 24px',
        borderRadius: 100,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span
        style={{
          fontFamily: "'Anton', Impact, sans-serif",
          fontSize: '0.8rem',
          letterSpacing: '0.15em',
          color: !isAfterHours ? 'white' : 'rgba(255,255,255,0.3)',
          transition: 'color 0.3s ease',
        }}
      >
        GAMEDAY
      </span>

      {/* Track */}
      <button
        onClick={toggleVibe}
        className={`vibe-track ${isAfterHours ? 'after-hours' : ''}`}
        style={{
          width: 56,
          height: 28,
          borderRadius: 14,
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <motion.div
          animate={{ x: isAfterHours ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: 600, damping: 32 }}
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: isAfterHours
              ? 'radial-gradient(circle at 40% 40%, #ff2244, #C8102E)'
              : 'radial-gradient(circle at 40% 40%, #aaa, #666)',
            boxShadow: isAfterHours ? '0 0 12px rgba(200,16,46,0.8)' : 'none',
          }}
        />
      </button>

      <span
        style={{
          fontFamily: "'Anton', Impact, sans-serif",
          fontSize: '0.8rem',
          letterSpacing: '0.15em',
          color: isAfterHours ? '#C8102E' : 'rgba(255,255,255,0.3)',
          transition: 'color 0.3s ease',
        }}
      >
        AFTER HOURS
      </span>
    </div>
  );
}
