export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  image: string;
  tag: string;
  readTime: string;
  date: string;
  author: string;
}

export const mockBlogPosts: BlogPost[] = [
  {
    slug: 'guide-saint-tropez-villas-luxe',
    title: "Saint-Tropez : Les plus belles villas avec piscine à débordement",
    summary: "Découvrez notre sélection exclusive de villas contemporaines et provençales perchées sur les hauteurs de Saint-Tropez, offrant des vues mers spectaculaires.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
    tag: "Côte d'Azur",
    readTime: "5 min",
    date: "24 Juin 2026",
    author: "Alice Chevalier"
  },
  {
    slug: 'visiter-gordes-charme-luberon',
    title: "Gordes et le Luberon : Mas authentiques en pierres et champs de lavande",
    summary: "Plongez au cœur de l'un des plus beaux villages de France. Gîtes de charme, marchés locaux, et adresses secrètes pour un séjour en Provence inoubliable.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a8?auto=format&fit=crop&w=600&q=80",
    tag: "Provence",
    readTime: "7 min",
    date: "20 Juin 2026",
    author: "Pierre Vaneau"
  },
  {
    slug: 'biarritz-ocean-surf-gastronomie',
    title: "Biarritz : Entre océan, sessions de surf et gastronomie basque",
    summary: "Des appartements design vue mer à la Grande Plage aux halles animées, notre guide complet pour savourer la douceur de vivre du Pays Basque.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    tag: "Pays Basque",
    readTime: "4 min",
    date: "18 Juin 2026",
    author: "Chloé Lartigue"
  },
  {
    slug: 'corse-sud-plages-paradisiaques',
    title: "Corse du Sud : Guide ultime des plages de Palombaggia et Santa Giulia",
    summary: "Roches rouges, maquis odorant, sable blanc et eaux turquoises... Comment organiser votre séjour de rêve dans nos propriétés exclusives en Corse.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    tag: "Corse",
    readTime: "6 min",
    date: "15 Juin 2026",
    author: "Marc-Antoine Paoli"
  }
];
