'use client';

import React, { useState } from 'react';

type UserRole = 'traveler' | 'agency' | 'admin' | 'moderator';
type UserStatus = 'active' | 'suspended' | 'pending';

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
  lastActive: string;
  bookings?: number;
  agency?: string;
}

const initialUsers: PlatformUser[] = [
  { id: 'usr-001', name: 'Jean-Paul Martin', email: 'jp.martin@email.fr', role: 'traveler', status: 'active', joinedAt: '01/03/2024', lastActive: 'Aujourd\'hui', bookings: 8 },
  { id: 'usr-002', name: 'Marie Fontaine', email: 'marie@provence-sel.fr', role: 'agency', status: 'active', joinedAt: '15/01/2024', lastActive: 'Il y a 2h', agency: 'Provence Sélection' },
  { id: 'usr-003', name: 'Pierre Delmas', email: 'p.delmas@cote-luxe.fr', role: 'agency', status: 'active', joinedAt: '10/02/2024', lastActive: 'Hier', agency: 'Côte d\'Azur Luxe' },
  { id: 'usr-004', name: 'Admin Location Vacances', email: 'admin@location-vacances.com', role: 'admin', status: 'active', joinedAt: '01/01/2024', lastActive: 'Aujourd\'hui' },
  { id: 'usr-005', name: 'Camille Moreau', email: 'c.moreau@location-vacances.com', role: 'moderator', status: 'active', joinedAt: '01/02/2024', lastActive: 'Il y a 1h' },
  { id: 'usr-006', name: 'Fatima Benali', email: 'f.benali@sudimmo.fr', role: 'agency', status: 'suspended', joinedAt: '05/04/2024', lastActive: 'Il y a 10j', agency: 'Sud Immo Pro' },
  { id: 'usr-007', name: 'Thomas Girard', email: 'tgirard@email.fr', role: 'traveler', status: 'active', joinedAt: '20/04/2024', lastActive: 'Il y a 3j', bookings: 2 },
  { id: 'usr-008', name: 'Luc Bernard', email: 'luc@alpes-chalets.com', role: 'agency', status: 'pending', joinedAt: '21/06/2025', lastActive: 'Jamais', agency: 'Alpes Chalets' },
  { id: 'usr-009', name: 'Clara Dupont', email: 'c.dupont@gmail.fr', role: 'traveler', status: 'active', joinedAt: '11/05/2024', lastActive: 'Il y a 1j', bookings: 5 },
  { id: 'usr-010', name: 'Zoé Marchand', email: 'zoe@email.fr', role: 'traveler', status: 'suspended', joinedAt: '01/06/2024', lastActive: 'Il y a 20j', bookings: 1 },
];

const roleConfig: Record<UserRole, { label: string; color: string; bg: string; icon: string }> = {
  traveler:  { label: 'Voyageur', color: 'text-ocean-700', bg: 'bg-ocean-50 border-ocean-200', icon: '🧳' },
  agency:    { label: 'Agence', color: 'text-sunset-700', bg: 'bg-sunset-50 border-sunset-200', icon: '🏢' },
  moderator: { label: 'Modérateur', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200', icon: '🛡️' },
  admin:     { label: 'Admin', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200', icon: '🔑' },
};

const statusConfig: Record<UserStatus, { label: string; color: string; dot: string }> = {
  active:    { label: 'Actif', color: 'text-emerald-700', dot: 'bg-emerald-500' },
  suspended: { label: 'Suspendu', color: 'text-rose-700', dot: 'bg-rose-500' },
  pending:   { label: 'En attente', color: 'text-amber-700', dot: 'bg-amber-500' },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<PlatformUser[]>(initialUsers);
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<PlatformUser | null>(null);

  const filtered = users.filter(u => {
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchStatus && matchSearch;
  });

  const handleRoleChange = (id: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  const handleStatusToggle = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight">Gestion des Utilisateurs</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Gérez les rôles, permissions et statuts de tous les comptes de la plateforme.</p>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
          {(['traveler', 'agency', 'moderator', 'admin'] as UserRole[]).map(r => {
            const cfg = roleConfig[r];
            const count = users.filter(u => u.role === r).length;
            return (
              <div key={r} className={`px-3 py-2 rounded-2xl border ${cfg.bg}`}>
                <p className={`text-base`}>{cfg.icon}</p>
                <p className={`font-black ${cfg.color}`}>{count}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {(['all', 'traveler', 'agency', 'moderator', 'admin'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg transition-all ${roleFilter === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {r === 'all' ? 'Tous' : roleConfig[r].label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {(['all', 'active', 'suspended', 'pending'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === s ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {s === 'all' ? 'Tous statuts' : statusConfig[s].label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Nom, email…"
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
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider">Utilisateur</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Rôle</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Inscrit le</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Dernière activité</th>
                <th className="px-4 py-4 font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(user => {
                const roleCfg = roleConfig[user.role];
                const statusCfg = statusConfig[user.status];
                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base border ${roleCfg.bg}`}>
                          {roleCfg.icon}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{user.name}</p>
                          <p className="text-slate-400 mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={user.role}
                        onChange={e => handleRoleChange(user.id, e.target.value as UserRole)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${roleCfg.bg} ${roleCfg.color}`}
                      >
                        <option value="traveler">Voyageur</option>
                        <option value="agency">Agence</option>
                        <option value="moderator">Modérateur</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${statusCfg.dot}`} />
                        <span className={`font-bold ${statusCfg.color}`}>{statusCfg.label}</span>
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 font-semibold">{user.joinedAt}</td>
                    <td className="px-4 py-4 text-slate-500 font-semibold">{user.lastActive}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStatusToggle(user.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-[10px] transition-colors ${
                            user.status === 'active'
                              ? 'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100'
                              : 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          {user.status === 'active' ? 'Suspendre' : 'Réactiver'}
                        </button>
                        <button
                          onClick={() => setSelected(user)}
                          className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-[10px] hover:bg-slate-200 transition-colors"
                        >
                          Détails
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-bold">Aucun utilisateur trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 flex flex-col gap-5 animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${roleConfig[selected.role].bg}`}>
                  {roleConfig[selected.role].icon}
                </div>
                <div>
                  <h2 className="font-black text-slate-900">{selected.name}</h2>
                  <p className="text-xs text-slate-500 font-semibold">{selected.email}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700 text-xl leading-none">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              {[
                { label: 'Rôle', value: roleConfig[selected.role].label },
                { label: 'Statut', value: statusConfig[selected.status].label },
                { label: 'Inscrit le', value: selected.joinedAt },
                { label: 'Dernière activité', value: selected.lastActive },
                ...(selected.agency ? [{ label: 'Agence', value: selected.agency }] : []),
                ...(selected.bookings !== undefined ? [{ label: 'Réservations', value: `${selected.bookings} résa` }] : []),
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-2xl p-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-slate-900 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { handleStatusToggle(selected.id); setSelected(null); }}
                className={`flex-1 py-3 text-xs font-bold rounded-2xl transition-colors border ${selected.status === 'active' ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'}`}>
                {selected.status === 'active' ? 'Suspendre le compte' : 'Réactiver le compte'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
