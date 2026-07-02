import React from 'react';

export default function TrustBanner() {
  return (
    <div className="w-full bg-slate-900 text-white border-y border-slate-800 overflow-hidden shadow-inner py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="sun">☀️</span>
            <div>
              <span className="font-bold text-sm block tracking-wide">DEPUIS 2006</span>
              <span className="text-xs text-slate-400">20 ans d'expertise dans la location de vacances</span>
            </div>
          </div>
          
          <div className="hidden sm:block h-8 w-px bg-slate-800" />
          
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="star">★</span>
            <div>
              <span className="font-bold text-sm block tracking-wide">AVIS CLIENTS 4,4/5</span>
              <span className="text-xs text-slate-400">Plus de 85 000 avis voyageurs vérifiés</span>
            </div>
          </div>
          
          <div className="hidden sm:block h-8 w-px bg-slate-800" />
          
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="lock">⚡</span>
            <div>
              <span className="font-bold text-sm block tracking-wide">RÉSERVATION IMMÉDIATE</span>
              <span className="text-xs text-slate-400">Confirmation instantanée garantie 100% sécurisée</span>
            </div>
          </div>
          
          <div className="hidden sm:block h-8 w-px bg-slate-800" />
          
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="france">🇫🇷</span>
            <div>
              <span className="font-bold text-sm block tracking-wide">SERVICE CLIENT EN FRANCE</span>
              <span className="text-xs text-slate-400">Conseillers francophones disponibles 7j/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
