'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { SafeImage } from './SafeImage';
import { CulturalBackground } from './CulturalBackground';
import { ArrowRight, Sparkles, Volume2, Quote } from 'lucide-react';
import { gsap, ScrollTrigger, motion, prefersReducedMotion } from '@/lib/motion';

interface StoryMoment {
  id: string;
  word: string;
  theme: string;
  yorubaTerm: string;
  description: string;
  elderQuote: string;
  elderAttribution: string;
  soundscape: string;
  image: string;
  alt: string;
  caption: string;
  provenance: string;
  link: string;
  linkText: string;
}

const MOMENTS: StoryMoment[] = [
  {
    id: 'ritual',
    word: 'Ritual.',
    theme: 'Isale Eko Sovereignty',
    yorubaTerm: 'Adamu Orisha',
    description:
      'When the sacred Opambata staff touches the earth, three centuries of ancestral sovereignty awaken across historic Lagos Island. Barefoot custodians escort the white-robed masquerades through ancient iga courtyards, enforcing solemn peace and honoring the departed Oba.',
    elderQuote:
      'When the staff of Adamu Orisha strikes the red earth of Isale Eko, it does not strike empty dust. It awakens three hundred years of Oba lineage.',
    elderAttribution: 'Isale Eko Heritage Custodians',
    soundscape: 'Rhythmic dundun talking drums, solemn footfalls, ocean wind over Lagos Island.',
    image: '/images/cultural/eyo-festival.jpg',
    alt: 'Eyo masquerade procession through Isale Eko',
    caption: 'Adamu Orisha Masquerade Procession',
    provenance: 'Documentary Record • Lagos Island Oral Archive',
    link: '/explore/eyo-festival',
    linkText: 'Explore Adamu Orisha Record',
  },
  {
    id: 'craft',
    word: 'Craft.',
    theme: 'Textile Alchemy',
    yorubaTerm: 'Adire Eleko',
    description:
      'Long before synthetic dyes reached Atlantic trading posts, Yoruba master dyers drew sacred cosmologies onto handwoven cotton. Using fermented cassava paste and deep fermented indigo pits, women artisans encoded lineage prayers that outlast generations.',
    elderQuote:
      'Every swirl on this cloth is a prayer written in cassava starch before it ever meets the indigo vat. If you rush the dye, the cloth loses its memory.',
    elderAttribution: 'Egba & Lagos Dyer Guild Elder',
    soundscape: 'Whistle of chicken feather pens on cotton, sweet scent of fermented indigo vats.',
    image: '/images/cultural/adire-eleko-craft.jpg',
    alt: 'Traditional Yoruba Adire Eleko dyer creating resist patterns',
    caption: 'Indigo Resist Dyeing Workshop',
    provenance: 'Documentary Record • Community Craft Guilds',
    link: '/explore/adire-eleko-craft',
    linkText: 'Explore Adire Craft Record',
  },
  {
    id: 'taste',
    word: 'Taste.',
    theme: 'Nocturnal Hearthways',
    yorubaTerm: 'Mai Suya',
    description:
      'As dusk cools the humid coastal air, nocturnal charcoal pits roar to life from Glover Court to Obalende. Paper-thin cuts of seasoned beef roast over hardwood embers, dusted with northern Yaji spice — uniting the entire city across seven decades of night culture.',
    elderQuote:
      'Suya is not merely food. It is the communal hearth of Lagos after midnight, where stranger and neighbor share the same paper wrapper under cedar smoke.',
    elderAttribution: 'Master Mallam of Glover Court',
    soundscape: 'Sizzle of beef fat over charcoal, crackle of hardwood, lively midnight laughter.',
    image: '/images/cultural/lagos-suya-heritage.jpg',
    alt: 'Lagos street food master grilling suya skewers over charcoal',
    caption: 'Glover Court Nocturnal Hearth',
    provenance: 'Documentary Record • Culinary Oral History',
    link: '/explore/lagos-suya-heritage',
    linkText: 'Explore Night Foodways Record',
  },
  {
    id: 'memory',
    word: 'Memory.',
    theme: 'Lagoon Architecture',
    yorubaTerm: 'Odo Makoko',
    description:
      'Hardwood stilts driven deep into lagoon silt sustain aquatic communities whose boat-builders and fishermen have lived on water for two centuries. Makoko stands as living testament to indigenous civil engineering and community endurance along the Atlantic edge.',
    elderQuote:
      'The lagoon is not our obstacle; it is our foundation. These stilts were engineered by fathers who understood that water carries what land forgets.',
    elderAttribution: 'Makoko Fishermen Community Leader',
    soundscape: 'Gentle slap of canoe paddles on brackish water, children singing across stilts.',
    image: '/images/cultural/makoko-waterfront-heritage.jpg',
    alt: 'Makoko lagoon stilt settlement and canoes at sunrise',
    caption: 'Makoko Aquatic Stilt Settlement',
    provenance: 'Documentary Record • Waterfront Community Accounts',
    link: '/explore/makoko-waterfront-heritage',
    linkText: 'Explore Lagoon Heritage Record',
  },
  {
    id: 'celebration',
    word: 'Celebration.',
    theme: 'Afro-Brazilian Caretta',
    yorubaTerm: 'Popo Aguda',
    description:
      'Brass trumpets, samba percussion, and vibrant papier-mâché bulls flood Campos Square during the Fanti Carnival. Emancipated families returning from 19th-century Bahia brought Brazilian street masquerade into creative dialogue with Yoruba ceremonial joy.',
    elderQuote:
      'When we dance the Caretta on Easter Monday, we dance with our ancestors who crossed the ocean twice and never let their music die.',
    elderAttribution: 'Popo Aguda Brazilian Quarters Custodian',
    soundscape: 'Blare of brass horns, syncopated samba whistles, rustle of tiered satin dresses.',
    image: '/images/cultural/fanti-carnival.jpg',
    alt: 'Fanti carnival Brazilian-Lagosian Caretta masquerade',
    caption: 'Campos Square Brazilian Parade',
    provenance: 'Documentary Record • Brazilian Descendants Association',
    link: '/explore/fanti-carnival',
    linkText: 'Explore Caretta Carnival Record',
  },
];

