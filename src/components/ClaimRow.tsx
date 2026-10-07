import React from 'react';
import { Claim } from '@/types';
import { VerificationBadge } from './VerificationBadge';
import { ChevronRight, FileText } from 'lucide-react';

interface ClaimRowProps {
  claim: Claim;
  index: number;
  onClick: (claim: Claim) => void;
}

export const ClaimRow: React.FC<ClaimRowProps> = ({ claim, index, onClick }) => {
  const isConflicting = claim.status === 'conflicting';
  const isUnknown = claim.status === 'unknown';

  return (
    <button
      type="button"
      onClick={() => onClick(claim)}
      className={`w-full text-left p-4 sm:p-5 border transition-all duration-200 rounded-sm group flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isConflicting
          ? 'bg-[#FDF9F7] hover:bg-[#FAF2EE] border-[#F2D6CB]'
          : isUnknown
          ? 'bg-[#FAF7F0] hover:bg-[#F5F0E4] border-[#E8DFC9]'
          : 'bg-white hover:bg-[#FAF8F4] border-[#E8E3D8] hover:border-[#CFC9BA]'
      }`}
      aria-label={`View claim details: ${claim.statement}`}
    >
      <div className="flex items-start gap-3 sm:gap-4 flex-1">
        <span className="font-mono text-xs text-[#8C887B] shrink-0 pt-0.5">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="space-y-1 flex-1">
          <p className="font-editorial text-base sm:text-lg text-[#161615] group-hover:text-[#B4441F] transition-colors leading-snug">
            {claim.statement}
          </p>

          <div className="flex items-center gap-3 text-xs text-[#73736C] flex-wrap">
            {claim.sources.length > 0 ? (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#5A5954]">
                <FileText className="w-3 h-3 text-[#B4441F]" />
                {claim.sources.length} {claim.sources.length === 1 ? 'source' : 'sources'}
              </span>
            ) : (
              <span className="font-mono text-[11px] text-[#8C887B]">No source attached</span>
            )}

            {claim.value && !isConflicting && (
              <span className="hidden md:inline-block text-[#8C887B] truncate max-w-xs">
                • {claim.value}
              </span>
            )}

            {isConflicting && (
              <span className="text-[11px] font-mono text-[#8E361D]">
                • 3 competing perspectives recorded
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0EBE0]">
        <VerificationBadge status={claim.status} size="sm" />
        <div className="p-1 text-[#8C887B] group-hover:text-[#161615] group-hover:translate-x-1 transition-all">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
};
