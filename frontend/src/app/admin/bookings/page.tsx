'use client';

import React, { useState } from 'react';

type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'disputed';

interface AdminBooking {
  id: string;
  listingTitle: string;
  agency: string;
  traveler: string;
  city: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: number;
  commission: number;
  status: BookingStatus;
  paymentMethod: string;
}

const bookings: AdminBooking[] = [
  { id: 'BK-20250001', listingTitle: 'Villa Lumière', agency: 'Provence Sélection', traveler: 'Jean-Paul Martin', city: 'Gordes', checkIn: '01/07/2025', checkOut: '08/07/2025', nights: 7, amount: 2380, commission: 285.6, status: 'confirmed', paymentMethod: 'Carte Visa' },
  { id: 'BK-20250002', listingTitle: 'Mas Camargue', agency: 'Provence Sélection', traveler: 'Isabelle Renaud', city: 'Saintes-Maries', checkIn: '15/07/2025', checkOut: '22/07/2025', nights: 7, amount: 1960, commission: 235.2, status: 'pending', paymentMethod: 'Virement' },
  { id: 'BK-20250003', listingTitle: 'Chalet Méribel', agency: 'Alpes Chalets', traveler: 'Thomas Girard', city: 'Méribel', checkIn: '05/07/2025', checkOut: '12/07/2025', nights: 7, amount: 3640, commission: 436.8, status: 'disputed', paymentMethod: 'Carte Mastercard' },
  { id: 'BK-20250004', listingTitle: 'Appart. Cannes', agency: 'Côte d\'Azur Luxe', traveler: 'Clara Dupont', city: 'Cannes', checkIn: '20/06/2025', checkOut: '27/06/2025', nights: 7, amount: 1365, commission: 163.8, status: 'completed', paymentMethod: 'PayPal' },
  { id: 'BK-20250005', listingTitle: 'Villa Corsica', agency: 'Corse Prestige', traveler: 'Ahmed Bensoussan', city: 'Porto-Vecchio', checkIn: '01/08/2025', checkOut: '15/08/2025', nights: 14, amount: 12460, commission: 1495.2, status: 'confirmed', paymentMethod: 'Carte Visa' },
  { id: 'BK-20250006', listingTitle: 'Studio Biarritz', agency: 'Sud Immo Pro', traveler: 'Emma Lefèvre', city: 'Biarritz', checkIn: '10/07/2025', checkOut: '17/07/2025', nights: 7, amount: 665, commission: 79.8, status: 'cancelled', paymentMethod: 'Carte Visa' },
  { id: 'BK-20250007', listingTitle: 'Mas Luberon', agency: 'Provence Sélection', traveler: 'Marc Pelletier', city: 'Apt', checkIn: '25/07/2025', checkOut: '01/08/2025', nights: 7, amount: 1890, commission: 226.8, status: 'confirmed', paymentMethod: 'Carte Mastercard' },
];

const statusConfig: Record<BookingStatus, { label: string; color: string; bg: string }> = {
  confirmed:  { label: 'Confirmée', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  pending:    { label: 'En attente', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  cancelled:  { label: 'Annulée', color: 'text-slate-500', bg: 'bg-slate-100 border-slate-200' },
  completed:  { label: 'Terminée', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  disputed:   { label: 'Litige', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
};

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = bookings.filter(b => {
    const matchFilter = filter === 'all' || b.status === filter;
    const matchSearch = b.listingTitle.toLowerCase().includes(search.toLowerCase())
      || b.traveler.toLowerCase().includes(search.toLowerCase())
      || b.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalAmount = filtered.reduce((sum, b) => sum + b.amount, 0);
  const totalCommission = filtered.reduce((sum, b) => sum + b.commission, 0);

  const counts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    disputed: bookings.filter(b => b.status === 'disputed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight">Journal des Réservations</h1>
        <p className="text-xs text-slate-500 font-semibold mt-0.5">Suivi complet de toutes les transactions entre voyageurs et agences.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Réservations totales', value: bookings.length.toString(), icon: '🧳', color: 'text-indigo-700 bg-indigo-50' },
          { label: 'Volume affiché', value: `${totalAmount.toLocaleString('fr-FR')}€`, icon: '💶', color: 'text-emerald-700 bg-emerald-50' },
          { label: 'Commissions (12%)', value: `${totalCommission.toLocaleString('fr-FR')}€`, icon: '🛡️', color: 'text-sunset-500 bg-sunset-50' },
          { label: 'Litiges en cours', value: counts.disputed.toString(), icon: '⚖️', color: 'text-rose-700 bg-rose-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex items-center gap-4">
            <span className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${s.color}`}>{s.icon}</span>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{s.label}</p>
              <p className="font-black text-slate-900 text-lg leading-tight">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        {(['all', 'confirmed', 'pending', 'disputed', 'completed', 'cancelled'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl border transition-all ${filter === f ? 'bg-slate-950 text-white border-slate-950' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
          >
            {f === 'all' ? 'Toutes' : statusConfig[f].label}
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${filter === f ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>{counts[f]}</span>
          </button>
        ))}
        <input
          type="text"
          placeholder="ID, annonce, voyageur…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="ml-auto px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:border-sunset-400 min-w-[200px]"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-left">
                <th className="px-5 py-4 font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">ID</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Annonce</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Voyageur</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Dates</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider text-right">Montant</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider text-right">Commission</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(b => {
                const cfg = statusConfig[b.status];
                return (
                  <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-slate-700 whitespace-nowrap">{b.id}</td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-slate-900">{b.listingTitle}</p>
                      <p className="text-slate-400 mt-0.5">{b.agency} · {b.city}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-slate-700">{b.traveler}</p>
                      <p className="text-slate-400 mt-0.5">{b.paymentMethod}</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="font-bold text-slate-700">{b.checkIn} → {b.checkOut}</p>
                      <p className="text-slate-400 mt-0.5">{b.nights} nuits</p>
                    </td>
                    <td className="px-4 py-4 text-right font-black text-slate-900">{b.amount.toLocaleString('fr-FR')}€</td>
                    <td className="px-4 py-4 text-right font-bold text-emerald-700">{b.commission.toLocaleString('fr-FR')}€</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-bold">Aucune réservation trouvée.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-6 text-xs font-bold text-slate-700">
            <span>Volume affiché : <span className="text-slate-900 font-black">{totalAmount.toLocaleString('fr-FR')}€</span></span>
            <span>Commissions : <span className="text-emerald-700 font-black">{totalCommission.toLocaleString('fr-FR')}€</span></span>
          </div>
        )}
      </div>
    </div>
  );
}
