'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { getListingById, getReviewsForListing, getSimilarListings } from '@/data/mock-listings';
import { countryFlags } from '@/data/mock-destinations';
import PhotoGallery from '@/components/ui/PhotoGallery';
import AmenityList from '@/components/ui/AmenityList';
import ReviewSection from '@/components/ui/ReviewSection';
import BookingWidget from '@/components/ui/BookingWidget';
import ListingCard from '@/components/ui/ListingCard';
import { ListingTypeLabels } from '@/types';

export default function ListingDetailsPage() {
  const { id } = useParams() as { id: string };

  const listing = getListingById(id);
  
  if (!listing) {
    return notFound();
  }

  const reviews = getReviewsForListing(listing.id);
  const similarListings = getSimilarListings(listing, 4);
  const flag = countryFlags[listing.location.countryCode] || '📍';

  // Mock Calendar Availability Grid
  const generateMockCalendar = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    // Block some arbitrary days to simulate busy schedules
    const blockedDays = [4, 5, 12, 13, 14, 20, 21, 27, 28];
    return { days, blockedDays };
  };

  const { days, blockedDays } = generateMockCalendar();

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-slate-400 font-bold mb-4 uppercase tracking-wide">
          <Link href="/" className="hover:text-slate-600">Location Vacances</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/listings" className="hover:text-slate-600">Locations</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-slate-500 truncate max-w-[200px] inline-block align-bottom">
            {listing.title}
          </span>
        </nav>

        {/* Gallery */}
        <div className="mb-8">
          <PhotoGallery photos={listing.photos} title={listing.title} />
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Header info */}
            <div className="flex flex-col gap-3 pb-6 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <span className="badge bg-slate-900 text-white capitalize text-xs">
                  {ListingTypeLabels[listing.type]}
                </span>
                {listing.features.freeCancellation && (
                  <span className="badge-green text-xs">Annulation Gratuite J-60</span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-slate-950 tracking-tight leading-tight">
                {listing.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span>{flag}</span>
                  <span>{listing.location.city}, {listing.location.region}, {listing.location.country}</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <span>🏢 Agency:</span>
                  <span className="text-slate-700">{listing.agencyName}</span>
                </span>
              </div>
            </div>

            {/* Capacities indicators grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
              <div className="flex flex-col gap-1">
                <span className="text-2xl">👥</span>
                <span className="text-sm font-black text-slate-800">{listing.capacity} Voyageurs</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Capacité max</span>
              </div>
              <div className="flex flex-col gap-1 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0">
                <span className="text-2xl">🛏️</span>
                <span className="text-sm font-black text-slate-800">{listing.bedrooms} Chambres</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Lits doubles/simples</span>
              </div>
              <div className="flex flex-col gap-1 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0">
                <span className="text-2xl">🛁</span>
                <span className="text-sm font-black text-slate-800">{listing.bathrooms} Salles de bain</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Douche & Baignoire</span>
              </div>
              <div className="flex flex-col gap-1 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0">
                <span className="text-2xl">📐</span>
                <span className="text-sm font-black text-slate-800">{listing.surfaceArea} m²</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Surface habitable</span>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-100 pb-2">Description du bien</h2>
              <p className="text-slate-650 leading-relaxed text-sm whitespace-pre-line font-medium">
                {listing.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-100 pb-2">Équipements inclus</h2>
              <AmenityList amenities={listing.amenities} />
            </div>

            {/* Availability Calendar */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-100 pb-2">Disponibilités</h2>
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm font-bold text-slate-800">
                  <span>📅 Juillet 2026</span>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-250 block" /> Disponible
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-rose-100 border border-rose-250 block" /> Occupé / Réservé
                    </span>
                  </div>
                </div>
                {/* Mock grid */}
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-600 mt-2">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
                    <div key={d} className="font-bold text-slate-400 py-1">{d}</div>
                  ))}
                  {/* Empty slots for start of month alignment */}
                  <div className="py-2.5 opacity-20">30</div>
                  {days.map((day) => {
                    const isBlocked = blockedDays.includes(day);
                    return (
                      <div
                        key={day}
                        className={`py-2.5 rounded-xl border font-bold transition-all ${
                          isBlocked
                            ? 'bg-rose-50 text-rose-500 border-rose-150 line-through cursor-not-allowed'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-150 hover:bg-emerald-100 cursor-pointer'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                  💡 Durée minimale de séjour : {listing.minStay} nuits en haute saison.
                </p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="flex flex-col gap-4">
              <ReviewSection reviews={reviews} rating={listing.rating} />
            </div>

          </div>

          {/* Right Column (4 cols) - Sticky Booking Widget */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <BookingWidget listing={listing} />

            {/* Managed by info card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-lg flex flex-col gap-4">
              <h3 className="font-sans text-sm font-bold text-slate-900 uppercase tracking-wider">
                Contacter l'Agence
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-lg uppercase shadow-sm">
                  {listing.agencyName.slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{listing.agencyName}</h4>
                  <p className="text-[11px] text-emerald-600 font-bold">🏢 Agence vérifiée professionnelle</p>
                </div>
              </div>
              <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                Cette annonce est gérée par une agence immobilière agréée. Contrat de bail conforme et accueil sur place inclus.
              </p>
              <a
                href="tel:+33180400000"
                className="btn-outline w-full py-2.5 text-xs font-bold text-center flex items-center justify-center gap-2"
              >
                <span>📞</span>
                <span>01 80 40 00 00 (Service gratuit)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Similar Listings Section */}
        {similarListings.length > 0 && (
          <div className="mt-20 border-t border-slate-200/80 pt-16">
            <h2 className="section-title mb-2">Locations Similaires</h2>
            <p className="section-subtitle mb-8">Découvrez d'autres propriétés d'exception dans la même région.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarListings.map((sim) => (
                <ListingCard key={sim.id} listing={sim} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
