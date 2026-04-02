'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollStopwatch from '@/components/ScrollStopwatch';
import { useVibe } from '@/context/VibeContext';
import Image from 'next/image';
import { getCloudinaryUrl, BARTENDER_IMAGES, IMAGE_DIMENSIONS } from '@/config/images';

interface Bartender {
  id: string;
  name: string;
  bio: string;
  specialty: string;
  image: string;
}

const getBartenderImages = () => ({
  sarah: getCloudinaryUrl(BARTENDER_IMAGES.sarah, { ...IMAGE_DIMENSIONS.profile, quality: 'high', gravity: 'face' }),
  jessica: getCloudinaryUrl(BARTENDER_IMAGES.jessica, { ...IMAGE_DIMENSIONS.profile, quality: 'high', gravity: 'face' }),
  amanda: getCloudinaryUrl(BARTENDER_IMAGES.amanda, { ...IMAGE_DIMENSIONS.profile, quality: 'high', gravity: 'face' }),
});

const bartenders: Bartender[] = [
  {
    id: '1',
    name: 'Sarah',
    bio: 'Master mixologist with 8 years of craft cocktail experience. Sarah specializes in classic cocktails with a modern twist.',
    specialty: 'Classic & Contemporary Cocktails',
    image: getBartenderImages().sarah,
  },
  {
    id: '2',
    name: 'Jessica',
    bio: 'Award-winning bartender known for her innovative spirit-forward drinks and perfect pours. Jessica brings energy to every shift.',
    specialty: 'Spirit-Forward & Innovation',
    image: getBartenderImages().jessica,
  },
  {
    id: '3',
    name: 'Amanda',
    bio: 'Beverage director and craft beer expert. Amanda knows our taps inside and out and loves sharing recommendations.',
    specialty: 'Craft Beer & Pours',
    image: getBartenderImages().amanda,
  },
];

export default function OurGirlsPage() {
  const { isAfterHours } = useVibe();
  const vibe = isAfterHours ? 'afterhours' : 'gameday';

  return (
    <>
      <Nav />

      <main className="min-h-screen bg-charcoal text-white">
        {/* Hero Section */}
        <section className="px-6 py-20 md:py-32 border-b border-charcoal-light">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-1 bg-crimson"></span>
              <span className="text-sm font-display letter-spacing-wide text-crimson">
                THE CREW
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">
              Our Girls
            </h1>
            <p className="text-lg text-grey-light leading-relaxed max-w-2xl">
              Meet the bartenders who bring GameTime to life. Expert mixologists, craft beer enthusiasts, and your favorite pour artists. They're the heart of our bar.
            </p>
          </div>
        </section>

        {/* Bartender Profiles Grid */}
        <section className="px-6 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bartenders.map((bartender) => (
                <div
                  key={bartender.id}
                  className="group bg-charcoal-mid border border-charcoal-light rounded-lg overflow-hidden hover:border-crimson transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden bg-charcoal-light">
                    <Image
                      src={bartender.image}
                      alt={bartender.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={false}
                      unoptimized
                    />
                    {/* Crimson Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl mb-2">{bartender.name}</h3>

                    <p className="text-crimson text-sm font-semibold mb-4 tracking-wide">
                      {bartender.specialty}
                    </p>

                    <p className="text-grey-light text-sm leading-relaxed mb-4">
                      {bartender.bio}
                    </p>

                    <button className="btn-outline text-xs w-full">
                      Find Them Behind the Bar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 md:py-28 border-t border-charcoal-light">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-6">
              Come Experience the GameTime Difference
            </h2>
            <p className="text-grey-light mb-8 leading-relaxed">
              Stop by and let our crew craft your next favorite drink. Whether it's game day energy or late-night vibes, they've got the perfect pour waiting.
            </p>
            <a href="/#reserve" className="btn-crimson">
              Reserve Your Seat
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollStopwatch />
    </>
  );
}
