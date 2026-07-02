'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';

interface LegalDoc {
  title: string;
  lastUpdated: string;
  content: React.ReactNode;
}

const legalDocs: Record<string, LegalDoc> = {
  'cgu': {
    title: "Conditions Générales d'Utilisation (CGU)",
    lastUpdated: "12 Juin 2026",
    content: (
      <div className="flex flex-col gap-6 text-sm text-slate-650 leading-relaxed font-medium">
        <p>Bienvenue sur Location Vacances. En accédant ou en utilisant notre plateforme, vous acceptez de respecter et d'être lié par les présentes Conditions Générales d'Utilisation. Veuillez les lire attentivement.</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">1. Objet de la Plateforme</h3>
        <p>Location Vacances est une place de marché (marketplace) mettant en relation des voyageurs et des agences immobilières professionnelles spécialisées dans la location saisonnière. Nous travaillons exclusivement avec des agences professionnelles certifiées pour garantir la fiabilité des annonces.</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">2. Accès et Utilisation du Service</h3>
        <p>L'utilisation de la plateforme nécessite la création d'un compte voyageur. Vous vous engagez à fournir des informations exactes et à les maintenir à jour. L'accès à la plateforme est gratuit, les frais liés à la réservation sont régis par nos CGV.</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">3. Propriété Intellectuelle</h3>
        <p>Tous les contenus présents sur le site (textes, images, logos, design) sont protégés par le droit d'auteur et sont la propriété exclusive de Location Vacances ou de ses agences partenaires. Toute reproduction ou distribution non autorisée constitue une contrefaçon.</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">4. Responsabilité</h3>
        <p>Bien que nous sélectionnions rigoureusement les agences professionnelles partenaires, chaque agence est seule responsable de l'exactitude des informations relatives à ses biens et de la bonne exécution du contrat de location.</p>
      </div>
    )
  },
  'cgv': {
    title: "Conditions Générales de Vente (CGV)",
    lastUpdated: "15 Juin 2026",
    content: (
      <div className="flex flex-col gap-6 text-sm text-slate-650 leading-relaxed font-medium">
        <p>Les présentes Conditions Générales de Vente régissent les réservations effectuées sur la plateforme Location Vacances. Toute réservation confirmée implique l'acceptation entière et sans réserve des présentes conditions.</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">1. Processus de Réservation</h3>
        <p>Le voyageur sélectionne son hébergement, ses dates et le nombre de voyageurs. Le prix calculé comprend le loyer, les frais de ménage, les frais de service Location Vacances et la taxe de séjour. La réservation est immédiate dès la validation du paiement sécurisé.</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">2. Modalités de Paiement</h3>
        <p>Le paiement s'effectue par carte bancaire de manière sécurisée via Stripe. Deux options sont proposées :</p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li><strong>Règlement total :</strong> 100% du montant est prélevé à la réservation.</li>
          <li><strong>Paiement de l'acompte :</strong> 30% d'acompte à la réservation et le solde de 70% prélevé automatiquement 30 jours avant le séjour.</li>
        </ul>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">3. Conditions d'Annulation (Garantie J-60)</h3>
        <p>Sauf mention contraire sur la fiche de l'annonce, l'annulation est entièrement gratuite jusqu'à 60 jours avant la date d'arrivée prévue (J-60). Dans ce cas, l'intégralité des sommes versées est remboursée au voyageur. En cas d'annulation après ce délai, des frais d'annulation progressifs s'appliquent conformément au contrat de l'agence.</p>
      </div>
    )
  },
  'mentions-legales': {
    title: "Mentions Légales",
    lastUpdated: "10 Juin 2026",
    content: (
      <div className="flex flex-col gap-6 text-sm text-slate-650 leading-relaxed font-medium">
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-2">1. Éditeur du Site</h3>
        <p>Le site Location Vacances est édité par la société <strong>Location Vacances SAS</strong>, société par actions simplifiée au capital de 150 000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro RCS 489 123 456. Siège social : 12 Avenue des Champs-Élysées, 75008 Paris, France.</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">2. Direction de la Publication</h3>
        <p>Directeur de la publication : M. Marc Lemonnier, Président de Location Vacances SAS.</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">3. Hébergement</h3>
        <p>Le site est hébergé en Union Européenne par la société Scaleway SAS, BP 438, 75366 Paris Cedex 08, France (Téléphone : +33 1 84 13 00 00).</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">4. Cartographie & Données</h3>
        <p>L'affichage cartographique utilise les fonds de carte Mapbox. Les avis publiés font l'objet d'un processus de vérification interne strict lié aux séjours effectivement réalisés.</p>
      </div>
    )
  },
  'confidentialite': {
    title: "Politique de Confidentialité & Cookies",
    lastUpdated: "18 Juin 2026",
    content: (
      <div className="flex flex-col gap-6 text-sm text-slate-650 leading-relaxed font-medium">
        <p>Location Vacances attache une grande importance à la protection de vos données personnelles et au respect du Règlement Général sur la Protection des Données (RGPD).</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">1. Collecte des Données</h3>
        <p>Nous collectons les données indispensables au traitement de vos réservations (nom, prénom, adresse email, numéro de téléphone) ainsi que vos préférences de navigation. Les informations de carte bancaire sont traitées de manière chiffrée directement par notre prestataire de paiement Stripe (norme PCI-DSS).</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">2. Utilisation des Données</h3>
        <p>Vos données sont principalement utilisées pour valider vos séjours, faciliter les échanges avec l'agence immobilière responsable de votre hébergement et assurer l'assistance de notre service client basé en France.</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">3. Vos Droits (RGPD)</h3>
        <p>Vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données personnelles. Vous pouvez exercer ces droits directement depuis votre Espace Personnel (onglet Profil) ou en contactant notre délégué à la protection des données (DPO) à l'adresse dpo@location-vacances.com.</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">4. Gestion des Cookies</h3>
        <p>Nous utilisons des cookies techniques nécessaires au fonctionnement du site (session, authentification, panier de réservation) ainsi que des cookies d'analyse d'audience (Google Analytics) si vous y consentez via notre bannière.</p>
      </div>
    )
  },
  'mediation': {
    title: "Médiation et Litiges",
    lastUpdated: "08 Juin 2026",
    content: (
      <div className="flex flex-col gap-6 text-sm text-slate-650 leading-relaxed font-medium">
        <p>En cas de réclamation ou de litige concernant une réservation ou l'exécution d'un séjour, le voyageur doit s'adresser en priorité à notre service client à l'adresse support@location-vacances.com.</p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">1. Recours à un Médiateur</h3>
        <p>Conformément aux dispositions du Code de la consommation, si aucun accord amiable n'est trouvé après une réclamation écrite préalable, le voyageur peut saisir gratuitement le médiateur de la consommation agréé dont relève Location Vacances :</p>
        <p className="bg-slate-50 border border-slate-150 p-4 rounded-2xl font-bold text-slate-800">
          Médiation Tourisme et Voyage (MTV)<br />
          BP 80303, 75823 Paris Cedex 17<br />
          Site internet : www.mtv.travel
        </p>
        
        <h3 className="text-lg font-bold font-sans text-slate-900 mt-4">2. Plateforme européenne de Règlement en Ligne des Litiges (RLL)</h3>
        <p>Pour les litiges transfrontaliers au sein de l'Union Européenne, la Commission Européenne met à disposition une plateforme de résolution en ligne accessible à l'adresse suivante : https://ec.europa.eu/consumers/odr/.</p>
      </div>
    )
  }
};

