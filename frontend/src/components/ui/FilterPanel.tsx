'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { ListingType, PoolType } from '@/types';

export default function FilterPanel() {
  const { searchFilters, setSearchFilters, resetSearchFilters } = useAppStore();

  const handleTypeChange = (type: ListingType) => {
    const currentTypes = [...searchFilters.types];
    const index = currentTypes.indexOf(type);
    if (index > -1) {
      currentTypes.splice(index, 1);
    } else {
      currentTypes.push(type);
    }
    setSearchFilters({ types: currentTypes });
  };

  const handlePoolChange = (pool: PoolType) => {
    const currentPools = [...searchFilters.pools];
    const index = currentPools.indexOf(pool);
    if (index > -1) {
      currentPools.splice(index, 1);
    } else {
      currentPools.push(pool);
    }
    setSearchFilters({ pools: currentPools });
  };

  const handleCheckboxChange = (field: keyof typeof searchFilters) => {
    setSearchFilters({ [field]: !searchFilters[field] as any });
  };

  const incrementBedrooms = (amount: number) => {
    const current = searchFilters.minBedrooms;
    setSearchFilters({ minBedrooms: Math.max(0, current + amount) });
  };

  const incrementBathrooms = (amount: number) => {
    const current = searchFilters.minBathrooms;
    setSearchFilters({ minBathrooms: Math.max(0, current + amount) });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h3 className="font-sans text-lg font-bold text-slate-800">Filtres de recherche</h3>
        <button
          type="button"
          onClick={resetSearchFilters}
          className="text-xs font-bold text-sunset-500 hover:text-sunset-600 hover:underline"
        >
          Réinitialiser
        </button>
      </div>

      {/* Property Type */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Type de bien</h4>
        <div className="flex flex-col gap-2">
          {Object.values(ListingType).map((type) => {
            const checked = searchFilters.types.includes(type);
            return (
              <label key={type} className="flex items-center gap-2 text-sm text-slate-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleTypeChange(type)}
                  className="rounded border-slate-300 text-sunset-500 focus:ring-sunset-500"
                />
                <span className="capitalize">{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price range */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Prix par nuit (€)</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1">Min</label>
            <input
              type="number"
              value={searchFilters.minPrice}
              onChange={(e) => setSearchFilters({ minPrice: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-sunset-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1">Max</label>
            <input
              type="number"
              value={searchFilters.maxPrice}
              onChange={(e) => setSearchFilters({ maxPrice: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-sunset-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Pool Types */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Piscine</h4>
        <div className="flex flex-col gap-2">
          {Object.values(PoolType).map((pool) => {
            const checked = searchFilters.pools.includes(pool);
            return (
              <label key={pool} className="flex items-center gap-2 text-sm text-slate-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handlePoolChange(pool)}
                  className="rounded border-slate-300 text-sunset-500 focus:ring-sunset-500"
                />
                <span className="capitalize">Piscine {pool}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Capacity criteria */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Chambres & Salles de bain</h4>
        
        {/* Bedrooms */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 font-medium">Chambres min.</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => incrementBedrooms(-1)}
              disabled={searchFilters.minBedrooms <= 0}
              className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-500 disabled:opacity-30"
            >
              -
            </button>
            <span className="text-sm font-semibold text-slate-800 w-4 text-center">
              {searchFilters.minBedrooms}
            </span>
            <button
              type="button"
              onClick={() => incrementBedrooms(1)}
              className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-500"
            >
              +
            </button>
          </div>
        </div>

        {/* Bathrooms */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 font-medium">Salles de bain min.</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => incrementBathrooms(-1)}
              disabled={searchFilters.minBathrooms <= 0}
              className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-500 disabled:opacity-30"
            >
              -
            </button>
            <span className="text-sm font-semibold text-slate-800 w-4 text-center">
              {searchFilters.minBathrooms}
            </span>
            <button
              type="button"
              onClick={() => incrementBathrooms(1)}
              className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-500"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Surface Area */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Surface minimale (m²)</h4>
        <input
          type="number"
          placeholder="Ex. 80"
          value={searchFilters.minSurface || ''}
          onChange={(e) => setSearchFilters({ minSurface: Number(e.target.value) })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-sunset-500 focus:outline-none"
        />
      </div>

      {/* Checkbox Amenities */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Équipements & Options</h4>
        <div className="flex flex-col gap-2.5 mt-1">
          {[
            { key: 'freeCancellation', label: 'Annulation gratuite' },
            { key: 'cleaningIncluded', label: 'Ménage inclus' },
            { key: 'wifi', label: 'Wi-Fi' },
            { key: 'airConditioning', label: 'Climatisation' },
            { key: 'petFriendly', label: 'Animaux acceptés' },
            { key: 'seaView', label: 'Vue mer' },
            { key: 'nearBeach', label: 'Proche plage' },
            { key: 'accessible', label: 'Accès PMR' },
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-2 text-sm text-slate-600 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={searchFilters[item.key as keyof typeof searchFilters] as boolean}
                onChange={() => handleCheckboxChange(item.key as keyof typeof searchFilters)}
                className="rounded border-slate-300 text-sunset-500 focus:ring-sunset-500"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
