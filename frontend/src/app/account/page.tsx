'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { mockListings } from '@/data/mock-listings';
import ListingCard from '@/components/ui/ListingCard';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

function AccountPageContent() {
  const searchParams = useSearchParams();
  const { bookings, favorites, cancelBooking } = useAppStore();
  
  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites' | 'profile' | 'messages'>('bookings');
  const [mounted, setMounted] = useState(false);

  // Sync state tab from query parameters
  useEffect(() => {
    setMounted(true);
    const tab = searchParams.get('tab');
    if (tab === 'favorites') setActiveTab('favorites');
    else if (tab === 'profile') setActiveTab('profile');
    else if (tab === 'messages') setActiveTab('messages');
    else setActiveTab('bookings');
  }, [searchParams]);

  // Messaging chat state
  const [chats, setChats] = useState([
    {
      id: 'chat-001',
      agencyName: 'Azur Premium Immobilier',
      listingTitle: 'Villa Azur avec Piscine à Débordement',
      messages: [
        { id: 'm-1', sender: 'agency', text: 'Bonjour Jean, votre réservation pour la Villa Azur est confirmée ! N\'hésitez pas si vous avez des questions sur votre arrivée.', time: '14:25' },
        { id: 'm-2', sender: 'traveler', text: 'Bonjour, merci ! À quelle heure pouvons-nous arriver au plus tôt ?', time: '14:30' },
        { id: 'm-3', sender: 'agency', text: 'Les arrivées se font généralement à partir de 16h00. Si la villa est prête avant, nous vous en informerons.', time: '14:32' },
      ],
      unread: false
    },
    {
      id: 'chat-002',
      agencyName: 'Provence Sélection',
      listingTitle: 'Mas Provençal de Charme au Cœur du Luberon',
      messages: [
        { id: 'm-4', sender: 'agency', text: 'Bonjour, nous avons bien reçu votre message concernant les animaux. Les chiens de petite taille sont acceptés sans frais supplémentaires.', time: 'Hier' }
      ],
      unread: true
    }
  ]);

  const [selectedChatId, setSelectedChatId] = useState('chat-001');
  const [typedMessage, setTypedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const activeChat = chats.find(c => c.id === selectedChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'traveler',
      text: typedMessage,
      time: 'À l\'instant'
    };

    const updatedChats = chats.map(c => {
      if (c.id === selectedChatId) {
        return {
          ...c,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    });

    setChats(updatedChats);
    const messageSent = typedMessage;
    setTypedMessage('');

    // Trigger agency automatic simulated response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agency',
        text: `Bonjour Jean, merci pour votre message : "${messageSent}". Un conseiller de l'équipe locale de "${activeChat.agencyName}" a été notifié et reviendra vers vous sous peu pour répondre à vos questions sur "${activeChat.listingTitle}".`,
        time: 'À l\'instant'
      };
      setChats(prev => prev.map(c => {
        if (c.id === selectedChatId) {
          return {
            ...c,
            messages: [...c.messages, replyMsg]
          };
        }
        return c;
      }));
    }, 2500);
  };

  // Profile fields state
  const [profileFirst, setProfileFirst] = useState('Jean');
  const [profileLast, setProfileLast] = useState('Dupont');
  const [profileEmail, setProfileEmail] = useState('jean.dupont@example.com');
  const [profilePhone, setProfilePhone] = useState('06 12 34 56 78');
  const [saved, setSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  // Get favorited listings
  const favoritedListings = mockListings.filter((l) => favorites.includes(l.id));

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'dd MMMM yyyy', { locale: fr });
    } catch {
      return dateStr;
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      cancelBooking(bookingId);
    }
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Banner header profile */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl mb-8">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-full bg-sunset-500 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-sunset-500/25 shrink-0">
              JD
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-display font-bold text-white">Bonjour, {profileFirst} {profileLast}</h1>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Membre de confiance depuis 2024 • Espace Voyageur</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1">👥 {mounted ? bookings.length : 0} Réservations</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="flex items-center gap-1">❤️ {mounted ? favorites.length : 0} Favoris</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="flex items-center gap-1">💬 {chats.reduce((acc, curr) => acc + (curr.unread ? 1 : 0), 0)} Non lus</span>
          </div>
        </div>

        {/* Tab Selector controls */}
        <div className="flex border-b border-slate-200 gap-6 mb-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 transition-colors border-b-2 px-1 ${
              activeTab === 'bookings'
                ? 'border-sunset-500 text-sunset-500'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            🧳 Mes Réservations
          </button>
          
          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-3 transition-colors border-b-2 px-1 ${
              activeTab === 'favorites'
                ? 'border-sunset-500 text-sunset-500'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            ❤️ Mes Favoris
          </button>
          
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 transition-colors border-b-2 px-1 relative ${
              activeTab === 'messages'
                ? 'border-sunset-500 text-sunset-500'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            💬 Messagerie
            {chats.some(c => c.unread) && (
              <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-sunset-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 transition-colors border-b-2 px-1 ${
              activeTab === 'profile'
                ? 'border-sunset-500 text-sunset-500'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            👤 Mon Profil
          </button>
        </div>

        {/* Tab Content Panels */}
        {mounted && (
          <div>
            {/* Bookings panel */}
            {activeTab === 'bookings' && (
              <div className="flex flex-col gap-6">
                {bookings.length === 0 ? (
                  <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center gap-4">
                    <span className="text-5xl">✈️</span>
                    <h3 className="text-lg font-bold text-slate-800">Aucun voyage réservé pour le moment</h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                      Recherchez et planifiez votre prochaine destination de rêve sous le soleil en quelques clics.
                    </p>
                    <Link href="/listings" className="btn-primary py-2.5 px-6 text-sm">
                      Découvrir nos locations
                    </Link>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                      <div className="flex gap-4 items-start md:items-center flex-col md:flex-row">
                        {booking.listing && (
                          <div className="relative w-28 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow">
                            <Image
                              src={booking.listing.photos[0]}
                              alt={booking.listing.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-xs font-bold text-slate-400">Réf : {booking.id}</span>
                            <span
                              className={`badge text-[9px] py-0.5 px-2 uppercase font-black ${
                                booking.status === 'confirmée'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <h3 className="font-sans text-base font-bold text-slate-900 leading-snug">
                            {booking.listing?.title || 'Hébergement de standing'}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 font-semibold flex items-center gap-2 flex-wrap">
                            <span>📅 du {formatDate(booking.checkIn)} au {formatDate(booking.checkOut)}</span>
                            <span>•</span>
                            <span>👥 {booking.guests} voyageur{booking.guests > 1 ? 's' : ''}</span>
                          </p>
                        </div>
                      </div>

                      {/* Pricing split actions */}
                      <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <div className="leading-tight text-left md:text-right">
                          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Montant total</span>
                          <span className="text-xl font-black text-slate-900">{booking.totalPrice} €</span>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <button
                            onClick={() => alert(`Téléchargement de la facture pour la réservation ${booking.id}...`)}
                            className="btn-outline px-4 py-2 text-xs font-bold w-full md:w-auto flex items-center justify-center gap-1.5"
                          >
                            <span>🧾</span> Facture
                          </button>
                          {booking.status === 'confirmée' && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold w-full md:w-auto"
                            >
                              Annuler séjour
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Favorites panel */}
            {activeTab === 'favorites' && (
              <div>
                {favoritedListings.length === 0 ? (
                  <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center gap-4">
                    <span className="text-5xl">❤️</span>
                    <h3 className="text-lg font-bold text-slate-800">Aucun coup de cœur enregistré</h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                      Consultez nos annonces et cliquez sur le bouton favoris pour garder de côté vos hébergements favoris.
                    </p>
                    <Link href="/listings" className="btn-primary py-2.5 px-6 text-sm">
                      Parcourir les locations
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoritedListings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile panel */}
            {activeTab === 'profile' && (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
                <form onSubmit={handleProfileSave} className="flex flex-col gap-6">
                  <h3 className="text-lg font-bold font-sans text-slate-900 border-b border-slate-100 pb-2">Informations personnelles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Prénom</label>
                      <input
                        type="text"
                        required
                        value={profileFirst}
                        onChange={(e) => setProfileFirst(e.target.value)}
                        className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Nom de famille</label>
                      <input
                        type="text"
                        required
                        value={profileLast}
                        onChange={(e) => setProfileLast(e.target.value)}
                        className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Adresse email</label>
                      <input
                        type="email"
                        required
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Numéro de téléphone</label>
                      <input
                        type="tel"
                        required
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  {/* RGPD Compliance buttons */}
                  <h3 className="text-lg font-bold font-sans text-slate-900 border-b border-slate-100 pb-2 mt-4">Sécurité & RGPD</h3>
                  <div className="flex flex-col gap-3 text-xs font-semibold text-slate-500 max-w-xl">
                    <p className="leading-relaxed">
                      Conformément à la réglementation européenne sur la protection des données (RGPD), vous pouvez demander une copie de vos données ou la suppression complète de votre compte.
                    </p>
                    <div className="flex items-center gap-3 flex-wrap mt-1">
                      <button
                        type="button"
                        onClick={() => alert('Vos données personnelles de profil & réservations ont été exportées avec succès au format JSON.')}
                        className="btn-outline px-4 py-2 text-[11px] font-bold"
                      >
                        📥 Exporter mes données
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Êtes-vous sûr de vouloir supprimer définitivement votre compte voyageur et toutes vos données associées ? Cette action est irréversible.')) {
                            alert('Compte supprimé avec succès.');
                          }
                        }}
                        className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-[11px] font-bold hover:bg-rose-100 transition-colors"
                      >
                        ⚠️ Supprimer mon compte
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 border-t border-slate-100 pt-4">
                    <button type="submit" className="btn-primary px-8 py-3 text-sm font-bold">
                      Enregistrer les modifications
                    </button>
                    {saved && (
                      <span className="text-xs text-emerald-600 font-bold animate-fade-in">
                        ✓ Modifications enregistrées avec succès !
                      </span>
                    )}
                  </div>
                </form>
              </div>
            )}
            {/* Messages panel */}
            {activeTab === 'messages' && (
              <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 min-h-[500px] h-[600px] animate-fade-in">
                {/* Chat list (left side, 4 cols) */}
                <div className="md:col-span-4 border-r border-slate-100 flex flex-col">
                  <div className="p-4 border-b border-slate-150 shrink-0">
                    <h3 className="font-sans text-xs font-black text-slate-800 uppercase tracking-wider">Discussions</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {chats.map((chat) => (
                      <button
                        type="button"
                        key={chat.id}
                        onClick={() => {
                          setSelectedChatId(chat.id);
                          // Clear unread
                          setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: false } : c));
                        }}
                        className={`w-full text-left p-4 border-b border-slate-50 transition-colors flex flex-col gap-1.5 relative ${
                          chat.id === selectedChatId ? 'bg-slate-50' : 'hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-800 truncate max-w-[80%]">
                            {chat.agencyName}
                          </span>
                          {chat.unread && (
                            <span className="w-2 h-2 rounded-full bg-sunset-500 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 truncate font-semibold block">
                          {chat.listingTitle}
                        </span>
                        <span className="text-xs text-slate-500 font-medium line-clamp-1 block">
                          {chat.messages[chat.messages.length - 1]?.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat messages box (right side, 8 cols) */}
                <div className="md:col-span-8 flex flex-col h-full bg-slate-50/30">
                  {/* Chat header */}
                  <div className="p-4 bg-white border-b border-slate-100 shrink-0 flex items-center justify-between shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 leading-snug">{activeChat.agencyName}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold">{activeChat.listingTitle}</span>
                    </div>
                    <span className="text-[9px] text-emerald-600 bg-emerald-50 border border-emerald-250 px-2 py-0.5 rounded-lg font-black uppercase tracking-wider">
                      En ligne
                    </span>
                  </div>

                  {/* Messages list */}
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {activeChat.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col max-w-[80%] gap-1 ${
                          m.sender === 'traveler' ? 'self-end items-end' : 'self-start items-start'
                        }`}
                      >
                        <div
                          className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed ${
                            m.sender === 'traveler'
                              ? 'bg-sunset-500 text-white rounded-tr-none shadow-md shadow-sunset-500/10'
                              : 'bg-white text-slate-700 border border-slate-150 rounded-tl-none shadow-sm'
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="text-[9px] text-slate-400 font-semibold px-1">{m.time}</span>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="self-start flex flex-col gap-1 items-start max-w-[80%]">
                        <div className="bg-white border border-slate-150 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                        <span className="text-[9px] text-slate-400 font-semibold">L'agence écrit...</span>
                      </div>
                    )}
                  </div>

                  {/* Message Input form */}
                  <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 shrink-0 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Écrivez votre message à l'agence..."
                      value={typedMessage}
                      onChange={(e) => setTypedMessage(e.target.value)}
                      className="input-field flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold"
                    />
                    <button
                      type="submit"
                      disabled={!typedMessage.trim()}
                      className="btn-primary py-2 px-5 text-xs font-black shrink-0 disabled:opacity-50"
                    >
                      Envoyer
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16 flex items-center justify-center">
        <span className="w-8 h-8 rounded-full border-2 border-sunset-500 border-t-transparent animate-spin block" />
      </div>
    }>
      <AccountPageContent />
    </Suspense>
  );
}
