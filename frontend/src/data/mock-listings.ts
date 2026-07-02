import {
  Listing,
  ListingType,
  ListingStatus,
  PoolType,
  Review,
  SearchFilters,
  SortOption,
} from '@/types';

// ============================================================
// Mock Listings Data
// ============================================================

export const mockListings: Listing[] = [
  {
    id: 'lst-001',
    title: 'Villa Azur avec Piscine à Débordement',
    slug: 'villa-azur-piscine-debordement-saint-tropez',
    type: ListingType.VILLA,
    description: 'Nichée sur les hauteurs de Saint-Tropez, cette villa contemporaine de 250 m² offre une vue panoramique imprenable sur la Méditerranée. Avec sa piscine à débordement, ses 5 chambres climatisées et sa terrasse ombragée, elle incarne l\'art de vivre provençal. Le jardin paysager de 2000 m² assure une intimité totale. À seulement 10 minutes des plages de Pampelonne et du port.',
    shortDescription: 'Villa d\'exception avec piscine à débordement et vue mer panoramique à Saint-Tropez.',
    location: { city: 'Saint-Tropez', region: 'Côte d\'Azur', department: 'Var', country: 'France', countryCode: 'FR', lat: 43.2677, lng: 6.6407 },
    capacity: 10, bedrooms: 5, bathrooms: 3, surfaceArea: 250, pricePerNight: 450,
    photos: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80',
    amenities: ['Piscine privée', 'Climatisation', 'Wi-Fi haut débit', 'Parking privé', 'Terrasse', 'Barbecue', 'Lave-vaisselle', 'Machine à laver', 'Jardin', 'Vue mer', 'Proche plage', 'Ménage inclus', 'TV écran plat', 'Cuisine équipée', 'Coffre-fort'],
    features: { pool: PoolType.PRIVATE, airConditioning: true, wifi: true, petFriendly: false, cleaningIncluded: true, freeCancellation: true, seaView: true, nearBeach: true, parking: true, dishwasher: true, bbq: true, accessible: false, garden: true, terrace: true, washingMachine: true },
    rating: 4.9, reviewCount: 47, agencyId: 'agency-001', agencyName: 'Azur Premium Immobilier', status: ListingStatus.ACTIVE, minStay: 7,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-01-01', endDate: '2025-03-31', pricePerNight: 280, minStay: 3 },
      { label: 'Moyenne saison', startDate: '2025-04-01', endDate: '2025-06-30', pricePerNight: 380, minStay: 5 },
      { label: 'Haute saison', startDate: '2025-07-01', endDate: '2025-08-31', pricePerNight: 550, minStay: 7 },
      { label: 'Arrière-saison', startDate: '2025-09-01', endDate: '2025-12-31', pricePerNight: 320, minStay: 3 },
    ],
    createdAt: '2024-01-15T10:00:00Z', updatedAt: '2025-06-01T14:30:00Z',
  },
  {
    id: 'lst-002',
    title: 'Mas Provençal de Charme au Cœur du Luberon',
    slug: 'mas-provencal-charme-gordes-luberon',
    type: ListingType.HOUSE,
    description: 'Authentique mas en pierres du XVIIIe siècle restauré avec goût, situé à Gordes, l\'un des plus beaux villages de France. Piscine chauffée dans un écrin de lavande, cuisine d\'été sous les platanes. 4 chambres avec salle de bain privative, salon voûté avec cheminée. Vue extraordinaire sur les monts du Vaucluse.',
    shortDescription: 'Mas authentique en pierres avec piscine chauffée au cœur du Luberon, vue exceptionnelle.',
    location: { city: 'Gordes', region: 'Provence', department: 'Vaucluse', country: 'France', countryCode: 'FR', lat: 43.9116, lng: 5.2006 },
    capacity: 8, bedrooms: 4, bathrooms: 4, surfaceArea: 200, pricePerNight: 320,
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a8?auto=format&fit=crop&w=600&q=80',
    amenities: ['Piscine chauffée', 'Wi-Fi haut débit', 'Parking', 'Terrasse', 'Barbecue', 'Lave-vaisselle', 'Machine à laver', 'Jardin', 'Cheminée', 'Ménage inclus', 'Draps fournis', 'Cuisine équipée'],
    features: { pool: PoolType.HEATED, airConditioning: false, wifi: true, petFriendly: true, cleaningIncluded: true, freeCancellation: true, seaView: false, nearBeach: false, parking: true, dishwasher: true, bbq: true, accessible: false, garden: true, terrace: true, washingMachine: true },
    rating: 4.7, reviewCount: 63, agencyId: 'agency-002', agencyName: 'Provence Sélection', status: ListingStatus.ACTIVE, minStay: 5,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-01-01', endDate: '2025-04-30', pricePerNight: 220, minStay: 3 },
      { label: 'Haute saison', startDate: '2025-05-01', endDate: '2025-09-30', pricePerNight: 380, minStay: 7 },
      { label: 'Arrière-saison', startDate: '2025-10-01', endDate: '2025-12-31', pricePerNight: 250, minStay: 3 },
    ],
    createdAt: '2023-09-10T08:00:00Z', updatedAt: '2025-05-15T11:20:00Z',
  },
  {
    id: 'lst-003',
    title: 'Appartement Design Vue Océan à Biarritz',
    slug: 'appartement-design-vue-ocean-biarritz',
    type: ListingType.APARTMENT,
    description: 'Superbe appartement de 85 m² entièrement rénové en 2024, face à la Grande Plage de Biarritz. Décoration contemporaine signée, grandes baies vitrées avec vue imprenable sur l\'océan. 2 chambres confortables, cuisine américaine tout équipée. Accès direct à la plage à pied, centre-ville et restaurants à 2 minutes.',
    shortDescription: 'Appartement design rénové avec vue panoramique sur l\'océan, face Grande Plage.',
    location: { city: 'Biarritz', region: 'Pays Basque', department: 'Pyrénées-Atlantiques', country: 'France', countryCode: 'FR', lat: 43.4832, lng: -1.5586 },
    capacity: 4, bedrooms: 2, bathrooms: 1, surfaceArea: 85, pricePerNight: 185,
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    amenities: ['Climatisation', 'Wi-Fi haut débit', 'TV écran plat', 'Lave-vaisselle', 'Machine à laver', 'Vue mer', 'Proche plage', 'Cuisine équipée', 'Fer à repasser', 'Coffre-fort'],
    features: { pool: null, airConditioning: true, wifi: true, petFriendly: false, cleaningIncluded: false, freeCancellation: true, seaView: true, nearBeach: true, parking: false, dishwasher: true, bbq: false, accessible: true, garden: false, terrace: false, washingMachine: true },
    rating: 4.6, reviewCount: 89, agencyId: 'agency-003', agencyName: 'Atlantic Coast Properties', status: ListingStatus.ACTIVE, minStay: 3,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-01-01', endDate: '2025-05-31', pricePerNight: 130, minStay: 2 },
      { label: 'Haute saison', startDate: '2025-06-01', endDate: '2025-09-15', pricePerNight: 220, minStay: 5 },
      { label: 'Arrière-saison', startDate: '2025-09-16', endDate: '2025-12-31', pricePerNight: 145, minStay: 2 },
    ],
    createdAt: '2024-03-01T09:00:00Z', updatedAt: '2025-06-10T16:00:00Z',
  },
  {
    id: 'lst-004',
    title: 'Villa Maquis avec Piscine en Corse du Sud',
    slug: 'villa-maquis-piscine-porto-vecchio-corse',
    type: ListingType.VILLA,
    description: 'Magnifique villa de 300 m² nichée dans le maquis corse, à 5 minutes des plages paradisiaques de Palombaggia et Santa Giulia. Piscine privée de 12 mètres, 6 chambres spacieuses, terrasses panoramiques avec vue sur les aiguilles de Bavella. Prestations haut de gamme : climatisation réversible, domotique, cuisine professionnelle.',
    shortDescription: 'Villa grand standing dans le maquis corse, piscine 12m, proche Palombaggia.',
    location: { city: 'Porto-Vecchio', region: 'Corse', department: 'Corse-du-Sud', country: 'France', countryCode: 'FR', lat: 41.5912, lng: 9.2793 },
    capacity: 12, bedrooms: 6, bathrooms: 4, surfaceArea: 300, pricePerNight: 520,
    photos: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
    amenities: ['Piscine privée', 'Climatisation', 'Wi-Fi haut débit', 'Parking privé', 'Terrasse', 'Barbecue', 'Lave-vaisselle', 'Machine à laver', 'Jardin', 'Proche plage', 'Ménage inclus', 'TV écran plat', 'Cuisine équipée', 'Coffre-fort', 'Jacuzzi'],
    features: { pool: PoolType.PRIVATE, airConditioning: true, wifi: true, petFriendly: false, cleaningIncluded: true, freeCancellation: true, seaView: false, nearBeach: true, parking: true, dishwasher: true, bbq: true, accessible: false, garden: true, terrace: true, washingMachine: true },
    rating: 4.8, reviewCount: 35, agencyId: 'agency-004', agencyName: 'Corsica Dream Locations', status: ListingStatus.ACTIVE, minStay: 7,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-01-01', endDate: '2025-05-31', pricePerNight: 350, minStay: 5 },
      { label: 'Haute saison', startDate: '2025-06-01', endDate: '2025-09-15', pricePerNight: 650, minStay: 7 },
      { label: 'Arrière-saison', startDate: '2025-09-16', endDate: '2025-12-31', pricePerNight: 380, minStay: 5 },
    ],
    createdAt: '2024-02-20T12:00:00Z', updatedAt: '2025-05-28T09:45:00Z',
  },
  {
    id: 'lst-005',
    title: 'Gîte Pierre et Bois en Périgord Noir',
    slug: 'gite-pierre-bois-sarlat-perigord',
    type: ListingType.GITE,
    description: 'Charmant gîte en pierres dorées du Périgord, niché au cœur d\'un hameau restauré à 5 km de Sarlat. Poutres apparentes, tomettes anciennes, cheminée en pierre. 3 chambres douillettes, jardin clos arboré. Idéal pour découvrir les châteaux, grottes et marchés du Périgord Noir. Animaux bienvenus.',
    shortDescription: 'Gîte authentique en pierres du Périgord, charme et tranquillité près de Sarlat.',
    location: { city: 'Sarlat-la-Canéda', region: 'Dordogne', department: 'Dordogne', country: 'France', countryCode: 'FR', lat: 44.8892, lng: 1.2156 },
    capacity: 6, bedrooms: 3, bathrooms: 2, surfaceArea: 120, pricePerNight: 145,
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    amenities: ['Wi-Fi', 'Parking', 'Terrasse', 'Barbecue', 'Jardin', 'Animaux acceptés', 'Cheminée', 'Draps fournis', 'Cuisine équipée', 'Lave-vaisselle'],
    features: { pool: null, airConditioning: false, wifi: true, petFriendly: true, cleaningIncluded: false, freeCancellation: true, seaView: false, nearBeach: false, parking: true, dishwasher: true, bbq: true, accessible: false, garden: true, terrace: true, washingMachine: false },
    rating: 4.5, reviewCount: 112, agencyId: 'agency-005', agencyName: 'Périgord Vacances', status: ListingStatus.ACTIVE, minStay: 3,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-01-01', endDate: '2025-04-30', pricePerNight: 95, minStay: 2 },
      { label: 'Moyenne saison', startDate: '2025-05-01', endDate: '2025-06-30', pricePerNight: 130, minStay: 3 },
      { label: 'Haute saison', startDate: '2025-07-01', endDate: '2025-08-31', pricePerNight: 175, minStay: 7 },
      { label: 'Arrière-saison', startDate: '2025-09-01', endDate: '2025-12-31', pricePerNight: 110, minStay: 2 },
    ],
    createdAt: '2023-06-01T07:30:00Z', updatedAt: '2025-04-12T10:00:00Z',
  },
  {
    id: 'lst-006',
    title: 'Villa Blanche avec Vue Caldeira à Santorin',
    slug: 'villa-blanche-vue-caldeira-oia-santorin',
    type: ListingType.VILLA,
    description: 'Villa cycladique iconique perchée sur les falaises d\'Oia, avec vue à couper le souffle sur la caldeira et les couchers de soleil légendaires. Architecture blanche traditionnelle revisitée avec un luxe contemporain. Piscine à débordement, 3 suites avec terrasse privée. À 2 pas des ruelles charmantes d\'Oia.',
    shortDescription: 'Villa cycladique face à la caldeira de Santorin, piscine à débordement, couchers de soleil uniques.',
    location: { city: 'Oia', region: 'Santorin', country: 'Grèce', countryCode: 'GR', lat: 36.4615, lng: 25.3760 },
    capacity: 6, bedrooms: 3, bathrooms: 3, surfaceArea: 160, pricePerNight: 380,
    photos: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
    amenities: ['Piscine privée', 'Climatisation', 'Wi-Fi haut débit', 'Terrasse', 'Vue mer', 'Ménage inclus', 'TV écran plat', 'Cuisine équipée', 'Coffre-fort', 'Jacuzzi'],
    features: { pool: PoolType.PRIVATE, airConditioning: true, wifi: true, petFriendly: false, cleaningIncluded: true, freeCancellation: false, seaView: true, nearBeach: false, parking: false, dishwasher: true, bbq: false, accessible: false, garden: false, terrace: true, washingMachine: true },
    rating: 4.9, reviewCount: 28, agencyId: 'agency-006', agencyName: 'Greek Sun Villas', status: ListingStatus.ACTIVE, minStay: 5,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-01-01', endDate: '2025-04-30', pricePerNight: 250, minStay: 3 },
      { label: 'Haute saison', startDate: '2025-05-01', endDate: '2025-10-15', pricePerNight: 480, minStay: 5 },
      { label: 'Arrière-saison', startDate: '2025-10-16', endDate: '2025-12-31', pricePerNight: 280, minStay: 3 },
    ],
    createdAt: '2024-04-01T11:00:00Z', updatedAt: '2025-06-05T13:15:00Z',
  },
  {
    id: 'lst-007',
    title: 'Maison Surf & Plage à Hossegor',
    slug: 'maison-surf-plage-hossegor-landes',
    type: ListingType.HOUSE,
    description: 'Maison landaise rénovée à 200 m de la plage centrale d\'Hossegor, spot de surf mondialement réputé. Ambiance décontractée chic : parquet, murs blancs, mobilier en bois clair. 4 chambres, grand salon lumineux, cuisine ouverte. Jardin avec douche extérieure, local surf. Parfait pour familles et groupes d\'amis surfeurs.',
    shortDescription: 'Maison de plage rénovée à 200 m du spot de surf d\'Hossegor, ambiance chic décontractée.',
    location: { city: 'Hossegor', region: 'Landes', department: 'Landes', country: 'France', countryCode: 'FR', lat: 43.6655, lng: -1.3994 },
    capacity: 8, bedrooms: 4, bathrooms: 2, surfaceArea: 140, pricePerNight: 250,
    photos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    amenities: ['Wi-Fi haut débit', 'Parking', 'Terrasse', 'Barbecue', 'Jardin', 'Proche plage', 'Animaux acceptés', 'Vélos', 'Machine à laver', 'Cuisine équipée', 'Draps fournis'],
    features: { pool: null, airConditioning: false, wifi: true, petFriendly: true, cleaningIncluded: false, freeCancellation: true, seaView: false, nearBeach: true, parking: true, dishwasher: false, bbq: true, accessible: false, garden: true, terrace: true, washingMachine: true },
    rating: 4.4, reviewCount: 76, agencyId: 'agency-007', agencyName: 'Atlantique Surf Lodge', status: ListingStatus.ACTIVE, minStay: 5,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-01-01', endDate: '2025-05-31', pricePerNight: 160, minStay: 3 },
      { label: 'Haute saison', startDate: '2025-06-01', endDate: '2025-09-15', pricePerNight: 310, minStay: 7 },
      { label: 'Arrière-saison', startDate: '2025-09-16', endDate: '2025-12-31', pricePerNight: 180, minStay: 3 },
    ],
    createdAt: '2023-11-20T14:00:00Z', updatedAt: '2025-05-20T08:30:00Z',
  },
  {
    id: 'lst-008',
    title: 'Finca Majorquine avec Oliveraie',
    slug: 'finca-majorquine-oliveraie-deia-majorque',
    type: ListingType.VILLA,
    description: 'Superbe finca traditionnelle du XVIe siècle au cœur de la Serra de Tramuntana, entourée d\'une oliveraie centenaire. Rénovée avec des matériaux nobles : pierre, bois d\'olivier, terre cuite. Piscine intégrée dans les rochers, 5 chambres de caractère. Vue spectaculaire sur les terrasses en pierre sèche et la Méditerranée.',
    shortDescription: 'Finca historique dans la Serra de Tramuntana, piscine dans les rochers, oliveraie centenaire.',
    location: { city: 'Deià', region: 'Majorque', country: 'Espagne', countryCode: 'ES', lat: 39.7488, lng: 2.7487 },
    capacity: 10, bedrooms: 5, bathrooms: 4, surfaceArea: 280, pricePerNight: 420,
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a8?auto=format&fit=crop&w=600&q=80',
    amenities: ['Piscine privée', 'Climatisation', 'Wi-Fi', 'Parking privé', 'Terrasse', 'Barbecue', 'Jardin', 'Vue mer', 'Ménage inclus', 'Cuisine équipée', 'Machine à laver', 'Lave-vaisselle'],
    features: { pool: PoolType.PRIVATE, airConditioning: true, wifi: true, petFriendly: true, cleaningIncluded: true, freeCancellation: true, seaView: true, nearBeach: false, parking: true, dishwasher: true, bbq: true, accessible: false, garden: true, terrace: true, washingMachine: true },
    rating: 4.8, reviewCount: 42, agencyId: 'agency-008', agencyName: 'Mallorca Luxury Estates', status: ListingStatus.ACTIVE, minStay: 7,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-01-01', endDate: '2025-04-30', pricePerNight: 290, minStay: 5 },
      { label: 'Haute saison', startDate: '2025-05-01', endDate: '2025-10-15', pricePerNight: 520, minStay: 7 },
      { label: 'Arrière-saison', startDate: '2025-10-16', endDate: '2025-12-31', pricePerNight: 310, minStay: 5 },
    ],
    createdAt: '2024-01-10T10:30:00Z', updatedAt: '2025-06-12T11:00:00Z',
  },
  {
    id: 'lst-009',
    title: 'Penthouse Face à l\'Océan en Algarve',
    slug: 'penthouse-ocean-lagos-algarve-portugal',
    type: ListingType.APARTMENT,
    description: 'Somptueux penthouse de 95 m² au dernier étage d\'une résidence de standing à Lagos. Terrasse panoramique de 40 m² face à l\'Atlantique. 2 chambres avec literie haut de gamme, salon design, cuisine équipée Miele. Piscine résidentielle chauffée, accès direct à la Praia Dona Ana classée parmi les plus belles plages du monde.',
    shortDescription: 'Penthouse de standing avec terrasse panoramique face à l\'océan, piscine résidentielle chauffée.',
    location: { city: 'Lagos', region: 'Algarve', country: 'Portugal', countryCode: 'PT', lat: 37.1028, lng: -8.6733 },
    capacity: 4, bedrooms: 2, bathrooms: 2, surfaceArea: 95, pricePerNight: 200,
    photos: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80',
    amenities: ['Piscine partagée', 'Climatisation', 'Wi-Fi haut débit', 'Terrasse', 'Vue mer', 'Proche plage', 'TV écran plat', 'Cuisine équipée', 'Lave-vaisselle', 'Machine à laver', 'Accès PMR', 'Coffre-fort'],
    features: { pool: PoolType.SHARED, airConditioning: true, wifi: true, petFriendly: false, cleaningIncluded: false, freeCancellation: true, seaView: true, nearBeach: true, parking: true, dishwasher: true, bbq: false, accessible: true, garden: false, terrace: true, washingMachine: true },
    rating: 4.6, reviewCount: 54, agencyId: 'agency-009', agencyName: 'Algarve Sun Properties', status: ListingStatus.ACTIVE, minStay: 3,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-01-01', endDate: '2025-04-30', pricePerNight: 140, minStay: 3 },
      { label: 'Haute saison', startDate: '2025-05-01', endDate: '2025-09-30', pricePerNight: 250, minStay: 5 },
      { label: 'Arrière-saison', startDate: '2025-10-01', endDate: '2025-12-31', pricePerNight: 155, minStay: 3 },
    ],
    createdAt: '2024-05-01T09:00:00Z', updatedAt: '2025-06-08T15:20:00Z',
  },
  {
    id: 'lst-010',
    title: 'Villa Tropicale avec Piscine en Guadeloupe',
    slug: 'villa-tropicale-piscine-sainte-anne-guadeloupe',
    type: ListingType.VILLA,
    description: 'Villa créole de 180 m² dans un jardin tropical luxuriant de 1500 m² à Sainte-Anne. Piscine privée entourée de cocotiers, terrasse avec vue sur la mer des Caraïbes. 4 chambres climatisées avec moustiquaires, grande cuisine ouverte. Plage de la Caravelle à 5 minutes. Idéal pour une escapade tropicale en famille.',
    shortDescription: 'Villa créole dans un jardin tropical, piscine sous les cocotiers, à 5 min de la plage.',
    location: { city: 'Sainte-Anne', region: 'Grande-Terre', department: 'Guadeloupe', country: 'France', countryCode: 'GP', lat: 16.2279, lng: -61.3844 },
    capacity: 8, bedrooms: 4, bathrooms: 3, surfaceArea: 180, pricePerNight: 280,
    photos: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
    amenities: ['Piscine privée', 'Climatisation', 'Wi-Fi', 'Parking', 'Terrasse', 'Barbecue', 'Jardin', 'Proche plage', 'Ménage inclus', 'Cuisine équipée', 'Machine à laver', 'Lit bébé'],
    features: { pool: PoolType.PRIVATE, airConditioning: true, wifi: true, petFriendly: false, cleaningIncluded: true, freeCancellation: true, seaView: true, nearBeach: true, parking: true, dishwasher: true, bbq: true, accessible: false, garden: true, terrace: true, washingMachine: true },
    rating: 4.7, reviewCount: 31, agencyId: 'agency-010', agencyName: 'Antilles Paradis', status: ListingStatus.ACTIVE, minStay: 7,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-05-01', endDate: '2025-11-30', pricePerNight: 220, minStay: 5 },
      { label: 'Haute saison', startDate: '2025-12-01', endDate: '2025-04-30', pricePerNight: 350, minStay: 7 },
    ],
    createdAt: '2024-06-15T13:00:00Z', updatedAt: '2025-06-01T10:00:00Z',
  },
  {
    id: 'lst-011',
    title: 'Bastide d\'Exception en Provence',
    slug: 'bastide-exception-aix-en-provence',
    type: ListingType.HOUSE,
    description: 'Bastide du XVIIIe siècle magistralement restaurée à 15 minutes d\'Aix-en-Provence. 7 chambres pouvant accueillir jusqu\'à 14 personnes, idéale pour les grandes familles ou événements. Parc de 5 hectares avec oliviers, vignes et lavandes. Piscine chauffée de 15 m, court de tennis, boulodrome. Personnel de maison disponible.',
    shortDescription: 'Bastide seigneuriale de 7 chambres, parc de 5 ha, piscine, tennis, à 15 min d\'Aix.',
    location: { city: 'Aix-en-Provence', region: 'Provence', department: 'Bouches-du-Rhône', country: 'France', countryCode: 'FR', lat: 43.5297, lng: 5.4474 },
    capacity: 14, bedrooms: 7, bathrooms: 5, surfaceArea: 450, pricePerNight: 750,
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    amenities: ['Piscine chauffée', 'Climatisation', 'Wi-Fi haut débit', 'Parking privé', 'Terrasse', 'Barbecue', 'Jardin', 'Ménage inclus', 'Tennis', 'Cuisine équipée', 'Machine à laver', 'Lave-vaisselle', 'Cheminée', 'Sauna', 'TV écran plat'],
    features: { pool: PoolType.HEATED, airConditioning: true, wifi: true, petFriendly: true, cleaningIncluded: true, freeCancellation: false, seaView: false, nearBeach: false, parking: true, dishwasher: true, bbq: true, accessible: true, garden: true, terrace: true, washingMachine: true },
    rating: 4.9, reviewCount: 19, agencyId: 'agency-002', agencyName: 'Provence Sélection', status: ListingStatus.ACTIVE, minStay: 7,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-01-01', endDate: '2025-04-30', pricePerNight: 500, minStay: 5 },
      { label: 'Haute saison', startDate: '2025-05-01', endDate: '2025-09-30', pricePerNight: 900, minStay: 7 },
      { label: 'Arrière-saison', startDate: '2025-10-01', endDate: '2025-12-31', pricePerNight: 550, minStay: 5 },
    ],
    createdAt: '2024-02-01T08:00:00Z', updatedAt: '2025-05-30T12:00:00Z',
  },
  {
    id: 'lst-012',
    title: 'Mobil-home Premium Bord de Mer',
    slug: 'mobil-home-premium-argeles-sur-mer',
    type: ListingType.MOBILHOME,
    description: 'Mobil-home haut de gamme de 40 m² dans un camping 5 étoiles à Argelès-sur-Mer. 3 chambres climatisées, terrasse couverte de 15 m² avec salon de jardin. Accès direct plage de sable fin, parc aquatique du camping, animations et club enfants. Idéal familles avec enfants, excellent rapport qualité-prix.',
    shortDescription: 'Mobil-home premium en camping 5★, accès plage, parc aquatique, club enfants.',
    location: { city: 'Argelès-sur-Mer', region: 'Pyrénées-Orientales', department: 'Pyrénées-Orientales', country: 'France', countryCode: 'FR', lat: 42.5467, lng: 3.0234 },
    capacity: 6, bedrooms: 3, bathrooms: 1, surfaceArea: 40, pricePerNight: 85,
    photos: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    amenities: ['Piscine partagée', 'Climatisation', 'Wi-Fi', 'Parking', 'Terrasse', 'Proche plage', 'Animaux acceptés', 'TV écran plat', 'Cuisine équipée', 'Micro-ondes'],
    features: { pool: PoolType.SHARED, airConditioning: true, wifi: true, petFriendly: true, cleaningIncluded: false, freeCancellation: true, seaView: false, nearBeach: true, parking: true, dishwasher: false, bbq: false, accessible: true, garden: false, terrace: true, washingMachine: false },
    rating: 4.2, reviewCount: 156, agencyId: 'agency-003', agencyName: 'Atlantic Coast Properties', status: ListingStatus.ACTIVE, minStay: 7,
    seasonalPricing: [
      { label: 'Basse saison', startDate: '2025-04-01', endDate: '2025-06-30', pricePerNight: 65, minStay: 5 },
      { label: 'Haute saison', startDate: '2025-07-01', endDate: '2025-08-31', pricePerNight: 120, minStay: 7 },
      { label: 'Arrière-saison', startDate: '2025-09-01', endDate: '2025-10-15', pricePerNight: 70, minStay: 5 },
    ],
    createdAt: '2024-03-15T10:00:00Z', updatedAt: '2025-06-10T09:00:00Z',
  },
];

