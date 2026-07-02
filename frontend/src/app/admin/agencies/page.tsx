'use client';

import React, { useState } from 'react';

type KycStatus = 'pending' | 'approved' | 'rejected' | 'review';

interface Agency {
  id: string;
  name: string;
  manager: string;
  email: string;
  city: string;
  submittedAt: string;
  status: KycStatus;
  properties: number;
  kbis: boolean;
  insurance: boolean;
  rib: boolean;
}

const initialAgencies: Agency[] = [
  { id: 'agc-001', name: 'Provence Sélection', manager: 'Marie Fontaine', email: 'contact@provence-sel.fr', city: 'Aix-en-Provence', submittedAt: '20/06/2025', status: 'pending', properties: 12, kbis: true, insurance: true, rib: false },
  { id: 'agc-002', name: 'Côte d\'Azur Luxe', manager: 'Pierre Delmas', email: 'p.delmas@cote-luxe.fr', city: 'Nice', submittedAt: '18/06/2025', status: 'pending', properties: 24, kbis: true, insurance: false, rib: true },
  { id: 'agc-003', name: 'Corse Prestige', manager: 'Antoine Rossi', email: 'rossi@corse-prestige.fr', city: 'Ajaccio', submittedAt: '15/06/2025', status: 'review', properties: 8, kbis: true, insurance: true, rib: true },
  { id: 'agc-004', name: 'Bretagne & Mer', manager: 'Sophie Kermarrec', email: 'contact@bretagne-mer.fr', city: 'Quimper', submittedAt: '10/06/2025', status: 'approved', properties: 31, kbis: true, insurance: true, rib: true },
  { id: 'agc-005', name: 'Alpes Chalets', manager: 'Luc Bernard', email: 'luc@alpes-chalets.com', city: 'Annecy', submittedAt: '08/06/2025', status: 'approved', properties: 19, kbis: true, insurance: true, rib: true },
  { id: 'agc-006', name: 'Sud Immo Pro', manager: 'Fatima Benali', email: 'f.benali@sudimmo.fr', city: 'Montpellier', submittedAt: '05/06/2025', status: 'rejected', properties: 0, kbis: false, insurance: false, rib: false },
];

const statusConfig: Record<KycStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'En attente', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  review:  { label: 'En cours d\'examen', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  approved:{ label: 'Approuvée', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  rejected:{ label: 'Rejetée', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
};

export default function AdminAgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>(initialAgencies);
  const [filter, setFilter] = useState<KycStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Agency | null>(null);
  const [note, setNote] = useState('');

  const filtered = agencies.filter((a) => {
    const matchFilter = filter === 'all' || a.status === filter;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleDecision = (id: string, decision: 'approved' | 'rejected') => {
    setAgencies(prev => prev.map(a => a.id === id ? { ...a, status: decision } : a));
    setSelected(null);
    setNote('');
  };

  const counts = {
    all: agencies.length,
    pending: agencies.filter(a => a.status === 'pending').length,
    review: agencies.filter(a => a.status === 'review').length,
    approved: agencies.filter(a => a.status === 'approved').length,
    rejected: agencies.filter(a => a.status === 'rejected').length,
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight">Validation des Agences</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Examinez les dossiers KYC et accordez (ou refusez) l'accès à la plateforme.</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2">
          <span className="text-amber-600 font-black text-lg">{counts.pending + counts.review}</span>
          <span className="text-xs text-amber-700 font-bold">dossiers à traiter</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        {(['all', 'pending', 'review', 'approved', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl border transition-all ${
              filter === f
                ? 'bg-slate-950 text-white border-slate-950'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            {f === 'all' ? 'Toutes' : statusConfig[f].label}
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${filter === f ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
              {counts[f]}
            </span>
          </button>
        ))}
        <input
          type="text"
          placeholder="Rechercher agence, ville…"
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
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider">Agence</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Ville</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider text-center">Biens</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider text-center">Documents</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Soumis le</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((agency) => {
                const cfg = statusConfig[agency.status];
                const docsOk = [agency.kbis, agency.insurance, agency.rib].filter(Boolean).length;
                return (
                  <tr key={agency.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-900">{agency.name}</p>
                        <p className="text-slate-400 mt-0.5">{agency.manager} · {agency.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600 font-semibold">{agency.city}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="font-black text-slate-800">{agency.properties}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <span title="KBIS" className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${agency.kbis ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>K</span>
                        <span title="Assurance" className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${agency.insurance ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>A</span>
                        <span title="RIB" className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${agency.rib ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>R</span>
                        <span className="text-slate-400 ml-1">{docsOk}/3</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 font-semibold">{agency.submittedAt}</td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => { setSelected(agency); setNote(''); }}
                        className="px-3 py-1.5 bg-slate-950 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                      >
                        Examiner
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-bold">
                    Aucune agence correspondant à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 flex flex-col gap-6 animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-display font-black text-slate-900">{selected.name}</h2>
                <p className="text-xs text-slate-500 font-semibold mt-1">{selected.manager} · {selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700 text-xl leading-none">✕</button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold">
              {[
                { label: 'KBIS', ok: selected.kbis },
                { label: 'Assurance Pro', ok: selected.insurance },
                { label: 'RIB Bancaire', ok: selected.rib },
              ].map(doc => (
                <div key={doc.label} className={`p-3 rounded-2xl border ${doc.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
                  <div className="text-lg mb-1">{doc.ok ? '✅' : '❌'}</div>
                  {doc.label}
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Note administrative (optionnel)</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Ex: Dossier complet, agence établie depuis 5 ans…"
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-sunset-400 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleDecision(selected.id, 'rejected')}
                className="flex-1 py-3 bg-rose-50 border border-rose-200 text-rose-700 font-bold rounded-2xl hover:bg-rose-100 transition-colors text-xs"
              >
                ✕ Rejeter le dossier
              </button>
              <button
                onClick={() => handleDecision(selected.id, 'approved')}
                className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-colors text-xs"
              >
                ✓ Valider l'agence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
