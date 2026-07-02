'use client';

import React, { useState } from 'react';

export default function AgencyCalendarPage() {
  const properties = [
    { id: 'lst-001', title: 'Villa Azur avec Piscine à Débordement' },
    { id: 'lst-002', title: 'Mas Provençal de Charme au Cœur du Luberon' }
  ];

  const [selectedPropertyId, setSelectedPropertyId] = useState('lst-001');
  const [blockedDays, setBlockedDays] = useState<number[]>([4, 5, 12, 13, 14, 20, 21, 27, 28]);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const toggleDayBlock = (day: number) => {
    setBlockedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight leading-snug">
            Calendrier des Disponibilités
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Sélectionnez un hébergement pour consulter son occupation ou bloquer manuellement des dates.
          </p>
        </div>

        {/* Dropdown Selector */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-650 shrink-0 shadow-sm">
          <span>Hébergement :</span>
          <select
            value={selectedPropertyId}
            onChange={(e) => setSelectedPropertyId(e.target.value)}
            className="bg-transparent border-0 font-bold text-slate-800 focus:ring-0 focus:outline-none cursor-pointer text-xs"
          >
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid Calendar */}
      <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col gap-6">
        
        {/* Calendar Title & legend */}
        <div className="flex items-center justify-between text-sm font-bold text-slate-800 flex-wrap gap-3 pb-3 border-b border-slate-100">
          <span>📅 Juillet 2026</span>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-50 border border-emerald-250 block" /> Disponible
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-rose-50 border border-rose-250 block" /> Réservé / Bloqué
            </span>
          </div>
        </div>

        {/* Week Days Headers */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-450 uppercase tracking-wider">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((w) => (
            <div key={w} className="py-2">{w}</div>
          ))}
          
          {/* Empty slot padding for alignment */}
          <div className="py-3 bg-slate-50/20 text-slate-300 rounded-xl border border-transparent font-bold">30</div>
          
          {/* Days Grid */}
          {daysInMonth.map((day) => {
            const isBlocked = blockedDays.includes(day);
            return (
              <button
                key={day}
                onClick={() => toggleDayBlock(day)}
                type="button"
                className={`py-4 rounded-2xl border text-xs font-black transition-all flex flex-col items-center justify-between h-20 shadow-sm ${
                  isBlocked
                    ? 'bg-rose-50 text-rose-600 border-rose-150 hover:bg-rose-100/70'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-150 hover:bg-emerald-100/70'
                }`}
              >
                <span>{day}</span>
                <span className="text-[9px] uppercase font-bold tracking-wide opacity-80 mt-1 block">
                  {isBlocked ? 'Bloqué 🔒' : 'Libre 🔓'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Helper text */}
        <p className="text-[10px] text-slate-450 font-bold uppercase border-t border-slate-100 pt-4">
          💡 Astuce : Cliquez sur une case pour bloquer ou libérer la journée (synchronisation instantanée avec le tunnel de recherche).
        </p>
      </div>

    </div>
  );
}
