'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/motion';

interface CulturalBackgroundProps {
  variant?: 'hero' | 'warm' | 'sanctuary' | 'default';
  className?: string;
  showPattern?: boolean;
}

export const CulturalBackground: React.FC<CulturalBackgroundProps> = ({
  variant = 'default',
  className = '',
  showPattern = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!glowRef1.current || !glowRef2.current) return;

    // Subtle breathing ambient light animation (slow, calming, 8-12s loop)
    const ctx = gsap.context(() => {
      gsap.to(glowRef1.current, {
        scale: 1.15,
        xPercent: 4,
        yPercent: -4,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(glowRef2.current, {
        scale: 1.2,
        xPercent: -5,
        yPercent: 5,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* 1. Ambient Warm Lighting Auras */}
      {variant === 'hero' && (
        <>
          {/* Top-right golden Lagos sunshine aura */}
          <div
            ref={glowRef1}
            className="absolute -top-[15%] -right-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#F5D59E]/45 via-[#E8A54B]/20 to-transparent blur-3xl opacity-80"
          />
          {/* Bottom-left coastal lagoon and terracotta warmth aura */}
          <div
            ref={glowRef2}
            className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#B4441F]/15 via-[#E3C398]/25 to-transparent blur-3xl opacity-70"
          />
        </>
      )}

      {variant === 'warm' && (
        <>
          <div
            ref={glowRef1}
            className="absolute top-1/4 -right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#E5A93C]/20 via-[#B4441F]/10 to-transparent blur-3xl opacity-60"
          />
          <div
            ref={glowRef2}
            className="absolute -bottom-10 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#F2ECE1]/60 via-[#EADDC9]/30 to-transparent blur-2xl opacity-75"
          />
        </>
      )}

      {variant === 'sanctuary' && (
        <>
          {/* Deep nocturnal golden lanterns for Scrollytelling sanctuary */}
          <div
            ref={glowRef1}
            className="absolute top-10 right-10 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-[#E5A93C]/18 via-[#B4441F]/10 to-transparent blur-3xl opacity-70"
          />
          <div
            ref={glowRef2}
            className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#1C3F5E]/30 via-[#2C5E88]/15 to-transparent blur-3xl opacity-80"
          />
        </>
      )}

      {/* 2. Authentic Adire Yoruba Textile Geometry (Vector Watermark) */}
      {showPattern && (
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-multiply"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            {/* Traditional Yoruba diamond & chevrons motif */}
            <pattern
              id="adire-motif"
              width="72"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              {/* Central Diamond */}
              <path
                d="M36 4 L68 36 L36 68 L4 36 Z"
                fill="none"
                stroke="#161615"
                strokeWidth="1.2"
              />
              <path
                d="M36 14 L58 36 L36 58 L14 36 Z"
                fill="none"
                stroke="#B4441F"
                strokeWidth="0.8"
              />
              {/* Traditional dot accents */}
              <circle cx="36" cy="36" r="2" fill="#B4441F" />
              {/* Corner chevrons */}
              <path d="M4 4 L14 14" stroke="#161615" strokeWidth="1" />
              <path d="M68 4 L58 14" stroke="#161615" strokeWidth="1" />
              <path d="M4 68 L14 58" stroke="#161615" strokeWidth="1" />
              <path d="M68 68 L58 58" stroke="#161615" strokeWidth="1" />
              {/* Subtle cross hatches */}
              <line x1="36" y1="2" x2="36" y2="8" stroke="#161615" strokeWidth="1" />
              <line x1="36" y1="64" x2="36" y2="70" stroke="#161615" strokeWidth="1" />
              <line x1="2" y1="36" x2="8" y2="36" stroke="#161615" strokeWidth="1" />
              <line x1="64" y1="36" x2="70" y2="36" stroke="#161615" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#adire-motif)" />
        </svg>
      )}
    </div>
  );
};
