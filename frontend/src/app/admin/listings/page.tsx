'use client';

import React, { useState } from 'react';

type ModerationStatus = 'pending' | 'approved' | 'flagged' | 'removed';

interface ListingMod {
  id: string;
  title: string;
  agency: string;
  city: string;
  type: string;
  price: number;
  submittedAt: string;
  status: ModerationStatus;
  flags: string[];
  photos: number;
}

const initialListings: ListingMod[] = [
  { id: 'lst-001', title: 'Villa Lumière avec piscine privée', agency: 'Provence Sélection', city: 'Gordes', type: 'Villa', price: 340, submittedAt: '23/06/2025', status: 'pending', flags: [], photos: 18 },
  { id: 'lst-002', title: 'Appartement vue mer panoramique', agency: 'Côte d\'Azur Luxe', city: 'Cannes', type: 'Appartement', price: 195, submittedAt: '22/06/2025', status: 'pending', flags: ['Prix suspects'], photos: 12 },
  { id: 'lst-003', title: 'Mas authentique en Camargue', agency: 'Provence Sélection', city: 'Saintes-Maries', type: 'Mas', price: 280, submittedAt: '21/06/2025', status: 'approved', flags: [], photos: 24 },
  { id: 'lst-004', title: 'Chalet bois au pied des pistes', agency: 'Alpes Chalets', city: 'Méribel', type: 'Chalet', price: 520, submittedAt: '20/06/2025', status: 'flagged', flags: ['Signalement utilisateur', 'Photos non conformes'], photos: 5 },
  { id: 'lst-005', title: 'Villa Corsica — domaine privé', agency: 'Corse Prestige', city: 'Porto-Vecchio', type: 'Villa', price: 890, submittedAt: '19/06/2025', status: 'pending', flags: [], photos: 32 },
  { id: 'lst-006', title: 'Studio plage Pays Basque', agency: 'Sud Immo Pro', city: 'Biarritz', type: 'Studio', price: 95, submittedAt: '17/06/2025', status: 'removed', flags: ['Contenu trompeur'], photos: 3 },
];

const statusConfig: Record<ModerationStatus, { label: string; color: string; bg: string }> = {
  pending:  { label: 'En attente', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  approved: { label: 'En ligne', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  flagged:  { label: 'Signalée', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
  removed:  { label: 'Retirée', color: 'text-slate-500', bg: 'bg-slate-100 border-slate-200' },
};

export default function AdminListingsPage() {
  const [listings, setListings] = useState<ListingMod[]>(initialListings);
  const [filter, setFilter] = useState<ModerationStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<ListingMod | null>(null);

  const filtered = listings.filter(l => {
    const matchFilter = filter === 'all' || l.status === filter;
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) || l.agency.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleAction = (id: string, newStatus: ModerationStatus) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    setSelected(null);
  };

  const counts = {
    all: listings.length,
    pending: listings.filter(l => l.status === 'pending').length,
    flagged: listings.filter(l => l.status === 'flagged').length,
    approved: listings.filter(l => l.status === 'approved').length,
    removed: listings.filter(l => l.status === 'removed').length,
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight">Modération des Annonces</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Vérifiez la conformité des annonces soumises par les agences et gérez les signalements.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2">
            <span className="text-amber-600 font-black text-lg">{counts.pending}</span>
            <span className="text-xs text-amber-700 font-bold">en attente</span>
          </div>
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-2xl px-4 py-2">
            <span className="text-rose-600 font-black text-lg">{counts.flagged}</span>
            <span className="text-xs text-rose-700 font-bold">signalées</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        {(['all', 'pending', 'flagged', 'approved', 'removed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl border transition-all ${filter === f ? 'bg-slate-950 text-white border-slate-950' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
          >
            {f === 'all' ? 'Toutes' : statusConfig[f].label}
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${filter === f ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>{counts[f]}</span>
          </button>
        ))}
        <input
          type="text"
          placeholder="Titre, agence…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="ml-auto px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:border-sunset-400 min-w-[200px]"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(listing => {
          const cfg = statusConfig[listing.status];
          return (
            <div key={listing.id} className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col">
              {/* Card header band */}
              <div className={`px-5 py-3 flex items-center justify-between border-b ${cfg.bg}`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>{cfg.label}</span>
                <span className="text-[10px] font-bold text-slate-500">{listing.id}</span>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">{listing.title}</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">{listing.agency} · {listing.city}</p>
                </div>
                <div className="flex gap-3 text-xs font-bold text-slate-600">
                  <span className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">{listing.type}</span>
                  <span className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">{listing.price}€/nuit</span>
                  <span className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">📸 {listing.photos}</span>
                </div>
                {listing.flags.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {listing.flags.map(f => (
                      <span key={f} className="flex items-center gap-1.5 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-2.5 py-1">
                        ⚠️ {f}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-[10px] text-slate-400 font-semibold mt-auto">Soumis le {listing.submittedAt}</p>
                <div className="flex gap-2 mt-1">
                  {listing.status !== 'removed' && (
                    <button
                      onClick={() => handleAction(listing.id, 'removed')}
                      className="flex-1 py-2 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
                    >
                      Retirer
                    </button>
                  )}
                  {listing.status !== 'approved' && listing.status !== 'removed' && (
                    <button
                      onClick={() => handleAction(listing.id, 'approved')}
                      className="flex-1 py-2 text-[10px] font-bold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors"
                    >
                      Approuver
                    </button>
                  )}
                  <button
                    onClick={() => setSelected(listing)}
                    className="flex-1 py-2 text-[10px] font-bold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Détails
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-3 py-16 text-center text-slate-400 font-bold bg-white border border-slate-100 rounded-3xl">
            Aucune annonce trouvée.
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 flex flex-col gap-5 animate-fade-in">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-display font-black text-slate-900 pr-4">{selected.title}</h2>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700 text-xl leading-none shrink-0">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              {[
                { label: 'Agence', value: selected.agency },
                { label: 'Ville', value: selected.city },
                { label: 'Type', value: selected.type },
                { label: 'Prix / nuit', value: `${selected.price}€` },
                { label: 'Photos', value: `${selected.photos} photos` },
                { label: 'Soumis le', value: selected.submittedAt },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-2xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-slate-900 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            {selected.flags.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
                <p className="text-xs font-bold text-rose-700 mb-2">Signalements :</p>
                <ul className="flex flex-col gap-1">
                  {selected.flags.map(f => <li key={f} className="text-[10px] font-semibold text-rose-600">• {f}</li>)}
                </ul>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => handleAction(selected.id, 'removed')} className="flex-1 py-3 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-2xl hover:bg-rose-100 transition-colors">Retirer</button>
              <button onClick={() => handleAction(selected.id, 'approved')} className="flex-1 py-3 text-xs font-bold text-white bg-emerald-500 rounded-2xl hover:bg-emerald-600 transition-colors">Approuver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
