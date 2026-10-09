'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Sparkles } from 'lucide-react';

export interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackCategory?: string;
  fallbackTitle?: string;
  objectPosition?: string;
  imgClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackCategory = 'Cultural Record',
  fallbackTitle,
  objectPosition = 'center',
  className = '',
  imgClassName = '',
  fill,
  sizes,
  priority = false,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If image fails to load or no source is provided, render a tasteful neutral branded placeholder
  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 bg-[#F3EFE7] border border-[#DDD8CA] text-[#73736C] select-none ${className}`}
        role="img"
        aria-label={alt || 'Cultural record placeholder'}
      >
        <div className="w-10 h-10 rounded-full bg-[#EAE4D7] flex items-center justify-center mb-2.5 text-[#B4441F]/80">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="font-editorial text-sm font-medium text-[#161615] text-center tracking-tight line-clamp-1">
          {fallbackTitle || 'EkoTrace Cultural Record'}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C887B] mt-1">
          {fallbackCategory}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Subtle warm skeleton shimmer until loaded */}
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-[#EFEAE0] animate-pulse pointer-events-none z-0" />
      )}

      <Image
        src={src}
        alt={alt || 'Cultural image'}
        fill={fill}
        sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        priority={priority}
        style={{ objectPosition }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`object-cover transition-all duration-500 ease-out ${
          isLoaded || priority ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
        } ${imgClassName}`}
        {...rest}
      />
    </div>
  );
};
