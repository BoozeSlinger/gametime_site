'use client';

import { useEffect, useRef, useState } from 'react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const handRef = useRef<SVGLineElement>(null);
  const fillRef = useRef<SVGRectElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2200;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(Math.round(pct * 100));

      if (handRef.current) {
        const deg = pct * 360 * 2;
        handRef.current.style.transform = `rotate(${deg}deg)`;
        handRef.current.style.transformOrigin = '50% 58%';
      }

      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          if (loaderRef.current) {
            loaderRef.current.style.transition =
              'opacity 0.6s ease, transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)';
            loaderRef.current.style.opacity = '0';
            loaderRef.current.style.transform = 'translateY(-100%)';
          }
          setTimeout(() => {
            setHidden(true);
            onComplete();
          }, 850);
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  if (hidden) return null;

  const fillHeight = (progress / 100) * 52;

  return (
    <div
      ref={loaderRef}
      id="loader"
      style={{ background: '#121212' }}
    >
      {/* Stopwatch SVG */}
      <svg
        width="96"
        height="112"
        viewBox="0 0 96 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="watchFill">
            <rect
              x="6"
              y={12 + (52 - fillHeight)}
              width="84"
              height={fillHeight}
              rx="0"
            />
          </clipPath>
        </defs>

        {/* Crown / button top */}
        <rect x="38" y="2" width="20" height="8" rx="4" fill="#2a2a2a" stroke="#444" strokeWidth="1.5" />
        <rect x="44" y="0" width="8" height="6" rx="2" fill="#3a3a3a" />

        {/* Side button */}
        <rect x="72" y="14" width="10" height="6" rx="3" fill="#2a2a2a" stroke="#444" strokeWidth="1" />

        {/* Watch face fill (crimson rising) */}
        <circle cx="48" cy="64" r="42" fill="#C8102E" clipPath="url(#watchFill)" opacity="0.9" />

        {/* Watch face ring */}
        <circle cx="48" cy="64" r="42" stroke="#C8102E" strokeWidth="3" fill="none" />
        <circle cx="48" cy="64" r="38" stroke="#222" strokeWidth="1" fill="#0f0f0f" />

        {/* Tick marks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const cx = 48 + 34 * Math.sin(angle);
          const cy = 64 - 34 * Math.cos(angle);
          const ix = 48 + 30 * Math.sin(angle);
          const iy = 64 - 30 * Math.cos(angle);
          return (
            <line
              key={i}
              x1={ix} y1={iy} x2={cx} y2={cy}
              stroke={i % 3 === 0 ? '#C8102E' : '#333'}
              strokeWidth={i % 3 === 0 ? 2 : 1}
            />
          );
        })}

        {/* Center dot */}
        <circle cx="48" cy="64" r="3" fill="#C8102E" />

        {/* Second hand (rotates) */}
        <line
          ref={handRef}
          x1="48"
          y1="64"
          x2="48"
          y2="30"
          stroke="#C8102E"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transformOrigin: '48px 64px' }}
        />

        {/* Minute hand */}
        <line
          x1="48" y1="64" x2="62" y2="52"
          stroke="white" strokeWidth="2.5" strokeLinecap="round"
        />

        {/* Hour hand */}
        <line
          x1="48" y1="64" x2="48" y2="46"
          stroke="white" strokeWidth="3" strokeLinecap="round"
        />
      </svg>

      {/* Brand */}
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: "'Anton', 'Impact', sans-serif",
            fontSize: '2rem',
            letterSpacing: '0.08em',
            color: 'white',
            lineHeight: 1,
          }}
        >
          GAMETIME
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            color: '#C8102E',
            marginTop: 4,
            textTransform: 'uppercase',
          }}
        >
          Sports Bar &amp; Grill
        </p>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 200,
          height: 2,
          background: '#2a2a2a',
          borderRadius: 1,
          overflow: 'hidden',
          marginTop: 8,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#C8102E',
            transition: 'width 0.05s linear',
          }}
        />
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.7rem',
          color: '#555',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        {progress}%
      </p>
    </div>
  );
}
