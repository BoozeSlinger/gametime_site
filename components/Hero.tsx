'use client';

import { useRef, useEffect, useState } from 'react';
import { useVibe } from '@/context/VibeContext';
import VibeToggle from './VibeToggle';

const HERO_VIDEO =
  'https://res.cloudinary.com/dqj3xyvey/video/upload/v1774358874/grok_video_804d19b7_4170_4cf2_9d54_b4c72019705e_1_V1_ybvrtu.mp4';

export default function Hero() {
  const { isAfterHours } = useVibe();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setParallaxY(scrollY * 0.5); // Move at 50% of scroll speed
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle cursor-reactive light canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('mousemove', onMouseMove);

    let targetX = 0.5;
    let targetY = 0.5;
    let curX = 0.5;
    let curY = 0.5;

    const draw = () => {
      targetX = mouseRef.current.x;
      targetY = mouseRef.current.y;
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const x = curX * canvas.width;
      const y = curY * canvas.height;

      // Primary spotlight
      const g1 = ctx.createRadialGradient(x, y, 0, x, y, canvas.width * 0.5);
      g1.addColorStop(0, isAfterHours ? 'rgba(200,16,46,0.12)' : 'rgba(200,16,46,0.08)');
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Secondary ambient light
      const g2 = ctx.createRadialGradient(
        canvas.width - x * 0.5, canvas.height - y * 0.5, 0,
        canvas.width - x * 0.5, canvas.height - y * 0.5, canvas.width * 0.6
      );
      g2.addColorStop(0, 'rgba(255,255,255,0.03)');
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isAfterHours]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isAfterHours ? 0.25 : 0.38,
          filter: isAfterHours ? 'hue-rotate(15deg) saturate(1.1) brightness(0.95)' : 'hue-rotate(0deg) saturate(1) brightness(1)',
          transition: 'opacity 0.8s ease, filter 0.6s ease',
        }}
      />

      {/* Dark overlay */}
      <div
        className="hero-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: isAfterHours
            ? 'linear-gradient(to bottom, rgba(8,0,8,0.6) 0%, rgba(8,0,8,0.2) 40%, rgba(8,0,8,0.9) 100%)'
            : 'linear-gradient(to bottom, rgba(18,18,18,0.55) 0%, rgba(18,18,18,0.2) 40%, rgba(18,18,18,0.85) 100%)',
          transition: 'background 0.8s ease',
        }}
      />

      {/* Interactive light canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* After hours ambient glow */}
      {isAfterHours && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background: 'radial-gradient(ellipse at 50% 30%, rgba(200,16,46,0.1) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 900,
          transform: `translateY(${parallaxY}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: '#C8102E',
            marginBottom: 20,
            opacity: 0.9,
          }}
        >
          {isAfterHours ? '— The Night Belongs Here —' : '— Est. In Your City —'}
        </p>

        {/* Main headline */}
        <h1
          className="distort-header hero-text-1"
          style={{
            fontFamily: "'Anton', Impact, 'Arial Black', sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            lineHeight: 0.92,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            color: 'white',
            marginBottom: 8,
            textShadow: isAfterHours
              ? '0 0 80px rgba(200,16,46,0.3)'
              : '0 4px 40px rgba(0,0,0,0.8)',
            transition: 'text-shadow 0.8s ease',
          }}
        >
          {isAfterHours ? 'AFTER' : 'YOUR'}
        </h1>
        <h1
          className="distort-header hero-text-2"
          style={{
            fontFamily: "'Anton', Impact, 'Arial Black', sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            lineHeight: 0.92,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            color: '#C8102E',
            marginBottom: 8,
            textShadow: isAfterHours
              ? '0 0 60px rgba(200,16,46,0.5), 0 0 120px rgba(200,16,46,0.2)'
              : 'none',
            transition: 'text-shadow 0.8s ease, color 0.4s ease',
          }}
        >
          {isAfterHours ? 'HOURS' : 'GAME.'}
        </h1>
        <h1
          className="distort-header hero-text-3"
          style={{
            fontFamily: "'Anton', Impact, 'Arial Black', sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            lineHeight: 0.92,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            color: 'white',
            marginBottom: 40,
            textShadow: isAfterHours
              ? '0 0 80px rgba(200,16,46,0.3)'
              : '0 4px 40px rgba(0,0,0,0.8)',
            transition: 'text-shadow 0.8s ease',
          }}
        >
          {isAfterHours ? 'OUR VIBE.' : 'OUR PASSION.'}
        </h1>

        {/* Subline */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 480,
            margin: '0 auto 40px',
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}
        >
          {isAfterHours
            ? 'Craft cocktails, ambient vibes, and the best late-night bites in the game.'
            : 'Every screen. Every game. Cold craft pours & legendary food — all under one roof.'}
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/menu" className="btn-crimson">View Menu</a>
          <a href="#reserve" className="btn-outline">Book a Booth</a>
        </div>
      </div>

      {/* Vibe Toggle */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
        }}
      >
        <VibeToggle />
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: 0.5,
        }}
      >
        <div
          style={{
            width: 1,
            height: 32,
            background: 'linear-gradient(to bottom, transparent, rgba(200,16,46,0.8))',
            animation: 'scrollHintPulse 2s ease-in-out infinite',
          }}
        />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
          Scroll
        </p>
      </div>

      <style>{`
        @keyframes scrollHintPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(0.8); }
          50% { opacity: 0.9; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
