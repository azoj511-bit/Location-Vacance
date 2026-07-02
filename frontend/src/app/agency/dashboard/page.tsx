'use client';

import React from 'react';
import Link from 'next/link';

export default function AgencyDashboardPage() {
  const stats = [
    { label: "Chiffre d'affaires", value: "24 850 €", change: "+12.4% ce mois", icon: "💶", color: "text-emerald-600 bg-emerald-50" },
    { label: "Taux d'occupation", value: "78.2%", change: "+3.1% vs l'an dernier", icon: "📈", color: "text-ocean-600 bg-ocean-50" },
    { label: "Annonces Actives", value: "12 / 14", change: "2 brouillons restants", icon: "🏡", color: "text-sunset-500 bg-sunset-50" },
    { label: "Réservations en attente", value: "3", change: "Action requise sous 24h", icon: "🧳", color: "text-amber-600 bg-amber-50" },
  ];

  const notifications = [
    { id: 1, text: "Nouvelle demande de réservation pour 'Villa Azur' par Jean D. (12/07 - 19/07)", time: "Il y a 5 min", type: "booking" },
    { id: 2, text: "Le virement mensuel de 8 450 € a été initié vers votre compte bancaire", time: "Ce matin", type: "payment" },
    { id: 3, text: "Rappel KYC : Veuillez téléverser votre extrait KBIS mis à jour", time: "Hier", type: "alert" },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-black text-slate-950 tracking-tight leading-tight">
            Tableau de Bord Agence
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Gérez vos locations professionnelles et suivez vos performances financières en temps réel.
          </p>
        </div>
        <Link href="/agency/publish" className="btn-primary text-xs py-2.5 px-5 font-bold shrink-0">
          ✏️ Publier une annonce
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{s.label}</span>
              <span className="text-2xl font-black text-slate-900 leading-none my-1">{s.value}</span>
              <span className="text-[10px] text-slate-500 font-semibold">{s.change}</span>
            </div>
            <span className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${s.color}`}>
              {s.icon}
            </span>
          </div>
        ))}
      </div>

      {/* Charts & Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Occupancy simulated chart (Left, 2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="font-sans text-sm font-bold text-slate-800 uppercase tracking-wider">Occupancy Rate 2026</h3>
            <span className="text-xs font-semibold text-slate-450">Taux d'occupation par mois (%)</span>
          </div>
          {/* Simulated chart */}
          <div className="h-56 relative mt-4 flex items-end justify-between px-2 pt-6">
            {/* Grid Lines */}
            <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-slate-100" />
            <div className="absolute inset-x-0 top-2/4 border-t border-dashed border-slate-100" />
            <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-slate-100" />
            
            {/* Bars */}
            {[
              { m: "Jan", val: 35 }, { m: "Fév", val: 40 }, { m: "Mar", val: 45 },
              { m: "Avr", val: 62 }, { m: "Mai", val: 75 }, { m: "Juin", val: 88 },
              { m: "Juil", val: 95 }, { m: "Août", val: 98 }, { m: "Sept", val: 80 },
              { m: "Oct", val: 55 }, { m: "Nov", val: 30 }, { m: "Déc", val: 45 }
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group z-10 w-1/12">
                {/* Popover */}
                <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded transition-opacity shadow pointer-events-none">
                  {bar.val}%
                </span>
                {/* Visual Bar */}
                <div
                  className="w-full bg-slate-100 group-hover:bg-sunset-500 rounded-t-lg transition-all duration-300 relative overflow-hidden"
                  style={{ height: `${bar.val * 1.5}px` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-sunset-500/20 to-transparent" />
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Sidebar (Right, 1 col) */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-sans text-sm font-bold text-slate-800 uppercase tracking-wider">Alertes & Activités</h3>
          </div>
          <div className="flex flex-col gap-4">
            {notifications.map((n) => (
              <div key={n.id} className="flex gap-3 items-start text-xs leading-relaxed font-semibold">
                <span className="text-base mt-0.5">
                  {n.type === 'booking' ? '🧳' : n.type === 'payment' ? '💶' : '⚠️'}
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-slate-700">{n.text}</p>
                  <span className="text-[10px] text-slate-450 font-bold">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Stats Summary */}
          <div className="mt-auto bg-slate-50 border border-slate-150 p-4 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Support Agences FR</span>
            <a href="tel:+33180400000" className="text-xs font-black text-slate-800 hover:underline">
              📞 01 80 40 00 00 (Ligne Directe)
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
