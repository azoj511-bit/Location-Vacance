import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/ui/CookieConsent';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Location Vacances | Locations de Vacances 100% Fiables & Agences Pro',
  description: 'Trouvez l\'hébergement idéal pour vos vacances sur Location Vacances. Plus de 150 000 locations saisonnières de standing (villas avec piscine, maisons, appartements) gérées par des agences professionnelles certifiées. Annulation flexible et service client en France.',
  keywords: ['location vacances', 'villa piscine', 'location saisonniere', 'location agence professionnelle', 'france', 'espagne', 'italie', 'portugal'],
  openGraph: {
    title: 'Location Vacances | Trouvez l\'hébergement idéal pour vos vacances',
    description: 'Plus de 150 000 locations saisonnières de standing gérées par des agences professionnelles certifiées.',
    url: 'https://www.location-vacances.com',
    siteName: 'Location Vacances',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen bg-[#FAFAF8] antialiased">
        {/* Schema.org Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Location Vacances",
                "url": "https://www.location-vacances.com",
                "logo": "https://www.location-vacances.com/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+33-1-80-40-00-00",
                  "contactType": "customer service",
                  "availableLanguage": "French",
                  "areaServed": "FR"
                },
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "FR"
                },
                "sameAs": [
                  "https://www.facebook.com/locationvacances",
                  "https://www.instagram.com/locationvacances"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Location Vacances",
                "url": "https://www.location-vacances.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://www.location-vacances.com/listings?search={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              }
            ])
          }}
        />
        <Header />
        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
