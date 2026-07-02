'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Ne pas afficher la sidebar sur la page de login
  if (pathname === '/agency/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { href: '/agency/dashboard', label: 'Tableau de bord', icon: '📊' },
    { href: '/agency/properties', label: 'Mes Locations', icon: '🏡' },
    { href: '/agency/publish', label: 'Publier une annonce', icon: '✏️' },
    { href: '/agency/announcements', label: 'Annonces & Actus', icon: '📢' },
    { href: '/agency/bookings', label: 'Réservations', icon: '🧳' },
    { href: '/agency/calendar', label: 'Calendrier', icon: '📅' },
    { href: '/agency/payouts', label: 'Reversements & Stripe', icon: '💶' },
    { href: '/agency/settings', label: 'Paramètres & KYC', icon: '⚙️' },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/agency-auth', { method: 'DELETE' });
      router.push('/agency/login');
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-20 flex flex-col md:flex-row">
      {/* Dark Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 border-r border-slate-800 flex flex-col">
        {/* Profile Card Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sunset-500 text-white flex items-center justify-center font-bold shadow-md shadow-sunset-500/20 shrink-0">
            AP
          </div>
          <div className="min-w-0">
            <h3 className="font-sans text-sm font-bold text-white leading-tight truncate">Location Vacances</h3>
            <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">🔑 Administrateur Agence</span>
          </div>
        </div>

        {/* Menu list */}
        <nav className="flex-1 p-4 flex flex-col gap-1 text-sm font-bold overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-sunset-500 text-white shadow-md shadow-sunset-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 flex flex-col gap-2 shrink-0">
          <Link
            href="/"
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-center text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
          >
            <span>↩</span> Retour au site
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full py-2.5 px-4 bg-rose-900/40 hover:bg-rose-900/70 border border-rose-800/50 rounded-xl text-xs font-bold text-center text-rose-400 hover:text-rose-300 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isLoggingOut ? (
              <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <span>🔓</span>
            )}
            {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
          </button>
        </div>
      </aside>

      {/* Workspace Panel */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
