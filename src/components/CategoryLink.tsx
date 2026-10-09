'use client';

import React from 'react';
import Link from 'next/link';
import { CulturalAssetType } from '@/types';

interface CategoryLinkProps {
  type: CulturalAssetType;
  label: string;
  count?: number;
  description?: string;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export const CategoryLink: React.FC<CategoryLinkProps> = ({
  type,
  label,
  count,
  description,
  isActive = false,
  onHover,
  onLeave,
}) => {
  return (
    <Link
      href={`/explore?category=${type}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className={`group relative block p-3.5 sm:p-5 border transition-all duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#B4441F] min-h-[44px] active:scale-[0.98] ${
        isActive
          ? 'bg-[#161615] text-[#FAF9F5] border-[#161615]'
          : 'bg-[#FDFBF7] hover:bg-[#FAF3E6] text-[#161615] border-[#E8E2D4] hover:border-[#B4441F]/40 shadow-2xs'
      }`}
    >
      <div className="flex items-center justify-between gap-1.5 mb-1.5">
        <span
          className={`font-editorial text-base sm:text-xl font-medium tracking-tight transition-all duration-200 inline-block group-hover:translate-x-1 ${
            isActive ? 'text-[#FAF9F5]' : 'group-hover:text-[#B4441F]'
          }`}
        >
          {label}
        </span>
        {typeof count === 'number' && (
          <span
            className={`text-[11px] font-mono px-1.5 py-0.5 rounded-sm shrink-0 transition-colors ${
              isActive
                ? 'bg-white/10 text-[#FAF9F5]'
                : 'bg-[#F2ECE1] text-[#73736C] group-hover:bg-[#EBE4D5]'
            }`}
          >
            {count}
          </span>
        )}
      </div>

      {description && (
        <p
          className={`text-[11px] sm:text-xs line-clamp-2 leading-relaxed ${
            isActive ? 'text-[#DCD7CA]' : 'text-[#73736C]'
          }`}
        >
          {description}
        </p>
      )}

      {/* Animated Underline */}
      <span
        className={`absolute bottom-0 left-0 h-[2px] bg-[#B4441F] transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  );
};
