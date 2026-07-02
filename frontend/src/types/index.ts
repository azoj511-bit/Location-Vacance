// ============================================================
// Location Vacances - TypeScript Type Definitions
// ============================================================

// --- Enums ---

export enum ListingType {
  VILLA = 'villa',
  HOUSE = 'maison',
  APARTMENT = 'appartement',
  GITE = 'gîte',
  MOBILHOME = 'mobil-home',
}

export const ListingTypeLabels: Record<ListingType, string> = {
  [ListingType.VILLA]: 'Villa',
  [ListingType.HOUSE]: 'Maison',
  [ListingType.APARTMENT]: 'Appartement',
  [ListingType.GITE]: 'Gîte',
  [ListingType.MOBILHOME]: 'Mobil-home',
};

export enum PoolType {
  PRIVATE = 'privée',
  SHARED = 'partagée',
  HEATED = 'chauffée',
  COVERED = 'couverte',
}

export enum ListingStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  DRAFT = 'draft',
  INACTIVE = 'inactive',
}

export enum SortOption {
  RELEVANCE = 'pertinence',
  PRICE_ASC = 'prix-croissant',
  PRICE_DESC = 'prix-decroissant',
  RATING = 'note',
  SURFACE = 'surface',
  NEWEST = 'nouveautes',
}

export const SortOptionLabels: Record<SortOption, string> = {
  [SortOption.RELEVANCE]: 'Pertinence',
  [SortOption.PRICE_ASC]: 'Prix croissant',
  [SortOption.PRICE_DESC]: 'Prix décroissant',
  [SortOption.RATING]: 'Meilleures notes',
  [SortOption.SURFACE]: 'Surface',
  [SortOption.NEWEST]: 'Nouveautés',
};

export enum BookingStatus {
  PENDING = 'en-attente',
  CONFIRMED = 'confirmée',
  CANCELLED = 'annulée',
  COMPLETED = 'terminée',
}

export enum UserRole {
  TRAVELER = 'voyageur',
  AGENCY = 'agence',
  ADMIN = 'admin',
}

// --- Interfaces ---

export interface Location {
  address?: string;
  city: string;
  region: string;
  department?: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
}

export interface ListingFeatures {
  pool: PoolType | null;
  airConditioning: boolean;
  wifi: boolean;
  petFriendly: boolean;
  cleaningIncluded: boolean;
  freeCancellation: boolean;
  seaView: boolean;
  nearBeach: boolean;
  parking: boolean;
  dishwasher: boolean;
  bbq: boolean;
  accessible: boolean;
  garden: boolean;
  terrace: boolean;
  washingMachine: boolean;
}

export interface SeasonalPrice {
  label: string;
  startDate: string;
  endDate: string;
  pricePerNight: number;
  minStay: number;
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  type: ListingType;
  description: string;
  shortDescription: string;
  location: Location;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  surfaceArea: number;
  pricePerNight: number;
  photos: string[];
  thumbnail: string;
  amenities: string[];
  features: ListingFeatures;
  rating: number;
  reviewCount: number;
  agencyId: string;
  agencyName: string;
  agencyLogo?: string;
  status: ListingStatus;
  minStay: number;
  seasonalPricing: SeasonalPrice[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  listingId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  stayDate: string;
  response?: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  country: string;
  countryCode: string;
  region?: string;
  description: string;
  image: string;
  listingCount: number;
  averagePrice: number;
  popular: boolean;
}

export interface SearchFilters {
  destination: string;
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  types: ListingType[];
  pools: PoolType[];
  minBedrooms: number;
  maxBedrooms: number;
  minBathrooms: number;
  minPrice: number;
  maxPrice: number;
  minSurface: number;
  airConditioning: boolean;
  petFriendly: boolean;
  wifi: boolean;
  cleaningIncluded: boolean;
  freeCancellation: boolean;
  seaView: boolean;
  nearBeach: boolean;
  accessible: boolean;
  sortBy: SortOption;
}

export const defaultSearchFilters: SearchFilters = {
  destination: '',
  checkIn: null,
  checkOut: null,
  guests: 2,
  types: [],
  pools: [],
  minBedrooms: 0,
  maxBedrooms: 20,
  minBathrooms: 0,
  minPrice: 0,
  maxPrice: 5000,
  minSurface: 0,
  airConditioning: false,
  petFriendly: false,
  wifi: false,
  cleaningIncluded: false,
  freeCancellation: false,
  seaView: false,
  nearBeach: false,
  accessible: false,
  sortBy: SortOption.RELEVANCE,
};

export interface Booking {
  id: string;
  listingId: string;
  listing?: Listing;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nightCount: number;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
  touristTax: number;
  deposit: number;
  totalPrice: number;
  status: BookingStatus;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  createdAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  favorites: string[];
  createdAt: string;
}

// --- Amenity Icons Mapping ---

export const amenityIcons: Record<string, string> = {
  'Piscine privée': '🏊',
  'Piscine partagée': '🏊',
  'Piscine chauffée': '🏊',
  'Climatisation': '❄️',
  'Wi-Fi haut débit': '📶',
  'Wi-Fi': '📶',
  'Parking': '🅿️',
  'Parking privé': '🅿️',
  'Terrasse': '🌅',
  'Barbecue': '🔥',
  'Lave-vaisselle': '🍽️',
  'Machine à laver': '👕',
  'Jardin': '🌿',
  'Vue mer': '🌊',
  'Proche plage': '🏖️',
  'Animaux acceptés': '🐾',
  'Ménage inclus': '🧹',
  'Accès PMR': '♿',
  'Lit bébé': '👶',
  'Cheminée': '🔥',
  'Sauna': '🧖',
  'Jacuzzi': '🛁',
  'Tennis': '🎾',
  'Vélos': '🚲',
  'Draps fournis': '🛏️',
  'TV écran plat': '📺',
  'Cuisine équipée': '🍳',
  'Sèche-linge': '💨',
  'Coffre-fort': '🔒',
  'Lave-linge': '🧺',
  'Micro-ondes': '📡',
  'Four': '🔥',
  'Fer à repasser': '👔',
};
