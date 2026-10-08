import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, BookOpen, Users, Compass } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Title */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B4441F] font-semibold">
          About EkoTrace
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-[#161615]">
          A living, community-verified cultural archive for Lagos.
        </h1>
        <p className="font-editorial text-xl sm:text-2xl text-[#3F3E39] italic leading-relaxed border-l-2 border-[#B4441F] pl-4 sm:pl-6 my-6">
          “Culture comes first visually. Verification exists underneath as the trust layer.”
        </p>
      </div>

      {/* Main Philosophy */}
      <div className="space-y-6 text-base sm:text-lg text-[#3E3E39] font-light leading-relaxed">
        <p>
          Lagos is one of the world’s most dynamic cultural capitals — home to centuries-old Yoruba royal masquerades, Afro-Brazilian returnee communities in Popo Aguda, pioneering contemporary visual art institutions, and aquatic stilt settlements in the lagoon.
        </p>
        <p>
          Too often, tourism directories treat culture as passive commercial inventory: flat business listings, unverified opening hours, or generic travel advice that erases the elders, artists, and families who preserve these living traditions.
        </p>
        <p>
          <strong>EkoTrace was created to invert that model.</strong>
        </p>
      </div>

      {/* The 5 Archival Principles */}
      <div className="space-y-8 pt-8 border-t border-[#E8E3D8]">
        <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#161615]">
          Our Archival Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Principle 1 */}
          <div className="p-6 bg-white border border-[#E8E3D8] rounded-sm space-y-2">
            <span className="text-xs font-mono uppercase text-[#B4441F] font-semibold">
              01 • Provenance First
            </span>
            <h3 className="font-editorial text-lg font-medium text-[#161615]">
              Every Claim Has an Origin
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5954] leading-relaxed">
              Every fact — from the street location of a procession to historical founding dates — can be traced directly to living elders, field recordings, or archival gazettes.
            </p>
          </div>

          {/* Principle 2 */}
          <div className="p-6 bg-white border border-[#E8E3D8] rounded-sm space-y-2">
            <span className="text-xs font-mono uppercase text-[#1E5C3E] font-semibold">
              02 • Uncertainty is Not a Failure
            </span>
            <h3 className="font-editorial text-lg font-medium text-[#161615]">
              Transparent Conflict States
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5954] leading-relaxed">
              When oral tradition and colonial records diverge, or when institution hours conflict, we document the perspectives rather than force a synthetic answer.
            </p>
          </div>

          {/* Principle 3 */}
          <div className="p-6 bg-white border border-[#E8E3D8] rounded-sm space-y-2">
            <span className="text-xs font-mono uppercase text-[#1C3F5E] font-semibold">
              03 • No AI Guesswork
            </span>
            <h3 className="font-editorial text-lg font-medium text-[#161615]">
              Zero Inferred Speculation
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5954] leading-relaxed">
              When processing community submissions, we never fabricate dates or names that contributors did not provide. If a date is unknown, it remains marked as unknown.
            </p>
          </div>

          {/* Principle 4 */}
          <div className="p-6 bg-white border border-[#E8E3D8] rounded-sm space-y-2">
            <span className="text-xs font-mono uppercase text-[#734F18] font-semibold">
              04 • Living Custodianship
            </span>
            <h3 className="font-editorial text-lg font-medium text-[#161615]">
              Community Sovereignty
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5954] leading-relaxed">
              Cultural knowledge belongs to the communities that sustain it. Contributions require explicit consent regarding ownership and public visibility.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-8 sm:p-12 bg-[#FAF7F0] border border-[#E6E0D2] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-editorial text-xl sm:text-2xl font-medium text-[#161615]">
            Have cultural knowledge to contribute?
          </h3>
          <p className="text-xs sm:text-sm text-[#5A5954]">
            Document a festival, oral story, traditional craft, or culinary spot from your neighborhood.
          </p>
        </div>
        <Link
          href="/contribute"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] w-full sm:w-auto bg-[#161615] hover:bg-[#B4441F] text-white text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap"
        >
          <span>Share what you know</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
