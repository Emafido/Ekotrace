'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { SafeImage } from './SafeImage';
import { ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger, motion, prefersReducedMotion } from '@/lib/motion';

interface StoryMoment {
  word: string;
  theme: string;
  description: string;
  image: string;
  alt: string;
  link: string;
  linkText: string;
}

const MOMENTS: StoryMoment[] = [
  {
    word: 'Ritual.',
    theme: 'Isale Eko Lineage',
    description: 'When the Opambata staff touches the earth, three centuries of ancestral sovereignty awaken across historic Lagos Island.',
    image: '/images/cultural/eyo-festival.jpg',
    alt: 'Eyo festival masquerade procession',
    link: '/explore/eyo-festival',
    linkText: 'Explore Adamu Orisha',
  },
  {
    word: 'Craft.',
    theme: 'Textile Alchemy',
    description: 'Before synthetic dyes reached coastal ports, master dyers drew sacred cosmologies in fermented cassava paste and indigo pits.',
    image: '/images/cultural/adire-eleko-craft.jpg',
    alt: 'Yoruba Adire Eleko workshop',
    link: '/explore/adire-eleko-craft',
    linkText: 'Explore Adire Craft',
  },
  {
    word: 'Taste.',
    theme: 'Nocturnal Hearthways',
    description: 'Thinly sliced beef, fragrant hardwood embers, and northern Yaji spice uniting neighborhoods through seven decades of night culture.',
    image: '/images/cultural/lagos-suya-heritage.jpg',
    alt: 'Lagos suya grilling on open embers',
    link: '/explore/lagos-suya-heritage',
    linkText: 'Explore Night Foodways',
  },
  {
    word: 'Memory.',
    theme: 'Lagoon Architecture',
    description: 'Hardwood stilts driven deep into lagoon mud, where generations of Egun fishermen preserve aquatic civil engineering.',
    image: '/images/cultural/makoko-waterfront-heritage.jpg',
    alt: 'Makoko waterfront stilt settlement',
    link: '/explore/makoko-waterfront-heritage',
    linkText: 'Explore Lagoon Heritage',
  },
  {
    word: 'Celebration.',
    theme: 'Afro-Brazilian Caretta',
    description: 'Brass horns, samba rhythms, and papier-mâché bulls tracing the 19th-century return of emancipated families to Popo Aguda.',
    image: '/images/cultural/fanti-carnival.jpg',
    alt: 'Fanti carnival Caretta parade',
    link: '/explore/fanti-carnival',
    linkText: 'Explore Caretta Carnival',
  },
];

export const ScrollytellingStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopPinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const isReduced = prefersReducedMotion();
    if (isReduced) return;

    // Use gsap.matchMedia for device-specific behavior:
    // Desktop: Pinned scrollytelling
    // Tablet: Simplified lightweight pinned or smooth step
    // Mobile: NO pinning! Natural vertical sequence.
    const mm = gsap.matchMedia();

    // Desktop & Tablet (>=768px)
    mm.add('(min-width: 768px)', (ctx: gsap.Context) => {
      if (!desktopPinRef.current || !containerRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>('.scrolly-text-step');
      
      panels.forEach((panel: HTMLElement, i: number) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

      // Pin the visual half
      ScrollTrigger.create({
        trigger: desktopPinRef.current,
        start: 'top 15%',
        end: 'bottom 85%',
        pin: '.scrolly-image-pin',
        pinSpacing: false,
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      {/* Section Header */}
      <div className="border-b border-[#E8E3D8] pb-4 mb-8 sm:mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B4441F] font-semibold">
          Lagos Scrollytelling
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-medium text-[#161615] mt-1 tracking-tight">
          Lagos is more than a destination.
        </h2>
        <p className="text-sm sm:text-base text-[#5A5954] mt-2 max-w-2xl font-light">
          A living city of ritual, craft, nocturnal taste, coastal memory, and celebratory resistance.
        </p>
      </div>

      {/* ===================================================================
          DESKTOP & TABLET EXPERIENCE (>=768px): PINNED SCROLLYTELLING
      =================================================================== */}
      <div ref={desktopPinRef} className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-14 relative">
        {/* Left: Scrollable Text Steps */}
        <div className="md:col-span-6 space-y-36 py-12">
          {MOMENTS.map((moment, idx) => {
            const isCurrent = activeIndex === idx;
            return (
              <div
                key={moment.word}
                className={`scrolly-text-step min-h-[48vh] flex flex-col justify-center space-y-4 p-6 sm:p-8 rounded-sm transition-all duration-500 ${
                  isCurrent
                    ? 'bg-[#FAF7F0] border-l-4 border-[#B4441F] shadow-xs'
                    : 'bg-transparent border-l-4 border-transparent opacity-40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#8C887B]">
                    0{idx + 1}
                  </span>
                  <span className="text-xs text-[#A6A296]">•</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#B4441F] font-semibold">
                    {moment.theme}
                  </span>
                </div>

                <h3 className="font-editorial text-4xl lg:text-6xl font-semibold tracking-tight text-[#161615]">
                  {moment.word}
                </h3>

                <p className="text-base lg:text-lg text-[#484843] leading-relaxed font-light">
                  {moment.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={moment.link}
                    className="inline-flex items-center gap-1.5 text-xs lg:text-sm font-medium text-[#161615] hover:text-[#B4441F] group min-h-[44px] transition-colors"
                  >
                    <span>{moment.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Pinned Visual Presentation */}
        <div className="md:col-span-6 relative">
          <div className="scrolly-image-pin sticky top-24 w-full aspect-[4/5] rounded-sm overflow-hidden bg-[#E2DDD0] border border-[#DDD8CA] shadow-xl">
            {MOMENTS.map((moment, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <div
                  key={moment.word}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <SafeImage
                    src={moment.image}
                    alt={moment.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 45vw"
                    priority={idx === 0}
                    fallbackCategory={moment.word}
                    imgClassName={`transition-transform duration-1000 ease-out ${
                      isCurrent ? 'scale-100' : 'scale-105'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161615]/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 text-white z-10 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8E3D8]">
                      Living Cultural Gateway
                    </span>
                    <p className="font-editorial text-xl font-medium">
                      {moment.word} {moment.theme}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================================================================
          MOBILE EXPERIENCE (<768px): NO PINNING!
          Clean natural vertical flow where each word and image reveals naturally.
      =================================================================== */}
      <div className="md:hidden space-y-10">
        {MOMENTS.map((moment, idx) => (
          <div
            key={moment.word}
            className="bg-[#FAF7F0] border border-[#E8E3D8] rounded-sm overflow-hidden space-y-4 p-5"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-[#E5E0D2]">
              <SafeImage
                src={moment.image}
                alt={moment.alt}
                fill
                sizes="100vw"
                fallbackCategory={moment.word}
              />
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#161615]/80 text-white rounded-sm">
                  0{idx + 1} • {moment.theme}
                </span>
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-2">
              <h3 className="font-editorial text-3xl font-semibold text-[#161615]">
                {moment.word}
              </h3>
              <p className="text-sm text-[#4E4D47] leading-relaxed font-light">
                {moment.description}
              </p>
              <div className="pt-2">
                <Link
                  href={moment.link}
                  className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-[#B4441F] hover:text-[#8F3314]"
                >
                  <span>{moment.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
