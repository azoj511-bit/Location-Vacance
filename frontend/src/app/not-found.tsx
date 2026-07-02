'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center max-w-md flex flex-col gap-6 items-center">
        <span className="text-8xl animate-bounce" role="img" aria-label="umbrella">🏖️</span>
        <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight">
          Page introuvable
        </h1>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          Oups ! Il semblerait que vous ayez pris une mauvaise direction ou que le soleil se soit couché sur cette page. Elle n'existe pas ou a été déplacée.
        </p>
        <div className="flex gap-4">
          <Link href="/" className="btn-primary px-8 py-3 text-sm font-bold tracking-wide">
            Retourner à l'accueil
          </Link>
          <Link href="/listings" className="btn-outline px-8 py-3 text-sm font-bold tracking-wide">
            Voir nos locations
          </Link>
        </div>
      </div>
    </div>
  );
}
