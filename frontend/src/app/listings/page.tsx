'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { searchListings, totalListingCount } from '@/data/mock-listings';
import FilterPanel from '@/components/ui/FilterPanel';
import ListingCard from '@/components/ui/ListingCard';
import { SortOption, SortOptionLabels, ListingType } from '@/types';

function ListingsPageContent() {
  const searchParams = useSearchParams();
  const { searchFilters, setSearchFilters } = useAppStore();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMapView, setShowMapView] = useState(false);

  // On mount, sync search parameters to Zustand store
  useEffect(() => {
    const destination = searchParams.get('destination') || '';
    const checkIn = searchParams.get('checkIn') || null;
    const checkOut = searchParams.get('checkOut') || null;
    const guests = searchParams.get('guests') ? Number(searchParams.get('guests')) : 2;
    const typeQuery = searchParams.get('types');
    const types: ListingType[] = typeQuery ? (typeQuery.split(',') as ListingType[]) : [];

    setSearchFilters({
      destination,
      checkIn,
      checkOut,
      guests,
      types,
    });
  }, [searchParams]);

  // Run the filtering logic
  const filteredListings = searchListings(searchFilters);

  // Sorting handler
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({ sortBy: e.target.value as SortOption });
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Results Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/60">
          <div>
            <nav className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-wide">
              <span>Location Vacances</span>
              <span className="mx-2">&gt;</span>
              <span className="text-slate-500">Locations</span>
              {searchFilters.destination && (
                <>
                  <span className="mx-2">&gt;</span>
                  <span className="text-sunset-500">{searchFilters.destination}</span>
                </>
              )}
            </nav>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight">
              {searchFilters.destination ? (
                <>Locations de vacances à <span className="text-sunset-500">{searchFilters.destination}</span></>
              ) : (
                'Toutes nos locations de vacances'
              )}
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 font-semibold">
              {filteredListings.length} location{filteredListings.length > 1 ? 's trouvées' : ' trouvée'} sur un total de {totalListingCount.toLocaleString()} annonces vérifiées
            </p>
          </div>

          {/* Controls: Sorting / Map toggle / Mobile filter toggle */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Sorting */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600">
              <span>Trier par</span>
              <select
                value={searchFilters.sortBy}
                onChange={handleSortChange}
                className="bg-transparent border-0 font-bold text-slate-800 focus:ring-0 focus:outline-none cursor-pointer"
              >
                {Object.entries(SortOptionLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Map toggle */}
            <button
              onClick={() => setShowMapView(!showMapView)}
              className={`flex items-center gap-2 border px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                showMapView
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-350'
              }`}
            >
              <span>🗺️</span>
              <span>{showMapView ? 'Liste seule' : 'Afficher la carte'}</span>
            </button>

            {/* Mobile Filters Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-2 bg-sunset-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-sunset-600"
            >
              <span>⚙️</span>
              <span>Filtres</span>
            </button>
          </div>
        </div>

        {/* Main Content: Filters + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (Left, 3 cols) */}
          <div className="hidden md:block lg:col-span-3 sticky top-24 max-h-[85vh] overflow-y-auto pr-1">
            <FilterPanel />
          </div>

          {/* Listings List (Right, 9 cols or divided with Map) */}
          <div className={`${showMapView ? 'lg:col-span-6' : 'lg:col-span-9'} flex flex-col gap-8`}>
            {filteredListings.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center gap-4">
                <span className="text-5xl">🏖️</span>
                <h3 className="text-lg font-bold text-slate-800">Aucun résultat ne correspond à vos critères</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Essayez d'élargir votre recherche en retirant certains filtres ou en modifiant votre destination.
                </p>
                <button
                  onClick={() => setSearchFilters({
                    types: [], pools: [], minBedrooms: 0, minBathrooms: 0, minPrice: 0, maxPrice: 5000, minSurface: 0,
                    freeCancellation: false, cleaningIncluded: false, wifi: false, airConditioning: false, petFriendly: false, seaView: false, nearBeach: false, accessible: false
                  })}
                  className="btn-primary py-2 px-6 text-sm"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${showMapView ? 'xl:grid-cols-2' : 'xl:grid-cols-3'} gap-6`}>
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}

            {/* Pagination Mockup */}
            {filteredListings.length > 0 && (
              <div className="flex items-center justify-between border-t border-slate-200/80 pt-6 mt-4">
                <span className="text-xs text-slate-500 font-semibold">
                  Affichage de {filteredListings.length} location(s)
                </span>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold bg-white text-slate-400 cursor-not-allowed">
                    Précédent
                  </button>
                  <button className="w-8 h-8 rounded-xl bg-sunset-500 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </button>
                  <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold bg-white text-slate-700 hover:border-slate-350">
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Prototype Map View (Sticky Right Panel, 3 cols) */}
          {showMapView && (
            <div className="lg:col-span-3 sticky top-24 h-[75vh] bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="bg-white border-b border-slate-200 p-4 text-xs font-bold text-slate-800 flex items-center justify-between shrink-0">
                <span>📍 Carte des Locations</span>
                <span className="text-emerald-600">En direct</span>
              </div>
              <div className="flex-1 relative bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center">
                {/* Simulated markers */}
                {filteredListings.slice(0, 4).map((listing, idx) => {
                  // Position markers around center
                  const offsets = [
                    { top: '25%', left: '30%' },
                    { top: '45%', left: '55%' },
                    { top: '65%', left: '35%' },
                    { top: '35%', left: '70%' },
                  ];
                  const pos = offsets[idx % offsets.length];
                  return (
                    <div
                      key={listing.id}
                      className="absolute p-1.5 rounded-lg bg-slate-900 text-white text-[10px] font-black border border-white/20 shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-sunset-500 hover:scale-110 transition-all"
                      style={{ top: pos.top, left: pos.left }}
                      title={listing.title}
                    >
                      {listing.pricePerNight} €
                    </div>
                  );
                })}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-slate-200 text-[10px] text-slate-500 font-bold leading-normal">
                  💡 Zoom interactif et Mapbox API désactivés pour la démonstration.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Slide-over for Filters */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end md:hidden animate-fade-in">
          <div className="bg-white w-full max-w-sm h-full overflow-y-auto p-6 relative flex flex-col gap-4 animate-slide-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-lg text-slate-800">Filtres de recherche</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-slate-500 text-sm font-bold border border-slate-200 p-2 rounded-lg"
              >
                Fermer
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16 flex items-center justify-center">
        <span className="w-8 h-8 rounded-full border-2 border-sunset-500 border-t-transparent animate-spin block" />
      </div>
    }>
      <ListingsPageContent />
    </Suspense>
  );
}
