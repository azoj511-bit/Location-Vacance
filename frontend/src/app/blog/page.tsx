'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { mockBlogPosts } from '@/data/mock-blog-posts';

export default function BlogPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sunset-500 font-black text-xs uppercase tracking-widest block mb-2">
            Guides & Inspirations
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 leading-tight">
            Le Blog de vos Vacances Soleil
          </h1>
          <p className="text-sm md:text-base text-slate-500 mt-4 leading-relaxed font-semibold">
            Découvrez nos conseils de voyage, sélections de propriétés uniques et secrets locaux pour faire de votre séjour une expérience mémorable.
          </p>
        </div>

        {/* Featured Post */}
        {mockBlogPosts.length > 0 && (
          <div className="mb-12">
            <Link
              href={`/blog/${mockBlogPosts[0].slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] w-full bg-slate-100 overflow-hidden min-h-[300px]">
                <Image
                  src={mockBlogPosts[0].image}
                  alt={mockBlogPosts[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-center gap-4">
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="badge bg-sunset-500 text-white">{mockBlogPosts[0].tag}</span>
                  <span className="text-slate-400">• {mockBlogPosts[0].readTime} de lecture</span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-black text-slate-900 group-hover:text-sunset-500 transition-colors leading-tight">
                  {mockBlogPosts[0].title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed font-semibold line-clamp-3">
                  {mockBlogPosts[0].summary}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                  <div className="text-xs text-slate-400 font-semibold">
                    <span>Par {mockBlogPosts[0].author}</span>
                  </div>
                  <span className="text-xs font-bold text-sunset-500 flex items-center gap-1">
                    Lire le guide <span className="text-sm">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogPosts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1 gap-3 justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="badge bg-slate-900 text-white">{post.tag}</span>
                    <span className="text-slate-400">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold font-sans text-slate-900 group-hover:text-sunset-500 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-2 text-xs font-semibold text-slate-400">
                  <span>{post.date}</span>
                  <span className="text-sunset-500 font-bold flex items-center gap-1 group-hover:underline">
                    Lire <span className="text-sm">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
