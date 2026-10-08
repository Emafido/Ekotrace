import React from 'react';
import Link from 'next/link';
import { CulturalAsset } from '@/types';
import { VerificationBadge } from './VerificationBadge';
import { SafeImage } from './SafeImage';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

interface EventCardProps {
  asset: CulturalAsset;
  priority?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ asset, priority = false }) => {
  return (
    <Link
      href={`/explore/${asset.slug}`}
      className="group flex flex-col bg-white border border-[#E8E3D8] hover:border-[#BFB9A8] transition-all duration-200 rounded-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#B4441F] focus:ring-offset-2"
    >
      {/* Visual Image container with SafeImage and appropriate aspect ratio */}
      <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-[#EBE6DC]">
        <SafeImage
          src={asset.coverImage}
          alt={asset.coverImageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          objectPosition={asset.coverImagePosition || 'center'}
          fallbackCategory={asset.type}
          className="transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Subtle category tag overlaid on top left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-[#161615]/85 backdrop-blur-sm text-white rounded-sm">
            {asset.type}
          </span>
        </div>
      </div>

      {/* Card Content - Essential Info only, touch-accessible spacing */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs text-[#73736C]">
              <MapPin className="w-3.5 h-3.5 text-[#B4441F] shrink-0" />
              <span className="truncate max-w-[180px] sm:max-w-none">{asset.location}</span>
            </span>
            <VerificationBadge status={asset.overallVerification} size="sm" showIcon={false} />
          </div>

          <h3 className="font-editorial text-xl sm:text-2xl font-medium text-[#161615] group-hover:text-[#B4441F] transition-colors leading-snug">
            {asset.name}
          </h3>
        </div>

        {/* Date / Status */}
        <div className="pt-2.5 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-[#5A5954]">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#8C887B] shrink-0" />
            <span className="truncate max-w-[170px] sm:max-w-none">{asset.eventStatus || asset.facts.when}</span>
          </span>
          <span className="text-[11px] font-medium text-[#161615] group-hover:text-[#B4441F] inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-all">
            <span>View</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
};
