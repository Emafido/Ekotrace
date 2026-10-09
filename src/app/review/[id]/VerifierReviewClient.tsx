'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ContributionSubmission } from '@/types';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowLeft, 
  Camera, 
  FileText, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { motion, gsap, prefersReducedMotion } from '@/lib/motion';

interface VerifierReviewClientProps {
  submission: ContributionSubmission;
}

type Decision = 'confirmed' | 'needs-correction' | 'cant-verify';

export const VerifierReviewClient: React.FC<VerifierReviewClientProps> = ({
  submission,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [animatingDecision, setAnimatingDecision] = useState<Decision | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  const claims = submission.extractedClaims;
  const currentClaim = claims[currentIndex];
  const totalClaims = claims.length;

  const handleDecision = (decision: Decision) => {
    if (animatingDecision) return; // Prevent double clicks
    setAnimatingDecision(decision);

    const updated = { ...decisions, [currentClaim.id]: decision };
    setDecisions(updated);

    const isReduced = prefersReducedMotion();

    if (isReduced) {
      if (currentIndex + 1 < totalClaims) {
        setCurrentIndex(currentIndex + 1);
        setAnimatingDecision(null);
      } else {
        setIsCompleted(true);
        setAnimatingDecision(null);
      }
      return;
    }

    // Trust Mode: calm, deliberate transition (no bounce, no confetti)
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0.2,
        y: -6,
        duration: motion.fast,
        ease: motion.trustEase,
        onComplete: () => {
          if (currentIndex + 1 < totalClaims) {
            setCurrentIndex((prev) => prev + 1);
            setAnimatingDecision(null);
            gsap.fromTo(
              cardRef.current,
              { opacity: 0.2, y: 8 },
              { opacity: 1, y: 0, duration: motion.normal, ease: motion.trustEase }
            );
          } else {
            setIsCompleted(true);
            setAnimatingDecision(null);
          }
        },
      });
    } else {
      if (currentIndex + 1 < totalClaims) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsCompleted(true);
      }
      setAnimatingDecision(null);
    }
  };

  const handleRestart = () => {
    setDecisions({});
    setCurrentIndex(0);
    setIsCompleted(false);
    setAnimatingDecision(null);
  };

  // Summary counts
  const confirmedCount = Object.values(decisions).filter((d) => d === 'confirmed').length;
  const unverifiedCount = Object.values(decisions).filter(
    (d) => d === 'cant-verify' || d === 'needs-correction'
  ).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-8">
      {/* Back button with min 44px touch target */}
      <div>
        <Link
          href="/explore"
          className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#73736C] hover:text-[#161615] transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Verifier Workspace</span>
        </Link>
      </div>

      {/* Header (Focused, not a SaaS dashboard) */}
      <header className="space-y-3 border-b border-[#E8E3D8] pb-5">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#EEF4F9] border border-[#C1D5E5] text-[#1B4163] text-xs font-mono font-medium rounded-sm">
          <span>Community Verifier Workspace</span>
        </div>

        <h1 className="font-editorial text-2xl sm:text-4xl font-medium tracking-tight text-[#161615]">
          Review contribution
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#5A5954] gap-2 pt-1">
          <div className="min-w-0">
            <span className="font-mono text-[#8C887B]">Record: </span>
            <strong className="text-[#161615] font-semibold break-words">{submission.assetTitle}</strong>
          </div>
          <div className="min-w-0">
            <span className="font-mono text-[#8C887B]">Submitted by: </span>
            <span className="font-medium text-[#161615] break-words">{submission.submittedBy}</span>
          </div>
        </div>
      </header>

      {/* Verification Claim View (One claim at a time) */}
      {!isCompleted && currentClaim ? (
        <div className="space-y-6 sm:space-y-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-mono text-[#73736C]">
            <span className="text-[#B4441F] font-semibold uppercase">
              Claim {currentIndex + 1} of {totalClaims}
            </span>
            <span>
              {Math.round(((currentIndex + 1) / totalClaims) * 100)}% reviewed
            </span>
          </div>

          <div className="w-full bg-[#E8E3D8] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#B4441F] h-1.5 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalClaims) * 100}%` }}
            />
          </div>

          {/* Current Claim Card */}
          <div
            ref={cardRef}
            className="bg-white border border-[#E8E3D8] rounded-sm p-4 sm:p-7 space-y-5 transition-shadow"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C887B]">
                  {currentClaim.title}
                </span>
                {animatingDecision && (
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-sm ${
                    animatingDecision === 'confirmed' 
                      ? 'bg-[#EEF7F2] text-[#1E5C3E]' 
                      : animatingDecision === 'needs-correction'
                      ? 'bg-[#FAF4E7] text-[#734F18]'
                      : 'bg-[#F2ECE1] text-[#5A5954]'
                  }`}>
                    {animatingDecision === 'confirmed' ? '✓ Confirmed' : animatingDecision === 'needs-correction' ? 'Needs correction' : "Can't verify"}
                  </span>
                )}
              </div>

              <p className="font-editorial text-lg sm:text-2xl text-[#161615] leading-snug break-words">
                “{currentClaim.statement}”
              </p>
              {currentClaim.clarificationPrompt && (
                <div className="p-3 bg-[#FAF4E7] border border-[#E8DCBF] rounded-sm text-xs text-[#734F18]">
                  <strong>Contributory context:</strong> {currentClaim.clarificationPrompt}
                </div>
              )}
            </div>

            {/* Evidence attached */}
            <div className="space-y-2 pt-4 border-t border-[#F2ECE1]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8C887B]">
                Evidence:
              </span>
              <ul className="space-y-1.5 text-xs text-[#484843]">
                {submission.evidence.map((ev) => (
                  <li key={ev.id} className="flex items-center gap-2">
                    {ev.type === 'photo' ? (
                      <Camera className="w-3.5 h-3.5 text-[#B4441F] shrink-0" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-[#1C3F5E] shrink-0" />
                    )}
                    <span className="font-mono text-[#161615] break-words">{ev.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Source */}
            <div className="pt-2 border-t border-[#F2ECE1] text-xs flex items-center justify-between text-[#73736C]">
              <span>Source:</span>
              <span className="font-medium text-[#161615]">
                Community contributor
              </span>
            </div>
          </div>

          {/* Action Decision Buttons (Min 48px touch target on mobile) */}
          <div className="space-y-2.5">
            <span className="block text-xs font-mono uppercase tracking-wider text-[#73736C]">
              Verification Verdict
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => handleDecision('confirmed')}
                disabled={Boolean(animatingDecision)}
                className="min-h-[48px] p-3.5 bg-[#EEF7F2] hover:bg-[#D9EFE2] border border-[#C2E2CE] text-[#1E5C3E] rounded-sm text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#1E5C3E] disabled:opacity-60"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{animatingDecision === 'confirmed' ? '✓ Confirmed' : 'Confirm'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDecision('needs-correction')}
                disabled={Boolean(animatingDecision)}
                className="min-h-[48px] p-3.5 bg-[#FAF4E7] hover:bg-[#F3E7CA] border border-[#E8DCBF] text-[#734F18] rounded-sm text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#734F18] disabled:opacity-60"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{animatingDecision === 'needs-correction' ? 'Marked for correction' : 'Needs correction'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleDecision('cant-verify')}
                disabled={Boolean(animatingDecision)}
                className="min-h-[48px] p-3.5 bg-[#FAF9F5] hover:bg-[#F2ECE1] border border-[#D4CEBF] text-[#5A5954] rounded-sm text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#5A5954] disabled:opacity-60"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{animatingDecision === 'cant-verify' ? 'Marked unverified' : "Can't verify"}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Review Completed Summary Screen */
        <div className="bg-white border border-[#E8E3D8] rounded-sm p-8 sm:p-10 space-y-8 text-center animate-in fade-in duration-300">
          <div className="w-12 h-12 bg-[#EEF7F2] text-[#1E5C3E] rounded-full mx-auto flex items-center justify-center border border-[#C2E2CE]">
            <Check className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1E5C3E] font-semibold">
              Review Cycle Complete
            </span>
            <h2 className="font-editorial text-3xl font-medium text-[#161615]">
              Verification Assessment
            </h2>
          </div>

          {/* Results Summary */}
          <div className="p-6 bg-[#FAF9F5] border border-[#E2DDD0] rounded-sm max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#1E5C3E] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <strong>{confirmedCount} claims confirmed</strong>
              </span>
              <span className="font-mono text-xs text-[#73736C]">Verified</span>
            </div>

            {unverifiedCount > 0 && (
              <div className="flex items-center justify-between text-sm border-t border-[#EAE5D8] pt-2">
                <span className="text-[#734F18] font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <strong>{unverifiedCount} {unverifiedCount === 1 ? 'claim' : 'claims'} flagged for review</strong>
                </span>
                <span className="font-mono text-xs text-[#73736C]">Flagged</span>
              </div>
            )}
          </div>

          <p className="text-xs text-[#73736C] max-w-sm mx-auto">
            These determinations will be recorded in the community verification ledger for this cultural submission.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/explore/eyo-festival"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#161615] hover:bg-[#B4441F] text-white text-xs sm:text-sm font-medium rounded-sm transition-colors"
            >
              Complete review
            </Link>

            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-3.5 border border-[#D4CEBF] hover:bg-[#F2ECE1] text-[#161615] text-xs font-medium rounded-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Review again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
