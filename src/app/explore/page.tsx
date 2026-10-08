'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CULTURAL_ASSETS } from '@/data/culturalAssets';
import { CulturalCard } from '@/components/CulturalCard';
import { EventCard } from '@/components/EventCard';
import { Search, X } from 'lucide-react';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const filterTabs: { id: string; label: string }[] = [
    { id: 'all', label: 'All Records' },
    { id: 'festival', label: 'Events & Festivals' },
    { id: 'place', label: 'Cultural Places' },
    { id: 'tradition', label: 'Living Traditions' },
    { id: 'food', label: 'Nocturnal Foodways' },
    { id: 'craft', label: 'Textiles & Crafts' },
    { id: 'story', label: 'Oral Stories' },
  ];

  // Filtered assets based on category and query
  const filteredAssets = useMemo(() => {
    return CULTURAL_ASSETS.filter((asset) => {
      const matchesCategory =
        activeCategory === 'all' || asset.type === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        asset.name.toLowerCase().includes(q) ||
        asset.location.toLowerCase().includes(q) ||
        asset.neighborhood.toLowerCase().includes(q) ||
        asset.summary.toLowerCase().includes(q) ||
        asset.claims.some((c) => c.statement.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  // Curated editorial groupings for unfiltered view
  const happeningSoon = useMemo(
    () => CULTURAL_ASSETS.filter((a) => a.happeningNow),
    []
  );
  const culturalPlaces = useMemo(
    () => CULTURAL_ASSETS.filter((a) => a.type === 'place'),
    []
  );
  const storiesYouMayNotKnow = useMemo(
    () => CULTURAL_ASSETS.filter((a) => a.type === 'story' || a.id === 'fanti-carnival'),
    []
  );
  const communityDiscoveries = useMemo(
    () => CULTURAL_ASSETS.filter((a) => a.type === 'craft' || a.type === 'food'),
    []
  );

  const isFiltering = activeCategory !== 'all' || searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-14">
      {/* Title & Introduction */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B4441F] font-semibold">
          <span>Cultural Discovery Archive</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#161615]">
          Explore Lagos
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-[#5A5954] leading-relaxed font-light">
          Traverse ancestral masquerades, Portuguese-Brazilian colonial quarters, open-air charcoal hearths, and lagoon stilt settlements — with every fact anchored in communal testimony.
        </p>
      </div>

      {/* Large Mobile-First Search Input */}
      <div className="space-y-3.5">
        <div className="relative">
          <Search className="w-5 h-5 text-[#8C887B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search festivals, places, traditions or stories..."
            className="w-full min-h-[50px] pl-12 pr-12 py-3.5 bg-white border border-[#D4CEBF] text-base text-[#161615] placeholder-[#8C8B82] rounded-sm focus:outline-none focus:border-[#B4441F] focus:ring-1 focus:ring-[#B4441F] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-[#8C887B] hover:text-[#161615]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Horizontally Scrollable Category Chips on Mobile with visible hint */}
        <div className="relative">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none overscroll-x-contain -mx-4 px-4 sm:mx-0 sm:px-0">
            {filterTabs.map((tab) => {
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`min-h-[42px] px-4 py-2 text-xs sm:text-sm font-medium rounded-sm border whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F] ${
                    isSelected
                      ? 'bg-[#161615] text-[#FAF9F5] border-[#161615]'
                      : 'bg-white hover:bg-[#FAF8F2] text-[#4A4944] border-[#E2DDD0] hover:border-[#BFB9A8]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filtered View */}
      {isFiltering ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8E3D8] pb-3 text-xs font-mono text-[#73736C]">
            <span>
              Showing {filteredAssets.length} {filteredAssets.length === 1 ? 'record' : 'records'}
            </span>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-[#B4441F] hover:underline font-medium min-h-[44px] flex items-center"
            >
              Reset filters
            </button>
          </div>

          {filteredAssets.length === 0 ? (
            <div className="p-8 sm:p-14 text-center bg-white border border-dashed border-[#D4CEBF] rounded-sm space-y-3">
              <p className="font-editorial text-xl sm:text-2xl text-[#161615]">
                No cultural records match your query.
              </p>
              <p className="text-xs sm:text-sm text-[#73736C] max-w-md mx-auto">
                Know something about this topic? You can be the first to document it in the community archive.
              </p>
              <div className="pt-2">
                <a
                  href="/contribute"
                  className="min-h-[44px] inline-flex items-center text-xs font-medium px-5 py-2.5 bg-[#161615] text-white rounded-sm hover:bg-[#B4441F] transition-colors"
                >
                  Contribute this cultural record
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {filteredAssets.map((asset) => (
                <CulturalCard key={asset.id} asset={asset} />
              ))}
            </div>
          )}
        </section>
      ) : (
        /* Curated Discovery Sections */
        <div className="space-y-16 sm:space-y-20">
          
          {/* Section 1: Happening soon */}
          <section className="space-y-5 sm:space-y-6">
            <div className="border-b border-[#E8E3D8] pb-3 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#B4441F] font-semibold">
                  Active Cycle
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#161615]">
                  Happening soon
                </h2>
              </div>
              <span className="text-xs text-[#73736C] font-mono hidden sm:inline">
                Seasonal & Commemorative
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {happeningSoon.map((asset) => (
                <EventCard key={asset.id} asset={asset} />
              ))}
            </div>
          </section>

          {/* Section 2: Cultural places */}
          <section className="space-y-5 sm:space-y-6">
            <div className="border-b border-[#E8E3D8] pb-3 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#1C3F5E] font-semibold">
                  Physical Sanctuaries
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#161615]">
                  Cultural places
                </h2>
              </div>
              <span className="text-xs text-[#73736C] font-mono hidden sm:inline">
                Galleries & Quarters
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {culturalPlaces.map((asset) => (
                <CulturalCard key={asset.id} asset={asset} layout="horizontal" />
              ))}
            </div>
          </section>

          {/* Section 3: Stories you may not know */}
          <section className="space-y-5 sm:space-y-6">
            <div className="border-b border-[#E8E3D8] pb-3 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#8E361D] font-semibold">
                  Living Memory
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#161615]">
                  Stories you may not know
                </h2>
              </div>
              <span className="text-xs text-[#73736C] font-mono hidden sm:inline">
                Waterfront & Migration
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {storiesYouMayNotKnow.map((asset) => (
                <CulturalCard key={asset.id} asset={asset} />
              ))}
            </div>
          </section>

          {/* Section 4: Community discoveries */}
          <section className="space-y-5 sm:space-y-6">
            <div className="border-b border-[#E8E3D8] pb-3 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#1E5C3E] font-semibold">
                  Craft & Culinary
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#161615]">
                  Community discoveries
                </h2>
              </div>
              <span className="text-xs text-[#73736C] font-mono hidden sm:inline">
                Textiles & Night Foodways
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {communityDiscoveries.map((asset) => (
                <CulturalCard key={asset.id} asset={asset} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm font-mono text-[#8C887B]">Loading Lagos Cultural Archive...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
