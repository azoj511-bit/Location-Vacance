'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Listing, ListingTypeLabels } from '@/types';
import { useAppStore } from '@/lib/store';
import { countryFlags } from '@/data/mock-destinations';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const { toggleFavorite, isFavorite } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const favorited = mounted ? isFavorite(listing.id) : false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  const flag = countryFlags[listing.location.countryCode] || '📍';

  return (
    <div className="group card card-interactive flex flex-col h-full border border-slate-100 bg-white">
      {/* Thumbnail / Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 shrink-0">
        <Link href={`/listings/${listing.id}`} className="absolute inset-0">
          <Image
            src={listing.thumbnail || listing.photos[0]}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
          {/* Label Type */}
          <span className="badge bg-slate-900/80 backdrop-blur-md text-white border border-white/10 shadow-sm pointer-events-auto">
            {ListingTypeLabels[listing.type]}
          </span>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="p-2 rounded-full glass hover:scale-110 active:scale-95 transition-all duration-200 pointer-events-auto shadow-md"
            title={favorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <svg
              className={`w-5 h-5 transition-colors duration-200 ${
                favorited ? 'fill-sunset-500 text-sunset-500' : 'text-slate-600 hover:text-sunset-500'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>
        </div>

        {/* Bottom indicators overlay */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {listing.features.freeCancellation && (
            <span className="badge-green backdrop-blur-md bg-emerald-50/95 shadow-sm text-[10px] py-0.5 px-2">
              Annulation J-60
            </span>
          )}
          {listing.features.cleaningIncluded && (
            <span className="badge-ocean backdrop-blur-md bg-ocean-50/95 shadow-sm text-[10px] py-0.5 px-2">
              Ménage inclus
            </span>
          )}
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 flex flex-col flex-1">
        {/* Location & Rating row */}
        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500 mb-1">
          <span className="flex items-center gap-1.5 truncate">
            <span>{flag}</span>
            <span className="truncate">
              {listing.location.city}, {listing.location.region}
            </span>
          </span>
          <span className="flex items-center gap-1 shrink-0 text-slate-800 font-bold bg-amber-500/10 px-2 py-0.5 rounded-lg">
            <span>★</span>
            <span>{listing.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({listing.reviewCount})</span>
          </span>
        </div>

        {/* Title */}
        <Link href={`/listings/${listing.id}`} className="block group-hover:text-sunset-500 transition-colors">
          <h3 className="font-sans text-base font-bold leading-snug line-clamp-2 text-slate-800 h-11 mb-2">
            {listing.title}
          </h3>
        </Link>

        {/* Specifications row */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-xs text-slate-500 font-medium mb-3 shrink-0">
          <div className="flex items-center gap-1 justify-center bg-slate-50 py-1 rounded-lg">
            <span>👥</span>
            <span>{listing.capacity} pers.</span>
          </div>
          <div className="flex items-center gap-1 justify-center bg-slate-50 py-1 rounded-lg">
            <span>🛏️</span>
            <span>{listing.bedrooms} ch.</span>
          </div>
          <div className="flex items-center gap-1 justify-center bg-slate-50 py-1 rounded-lg">
            <span>📐</span>
            <span>{listing.surfaceArea} m²</span>
          </div>
        </div>

        {/* Pool Indicator */}
        {listing.features.pool && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-ocean-700 bg-ocean-50/50 px-2.5 py-1.5 rounded-xl mb-4 self-start">
            <span>🏊</span>
            <span className="capitalize">Piscine {listing.features.pool}</span>
          </div>
        )}

        {/* Price & Agency row */}
        <div className="flex items-end justify-between mt-auto pt-2 border-t border-slate-50 gap-2 shrink-0">
          <div className="text-left leading-tight">
            <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider">Géré par</span>
            <span className="text-xs font-semibold text-slate-600 truncate max-w-[140px] block">
              {listing.agencyName}
            </span>
          </div>
          
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-semibold">Dès</span>
            <span className="text-lg font-black text-slate-900">
              {listing.pricePerNight} €
            </span>
            <span className="text-[10px] text-slate-400 font-medium"> / nuit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
