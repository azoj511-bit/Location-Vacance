'use client';

import React, { useState } from 'react';

export default function AgencySettingsPage() {
  const [agencyName, setAgencyName] = useState('Azur Premium Immobilier');
  const [email, setEmail] = useState('contact@azur-premium.com');
  const [phone, setPhone] = useState('04 94 97 00 00');
  const [address, setAddress] = useState('14 Place des Lices, 83990 Saint-Tropez, France');
  const [saved, setSaved] = useState(false);

  // KYC verification list status states
  const [kycDocuments, setKycDocuments] = useState([
    { name: "Pièce d'identité du gérant", status: "Vérifié", date: "12 Mai 2026", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { name: "Extrait Kbis de la société (moins de 3 mois)", status: "En attente", date: "24 Juin 2026", color: "text-amber-700 bg-amber-50 border-amber-200" },
    { name: "Relevé d'Identité Bancaire (RIB/IBAN)", status: "Vérifié", date: "12 Mai 2026", color: "text-emerald-700 bg-emerald-50 border-emerald-200" }
  ]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleUploadKbis = () => {
    // Simulate uploading Kbis document
    setKycDocuments((prev) =>
      prev.map((d) =>
        d.name.includes("Kbis")
          ? { ...d, status: "Vérifié", date: "À l'instant", color: "text-emerald-700 bg-emerald-50 border-emerald-200" }
          : d
      )
    );
    alert('Le document KBIS a été téléversé avec succès ! Notre équipe d\'administration va procéder à la vérification.');
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in text-xs font-semibold text-slate-700">
      
      {/* Title */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight leading-snug">
          Paramètres & Vérification KYC
        </h1>
        <p className="text-xs text-slate-500 font-semibold mt-0.5">
          Gérez votre profil d'agence immobilière et tenez vos documents de conformité légale à jour.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Settings form (Left, 7 cols) */}
        <form onSubmit={handleSaveSettings} className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
          <h3 className="text-sm font-bold font-sans text-slate-800 border-b border-slate-50 pb-2">Informations Générales</h3>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-slate-500 uppercase tracking-wide">Nom de l'agence immobilière</label>
            <input
              type="text"
              required
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-500 uppercase tracking-wide">Adresse email publique</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-500 uppercase tracking-wide">Numéro de téléphone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-slate-500 uppercase tracking-wide">Adresse postale du bureau</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold"
            />
          </div>

          <div className="flex items-center gap-4 border-t border-slate-50 pt-4 mt-2">
            <button type="submit" className="btn-primary px-8 py-3 text-xs font-bold">
              Enregistrer les modifications
            </button>
            {saved && (
              <span className="text-[11px] text-emerald-600 font-bold animate-fade-in">
                ✓ Profil mis à jour avec succès !
              </span>
            )}
          </div>
        </form>

        {/* KYC Compliance files checklist (Right, 5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
          <div>
            <h3 className="text-sm font-bold font-sans text-slate-800 border-b border-slate-50 pb-2">Vérification de Conformité (KYC)</h3>
            <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed font-semibold">
              En vertu de la réglementation financière européenne, vous devez prouver l'existence légale de votre agence professionnelle avant de recevoir vos reversements bancaires.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {kycDocuments.map((doc, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-150 flex items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-700 block">{doc.name}</span>
                  <span className="text-[9px] text-slate-400 block font-semibold mt-0.5">Mis à jour le {doc.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge text-[9px] py-0.5 px-2 uppercase font-black border ${doc.color}`}>
                    {doc.status}
                  </span>
                  {doc.status === "En attente" && (
                    <button
                      onClick={handleUploadKbis}
                      className="p-1 bg-white hover:bg-slate-100 border border-slate-250 rounded-lg text-xs font-bold"
                      title="Remplacer le document"
                    >
                      📤
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Secure disclaimer */}
          <div className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-wide leading-relaxed border-t border-slate-50 pt-4 text-center">
            🛡️ Données stockées de manière chiffrée en Union Européenne.
          </div>
        </div>

      </div>

    </div>
  );
}