// ============================================================
// Mock Reviews Data
// ============================================================

export const mockReviews: Review[] = [
  { id: 'rev-001', listingId: 'lst-001', userId: 'usr-001', userName: 'Marie D.', rating: 5, comment: 'Villa absolument magnifique ! La vue sur la mer depuis la piscine est à couper le souffle. Tout était impeccable, nous avons passé des vacances de rêve en famille.', date: '2025-04-20', stayDate: 'Avril 2025' },
  { id: 'rev-002', listingId: 'lst-001', userId: 'usr-002', userName: 'Pierre L.', rating: 5, comment: 'Prestations exceptionnelles, maison parfaitement entretenue. L\'agence est très réactive. Nous reviendrons sans hésiter.', date: '2025-03-15', stayDate: 'Mars 2025' },
  { id: 'rev-003', listingId: 'lst-001', userId: 'usr-003', userName: 'Sophie M.', rating: 4, comment: 'Superbe villa, emplacement idéal. Seul petit bémol : le bruit de la route en contrebas le matin. Mais l\'ensemble est remarquable.', date: '2025-02-10', stayDate: 'Février 2025' },
  { id: 'rev-004', listingId: 'lst-002', userId: 'usr-004', userName: 'Jean-Claude R.', rating: 5, comment: 'Le mas est un vrai coup de cœur. Authenticité, confort et tranquillité. La piscine chauffée est un vrai plus. Les marchés de Gordes sont fabuleux.', date: '2025-05-05', stayDate: 'Mai 2025' },
  { id: 'rev-005', listingId: 'lst-002', userId: 'usr-005', userName: 'Isabelle G.', rating: 4, comment: 'Très beau mas, bien situé pour explorer le Luberon. La cuisine d\'été est fantastique. Nous avons adoré les soirées sur la terrasse.', date: '2025-04-12', stayDate: 'Avril 2025' },
  { id: 'rev-006', listingId: 'lst-003', userId: 'usr-006', userName: 'Thomas B.', rating: 5, comment: 'Emplacement parfait, face à la Grande Plage. L\'appartement est magnifiquement décoré et tout équipé. Biarritz est une ville incroyable.', date: '2025-05-28', stayDate: 'Mai 2025' },
  { id: 'rev-007', listingId: 'lst-003', userId: 'usr-007', userName: 'Caroline F.', rating: 4, comment: 'Très bel appartement, la vue est extraordinaire. Un peu bruyant le week-end avec les bars en contrebas, mais l\'emplacement vaut vraiment le coup.', date: '2025-04-18', stayDate: 'Avril 2025' },
  { id: 'rev-008', listingId: 'lst-004', userId: 'usr-008', userName: 'Laurent V.', rating: 5, comment: 'Villa spectaculaire ! Les plages de Palombaggia et Santa Giulia sont paradisiaques. La maison est un havre de paix, parfaite pour un grand groupe.', date: '2025-05-20', stayDate: 'Mai 2025' },
  { id: 'rev-009', listingId: 'lst-005', userId: 'usr-009', userName: 'Françoise P.', rating: 5, comment: 'Gîte plein de charme, on se sent comme à la maison. Les marchés de Sarlat sont un régal. Idéal pour se ressourcer au calme.', date: '2025-04-30', stayDate: 'Avril 2025' },
  { id: 'rev-010', listingId: 'lst-005', userId: 'usr-010', userName: 'Michel H.', rating: 4, comment: 'Très agréable séjour. Le gîte est fidèle aux photos. Seul petit manque : la connexion Wi-Fi un peu faible dans les chambres.', date: '2025-03-22', stayDate: 'Mars 2025' },
  { id: 'rev-011', listingId: 'lst-006', userId: 'usr-011', userName: 'Emma K.', rating: 5, comment: 'Un rêve éveillé ! Les couchers de soleil depuis la piscine sont inoubliables. Oia est magique, et la villa est tout simplement parfaite.', date: '2025-05-15', stayDate: 'Mai 2025' },
  { id: 'rev-012', listingId: 'lst-007', userId: 'usr-012', userName: 'Julien C.', rating: 4, comment: 'Super maison pour des vacances surf. Proche de la plage, ambiance décontractée. Les enfants ont adoré. On reviendra l\'été prochain !', date: '2025-04-25', stayDate: 'Avril 2025' },
  { id: 'rev-013', listingId: 'lst-008', userId: 'usr-013', userName: 'Ana S.', rating: 5, comment: 'La finca est un joyau. L\'oliveraie, la piscine dans les rochers, la vue... Tout est exceptionnel. Un vrai coup de cœur pour Majorque.', date: '2025-05-10', stayDate: 'Mai 2025' },
  { id: 'rev-014', listingId: 'lst-009', userId: 'usr-014', userName: 'David M.', rating: 4, comment: 'Penthouse superbe, la terrasse est immense avec une vue folle. La Praia Dona Ana est effectivement une merveille. Très bon rapport qualité-prix.', date: '2025-05-22', stayDate: 'Mai 2025' },
  { id: 'rev-015', listingId: 'lst-010', userId: 'usr-015', userName: 'Nathalie J.', rating: 5, comment: 'Villa créole parfaite ! Le jardin tropical est magnifique, la piscine est un bonheur. La plage de la Caravelle à 5 min en voiture. Personnel de ménage adorable.', date: '2025-03-28', stayDate: 'Mars 2025' },
  { id: 'rev-016', listingId: 'lst-011', userId: 'usr-016', userName: 'Alain B.', rating: 5, comment: 'Bastide exceptionnelle pour notre réunion familiale de 14 personnes. Le parc est immense, le tennis apprécié. Chaque chambre a sa salle de bain. Un vrai palace.', date: '2025-05-01', stayDate: 'Avril 2025' },
  { id: 'rev-017', listingId: 'lst-012', userId: 'usr-017', userName: 'Stéphanie R.', rating: 4, comment: 'Très bon mobil-home pour le prix. Les enfants ont adoré le parc aquatique. La plage est accessible à pied. Parfait pour des vacances familiales sans prise de tête.', date: '2025-05-18', stayDate: 'Mai 2025' },
  { id: 'rev-018', listingId: 'lst-012', userId: 'usr-018', userName: 'Christophe D.', rating: 4, comment: 'Bien pour le budget. Mobil-home propre et fonctionnel. Les animations du camping sont top. Seul bémol : un peu chaud en journée malgré la clim.', date: '2025-04-28', stayDate: 'Avril 2025' },
];

