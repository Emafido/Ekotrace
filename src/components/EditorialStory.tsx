import React from 'react';
import Image from 'next/image';
import { EditorialStory as EditorialStoryType } from '@/types';
import { Quote } from 'lucide-react';

interface EditorialStoryProps {
  story: EditorialStoryType;
  title?: string;
}

export const EditorialStory: React.FC<EditorialStoryProps> = ({
  story,
  title = 'The story',
}) => {
  return (
    <article className="space-y-8 sm:space-y-10">
      <div className="border-b border-[#E8E3D8] pb-4">
        <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#161615]">
          {title}
        </h2>
        <p className="text-xs font-mono uppercase tracking-widest text-[#8C887B] mt-1">
          Oral history & cultural context
        </p>
      </div>

      {/* Introduction */}
      {story.introduction && (
        <p className="font-editorial text-xl sm:text-2xl text-[#2B2B28] leading-relaxed italic border-l-2 border-[#B4441F] pl-4 sm:pl-6 my-6">
          {story.introduction}
        </p>
      )}

      {/* Sections */}
      <div className="space-y-10">
        {story.sections.map((section, idx) => (
          <section key={idx} className="space-y-5">
            {section.heading && (
              <h3 className="font-editorial text-xl sm:text-2xl font-medium text-[#161615]">
                {section.heading}
              </h3>
            )}

            <p className="text-base sm:text-lg text-[#3E3E39] leading-relaxed font-sans font-light">
              {section.content}
            </p>

            {/* Optional Quote Block */}
            {section.quote && (
              <div className="my-6 p-6 sm:p-8 bg-[#FAF7F0] border-y border-[#E6E0D2] rounded-sm relative">
                <Quote className="w-8 h-8 text-[#B4441F]/20 absolute top-4 left-4" />
                <blockquote className="relative z-10 space-y-3 pl-6">
                  <p className="font-editorial text-lg sm:text-xl italic text-[#161615] leading-snug">
                    “{section.quote.text}”
                  </p>
                  <footer className="text-xs font-mono tracking-wider text-[#7A766B] uppercase">
                    — {section.quote.attribution}
                  </footer>
                </blockquote>
              </div>
            )}

            {/* Optional Inline Image */}
            {section.image && (
              <figure className="my-6 space-y-2">
                <div className="relative aspect-[16/9] w-full bg-[#EBE6DC] overflow-hidden rounded-sm">
                  <Image
                    src={section.image.url}
                    alt={section.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-xs text-[#73736C] font-mono italic">
                  {section.image.caption}
                </figcaption>
              </figure>
            )}
          </section>
        ))}
      </div>
    </article>
  );
};
