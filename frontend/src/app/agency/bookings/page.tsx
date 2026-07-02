'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Booking } from '@/types';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function AgencyBookingsPage() {
  const { bookings: storeBookings, cancelBooking } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [localBookings, setLocalBookings] = useState<Booking[]>([]);

  // Default initial bookings if none exist in store, to keep the UI rich
  useEffect(() => {
    setMounted(true);
    
    const initialMockBookings: Booking[] = [
      {
        id: 'bkg-100293',
        listingId: 'lst-001',
        listing: {
          id: 'lst-001',
          title: 'Villa Azur avec Piscine à Débordement',
          pricePerNight: 450,
          location: { city: 'Saint-Tropez', country: 'France' }
        } as any,
        userId: 'user-02',
        checkIn: '2026-07-12',
        checkOut: '2026-07-19',
        guests: 6,
        nightCount: 7,
        basePrice: 3150,
        cleaningFee: 80,
        serviceFee: 378,
        touristTax: 92,
        deposit: 500,
        totalPrice: 3700,
        status: 'confirmée' as any,
        guestName: 'Michel Laurent',
        guestEmail: 'michel.l@example.com',
        guestPhone: '06 99 88 77 66',
        createdAt: '2026-06-15T12:00:00Z',
      },
      {
        id: 'bkg-339201',
        listingId: 'lst-001',
        listing: {
          id: 'lst-001',
          title: 'Villa Azur avec Piscine à Débordement',
          pricePerNight: 450,
          location: { city: 'Saint-Tropez', country: 'France' }
        } as any,
        userId: 'user-03',
        checkIn: '2026-08-01',
        checkOut: '2026-08-08',
        guests: 8,
        nightCount: 7,
        basePrice: 3850,
        cleaningFee: 80,
        serviceFee: 462,
        touristTax: 123,
        deposit: 500,
        totalPrice: 4515,
        status: 'en-attente' as any,
        guestName: 'Sophie Martinez',
        guestEmail: 'sophie.m@example.com',
        guestPhone: '07 12 45 78 89',
        createdAt: '2026-06-20T10:30:00Z',
      }
    ];

    // Merge store bookings that belong to agency 'lst-001' or are made on the fly
    const merged = [...storeBookings, ...initialMockBookings];
    // Filter duplicates
    const uniqueBookings = merged.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
    setLocalBookings(uniqueBookings);
  }, [storeBookings]);

  const handleCancel = (bookingId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      cancelBooking(bookingId);
      setLocalBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'annulée' as any } : b));
    }
  };

  const handleApprove = (bookingId: string) => {
    setLocalBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'confirmée' as any } : b));
    alert('La réservation a été confirmée avec succès ! Un e-mail a été envoyé au voyageur.');
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'dd MMM yyyy', { locale: fr });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Title */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight leading-snug">
          Gestion des Réservations
        </h1>
        <p className="text-xs text-slate-500 font-semibold mt-0.5">
          Suivez les demandes d'hébergement, validez les dossiers et gérez les annulations voyageurs.
        </p>
      </div>

      {/* Bookings Table */}
      {mounted && (
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold text-slate-600 border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-450 uppercase text-[10px] tracking-wider font-bold">
                  <th className="p-4">Réf / Date</th>
                  <th className="p-4">Hébergement</th>
                  <th className="p-4">Voyageur</th>
                  <th className="p-4">Dates de séjour</th>
                  <th className="p-4">Total</th>
                  <th className="p-4 text-center">Statut</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {localBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      Aucune réservation enregistrée.
                    </td>
                  </tr>
                ) : (
                  localBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4 flex flex-col gap-0.5">
                        <span className="text-slate-800 font-bold">{b.id}</span>
                        <span className="text-[10px] text-slate-400">Demandé le {formatDate(b.createdAt.slice(0, 10))}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-slate-700 block max-w-[180px] truncate font-bold">
                          {b.listing?.title || 'Villa Azur avec Piscine'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{b.listing?.location.city}</span>
                      </td>
                      <td className="p-4 flex flex-col gap-0.5">
                        <span className="text-slate-800 font-bold">{b.guestName}</span>
                        <span className="text-[10px] text-slate-400">{b.guestPhone}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-slate-700 block font-bold">
                          du {formatDate(b.checkIn)} au {formatDate(b.checkOut)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          {b.nightCount} nuits • {b.guests} pers.
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-black text-slate-900">{b.totalPrice} €</span>
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`badge text-[9px] py-0.5 px-2 font-black uppercase ${
                            b.status === 'confirmée'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : b.status === 'en-attente'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-1.5 items-center">
                          {b.status === 'en-attente' && (
                            <button
                              onClick={() => handleApprove(b.id)}
                              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 rounded-lg text-[10px] font-bold"
                            >
                              Confirmer
                            </button>
                          )}
                          {b.status !== 'annulée' && (
                            <button
                              onClick={() => handleCancel(b.id)}
                              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-[10px] font-bold"
                            >
                              Annuler
                            </button>
                          )}
                          {b.status === 'annulée' && (
                            <span className="text-[10px] text-slate-400 font-bold italic pr-2">Archivée</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
