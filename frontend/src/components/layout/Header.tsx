'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { favorites, bookings } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch for store values
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/listings', label: 'Locations' },
    { href: '/blog', label: 'Blog & Guides' },
  ];

  const portalLinks = [
    { href: '/agency/dashboard', label: '🏢 Espace Agences', color: 'text-sunset-600 hover:text-sunset-700' },
    { href: '/admin/dashboard', label: '🔑 Administration', color: 'text-rose-600 hover:text-rose-700' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3 border-b border-slate-100'
          : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent py-5 text-white'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-sunset-500 flex items-center justify-center text-white shadow-md shadow-sunset-500/20 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
              ></path>
            </svg>
          </div>
          <div>
            <span
              className={`font-display text-2xl font-bold tracking-tight block ${
                scrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              Location Vacances
            </span>
            <span
              className={`text-[9px] uppercase tracking-wider block font-semibold -mt-1 ${
                scrolled ? 'text-sunset-500' : 'text-amber-300'
              }`}
            >
              Depuis 2006
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 hover:text-sunset-400 ${
                  isActive
                    ? scrolled
                      ? 'text-sunset-500'
                      : 'text-amber-300 border-b-2 border-amber-300 pb-0.5'
                    : scrolled
                    ? 'text-slate-600'
                    : 'text-slate-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Portal Quick Links */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-bold border-r border-white/20 pr-4 mr-1">
          {portalLinks.map(p => (
            <Link
              key={p.href}
              href={p.href}
              className={`${p.color} hover:underline transition-colors ${scrolled ? '' : 'text-white/80 hover:text-white'}`}
            >
              {p.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons & Contact */}
        <div className="hidden md:flex items-center gap-5">
          {/* Customer Service call */}
          <div
            className={`flex items-center gap-2 border-r pr-5 ${
              scrolled ? 'border-slate-200 text-slate-600' : 'border-white/20 text-slate-100'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-ocean-500/10 flex items-center justify-center text-ocean-500">
              <svg
                className="w-4 h-4 text-ocean-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
            </div>
            <div className="text-left">
              <span className="text-[10px] block opacity-80 font-medium">Service Client FR</span>
              <a href="tel:+33180400000" className="text-xs font-bold hover:underline block">
                01 80 40 00 00
              </a>
            </div>
          </div>

          {/* Favorites */}
          <Link
            href="/account?tab=favorites"
            className={`relative p-2 rounded-full hover:bg-slate-100/10 transition-colors ${
              scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-100 hover:text-white'
            }`}
            title="Mes Favoris"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            {mounted && favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-sunset-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Bookings & Account */}
          <Link
            href="/account"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              scrolled
                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/10 hover:-translate-y-0.5'
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:-translate-y-0.5'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <span>Mon Espace</span>
            {mounted && bookings.length > 0 && (
              <span className="bg-ocean-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {bookings.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-slate-850 hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl py-5 px-4 flex flex-col gap-4 animate-slide-down">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sunset-50 text-sunset-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          <div className="h-px bg-slate-100 my-1" />

          {/* Mobile Favorites */}
          <Link
            href="/account?tab=favorites"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between text-base font-semibold py-2 px-3 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span>Favoris</span>
            </div>
            {mounted && favorites.length > 0 && (
              <span className="bg-sunset-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Mobile Account */}
          <Link
            href="/account"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between text-base font-semibold py-2 px-3 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <span>Mon Espace Client</span>
            </div>
            {mounted && bookings.length > 0 && (
              <span className="bg-ocean-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {bookings.length}
              </span>
            )}
          </Link>

          <div className="h-px bg-slate-100 my-1" />

          {/* Mobile Portal Links */}
          <div className="flex flex-col gap-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-3 py-1">Portails professionnels</p>
            {portalLinks.map(p => (
              <Link
                key={p.href}
                href={p.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-bold py-2 px-3 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {p.label}
              </Link>
            ))}
          </div>

          <div className="h-px bg-slate-100 my-1" />

          {/* Callout Customer Service */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center text-ocean-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
            </div>
            <div>
              <span className="text-[11px] block text-slate-500 font-medium">Service client en France (Appel gratuit)</span>
              <a href="tel:+33180400000" className="text-sm font-bold text-slate-800 hover:underline">
                01 80 40 00 00 (7j/7)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
