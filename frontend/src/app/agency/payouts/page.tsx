'use client';

import React, { useState } from 'react';

export default function AgencyPayoutsPage() {
  const [isConnected, setIsConnected] = useState(true);

  const stats = [
    { label: "Solde disponible", value: "8 420,00 €", detail: "Prêt pour versement", icon: "💰" },
    { label: "Fonds en attente", value: "3 250,00 €", detail: "Séjours non terminés", icon: "⏳" },
    { label: "Commission moyenne", value: "12%", detail: "Frais de marketplace pro", icon: "🛡️" }
  ];

  const payouts = [
    { id: "po-10023", date: "15 Juin 2026", ref: "ST-CONF-8820", bookingGross: "3 700 €", commission: "444 €", net: "3 256 €", status: "Transféré" },
    { id: "po-10022", date: "01 Juin 2026", ref: "ST-CONF-1290", bookingGross: "4 500 €", commission: "540 €", net: "3 960 €", status: "Transféré" },
    { id: "po-10021", date: "15 Mai 2026", ref: "ST-CONF-3449", bookingGross: "2 200 €", commission: "264 €", net: "1 936 €", status: "Transféré" }
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in text-xs font-semibold text-slate-700">
      
      {/* Title */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight leading-snug">
          Reversements & Flux Financiers
        </h1>
        <p className="text-xs text-slate-500 font-semibold mt-0.5">
          Suivez vos revenus locatifs, visualisez les prélèvements de commissions et gérez vos comptes bancaires.
        </p>
      </div>

      {/* Stripe Connect banner */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-col md:flex-row text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-650 flex items-center justify-center font-black text-xl shadow-sm">
            S
          </div>
          <div>
            <h3 className="font-sans text-sm font-bold text-slate-800 leading-snug">Configuration de paiement Stripe Connect</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isConnected
                ? "Votre compte Stripe Express est lié et configuré pour recevoir des virements automatiques."
                : "Associez votre compte Stripe Connect pour recevoir vos gains locatifs sous 7 jours."}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsConnected(!isConnected)}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
            isConnected
              ? 'bg-slate-50 text-slate-650 border-slate-200 hover:bg-slate-100'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent'
          }`}
        >
          {isConnected ? "⚙️ Gérer mon compte Stripe" : "⚡ Se connecter à Stripe"}
        </button>
      </div>

      {/* Stats Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">{s.label}</span>
              <span className="text-xl font-black text-slate-900 leading-none my-1">{s.value}</span>
              <span className="text-[10px] text-slate-400 font-semibold">{s.detail}</span>
            </div>
            <span className="text-2xl">{s.icon}</span>
          </div>
        ))}
      </div>

      {/* Payout History logs */}
      <div className="flex flex-col gap-4">
        <h3 className="font-sans text-sm font-bold text-slate-800 uppercase tracking-wider">Historique des virements</h3>
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-450 uppercase text-[10px] tracking-wider font-bold">
                  <th className="p-4">Date de virement</th>
                  <th className="p-4">Identifiant de transaction</th>
                  <th className="p-4">Montant Brut</th>
                  <th className="p-4">Commission Marketplace</th>
                  <th className="p-4">Montant Net Reversé</th>
                  <th className="p-4 text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-semibold">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-4 text-slate-700">{p.date}</td>
                    <td className="p-4 text-slate-450">{p.ref}</td>
                    <td className="p-4 text-slate-755">{p.bookingGross}</td>
                    <td className="p-4 text-rose-500 font-bold">- {p.commission}</td>
                    <td className="p-4 text-emerald-600 font-black text-sm">{p.net}</td>
                    <td className="p-4 text-center">
                      <span className="badge text-[9px] py-0.5 px-2 bg-emerald-50 text-emerald-700 border border-emerald-250 font-black uppercase">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
