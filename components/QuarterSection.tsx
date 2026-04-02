'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useVibe } from '@/context/VibeContext';

interface QuarterSectionProps {
  quarter: string;
  title: string;
  subtitle: string;
  body: string;
  imgSrc?: string;
  reverse?: boolean;
  stat?: { value: string; label: string };
  children?: React.ReactNode;
}

export default function QuarterSection({
  quarter,
  title,
  subtitle,
  body,
  imgSrc,
  reverse = false,
  stat,
  children,
}: QuarterSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLSpanElement>(null);
  const { isAfterHours } = useVibe();

  useEffect(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    const accentLine = accentLineRef.current;
    if (!el || !content) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          content.style.opacity = '1';
          content.style.transform = 'translateY(0) translateX(0)';
          
          // Animate accent line
          if (accentLine) {
            accentLine.style.opacity = '1';
            accentLine.style.transform = 'scaleX(1)';
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: imgSrc ? '1fr 1fr' : '1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
          direction: reverse ? 'rtl' : 'ltr',
        }}
        className="responsive-quarter-grid"
      >
        {/* Text content */}
        <div
          ref={contentRef}
          style={{
            direction: 'ltr',
            opacity: 0,
            transform: reverse ? 'translateX(40px)' : 'translateX(-40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="quarter-label">{quarter}</p>

          <h2
            className="distort-header"
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              lineHeight: 1.0,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: 'white',
              marginBottom: 8,
            }}
          >
            {title}
          </h2>
          <h3
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: '#C8102E',
              marginBottom: 24,
            }}
          >
            {subtitle}
          </h3>

          <span 
            ref={accentLineRef}
            className="accent-line"
            style={{
              display: 'block',
              height: 3,
              width: 60,
              background: '#C8102E',
              marginBottom: 24,
              opacity: 0,
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          />

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.8,
              maxWidth: 480,
              marginBottom: stat ? 32 : 0,
            }}
          >
            {body}
          </p>

          {stat && (
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                gap: 4,
                padding: '16px 28px',
                background: 'rgba(200,16,46,0.1)',
                border: '1px solid rgba(200,16,46,0.3)',
                borderRadius: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'Anton', Impact, sans-serif",
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  color: '#C8102E',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.7rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {stat.label}
              </span>
            </div>
          )}

          {children && <div style={{ marginTop: 32 }}>{children}</div>}
        </div>

        {/* Image / visual */}
        {imgSrc && (
          <div
            style={{
              direction: 'ltr',
              position: 'relative',
              borderRadius: 16,
              overflow: 'hidden',
              aspectRatio: '4/3',
              background: isAfterHours ? '#1a0008' : '#1c1c1c',
              border: '1px solid rgba(200,16,46,0.15)',
            }}
          >
            <Image
              src={imgSrc}
              alt={`${quarter} - ${title}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />

            {/* Crimson corner accent */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 4,
                background: '#C8102E',
                zIndex: 10,
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-quarter-grid {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
          }
        }
      `}</style>
    </section>
  );
}
