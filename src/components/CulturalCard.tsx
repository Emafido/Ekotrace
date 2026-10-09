import React from 'react';
import Link from 'next/link';
import { CulturalAsset } from '@/types';
import { VerificationBadge } from './VerificationBadge';
import { SafeImage } from './SafeImage';
import { MapPin, ArrowRight } from 'lucide-react';

interface CulturalCardProps {
  asset: CulturalAsset;
  layout?: 'standard' | 'horizontal' | 'compact';
  priority?: boolean;
}

export const CulturalCard: React.FC<CulturalCardProps> = ({
  asset,
  layout = 'standard',
  priority = false,
}) => {
  if (layout === 'horizontal') {
    return (
      <Link
        href={`/explore/${asset.slug}`}
        className="group flex flex-col md:grid md:grid-cols-12 bg-white border border-[#E8E3D8] hover:border-[#BFB9A8] transition-all duration-300 rounded-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#B4441F] focus:ring-offset-2 active:scale-[0.98]"
      >
        {/* Responsive image container: 4:3 on mobile, full column height on tablet/desktop */}
        <div className="relative md:col-span-5 aspect-[4/3] md:aspect-auto w-full md:min-h-[260px] bg-[#EBE6DC] overflow-hidden">
          <SafeImage
            src={asset.coverImage}
            alt={asset.coverImageAlt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 35vw"
            objectPosition={asset.coverImagePosition || 'center'}
            fallbackCategory={asset.type}
            imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#161615]/85 text-white rounded-sm">
              {asset.type}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 md:col-span-7 flex flex-col justify-between space-y-4 group-hover:-translate-y-0.5 transition-transform duration-300">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-xs text-[#73736C]">
                <MapPin className="w-3.5 h-3.5 text-[#B4441F] shrink-0" />
                <span className="truncate max-w-[200px] sm:max-w-none">{asset.location}</span>
              </span>
              <VerificationBadge status={asset.overallVerification} size="sm" />
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#161615] group-hover:text-[#B4441F] transition-colors leading-tight">
              {asset.name}
            </h3>

            <p className="text-sm text-[#5A5954] leading-relaxed line-clamp-3 font-light">
              {asset.summary}
            </p>
          </div>

          <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
            <span className="font-mono text-[#73736C]">
              {asset.claims.length} documented claims
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-[#161615] group-hover:text-[#B4441F]">
              <span>Explore record</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/explore/${asset.slug}`}
      className="group flex flex-col bg-white border border-[#E8E3D8] hover:border-[#BFB9A8] transition-all duration-300 rounded-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#B4441F] focus:ring-offset-2 active:scale-[0.98]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EBE6DC]">
        <SafeImage
          src={asset.coverImage}
          alt={asset.coverImageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          objectPosition={asset.coverImagePosition || 'center'}
          fallbackCategory={asset.type}
          imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#161615]/85 text-white rounded-sm">
            {asset.type}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3 group-hover:-translate-y-0.5 transition-transform duration-300">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs text-[#73736C]">
              <MapPin className="w-3.5 h-3.5 text-[#B4441F] shrink-0" />
              <span className="truncate max-w-[180px] sm:max-w-none">{asset.neighborhood || asset.location}</span>
            </span>
            <VerificationBadge status={asset.overallVerification} size="sm" showIcon={false} />
          </div>

          <h3 className="font-editorial text-xl font-medium text-[#161615] group-hover:text-[#B4441F] transition-colors leading-snug">
            {asset.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#5A5954] leading-relaxed line-clamp-2 font-light">
            {asset.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-[#73736C]">
          <span className="font-mono text-[11px]">
            {asset.claims.length} claims
          </span>
          <span className="text-[#161615] font-medium group-hover:text-[#B4441F] inline-flex items-center gap-1 transition-colors">
            <span>Read story</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
          </span>
        </div>
      </div>
    </Link>
  );
};