// ============================================================
// Utility Functions
// ============================================================

export function getListingById(id: string): Listing | undefined {
  return mockListings.find((l) => l.id === id);
}

export function getReviewsForListing(listingId: string): Review[] {
  return mockReviews.filter((r) => r.listingId === listingId);
}

export function getSimilarListings(listing: Listing, limit = 4): Listing[] {
  return mockListings
    .filter(
      (l) =>
        l.id !== listing.id &&
        (l.location.region === listing.location.region ||
          l.type === listing.type ||
          Math.abs(l.pricePerNight - listing.pricePerNight) < 150)
    )
    .slice(0, limit);
}

export function searchListings(
  filters: Partial<SearchFilters> = {}
): Listing[] {
  let results = [...mockListings].filter(
    (l) => l.status === ListingStatus.ACTIVE
  );

  if (filters.destination) {
    const dest = filters.destination.toLowerCase();
    results = results.filter(
      (l) =>
        l.location.city.toLowerCase().includes(dest) ||
        l.location.region.toLowerCase().includes(dest) ||
        l.location.country.toLowerCase().includes(dest) ||
        (l.location.department &&
          l.location.department.toLowerCase().includes(dest))
    );
  }

  if (filters.guests && filters.guests > 0) {
    results = results.filter((l) => l.capacity >= (filters.guests ?? 0));
  }

  if (filters.types && filters.types.length > 0) {
    results = results.filter((l) => filters.types!.includes(l.type));
  }

  if (filters.minBedrooms && filters.minBedrooms > 0) {
    results = results.filter((l) => l.bedrooms >= (filters.minBedrooms ?? 0));
  }

  if (filters.minPrice && filters.minPrice > 0) {
    results = results.filter(
      (l) => l.pricePerNight >= (filters.minPrice ?? 0)
    );
  }

  if (filters.maxPrice && filters.maxPrice < 5000) {
    results = results.filter(
      (l) => l.pricePerNight <= (filters.maxPrice ?? 5000)
    );
  }

  if (filters.freeCancellation) {
    results = results.filter((l) => l.features.freeCancellation);
  }

  if (filters.petFriendly) {
    results = results.filter((l) => l.features.petFriendly);
  }

  if (filters.wifi) {
    results = results.filter((l) => l.features.wifi);
  }

  if (filters.airConditioning) {
    results = results.filter((l) => l.features.airConditioning);
  }

  if (filters.seaView) {
    results = results.filter((l) => l.features.seaView);
  }

  if (filters.nearBeach) {
    results = results.filter((l) => l.features.nearBeach);
  }

  if (filters.cleaningIncluded) {
    results = results.filter((l) => l.features.cleaningIncluded);
  }

  if (filters.pools && filters.pools.length > 0) {
    results = results.filter(
      (l) => l.features.pool && filters.pools!.includes(l.features.pool)
    );
  }

  // Sort
  switch (filters.sortBy) {
    case SortOption.PRICE_ASC:
      results.sort((a, b) => a.pricePerNight - b.pricePerNight);
      break;
    case SortOption.PRICE_DESC:
      results.sort((a, b) => b.pricePerNight - a.pricePerNight);
      break;
    case SortOption.RATING:
      results.sort((a, b) => b.rating - a.rating);
      break;
    case SortOption.SURFACE:
      results.sort((a, b) => b.surfaceArea - a.surfaceArea);
      break;
    case SortOption.NEWEST:
      results.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    default:
      // Pertinence: prioritize higher rating * reviewCount
      results.sort(
        (a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount
      );
  }

  return results;
}

export const totalListingCount = 152749;
