'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockBlogPosts } from '@/data/mock-blog-posts';
import { mockListings } from '@/data/mock-listings';
import ListingCard from '@/components/ui/ListingCard';

export default function BlogPostDetailPage() {
  const { slug } = useParams() as { slug: string };
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  // Find related listings based on the tag matching location city or region
  const relatedListings = mockListings
    .filter((listing) => 
      listing.location.region.toLowerCase().includes(post.tag.toLowerCase()) ||
      listing.location.city.toLowerCase().includes(post.tag.toLowerCase())
    )
    .slice(0, 3);

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-slate-400 font-bold mb-6 uppercase tracking-wide">
          <Link href="/" className="hover:text-slate-650 transition-colors">Location Vacances</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/blog" className="hover:text-slate-650 transition-colors">Blog</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-slate-500 truncate max-w-[200px] inline-block align-bottom">{post.title}</span>
        </nav>

        {/* Article Layout */}
        <article className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm mb-12">
          {/* Cover Image */}
          <div className="relative aspect-[2/1] w-full bg-slate-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
            {/* Tag overlay */}
            <span className="absolute top-6 left-6 badge bg-slate-900 text-white font-bold text-xs uppercase px-3 py-1 shadow">
              {post.tag}
            </span>
          </div>

          <div className="p-6 md:p-10">
            {/* Meta */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-4 border-b border-slate-100 pb-4">
              <span>Publié le {post.date}</span>
              <span>•</span>
              <span>Temps de lecture : {post.readTime}</span>
              <span>•</span>
              <span className="text-slate-700">Par {post.author}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-display font-black text-slate-950 tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            {/* Styled Body Content */}
            <div className="flex flex-col gap-6 text-sm md:text-base text-slate-650 leading-relaxed font-medium">
              <p className="text-lg font-semibold text-slate-800 leading-normal border-l-4 border-sunset-500 pl-4 my-2">
                {post.summary}
              </p>
              
              <p>Partir au soleil, c'est avant tout s'offrir une parenthèse de sérénité. Dans ce guide complet, nous avons exploré pour vous les recoins les plus captivants et sélectionné les hébergements les plus remarquables pour vous assurer un séjour parfait, entièrement géré par nos agences partenaires certifiées sur place.</p>
              
              <h3 className="text-xl font-bold font-sans text-slate-900 mt-6 mb-2">Les incontournables de la région</h3>
              <p>Chaque recoin de cette destination regorge de merveilles naturelles et culturelles. Que vous soyez adepte du farniente sur le sable chaud, passionné d'architecture ancienne ou explorateur culinaire désireux de déguster des produits de terroir, vous trouverez une multitude d'activités pour rythmer vos journées ensoleillées.</p>
              
              <h3 className="text-xl font-bold font-sans text-slate-900 mt-6 mb-2">Choisir le bon hébergement professionnel</h3>
              <p>Opter pour un hébergement géré par une agence immobilière professionnelle vous prémunit contre les mauvaises surprises. L'état des lieux rigoureux, le linge de maison fourni et l'assistance locale en cas de problème technique vous garantissent une totale tranquillité d'esprit pendant toute la durée de vos vacances.</p>
              
              <p className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed mt-4">
                💡 <strong>Conseil Location Vacances :</strong> Réservez vos activités locales et visites guidées en avance lors de la haute saison pour éviter les files d'attente et vous assurer des vacances relaxantes.
              </p>
            </div>
          </div>
        </article>

        {/* Related Listings Callout */}
        {relatedListings.length > 0 && (
          <div className="border-t border-slate-200/80 pt-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-sunset-500 font-black text-xs uppercase tracking-widest block mb-1">
                  Inspirations locations
                </span>
                <h2 className="text-xl md:text-2xl font-display font-black text-slate-900">
                  Locations de standing à {post.tag}
                </h2>
              </div>
              <Link href={`/listings?destination=${encodeURIComponent(post.tag)}`} className="text-xs font-bold text-sunset-500 hover:underline">
                Voir tout →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedListings.map((listing) => (
                <div key={listing.id} className="scale-95 hover:scale-100 transition-all duration-300">
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
