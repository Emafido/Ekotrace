import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CulturalAsset } from '@/types';
import { VerificationBadge } from './VerificationBadge';
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
        className="group grid grid-cols-1 md:grid-cols-12 bg-white border border-[#E8E3D8] hover:border-[#BFB9A8] transition-all duration-300 rounded-sm overflow-hidden"
      >
        <div className="relative md:col-span-5 aspect-[16/10] md:aspect-auto w-full min-h-[220px] bg-[#EBE6DC] overflow-hidden">
          <Image
            src={asset.coverImage}
            alt={asset.coverImageAlt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#161615]/85 text-white rounded-sm">
              {asset.type}
            </span>
          </div>
        </div>

        <div className="p-6 md:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-xs text-[#73736C]">
                <MapPin className="w-3 h-3 text-[#B4441F] shrink-0" />
                <span>{asset.location}</span>
              </span>
              <VerificationBadge status={asset.overallVerification} size="sm" />
            </div>

            <h3 className="font-editorial text-2xl font-semibold text-[#161615] group-hover:text-[#B4441F] transition-colors leading-tight">
              {asset.name}
            </h3>

            <p className="text-sm text-[#5A5954] leading-relaxed line-clamp-3">
              {asset.summary}
            </p>
          </div>

          <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
            <span className="font-mono text-[#73736C]">
              {asset.claims.length} documented claims
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-[#161615] group-hover:text-[#B4441F]">
              Explore record <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/explore/${asset.slug}`}
      className="group flex flex-col bg-white border border-[#E8E3D8] hover:border-[#BFB9A8] transition-all duration-300 rounded-sm overflow-hidden"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EBE6DC]">
        <Image
          src={asset.coverImage}
          alt={asset.coverImageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#161615]/85 text-white rounded-sm">
            {asset.type}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-[#73736C]">
              <MapPin className="w-3 h-3 text-[#B4441F] shrink-0" />
              <span className="truncate">{asset.neighborhood || asset.location}</span>
            </span>
            <VerificationBadge status={asset.overallVerification} size="sm" showIcon={false} />
          </div>

          <h3 className="font-editorial text-xl font-medium text-[#161615] group-hover:text-[#B4441F] transition-colors leading-snug">
            {asset.name}
          </h3>

          <p className="text-xs text-[#5A5954] leading-relaxed line-clamp-2">
            {asset.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-[#73736C]">
          <span className="font-mono text-[11px]">
            {asset.claims.length} claims
          </span>
          <span className="text-[#161615] font-medium group-hover:text-[#B4441F] group-hover:translate-x-0.5 transition-all">
            Read story →
          </span>
        </div>
      </div>
    </Link>
  );
};
