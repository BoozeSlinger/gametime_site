'use client';

import { useVibe } from '@/context/VibeContext';
import Link from 'next/link';
import { menuData } from '@/lib/menuData';

export default function FeaturedMenu() {
  const { isAfterHours } = useVibe();

  // Pick 5 top items to feature
  const featuredItems = [
    { ...menuData[0].items[0], categoryId: menuData[0].id }, // Blitz Formation Shrimp
    { ...menuData[0].items[2], categoryId: menuData[0].id }, // Poke Nachos
    { ...menuData[1].items[9], categoryId: menuData[1].id }, // Gametime Burger
    { ...menuData[1].items[0], categoryId: menuData[1].id }, // Wings
    { ...menuData[3].items[0], categoryId: menuData[3].id }, // Churro Fries
  ];

  return (
    <section
      id="featured-menu"
      style={{
        padding: '80px 40px',
        background: isAfterHours ? '#080008' : 'var(--charcoal)',
        transition: 'background 0.8s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'var(--crimson)',
              marginBottom: 20,
              opacity: 0.9,
            }}
          >
            — GAME CHANGERS —
          </p>
          <h2
            style={{
              fontFamily: "'Anton', Impact, 'Arial Black', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              lineHeight: 0.95,
              color: 'white',
              marginBottom: 20,
              textTransform: 'uppercase',
            }}
          >
            Fan Favorites
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            Our most requested items, built for the game and the after party.
          </p>
        </div>

        {/* Featured Items Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
            marginBottom: 60,
          }}
        >
          {featuredItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              style={{
                background: isAfterHours ? '#1a0008' : 'var(--charcoal-mid)',
                border: `1px solid ${isAfterHours ? 'rgba(200,16,46,0.3)' : '#2a2a2a'}`,
                padding: 24,
                borderRadius: 12,
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--crimson)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = isAfterHours ? 'rgba(200,16,46,0.3)' : '#2a2a2a';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ 
                  fontFamily: "'Anton', sans-serif", 
                  fontSize: '1.2rem', 
                  color: 'white', 
                  textTransform: 'uppercase',
                  lineHeight: 1.1
                }}>
                  {item.name}
                </h3>
                <span style={{ 
                  fontFamily: "'Anton', sans-serif", 
                  fontSize: '1rem', 
                  color: 'var(--crimson)' 
                }}>
                  {item.price}
                </span>
              </div>
              <p style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '0.8rem', 
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.5,
                flex: 1
              }}>
                {item.description || 'Our signature house special.'}
              </p>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/menu" className="btn-crimson" style={{ padding: '16px 48px', fontSize: '1rem' }}>
            VIEW FULL MENU
          </Link>
        </div>
      </div>
    </section>
  );
}
