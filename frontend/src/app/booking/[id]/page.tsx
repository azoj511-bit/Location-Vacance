'use client';

import React, { useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getListingById } from '@/data/mock-listings';
import { useAppStore } from '@/lib/store';
import { Booking } from '@/types';
import { differenceInDays, parseISO, format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

function BookingPageContent() {
  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();
  
  const listing = getListingById(id);
  const { addBooking } = useAppStore();

  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') ? Number(searchParams.get('guests')) : 2;

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Options states
  const [extraCleaning, setExtraCleaning] = useState(false);
  const [bedLinen, setBedLinen] = useState(false);
  const [babyBed, setBabyBed] = useState(false);

  // Card payment states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paymentOption, setPaymentOption] = useState<'full' | 'deposit'>('full');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!listing || !checkIn || !checkOut) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-red-500">Erreur de réservation</h1>
        <p className="text-sm text-slate-500 mt-2">Dates de séjour ou identifiant de propriété manquants.</p>
        <Link href="/" className="btn-primary mt-6">Retour à l'accueil</Link>
      </div>
    );
  }

  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  const nights = differenceInDays(end, start);

  // Calculate pricing
  let totalBase = 0;
  for (let i = 0; i < nights; i++) {
    const currentDay = addDays(start, i);
    const currentDayStr = format(currentDay, 'yyyy-MM-dd');
    const season = listing.seasonalPricing.find((s) => currentDayStr >= s.startDate && currentDayStr <= s.endDate);
    totalBase += season ? season.pricePerNight : listing.pricePerNight;
  }

  const cleaningFee = listing.features.cleaningIncluded ? 0 : 80;
  const serviceFee = Math.round(totalBase * 0.12);
  const touristTax = Math.round(2.2 * guests * nights);
  const deposit = 500;

  // Add option pricing
  const optionCleaning = extraCleaning ? 50 : 0;
  const optionLinen = bedLinen ? 15 * guests : 0;
  
  const totalPrice = totalBase + cleaningFee + serviceFee + touristTax + optionCleaning + optionLinen;
  const amountToPayNow = paymentOption === 'full' ? totalPrice : Math.round(totalPrice * 0.3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const newBooking: Booking = {
        id: `bkg-${Math.floor(100000 + Math.random() * 900000)}`,
        listingId: listing.id,
        listing: listing,
        userId: 'user-01',
        checkIn,
        checkOut,
        guests,
        nightCount: nights,
        basePrice: totalBase,
        cleaningFee: cleaningFee + optionCleaning,
        serviceFee,
        touristTax,
        deposit,
        totalPrice,
        status: 'confirmée' as any,
        guestName: `${firstName} ${lastName}`,
        guestEmail: email,
        guestPhone: phone,
        specialRequests,
        createdAt: new Date().toISOString(),
      };

      addBooking(newBooking);
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="bg-[#FAFAF8] min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-2xl text-center flex flex-col gap-6 items-center animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-4xl shadow-md shadow-emerald-500/10 animate-bounce">
            ✓
          </div>
          <div>
            <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight leading-tight">
              Réservation Confirmée !
            </h1>
            <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
              Félicitations, votre paiement a été validé. Un email récapitulatif a été envoyé à <span className="font-bold text-slate-700">{email}</span>.
            </p>
          </div>
          {/* Summary details card */}
          <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left text-xs font-semibold text-slate-600 flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Hébergement :</span>
              <span className="text-slate-800 font-bold">{listing.title}</span>
            </div>
            <div className="flex justify-between">
              <span>Dates :</span>
              <span className="text-slate-800 font-bold">du {format(start, 'dd/MM/yyyy')} au {format(end, 'dd/MM/yyyy')}</span>
            </div>
            <div className="flex justify-between">
              <span>Séjour :</span>
              <span className="text-slate-800 font-bold">{nights} nuits • {guests} voyageur{guests > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200/60 pt-2 mt-1">
              <span>Montant payé :</span>
              <span className="text-sunset-500 text-sm font-black">{amountToPayNow} €</span>
            </div>
          </div>
          <Link
            href="/account"
            className="btn-primary w-full py-3.5 text-center font-bold tracking-wide"
          >
            Aller à mon espace personnel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        <h1 className="text-3xl font-display font-black text-slate-950 tracking-tight mb-8">
          Finalisez votre réservation
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols) - Forms */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Coordinates Section */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col gap-4">
              <h2 className="text-lg font-bold font-sans text-slate-900 border-b border-slate-100 pb-2">
                1. Vos coordonnées
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Prénom</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nom de famille</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Adresse email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Numéro de téléphone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Demandes particulières (optionnel)</label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Arrivée tardive, lit bébé supplémentaire, informations de contact..."
                  className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm resize-none"
                />
              </div>
            </div>

            {/* Optional additions */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col gap-4">
              <h2 className="text-lg font-bold font-sans text-slate-900 border-b border-slate-100 pb-2">
                2. Services optionnels
              </h2>
              <div className="flex flex-col gap-3">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={extraCleaning}
                      onChange={() => setExtraCleaning(!extraCleaning)}
                      className="rounded border-slate-350 text-sunset-500 focus:ring-sunset-500"
                    />
                    <div>
                      <span className="text-slate-800 font-bold block">Ménage de fin de séjour renforcé</span>
                      <span className="text-xs text-slate-450 block font-normal">Désinfection approfondie de toutes les surfaces</span>
                    </div>
                  </div>
                  <span className="text-slate-800 font-bold shrink-0">+ 50 €</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={bedLinen}
                      onChange={() => setBedLinen(!bedLinen)}
                      className="rounded border-slate-350 text-sunset-500 focus:ring-sunset-500"
                    />
                    <div>
                      <span className="text-slate-800 font-bold block">Draps et serviettes haut de gamme</span>
                      <span className="text-xs text-slate-450 block font-normal">Fournis pour {guests} voyageur{guests > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <span className="text-slate-800 font-bold shrink-0">+ {15 * guests} €</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={babyBed}
                      onChange={() => setBabyBed(!babyBed)}
                      className="rounded border-slate-350 text-sunset-500 focus:ring-sunset-500"
                    />
                    <div>
                      <span className="text-slate-800 font-bold block">Lit bébé pliable & chaise haute</span>
                      <span className="text-xs text-slate-450 block font-normal">Mis en place avant votre arrivée</span>
                    </div>
                  </div>
                  <span className="text-emerald-600 font-bold shrink-0">Gratuit</span>
                </label>
              </div>
            </div>

            {/* Payment Section */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col gap-6">
              <h2 className="text-lg font-bold font-sans text-slate-900 border-b border-slate-100 pb-2">
                3. Option & Coordonnées de paiement
              </h2>
              
              {/* Payment Split Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`p-4 rounded-2xl border-2 flex flex-col gap-1 cursor-pointer transition-all ${
                    paymentOption === 'full' ? 'border-sunset-500 bg-sunset-50/10' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setPaymentOption('full')}
                >
                  <span className="text-sm font-black text-slate-800">Régler 100% à la réservation</span>
                  <span className="text-xs text-slate-500 font-semibold">Prélèvement immédiat de la totalité</span>
                  <span className="text-base font-black text-sunset-500 mt-2">{totalPrice} €</span>
                </label>
                
                <label
                  className={`p-4 rounded-2xl border-2 flex flex-col gap-1 cursor-pointer transition-all ${
                    paymentOption === 'deposit' ? 'border-sunset-500 bg-sunset-50/10' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setPaymentOption('deposit')}
                >
                  <span className="text-sm font-black text-slate-800">Verser un acompte de 30%</span>
                  <span className="text-xs text-slate-500 font-semibold">Le solde prélevé automatiquement à J-30</span>
                  <span className="text-base font-black text-sunset-500 mt-2">{amountToPayNow} €</span>
                </label>
              </div>

              {/* Secure Credit Card Fields */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wide pb-2 border-b border-slate-200/60">
                  <span>💳 Carte bancaire sécurisée</span>
                  <span className="flex gap-1.5 text-base">
                    <span>🇪🇺</span><span>🔒</span>
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Titulaire de la carte</label>
                  <input
                    type="text"
                    required
                    placeholder="M. Jean Dupont"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="input-field bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Numéro de carte</label>
                  <input
                    type="text"
                    required
                    placeholder="4000 1234 5678 9010"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="input-field bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-mono tracking-widest font-semibold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Date d'expiration</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/AA"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="input-field bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-center font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Cryptogramme (CVV)</label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="input-field bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-center font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2.5 text-xs text-slate-500 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="rounded border-slate-350 text-sunset-500 focus:ring-sunset-500 mt-0.5"
                />
                <span>
                  J'accepte les Conditions Générales de Vente (CGV), la Politique d'annulation J-60 et le règlement intérieur de l'hébergement proposé par l'agence.
                </span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full h-[54px] font-bold text-base tracking-wide flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin block" />
                    <span>Traitement sécurisé en cours...</span>
                  </>
                ) : (
                  <>
                    <span>🔒</span>
                    <span>Confirmer et payer {amountToPayNow} €</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Right Column (4 cols) - Stay recap */}
          <div className="lg:col-span-4 sticky top-24 flex flex-col gap-6">
            
            {/* Recap Card */}
            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-lg flex flex-col gap-4">
              <h3 className="font-sans text-sm font-bold text-slate-900 uppercase tracking-wider">
                Récapitulatif de votre séjour
              </h3>
              
              {/* Thumbnail info */}
              <div className="flex gap-3 pb-4 border-b border-slate-100 items-start">
                <div className="relative w-20 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow">
                  <Image
                    src={listing.photos[0]}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">{listing.title}</h4>
                  <span className="text-[10px] text-slate-400 block mt-1 font-bold">{listing.location.city}, {listing.location.country}</span>
                </div>
              </div>

              {/* Date details */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Arrivée</span>
                  <span className="text-slate-800 font-bold block mt-0.5">
                    {format(start, 'dd EEE MMMM yyyy', { locale: fr })}
                  </span>
                  <span className="text-[9px] text-slate-400 block font-semibold">À partir de 16:00</span>
                </div>
                <div className="border-l border-slate-100 pl-4">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Départ</span>
                  <span className="text-slate-800 font-bold block mt-0.5">
                    {format(end, 'dd EEE MMMM yyyy', { locale: fr })}
                  </span>
                  <span className="text-[9px] text-slate-400 block font-semibold">Avant 10:00</span>
                </div>
              </div>

              {/* Sizing Recap */}
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl">
                <span>Séjour de :</span>
                <span className="font-bold text-slate-800">{nights} nuits • {guests} voyageur{guests > 1 ? 's' : ''}</span>
              </div>

              {/* Cost Breakdown */}
              <div className="flex flex-col gap-3 pt-2 text-xs font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>Location ({nights} nuits)</span>
                  <span className="text-slate-800 font-bold">{totalBase} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de ménage</span>
                  <span className="text-slate-800 font-bold">{cleaningFee} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de dossier & service</span>
                  <span className="text-slate-800 font-bold">{serviceFee} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxe de séjour</span>
                  <span className="text-slate-800 font-bold">{touristTax} €</span>
                </div>
                {extraCleaning && (
                  <div className="flex justify-between text-sunset-500">
                    <span>Option : Ménage renforcé</span>
                    <span className="font-bold">+ {optionCleaning} €</span>
                  </div>
                )}
                {bedLinen && (
                  <div className="flex justify-between text-sunset-500">
                    <span>Option : Linge de lit premium</span>
                    <span className="font-bold">+ {optionLinen} €</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-black text-slate-900">
                  <span>Total TTC</span>
                  <span className="text-base text-sunset-500">{totalPrice} €</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16 flex items-center justify-center">
        <span className="w-8 h-8 rounded-full border-2 border-sunset-500 border-t-transparent animate-spin block" />
      </div>
    }>
      <BookingPageContent />
    </Suspense>
  );
}