export default function LegalPage() {
  const { slug } = useParams() as { slug: string };
  const doc = legalDocs[slug];

  if (!doc) {
    return notFound();
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-slate-400 font-bold mb-6 uppercase tracking-wide">
          <Link href="/" className="hover:text-slate-650 transition-colors">Location Vacances</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-slate-500">Informations légales</span>
        </nav>

        {/* Paper style document container */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm">
          <span className="text-[10px] text-sunset-500 font-black uppercase tracking-wider block mb-2">
            Location Vacances Legal Center
          </span>
          <h1 className="text-2xl md:text-3xl font-display font-black text-slate-950 tracking-tight leading-tight mb-2">
            {doc.title}
          </h1>
          <span className="text-xs text-slate-400 font-bold block mb-8 border-b border-slate-100 pb-4">
            Dernière mise à jour : {doc.lastUpdated}
          </span>

          {doc.content}
        </div>

        {/* Quick Links Footer */}
        <div className="mt-10 flex flex-wrap gap-4 text-xs font-bold text-slate-400 justify-center">
          {Object.entries(legalDocs).map(([key, value]) => {
            if (key === slug) return null;
            return (
              <Link key={key} href={`/legal/${key}`} className="hover:text-slate-650 underline">
                {value.title.split(' (')[0]}
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
