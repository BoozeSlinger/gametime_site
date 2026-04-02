'use client';

import { useVibe } from '@/context/VibeContext';
import { menuData } from '@/lib/menuData';

export default function Menu() {
  const { isAfterHours } = useVibe();

  return (
    <section
      id="menu"
      style={{
        padding: '80px 40px',
        background: isAfterHours ? '#080008' : 'var(--charcoal)',
        transition: 'background 0.8s ease',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
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
            — FUEL YOUR GAME —
          </p>
          <h2
            style={{
              fontFamily: "'Anton', Impact, 'Arial Black', sans-serif",
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              lineHeight: 0.95,
              color: 'white',
              marginBottom: 20,
              textTransform: 'uppercase',
              textShadow: isAfterHours
                ? '0 0 60px rgba(200,16,46,0.3)'
                : '0 4px 30px rgba(0,0,0,0.8)',
              transition: 'text-shadow 0.8s ease',
            }}
          >
            The Menu
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.7,
              letterSpacing: '0.02em',
            }}
          >
            Cold craft pours, legendary food, and legendary moments. Every item crafted for the game.
          </p>
        </div>

        {/* Menu Categories */}
        {menuData.map((category) => (
          <div key={category.id} style={{ marginBottom: 100 }}>
            {/* Category Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 48,
              }}
            >
              <div
                style={{
                  fontSize: '2.5rem',
                  lineHeight: 1,
                }}
              >
                {category.emoji}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Anton', 'Impact', sans-serif",
                    fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: 'var(--crimson)',
                    marginBottom: 4,
                  }}
                >
                  — {category.title.toUpperCase()} —
                </p>
              </div>
            </div>

            {/* Items Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 24,
              }}
            >
              {category.items.map((item, idx) => (
                <div
                  key={`${category.id}-${idx}`}
                  className="menu-card"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    borderRadius: 12,
                    background: isAfterHours ? '#1a0008' : 'var(--charcoal-mid)',
                    border: `1px solid ${isAfterHours ? 'rgba(200,16,46,0.4)' : '#2a2a2a'}`,
                    transition: 'border-color 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--crimson)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    if (isAfterHours) {
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(200,16,46,0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isAfterHours ? 'rgba(200,16,46,0.4)' : '#2a2a2a';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Image Background */}
                  <div
                    style={{
                      position: 'relative',
                      height: 200,
                      overflow: 'hidden',
                      background: 'linear-gradient(135deg, #1a0008 0%, #2a0010 100%)',
                    }}
                  >
                    <img
                      src={`https://res.cloudinary.com/dqj3xyvey/image/upload/w_400,h_300,c_fill,f_auto/splash/${category.id}-${idx % 3}`}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.7,
                        transition: 'opacity 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {/* Overlay gradient */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8))',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: 20,
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Anton', 'Impact', sans-serif",
                        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                        color: 'white',
                        marginBottom: 8,
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em',
                        textDecoration: item.outOfStock ? 'line-through' : 'none',
                        opacity: item.outOfStock ? 0.5 : 1,
                        transition: 'opacity 0.2s ease',
                      }}
                    >
                      {item.name}
                    </h3>

                    {item.description && (
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.8rem',
                          color: 'rgba(255,255,255,0.6)',
                          marginBottom: 12,
                          lineHeight: 1.5,
                          flex: 1,
                          textDecoration: item.outOfStock ? 'line-through' : 'none',
                          opacity: item.outOfStock ? 0.5 : 1,
                          transition: 'opacity 0.2s ease',
                        }}
                      >
                        {item.description}
                      </p>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginTop: 'auto',
                        paddingTop: 12,
                        borderTop: '1px solid rgba(200,16,46,0.2)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Anton', sans-serif",
                          fontSize: '1.1rem',
                          color: 'var(--crimson)',
                          fontWeight: 'bold',
                          textDecoration: item.outOfStock ? 'line-through' : 'none',
                          opacity: item.outOfStock ? 0.5 : 1,
                          transition: 'opacity 0.2s ease',
                        }}
                      >
                        {item.price}
                      </span>

                      {item.outOfStock && (
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.65rem',
                            color: 'rgba(200,16,46,0.8)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            fontWeight: 600,
                          }}
                        >
                          Out
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Category Separator */}
            {menuData.indexOf(category) < menuData.length - 1 && (
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: `linear-gradient(to right, transparent, var(--crimson), transparent)`,
                  opacity: 0.3,
                  margin: '60px 0',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}