'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Claim } from '@/types';
import { VerificationBadge } from './VerificationBadge';
import { X, Calendar, UserCheck, BookOpen, FileText, Camera, ArrowRight, ShieldAlert } from 'lucide-react';
import { motion, gsap, prefersReducedMotion } from '@/lib/motion';

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
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const conflictItemsRef = useRef<HTMLDivElement>(null);
  const resolutionNoteRef = useRef<HTMLDivElement>(null);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // GSAP animation for drawer entrance
  useEffect(() => {
    if (!isOpen || !claim) return;

    const reduced = prefersReducedMotion();
    if (reduced) {
      if (backdropRef.current) gsap.set(backdropRef.current, { opacity: 1 });
      if (panelRef.current) gsap.set(panelRef.current, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const isMobile = window.innerWidth < 640;
    const tl = gsap.timeline({ defaults: { ease: motion.trustEase } });

    // Backdrop fade
    if (backdropRef.current) {
      tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: motion.fast }, 0);
    }

    // Panel entrance (Desktop: right slide x, Mobile: bottom sheet slide y)
    if (panelRef.current) {
      if (isMobile) {
        tl.fromTo(
          panelRef.current,
          { y: '100%', opacity: 0.5 },
          { y: '0%', opacity: 1, duration: motion.normal },
          0
        );
      } else {
        tl.fromTo(
          panelRef.current,
          { x: '100%', opacity: 0.5 },
          { x: '0%', opacity: 1, duration: motion.normal },
          0
        );
      }
    }

    // Conflict view sequential reveal (Sources disagree)
    if (claim.status === 'conflicting' && conflictItemsRef.current) {
      const pointElements = conflictItemsRef.current.children;
      if (pointElements.length > 0) {
        tl.fromTo(
          pointElements,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: motion.fast,
            stagger: 0.14,
            ease: motion.trustEase,
          },
          '+=0.08'
        );
      }

      if (resolutionNoteRef.current) {
        tl.fromTo(
          resolutionNoteRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: motion.fast, ease: motion.trustEase },
          '+=0.05'
        );
      }
    }

    return () => {
      tl.kill();
    };
  }, [isOpen, claim]);

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
        ref={backdropRef}
        className="fixed inset-0 bg-[#161615]/50 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Responsive Sheet: Bottom Sheet on Mobile (<640px), Right Drawer on Desktop (>=640px) */}
      <div className="fixed inset-x-0 bottom-0 max-h-[92vh] sm:max-h-full sm:inset-y-0 sm:right-0 sm:left-auto sm:w-full sm:max-w-lg z-10 flex">
        <div
          ref={panelRef}
          className="w-full bg-[#FAF9F5] rounded-t-2xl sm:rounded-none border-t sm:border-t-0 sm:border-l border-[#E5E0D2] shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          {/* Mobile Drag Indicator Bar */}
          <div className="sm:hidden pt-3 pb-1 flex justify-center bg-[#F5F1E8]/90">
            <div className="w-12 h-1.5 bg-[#D4CEBF] rounded-full" />
          </div>

          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#E8E3D8] bg-[#F5F1E8]/80 flex items-start justify-between sticky top-0 z-20 backdrop-blur-sm">
            <div className="space-y-1 pr-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#73736C]">
                  Evidence Provenance
                </span>
                <span className="text-[11px] text-[#A6A296]">•</span>
                <span className="text-[11px] font-medium text-[#73736C] truncate max-w-[180px] sm:max-w-[240px]">
                  {assetName}
                </span>
              </div>
              <h2 id="drawer-claim-title" className="text-sm sm:text-base font-semibold text-[#161615]">
                Claim Origin & Sources
              </h2>
            </div>
            
            {/* Min 44px touch target close button */}
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#5A5954] hover:text-[#161615] hover:bg-[#EAE4D7] rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
              aria-label="Close claim drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-5 sm:p-8 space-y-6 sm:space-y-8 flex-1 overflow-y-auto overscroll-contain">
            
            {/* Primary Claim Statement */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8A8679]">
                  Claim Statement
                </span>
                <VerificationBadge status={claim.status} size="md" />
              </div>

              <div className="p-4 sm:p-5 bg-white border border-[#E2DDD0] rounded-sm">
                <p className="font-editorial text-lg sm:text-xl text-[#161615] leading-snug break-words">
                  “{claim.statement}”
                </p>
                {claim.value && !isConflicting && (
                  <div className="mt-3 pt-3 border-t border-[#F2ECE1] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-[#5A5954]">
                    <span className="font-mono text-[#8C887B]">Documented Value:</span>
                    <span className="font-medium text-[#161615] break-words">{claim.value}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CONFLICTING STATE: Sequential evidence accumulation */}
            {isConflicting && claim.conflictDetails && (
              <div className="space-y-4 p-4 sm:p-5 bg-[#FDF5F1] border border-[#F2D4C8] rounded-sm">
                <div className="flex items-center gap-2 text-[#8E361D]">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <h3 className="text-xs font-mono uppercase tracking-wider font-semibold">
                    Sources Disagree
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#63483E] leading-relaxed">
                  {claim.conflictDetails.description}
                </p>

                {/* Vertically Stacked Competing Points with sequential reveal */}
                <div ref={conflictItemsRef} className="space-y-3 pt-1">
                  {claim.conflictDetails.competingPoints.map((point, index) => (
                    <div
                      key={index}
                      className="p-3.5 bg-white border border-[#ECD1C5] rounded-sm text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap font-mono">
                        <span className="font-semibold text-[#8E361D]">{point.sourceLabel}</span>
                        <span className="px-2.5 py-1 bg-[#FAF2EE] text-[#8E361D] font-bold rounded-sm border border-[#F0D5C9]">
                          {point.claimValue}
                        </span>
                      </div>
                      <p className="text-[#3F3E3A] font-medium leading-snug break-words">{point.sourceName}</p>
                      {point.note && (
                        <p className="text-[#756E68] text-[11px] leading-normal pt-0.5 break-words">{point.note}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Resolution notice & Full-width CTA */}
                <div ref={resolutionNoteRef} className="pt-3 border-t border-[#F1D7CD] space-y-3">
                  <p className="text-xs font-medium text-[#8E361D] italic leading-relaxed break-words">
                    {claim.conflictDetails.resolutionNote}
                  </p>
                  <Link
                    href={`/contribute?claimId=${encodeURIComponent(claim.id)}&subject=${encodeURIComponent(claim.statement)}`}
                    onClick={onClose}
                    className="min-h-[44px] flex items-center justify-center w-full gap-2 px-4 py-3 bg-[#8E361D] hover:bg-[#722A16] text-[#FAF9F5] text-xs sm:text-sm font-medium rounded-sm transition-colors"
                  >
                    <span>Contribute an update</span>
                    <ArrowRight className="w-4 h-4" />
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
                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-[#73736C] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#8C887B] shrink-0" />
                    <span>Verified by:</span>
                  </span>
                  <span className="font-medium text-[#161615] sm:text-right break-words">
                    {claim.verification.verifierName}
                  </span>
                </div>
                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-[#73736C]">Role / Desk:</span>
                  <span className="text-[#484843] sm:text-right font-mono text-[11px] break-words">
                    {claim.verification.verifierRole}
                  </span>
                </div>
                <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-[#73736C] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8C887B] shrink-0" />
                    <span>Last reviewed:</span>
                  </span>
                  <span className="text-[#161615] font-mono text-[11px]">
                    {claim.lastReviewedAt}
                  </span>
                </div>
                {claim.verification.verificationNotes && (
                  <div className="p-3.5 space-y-1 bg-[#FAF9F5]">
                    <span className="text-[11px] font-mono text-[#8C887B] uppercase">Verification Notes:</span>
                    <p className="text-[#484843] text-[11px] sm:text-xs leading-relaxed break-words">
                      {claim.verification.verificationNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Supporting Sources List */}
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
                      <div className="flex items-start gap-2.5">
                        <BookOpen className="w-4 h-4 text-[#B4441F] shrink-0 mt-0.5" />
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#161615] leading-snug break-words">
                            {src.title}
                          </p>
                          <p className="text-[11px] text-[#63625C] break-words">
                            {src.authorOrOrg} {src.yearOrDate && `• ${src.yearOrDate}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-1.5 border-t border-[#F5F0E6]">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#F4EFE6] text-[#69655D] rounded-sm">
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
                  Supporting Evidence ({claim.evidence.length})
                </h3>
                <div className="space-y-2.5">
                  {claim.evidence.map((ev, i) => (
                    <div
                      key={ev.id || i}
                      className="p-3.5 bg-white border border-[#E2DDD0] rounded-sm flex items-start gap-3"
                    >
                      {ev.type === 'photo' ? (
                        <Camera className="w-4 h-4 text-[#1C3F5E] shrink-0 mt-0.5" />
                      ) : (
                        <FileText className="w-4 h-4 text-[#1C3F5E] shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-0.5 text-xs flex-1 min-w-0">
                        <p className="font-medium text-[#161615] break-words">{ev.title}</p>
                        <p className="text-[11px] text-[#69655D] leading-relaxed break-words">
                          {ev.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer with large touch target */}
          <div className="p-4 sm:p-5 border-t border-[#E8E3D8] bg-[#F5F1E8]/90 flex items-center justify-between sticky bottom-0 z-20 gap-3">
            <span className="text-xs text-[#73736C] hidden sm:inline">
              EkoTrace verification record
            </span>
            <button
              onClick={onClose}
              className="min-h-[44px] w-full sm:w-auto px-6 py-2.5 text-xs font-medium bg-[#161615] hover:bg-[#333] text-white rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
