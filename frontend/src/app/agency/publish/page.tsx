'use client';

import React, { useState } from 'react';
import { ListingType, ListingStatus } from '@/types';

interface PublishFormData {
  title: string;
  type: ListingType;
  description: string;
  shortDescription: string;
  city: string;
  region: string;
  country: string;
  address: string;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  surfaceArea: number;
  pricePerNight: number;
  minStay: number;
  photos: string[];
  amenities: string[];
  pool: boolean;
  airConditioning: boolean;
  wifi: boolean;
  petFriendly: boolean;
  parking: boolean;
  terrasse: boolean;
  bbq: boolean;
  jardin: boolean;
  seaView: boolean;
  nearBeach: boolean;
  freeCancellation: boolean;
  status: ListingStatus;
}

const defaultForm: PublishFormData = {
  title: '',
  type: ListingType.VILLA,
  description: '',
  shortDescription: '',
  city: '',
  region: '',
  country: 'France',
  address: '',
  capacity: 4,
  bedrooms: 2,
  bathrooms: 1,
  surfaceArea: 80,
  pricePerNight: 150,
  minStay: 7,
  photos: [],
  amenities: [],
  pool: false,
  airConditioning: false,
  wifi: true,
  petFriendly: false,
  parking: false,
  terrasse: false,
  bbq: false,
  jardin: false,
  seaView: false,
  nearBeach: false,
  freeCancellation: true,
  status: ListingStatus.DRAFT,
};

const AMENITY_OPTIONS = [
  { key: 'pool', label: 'Piscine', icon: '🏊' },
  { key: 'airConditioning', label: 'Climatisation', icon: '❄️' },
  { key: 'wifi', label: 'Wi-Fi haut débit', icon: '📶' },
  { key: 'petFriendly', label: 'Animaux acceptés', icon: '🐾' },
  { key: 'parking', label: 'Parking privé', icon: '🅿️' },
  { key: 'terrasse', label: 'Terrasse', icon: '🌅' },
  { key: 'bbq', label: 'Barbecue', icon: '🔥' },
  { key: 'jardin', label: 'Jardin', icon: '🌿' },
  { key: 'seaView', label: 'Vue mer', icon: '🌊' },
  { key: 'nearBeach', label: 'Proche plage', icon: '🏖️' },
  { key: 'freeCancellation', label: 'Annulation gratuite', icon: '✅' },
];

const STEPS = [
  { id: 1, label: 'Informations générales', icon: '📋' },
  { id: 2, label: 'Localisation', icon: '📍' },
  { id: 3, label: 'Capacité & Prix', icon: '💶' },
  { id: 4, label: 'Équipements', icon: '⚙️' },
  { id: 5, label: 'Photos', icon: '📸' },
  { id: 6, label: 'Récapitulatif', icon: '✅' },
];

