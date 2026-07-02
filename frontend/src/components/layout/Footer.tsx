'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockDestinations } from '@/data/mock-destinations';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  // Select popular destinations
  const footerDestinations = mockDestinations.slice(0, 6);

  return (
    <footer className="bg-slate-900 text-slate-350 border-t border-slate-800">
      {/* Guarantees / Trust Badges Section */}
      <div className="border-b border-slate-800 py-10 bg-slate-950/40">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sunset-500/10 flex items-center justify-center text-sunset-500 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-white text-base font-bold font-sans">Locations 100% Fiables</h4>
              <p className="text-xs text-slate-400 mt-1">Uniquement gérées par des agences professionnelles certifiées.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-ocean-500/10 flex items-center justify-center text-ocean-500 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-white text-base font-bold font-sans">Annulation Flexible</h4>
              <p className="text-xs text-slate-400 mt-1">Annulation gratuite jusqu'à J-60 sur la majorité de nos séjours.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v-1m-10-4a9 9 0 1118 0 9 9 0 01-18 0z"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-white text-base font-bold font-sans">Paiement Sécurisé</h4>
              <p className="text-xs text-slate-400 mt-1">Règlement sécurisé (SSL/PCI-DSS) avec acompte et solde flexible.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
              </svg>
            </div>
            <div>
              <h4 className="text-white text-base font-bold font-sans">Support Local Réactif</h4>
              <p className="text-xs text-slate-400 mt-1">Service client basé en France, à votre écoute 7 jours sur 7.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="container mx-auto px-4 md:px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-sunset-500 flex items-center justify-center text-white">
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>
              </svg>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">Location Vacances</span>
          </Link>
          <p className="text-sm text-slate-400 max-w-sm">
            Depuis 2006, nous sélectionnons les meilleures locations saisonnières proposées par des agences professionnelles pour garantir la sérénité absolue de vos vacances.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3 mt-2">
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sunset-500 hover:text-white flex items-center justify-center text-slate-400 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sunset-500 hover:text-white flex items-center justify-center text-slate-400 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sunset-500 hover:text-white flex items-center justify-center text-slate-400 transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Column Destinations */}
        <div className="md:col-span-3">
          <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-5">Destinations Phares</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {footerDestinations.map((dest) => (
              <li key={dest.id}>
                <Link href={`/listings?destination=${encodeURIComponent(dest.name)}`} className="hover:text-white hover:underline transition-colors flex items-center justify-between">
                  <span>{dest.name}</span>
                  <span className="text-xs text-slate-500">({dest.listingCount.toLocaleString()})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column Corporate / Legal */}
        <div className="md:col-span-2">
          <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-5">Légal & Infos</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/cgu" className="hover:text-white transition-colors">CGU voyageurs</Link></li>
            <li><Link href="/cgv" className="hover:text-white transition-colors">Conditions de vente</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
            <li><Link href="/rgpd" className="hover:text-white transition-colors">Confidentialité & RGPD</Link></li>
            <li><a href="mailto:contact@location-vacances.com" className="hover:text-white transition-colors">Nous contacter</a></li>
            <li><Link href="/agency-signup" className="hover:text-sunset-400 font-semibold text-sunset-500 transition-colors">Espace Agences</Link></li>
          </ul>
        </div>

        {/* Column Newsletter */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h3 className="text-white text-sm font-semibold tracking-wider uppercase">Trouvez le soleil !</h3>
          <p className="text-xs text-slate-400">
            Inscrivez-vous pour recevoir nos sélections d'offres exclusives et inspirations de destinations au soleil.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-sunset-500 text-white px-3 rounded-lg hover:bg-sunset-600 active:bg-sunset-750 transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
            {subscribed && (
              <span className="text-xs text-emerald-400 font-medium animate-fade-in">
                Merci ! Votre inscription a bien été enregistrée.
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Location Vacances SAS. Tous droits réservés. Plateforme B2C de locations de vacances professionnelles.</p>
          <div className="flex items-center gap-6">
            <span>Depuis 2006</span>
            <span>Avis vérifiés : ★★★★☆ (4.4/5)</span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2.166 4.9L10 1.154l7.834 3.746A2 2 0 0119 6.753v5.524a2 2 0 01-1.166 1.803L10 17.846l-7.834-3.766A2 2 0 011 12.277V6.753a2 2 0 011.166-1.853zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
              </svg>
              Hébergé en Europe (RGPD)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
