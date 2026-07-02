'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { mockListings as initialListings } from '@/data/mock-listings';
import { Listing, ListingType, ListingStatus, PoolType } from '@/types';

export default function AgencyPropertiesPage() {
  const [properties, setProperties] = useState<Listing[]>(
    initialListings.filter((l) => l.agencyId === 'agency-001' || l.agencyId === 'new-agency')
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ListingType>(ListingType.VILLA);
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [price, setPrice] = useState(150);
  const [capacity, setCapacity] = useState(4);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [surface, setSurface] = useState(80);
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80');

  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus =
            p.status === ListingStatus.ACTIVE
              ? ListingStatus.INACTIVE
              : ListingStatus.ACTIVE;
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !city || !region) return;

    const newProperty: Listing = {
      id: `lst-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type,
      description,
      shortDescription: description.slice(0, 100),
      location: {
        city,
        region,
        country: 'France',
        countryCode: 'FR',
        lat: 43.5,
        lng: 6.5,
      },
      capacity,
      bedrooms,
      bathrooms,
      surfaceArea: surface,
      pricePerNight: price,
      photos: [photoUrl],
      thumbnail: photoUrl,
      amenities: ['Wi-Fi', 'Climatisation', 'Cuisine équipée'],
      features: {
        pool: PoolType.PRIVATE,
        airConditioning: true,
        wifi: true,
        petFriendly: true,
        cleaningIncluded: true,
        freeCancellation: true,
        seaView: false,
        nearBeach: false,
        parking: true,
        dishwasher: true,
        bbq: true,
        accessible: true,
        garden: true,
        terrace: true,
        washingMachine: true,
      },
      rating: 5.0,
      reviewCount: 0,
      agencyId: 'new-agency',
      agencyName: 'Azur Premium Immobilier',
      status: ListingStatus.ACTIVE,
      minStay: 3,
      seasonalPricing: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProperties([newProperty, ...properties]);
    setIsModalOpen(false);

    // Reset Form
    setTitle('');
    setDescription('');
    setCity('');
    setRegion('');
    setPrice(150);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight leading-snug">
            Gestion de mes Biens
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Vous gérez actuellement {properties.length} location(s) de vacances.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary text-xs font-bold py-2.5 px-5 shrink-0"
        >
          ＋ Ajouter une location
        </button>
      </div>

      {/* Control bar */}
      <div className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
        <input
          type="text"
          placeholder="Rechercher par titre ou ville..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field max-w-sm flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold"
        />
      </div>

      {/* Grid of properties */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((prop) => (
          <div
            key={prop.id}
            className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex flex-col h-full group"
          >
            {/* Header cover image */}
            <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden shrink-0">
              <Image
                src={prop.thumbnail || prop.photos[0]}
                alt={prop.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 badge bg-slate-900/80 text-white font-bold text-[10px] uppercase">
                {prop.type}
              </span>
              <span
                className={`absolute top-3 right-3 badge text-[10px] py-0.5 px-2 font-black uppercase ${
                  prop.status === ListingStatus.ACTIVE
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {prop.status === ListingStatus.ACTIVE ? 'Actif' : 'Inactif'}
              </span>
            </div>

            {/* Details body */}
            <div className="p-4 flex flex-col flex-1 gap-2">
              <span className="text-[10px] text-slate-400 font-bold block">
                📍 {prop.location.city}, {prop.location.region}
              </span>
              <h3 className="font-sans text-sm font-bold text-slate-800 leading-snug line-clamp-2 h-10">
                {prop.title}
              </h3>
              <div className="flex justify-between items-center text-xs text-slate-500 font-medium py-1.5 border-y border-slate-50 my-1">
                <span>👥 {prop.capacity} pers.</span>
                <span>🛏️ {prop.bedrooms} ch.</span>
                <span>📐 {prop.surfaceArea} m²</span>
              </div>

              {/* Price row */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 shrink-0">
                <div>
                  <span className="text-[10px] block text-slate-400 font-bold">Prix de base</span>
                  <span className="text-sm font-black text-slate-900">{prop.pricePerNight} € / nuit</span>
                </div>
                <button
                  onClick={() => handleToggleStatus(prop.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                    prop.status === ListingStatus.ACTIVE
                      ? 'bg-rose-50 text-rose-600 border-rose-150 hover:bg-rose-100'
                      : 'bg-emerald-50 text-emerald-600 border-emerald-150 hover:bg-emerald-100'
                  }`}
                >
                  {prop.status === ListingStatus.ACTIVE ? 'Désactiver' : 'Activer'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ajouter un bien Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 flex flex-col gap-6 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-sans text-slate-900">Ajouter une nouvelle location</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold border border-slate-200 p-2 rounded-xl text-xs"
              >
                Fermer
              </button>
            </div>

            <form onSubmit={handleAddProperty} className="flex flex-col gap-5 text-xs font-semibold text-slate-700">
              
              {/* Row 1: Title */}
              <div className="flex flex-col gap-1.5">
                <label className="uppercase tracking-wide text-slate-500">Titre de l'annonce</label>
                <input
                  type="text"
                  required
                  placeholder="ex. Villa Les Pins avec vue dégagée"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field w-full border border-slate-250 rounded-xl px-4 py-2.5 text-xs"
                />
              </div>

              {/* Row 2: Type & price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase tracking-wide text-slate-500">Type de bien</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ListingType)}
                    className="input-field w-full border border-slate-250 rounded-xl px-4 py-2 text-xs"
                  >
                    {Object.values(ListingType).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase tracking-wide text-slate-500">Prix de base (€ / nuit)</label>
                  <input
                    type="number"
                    required
                    min={10}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="input-field w-full border border-slate-250 rounded-xl px-4 py-2.5 text-xs"
                  />
                </div>
              </div>

              {/* Row 3: City & Region */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase tracking-wide text-slate-500">Ville</label>
                  <input
                    type="text"
                    required
                    placeholder="ex. Cannes"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-field w-full border border-slate-250 rounded-xl px-4 py-2.5 text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase tracking-wide text-slate-500">Région</label>
                  <input
                    type="text"
                    required
                    placeholder="ex. Côte d'Azur"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="input-field w-full border border-slate-250 rounded-xl px-4 py-2.5 text-xs"
                  />
                </div>
              </div>

              {/* Row 4: Capacities */}
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase tracking-wide text-slate-500">Capacité (pers)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="input-field w-full border border-slate-250 rounded-xl px-4 py-2.5 text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase tracking-wide text-slate-500">Chambres</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="input-field w-full border border-slate-250 rounded-xl px-4 py-2.5 text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase tracking-wide text-slate-500">Salles de bain</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="input-field w-full border border-slate-250 rounded-xl px-4 py-2.5 text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase tracking-wide text-slate-500">Surface (m²)</label>
                  <input
                    type="number"
                    required
                    min={5}
                    value={surface}
                    onChange={(e) => setSurface(Number(e.target.value))}
                    className="input-field w-full border border-slate-250 rounded-xl px-4 py-2.5 text-xs"
                  />
                </div>
              </div>

              {/* Row 5: Photo URL */}
              <div className="flex flex-col gap-1.5">
                <label className="uppercase tracking-wide text-slate-500">URL de l'image de couverture</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input-field w-full border border-slate-250 rounded-xl px-4 py-2.5 text-xs"
                />
              </div>

              {/* Row 6: Description */}
              <div className="flex flex-col gap-1.5">
                <label className="uppercase tracking-wide text-slate-500">Description détaillée</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Décrivez les atouts majeurs de l'hébergement..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field w-full border border-slate-250 rounded-xl px-4 py-2 text-xs resize-none"
                />
              </div>

              {/* Submit trigger */}
              <button
                type="submit"
                className="btn-primary w-full py-3 text-sm font-bold tracking-wider uppercase mt-2"
              >
                💾 Publier la location
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
