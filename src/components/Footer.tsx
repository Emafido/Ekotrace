import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#161615] text-[#FAF9F5] border-t border-[#262624] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#2C2C29]">
          {/* Brand & Editorial Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-2xl sm:text-3xl font-semibold tracking-tight text-[#FAF9F5]">
                EkoTrace
              </span>
              <span className="text-xs uppercase tracking-widest text-[#B54825] font-mono">
                Lagos Archive
              </span>
            </div>
            <p className="text-sm text-[#BDBAA8] leading-relaxed max-w-md">
              A community-verified cultural archive for Lagos. We document festivals, places, traditions, food, crafts, and oral histories — with every claim traced back to living elders, institutional records, and community contributors.
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs uppercase tracking-wider text-[#A19D8E] font-medium border-l-2 border-[#B4441F] pl-3 py-0.5">
                Culture first. Verification underneath as the trust layer.
              </span>
            </div>
          </div>

          {/* Cultural Discovery Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#EAE6D9]">
              Cultural Directory
            </h4>
            <ul className="space-y-2 text-sm text-[#A8A495]">
              <li>
                <Link href="/explore?category=festival" className="hover:text-white transition-colors">
                  Festivals & Masquerades
                </Link>
              </li>
              <li>
                <Link href="/explore?category=place" className="hover:text-white transition-colors">
                  Galleries & Historic Sites
                </Link>
              </li>
              <li>
                <Link href="/explore?category=tradition" className="hover:text-white transition-colors">
                  Sacred Rituals & Masking
                </Link>
              </li>
              <li>
                <Link href="/explore?category=food" className="hover:text-white transition-colors">
                  Nocturnal Culinary Heritage
                </Link>
              </li>
              <li>
                <Link href="/explore?category=craft" className="hover:text-white transition-colors">
                  Adire & Indigenous Crafts
                </Link>
              </li>
              <li>
                <Link href="/explore?category=story" className="hover:text-white transition-colors">
                  Waterfront & Island Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Knowledge Commons */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#EAE6D9]">
              Trust & Archival Ethics
            </h4>
            <p className="text-xs text-[#A8A495] leading-relaxed">
              When oral tradition and colonial records diverge, EkoTrace does not force a synthetic answer. We record the tension transparently so researchers and visitors understand how memory lives in Lagos.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/contribute"
                className="inline-flex items-center text-xs font-medium text-[#FAF9F5] hover:text-[#B4441F] transition-colors"
              >
                → Document a cultural record from your community
              </Link>
              <Link
                href="/review/eyo-community-update"
                className="inline-flex items-center text-xs font-medium text-[#A8A495] hover:text-white transition-colors"
              >
                → View the community verification protocol
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7F7B6E] gap-4">
          <p>© 2026 EkoTrace Project. Built for Lagos cultural heritage custodians.</p>
          <div className="flex items-center gap-6">
            <span>Isale Eko • Badagry • Popo Aguda • Lekki • Makoko</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
