'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Plus, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, gsap, prefersReducedMotion } from '@/lib/motion';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuSheetRef = useRef<HTMLDivElement>(null);
  const menuBackdropRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close menu/search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (searchOpen) setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, searchOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // GSAP animation for opening mobile sheet
  useEffect(() => {
    if (mobileMenuOpen && menuSheetRef.current && menuBackdropRef.current) {
      const isReduced = prefersReducedMotion();
      if (isReduced) {
        gsap.set(menuBackdropRef.current, { opacity: 1 });
        gsap.set(menuSheetRef.current, { y: 0, opacity: 1 });
        return;
      }

      // Calm slide & fade (no bounce)
      gsap.fromTo(
        menuBackdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: motion.fast, ease: motion.easeOut }
      );
      gsap.fromTo(
        menuSheetRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: motion.normal, ease: motion.easeOut }
      );
    }
  }, [mobileMenuOpen]);

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
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="group flex items-baseline gap-2 py-2 focus:outline-none">
              <span className="font-editorial text-2xl sm:text-3xl font-semibold tracking-tight text-[#161615] group-hover:text-[#B4441F] transition-colors">
                EkoTrace
              </span>
              <span className="hidden md:inline-block text-[11px] uppercase tracking-widest text-[#73736C] font-mono border-l border-[#DCD7CA] pl-2.5">
                Lagos Culture
              </span>
            </Link>
          </div>

          {/* Desktop Navigation (lg: 1024px+) - Editorial horizontal layout */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-2 relative min-h-[44px] flex items-center ${
                    active
                      ? 'text-[#B4441F] font-semibold'
                      : 'text-[#484843] hover:text-[#161615]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-1 left-0 w-full h-[1.5px] bg-[#B4441F]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger (All viewports, min 44px tap target) */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 text-[#484843] hover:text-[#161615] hover:bg-[#F2ECE1] rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
              aria-label="Search cultural records"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Intermediate Tablet CTA & Desktop CTA (hidden on mobile <768px to keep strict EkoTrace | Search | Menu layout) */}
            <Link
              href="/contribute"
              className="hidden md:inline-flex min-h-[44px] items-center gap-1.5 sm:gap-2 bg-[#161615] hover:bg-[#B4441F] text-[#FAF9F5] text-xs sm:text-sm font-medium px-4 py-2 rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
            >
              <Plus className="w-4 h-4 text-[#E8E3D8]" />
              <span>Contribute</span>
            </Link>

            {/* Menu Trigger (Visible on mobile & tablet <1024px, min 44px tap target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 text-[#484843] hover:text-[#161615] hover:bg-[#F2ECE1] rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Search Strip */}
        {searchOpen && (
          <div className="py-3 pb-4 border-t border-[#E8E3D8] animate-in fade-in duration-200">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-[#73736C] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search festivals, places, traditions, food or stories..."
                autoFocus
                className="w-full pl-10 pr-24 py-3 bg-white border border-[#D4CEBF] text-sm sm:text-base text-[#161615] placeholder-[#8C8B82] rounded-sm focus:outline-none focus:border-[#B4441F] focus:ring-1 focus:ring-[#B4441F]"
              />
              <button
                type="submit"
                className="absolute right-1.5 min-h-[38px] px-3.5 py-2 bg-[#161615] hover:bg-[#333] text-white text-xs font-medium rounded-sm transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile/Tablet Drawer Sheet */}
      {mobileMenuOpen && (
        <div
          ref={menuBackdropRef}
          className="fixed inset-0 top-[65px] sm:top-[81px] z-50 bg-[#161615]/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            ref={menuSheetRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-[#FAF9F5] border-b border-[#E8E3D8] px-6 py-7 space-y-6 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[48px] flex items-center justify-between text-base font-medium py-3 px-3 rounded-sm border-b border-[#EFEBE1] transition-colors ${
                      active
                        ? 'text-[#B4441F] font-semibold bg-[#FAF4E7]'
                        : 'text-[#161615] hover:text-[#B4441F] hover:bg-[#F5F0E6]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8C887B]" />
                  </Link>
                );
              })}
            </nav>

            {/* Stronger CTA on mobile */}
            <div className="pt-2">
              <Link
                href="/contribute"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] w-full flex items-center justify-center gap-2 bg-[#B4441F] hover:bg-[#8F3314] text-white text-sm font-medium py-3.5 px-4 rounded-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B4441F]"
              >
                <Plus className="w-4 h-4" />
                <span>Contribute what you know</span>
              </Link>
            </div>

            <div className="p-4 bg-[#F5F0E6] rounded-sm space-y-1 border border-[#EAE4D7]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B4441F] font-semibold">
                Living Cultural Gateway
              </span>
              <p className="text-xs text-[#5A5954] leading-relaxed">
                Every record on EkoTrace is grounded in oral histories, institutional collections, or direct community testimonies.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
