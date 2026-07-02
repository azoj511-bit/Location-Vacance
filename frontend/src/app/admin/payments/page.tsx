'use client';

import React, { useState } from 'react';

type TxStatus = 'completed' | 'pending' | 'failed' | 'refunded';
type TxType = 'booking' | 'commission' | 'payout' | 'refund';

interface Transaction {
  id: string;
  type: TxType;
  status: TxStatus;
  description: string;
  agency: string;
  traveler: string;
  bookingId: string;
  gross: number;
  commission: number;
  net: number;
  date: string;
  method: string;
}

const transactions: Transaction[] = [
  { id: 'TX-20250101', type: 'booking', status: 'completed', description: 'Villa Lumière — 7 nuits', agency: 'Provence Sélection', traveler: 'J.-P. Martin', bookingId: 'BK-20250001', gross: 2380, commission: 285.6, net: 2094.4, date: '20/06/2025', method: 'Carte Visa' },
  { id: 'TX-20250102', type: 'payout', status: 'completed', description: 'Virement Stripe Connect — mai 2025', agency: 'Alpes Chalets', traveler: '—', bookingId: '—', gross: 3640, commission: 436.8, net: 3203.2, date: '01/06/2025', method: 'Stripe Connect' },
  { id: 'TX-20250103', type: 'booking', status: 'pending', description: 'Mas Camargue — 7 nuits', agency: 'Provence Sélection', traveler: 'I. Renaud', bookingId: 'BK-20250002', gross: 1960, commission: 235.2, net: 1724.8, date: '22/06/2025', method: 'Virement' },
  { id: 'TX-20250104', type: 'refund', status: 'refunded', description: 'Remboursement — Studio Biarritz', agency: 'Sud Immo Pro', traveler: 'E. Lefèvre', bookingId: 'BK-20250006', gross: -665, commission: -79.8, net: -585.2, date: '18/06/2025', method: 'Carte Visa' },
  { id: 'TX-20250105', type: 'commission', status: 'completed', description: 'Commission plateforme — juin 2025', agency: 'Toutes', traveler: '—', bookingId: '—', gross: 0, commission: 2421.6, net: 0, date: '15/06/2025', method: 'Interne' },
  { id: 'TX-20250106', type: 'booking', status: 'completed', description: 'Villa Corsica — 14 nuits', agency: 'Corse Prestige', traveler: 'A. Bensoussan', bookingId: 'BK-20250005', gross: 12460, commission: 1495.2, net: 10964.8, date: '10/06/2025', method: 'Carte Visa' },
  { id: 'TX-20250107', type: 'payout', status: 'failed', description: 'Virement échoué — IBAN invalide', agency: 'Sud Immo Pro', traveler: '—', bookingId: '—', gross: 0, commission: 0, net: 0, date: '05/06/2025', method: 'SEPA' },
  { id: 'TX-20250108', type: 'booking', status: 'completed', description: 'Appart. Cannes — 7 nuits', agency: 'Côte d\'Azur Luxe', traveler: 'C. Dupont', bookingId: 'BK-20250004', gross: 1365, commission: 163.8, net: 1201.2, date: '01/06/2025', method: 'PayPal' },
];

