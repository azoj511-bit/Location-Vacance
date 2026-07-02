import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Mot de passe requis.' },
        { status: 400 }
      );
    }

    // Récupérer le mot de passe depuis les variables d'environnement
    const adminPassword = process.env.AGENCY_ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('AGENCY_ADMIN_PASSWORD not configured');
      return NextResponse.json(
        { success: false, message: 'Configuration serveur manquante.' },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      // Délai anti-brute force
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json(
        { success: false, message: 'Mot de passe incorrect.' },
        { status: 401 }
      );
    }

    // Authentification réussie - créer la réponse avec le cookie de session
    const response = NextResponse.json(
      { success: true, message: 'Connexion réussie.' },
      { status: 200 }
    );

    // Définir le cookie de session (httpOnly pour la sécurité)
    response.cookies.set('agency_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 heures
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  // Déconnexion : supprimer le cookie de session
  const response = NextResponse.json(
    { success: true, message: 'Déconnexion réussie.' },
    { status: 200 }
  );

  response.cookies.set('agency_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}
