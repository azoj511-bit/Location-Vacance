# Location Vacances 🏖️

Plateforme de locations de vacances professionnelles — 100% gérée par des agences certifiées.

## Stack Technique

- **Framework** : [Next.js 14](https://nextjs.org/) (App Router)
- **Styling** : [Tailwind CSS 3](https://tailwindcss.com/)
- **State Management** : [Zustand](https://github.com/pmndrs/zustand)
- **Langage** : TypeScript
- **Déploiement** : [Vercel](https://vercel.com)

---

## 🚀 Déploiement sur Vercel

### Prérequis
- Un compte [Vercel](https://vercel.com)
- Un dépôt GitHub/GitLab/Bitbucket

### Étapes

1. **Pousser le code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Location Vacances"
   git remote add origin https://github.com/VOTRE_USERNAME/location-vacances.git
   git push -u origin main
   ```

2. **Importer sur Vercel**
   - Aller sur [vercel.com/new](https://vercel.com/new)
   - Cliquer **"Import Git Repository"**
   - Sélectionner votre dépôt `location-vacances`
   - **Root Directory** : sélectionner `frontend/` (ou le dossier contenant `package.json`)

3. **Configurer les variables d'environnement** *(obligatoire)*
   
   Dans les paramètres Vercel > **Environment Variables**, ajouter :

   | Nom | Valeur | Description |
   |-----|--------|-------------|
   | `AGENCY_ADMIN_PASSWORD` | Votre mot de passe sécurisé | Mot de passe de l'espace agence |
   | `JWT_SECRET` | Une chaîne aléatoire de 32+ caractères | Secret pour les tokens |

   > ⚠️ **Important** : Ne jamais utiliser le mot de passe du fichier `.env.local` en production !

4. **Déployer**
   - Cliquer **"Deploy"**
   - Vercel détectera automatiquement Next.js

---

## 💻 Développement local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

---

## 🔐 Espace Agence Sécurisé

L'espace agence est accessible à `/agency/login`.

### Connexion
- **URL** : `/agency/login`
- **Mot de passe** : Défini dans `AGENCY_ADMIN_PASSWORD` (voir `.env.local` pour le dev)

### Fonctionnalités disponibles
- 📊 Tableau de bord avec statistiques
- 🏡 Gestion des locations (activation/désactivation)
- ✏️ **Publication d'annonces** (formulaire 6 étapes)
- 📢 **Gestion des annonces & actualités** (créer, modifier, supprimer, épingler)
- 🧳 Suivi des réservations
- 📅 Calendrier de disponibilités
- 💶 Reversements & finances
- ⚙️ Paramètres & KYC

### Sécurité
- ✅ Authentification par mot de passe serveur (jamais exposé côté client)
- ✅ Cookie `httpOnly` (inaccessible au JavaScript)
- ✅ Protection anti-brute-force (5 tentatives → verrouillage 30s)
- ✅ Session de 8 heures
- ✅ Middleware Next.js protège toutes les routes `/agency/*`

---

## 📁 Structure du Projet

```
frontend/
├── src/
│   ├── app/                    # App Router Next.js
│   │   ├── agency/             # Espace agence (protégé)
│   │   │   ├── login/          # Page de connexion
│   │   │   ├── dashboard/      # Tableau de bord
│   │   │   ├── publish/        # Publication d'annonces (NEW)
│   │   │   ├── announcements/  # Gestion annonces & actus (NEW)
│   │   │   ├── properties/     # Mes locations
│   │   │   ├── bookings/       # Réservations
│   │   │   ├── calendar/       # Calendrier
│   │   │   ├── payouts/        # Finances
│   │   │   └── settings/       # Paramètres
│   │   ├── api/
│   │   │   └── agency-auth/    # API d'authentification (NEW)
│   │   ├── listings/           # Pages d'annonces publiques
│   │   ├── destinations/       # Destinations
│   │   ├── blog/               # Blog & Guides
│   │   └── admin/              # Administration générale
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   └── ui/                 # Composants réutilisables
│   ├── data/                   # Données mock
│   ├── lib/                    # Store Zustand
│   ├── middleware.ts            # Protection des routes (NEW)
│   └── types/                  # TypeScript types
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── vercel.json                 # Config Vercel (NEW)
└── .env.local                  # Variables d'env locales
```

---

## 🌍 Routes publiques

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/listings` | Liste de toutes les locations |
| `/listings/[id]` | Détail d'une location |
| `/destinations` | Toutes les destinations |
| `/blog` | Blog & guides voyage |
| `/booking` | Réservation |
| `/agency/login` | Connexion espace agence |

---

*Développé pour Location Vacances © 2024*
