'use client';

import React, { useState } from 'react';
import { Review } from '@/types';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReviewSectionProps {
  reviews: Review[];
  rating: number;
}

export default function ReviewSection({ reviews, rating }: ReviewSectionProps) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, reviews.length));
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'MMMM yyyy', { locale: fr });
    } catch {
      return dateStr;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Mocked details breakdown (clean look)
  const detailRatings = [
    { label: 'Propreté', score: 4.8 },
    { label: 'Communication', score: 4.9 },
    { label: 'Arrivée', score: 4.7 },
    { label: 'Précision', score: 4.8 },
    { label: 'Emplacement', score: 4.9 },
    { label: 'Rapport qualité-prix', score: 4.6 },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Summary Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex flex-col items-center justify-center text-amber-600 shrink-0">
            <span className="text-2xl font-black">{rating.toFixed(1)}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">/ 5</span>
          </div>
          <div>
            <h3 className="font-sans text-xl font-bold text-slate-900">Avis clients vérifiés</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              Basé sur {reviews.length} séjour{reviews.length > 1 ? 's' : ''} géré{reviews.length > 1 ? 's' : ''} par nos agences.
            </p>
          </div>
        </div>

        {/* Breakdown bar details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 flex-1 max-w-xl">
          {detailRatings.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{item.label}</span>
                <span>{item.score.toFixed(1)}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(item.score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      {reviews.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <span className="text-3xl block mb-2" role="img" aria-label="reviews">💬</span>
          <p className="text-sm text-slate-500 font-medium">Aucun avis disponible pour cette location pour le moment.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {reviews.slice(0, visibleCount).map((review) => (
            <div key={review.id} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col gap-4">
              {/* User row */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  {review.userAvatar ? (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-150 border border-slate-100">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-sunset-500 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      {getInitials(review.userName)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{review.userName}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Séjour en {formatDate(review.stayDate)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex text-amber-500 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="leading-none">
                        {i < Math.round(review.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Avis déposé le {format(parseISO(review.date), 'dd/MM/yyyy')}
                  </span>
                </div>
              </div>

              {/* Comment */}
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                "{review.comment}"
              </p>

              {/* Agency response */}
              {review.response && (
                <div className="bg-slate-50 border-l-2 border-sunset-500 p-4 rounded-r-xl mt-2 ml-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs">🏢</span>
                    <span className="text-xs font-bold text-slate-700">Réponse de l'agence</span>
                  </div>
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    "{review.response}"
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Show more button */}
          {visibleCount < reviews.length && (
            <button
              onClick={handleShowMore}
              className="btn-outline self-center px-8 py-2.5 mt-2 text-sm font-bold"
            >
              Afficher plus d'avis ({reviews.length - visibleCount} restants)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
