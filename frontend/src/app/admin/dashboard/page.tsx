'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { label: "Volume d'affaires global", value: "1 520 400 €", change: "+18.2% vs l'an dernier", icon: "💎", color: "text-emerald-700 bg-emerald-50" },
    { label: "Commissions générées (12%)", value: "182 448 €", change: "Revenus plateforme", icon: "🛡️", color: "text-indigo-700 bg-indigo-50" },
    { label: "Agences partenaires", value: "48", change: "6 en attente d'agrément", icon: "🏢", color: "text-sunset-500 bg-sunset-50" },
    { label: "Annonces en ligne", value: "152 749", change: "99.8% taux de conformité", icon: "🏡", color: "text-ocean-600 bg-ocean-50" }
  ];

  const logs = [
    { id: 1, text: "L'agence 'Provence Sélection' a téléversé un document KBIS", time: "Il y a 10 min", type: "kyc" },
    { id: 2, text: "Nouvelle annonce 'Mas de Gordes' approuvée automatiquement", time: "Il y a 1h", type: "moderation" },
    { id: 3, text: "Virement Stripe Connect initié pour 12 agences", time: "Ce matin", type: "financial" },
    { id: 4, text: "Alerte : Signalement utilisateur sur l'annonce lst-004 (Corse)", time: "Hier", type: "report" }
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in text-xs font-semibold text-slate-700">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight leading-snug">
            Panel d'Administration Location Vacances
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Supervisez la conformité légale, validez les transactions financières et modérez les publications.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-455 uppercase font-bold tracking-wider">{s.label}</span>
              <span className="text-2xl font-black text-slate-900 leading-none my-1">{s.value}</span>
              <span className="text-[10px] text-slate-400 font-semibold">{s.change}</span>
            </div>
            <span className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${s.color}`}>
              {s.icon}
            </span>
          </div>
        ))}
      </div>

      {/* Main logs & quick operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Logs List (Left, 2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <div className="pb-2 border-b border-slate-50">
            <h3 className="font-sans text-sm font-bold text-slate-800 uppercase tracking-wider">Activités récentes de la plateforme</h3>
          </div>
          <div className="flex flex-col gap-4">
            {logs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-150 flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-base mt-0.5">
                    {log.type === 'kyc' ? '🏢' : log.type === 'moderation' ? '✅' : log.type === 'financial' ? '💳' : '⚠️'}
                  </span>
                  <div>
                    <p className="text-slate-800 font-bold">{log.text}</p>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5">{log.time}</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Système</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick action shortcuts */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <div className="pb-2 border-b border-slate-50">
            <h3 className="font-sans text-sm font-bold text-slate-800 uppercase tracking-wider">Actions Administratives</h3>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/admin/agencies" className="p-3 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all flex items-center justify-between">
              <span>Verify partner KYC documents</span>
              <span className="text-sunset-500 font-bold">→</span>
            </Link>
            <Link href="/admin/listings" className="p-3 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all flex items-center justify-between">
              <span>Moderate pending properties</span>
              <span className="text-sunset-500 font-bold">→</span>
            </Link>
            <Link href="/admin/cms" className="p-3 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all flex items-center justify-between">
              <span>Manage legal pages & blog content</span>
              <span className="text-sunset-500 font-bold">→</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
