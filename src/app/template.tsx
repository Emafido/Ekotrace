'use client';

import React, { useRef, useEffect } from 'react';
import { motion, gsap, prefersReducedMotion } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const isReduced = prefersReducedMotion();
    if (isReduced) {
      gsap.set(containerRef.current, { opacity: 1, y: 0 });
      return;
    }

    // Subtle 350ms route transition
    const tween = gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: motion.normal, ease: motion.easeOut }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex-1">
      {children}
    </div>
  );
}
