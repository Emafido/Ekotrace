'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Camera, 
  Link as LinkIcon, 
  FileText, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  Edit2,
  Trash2,
  Check
} from 'lucide-react';

interface EvidenceItem {
  id: string;
  type: 'photo' | 'link' | 'document';
  name: string;
}

interface EditableClaim {
  id: string;
  title: string;
  statement: string;
  value?: string;
  isUnknownDate?: boolean;
  userSpecifiedDate?: string;
  isDateResolved?: boolean;
}

function ContributeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialAsset = searchParams.get('asset') || '';
  const initialSubject = searchParams.get('subject') || '';

  // Step state: 'input' -> 'processing' -> 'review' -> 'submitted'
  const [step, setStep] = useState<'input' | 'processing' | 'review' | 'submitted'>('input');

  // Input step state
  const [contributionText, setContributionText] = useState<string>(
    initialSubject 
      ? `Update regarding ${initialSubject}: ` 
      : ''
  );
  const [locationInput, setLocationInput] = useState<string>(
    initialAsset ? 'Lagos Island, Lagos' : ''
  );
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [activeEvidenceInput, setActiveEvidenceInput] = useState<'photo' | 'link' | 'document' | null>(null);
  const [tempEvidenceValue, setTempEvidenceValue] = useState('');

  // Processing step progressive disclosure
  const [processingProgress, setProcessingProgress] = useState(0);

  // Review step state
  const [claims, setClaims] = useState<EditableClaim[]>([
    {
      id: 'c1',
      title: 'CULTURAL ASSET IDENTIFICATION',
      statement: 'The contribution relates to Isale Eko Adamu Orisha procession protocols.',
      value: 'Eyo Festival Heritage',
    },
    {
      id: 'c2',
      title: 'LOCATION IDENTIFIED',
      statement: 'Takes place on Lagos Island between Tafawa Balewa Square and Iga Idunganran.',
      value: 'Lagos Island',
    },
    {
      id: 'c3',
      title: '2026 DATE',
      statement: 'You mentioned that the event normally happens towards the end of the year.',
      isUnknownDate: true,
      userSpecifiedDate: '',
      isDateResolved: false,
    },
    {
      id: 'c4',
      title: 'CEREMONIAL PROTOCOL',
      statement: 'Strict communal prohibition on hats, caps, umbrellas, and footwear.',
      value: 'Barefoot & bareheaded rule',
    },
    {
      id: 'c5',
      title: 'EVIDENCE ATTACHED',
      statement: 'Two community documents attached for verification review.',
      value: 'Field archival record',
    },
  ]);

  const [dateInputMode, setDateInputMode] = useState(false);
  const [tempDateInput, setTempDateInput] = useState('');

  // Attribution questions
  const [knowledgeOwner, setKnowledgeOwner] = useState<'My community' | 'An organisation' | 'Public/general information' | ''>('My community');
  const [publicDisplayPermission, setPublicDisplayPermission] = useState<'Yes' | "I'm unsure" | ''>('Yes');

  const handleAddEvidence = (type: 'photo' | 'link' | 'document') => {
    setActiveEvidenceInput(type);
    setTempEvidenceValue('');
  };

  const handleSaveEvidence = () => {
    if (tempEvidenceValue.trim() && activeEvidenceInput) {
      setEvidenceList([
        ...evidenceList,
        {
          id: `ev-${Date.now()}`,
          type: activeEvidenceInput,
          name: tempEvidenceValue.trim(),
        },
      ]);
      setActiveEvidenceInput(null);
      setTempEvidenceValue('');
    }
  };

  const handleRemoveEvidence = (id: string) => {
    setEvidenceList(evidenceList.filter((ev) => ev.id !== id));
  };

  const handleStartProcessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributionText.trim()) return;

    setStep('processing');
    setProcessingProgress(0);

    // Simulate progressive AI extraction steps
    const timer1 = setTimeout(() => setProcessingProgress(1), 500); // Cultural asset
    const timer2 = setTimeout(() => setProcessingProgress(2), 1100); // Location
    const timer3 = setTimeout(() => setProcessingProgress(3), 1700); // 5 claims extracted
    const timer4 = setTimeout(() => setProcessingProgress(4), 2200); // 2 sources attached
    const timer5 = setTimeout(() => setProcessingProgress(5), 2800); // 2 details need clarification
    const timer6 = setTimeout(() => setStep('review'), 3600); // Transition to review

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  };

  const handleSetSpecificDate = () => {
    if (tempDateInput.trim()) {
      setClaims(
        claims.map((c) =>
          c.id === 'c3'
            ? { ...c, userSpecifiedDate: tempDateInput.trim(), isDateResolved: true }
            : c
        )
      );
      setDateInputMode(false);
    }
  };

  const handleLeaveDateUnknown = () => {
    setClaims(
      claims.map((c) =>
        c.id === 'c3'
          ? { ...c, userSpecifiedDate: 'Unknown / Not yet announced', isDateResolved: true }
          : c
      )
    );
    setDateInputMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* ===================================================================
          STEP 1: NATURAL LANGUAGE CONTRIBUTION INPUT
          Do NOT begin with a giant structured form!
      =================================================================== */}
      {step === 'input' && (
        <div className="space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B4441F] font-semibold">
              Community Knowledge Ingestion
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#161615]">
              Share what you know
            </h1>
            <p className="text-base sm:text-lg text-[#5A5954] leading-relaxed font-light max-w-2xl">
              Tell us about a cultural place, festival, tradition, person, craft or story. Write naturally — we'll help organise it.
            </p>
          </div>

          <form onSubmit={handleStartProcessing} className="space-y-8">
            {/* Large Text Area */}
            <div className="space-y-2">
              <label htmlFor="contribution-text" className="sr-only">
                Cultural narrative
              </label>
              <textarea
                id="contribution-text"
                rows={7}
                value={contributionText}
                onChange={(e) => setContributionText(e.target.value)}
                placeholder="Every December, our community gathers at the shrine near the lagoon to prepare for the masquerade procession..."
                required
                className="w-full p-5 bg-white border border-[#D4CEBF] text-base sm:text-lg text-[#161615] placeholder-[#9E9B91] rounded-sm focus:outline-none focus:border-[#B4441F] focus:ring-1 focus:ring-[#B4441F] font-light leading-relaxed resize-y"
              />
              <p className="text-xs text-[#73736C] font-mono">
                Feel free to mention dates, street names, family custodians, and specific rituals.
              </p>
            </div>

            {/* Add Evidence Section */}
            <div className="space-y-3 p-5 bg-white border border-[#E8E3D8] rounded-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#161615] font-semibold">
                  Add evidence
                </span>
                <span className="text-[11px] text-[#8C887B] font-mono">
                  Photos, archives or web links
                </span>
              </div>

              {/* Action Buttons with min 44px touch targets */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleAddEvidence('photo')}
                  className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF9F5] hover:bg-[#F2ECE1] border border-[#DDD8CA] text-xs font-medium text-[#161615] rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
                >
                  <Camera className="w-4 h-4 text-[#B4441F]" />
                  <span>Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddEvidence('link')}
                  className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF9F5] hover:bg-[#F2ECE1] border border-[#DDD8CA] text-xs font-medium text-[#161615] rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
                >
                  <LinkIcon className="w-4 h-4 text-[#1C3F5E]" />
                  <span>Link</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddEvidence('document')}
                  className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF9F5] hover:bg-[#F2ECE1] border border-[#DDD8CA] text-xs font-medium text-[#161615] rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
                >
                  <FileText className="w-4 h-4 text-[#1E5C3E]" />
                  <span>Document</span>
                </button>
              </div>

              {/* Evidence input bar if an action is clicked */}
              {activeEvidenceInput && (
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={tempEvidenceValue}
                    onChange={(e) => setTempEvidenceValue(e.target.value)}
                    placeholder={
                      activeEvidenceInput === 'photo'
                        ? 'e.g. Photograph of procession in Isale Eko (filename or description)'
                        : activeEvidenceInput === 'link'
                        ? 'e.g. https://lagosarchive.org/adamu-orisha-1982'
                        : 'e.g. 1994 Festival Gazette or Family Ledger scan'
                    }
                    className="flex-1 px-3 py-2 text-xs bg-white border border-[#D4CEBF] rounded-sm focus:outline-none focus:border-[#B4441F]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSaveEvidence}
                    className="px-3 py-2 bg-[#161615] text-white text-xs font-medium rounded-sm hover:bg-[#333]"
                  >
                    Attach
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveEvidenceInput(null)}
                    className="px-2 py-2 text-xs text-[#73736C] hover:text-[#161615]"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Evidence items list */}
              {evidenceList.length > 0 && (
                <ul className="pt-2 space-y-1.5 border-t border-[#F2ECE1]">
                  {evidenceList.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between p-2 bg-[#FAF9F5] border border-[#E8E3D8] text-xs rounded-sm"
                    >
                      <div className="flex items-center gap-2">
                        {item.type === 'photo' && <Camera className="w-3 h-3 text-[#B4441F]" />}
                        {item.type === 'link' && <LinkIcon className="w-3 h-3 text-[#1C3F5E]" />}
                        {item.type === 'document' && <FileText className="w-3 h-3 text-[#1E5C3E]" />}
                        <span className="font-mono text-[#161615] truncate max-w-sm sm:max-w-md">
                          {item.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveEvidence(item.id)}
                        className="text-[#8C887B] hover:text-[#B4441F] p-1"
                        aria-label="Remove evidence"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Optional Location field */}
            <div className="space-y-2">
              <label
                htmlFor="location-input"
                className="block text-xs font-mono uppercase tracking-wider text-[#161615] font-semibold"
              >
                Where is this connected to?
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#8C887B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="location-input"
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="e.g. Lagos Island, Isale Eko, Badagry, or Lekki"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#D4CEBF] text-sm text-[#161615] rounded-sm focus:outline-none focus:border-[#B4441F] focus:ring-1 focus:ring-[#B4441F]"
                />
              </div>
            </div>

            {/* CTA Continue */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!contributionText.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#161615] hover:bg-[#B4441F] disabled:bg-[#D4CEBF] text-white font-medium text-base rounded-sm transition-colors duration-200"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================================================================
          STEP 2: SIMULATED AI PROCESSING
          Progressively revealed steps (NOT a chatbot UI)
      =================================================================== */}
      {step === 'processing' && (
        <div className="py-16 sm:py-24 space-y-8 max-w-xl mx-auto">
          <div className="space-y-2 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B4441F] font-semibold">
              Archival Parsing Engine
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#161615]">
              Organising your contribution…
            </h2>
            <p className="text-xs text-[#73736C]">
              Extracting checkable claims and mapping provenance.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-white border border-[#E8E3D8] rounded-sm space-y-4">
            {/* Item 1 */}
            <div
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                processingProgress >= 1 ? 'opacity-100' : 'opacity-20'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-[#1E5C3E] shrink-0" />
              <span className="text-sm font-medium text-[#161615]">
                Cultural asset identified
              </span>
            </div>

            {/* Item 2 */}
            <div
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                processingProgress >= 2 ? 'opacity-100' : 'opacity-20'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-[#1E5C3E] shrink-0" />
              <span className="text-sm font-medium text-[#161615]">
                Location identified
              </span>
            </div>

            {/* Item 3 */}
            <div
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                processingProgress >= 3 ? 'opacity-100' : 'opacity-20'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-[#1E5C3E] shrink-0" />
              <span className="text-sm font-medium text-[#161615]">
                5 claims extracted
              </span>
            </div>

            {/* Item 4 */}
            <div
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                processingProgress >= 4 ? 'opacity-100' : 'opacity-20'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-[#1E5C3E] shrink-0" />
              <span className="text-sm font-medium text-[#161615]">
                2 sources attached
              </span>
            </div>

            {/* Item 5 */}
            <div
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                processingProgress >= 5 ? 'opacity-100' : 'opacity-20'
              }`}
            >
              <AlertCircle className="w-5 h-5 text-[#734F18] shrink-0" />
              <span className="text-sm font-medium text-[#734F18]">
                2 details need clarification
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          STEP 3: AI REVIEW & EDITABLE CLAIM CARDS
          "Here's what we understood"
          Critical moment: "We won't guess information you didn't provide."
      =================================================================== */}
      {step === 'review' && (
        <div className="space-y-10">
          <div className="space-y-2 border-b border-[#E8E3D8] pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B4441F] font-semibold">
              Extraction Verification
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#161615]">
              Here&apos;s what we understood
            </h1>
            <p className="text-xs sm:text-sm text-[#73736C]">
              Review the structured statements extracted from your natural language contribution. You may adjust or leave unknown fields untouched.
            </p>
          </div>

          {/* Extracted Claim Cards */}
          <div className="space-y-4">
            {(() => {
              const hasUnresolvedDate = claims.some((c) => c.isUnknownDate && !c.isDateResolved);

              return claims.map((claim) => {
                if (claim.isUnknownDate) {
                  const isFocusActive = !claim.isDateResolved;
                  // THE CRITICAL "WE WON'T GUESS" MOMENT
                  return (
                    <div
                      key={claim.id}
                      className={`p-6 bg-[#FAF4E7] rounded-sm space-y-4 transition-all duration-300 ${
                        isFocusActive
                          ? 'border-2 border-[#B4441F] ring-2 ring-[#B4441F]/20 shadow-md scale-[1.01] sm:scale-[1.015]'
                          : 'border-2 border-[#D8C7A3]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#734F18] font-bold">
                          {claim.title}
                        </span>
                        <span className={`px-2.5 py-0.5 text-[11px] font-mono rounded-sm ${
                          claim.isDateResolved
                            ? 'bg-[#E3EFE7] text-[#1E5C3E]'
                            : 'bg-[#EFE3C8] text-[#734F18]'
                        }`}>
                          {claim.isDateResolved ? 'Resolved' : 'Needs confirmation'}
                        </span>
                      </div>

                      <p className="text-sm text-[#4E4D47] leading-relaxed">
                        {claim.statement}
                      </p>

                      <div className="p-3 bg-white/80 border border-[#D8C7A3] rounded-sm space-y-1">
                        <p className="text-xs font-mono text-[#734F18]">
                          Exact date: <strong className="font-semibold">{claim.userSpecifiedDate || 'Unknown'}</strong>
                        </p>
                      </div>

                      {/* Prominent rule sentence with subtle terracotta emphasis */}
                      <div className="p-3.5 bg-white border-l-4 border-[#B4441F] rounded-sm">
                        <p className="text-sm font-editorial font-medium text-[#161615]">
                          “We won’t guess information you didn’t provide.”
                        </p>
                      </div>

                      {/* Interactive date actions: stacked on mobile, row on tablet/desktop */}
                      {dateInputMode ? (
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
                          <input
                            type="text"
                            value={tempDateInput}
                            onChange={(e) => setTempDateInput(e.target.value)}
                            placeholder="e.g. December 2026 or 15–20 December 2026"
                            className="min-h-[44px] flex-1 px-3 py-2 bg-white border border-[#D4CEBF] text-xs rounded-sm focus:outline-none focus:border-[#B4441F]"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={handleSetSpecificDate}
                            className="min-h-[44px] px-5 py-2 bg-[#B4441F] hover:bg-[#8F3314] text-white text-xs font-medium rounded-sm transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setDateInputMode(false)}
                            className="min-h-[44px] px-3 py-2 text-xs text-[#73736C]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => setDateInputMode(true)}
                            className="min-h-[44px] px-5 py-2.5 bg-[#B4441F] hover:bg-[#8F3314] text-white text-xs sm:text-sm font-medium rounded-sm transition-colors text-center"
                          >
                            Add a date
                          </button>
                          <button
                            type="button"
                            onClick={handleLeaveDateUnknown}
                            className="min-h-[44px] px-5 py-2.5 bg-white hover:bg-[#F2ECE1] border border-[#D4CEBF] text-[#161615] text-xs sm:text-sm font-medium rounded-sm transition-colors text-center"
                          >
                            Leave unknown
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }

                // Standard extracted claim card: dimmed while the unknown moment is unresolved
                return (
                  <div
                    key={claim.id}
                    className={`p-4 sm:p-5 bg-white border border-[#E8E3D8] rounded-sm space-y-2 hover:border-[#BFB9A8] transition-all duration-300 ${
                      hasUnresolvedDate ? 'opacity-65' : 'opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C887B]">
                        {claim.title}
                      </span>
                      <span className="text-xs font-mono text-[#1E5C3E] flex items-center gap-1">
                        <Check className="w-3 h-3" /> Extracted
                      </span>
                    </div>
                    <p className="font-editorial text-base sm:text-lg text-[#161615]">
                      “{claim.statement}”
                    </p>
                    {claim.value && (
                      <div className="pt-2 border-t border-[#F5F0E6] flex items-center justify-between text-xs text-[#5A5954]">
                        <span className="font-mono text-[#8C887B]">Tagged Value:</span>
                        <span className="font-medium text-[#161615]">{claim.value}</span>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>

          {/* ===================================================================
              CONTRIBUTION REVIEW QUESTIONS
              Who does this knowledge belong to?
              Can this information be publicly displayed?
          =================================================================== */}
          <div className="space-y-6 pt-6 border-t border-[#E8E3D8]">
            <h3 className="font-editorial text-2xl font-medium text-[#161615]">
              Archival Provenance & Consent
            </h3>

            {/* Question 1 */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#161615] font-semibold">
                Who does this knowledge belong to?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {(['My community', 'An organisation', 'Public/general information'] as const).map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setKnowledgeOwner(opt)}
                      className={`min-h-[44px] p-3 text-xs font-medium text-left border rounded-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#B4441F] ${
                        knowledgeOwner === opt
                          ? 'bg-[#161615] text-[#FAF9F5] border-[#161615]'
                          : 'bg-white hover:bg-[#FAF8F4] text-[#4A4944] border-[#D4CEBF]'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#161615] font-semibold">
                Can this information be publicly displayed?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {(['Yes', "I'm unsure"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPublicDisplayPermission(opt)}
                    className={`min-h-[44px] p-3 text-xs font-medium text-left border rounded-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#B4441F] ${
                      publicDisplayPermission === opt
                        ? 'bg-[#161615] text-[#FAF9F5] border-[#161615]'
                        : 'bg-white hover:bg-[#FAF8F4] text-[#4A4944] border-[#D4CEBF]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Actions: full-width on mobile */}
          <div className="pt-6 border-t border-[#E8E3D8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                alert('Draft saved locally in your browser.');
              }}
              className="min-h-[48px] w-full sm:w-auto px-6 py-3 border border-[#D4CEBF] hover:bg-[#F2ECE1] text-[#161615] text-xs sm:text-sm font-medium rounded-sm transition-colors text-center"
            >
              Save draft
            </button>

            <button
              type="button"
              onClick={() => setStep('submitted')}
              className="min-h-[48px] w-full sm:w-auto px-8 py-3.5 bg-[#B4441F] hover:bg-[#8F3314] text-white text-xs sm:text-sm font-medium rounded-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Submit for verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================
          STEP 4: SUBMITTED CONFIRMATION
      =================================================================== */}
      {step === 'submitted' && (
        <div className="py-12 sm:py-20 space-y-8 max-w-xl mx-auto text-center">
          <div className="w-12 h-12 bg-[#EEF7F2] text-[#1E5C3E] rounded-full mx-auto flex items-center justify-center border border-[#C2E2CE]">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1E5C3E] font-semibold">
              Archival Deposit Received
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-[#161615]">
              Submitted for community verification
            </h1>
            <p className="text-sm text-[#5A5954] leading-relaxed">
              Your contribution has been assigned verification ID{' '}
              <span className="font-mono font-medium text-[#161615]">#EK-2026-904</span>.
              Local custodians and archival reviewers will cross-reference the claims before they are recorded in the public register.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#E8E3D8] rounded-sm text-xs text-[#73736C] space-y-1">
            <p><strong>Note:</strong> We never publish unverified submissions directly.</p>
            <p>You can experience how a community custodian verifies these claims below.</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/review/eyo-community-update"
              className="w-full sm:w-auto px-6 py-3 bg-[#161615] hover:bg-[#B4441F] text-white text-xs font-medium rounded-sm transition-colors"
            >
              Open Verifier Review flow →
            </Link>
            <Link
              href="/explore"
              className="w-full sm:w-auto px-6 py-3 border border-[#D4CEBF] hover:bg-[#F2ECE1] text-[#161615] text-xs font-medium rounded-sm transition-colors"
            >
              Return to Cultural Archive
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContributePage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-16 text-center text-sm font-mono text-[#8C887B]">Loading contribution form...</div>}>
      <ContributeContent />
    </Suspense>
  );
}
