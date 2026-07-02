'use client';

import React, { useState } from 'react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'promo' | 'news' | 'urgent';
  pinned: boolean;
  createdAt: string;
  visible: boolean;
}

const TYPE_CONFIG = {
  info: { label: 'Information', icon: 'ℹ️', color: 'bg-blue-50 border-blue-200 text-blue-800' },
  promo: { label: 'Promotion', icon: '🎉', color: 'bg-sunset-50 border-sunset-200 text-sunset-800' },
  news: { label: 'Actualité', icon: '📰', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
  urgent: { label: 'Urgent', icon: '🚨', color: 'bg-red-50 border-red-200 text-red-800' },
};

const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Bienvenue sur Location Vacances !',
    content: 'Notre plateforme est désormais en ligne. Publiez vos premières annonces et commencez à recevoir des réservations.',
    type: 'news',
    pinned: true,
    createdAt: '2024-06-01T10:00:00Z',
    visible: true,
  },
  {
    id: '2',
    title: 'Promotion été 2024 — -15% sur les villas',
    content: 'Profitez de notre offre spéciale : -15% sur toutes les villas avec piscine pour les réservations du 1er juillet au 31 août 2024.',
    type: 'promo',
    pinned: false,
    createdAt: '2024-05-15T09:00:00Z',
    visible: true,
  },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(SAMPLE_ANNOUNCEMENTS);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'info' as Announcement['type'],
    pinned: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const resetForm = () => {
    setFormData({ title: '', content: '', type: 'info', pinned: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (ann: Announcement) => {
    setFormData({ title: ann.title, content: ann.content, type: ann.type, pinned: ann.pinned });
    setEditingId(ann.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleVisibility = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, visible: !a.visible } : a))
    );
  };

  const togglePin = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a))
    );
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));

    if (editingId) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? { ...a, ...formData, updatedAt: new Date().toISOString() }
            : a
        )
      );
    } else {
      const newAnn: Announcement = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        visible: true,
      };
      setAnnouncements((prev) => [newAnn, ...prev]);
    }

    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    resetForm();
  };

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">📢 Annonces & Actualités</h1>
          <p className="text-slate-500 text-sm">Publiez des annonces et actualités visibles sur le site.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary text-sm"
        >
          + Nouvelle annonce
        </button>
      </div>

      {/* Success toast */}
      {saved && (
        <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 animate-slide-down">
          <span className="text-emerald-500 text-lg">✅</span>
          <p className="text-emerald-700 text-sm font-semibold">Annonce enregistrée avec succès !</p>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-8 animate-slide-down">
          <h2 className="text-lg font-bold text-slate-800 mb-5">
            {editingId ? '✏️ Modifier l\'annonce' : '✏️ Nouvelle annonce'}
          </h2>

          <div className="flex flex-col gap-4">
            <div>
              <label className="input-label">Titre *</label>
              <input
                className="input-field"
                placeholder="Titre de l'annonce"
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                maxLength={120}
              />
            </div>

            <div>
              <label className="input-label">Contenu *</label>
              <textarea
                className="input-field min-h-[120px] resize-none"
                placeholder="Rédigez le contenu de votre annonce..."
                value={formData.content}
                onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Type</label>
                <select
                  className="input-field"
                  value={formData.type}
                  onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value as Announcement['type'] }))}
                >
                  {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.icon} {cfg.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 rounded-xl border border-slate-200 w-full hover:bg-slate-100 transition-colors">
                  <div
                    className={`w-10 h-5 rounded-full transition-colors relative ${formData.pinned ? 'bg-sunset-500' : 'bg-slate-300'}`}
                    onClick={() => setFormData((p) => ({ ...p, pinned: !p.pinned }))}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${formData.pinned ? 'left-5' : 'left-0.5'}`} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">📌 Épingler en haut</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || !formData.title.trim() || !formData.content.trim()}
                className="btn-primary text-sm disabled:opacity-50"
              >
                {isSaving ? '⏳ Enregistrement...' : editingId ? '💾 Mettre à jour' : '✅ Publier'}
              </button>
              <button type="button" onClick={resetForm} className="btn-outline text-sm">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="flex flex-col gap-4">
        {sortedAnnouncements.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <span className="text-5xl block mb-4">📭</span>
            <p className="font-medium">Aucune annonce pour le moment</p>
            <p className="text-sm mt-1">Cliquez sur &quot;Nouvelle annonce&quot; pour commencer.</p>
          </div>
        )}

        {sortedAnnouncements.map((ann) => {
          const cfg = TYPE_CONFIG[ann.type];
          return (
            <div
              key={ann.id}
              className={`rounded-2xl border p-5 transition-all ${!ann.visible ? 'opacity-50' : ''} ${cfg.color}`}
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-base">{cfg.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">{cfg.label}</span>
                    {ann.pinned && <span className="text-xs font-bold bg-white/60 px-2 py-0.5 rounded-full">📌 Épinglé</span>}
                    {!ann.visible && <span className="text-xs font-bold bg-white/60 px-2 py-0.5 rounded-full">🙈 Masqué</span>}
                  </div>
                  <h3 className="font-bold text-base leading-tight mb-1">{ann.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{ann.content}</p>
                  <p className="text-xs opacity-60 mt-2">
                    {new Date(ann.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => togglePin(ann.id)}
                    title={ann.pinned ? 'Désépingler' : 'Épingler'}
                    className="w-8 h-8 rounded-lg bg-white/60 hover:bg-white flex items-center justify-center text-sm transition-colors"
                  >
                    📌
                  </button>
                  <button
                    onClick={() => toggleVisibility(ann.id)}
                    title={ann.visible ? 'Masquer' : 'Afficher'}
                    className="w-8 h-8 rounded-lg bg-white/60 hover:bg-white flex items-center justify-center text-sm transition-colors"
                  >
                    {ann.visible ? '👁️' : '🙈'}
                  </button>
                  <button
                    onClick={() => handleEdit(ann)}
                    className="w-8 h-8 rounded-lg bg-white/60 hover:bg-white flex items-center justify-center text-sm transition-colors"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(ann.id)}
                    className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center text-sm transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
