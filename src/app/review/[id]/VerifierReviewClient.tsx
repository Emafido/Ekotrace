'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ContributionSubmission, ExtractedClaimItem } from '@/types';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Camera, 
  ShieldCheck, 
  Check, 
  RotateCcw 
} from 'lucide-react';

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

  const claims = submission.extractedClaims;
  const currentClaim = claims[currentIndex];
  const totalClaims = claims.length;

  const handleDecision = (decision: Decision) => {
    const updated = { ...decisions, [currentClaim.id]: decision };
    setDecisions(updated);

    if (currentIndex + 1 < totalClaims) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setDecisions({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // Summary counts
  const confirmedCount = Object.values(decisions).filter((d) => d === 'confirmed').length;
  const unverifiedCount = Object.values(decisions).filter(
    (d) => d === 'cant-verify' || d === 'needs-correction'
  ).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#73736C] hover:text-[#161615] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Verifier Workspace</span>
        </Link>
      </div>

      {/* Header (Focused, not a SaaS dashboard) */}
      <header className="space-y-3 border-b border-[#E8E3D8] pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#EEF4F9] border border-[#C1D5E5] text-[#1B4163] text-xs font-mono font-medium rounded-sm">
          <span>Community Verifier Portal</span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#161615]">
          Review contribution
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#5A5954] gap-2 pt-1">
          <div>
            <span className="font-mono text-[#8C887B]">Record: </span>
            <strong className="text-[#161615] font-semibold">{submission.assetTitle}</strong>
          </div>
          <div>
            <span className="font-mono text-[#8C887B]">Submitted by: </span>
            <span className="font-medium text-[#161615]">Community contributor ({submission.submittedBy})</span>
          </div>
        </div>
      </header>

      {/* Verification Claim View (One claim at a time) */}
      {!isCompleted ? (
        <div className="space-y-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-mono text-[#73736C]">
            <span className="text-[#B4441F] font-semibold uppercase">
              Claim {currentIndex + 1} of {totalClaims}
            </span>
            <span>
              {Math.round(((currentIndex + 1) / totalClaims) * 100)}% reviewed
            </span>
          </div>

          <div className="w-full bg-[#E8E3D8] h-1 rounded-full overflow-hidden">
            <div
              className="bg-[#B4441F] h-1 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalClaims) * 100}%` }}
            />
          </div>

          {/* Current Claim Card */}
          <div className="bg-white border border-[#E8E3D8] rounded-sm p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C887B]">
                {currentClaim.title}
              </span>
              <p className="font-editorial text-xl sm:text-2xl text-[#161615] leading-snug">
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
                      <Camera className="w-3.5 h-3.5 text-[#B4441F]" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-[#1C3F5E]" />
                    )}
                    <span className="font-mono text-[#161615]">{ev.name}</span>
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

          {/* Action Decision Buttons */}
          <div className="space-y-3">
            <span className="block text-xs font-mono uppercase tracking-wider text-[#73736C]">
              Verification Verdict
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleDecision('confirmed')}
                className="p-4 bg-[#EEF7F2] hover:bg-[#D9EFE2] border border-[#C2E2CE] text-[#1E5C3E] rounded-sm text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm</span>
              </button>

              <button
                type="button"
                onClick={() => handleDecision('needs-correction')}
                className="p-4 bg-[#FAF4E7] hover:bg-[#F3E7CA] border border-[#E8DCBF] text-[#734F18] rounded-sm text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Needs correction</span>
              </button>

              <button
                type="button"
                onClick={() => handleDecision('cant-verify')}
                className="p-4 bg-[#FAF9F5] hover:bg-[#F2ECE1] border border-[#D4CEBF] text-[#5A5954] rounded-sm text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Can&apos;t verify</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Review Completed Summary Screen */
        <div className="bg-white border border-[#E8E3D8] rounded-sm p-8 sm:p-10 space-y-8 text-center">
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

          {/* Results Summary as required by spec */}
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
                  <strong>{unverifiedCount} claim could not be verified</strong>
                </span>
                <span className="font-mono text-xs text-[#73736C]">Flagged</span>
              </div>
            )}
          </div>

          <p className="text-xs text-[#73736C] max-w-sm mx-auto">
            These determinations will be archived with your verified credential signature in the Lagos Cultural Registry.
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
