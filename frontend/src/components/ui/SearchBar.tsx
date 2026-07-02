'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { mockDestinations } from '@/data/mock-destinations';
import DatePicker from './DatePicker';
import { format } from 'date-fns';

export default function SearchBar({ inline = false }: { inline?: boolean }) {
  const router = useRouter();
  const { searchFilters, setSearchFilters } = useAppStore();
  const [destinationInput, setDestinationInput] = useState(searchFilters.destination || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof mockDestinations>([]);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const guestDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
        setShowGuestDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestions
  useEffect(() => {
    if (destinationInput.trim().length > 1) {
      const filtered = mockDestinations.filter(
        (d) =>
          d.name.toLowerCase().includes(destinationInput.toLowerCase()) ||
          d.country.toLowerCase().includes(destinationInput.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      // Show popular destinations by default
      setSuggestions(mockDestinations.filter((d) => d.popular).slice(0, 5));
    }
  }, [destinationInput]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update store
    setSearchFilters({
      destination: destinationInput,
    });

    // Build URL query string
    const query = new URLSearchParams();
    if (destinationInput) query.set('destination', destinationInput);
    if (searchFilters.checkIn) query.set('checkIn', searchFilters.checkIn);
    if (searchFilters.checkOut) query.set('checkOut', searchFilters.checkOut);
    if (searchFilters.guests) query.set('guests', searchFilters.guests.toString());

    router.push(`/listings?${query.toString()}`);
  };

  const selectSuggestion = (name: string) => {
    setDestinationInput(name);
    setShowSuggestions(false);
    setSearchFilters({ destination: name });
  };

  const adjustGuests = (amount: number) => {
    const val = Math.max(1, Math.min(40, searchFilters.guests + amount));
    setSearchFilters({ guests: val });
  };

  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full transition-all duration-300 ${
        inline
          ? 'bg-white shadow-lg border border-slate-100 p-4 rounded-2xl flex flex-col lg:flex-row gap-4 items-stretch lg:items-center'
          : 'glass shadow-2xl p-5 md:p-6 rounded-3xl flex flex-col lg:flex-row gap-4 items-stretch lg:items-end w-full max-w-6xl mx-auto'
      }`}
    >
      {/* Destination */}
      <div className="flex-1 relative" ref={suggestionsRef}>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 px-1">
          Où partez-vous ?
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Côte d'Azur, Espagne, Corse..."
            value={destinationInput}
            onChange={(e) => setDestinationInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all font-semibold"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Suggestions Autocomplete */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-30 animate-scale-in">
            <div className="p-3 bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-wider font-bold text-slate-400">
              Suggestions de vacances
            </div>
            {suggestions.map((dest) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => selectSuggestion(dest.name)}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-center justify-between border-b border-slate-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">{dest.name}</span>
                    <span className="text-xs text-slate-500 block">{dest.region ? `${dest.region}, ` : ''}{dest.country}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold bg-ocean-50 text-ocean-700 px-2 py-1 rounded-full">
                  {dest.listingCount.toLocaleString()} locations
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date d'arrivée */}
      <div className="w-full lg:w-48">
        <DatePicker
          label="Arrivée"
          placeholder="Date"
          value={searchFilters.checkIn}
          minDate={today}
          onChange={(date) => setSearchFilters({ checkIn: date })}
        />
      </div>

      {/* Date de départ */}
      <div className="w-full lg:w-48">
        <DatePicker
          label="Départ"
          placeholder="Date"
          value={searchFilters.checkOut}
          minDate={searchFilters.checkIn || today}
          onChange={(date) => setSearchFilters({ checkOut: date })}
        />
      </div>

      {/* Voyageurs */}
      <div className="w-full lg:w-48 relative" ref={guestDropdownRef}>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 px-1">
          Voyageurs
        </label>
        <button
          type="button"
          onClick={() => setShowGuestDropdown(!showGuestDropdown)}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all flex items-center justify-between font-semibold"
        >
          <span className="flex items-center gap-2">
            <span>👥</span>
            <span>
              {searchFilters.guests} voyageur{searchFilters.guests > 1 ? 's' : ''}
            </span>
          </span>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform ${showGuestDropdown ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {/* Guests Dropdown */}
        {showGuestDropdown && (
          <div className="absolute top-full right-0 left-0 lg:left-auto lg:w-64 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-30 animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-slate-800 block">Capacité</span>
                <span className="text-xs text-slate-500 block">De 1 à 40 voyageurs</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => adjustGuests(-1)}
                  disabled={searchFilters.guests <= 1}
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-350 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="text-sm font-bold text-slate-800 w-6 text-center">
                  {searchFilters.guests}
                </span>
                <button
                  type="button"
                  onClick={() => adjustGuests(1)}
                  disabled={searchFilters.guests >= 40}
                  className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-350 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Button de recherche */}
      <div className="w-full lg:w-auto">
        <button
          type="submit"
          className="btn-primary w-full h-[46px] flex items-center justify-center font-bold tracking-wide"
        >
          <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <span className="lg:hidden xl:inline">Rechercher</span>
        </button>
      </div>
    </form>
  );
}
