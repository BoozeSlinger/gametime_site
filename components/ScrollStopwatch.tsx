'use client';

import { useEffect, useState } from 'react';

export default function ScrollStopwatch() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const circumference = 2 * Math.PI * 18;
  const strokeDash = circumference * progress;
  const handAngle = progress * 360 * 3;

  return (
    <div className="scroll-stopwatch">
      <svg viewBox="0 0 52 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Crown */}
        <rect x="20" y="1" width="12" height="5" rx="2.5" fill="#2a2a2a" />

        {/* Background circle */}
        <circle cx="26" cy="33" r="20" fill="#0f0f0f" stroke="#2a2a2a" strokeWidth="1.5" />

        {/* Progress arc */}
        <circle
          cx="26"
          cy="33"
          r="18"
          fill="none"
          stroke="#C8102E"
          strokeWidth="2"
          strokeDasharray={`${strokeDash} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 26 33)"
          style={{ transition: 'stroke-dasharray 0.1s ease' }}
        />

        {/* Second hand */}
        <line
          x1="26"
          y1="33"
          x2={26 + 14 * Math.sin((handAngle * Math.PI) / 180)}
          y2={33 - 14 * Math.cos((handAngle * Math.PI) / 180)}
          stroke="#C8102E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle cx="26" cy="33" r="2.5" fill="#C8102E" />
      </svg>
    </div>
  );
}
