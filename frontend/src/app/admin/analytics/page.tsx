'use client';

import React, { useState } from 'react';

// Simulated GA4-style analytics data
const dailyTraffic = [
  { date: 'Lun', sessions: 1240, bookings: 18, revenue: 8400 },
  { date: 'Mar', sessions: 980, bookings: 14, revenue: 6720 },
  { date: 'Mer', sessions: 1560, bookings: 24, revenue: 11520 },
  { date: 'Jeu', sessions: 1840, bookings: 31, revenue: 14880 },
  { date: 'Ven', sessions: 2100, bookings: 38, revenue: 18240 },
  { date: 'Sam', sessions: 2850, bookings: 52, revenue: 24960 },
  { date: 'Dim', sessions: 2440, bookings: 43, revenue: 20640 },
];

const topPages = [
  { path: '/', label: 'Accueil', sessions: 4820, bounce: '38%', duration: '2m 14s' },
  { path: '/listings', label: 'Recherche Annonces', sessions: 3240, bounce: '42%', duration: '3m 51s' },
  { path: '/destinations', label: 'Destinations', sessions: 1870, bounce: '35%', duration: '2m 05s' },
  { path: '/blog', label: 'Blog', sessions: 1120, bounce: '58%', duration: '1m 42s' },
  { path: '/listings/[id]', label: 'Fiches Annonces', sessions: 2940, bounce: '29%', duration: '4m 33s' },
];

const topDestinations = [
  { name: 'Provence', flag: '🏔️', visits: 2140, convRate: '3.8%' },
  { name: 'Côte d\'Azur', flag: '☀️', visits: 1890, convRate: '4.2%' },
  { name: 'Corse', flag: '🌊', visits: 1540, convRate: '5.1%' },
  { name: 'Bretagne', flag: '🌿', visits: 980, convRate: '2.9%' },
  { name: 'Alpes', flag: '❄️', visits: 870, convRate: '4.7%' },
];

const sources = [
  { label: 'Recherche organique', value: 42, color: 'bg-emerald-500' },
  { label: 'Accès direct', value: 28, color: 'bg-indigo-500' },
  { label: 'Réseaux sociaux', value: 16, color: 'bg-sunset-500' },
  { label: 'Referral / Backlinks', value: 9, color: 'bg-ocean-500' },
  { label: 'Email marketing', value: 5, color: 'bg-amber-400' },
];

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  const totalSessions = dailyTraffic.reduce((s, d) => s + d.sessions, 0);
  const totalBookings = dailyTraffic.reduce((s, d) => s + d.bookings, 0);
  const totalRevenue = dailyTraffic.reduce((s, d) => s + d.revenue, 0);
  const avgConv = ((totalBookings / totalSessions) * 100).toFixed(2);

  const maxSessions = Math.max(...dailyTraffic.map(d => d.sessions));

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight">Statistiques & Analyse Trafic</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Activité plateforme simulée (données fictives de démonstration, connectables à GA4 via gtag).</p>
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 text-xs font-bold self-start sm:self-auto">
          {(['7d', '30d', '90d'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg transition-all ${period === p ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {p === '7d' ? '7 jours' : p === '30d' ? '30 jours' : '90 jours'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Sessions (7j)', value: totalSessions.toLocaleString('fr-FR'), change: '+14.2% vs sem. préc.', icon: '👁️', color: 'text-indigo-700 bg-indigo-50' },
          { label: 'Réservations (7j)', value: totalBookings.toString(), change: '+8.7% vs sem. préc.', icon: '🧳', color: 'text-emerald-700 bg-emerald-50' },
          { label: 'Revenus bruts (7j)', value: `${totalRevenue.toLocaleString('fr-FR')}€`, change: '+11.3% vs sem. préc.', icon: '💶', color: 'text-sunset-500 bg-sunset-50' },
          { label: 'Taux de conversion', value: `${avgConv}%`, change: 'Sessions → Réservation', icon: '🎯', color: 'text-rose-700 bg-rose-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight">{kpi.label}</p>
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${kpi.color}`}>{kpi.icon}</span>
            </div>
            <p className="font-black text-slate-900 text-2xl leading-none">{kpi.value}</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-1.5">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Chart + Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-5">Sessions quotidiennes (7 derniers jours)</h3>
          <div className="flex items-end gap-3 h-44">
            {dailyTraffic.map(d => {
              const height = Math.round((d.sessions / maxSessions) * 100);
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500">{d.sessions.toLocaleString('fr-FR')}</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all"
                    style={{ height: `${height}%` }}
                    title={`${d.date}: ${d.sessions} sessions`}
                  />
                  <span className="text-[10px] font-bold text-slate-500">{d.date}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-5">Sources de trafic</h3>
          <div className="flex flex-col gap-3">
            {sources.map(s => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-1">
                  <span>{s.label}</span>
                  <span>{s.value}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color} transition-all`} style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages + Top Destinations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Pages les plus visitées</h3>
          <div className="flex flex-col divide-y divide-slate-50">
            {topPages.map(p => (
              <div key={p.path} className="flex items-center gap-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-xs truncate">{p.label}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">{p.path}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-black text-slate-900">{p.sessions.toLocaleString('fr-FR')}</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Taux sortie : {p.bounce}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-bold hidden sm:block">{p.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Destinations les plus recherchées</h3>
          <div className="flex flex-col divide-y divide-slate-50">
            {topDestinations.map((d, i) => (
              <div key={d.name} className="flex items-center gap-4 py-3">
                <span className="text-[10px] font-black text-slate-400 w-4">{i + 1}</span>
                <span className="text-xl">{d.flag}</span>
                <p className="flex-1 font-bold text-slate-900 text-xs">{d.name}</p>
                <div className="text-right text-xs">
                  <p className="font-black text-slate-900">{d.visits.toLocaleString('fr-FR')} visites</p>
                  <p className="text-[10px] text-emerald-700 font-bold">Conv. {d.convRate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GA4 Integration Notice */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-6 flex items-start gap-4">
        <span className="text-3xl shrink-0">📊</span>
        <div>
          <p className="text-sm font-bold text-indigo-900">Intégration Google Analytics 4</p>
          <p className="text-xs text-indigo-700 font-semibold mt-1">
            Ces données sont simulées pour la démonstration. En production, connectez votre ID de mesure GA4 dans <code className="bg-indigo-100 px-1.5 py-0.5 rounded font-mono">.env.local</code> et installez le package <code className="bg-indigo-100 px-1.5 py-0.5 rounded font-mono">next-ga4</code> ou utilisez l'API Data GA4 pour récupérer de vraies métriques dans cette vue.
          </p>
        </div>
      </div>
    </div>
  );
}
