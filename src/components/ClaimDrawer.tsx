'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Claim } from '@/types';
import { VerificationBadge } from './VerificationBadge';
import { X, Calendar, UserCheck, BookOpen, FileText, Camera, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface ClaimDrawerProps {
  claim: Claim | null;
  assetName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimDrawer: React.FC<ClaimDrawerProps> = ({
  claim,
  assetName = 'Cultural Record',
  isOpen,
  onClose,
}) => {
  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !claim) return null;

  const isConflicting = claim.status === 'conflicting';

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-claim-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#161615]/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container (Right side on desktop, bottom sheet on mobile) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-lg bg-[#FAF9F5] border-l border-[#E5E0D2] shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#E8E3D8] bg-[#F5F1E8]/70 flex items-start justify-between sticky top-0 z-10 backdrop-blur-sm">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#73736C]">
                  Verification Provenance
                </span>
                <span className="text-[11px] text-[#A6A296]">•</span>
                <span className="text-[11px] font-medium text-[#73736C] truncate max-w-[200px]">
                  {assetName}
                </span>
              </div>
              <h2 id="drawer-claim-title" className="text-sm font-semibold text-[#161615]">
                Claim Origin & Sources
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5A5954] hover:text-[#161615] hover:bg-[#EAE4D7] rounded-sm transition-colors"
              aria-label="Close claim drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 sm:p-8 space-y-8 flex-1">
            {/* Primary Claim Statement */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8A8679]">
                  Claim Statement
                </span>
                <VerificationBadge status={claim.status} size="md" />
              </div>

              <div className="p-4 bg-white border border-[#E2DDD0] rounded-sm">
                <p className="font-editorial text-lg sm:text-xl text-[#161615] leading-snug">
                  “{claim.statement}”
                </p>
                {claim.value && !isConflicting && (
                  <div className="mt-2.5 pt-2.5 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-[#5A5954]">
                    <span className="font-mono text-[#8C887B]">Documented Value:</span>
                    <span className="font-medium text-[#161615]">{claim.value}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CONFLICTING STATE: Competing Points */}
            {isConflicting && claim.conflictDetails && (
              <div className="space-y-4 p-5 bg-[#FDF5F1] border border-[#F2D4C8] rounded-sm">
                <div className="flex items-center gap-2 text-[#8E361D]">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <h3 className="text-xs font-mono uppercase tracking-wider font-semibold">
                    Competing Cultural Records
                  </h3>
                </div>

                <p className="text-xs text-[#63483E] leading-relaxed">
                  {claim.conflictDetails.description}
                </p>

                {/* Competing Points List */}
                <div className="space-y-2.5 pt-1">
                  {claim.conflictDetails.competingPoints.map((point, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white border border-[#ECD1C5] rounded-sm text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-mono">
                        <span className="font-semibold text-[#8E361D]">{point.sourceLabel}</span>
                        <span className="px-2 py-0.5 bg-[#FAF2EE] text-[#8E361D] font-bold rounded-sm border border-[#F0D5C9]">
                          {point.claimValue}
                        </span>
                      </div>
                      <p className="text-[#3F3E3A] font-medium">{point.sourceName}</p>
                      {point.note && (
                        <p className="text-[#756E68] text-[11px] leading-normal">{point.note}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Resolution notice */}
                <div className="pt-2 border-t border-[#F1D7CD]">
                  <p className="text-xs font-medium text-[#8E361D] italic mb-3">
                    {claim.conflictDetails.resolutionNote}
                  </p>
                  <Link
                    href={`/contribute?claimId=${encodeURIComponent(claim.id)}&subject=${encodeURIComponent(claim.statement)}`}
                    onClick={onClose}
                    className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-[#8E361D] hover:bg-[#722A16] text-[#FAF9F5] text-xs font-medium rounded-sm transition-colors"
                  >
                    <span>Contribute an update</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Verification Metadata */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#8A8679]">
                Verification Details
              </h3>
              <div className="bg-white border border-[#E2DDD0] rounded-sm divide-y divide-[#F2ECE1] text-xs">
                <div className="p-3 flex items-center justify-between">
                  <span className="text-[#73736C] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#8C887B]" />
                    Verified by:
                  </span>
                  <span className="font-medium text-[#161615] text-right">
                    {claim.verification.verifierName}
                  </span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-[#73736C]">Role / Desk:</span>
                  <span className="text-[#484843] text-right font-mono text-[11px]">
                    {claim.verification.verifierRole}
                  </span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-[#73736C] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8C887B]" />
                    Last reviewed:
                  </span>
                  <span className="text-[#161615] font-mono text-[11px]">
                    {claim.lastReviewedAt}
                  </span>
                </div>
                {claim.verification.verificationNotes && (
                  <div className="p-3 space-y-1 bg-[#FAF9F5]">
                    <span className="text-[11px] font-mono text-[#8C887B] uppercase">Archival Notes:</span>
                    <p className="text-[#484843] text-[11px] leading-relaxed">
                      {claim.verification.verificationNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sources List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#8A8679]">
                  Supporting Sources ({claim.sources.length})
                </h3>
                <span className="text-[11px] text-[#8C887B] font-mono">Traceable Origin</span>
              </div>

              {claim.sources.length === 0 ? (
                <div className="p-4 bg-white border border-dashed border-[#DCD7CA] rounded-sm text-center">
                  <p className="text-xs text-[#73736C]">No direct citation attached yet.</p>
                </div>
              ) : (
                <ul className="space-y-2.5">
                  {claim.sources.map((src, i) => (
                    <li
                      key={src.id || i}
                      className="p-3.5 bg-white border border-[#E2DDD0] rounded-sm space-y-1.5 hover:border-[#C4BEAF] transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-[#B4441F] shrink-0 mt-0.5" />
                        <div className="space-y-0.5 flex-1">
                          <p className="text-xs font-medium text-[#161615] leading-snug">
                            {src.title}
                          </p>
                          <p className="text-[11px] text-[#63625C]">
                            {src.authorOrOrg} {src.yearOrDate && `• ${src.yearOrDate}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-1 border-t border-[#F5F0E6]">
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#F4EFE6] text-[#69655D] rounded-sm">
                          {src.type.replace('-', ' ')}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Evidence items if any */}
            {claim.evidence && claim.evidence.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#8A8679]">
                  Physical & Digital Evidence ({claim.evidence.length})
                </h3>
                <div className="space-y-2">
                  {claim.evidence.map((ev, i) => (
                    <div
                      key={ev.id || i}
                      className="p-3 bg-white border border-[#E2DDD0] rounded-sm flex items-start gap-2.5"
                    >
                      {ev.type === 'photo' ? (
                        <Camera className="w-4 h-4 text-[#1C3F5E] shrink-0 mt-0.5" />
                      ) : (
                        <FileText className="w-4 h-4 text-[#1C3F5E] shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-0.5 text-xs">
                        <p className="font-medium text-[#161615]">{ev.title}</p>
                        <p className="text-[11px] text-[#69655D] leading-normal">
                          {ev.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-[#E8E3D8] bg-[#F5F1E8]/70 flex items-center justify-between sticky bottom-0">
            <span className="text-xs text-[#73736C]">
              EkoTrace verification protocol
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium bg-[#161615] hover:bg-[#333] text-white rounded-sm transition-colors"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
