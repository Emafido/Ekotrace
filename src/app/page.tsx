'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CULTURAL_ASSETS } from '@/data/culturalAssets';
import { EventCard } from '@/components/EventCard';
import { CulturalCard } from '@/components/CulturalCard';
import { CategoryLink } from '@/components/CategoryLink';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ClaimDrawer } from '@/components/ClaimDrawer';
import { SafeImage } from '@/components/SafeImage';
import { ScrollytellingStory } from '@/components/ScrollytellingStory';
import { CulturalBackground } from '@/components/CulturalBackground';
import { Claim, CulturalAssetType } from '@/types';
import { ArrowRight, ShieldCheck, Sparkles, Heart } from 'lucide-react';
import { gsap, ScrollTrigger, motion, prefersReducedMotion } from '@/lib/motion';

export default function HomePage() {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeCategoryPreview, setActiveCategoryPreview] = useState<string>('/images/cultural/eyo-festival.jpg');

  const pageContainerRef = useRef<HTMLDivElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const happeningSectionRef = useRef<HTMLElement>(null);
  const featuredStorySectionRef = useRef<HTMLElement>(null);
  const discoverSectionRef = useRef<HTMLElement>(null);

  // Filter 4 events for "Happening in Lagos"
  const happeningEvents = CULTURAL_ASSETS.filter((a) => a.happeningNow).slice(0, 4);

  // Seeded records for Discover Lagos mixed grid
  const discoverAssets = CULTURAL_ASSETS;

  // Eyo festival for featured story and trust claim
  const eyoAsset = CULTURAL_ASSETS.find((a) => a.id === 'eyo-festival') || CULTURAL_ASSETS[0];
  const trustSampleClaim = eyoAsset.claims[0];

  const handleOpenClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsDrawerOpen(true);
  };

  const categories: { type: CulturalAssetType; label: string; desc: string; preview: string }[] = [
    { type: 'festival', label: 'Festivals', desc: 'Civic masquerades, carnivals, and sacred processions', preview: '/images/cultural/eyo-festival.jpg' },
    { type: 'place', label: 'Places', desc: 'Galleries, architectural sanctuaries, and historic quarters', preview: '/images/cultural/nike-art-gallery.jpg' },
    { type: 'tradition', label: 'Traditions', desc: 'Living rituals, ancestor veneration, and royal rites', preview: '/images/cultural/gelede-festival.jpg' },
    { type: 'food', label: 'Food', desc: 'Nocturnal grilling, street delicacies, and heritage recipes', preview: '/images/cultural/lagos-suya-heritage.jpg' },
    { type: 'craft', label: 'Crafts', desc: 'Adire indigo dyeing, wood carving, and beadwork guilds', preview: '/images/cultural/adire-eleko-craft.jpg' },
    { type: 'story', label: 'Stories', desc: 'Waterfront oral histories, migration sagas, and memory', preview: '/images/cultural/makoko-waterfront-heritage.jpg' },
  ];

  // GSAP Animations with matchMedia — Unhurried, living cultural motion
  useEffect(() => {
    const isReduced = prefersReducedMotion();
    if (isReduced) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // =====================================================================
      // 1. UNHURRIED HERO ANIMATION SEQUENCE — Let the visitor live in the moment
      // =====================================================================
      mm.add('(min-width: 1024px)', () => {
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 1. Warm welcoming greeting label
        heroTl.fromTo(
          '[data-hero-label]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.1
        );

        // 2. Headline reveals line-by-line with majestic, unhurried ease
        heroTl.fromTo(
          '.hero-headline-line',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.25, stagger: 0.22, ease: 'power3.out' },
          0.25
        );

        // 3. Supporting copy gently unfolds
        heroTl.fromTo(
          '[data-hero-copy]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0 },
          0.75
        );

        // 4. CTAs float into place
        heroTl.fromTo(
          '[data-hero-ctas]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.95
        );

        // 5. Hero photograph reveals with cinematic wipe & unhurried scale settle
        if (heroImageContainerRef.current && heroImageRef.current) {
          heroTl.fromTo(
            heroImageContainerRef.current,
            { clipPath: 'inset(0% 100% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power3.inOut' },
            0.45
          );
          heroTl.fromTo(
            heroImageRef.current,
            { scale: 1.08 },
            { scale: 1, duration: 1.8, ease: 'power2.out' },
            0.45
          );

          // Subtle ScrollTrigger Parallax on Hero Image
          gsap.to(heroImageContainerRef.current, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: heroImageContainerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      });

      mm.add('(max-width: 1023px)', () => {
        // Mobile & Tablet: Warm, smooth sequence with breathing room
        const mobileTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        mobileTl.fromTo(
          '[data-hero-label]',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.1
        );

        mobileTl.fromTo(
          '.hero-headline-line',
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.16, ease: 'power3.out' },
          0.2
        );

        mobileTl.fromTo(
          '[data-hero-copy]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.5
        );

        mobileTl.fromTo(
          '[data-hero-ctas]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.7
        );

        if (heroImageContainerRef.current) {
          mobileTl.fromTo(
            heroImageContainerRef.current,
            { opacity: 0, scale: 1.03 },
            { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
            0.4
          );
        }
      });

      // =====================================================================
      // 2. HAPPENING IN LAGOS (ScrollTrigger staggered entrance)
      // =====================================================================
      if (happeningSectionRef.current) {
        gsap.fromTo(
          happeningSectionRef.current.querySelectorAll('[data-event-card]'),
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: motion.normal,
            stagger: 0.09,
            ease: motion.easeOut,
            scrollTrigger: {
              trigger: happeningSectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // =====================================================================
      // 3. FEATURED STORY ("Behind the white robes of Eyo")
      // =====================================================================
      if (featuredStorySectionRef.current) {
        const storyCard = featuredStorySectionRef.current;
        gsap.fromTo(
          storyCard.querySelector('[data-story-quote]'),
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: motion.reveal,
            ease: motion.editorial,
            scrollTrigger: {
              trigger: storyCard,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // =====================================================================
      // 4. DISCOVER LAGOS (Staggered Grid)
      // =====================================================================
      if (discoverSectionRef.current) {
        gsap.fromTo(
          discoverSectionRef.current.querySelectorAll('[data-discover-card]'),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: motion.normal,
            stagger: 0.08,
            ease: motion.easeOut,
            scrollTrigger: {
              trigger: discoverSectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, pageContainerRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <div ref={pageContainerRef} className="relative overflow-hidden space-y-16 sm:space-y-20 lg:space-y-28 pb-16 sm:pb-24">
      {/* ===================================================================
          HERO SECTION
          Sequence: label -> headline (line mask) -> copy -> CTAs -> hero image (wipe)
          Culture -> discovery -> emotion (Trust marketing moved lower!)
      =================================================================== */}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Warm Golden Sunlight & Adire Geometry */}
        <CulturalBackground variant="hero" showPattern={true} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7">
            {/* 1. Welcoming Cultural Label */}
            <div
              data-hero-label
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#FDF6E8] border border-[#E8D4B0] rounded-sm text-xs font-mono tracking-wider text-[#8F3314] shadow-2xs"
            >
              <span className="font-bold text-[#B4441F]">Ẹ̀kú àbọ̀ sí Èkó</span>
              <span className="text-[#D0B78A]">•</span>
              <span className="text-[#69655D]">Welcome to Living Lagos • Isale Eko • Popo Aguda</span>
            </div>

            {/* 2. Headline with Line-Level Mask Reveal */}
            <h1 className="font-editorial text-[38px] sm:text-5xl lg:text-7xl font-medium tracking-tight text-[#161615] leading-[1.08]">
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-line block">
                  Explore Lagos through
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-headline-line block">
                  the people who live it.
                </span>
              </span>
            </h1>

            {/* 3. Supporting Copy */}
            <p
              data-hero-copy
              className="text-base sm:text-lg lg:text-xl text-[#4A4944] leading-relaxed max-w-2xl font-light"
            >
              Discover festivals, traditions, places, nocturnal foodways, crafts, and living stories — with information you can trace back to oral custodians and community evidence.
            </p>

            {/* 4. Action CTAs */}
            <div
              data-hero-ctas
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Link
                href="/explore"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#161615] hover:bg-[#B4441F] text-[#FAF9F5] font-medium text-sm sm:text-base px-6 py-3.5 rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B4441F] active:scale-[0.98]"
              >
                <span>Explore Lagos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contribute"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#FAF5EB] hover:bg-[#F2ECE1] text-[#161615] border border-[#D4CEBF] font-medium text-sm sm:text-base px-6 py-3.5 rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B4441F] active:scale-[0.98]"
              >
                <span>Contribute what you know</span>
              </Link>
            </div>
          </div>

          {/* 5 & 6. Hero Cultural Photography — Unobstructed, pristine photo container */}
          <div className="lg:col-span-5 relative">
            <div
              ref={heroImageContainerRef}
              className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full rounded-sm overflow-hidden bg-[#E5E0D2] border border-[#DDD8CA] shadow-xl"
            >
              <div ref={heroImageRef} className="w-full h-full relative">
                <SafeImage
                  src={eyoAsset.coverImage}
                  alt={eyoAsset.coverImageAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 40vw"
                  objectPosition={eyoAsset.coverImagePosition || 'center 20%'}
                  fallbackCategory="Lagos Cultural Hero"
                />
              </div>
            </div>

            {/* Dedicated Editorial Caption Bar BELOW the Photo — Zero Overlap on Image! */}
            <div className="mt-3 px-4 py-2.5 bg-[#FAF5EC] border border-[#E6DECE] rounded-sm flex items-center justify-between text-xs font-mono text-[#69655D] shadow-xs">
              <div className="flex items-center gap-2 truncate">
                <span className="font-semibold text-[#161615]">Adamu Orisha Custodians</span>
                <span className="text-[#A89F8E]">•</span>
                <span className="truncate">Isale Eko Lineage</span>
              </div>
              <span className="shrink-0 text-[11px] px-2 py-0.5 bg-[#EDE4D2] text-[#8F3314] rounded-xs font-semibold">
                Documentary Record
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          HAPPENING NOW (HAPPENING IN LAGOS)
          ScrollTrigger staggered entrance, mobile touch-friendly scroll
      =================================================================== */}
      <section
        ref={happeningSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E8E3D8] pb-3 sm:pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B4441F] font-semibold">
              Seasonal Calendar
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-medium text-[#161615] mt-0.5">
              Happening in Lagos
            </h2>
          </div>
          <Link
            href="/explore?category=festival"
            className="text-xs sm:text-sm font-medium text-[#161615] hover:text-[#B4441F] inline-flex items-center gap-1 group transition-colors py-1 min-h-[44px]"
          >
            <span>View all festival dates</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive grid: native touch-friendly horizontal snap on mobile, 2 cols on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {happeningEvents.map((event, idx) => (
            <div key={event.id} data-event-card>
              <EventCard asset={event} priority={idx === 0} />
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================
          EXPLORE CULTURE
          Desktop hover interaction with imagery & underline
          Mobile tactile 2-column touch layout
      =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="border-b border-[#E8E3D8] pb-3 sm:pb-4 flex items-end justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#73736C]">
              Curated Discovery
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-medium text-[#161615] mt-0.5">
              Explore culture
            </h2>
          </div>
          <span className="hidden sm:inline text-xs font-mono text-[#8C887B]">
            Interactive categories
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {categories.map((cat) => {
            const count = CULTURAL_ASSETS.filter((a) => a.type === cat.type).length;
            return (
              <CategoryLink
                key={cat.type}
                type={cat.type}
                label={cat.label}
                count={count}
                description={cat.desc}
                onHover={() => setActiveCategoryPreview(cat.preview)}
              />
            );
          })}
        </div>
      </section>

      {/* ===================================================================
          MEMORABLE SCROLLYTELLING SECTION
          "Lagos is more than a destination."
          Ritual • Craft • Taste • Memory • Celebration
      =================================================================== */}
      <ScrollytellingStory />

      {/* ===================================================================
          FEATURED STORY
          "Behind the white robes of Eyo"
          Subtle reveal, readable editorial storytelling
      =================================================================== */}
      <section ref={featuredStorySectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FDFBF7] border border-[#E8E2D2] rounded-sm p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Story Image — 100% visible, no overlay text */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-[#E2DDD0] border border-[#DDD6C7] shadow-md">
                <SafeImage
                  src={eyoAsset.coverImage}
                  alt={eyoAsset.coverImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  objectPosition={eyoAsset.coverImagePosition || 'center 20%'}
                  fallbackCategory="Featured Editorial Story"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs text-[#73736C] font-mono px-1">
                <span className="font-semibold text-[#161615]">Isale Eko Heritage Circle</span>
                <span>Oral Custodianship • Archival Photo</span>
              </div>
            </div>

            {/* Story Editorial Content */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F5EDE1] text-[#8F3314] rounded-xs text-[11px] font-mono uppercase tracking-wider font-semibold">
                  <span>Oral History Feature</span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#161615] leading-[1.12]">
                  Behind the white robes of Eyo
                </h3>
              </div>

              <blockquote data-story-quote className="border-l-2 border-[#B4441F] pl-4 italic text-[#3E3D39] text-base sm:text-lg font-editorial bg-[#FAF5EC] py-3 pr-3 rounded-r-xs">
                “When the staff of Adamu Orisha strikes the earth of Isale Eko, it does not strike empty dust. It awakens three hundred years of Oba lineage.”
              </blockquote>

              <p className="text-sm sm:text-base text-[#4E4D47] leading-relaxed font-light">
                The Adimu Orisha Play is not a street carnival for casual amusement. In Lagos Island memory, each procession represents an exacting spiritual architecture. When the Iga grant consent, the Island shuts its vehicular thoroughfares. Barefoot celebrants walk under strict vows: no caps, no head-ties, and no sandals may be worn within sight of an Eyo.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  href={`/explore/${eyoAsset.slug}`}
                  className="min-h-[46px] inline-flex items-center justify-center gap-2 bg-[#161615] hover:bg-[#B4441F] text-white text-sm font-medium px-6 py-3 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
                >
                  <span>Read full cultural record</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleOpenClaim(trustSampleClaim)}
                  className="min-h-[46px] text-sm font-medium text-[#5A5954] hover:text-[#161615] underline underline-offset-4 text-center sm:text-left py-2"
                >
                  Inspect verified claims
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          DISCOVER LAGOS
          Image-Heavy Mixed Grid: 1 Col Mobile -> 2 Col Tablet -> 3 Col Desktop
      =================================================================== */}
      <section
        ref={discoverSectionRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 overflow-hidden py-4"
      >
        <CulturalBackground variant="warm" showPattern={true} />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E8E3D8] pb-3 sm:pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B4441F] font-semibold">
              Living Archive
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-medium text-[#161615] mt-0.5">
              Discover Lagos
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#73736C] max-w-sm font-light">
            Curated across visual arts, nocturnal foodways, lagoon stilt architecture, and sacred traditions.
          </p>
        </div>

        {/* Asymmetrical editorial grid: handles mobile (1 col) and tablet (2 col) gracefully */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {/* Item 1: Horizontal layout on md+ */}
          <div className="sm:col-span-2" data-discover-card>
            <CulturalCard asset={discoverAssets[1]} layout="horizontal" />
          </div>

          {/* Item 2 */}
          <div data-discover-card>
            <CulturalCard asset={discoverAssets[2]} />
          </div>

          {/* Item 3 */}
          <div data-discover-card>
            <CulturalCard asset={discoverAssets[3]} />
          </div>

          {/* Item 4 */}
          <div data-discover-card>
            <CulturalCard asset={discoverAssets[5]} />
          </div>

          {/* Item 5 */}
          <div data-discover-card>
            <CulturalCard asset={discoverAssets[6]} />
          </div>

          {/* Item 6: Horizontal layout on md+ */}
          <div className="sm:col-span-2 lg:col-span-3" data-discover-card>
            <CulturalCard asset={discoverAssets[7]} layout="horizontal" />
          </div>
        </div>
      </section>

      {/* ===================================================================
          THE TRUST LAYER (INTRODUCED HERE — LOWER IN THE HIERARCHY)
          Know where the story came from
          Contains Trust Principles Strip + Interactive Claim Card
      =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E8E3D8] p-5 sm:p-10 lg:p-12 rounded-sm space-y-6 sm:space-y-8">
          <div className="max-w-2xl space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1E5C3E] font-semibold">
              The Trust Layer
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-medium text-[#161615]">
              Know where the story came from.
            </h2>
            <p className="text-xs sm:text-base text-[#4E4D47] leading-relaxed font-light">
              Important information on EkoTrace can show its source, verification status and unresolved uncertainty. When facts conflict, we document the perspectives rather than erase them.
            </p>

            {/* Trust Principles Strip: Cleanly placed in the Trust Section */}
            <div className="pt-4 flex items-center gap-4 sm:gap-6 text-xs text-[#73736C] font-mono border-t border-[#EAE5D9] flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1E5C3E] shrink-0" />
                <span className="text-[#161615] font-medium">Community Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8E361D] shrink-0" />
                <span className="text-[#161615] font-medium">Transparent Conflicts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#734F18] shrink-0" />
                <span className="text-[#161615] font-medium">Zero Hallucinations</span>
              </div>
            </div>
          </div>

          {/* Interactive example claim card */}
          <div className="p-4 sm:p-6 bg-[#FAF9F5] border border-[#DDD8CA] rounded-sm max-w-3xl space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-wider text-[#73736C]">
                Example Cultural Claim
              </span>
              <VerificationBadge status="verified-community" size="md" />
            </div>

            <p className="font-editorial text-lg sm:text-2xl text-[#161615] leading-snug">
              “The festival takes place on Lagos Island.”
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#EAE5D9] text-xs text-[#5A5954]">
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <span className="font-mono text-[#1E5C3E] font-medium">✓ Community verified</span>
                <span className="text-[#8C887B]">•</span>
                <span className="font-mono text-[#5A5954]">3 supporting sources</span>
              </div>

              <button
                type="button"
                onClick={() => handleOpenClaim(trustSampleClaim)}
                className="font-medium text-[#161615] hover:text-[#B4441F] underline underline-offset-4 transition-colors text-left sm:text-right py-1 min-h-[44px] flex items-center"
              >
                See how verification works →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          CONTRIBUTION CTA
          Know something Lagos should remember? (Full-width on Mobile)
      =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#161615] text-[#FAF9F5] p-6 sm:p-12 lg:p-14 rounded-sm">
          <div className="max-w-3xl space-y-4 sm:space-y-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B54825]">
              Living Heritage Commons
            </span>

            <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Know something Lagos should remember?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#C7C3B3] font-light leading-relaxed">
              Help document a place, festival, tradition, craft or story from your community. Write naturally in your own voice — our verification protocol helps preserve its origin.
            </p>

            <div className="pt-2">
              <Link
                href="/contribute"
                className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B4441F] hover:bg-[#8F3314] text-white font-medium text-sm sm:text-base px-6 py-3.5 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
              >
                <span>Contribute what you know</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Claim Drawer / Mobile Bottom Sheet */}
      <ClaimDrawer
        claim={selectedClaim}
        assetName={eyoAsset.name}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
