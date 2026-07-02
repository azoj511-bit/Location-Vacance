import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SearchFilters, defaultSearchFilters, Booking } from '@/types';

interface AppState {
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
  
  searchFilters: SearchFilters;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;
  
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (listingId) => {
        set((state) => {
          const isFav = state.favorites.includes(listingId);
          return {
            favorites: isFav
              ? state.favorites.filter((id) => id !== listingId)
              : [...state.favorites, listingId],
          };
        });
      },
      isFavorite: (listingId) => {
        return get().favorites.includes(listingId);
      },
      
      searchFilters: defaultSearchFilters,
      setSearchFilters: (filters) => {
        set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters },
        }));
      },
      resetSearchFilters: () => {
        set({ searchFilters: defaultSearchFilters });
      },
      
      bookings: [],
      addBooking: (booking) => {
        set((state) => ({
          bookings: [booking, ...state.bookings],
        }));
      },
      cancelBooking: (bookingId) => {
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === bookingId ? { ...b, status: 'annulée' as any } : b
          ),
        }));
      },
    }),
    {
      name: 'location-vacances-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        bookings: state.bookings,
      }),
    }
  )
);
