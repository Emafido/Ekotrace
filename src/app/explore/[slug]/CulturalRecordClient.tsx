'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CulturalAsset, Claim } from '@/types';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ClaimRow } from '@/components/ClaimRow';
import { ClaimDrawer } from '@/components/ClaimDrawer';
import { EditorialStory } from '@/components/EditorialStory';
import { SafeImage } from '@/components/SafeImage';
import { MapPin, ArrowLeft, Plus } from 'lucide-react';
import { motion, gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion';

interface CulturalRecordClientProps {
  asset: CulturalAsset;
}

export const CulturalRecordClient: React.FC<CulturalRecordClientProps> = ({ asset }) => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const claimsSectionRef = useRef<HTMLDivElement>(null);

  const handleOpenClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setDrawerOpen(true);
  };

  // Safe fallback helper - Never display 'N/A'
  const formatFactValue = (val: string | undefined) => {
    if (!val || val.trim() === '' || val.toUpperCase() === 'N/A') {
      return 'Not yet confirmed';
    }
    return val;
  };

  // GSAP Entrance Sequence & ScrollTriggers
  useEffect(() => {
    const isReduced = prefersReducedMotion();
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // 1. Initial Hero Entrance Sequence: Unhurried, majestic cultural entrance
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl
        .fromTo(
          '[data-hero-meta]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.1
        )
        .fromTo(
          '[data-hero-title]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
          0.25
        )
        .fromTo(
          '[data-hero-location]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.5
        )
        .fromTo(
          '[data-hero-image]',
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
          0.6
        );

      // 2. Key Facts on Scroll with small stagger
      if (factsRef.current) {
        gsap.fromTo(
          factsRef.current.querySelectorAll('[data-fact-item]'),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: factsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Claims Section Entrance (Trust Mode: calm, deliberate, zero bounce)
      if (claimsSectionRef.current) {
        gsap.fromTo(
          claimsSectionRef.current.querySelectorAll('[data-claim-row]'),
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: motion.trustEase,
            scrollTrigger: {
              trigger: claimsSectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="pb-16 sm:pb-24 space-y-10 sm:space-y-16">
      {/* Breadcrumb Navigation with 44px touch target */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <Link
          href="/explore"
          className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#73736C] hover:text-[#161615] transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cultural Archive</span>
        </Link>
      </div>

      {/* ===================================================================
          HEADER SECTION (Mobile-First Order)
          1. Category & Verification state
          2. Title
          3. Location
          4. Hero cultural photography (Clean, unobstructed photo with caption strip below)
      =================================================================== */}
      <header ref={heroRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-3">
          {/* 1. Category label & verification badge */}
          <div data-hero-meta className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-mono uppercase tracking-widest px-2.5 py-1 bg-[#F2ECE1] text-[#69655D] rounded-sm font-semibold">
              {asset.type}
            </span>
            <VerificationBadge status={asset.overallVerification} size="md" />
          </div>

          {/* 2. Title */}
          <h1 data-hero-title className="font-editorial text-3xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-[#161615] leading-[1.08] break-words">
            {asset.name}
          </h1>

          {/* 3. Location */}
          <div data-hero-location className="flex items-center gap-1.5 text-xs sm:text-base text-[#5A5954]">
            <MapPin className="w-4 h-4 text-[#B4441F] shrink-0" />
            <span className="font-medium">{asset.location}</span>
            {asset.neighborhood && (
              <span className="font-mono text-xs text-[#8C887B]">
                ({asset.neighborhood})
              </span>
            )}
          </div>
        </div>

        {/* 4. Cultural Hero Image — 100% visible, no overlay text obscuring it */}
        <div data-hero-image className="space-y-2.5">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full rounded-sm overflow-hidden bg-[#E5E0D2] border border-[#DDD8CA] shadow-md">
            <SafeImage
              src={asset.coverImage}
              alt={asset.coverImageAlt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 95vw, 1200px"
              objectPosition={asset.coverImagePosition || 'center 20%'}
              fallbackCategory={asset.name}
            />
          </div>

          {/* Dedicated Photo Metadata Bar BELOW Image (Zero Overlap!) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3.5 py-2 bg-[#FAF5EB] border border-[#E8E2D4] rounded-sm text-xs font-mono text-[#69655D]">
            <span className="flex items-center gap-2">
              <span className="text-[#8F3314] font-semibold">
                {asset.image?.type === 'documentary' ? 'Documentary photograph' : 'Illustrative image'}
              </span>
              {asset.image?.credit && (
                <>
                  <span className="text-[#A89F8E]">•</span>
                  <span className="truncate">{asset.image.credit}</span>
                </>
              )}
            </span>
            {asset.contributor && (
              <span className="text-[11px] text-[#8C887B] truncate">
                Documented by {asset.contributor.name}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ===================================================================
          6. KEY FACTS
          2x2 on Mobile, 2x2 on Tablet, 4-column on Desktop
          Never 4 tiny squished columns! Unknown displays "Not yet confirmed"
      =================================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={factsRef} className="bg-white border border-[#E8E3D8] rounded-sm p-4 sm:p-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y-0 divide-x-0 md:divide-x divide-[#F0EBE0]">
            
            {/* Fact 1: WHEN */}
            <div data-fact-item className="space-y-1 p-2 sm:p-0">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#8C887B]">
                WHEN
              </span>
              <p className="font-editorial text-base sm:text-xl font-medium text-[#161615] leading-snug">
                {formatFactValue(asset.facts.when)}
              </p>
            </div>

            {/* Fact 2: WHERE */}
            <div data-fact-item className="space-y-1 p-2 sm:p-0 md:pl-6">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#8C887B]">
                WHERE
              </span>
              <p className="font-editorial text-base sm:text-xl font-medium text-[#161615] leading-snug">
                {formatFactValue(asset.facts.where)}
              </p>
            </div>

            {/* Fact 3: VISITOR ACCESS */}
            <div data-fact-item className="space-y-1 p-2 sm:p-0 md:pl-6">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#8C887B]">
                VISITOR ACCESS
              </span>
              <p className="font-editorial text-base sm:text-xl font-medium text-[#161615] leading-snug">
                {formatFactValue(asset.facts.visitorAccess)}
              </p>
            </div>

            {/* Fact 4: CATEGORY */}
            <div data-fact-item className="space-y-1 p-2 sm:p-0 md:pl-6">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#8C887B]">
                CATEGORY
              </span>
              <p className="font-editorial text-base sm:text-xl font-medium text-[#161615] leading-snug">
                {formatFactValue(asset.facts.category)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          7. STORY SECTION
          Comfortable reading width (max-w-3xl), editorial typography
      =================================================================== */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <EditorialStory story={asset.story} />
      </section>

      {/* ===================================================================
          8. WHAT WE KNOW (TRUST MODE)
          Clickable claim rows opening ClaimDrawer / Mobile Bottom Sheet
      =================================================================== */}
      <section ref={claimsSectionRef} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="border-b border-[#E8E3D8] pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-1.5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#1E5C3E] font-semibold">
              Evidence & Sources
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#161615] mt-0.5">
              What we know
            </h2>
          </div>
          <span className="text-xs text-[#73736C]">
            Select any claim to view source evidence
          </span>
        </div>

        <div className="space-y-2.5">
          {asset.claims.map((claim, idx) => (
            <div key={claim.id} data-claim-row>
              <ClaimRow
                claim={claim}
                index={idx}
                onClick={handleOpenClaim}
              />
            </div>
          ))}
        </div>

        {/* 9. Contribution note & full-width CTA on mobile */}
        <div className="pt-5 border-t border-[#E8E3D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF7F0] p-4 sm:p-6 rounded-sm">
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-semibold text-[#161615]">
              Know additional details about {asset.name}?
            </h4>
            <p className="text-xs text-[#5A5954]">
              Help verify unconfirmed dates or resolve disputed opening schedules with documentary evidence.
            </p>
          </div>
          <Link
            href={`/contribute?asset=${encodeURIComponent(asset.slug)}`}
            className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#161615] hover:bg-[#B4441F] text-white text-xs font-medium rounded-sm whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Contribute knowledge</span>
          </Link>
        </div>
      </section>

      {/* Claim Drawer / Mobile Bottom Sheet */}
      <ClaimDrawer
        claim={selectedClaim}
        assetName={asset.name}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};