export const ScrollytellingStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const pinnedVisualRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet (>= 1024px): Smooth pinned scrollytelling experience
    mm.add('(min-width: 1024px)', (ctx: gsap.Context) => {
      if (!desktopTrackRef.current || !pinnedVisualRef.current) return;

      const steps = gsap.utils.toArray<HTMLElement>('.scrolly-narrative-step');

      // ScrollTrigger for each chapter step
      steps.forEach((step: HTMLElement, i: number) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

      // Pin the visual gallery column with pinSpacing: true
      // This strictly prevents subsequent sections from rolling over the photo!
      ScrollTrigger.create({
        trigger: desktopTrackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedVisualRef.current,
        pinSpacing: true,
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  const currentMoment = MOMENTS[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0C1521] text-[#FAF7F0] overflow-hidden rounded-sm my-12 sm:my-20 border-y border-[#1E2C3D] shadow-2xl"
    >
      {/* Ambient Nocturnal Gallery Atmosphere */}
      <CulturalBackground variant="sanctuary" showPattern={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Gallery Pavilion Header */}
        <div className="border-b border-[#213247] pb-6 mb-12 sm:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C2C3E] border border-[#2D4560] rounded-sm text-xs font-mono uppercase tracking-widest text-[#E5A93C]">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Living Cultural Pavilion • Èkó Scrollytelling</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F0] leading-tight">
            Lagos is more than a destination.
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#A7B4C4] max-w-3xl font-light leading-relaxed">
            Take your time. Step into five living chapters of sacred ritual, textile alchemy, midnight hearthways, lagoon memory, and Afro-Brazilian celebration.
          </p>
        </div>

        {/* ===================================================================
            DESKTOP IMMERSIVE EXPERIENCE (>= 1024px)
            True Split-Screen with Pinned Visual Gallery and Zero Overlap
        =================================================================== */}
        <div ref={desktopTrackRef} className="hidden lg:grid lg:grid-cols-12 gap-12 xl:gap-16 relative">
          
          {/* Left Column: Generous, Unhurried Narrative Steps */}
          <div className="lg:col-span-6 space-y-28 py-8">
            {MOMENTS.map((moment, idx) => {
              const isCurrent = activeIndex === idx;

              return (
                <div
                  key={moment.id}
                  className={`scrolly-narrative-step min-h-[75vh] flex flex-col justify-center space-y-6 p-8 sm:p-10 rounded-sm border transition-all duration-700 ${
                    isCurrent
                      ? 'bg-[#142030]/90 border-[#E5A93C]/50 shadow-2xl shadow-[#E5A93C]/5 translate-x-2'
                      : 'bg-[#101925]/30 border-transparent opacity-35 hover:opacity-60'
                  }`}
                >
                  {/* Step Metadata Header */}
                  <div className="flex items-center justify-between border-b border-[#213247] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold tracking-widest text-[#E5A93C]">
                        CHAPTER 0{idx + 1}
                      </span>
                      <span className="text-xs text-[#526478]">•</span>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#A7B4C4]">
                        {moment.yorubaTerm}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono px-2 py-0.5 bg-[#1B293A] text-[#E5A93C] rounded-sm">
                      {moment.theme}
                    </span>
                  </div>

                  {/* Chapter Big Title */}
                  <h3 className="font-editorial text-5xl xl:text-7xl font-medium tracking-tight text-[#FAF7F0] leading-none">
                    {moment.word}
                  </h3>

                  {/* Prose Description */}
                  <p className="text-base xl:text-lg text-[#C8D3E0] leading-relaxed font-light">
                    {moment.description}
                  </p>

                  {/* Elder Oral Pull Quote */}
                  <div className="p-5 bg-[#0D1622] border-l-2 border-[#E5A93C] rounded-sm space-y-2">
                    <div className="flex items-start gap-2 text-[#E5A93C]">
                      <Quote className="w-4 h-4 shrink-0 mt-0.5 opacity-80" />
                      <p className="font-editorial text-base xl:text-lg italic text-[#FAF7F0] leading-snug">
                        “{moment.elderQuote}”
                      </p>
                    </div>
                    <p className="text-[11px] font-mono text-[#899BB0] pl-6 uppercase tracking-wider">
                      — {moment.elderAttribution}
                    </p>
                  </div>

                  {/* Living Soundscape Note */}
                  <div className="flex items-center gap-2.5 text-xs text-[#9BB0C7] font-mono bg-[#162232] px-3.5 py-2 rounded-sm border border-[#23354B]">
                    <Volume2 className="w-4 h-4 text-[#E5A93C] shrink-0" />
                    <span className="italic">{moment.soundscape}</span>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link
                      href={moment.link}
                      className="min-h-[46px] inline-flex items-center gap-2 text-sm font-medium text-[#FAF7F0] bg-[#B4441F] hover:bg-[#8F3314] px-5 py-2.5 rounded-sm transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                    >
                      <span>{moment.linkText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Pinned Living Cultural Showcase (Zero Text Overlap on Photo!) */}
          <div className="lg:col-span-6 relative">
            <div
              ref={pinnedVisualRef}
              className="w-full flex flex-col space-y-4 py-8"
            >
              {/* Pristine Photograph Container — 100% visible, no overlay text obscuring it */}
              <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-[#101925] border border-[#293C52] shadow-2xl">
                {MOMENTS.map((moment, idx) => {
                  const isCurrent = activeIndex === idx;

                  return (
                    <div
                      key={moment.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      <SafeImage
                        src={moment.image}
                        alt={moment.alt}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1280px) 45vw, 600px"
                        fallbackCategory={moment.word}
                        imgClassName={`transition-transform duration-1200 ease-out ${
                          isCurrent ? 'scale-100' : 'scale-106'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Dedicated Editorial Meta Strip BELOW Photo (Never Overlapping the Art!) */}
              <div className="bg-[#142030] border border-[#23354A] rounded-sm p-4 space-y-2 shadow-lg">
                <div className="flex items-center justify-between text-xs font-mono text-[#A7B4C4]">
                  <span className="font-semibold text-[#E5A93C]">
                    {currentMoment.caption}
                  </span>
                  <span className="text-[11px] text-[#788CA3]">
                    {activeIndex + 1} of {MOMENTS.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#899BB0] border-t border-[#1F3045] pt-2">
                  <span className="truncate">{currentMoment.provenance}</span>
                  <span className="text-[#E5A93C] font-semibold">Documentary Record</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            MOBILE & TABLET EXPERIENCE (< 1024px)
            Clean Vertical Magazine Flow with Generous White Space and Zero Overlap
        =================================================================== */}
        <div className="lg:hidden space-y-16">
          {MOMENTS.map((moment, idx) => (
            <article
              key={moment.id}
              className="bg-[#131F2E] border border-[#23354A] rounded-sm overflow-hidden p-6 sm:p-8 space-y-6 shadow-xl"
            >
              {/* Chapter Tag */}
              <div className="flex items-center justify-between border-b border-[#213247] pb-3">
                <span className="text-xs font-mono font-bold text-[#E5A93C] tracking-widest">
                  CHAPTER 0{idx + 1} • {moment.yorubaTerm}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-[#1B293A] text-[#A7B4C4] rounded-sm">
                  {moment.theme}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-editorial text-3xl sm:text-4xl font-medium text-[#FAF7F0]">
                {moment.word}
              </h3>

              {/* Unobstructed Photo */}
              <div className="space-y-2">
                <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-[#0D1622] border border-[#223447]">
                  <SafeImage
                    src={moment.image}
                    alt={moment.alt}
                    fill
                    sizes="100vw"
                    fallbackCategory={moment.word}
                  />
                </div>
                {/* Photo Caption Strip Below Image */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[#899BB0] px-1">
                  <span className="font-medium text-[#C8D3E0]">{moment.caption}</span>
                  <span className="text-[#E5A93C]">Documentary</span>
                </div>
              </div>

              {/* Narrative Story */}
              <p className="text-sm sm:text-base text-[#C8D3E0] leading-relaxed font-light">
                {moment.description}
              </p>

              {/* Elder Oral Quote */}
              <blockquote className="p-4 bg-[#0B131E] border-l-2 border-[#E5A93C] rounded-sm space-y-1.5">
                <p className="font-editorial text-sm sm:text-base italic text-[#FAF7F0] leading-snug">
                  “{moment.elderQuote}”
                </p>
                <footer className="text-[10px] font-mono text-[#899BB0] uppercase tracking-wider">
                  — {moment.elderAttribution}
                </footer>
              </blockquote>

              {/* Soundscape Note */}
              <div className="flex items-center gap-2 text-xs text-[#9BB0C7] font-mono bg-[#162232] p-3 rounded-sm border border-[#23354B]">
                <Volume2 className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <span className="italic">{moment.soundscape}</span>
              </div>

              {/* Call to Action */}
              <div className="pt-2">
                <Link
                  href={moment.link}
                  className="min-h-[46px] w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-[#FAF7F0] bg-[#B4441F] hover:bg-[#8F3314] px-5 py-3 rounded-sm transition-colors"
                >
                  <span>{moment.linkText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
