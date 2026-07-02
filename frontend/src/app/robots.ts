import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/agency/',
          '/account/',
          '/api/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/agency/',
          '/account/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://www.location-vacances.com/sitemap.xml',
    host: 'https://www.location-vacances.com',
  };
}
