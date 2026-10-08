'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { ImageOff, Sparkles } from 'lucide-react';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackCategory?: string;
  objectPosition?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackCategory = 'Cultural Record',
  objectPosition = 'center',
  className = '',
  fill,
  sizes,
  priority = false,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 bg-[#F4EFE6] border border-[#DDD8CA] text-[#73736C] select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-full bg-[#EAE4D7] flex items-center justify-center mb-2">
          <ImageOff className="w-5 h-5 text-[#8C887B]" />
        </div>
        <span className="font-editorial text-sm font-medium text-[#161615] text-center tracking-tight">
          EkoTrace Archive
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C887B] mt-0.5">
          {fallbackCategory}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Subtle skeleton shimmer until loaded */}
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-[#EFEAE0] animate-pulse pointer-events-none z-0" />
      )}

      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        priority={priority}
        style={{ objectPosition }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`object-cover transition-opacity duration-300 ${
          isLoaded || priority ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
    </div>
  );
};