export default function PublishPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<PublishFormData>(defaultForm);
  const [photoUrl, setPhotoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: keyof PublishFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (key: keyof PublishFormData) => {
    setForm((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const addPhoto = () => {
    if (photoUrl.trim() && !form.photos.includes(photoUrl.trim())) {
      setForm((prev) => ({ ...prev, photos: [...prev.photos, photoUrl.trim()] }));
      setPhotoUrl('');
    }
  };

  const removePhoto = (url: string) => {
    setForm((prev) => ({ ...prev, photos: prev.photos.filter((p) => p !== url) }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulation d'envoi (en production, appeler une vraie API)
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const canProceed = () => {
    if (step === 1) return form.title.trim() && form.description.trim() && form.shortDescription.trim();
    if (step === 2) return form.city.trim() && form.region.trim() && form.country.trim();
    if (step === 3) return form.pricePerNight > 0 && form.capacity > 0;
    return true;
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl animate-scale-in">
          ✅
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Annonce soumise avec succès !</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Votre annonce <strong>&quot;{form.title}&quot;</strong> a été enregistrée en tant que{' '}
            <span className={`font-bold ${form.status === ListingStatus.ACTIVE ? 'text-emerald-600' : 'text-amber-600'}`}>
              {form.status === ListingStatus.ACTIVE ? 'publication immédiate' : 'brouillon'}
            </span>
            . Elle sera visible sur le site après validation.
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => { setForm(defaultForm); setStep(1); setSubmitted(false); }}
            className="btn-primary"
          >
            ✏️ Nouvelle annonce
          </button>
          <a href="/agency/properties" className="btn-outline">
            📋 Voir mes annonces
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">✏️ Publier une nouvelle annonce</h1>
        <p className="text-slate-500 text-sm">Remplissez les informations pour mettre en ligne votre bien.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, idx) => (
          <React.Fragment key={s.id}>
            <button
              onClick={() => s.id < step && setStep(s.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                s.id === step
                  ? 'bg-sunset-500 text-white shadow-md'
                  : s.id < step
                  ? 'bg-emerald-100 text-emerald-700 cursor-pointer hover:bg-emerald-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{s.id < step ? '✓' : s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {idx < STEPS.length - 1 && (
              <div className={`h-0.5 w-4 shrink-0 mx-1 ${s.id < step ? 'bg-emerald-300' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">

        {/* STEP 1 – Informations générales */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-bold text-slate-800">📋 Informations générales</h2>

            <div>
              <label className="input-label">Titre de l&apos;annonce *</label>
              <input
                className="input-field"
                placeholder="Ex: Villa avec piscine vue mer à Saint-Tropez"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                maxLength={100}
              />
              <span className="text-xs text-slate-400 mt-1 block">{form.title.length}/100 caractères</span>
            </div>

            <div>
              <label className="input-label">Type de bien *</label>
              <select
                className="input-field"
                value={form.type}
                onChange={(e) => update('type', e.target.value as ListingType)}
              >
                {Object.entries(ListingType).map(([, val]) => (
                  <option key={val} value={val}>{val.charAt(0).toUpperCase() + val.slice(1)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="input-label">Description courte * <span className="text-slate-400 font-normal">(accroche)</span></label>
              <textarea
                className="input-field min-h-[80px] resize-none"
                placeholder="Une phrase d'accroche pour attirer les voyageurs (max 200 caractères)"
                value={form.shortDescription}
                onChange={(e) => update('shortDescription', e.target.value)}
                maxLength={200}
              />
              <span className="text-xs text-slate-400 mt-1 block">{form.shortDescription.length}/200 caractères</span>
            </div>

            <div>
              <label className="input-label">Description complète *</label>
              <textarea
                className="input-field min-h-[160px] resize-y"
                placeholder="Décrivez votre bien en détail : ambiance, environnement, points forts..."
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
              />
            </div>

            <div>
              <label className="input-label">Statut de publication</label>
              <div className="flex gap-3">
                {[
                  { val: ListingStatus.DRAFT, label: '📝 Brouillon', desc: 'Sauvegarder sans publier' },
                  { val: ListingStatus.ACTIVE, label: '🟢 Publier', desc: 'Visible immédiatement' },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => update('status', opt.val)}
                    className={`flex-1 p-3 rounded-xl border-2 text-left transition-all ${
                      form.status === opt.val
                        ? 'border-sunset-500 bg-sunset-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-sm font-bold text-slate-800 block">{opt.label}</span>
                    <span className="text-xs text-slate-500">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 – Localisation */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-bold text-slate-800">📍 Localisation</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Ville *</label>
                <input className="input-field" placeholder="Ex: Cannes" value={form.city} onChange={(e) => update('city', e.target.value)} />
              </div>
              <div>
                <label className="input-label">Région *</label>
                <input className="input-field" placeholder="Ex: Provence-Alpes-Côte d'Azur" value={form.region} onChange={(e) => update('region', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Pays *</label>
                <select className="input-field" value={form.country} onChange={(e) => update('country', e.target.value)}>
                  {['France', 'Espagne', 'Italie', 'Portugal', 'Grèce', 'Maroc', 'Tunisie', 'Croatie'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="input-label">Adresse <span className="text-slate-400 font-normal">(optionnel)</span></label>
                <input className="input-field" placeholder="Ex: 12 Avenue du Soleil" value={form.address} onChange={(e) => update('address', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 – Capacité & Prix */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-bold text-slate-800">💶 Capacité & Prix</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Voyageurs', key: 'capacity', icon: '👥', min: 1, max: 30 },
                { label: 'Chambres', key: 'bedrooms', icon: '🛏️', min: 0, max: 20 },
                { label: 'Salles de bain', key: 'bathrooms', icon: '🚿', min: 1, max: 10 },
                { label: 'Surface (m²)', key: 'surfaceArea', icon: '📐', min: 10, max: 2000 },
              ].map((f) => (
                <div key={f.key}>
                  <label className="input-label">{f.icon} {f.label}</label>
                  <input
                    type="number"
                    className="input-field"
                    min={f.min}
                    max={f.max}
                    value={form[f.key as keyof PublishFormData] as number}
                    onChange={(e) => update(f.key as keyof PublishFormData, Number(e.target.value))}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">💶 Prix par nuit (€) *</label>
                <input
                  type="number"
                  className="input-field"
                  min={10}
                  max={50000}
                  value={form.pricePerNight}
                  onChange={(e) => update('pricePerNight', Number(e.target.value))}
                />
                <span className="text-xs text-slate-400 mt-1 block">Prix en basse saison</span>
              </div>
              <div>
                <label className="input-label">📅 Séjour minimum (nuits)</label>
                <select className="input-field" value={form.minStay} onChange={(e) => update('minStay', Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6, 7, 10, 14, 21, 28].map((n) => (
                    <option key={n} value={n}>{n} nuit{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price preview */}
            <div className="p-4 bg-sunset-50 rounded-xl border border-sunset-100">
              <p className="text-xs font-bold text-sunset-700 mb-1">Aperçu du prix affiché</p>
              <p className="text-2xl font-black text-sunset-600">{form.pricePerNight} € <span className="text-sm font-medium text-slate-500">/ nuit</span></p>
              <p className="text-xs text-slate-500 mt-1">Séjour min. : {form.minStay} nuit{form.minStay > 1 ? 's' : ''} · {form.capacity} voyageurs max</p>
            </div>
          </div>
        )}

        {/* STEP 4 – Équipements */}
        {step === 4 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-bold text-slate-800">⚙️ Équipements & Services</h2>
            <p className="text-sm text-slate-500">Sélectionnez tous les équipements disponibles dans votre bien.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AMENITY_OPTIONS.map((amenity) => {
                const isChecked = form[amenity.key as keyof PublishFormData] as boolean;
                return (
                  <button
                    key={amenity.key}
                    type="button"
                    onClick={() => toggleAmenity(amenity.key as keyof PublishFormData)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left ${
                      isChecked
                        ? 'border-sunset-500 bg-sunset-50 text-sunset-800'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <span className="text-xl">{amenity.icon}</span>
                    <span className="text-xs font-semibold leading-tight">{amenity.label}</span>
                    {isChecked && <span className="ml-auto text-sunset-500 text-sm">✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500">
              💡 Les équipements sélectionnés apparaîtront dans votre annonce et aideront les voyageurs à vous trouver lors de leurs recherches.
            </div>
          </div>
        )}

        {/* STEP 5 – Photos */}
        {step === 5 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-bold text-slate-800">📸 Photos du bien</h2>
            <p className="text-sm text-slate-500">Ajoutez des URLs de photos de haute qualité (min. 1 photo recommandée). La première photo sera la photo principale.</p>

            {/* Add photo */}
            <div className="flex gap-2">
              <input
                className="input-field flex-1"
                placeholder="https://images.unsplash.com/..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPhoto())}
              />
              <button
                type="button"
                onClick={addPhoto}
                disabled={!photoUrl.trim()}
                className="btn-primary shrink-0 disabled:opacity-50"
              >
                + Ajouter
              </button>
            </div>

            {/* Photo grid */}
            {form.photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {form.photos.map((url, idx) => (
                  <div key={url} className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                    {idx === 0 && (
                      <span className="absolute top-2 left-2 bg-sunset-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Photo principale
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(url)}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center text-slate-400">
                <span className="text-4xl block mb-3">📷</span>
                <p className="text-sm font-medium">Aucune photo ajoutée</p>
                <p className="text-xs mt-1">Collez une URL d&apos;image ci-dessus</p>
              </div>
            )}

            <p className="text-xs text-slate-400">
              💡 Utilisez des images de qualité (ratio 4:3 recommandé, min. 1200px de large). Vous pouvez utiliser des URLs Unsplash gratuitement.
            </p>
          </div>
        )}

        {/* STEP 6 – Récapitulatif */}
        {step === 6 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-bold text-slate-800">✅ Récapitulatif de l&apos;annonce</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Summary card */}
              <div className="col-span-full p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span className="text-xs font-bold text-sunset-500 uppercase tracking-wider">{form.type}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">{form.title || '(Titre non renseigné)'}</h3>
                    <p className="text-sm text-slate-500 mt-1">{form.city}, {form.region} · {form.country}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-sunset-600">{form.pricePerNight} €</span>
                    <span className="text-sm text-slate-400 block">/ nuit</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Capacité</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-slate-500">Voyageurs</span><span className="font-bold text-slate-800">{form.capacity}</span>
                  <span className="text-slate-500">Chambres</span><span className="font-bold text-slate-800">{form.bedrooms}</span>
                  <span className="text-slate-500">SDB</span><span className="font-bold text-slate-800">{form.bathrooms}</span>
                  <span className="text-slate-500">Surface</span><span className="font-bold text-slate-800">{form.surfaceArea} m²</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Équipements sélectionnés</h4>
                <div className="flex flex-wrap gap-1.5">
                  {AMENITY_OPTIONS.filter((a) => form[a.key as keyof PublishFormData]).map((a) => (
                    <span key={a.key} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-medium">
                      {a.icon} {a.label}
                    </span>
                  ))}
                  {AMENITY_OPTIONS.filter((a) => form[a.key as keyof PublishFormData]).length === 0 && (
                    <span className="text-xs text-slate-400">Aucun équipement sélectionné</span>
                  )}
                </div>
              </div>

              <div className="col-span-full p-4 bg-white rounded-xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Photos ({form.photos.length})</h4>
                {form.photos.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {form.photos.map((url, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={url} src={url} alt={`Photo ${i + 1}`} className="h-16 w-24 object-cover rounded-lg shrink-0" />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-amber-600">⚠️ Aucune photo ajoutée. L&apos;annonce sera moins attractive.</p>
                )}
              </div>

              {/* Status */}
              <div className="col-span-full p-4 rounded-xl border-2 border-dashed flex items-center gap-3 ${form.status === ListingStatus.ACTIVE ? 'border-emerald-300 bg-emerald-50' : 'border-amber-300 bg-amber-50'}">
                <span className="text-2xl">{form.status === ListingStatus.ACTIVE ? '🟢' : '📝'}</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {form.status === ListingStatus.ACTIVE ? 'Publication immédiate' : 'Enregistrement comme brouillon'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {form.status === ListingStatus.ACTIVE
                      ? 'L\'annonce sera visible sur le site après validation de l\'équipe.'
                      : 'L\'annonce sera sauvegardée mais non visible. Vous pourrez la publier plus tard.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 1}
            className="btn-outline px-5 py-2.5 text-sm disabled:opacity-0 disabled:pointer-events-none"
          >
            ← Précédent
          </button>

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Suivant →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary px-8 py-2.5 text-sm font-bold disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                `${form.status === ListingStatus.ACTIVE ? '🟢 Publier l\'annonce' : '💾 Enregistrer le brouillon'}`
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
