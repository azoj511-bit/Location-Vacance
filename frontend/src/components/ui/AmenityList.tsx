'use client';

import React, { useState } from 'react';
import { amenityIcons } from '@/types';

interface AmenityListProps {
  amenities: string[];
}

export default function AmenityList({ amenities }: AmenityListProps) {
  const [showAll, setShowAll] = useState(false);

  const getIcon = (name: string): string => {
    return amenityIcons[name] || '✔️';
  };

  const limit = 8;
  const displayedAmenities = showAll ? amenities : amenities.slice(0, limit);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displayedAmenities.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100/50 hover:bg-slate-100/50 transition-colors"
          >
            <span className="text-xl shrink-0" role="img" aria-label={amenity}>
              {getIcon(amenity)}
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {amenity}
            </span>
          </div>
        ))}
      </div>

      {amenities.length > limit && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="btn-outline self-start text-xs px-5 py-2.5 font-bold mt-2"
        >
          {showAll ? 'Voir moins d\'équipements' : `Afficher les ${amenities.length} équipements`}
        </button>
      )}
    </div>
  );
}
