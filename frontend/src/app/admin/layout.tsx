'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin/dashboard', label: 'Vue d\'ensemble', icon: '📊' },
    { href: '/admin/agencies', label: 'Validation Agences', icon: '🏢' },
    { href: '/admin/listings', label: 'Modération Annonces', icon: '🏡' },
    { href: '/admin/bookings', label: 'Suivi Réservations', icon: '🧳' },
    { href: '/admin/users', label: 'Rôles Utilisateurs', icon: '👥' },
    { href: '/admin/payments', label: 'Paiements & Flux', icon: '💳' },
    { href: '/admin/cms', label: 'Gestion CMS', icon: '✍️' },
    { href: '/admin/analytics', label: 'Statistiques & GA4', icon: '📈' },
  ];

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-20 flex flex-col md:flex-row">
      {/* Dark Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 text-white shrink-0 border-r border-slate-900 flex flex-col">
        {/* Profile Card Header */}
        <div className="p-6 border-b border-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sunset-500 text-white flex items-center justify-center font-bold shadow-md shadow-sunset-500/25">
            AD
          </div>
          <div>
            <h3 className="font-sans text-sm font-bold text-white leading-tight">Location Vacances Admin</h3>
            <span className="text-[10px] text-sunset-400 font-bold block mt-0.5">🔑 Super Administrateur</span>
          </div>
        </div>

        {/* Menu list */}
        <nav className="flex-1 p-4 flex flex-col gap-1 text-sm font-bold">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-sunset-500 text-white shadow-md shadow-sunset-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-900 flex flex-col gap-2 shrink-0">
          <Link
            href="/"
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs font-bold text-center text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
          >
            <span>↩</span> Quitter le panel
          </Link>
        </div>
      </aside>

      {/* Workspace Panel */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
