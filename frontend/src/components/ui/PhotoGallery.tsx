'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PhotoGalleryProps {
  photos: string[];
  title: string;
}

export default function PhotoGallery({ photos, title }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % photos.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
    }
  };

  const mainPhoto = photos[0];
  const gridPhotos = photos.slice(1, 5);

  return (
    <div className="w-full">
      {/* Grid Layout (Desktop) / Hidden on mobile, replaced by full photo */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[420px] rounded-3xl overflow-hidden shadow-md">
        {/* Main large photo */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group bg-slate-150"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={mainPhoto}
            alt={`${title} - Photo principale`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-102 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Small grid photos */}
        {gridPhotos.map((photo, index) => (
          <div
            key={index}
            className="relative cursor-pointer group bg-slate-150"
            onClick={() => openLightbox(index + 1)}
          >
            <Image
              src={photo}
              alt={`${title} - Photo ${index + 2}`}
              fill
              sizes="(max-width: 1024px) 25vw, 15vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            {/* Show view all overlay on last grid slot */}
            {index === 3 && photos.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white font-bold group-hover:bg-black/40 transition-colors">
                <span className="text-xl">+{photos.length - 5}</span>
                <span className="text-xs uppercase tracking-wide">Photos</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Carousel/Single Photo (Mobile) */}
      <div className="md:hidden relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md bg-slate-150">
        <Image
          src={mainPhoto}
          alt={`${title} - Mobile`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          onClick={() => openLightbox(0)}
        />
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 bg-slate-900/75 backdrop-blur-sm border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow"
        >
          <span>📷</span>
          <span>1 / {photos.length}</span>
        </button>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center select-none"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full border border-white/10 transition-colors z-[110]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {/* Navigation controls */}
          <button
            onClick={showPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/10 transition-colors z-[110]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            onClick={showNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/10 transition-colors z-[110]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          {/* Active Image container */}
          <div className="relative w-full max-w-5xl h-full max-h-[80vh] px-4">
            <Image
              src={photos[lightboxIndex]}
              alt={`${title} - Lightbox ${lightboxIndex + 1}`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain"
            />
          </div>

          {/* Image index footer */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-semibold">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
