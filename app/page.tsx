'use client';

import { useState, useCallback } from 'react';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import FeaturedMenu from '@/components/FeaturedMenu';
import TickerServer from '@/components/TickerServer';
import QuarterSection from '@/components/QuarterSection';
import TapsBoard from '@/components/TapsBoard';
import ReserveSection from '@/components/ReserveSection';
import Footer from '@/components/Footer';
import ScrollStopwatch from '@/components/ScrollStopwatch';
import { getCloudinaryUrl, QUARTER_IMAGES, IMAGE_DIMENSIONS } from '@/config/images';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease 0.2s',
        }}
      >
        <Nav />

        <main>
          {/* HERO */}
          <Hero />

          {/* FEATURED MENU */}
          <FeaturedMenu />

          {/* TICKER TAPE */}
          <TickerServer />

          {/* 1ST QUARTER: THE ATMOSPHERE */}
          <QuarterSection
            quarter="1st Quarter"
            title="Where Every"
            subtitle="Game Comes Alive"
            body="20 HD TVs. Dedicated sound zones. Stadium lighting that puts you right in the action. Whether it's Sunday football or a midweek Premier League match, GameTime is your front-row seat."
            imgSrc={getCloudinaryUrl(QUARTER_IMAGES.atmosphere, { ...IMAGE_DIMENSIONS.quarter, quality: 'high' })}
            stat={{ value: '20', label: 'TVs' }}
          />

          <div className="section-sep" />

          {/* 2ND QUARTER: THE FOOD */}
          <QuarterSection
            quarter="2nd Quarter"
            title="Food That"
            subtitle="Hits Different"
            body="Scratch kitchen. Bold flavors. From the legendary Blitz Burger to our award-winning craft cocktails — every bite and sip is built for the moment."
            imgSrc={getCloudinaryUrl(QUARTER_IMAGES.food, { ...IMAGE_DIMENSIONS.quarter, quality: 'high' })}
            reverse
            stat={{ value: '4.9★', label: 'Guest Rating' }}
          >
            <a href="/menu" className="btn-crimson" style={{ fontSize: '0.8rem' }}>
              Explore the Full Menu
            </a>
          </QuarterSection>

          <div className="section-sep" />

          {/* TAPS & GAMES BOARD */}
          <TapsBoard />

          <div className="section-sep" />

          {/* 3RD QUARTER: THE VIBE */}
          <QuarterSection
            quarter="3rd Quarter"
            title="Your Scene,"
            subtitle="Your Rules"
            body="From raucous game-day crowds to intimate late-night cocktail sessions — GameTime shifts with you. Toggle between Gameday Mode and After Hours Mode and watch the entire experience transform."
            imgSrc={getCloudinaryUrl(QUARTER_IMAGES.vibes, { ...IMAGE_DIMENSIONS.quarter, quality: 'high' })}
            stat={{ value: '7', label: 'Distinct Zones' }}
          />

          <div className="section-sep" />

          {/* RESERVE */}
          <ReserveSection />
        </main>

        <Footer />
        <ScrollStopwatch />
      </div>
    </>
  );
}
