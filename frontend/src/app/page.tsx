'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/ui/SearchBar';
import TrustBanner from '@/components/ui/TrustBanner';
import ListingCard from '@/components/ui/ListingCard';
import { getPopularDestinations } from '@/data/mock-destinations';
import { mockListings } from '@/data/mock-listings';
import { ListingType } from '@/types';

export default function HomePage() {
  const popularDestinations = getPopularDestinations().slice(0, 6);
  // Show 4 featured listings on the home page
  const featuredListings = mockListings.slice(0, 4);

  const categories = [
    { type: ListingType.VILLA, label: 'Villas d\'exception', icon: '🏰', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80', count: '14 200+' },
    { type: ListingType.HOUSE, label: 'Maisons & Mas', icon: '🏡', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a8?auto=format&fit=crop&w=400&q=80', count: '48 900+' },
    { type: ListingType.APARTMENT, label: 'Appartements', icon: '🏢', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80', count: '65 100+' },
    { type: ListingType.GITE, label: 'Gîtes & Charme', icon: '🌳', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80', count: '18 450+' },
    { type: ListingType.MOBILHOME, label: 'Mobil-homes', icon: '🚐', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80', count: '6 090+' },
  ];

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center bg-slate-900 pt-28 pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')]" />
        
        {/* Hero Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-950/40 to-[#FAFAF8]" />

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col gap-6 md:gap-8 max-w-5xl mt-5">
          <div className="flex flex-col gap-4 animate-fade-in">
            <span className="text-amber-300 font-black tracking-widest text-xs md:text-sm uppercase block">
              ✨ Marketplace de Confiance
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-display font-black leading-tight drop-shadow-md">
              Trouvez le soleil de vos vacances
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-100 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow">
              Réservez en toute sécurité parmi plus de 152 749 hébergements de qualité, 100% gérés par des agences professionnelles.
            </p>
          </div>

          {/* Search bar wrapper */}
          <div className="w-full mt-4 md:mt-6 animate-slide-up">
            <SearchBar />
          </div>

          {/* Counter info */}
          <div className="flex items-center justify-center gap-6 text-white text-xs sm:text-sm font-bold uppercase tracking-wider mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sunset-500 font-black text-base sm:text-lg">152 749</span>
              <span className="opacity-80">Locations pro</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="flex items-center gap-2">
              <span className="text-ocean-400 font-black text-base sm:text-lg">12</span>
              <span className="opacity-80">Pays Soleil</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-black text-base sm:text-lg">100%</span>
              <span className="opacity-80">Garanties Pro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <TrustBanner />

      {/* Popular destinations */}
      <section className="container mx-auto px-4 md:px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-sunset-500 font-black text-xs uppercase tracking-widest block mb-2">Inspirations</span>
            <h2 className="section-title">Destinations Populaires</h2>
            <p className="section-subtitle">Découvrez nos plus belles adresses pour des vacances sous le soleil.</p>
          </div>
          <Link href="/destinations" className="btn-outline px-6 py-2.5 text-sm font-bold shrink-0">
            Voir toutes les destinations
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/listings?destination=${encodeURIComponent(dest.name)}`}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-100"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-5 left-5 right-5 text-white flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-sunset-400">{dest.country}</span>
                <h3 className="text-xl font-bold font-sans tracking-tight">{dest.name}</h3>
                <div className="flex justify-between items-center mt-2 border-t border-white/10 pt-2 text-xs opacity-90">
                  <span>{dest.listingCount.toLocaleString()} locations</span>
                  <span className="font-bold">Moyenne dès {dest.averagePrice}€/nuit</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Property types */}
      <section className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sunset-500 font-black text-xs uppercase tracking-widest block mb-2">Types de biens</span>
            <h2 className="section-title">Selon vos envies</h2>
            <p className="section-subtitle mx-auto">
              Mas provençal traditionnel, villa contemporaine vue mer ou appartement citadin de charme.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.type}
                href={`/listings?types=${cat.type}`}
                className="group flex flex-col gap-3 p-4 bg-white rounded-3xl border border-slate-100 hover:border-sunset-200 shadow-sm hover:shadow-md transition-all duration-300 text-center hover:-translate-y-1"
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 mb-2">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center text-sm shadow">
                    {cat.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold font-sans text-sm text-slate-800 tracking-tight">{cat.label}</h3>
                  <span className="text-xs text-slate-400 font-bold block mt-0.5">{cat.count} locations</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="container mx-auto px-4 md:px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-sunset-500 font-black text-xs uppercase tracking-widest block mb-2">Sélection</span>
            <h2 className="section-title">Annonces Vedettes</h2>
            <p className="section-subtitle">Locations haut de gamme sélectionnées par nos agences partenaires.</p>
          </div>
          <Link href="/listings" className="btn-secondary px-6 py-2.5 text-sm font-bold shrink-0">
            Explorer les annonces
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-sunset-500 font-black text-xs uppercase tracking-widest block mb-2">Engagements</span>
              <h2 className="text-3xl md:text-4xl font-bold font-sans text-white leading-tight">
                La garantie de vacances sereines et fiables
              </h2>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Contrairement aux plateformes d'annonces de particuliers, Location Vacances travaille exclusivement avec des agences immobilières professionnelles. Cela vous garantit un hébergement conforme, une logistique maîtrisée et un interlocuteur local en cas de besoin.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-1">🤝</span>
                <div>
                  <h4 className="font-bold text-base text-white">Zéro fausse annonce</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Chaque agence est auditée, chaque contrat de location est juridiquement vérifié.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-1">📞</span>
                <div>
                  <h4 className="font-bold text-base text-white">Service Client disponible 7j/7</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Notre équipe basée en France vous assiste avant, pendant et après votre séjour.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-1">💶</span>
                <div>
                  <h4 className="font-bold text-base text-white">Garantie Financière des Fonds</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Vos acomptes sont sécurisés sur des comptes séquestres certifiés.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-800">
            <Image
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
              alt="Vacances en famille au bord de la piscine"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
