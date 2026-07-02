'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/agency/dashboard';

  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  // Gestion du verrouillage temporaire après plusieurs tentatives échouées
  useEffect(() => {
    if (attempts >= 5) {
      setIsLocked(true);
      setLockTimer(30);
      const interval = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsLocked(false);
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [attempts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) return;
    if (!password.trim()) {
      setError('Veuillez saisir le mot de passe.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/agency-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(redirectTo);
        router.refresh();
      } else {
        setAttempts((prev) => prev + 1);
        setError(data.message || 'Mot de passe incorrect.');
        setPassword('');
      }
    } catch {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 flex-col justify-between p-12 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80"
            alt="Villa de luxe"
            fill
            className="object-cover opacity-30"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/80 to-sunset-900/40" />
        </div>

        {/* Logo & Brand */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="w-12 h-12 rounded-2xl bg-sunset-500 flex items-center justify-center text-white shadow-lg shadow-sunset-500/30 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-none block">Location Vacances</span>
              <span className="text-sunset-400 text-xs font-semibold tracking-wider">ESPACE AGENCE</span>
            </div>
          </Link>
        </div>

        {/* Middle Content */}
        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Gérez vos locations<br />
              <span className="text-sunset-400">en toute simplicité</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Publiez vos annonces, suivez vos réservations et gérez votre calendrier depuis un espace sécurisé dédié aux agences partenaires.
            </p>
          </div>

          {/* Features list */}
          <div className="flex flex-col gap-4">
            {[
              { icon: '🏡', title: 'Publication d\'annonces', desc: 'Ajoutez et modifiez vos propriétés facilement' },
              { icon: '📅', title: 'Calendrier intégré', desc: 'Gérez les disponibilités en temps réel' },
              { icon: '📊', title: 'Tableau de bord', desc: 'Suivez vos performances et revenus' },
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="relative z-10">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Location Vacances. Accès réservé aux administrateurs agences.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-[#FAFAF8]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sunset-500 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="font-bold text-slate-900 text-lg">Location Vacances</span>
            </Link>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-5 shadow-lg">
                <svg className="w-7 h-7 text-sunset-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Espace Agence</h2>
              <p className="text-slate-500 text-sm">
                Accès réservé aux administrateurs de l&apos;agence. Entrez votre mot de passe pour continuer.
              </p>
            </div>

            {/* Security badges */}
            <div className="flex items-center gap-3 mb-6 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
              <span className="text-emerald-500 text-lg">🔒</span>
              <p className="text-emerald-700 text-xs font-medium">
                Connexion sécurisée — Session chiffrée de 8 heures
              </p>
            </div>

            {/* Lock warning */}
            {isLocked && (
              <div className="mb-5 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
                <span className="text-rose-500 text-lg">⚠️</span>
                <div>
                  <p className="text-rose-700 text-sm font-semibold">Trop de tentatives</p>
                  <p className="text-rose-600 text-xs mt-0.5">
                    Réessayez dans {lockTimer} secondes.
                  </p>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && !isLocked && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-slide-down">
                <span className="text-red-500 text-base">❌</span>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="password" className="input-label">
                  Mot de passe administrateur
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Saisissez votre mot de passe"
                    className="input-field pr-12"
                    disabled={isLocked || isLoading}
                    autoComplete="current-password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {attempts > 0 && attempts < 5 && (
                  <p className="text-xs text-amber-600 mt-1.5 font-medium">
                    {5 - attempts} tentative(s) restante(s) avant verrouillage temporaire.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || isLocked || !password.trim()}
                className="btn-primary w-full py-3.5 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                id="agency-login-submit"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Vérification...
                  </span>
                ) : isLocked ? (
                  `Bloqué (${lockTimer}s)`
                ) : (
                  '🔑 Accéder à l\'espace agence'
                )}
              </button>
            </form>

            {/* Back to site */}
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <Link
                href="/"
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors inline-flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour au site
              </Link>
            </div>
          </div>

          {/* Security info */}
          <p className="mt-6 text-center text-xs text-slate-400 leading-relaxed">
            Cet espace est réservé aux administrateurs de l&apos;agence.<br />
            Toutes les tentatives de connexion sont enregistrées.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AgencyLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="animate-spin w-10 h-10 border-t-2 border-sunset-500 rounded-full"></div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
