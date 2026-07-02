'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockDestinations, countryFlags } from '@/data/mock-destinations';

export default function DestinationsPage() {
  // Group destinations by country
  const countries = Array.from(new Set(mockDestinations.map((d) => d.country)));

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sunset-500 font-black text-xs uppercase tracking-widest block mb-2">Inspirations</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight">
            Toutes nos destinations soleil
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-4 leading-relaxed font-semibold">
            Découvrez nos plus beaux havres de paix gérés de manière professionnelle. Plus de 12 pays et destinations phares pour trouver le soleil de vos vacances.
          </p>
        </div>

        {/* Group list */}
        <div className="flex flex-col gap-16">
          {countries.map((country) => {
            const countryDests = mockDestinations.filter((d) => d.country === country);
            // Get flag
            const sampleDest = countryDests[0];
            const flag = sampleDest ? countryFlags[sampleDest.countryCode] || '📍' : '📍';
            
            return (
              <div key={country} className="flex flex-col gap-6">
                {/* Country Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <span className="text-3xl" role="img" aria-label={country}>{flag}</span>
                  <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">{country}</h2>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-lg ml-2">
                    {countryDests.reduce((acc, curr) => acc + curr.listingCount, 0).toLocaleString()} locations
                  </span>
                </div>

                {/* Grid of Regions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {countryDests.map((dest) => (
                    <Link
                      key={dest.id}
                      href={`/listings?destination=${encodeURIComponent(dest.name)}`}
                      className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-slate-100"
                    >
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      
                      {/* Content details */}
                      <div className="absolute bottom-5 left-5 right-5 text-white flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-sunset-400">
                          {dest.region ? `${dest.region}` : country}
                        </span>
                        <h3 className="text-xl font-bold font-sans tracking-tight">{dest.name}</h3>
                        <p className="text-xs text-slate-350 line-clamp-2 mt-1 leading-normal opacity-90">
                          {dest.description}
                        </p>
                        <div className="flex justify-between items-center mt-3 border-t border-white/10 pt-2.5 text-xs">
                          <span className="font-semibold">{dest.listingCount.toLocaleString()} locations</span>
                          <span className="font-bold text-amber-300">Moyenne {dest.averagePrice} €/nuit</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
