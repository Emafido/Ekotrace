'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CulturalAsset, Claim } from '@/types';
import { VerificationBadge } from '@/components/VerificationBadge';
import { ClaimRow } from '@/components/ClaimRow';
import { ClaimDrawer } from '@/components/ClaimDrawer';
import { EditorialStory } from '@/components/EditorialStory';
import { MapPin, Calendar, Users, Bookmark, ArrowLeft, Plus, CheckCircle, Info } from 'lucide-react';

interface CulturalRecordClientProps {
  asset: CulturalAsset;
}

export const CulturalRecordClient: React.FC<CulturalRecordClientProps> = ({ asset }) => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  return (
    <div className="pb-24 space-y-16 sm:space-y-20">
      {/* Breadcrumb & Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#73736C] hover:text-[#161615] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cultural Archive</span>
        </Link>
      </div>

      {/* ===================================================================
          HEADER SECTION
          Category, Large Title, Location, Verification Badge, Hero Image
      =================================================================== */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-1 bg-[#F2ECE1] text-[#69655D] rounded-sm font-semibold">
              {asset.type}
            </span>
            <VerificationBadge status={asset.overallVerification} size="md" />
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#161615] leading-[1.06]">
            {asset.name}
          </h1>

          <div className="flex items-center gap-2 text-sm sm:text-base text-[#5A5954]">
            <MapPin className="w-4 h-4 text-[#B4441F] shrink-0" />
            <span>{asset.location}</span>
            {asset.neighborhood && (
              <span className="font-mono text-xs text-[#8C887B]">
                ({asset.neighborhood})
              </span>
            )}
          </div>
        </div>

        {/* Large Cultural Hero Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-sm overflow-hidden bg-[#E5E0D2] border border-[#DDD8CA]">
          <Image
            src={asset.coverImage}
            alt={asset.coverImageAlt}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between pointer-events-none">
            <span className="text-[11px] font-mono text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-sm">
              Archival Photography • Lagos Cultural Registry
            </span>
            {asset.contributor && (
              <span className="hidden sm:inline-block text-[11px] font-mono text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                Documented by {asset.contributor.name}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ===================================================================
          IMPORTANT FACTS
          Four clean information blocks: WHEN, WHERE, VISITOR ACCESS, CATEGORY
          Unknown must display "Not yet confirmed", never "N/A"
      =================================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E8E3D8] rounded-sm p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#F0EBE0]">
            {/* Fact 1: WHEN */}
            <div className="space-y-1.5 pt-4 sm:pt-0">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C887B]">
                WHEN
              </span>
              <p className="font-editorial text-lg sm:text-xl font-medium text-[#161615]">
                {formatFactValue(asset.facts.when)}
              </p>
            </div>

            {/* Fact 2: WHERE */}
            <div className="space-y-1.5 pt-4 sm:pt-0 sm:pl-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C887B]">
                WHERE
              </span>
              <p className="font-editorial text-lg sm:text-xl font-medium text-[#161615]">
                {formatFactValue(asset.facts.where)}
              </p>
            </div>

            {/* Fact 3: VISITOR ACCESS */}
            <div className="space-y-1.5 pt-4 sm:pt-0 sm:pl-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C887B]">
                VISITOR ACCESS
              </span>
              <p className="font-editorial text-lg sm:text-xl font-medium text-[#161615]">
                {formatFactValue(asset.facts.visitorAccess)}
              </p>
            </div>

            {/* Fact 4: CATEGORY */}
            <div className="space-y-1.5 pt-4 sm:pt-0 sm:pl-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C887B]">
                CATEGORY
              </span>
              <p className="font-editorial text-lg sm:text-xl font-medium text-[#161615]">
                {formatFactValue(asset.facts.category)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          STORY SECTION
          Magazine feature editorial typography, context, and oral notes
      =================================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <EditorialStory story={asset.story} />
      </section>

      {/* ===================================================================
          WHAT WE KNOW (CLAIM ROWS)
          Clickable claim rows opening the Claim Details Drawer
      =================================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-[#E8E3D8] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#1E5C3E] font-semibold">
              Traceable Truth Layer
            </span>
            <h2 className="font-editorial text-3xl font-medium text-[#161615] mt-1">
              What we know
            </h2>
          </div>
          <span className="text-xs text-[#73736C]">
            Select any claim to inspect citations and competing accounts
          </span>
        </div>

        <div className="space-y-3">
          {asset.claims.map((claim, idx) => (
            <ClaimRow
              key={claim.id}
              claim={claim}
              index={idx}
              onClick={handleOpenClaim}
            />
          ))}
        </div>

        {/* Contribution note */}
        <div className="pt-6 border-t border-[#E8E3D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF7F0] p-6 rounded-sm">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[#161615]">
              Know additional details about {asset.name}?
            </h4>
            <p className="text-xs text-[#5A5954]">
              Help verify unconfirmed dates or resolve disputed opening schedules with documentary evidence.
            </p>
          </div>
          <Link
            href={`/contribute?asset=${encodeURIComponent(asset.slug)}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#161615] hover:bg-[#B4441F] text-white text-xs font-medium rounded-sm whitespace-nowrap transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Contribute knowledge</span>
          </Link>
        </div>
      </section>

      {/* Claim Drawer Slide-out */}
      <ClaimDrawer
        claim={selectedClaim}
        assetName={asset.name}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};
