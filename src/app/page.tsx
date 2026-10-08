'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CULTURAL_ASSETS } from '@/data/culturalAssets';
import { EventCard } from '@/components/EventCard';
import { CulturalCard } from '@/components/CulturalCard';
import { CategoryLink } from '@/components/CategoryLink';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ClaimDrawer } from '@/components/ClaimDrawer';
import { SafeImage } from '@/components/SafeImage';
import { Claim, CulturalAssetType } from '@/types';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter 4 events for "Happening in Lagos"
  const happeningEvents = CULTURAL_ASSETS.filter((a) => a.happeningNow).slice(0, 4);

  // Seeded records for Discover Lagos mixed grid
  const discoverAssets = CULTURAL_ASSETS;

  // Find Eyo festival for featured story and trust claim
  const eyoAsset = CULTURAL_ASSETS.find((a) => a.id === 'eyo-festival') || CULTURAL_ASSETS[0];
  const trustSampleClaim = eyoAsset.claims[0]; // "The festival takes place on Lagos Island"

  const handleOpenClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsDrawerOpen(true);
  };

  const categories: { type: CulturalAssetType; label: string; desc: string }[] = [
    { type: 'festival', label: 'Festivals', desc: 'Civic masquerades, carnivals, and sacred processions' },
    { type: 'place', label: 'Places', desc: 'Galleries, architectural sanctuaries, and historic quarters' },
    { type: 'tradition', label: 'Traditions', desc: 'Living rituals, ancestor veneration, and royal rites' },
    { type: 'food', label: 'Food', desc: 'Nocturnal grilling, street delicacies, and heritage recipes' },
    { type: 'craft', label: 'Crafts', desc: 'Adire indigo dyeing, wood carving, and beadwork guilds' },
    { type: 'story', label: 'Stories', desc: 'Waterfront oral histories, migration sagas, and memory' },
  ];

  return (
    <div className="space-y-14 sm:space-y-20 lg:space-y-28 pb-16 sm:pb-24">
      {/* ===================================================================
          HERO SECTION
          Mobile-First Composition: Headline -> Copy -> Action -> Cultural Image
      =================================================================== */}
      <section className="relative pt-4 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F2ECE1] border border-[#DDD8CA] rounded-sm text-[11px] font-mono tracking-wider text-[#69655D] uppercase">
              <span>Isale Eko • Popo Aguda • Lekki • Badagry</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-[#161615] leading-[1.1]">
              Explore Lagos through the people who live it.
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#4A4944] leading-relaxed max-w-2xl font-light">
              Discover festivals, traditions, places, food, crafts and stories — with information you can trace back to its source.
            </p>

            {/* CTAs: full-width on mobile, row on tablet/desktop */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/explore"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#161615] hover:bg-[#B4441F] text-[#FAF9F5] font-medium text-sm sm:text-base px-6 py-3.5 rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
              >
                <span>Explore Lagos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contribute"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#F2ECE1] text-[#161615] border border-[#D4CEBF] font-medium text-sm sm:text-base px-6 py-3.5 rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
              >
                <span>Contribute what you know</span>
              </Link>
            </div>

            {/* Trust Principles Strip: responsive wrap on phones */}
            <div className="pt-3 flex items-center gap-3 sm:gap-6 text-xs text-[#73736C] font-mono border-t border-[#EAE5D9] flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1E5C3E] shrink-0" />
                <span>Community Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8E361D] shrink-0" />
                <span>Transparent Conflicts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#734F18] shrink-0" />
                <span>Zero Hallucinations</span>
              </div>
            </div>
          </div>

          {/* Hero Cultural Photography with SafeImage & proper objectPosition */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full rounded-sm overflow-hidden bg-[#E5E0D2] border border-[#DDD8CA] shadow-lg">
              <SafeImage
                src={eyoAsset.coverImage}
                alt={eyoAsset.coverImageAlt}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 40vw"
                objectPosition={eyoAsset.coverImagePosition || 'center 20%'}
                fallbackCategory="Lagos Cultural Hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161615]/85 via-[#161615]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1 z-10">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#E8E3D8]">
                  Archival Field Record
                </span>
                <p className="font-editorial text-base sm:text-xl font-medium leading-snug">
                  Adamu Orisha Custodians • Isale Eko
                </p>
                <p className="text-[11px] sm:text-xs text-[#DDD8CA] truncate">
                  Living Yoruba coastal royal heritage archive
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          HAPPENING NOW (HAPPENING IN LAGOS)
          1 Column Mobile -> 2 Columns Tablet -> 4 Columns Desktop
      =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
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
            className="text-xs sm:text-sm font-medium text-[#161615] hover:text-[#B4441F] inline-flex items-center gap-1 group transition-colors py-1"
          >
            <span>View all festival dates</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {happeningEvents.map((event, idx) => (
            <EventCard key={event.id} asset={event} priority={idx === 0} />
          ))}
        </div>
      </section>

      {/* ===================================================================
          EXPLORE CULTURE
          Compact 2-Column Mobile -> 3-Column Tablet -> 6-Column Desktop
      =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="border-b border-[#E8E3D8] pb-3 sm:pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#73736C]">
            Curated Discovery
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl font-medium text-[#161615] mt-0.5">
            Explore culture
          </h2>
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
              />
            );
          })}
        </div>
      </section>

      {/* ===================================================================
          FEATURED STORY
          Long-form Editorial Storytelling with Responsive Stacking
      =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F0] border border-[#E5E0D2] rounded-sm p-5 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Story Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-[#E2DDD0]">
                <SafeImage
                  src={eyoAsset.coverImage}
                  alt={eyoAsset.coverImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  objectPosition={eyoAsset.coverImagePosition || 'center 20%'}
                  fallbackCategory="Featured Editorial Story"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs text-[#73736C] font-mono">
                <span>Isale Eko Heritage Circle</span>
                <span>Archival Monograph #102</span>
              </div>
            </div>

            {/* Story Editorial Content */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B4441F] font-semibold">
                  Featured Long-form Story
                </span>
                <h3 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-medium text-[#161615] leading-[1.12]">
                  Behind the white robes of Eyo
                </h3>
              </div>

              <blockquote className="border-l-2 border-[#B4441F] pl-3.5 sm:pl-4 italic text-[#4A4944] text-sm sm:text-base lg:text-lg font-editorial">
                “When the staff of Adamu Orisha strikes the earth of Isale Eko, it does not strike empty dust. It awakens three hundred years of Oba lineage.”
              </blockquote>

              <p className="text-xs sm:text-sm lg:text-base text-[#4E4D47] leading-relaxed font-light">
                The Adimu Orisha Play is not a street carnival for casual amusement. In Lagos Island memory, each procession represents an exacting spiritual architecture. When the Iga grant consent, the Island shuts its vehicular thoroughfares. Barefoot celebrants walk under strict vows: no caps, no head-ties, and no sandals may be worn within sight of an Eyo.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  href={`/explore/${eyoAsset.slug}`}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-[#161615] hover:bg-[#B4441F] text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
                >
                  <span>Read full cultural record</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => handleOpenClaim(trustSampleClaim)}
                  className="min-h-[44px] text-xs sm:text-sm font-medium text-[#5A5954] hover:text-[#161615] underline underline-offset-4 text-center sm:text-left py-2"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E8E3D8] pb-3 sm:pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#73736C]">
              Living Archive
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-medium text-[#161615] mt-0.5">
              Discover Lagos
            </h2>
          </div>
          <p className="text-xs text-[#73736C] max-w-sm">
            Curated across visual arts, nocturnal foodways, lagoon stilt architecture, and sacred traditions.
          </p>
        </div>

        {/* Asymmetrical editorial grid: handles mobile (1 col) and tablet (2 col) gracefully */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {/* Item 1: Horizontal layout on md+ */}
          <div className="sm:col-span-2">
            <CulturalCard asset={discoverAssets[1]} layout="horizontal" />
          </div>

          {/* Item 2: Standard card */}
          <div>
            <CulturalCard asset={discoverAssets[2]} />
          </div>

          {/* Item 3 */}
          <div>
            <CulturalCard asset={discoverAssets[3]} />
          </div>

          {/* Item 4 */}
          <div>
            <CulturalCard asset={discoverAssets[5]} />
          </div>

          {/* Item 5 */}
          <div>
            <CulturalCard asset={discoverAssets[6]} />
          </div>

          {/* Item 6: Horizontal layout on md+ */}
          <div className="sm:col-span-2 lg:col-span-3">
            <CulturalCard asset={discoverAssets[7]} layout="horizontal" />
          </div>
        </div>
      </section>

      {/* ===================================================================
          TRUST SECTION
          Know where the story came from (compact, mobile-friendly)
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
