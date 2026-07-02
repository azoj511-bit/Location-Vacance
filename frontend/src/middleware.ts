import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes protégées qui nécessitent une authentification agence
const PROTECTED_AGENCY_ROUTES = ['/agency'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si la route est protégée
  const isAgencyRoute = PROTECTED_AGENCY_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  if (isAgencyRoute) {
    // Vérifier le cookie de session agence
    const agencySession = request.cookies.get('agency_session');

    if (!agencySession || agencySession.value !== 'authenticated') {
      // Rediriger vers la page de connexion agence
      const loginUrl = new URL('/agency/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protéger toutes les routes /agency sauf /agency/login
    '/agency/((?!login).*)',
  ],
};
