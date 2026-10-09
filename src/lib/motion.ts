import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Shared Motion Tokens
 * Designed to let the visitor live in the moment:
 * - Culture Mode: warm, celebratory, photographic, unhurried, deeply cinematic
 * - Trust Mode: calm, deliberate, precise, zero bounce
 */
export const motion = {
  quick: 0.3,
  fast: 0.5,
  normal: 0.85,
  reveal: 1.25,
  cinematic: 1.8,
  stately: 2.4,

  easeOut: 'power3.out',
  soft: 'power2.out',
  luxurious: 'power4.out',
  smooth: 'power2.inOut',
  ambient: 'sine.inOut',
  playful: 'back.out(1.1)', // Use very sparingly, only for micro-accents

  // Editorial & Trust profiles
  editorial: 'power3.out',
  trustEase: 'power2.out', // Deliberate and calm for verification/claims
} as const;

export const motionTokens = motion;

/**
 * Check if the user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Standard Breakpoint Queries for matchMedia
 */
export const breakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
} as const;

/**
 * Safe GSAP animation executor respecting prefers-reduced-motion
 */
export const runAnimation = (
  animateFn: (ctx: gsap.Context) => void,
  scope?: React.RefObject<HTMLElement | null> | HTMLElement
): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const reduced = prefersReducedMotion();

  const ctx = gsap.context(() => {
    if (reduced) {
      // In reduced motion mode, instantly reveal elements
      gsap.set('[data-animate]', { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }
    animateFn(ctx);
  }, scope || undefined);

  return () => {
    ctx.revert();
  };
};

export { gsap, ScrollTrigger };
