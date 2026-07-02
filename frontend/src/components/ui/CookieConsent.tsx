'use client';

import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('location-vacances-cookie-consent');
    if (!consent) {
      // Delay display slightly for smoother transition
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('location-vacances-cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('location-vacances-cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-50 animate-slide-up">
      <div className="glass shadow-2xl rounded-3xl p-6 border border-slate-200/80 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5" role="img" aria-label="cookie">
            🍪
          </span>
          <div className="flex flex-col gap-1">
            <h4 className="font-sans text-sm font-black text-slate-900 tracking-tight">
              Respect de votre vie privée
            </h4>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Location Vacances utilise des cookies pour optimiser votre expérience, analyser le trafic et diffuser des annonces adaptées à vos envies de vacances.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-1.5 justify-end">
          <button
            onClick={handleDecline}
            className="px-4 py-2 hover:bg-slate-100/85 text-slate-500 rounded-xl text-xs font-bold transition-all border border-transparent"
          >
            Refuser
          </button>
          <button
            onClick={handleAccept}
            className="btn-primary py-2 px-4 text-xs font-bold shadow-sm"
          >
            Accepter tout
          </button>
        </div>
      </div>
    </div>
  );
}
