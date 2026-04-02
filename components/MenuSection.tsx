'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useVibe } from '@/context/VibeContext';
import { getCloudinaryUrl, MENU_IMAGES, IMAGE_DIMENSIONS } from '@/config/images';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tag?: string;
  videoPlaceholder?: string;
  image?: string;
}

interface MenuCategory {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
}

const getMenuImages = () => ({
  wings: getCloudinaryUrl(MENU_IMAGES.starters.wings, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  nachos: getCloudinaryUrl(MENU_IMAGES.starters.nachos, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  calamari: getCloudinaryUrl(MENU_IMAGES.starters.calamari, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  cornDip: getCloudinaryUrl(MENU_IMAGES.starters.cornDip, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  blitzBurger: getCloudinaryUrl(MENU_IMAGES.burgers.blitz, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  crimsonCowboy: getCloudinaryUrl(MENU_IMAGES.burgers.crimsonCowboy, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  blackBlue: getCloudinaryUrl(MENU_IMAGES.burgers.blackBlue, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  mushroomRanch: getCloudinaryUrl(MENU_IMAGES.burgers.mushroomRanch, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  oldFashioned: getCloudinaryUrl(MENU_IMAGES.cocktails.oldFashioned, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  crimsonMule: getCloudinaryUrl(MENU_IMAGES.cocktails.crimsonMule, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  playmaker: getCloudinaryUrl(MENU_IMAGES.cocktails.playmaker, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  victoryLap: getCloudinaryUrl(MENU_IMAGES.cocktails.victoryLap, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  pretzelBoard: getCloudinaryUrl(MENU_IMAGES.shareables.pretzelBoard, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  slidersTrio: getCloudinaryUrl(MENU_IMAGES.shareables.slidersTrio, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  charcuterie: getCloudinaryUrl(MENU_IMAGES.shareables.charcuterie, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
  flatbreadFlight: getCloudinaryUrl(MENU_IMAGES.shareables.flatbreadFlight, { ...IMAGE_DIMENSIONS.menu, quality: 'medium' }),
});

const MENU: MenuCategory[] = [
  {
    id: 'starters',
    label: 'Starters',
    emoji: '🔥',
    items: [
      { name: 'GameTime Wings', description: 'Choice of sauce: Buffalo, BBQ, Honey Garlic, or Dry Rub. Served with blue cheese.', price: '$16', tag: 'Fan Favorite', image: getMenuImages().wings },
      { name: 'Loaded Nachos', description: 'House-fried chips, queso, jalapeños, pico, sour cream & guac.', price: '$14', image: getMenuImages().nachos },
      { name: 'Crispy Calamari', description: 'Flash-fried, served with chipotle aioli and lemon.', price: '$13', image: getMenuImages().calamari },
      { name: 'Street Corn Dip', description: 'Elote-style roasted corn with cotija, chili, lime crema.', price: '$11', image: getMenuImages().cornDip },
    ],
  },
  {
    id: 'burgers',
    label: 'Burgers',
    emoji: '🍔',
    items: [
      { name: 'The Blitz Burger', description: 'Smash patty, American cheese, pickles, shredded lettuce, GT sauce on a brioche bun.', price: '$18', tag: 'Signature', image: getMenuImages().blitzBurger },
      { name: 'Crimson Cowboy', description: 'Double smash, jalapeño bacon, pepper jack, crispy onions.', price: '$21', image: getMenuImages().crimsonCowboy },
      { name: 'Black & Blue', description: 'Wagyu blend, gorgonzola butter, arugula, caramelized onion.', price: '$24', image: getMenuImages().blackBlue },
      { name: 'Mushroom Ranch Stack', description: 'Sautéed mushrooms, Swiss, house ranch, tomato jam.', price: '$19', image: getMenuImages().mushroomRanch },
    ],
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    emoji: '🍸',
    items: [
      { name: 'Overtime Old Fashioned', description: 'Rye whiskey, Demerara syrup, Angostura & orange bitters, smoked orange peel.', price: '$14', tag: 'Award-Winning', image: getMenuImages().oldFashioned },
      { name: 'Crimson Mule', description: 'Vodka, house-made ginger beer, fresh lime, bitters, splash of cranberry.', price: '$12', image: getMenuImages().crimsonMule },
      { name: 'The Playmaker', description: 'Tequila, triple sec, blood orange, tajín rim, fresh squeeze.', price: '$13', image: getMenuImages().playmaker },
      { name: 'Victory Lap', description: 'Gin, elderflower, cucumber, fresh basil, lime, prosecco float.', price: '$13', image: getMenuImages().victoryLap },
    ],
  },
  {
    id: 'shareables',
    label: 'Shareables',
    emoji: '🤝',
    items: [
      { name: 'GT Pretzel Board', description: 'House-made soft pretzels, beer cheese, honey mustard, jalapeño jam.', price: '$17', image: getMenuImages().pretzelBoard },
      { name: 'Sliders Trio', description: 'Pulled pork, brisket, and crispy chicken — each with signature sauce.', price: '$19', tag: 'New', image: getMenuImages().slidersTrio },
      { name: 'Charcuterie & Craft', description: 'Curated selection of meats, cheeses, pickles, paired with draft recommendations.', price: '$22', image: getMenuImages().charcuterie },
      { name: 'Flatbread Flight', description: 'Three flatbreads: Margherita, BBQ Chicken, Pepperoni & Calabrese.', price: '$24', image: getMenuImages().flatbreadFlight },
    ],
  },
];

function MenuCard({ item }: { item: MenuItem }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="menu-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', minHeight: 160, overflow: 'hidden', borderRadius: 8 }}
    >
      {/* Image Container */}
      {item.image && (
        <>
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
          {/* Hover Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: isHovered
                ? 'linear-gradient(135deg, rgba(200,16,46,0.3), rgba(18,18,18,0.7))'
                : 'transparent',
              transition: 'background 0.5s ease',
              zIndex: 1,
            }}
          />
        </>
      )}

      {/* Content Box - Only show on non-image or as fallback */}
      {!item.image && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isHovered
              ? 'linear-gradient(135deg, rgba(200,16,46,0.3), rgba(18,18,18,0.7))'
              : 'transparent',
            transition: 'background 0.5s ease',
            zIndex: 1,
          }}
        />
      )}

      <div className="menu-card-content" style={{ position: 'relative', zIndex: 2 }}>
        {item.tag && (
          <span
            style={{
              background: 'rgba(200,16,46,0.2)',
              border: '1px solid rgba(200,16,46,0.4)',
              color: '#C8102E',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              padding: '2px 10px',
              borderRadius: 100,
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: 10,
            }}
          >
            {item.tag}
          </span>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
          <h4
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: '1.05rem',
              color: 'white',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 1.1,
            }}
          >
            {item.name}
          </h4>
          <span
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: '1rem',
              color: '#C8102E',
              flexShrink: 0,
            }}
          >
            {item.price}
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.6,
          }}
        >
          {item.description}
        </p>
      </div>

      {/* Hover state overlay text */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <p style={{ fontFamily: "'Anton', Impact, sans-serif", fontSize: '1.3rem', color: 'white', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {item.name}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.4rem', color: '#C8102E', fontWeight: 700 }}>
            {item.price}
          </p>
        </div>
      )}
    </div>
  );
}

export default function MenuSection() {
  const { isAfterHours } = useVibe();
  const [activeCategory, setActiveCategory] = useState('starters');
  const current = MENU.find((c) => c.id === activeCategory) || MENU[0];

  return (
    <section
      id="menu"
      style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
        background: isAfterHours ? '#0a0005' : 'var(--charcoal)',
        transition: 'background 0.6s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p className="quarter-label">4th Quarter</p>
            <h2
              className="distort-header"
              style={{
                fontFamily: "'Anton', Impact, sans-serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              THE MENU
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              Elevated bar food built for the game — and the after.
            </p>
          </div>
          <a href="#" className="btn-outline" style={{ fontSize: '0.75rem' }}>
            Full Menu PDF
          </a>
        </div>

        {/* Category tabs */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            marginBottom: 40,
            background: '#0f0f0f',
            padding: 4,
            borderRadius: 8,
            width: 'fit-content',
            flexWrap: 'wrap',
          }}
        >
          {MENU.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: activeCategory === cat.id ? '#C8102E' : 'transparent',
                color: activeCategory === cat.id ? 'white' : 'rgba(255,255,255,0.45)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 6,
                cursor: 'pointer',
                fontFamily: "'Anton', Impact, sans-serif",
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {current.items.map((item) => (
            <MenuCard key={item.name} item={item} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginBottom: 20, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Consuming raw or undercooked meats may increase your risk of foodborne illness.
          </p>
          <a href="#reserve" className="btn-crimson">
            Book a Table
          </a>
        </div>
      </div>
    </section>
  );
}
