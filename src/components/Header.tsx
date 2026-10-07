'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Plus, Menu, X, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Explore', href: '/explore' },
    { label: 'Events', href: '/explore?category=festival' },
    { label: 'Stories', href: '/explore?category=story' },
    { label: 'About', href: '/about' },
  ];

  const isActive = (href: string) => {
    if (href === '/explore' && pathname === '/explore') return true;
    if (href !== '/explore' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-sm border-b border-[#E8E3D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Platform Tagline */}
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-baseline gap-2">
              <span className="font-editorial text-2xl sm:text-3xl font-semibold tracking-tight text-[#161615] group-hover:text-[#B4441F] transition-colors">
                EkoTrace
              </span>
              <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-[#73736C] font-mono border-l border-[#DCD7CA] pl-2.5">
                Lagos Cultural Archive
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    active
                      ? 'text-[#B4441F] font-semibold'
                      : 'text-[#484843] hover:text-[#161615]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B4441F]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions: Search & Contribute */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#484843] hover:text-[#161615] hover:bg-[#F2ECE1] rounded-sm transition-colors"
              aria-label="Search cultural archive"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Contribute CTA */}
            <Link
              href="/contribute"
              className="inline-flex items-center gap-2 bg-[#161615] hover:bg-[#B4441F] text-[#FAF9F5] text-xs sm:text-sm font-medium px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-sm transition-colors duration-200"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E8E3D8]" />
              <span>Contribute</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#484843] hover:text-[#161615] hover:bg-[#F2ECE1] rounded-sm transition-colors ml-1"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Collapsible Strip */}
        {searchOpen && (
          <div className="py-3 pb-4 border-t border-[#E8E3D8] animate-in fade-in duration-200">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-[#73736C] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search festivals, places, traditions, food, crafts or stories..."
                autoFocus
                className="w-full pl-10 pr-24 py-2.5 bg-white border border-[#D4CEBF] text-sm text-[#161615] placeholder-[#8C8B82] rounded-sm focus:outline-none focus:border-[#B4441F] focus:ring-1 focus:ring-[#B4441F]"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1.5 bg-[#161615] hover:bg-[#333] text-white text-xs font-medium rounded-sm transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E3D8] bg-[#FAF9F5] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium py-2 text-[#161615] hover:text-[#B4441F] border-b border-[#EFEBE1]"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8C8B82]" />
              </Link>
            ))}
          </nav>

          <div className="pt-2">
            <p className="text-xs text-[#73736C] leading-relaxed">
              Every cultural record on EkoTrace is grounded in oral histories, institutional archives, or community testimonies.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