const statusConfig: Record<TxStatus, { label: string; color: string; bg: string }> = {
  completed: { label: 'Effectué', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  pending:   { label: 'En attente', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  failed:    { label: 'Échoué', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
  refunded:  { label: 'Remboursé', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
};

const typeConfig: Record<TxType, { label: string; icon: string }> = {
  booking:    { label: 'Réservation', icon: '🧳' },
  commission: { label: 'Commission', icon: '🛡️' },
  payout:     { label: 'Virement', icon: '💸' },
  refund:     { label: 'Remboursement', icon: '↩️' },
};

export default function AdminPaymentsPage() {
  const [typeFilter, setTypeFilter] = useState<TxType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<TxStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(tx => {
    const matchType = typeFilter === 'all' || tx.type === typeFilter;
    const matchStatus = statusFilter === 'all' || tx.status === statusFilter;
    const matchSearch = tx.id.toLowerCase().includes(search.toLowerCase())
      || tx.description.toLowerCase().includes(search.toLowerCase())
      || tx.agency.toLowerCase().includes(search.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  const totalGross = filtered.filter(t => t.gross > 0).reduce((sum, t) => sum + t.gross, 0);
  const totalCommission = filtered.filter(t => t.commission > 0).reduce((sum, t) => sum + t.commission, 0);
  const totalRefunds = filtered.filter(t => t.gross < 0).reduce((sum, t) => sum + Math.abs(t.gross), 0);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight">Paiements & Flux Financiers</h1>
        <p className="text-xs text-slate-500 font-semibold mt-0.5">Traçabilité complète des transactions, commissions et virements Stripe Connect.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Volume brut (affiché)', value: `${totalGross.toLocaleString('fr-FR')}€`, icon: '💶', color: 'text-emerald-700 bg-emerald-50', desc: 'Transactions crédit' },
          { label: 'Commissions Location Vacances (12%)', value: `${totalCommission.toLocaleString('fr-FR')}€`, icon: '🛡️', color: 'text-indigo-700 bg-indigo-50', desc: 'Revenus plateforme' },
          { label: 'Remboursements émis', value: `${totalRefunds.toLocaleString('fr-FR')}€`, icon: '↩️', color: 'text-rose-700 bg-rose-50', desc: 'Annulations & litiges' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex items-center gap-4">
            <span className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${kpi.color}`}>{kpi.icon}</span>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{kpi.label}</p>
              <p className="font-black text-slate-900 text-xl leading-tight">{kpi.value}</p>
              <p className="text-[10px] text-slate-400 font-semibold">{kpi.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {(['all', 'booking', 'commission', 'payout', 'refund'] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg transition-all ${typeFilter === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {t === 'all' ? 'Tous' : typeConfig[t].label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {(['all', 'completed', 'pending', 'failed', 'refunded'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === s ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {s === 'all' ? 'Tous statuts' : statusConfig[s].label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="ID, description, agence…"
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
                <th className="px-5 py-4 font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">ID Transaction</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Agence / Voyageur</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider text-right">Brut</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider text-right">Commission</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider text-right">Net agence</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(tx => {
                const sCfg = statusConfig[tx.status];
                const tCfg = typeConfig[tx.type];
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-slate-600 whitespace-nowrap">{tx.id}</td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1.5 font-bold text-slate-700">
                        <span>{tCfg.icon}</span>{tCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-900">{tx.description}</td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-slate-700">{tx.agency}</p>
                      <p className="text-slate-400 mt-0.5">{tx.traveler}</p>
                    </td>
                    <td className={`px-4 py-4 text-right font-black ${tx.gross < 0 ? 'text-rose-700' : 'text-slate-900'}`}>
                      {tx.gross !== 0 ? `${tx.gross.toLocaleString('fr-FR')}€` : '—'}
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-emerald-700">
                      {tx.commission !== 0 ? `${tx.commission.toLocaleString('fr-FR')}€` : '—'}
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-indigo-700">
                      {tx.net !== 0 ? `${tx.net.toLocaleString('fr-FR')}€` : '—'}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${sCfg.bg} ${sCfg.color}`}>{sCfg.label}</span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 font-semibold whitespace-nowrap">{tx.date}</td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-slate-400 font-bold">Aucune transaction trouvée.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-end gap-6 text-xs font-bold text-slate-700">
            <span>Brut : <span className="text-slate-900 font-black">{totalGross.toLocaleString('fr-FR')}€</span></span>
            <span>Commission : <span className="text-emerald-700 font-black">{totalCommission.toLocaleString('fr-FR')}€</span></span>
            <span>Remboursements : <span className="text-rose-700 font-black">-{totalRefunds.toLocaleString('fr-FR')}€</span></span>
          </div>
        )}
      </div>
    </div>
  );
}
