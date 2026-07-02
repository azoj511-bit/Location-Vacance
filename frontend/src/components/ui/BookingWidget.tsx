'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Listing } from '@/types';
import DatePicker from './DatePicker';
import { differenceInDays, parseISO, addDays, format } from 'date-fns';
import { useAppStore } from '@/lib/store';

interface BookingWidgetProps {
  listing: Listing;
}

export default function BookingWidget({ listing }: BookingWidgetProps) {
  const router = useRouter();
  const { searchFilters, setSearchFilters } = useAppStore();
  
  const [checkIn, setCheckIn] = useState<string | null>(searchFilters.checkIn);
  const [checkOut, setCheckOut] = useState<string | null>(searchFilters.checkOut);
  const [guests, setGuests] = useState<number>(searchFilters.guests || 2);
  const [showGuestSelector, setShowGuestSelector] = useState(false);

  // Sync state with global store filters
  useEffect(() => {
    setCheckIn(searchFilters.checkIn);
    setCheckOut(searchFilters.checkOut);
    if (searchFilters.guests) setGuests(searchFilters.guests);
  }, [searchFilters]);

  // Calculate pricing breakdown
  const calculatePricing = () => {
    if (!checkIn || !checkOut) return null;

    const start = parseISO(checkIn);
    const end = parseISO(checkOut);
    const nights = differenceInDays(end, start);
    
    if (nights <= 0) return null;

    // Calculate total base price day by day (seasonal pricing)
    let totalBase = 0;
    for (let i = 0; i < nights; i++) {
      const currentDay = addDays(start, i);
      const currentDayStr = format(currentDay, 'yyyy-MM-dd');
      
      // Find seasonal price
      const season = listing.seasonalPricing.find((s) => {
        return currentDayStr >= s.startDate && currentDayStr <= s.endDate;
      });

      totalBase += season ? season.pricePerNight : listing.pricePerNight;
    }

    const cleaningFee = listing.features.cleaningIncluded ? 0 : 80;
    const serviceFee = Math.round(totalBase * 0.12); // 12% commission
    const touristTax = Math.round(2.2 * guests * nights); // 2.20€ per person per night
    const deposit = 500; // Refundable caution
    
    const totalPrice = totalBase + cleaningFee + serviceFee + touristTax;

    return {
      nights,
      averageNightly: Math.round(totalBase / nights),
      totalBase,
      cleaningFee,
      serviceFee,
      touristTax,
      deposit,
      totalPrice,
    };
  };

  const pricing = calculatePricing();

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert('Veuillez sélectionner vos dates de séjour.');
      return;
    }

    // Save current selection to store
    setSearchFilters({ checkIn, checkOut, guests });
    
    // Redirect to checkout
    router.push(`/booking/${listing.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xl sticky top-24">
      {/* Price header */}
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <span className="text-2xl font-black text-slate-900">
            {pricing ? pricing.averageNightly : listing.pricePerNight} €
          </span>
          <span className="text-slate-400 text-sm font-semibold"> / nuit</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-500/10 px-2.5 py-1 rounded-lg">
          <span>★</span>
          <span>{listing.rating.toFixed(1)}</span>
          <span className="text-slate-400 font-normal">({listing.reviewCount})</span>
        </div>
      </div>

      <form onSubmit={handleBooking} className="flex flex-col gap-4">
        {/* Date Inputs */}
        <div className="grid grid-cols-2 gap-2 border border-slate-200 rounded-xl p-2 bg-slate-50/50">
          <DatePicker
            label="Arrivée"
            value={checkIn}
            minDate={today}
            placeholder="Sélectionner"
            onChange={(date) => {
              setCheckIn(date);
              setSearchFilters({ checkIn: date });
              if (date && checkOut && date >= checkOut) {
                setCheckOut(null);
                setSearchFilters({ checkOut: null });
              }
            }}
            className="border-0 p-1"
          />
          <div className="border-l border-slate-200 pl-2">
            <DatePicker
              label="Départ"
              value={checkOut}
              minDate={checkIn || today}
              placeholder="Sélectionner"
              onChange={(date) => {
                setCheckOut(date);
                setSearchFilters({ checkOut: date });
              }}
              className="border-0 p-1"
            />
          </div>
        </div>

        {/* Guest Selector */}
        <div className="relative">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 px-1">
            Voyageurs
          </label>
          <button
            type="button"
            onClick={() => setShowGuestSelector(!showGuestSelector)}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 text-left focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all flex items-center justify-between font-semibold"
          >
            <span>
              {guests} voyageur{guests > 1 ? 's' : ''}
            </span>
            <svg
              className={`w-4 h-4 text-slate-400 transition-transform ${showGuestSelector ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {showGuestSelector && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-20 animate-scale-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-800 block">Capacité max.</span>
                  <span className="text-xs text-slate-500 block">Max. {listing.capacity} voyageurs</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const val = Math.max(1, guests - 1);
                      setGuests(val);
                      setSearchFilters({ guests: val });
                    }}
                    disabled={guests <= 1}
                    className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-600 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-slate-800 w-6 text-center">
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const val = Math.min(listing.capacity, guests + 1);
                      setGuests(val);
                      setSearchFilters({ guests: val });
                    }}
                    disabled={guests >= listing.capacity}
                    className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-600 disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pricing breakdown */}
        {pricing ? (
          <div className="flex flex-col gap-3.5 my-4 border-t border-slate-100 pt-4 animate-fade-in text-sm text-slate-600">
            <div className="flex justify-between font-medium">
              <span>
                {pricing.averageNightly} € x {pricing.nights} nuits
              </span>
              <span className="font-bold text-slate-800">{pricing.totalBase} €</span>
            </div>
            
            <div className="flex justify-between font-medium">
              <span className="flex items-center gap-1">
                Frais de ménage
                {listing.features.cleaningIncluded && (
                  <span className="badge bg-emerald-50 text-emerald-700 text-[9px] py-0.5 px-1.5 uppercase font-bold">Inclus</span>
                )}
              </span>
              <span className="font-bold text-slate-800">
                {pricing.cleaningFee === 0 ? '0' : pricing.cleaningFee} €
              </span>
            </div>

            <div className="flex justify-between font-medium" title="12% frais de service pour assistance & garantie">
              <span>Frais de service Location Vacances</span>
              <span className="font-bold text-slate-800">{pricing.serviceFee} €</span>
            </div>

            <div className="flex justify-between font-medium" title="Calculé à 2,20 € / pers / nuit">
              <span>Taxe de séjour</span>
              <span className="font-bold text-slate-800">{pricing.touristTax} €</span>
            </div>

            <div className="flex justify-between font-medium text-xs text-slate-400 border-b border-slate-150 pb-3">
              <span>Caution remboursable (empreinte CB)</span>
              <span>{pricing.deposit} €</span>
            </div>

            <div className="flex justify-between text-base font-black text-slate-900 pt-1">
              <span>Total séjour</span>
              <span className="text-xl text-sunset-500">{pricing.totalPrice} €</span>
            </div>

            <span className="text-[10px] text-slate-400 text-center block mt-1">
              Aucun débit avant votre confirmation de paiement.
            </span>
          </div>
        ) : (
          <div className="text-center py-4 text-xs text-slate-400 border-t border-slate-100 mt-2 font-medium">
            Entrez vos dates pour simuler le prix exact du séjour.
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="btn-primary w-full h-[52px] font-bold text-base tracking-wide flex items-center justify-center gap-2 mt-2"
        >
          <span>⚡</span>
          <span>Réserver immédiatement</span>
        </button>
      </form>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        <span>🔒 Paiement 100% sécurisé</span>
        <span>•</span>
        <span>🇫🇷 Service client FR</span>
      </div>
    </div>
  );
}
