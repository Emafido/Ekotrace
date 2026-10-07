import React from 'react';
import Link from 'next/link';
import { CulturalAssetType } from '@/types';

interface CategoryLinkProps {
  type: CulturalAssetType;
  label: string;
  count?: number;
  description?: string;
  isActive?: boolean;
}

export const CategoryLink: React.FC<CategoryLinkProps> = ({
  type,
  label,
  count,
  description,
  isActive = false,
}) => {
  return (
    <Link
      href={`/explore?category=${type}`}
      className={`group block p-4 sm:p-5 border transition-all duration-200 ${
        isActive
          ? 'bg-[#161615] text-[#FAF9F5] border-[#161615]'
          : 'bg-white hover:bg-[#FAF8F2] text-[#161615] border-[#E8E3D8] hover:border-[#CFC9BA]'
      } rounded-sm`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span
          className={`font-editorial text-lg sm:text-xl font-medium tracking-tight transition-colors ${
            isActive ? 'text-[#FAF9F5]' : 'group-hover:text-[#B4441F]'
          }`}
        >
          {label}
        </span>
        {typeof count === 'number' && (
          <span
            className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
              isActive
                ? 'bg-white/10 text-[#FAF9F5]'
                : 'bg-[#F2ECE1] text-[#73736C]'
            }`}
          >
            {count}
          </span>
        )}
      </div>
      {description && (
        <p
          className={`text-xs line-clamp-2 leading-relaxed ${
            isActive ? 'text-[#DCD7CA]' : 'text-[#73736C]'
          }`}
        >
          {description}
        </p>
      )}
    </Link>
  );
};
