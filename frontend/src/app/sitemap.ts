import { MetadataRoute } from 'next';
import { mockListings } from '@/data/mock-listings';
import { mockDestinations } from '@/data/mock-destinations';
import { mockBlogPosts } from '@/data/mock-blog-posts';

const BASE_URL = 'https://www.location-vacances.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/listings`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/legal/conditions-generales`,
      lastModified: new Date('2025-06-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/legal/politique-confidentialite`,
      lastModified: new Date('2025-06-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/legal/mentions-legales`,
      lastModified: new Date('2025-05-15'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic listing pages
  const listingRoutes: MetadataRoute.Sitemap = mockListings.map((listing) => ({
    url: `${BASE_URL}/listings/${listing.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Dynamic destination pages
  const destinationRoutes: MetadataRoute.Sitemap = mockDestinations.map((dest) => ({
    url: `${BASE_URL}/destinations/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Blog articles (from mock data)
  const blogRoutes: MetadataRoute.Sitemap = mockBlogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...listingRoutes,
    ...destinationRoutes,
    ...blogRoutes,
  ];
}
