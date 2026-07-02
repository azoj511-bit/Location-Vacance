'use client';

import React, { useState } from 'react';

type ContentType = 'legal' | 'blog';
type ContentStatus = 'published' | 'draft' | 'archived';

interface CmsContent {
  id: string;
  type: ContentType;
  slug: string;
  title: string;
  status: ContentStatus;
  lastModified: string;
  author: string;
  wordCount: number;
}

const initialContent: CmsContent[] = [
  { id: 'cms-001', type: 'legal', slug: 'conditions-generales', title: 'Conditions Générales de Vente', status: 'published', lastModified: '01/06/2025', author: 'Admin Location Vacances', wordCount: 2840 },
  { id: 'cms-002', type: 'legal', slug: 'politique-confidentialite', title: 'Politique de Confidentialité (RGPD)', status: 'published', lastModified: '01/06/2025', author: 'Admin Location Vacances', wordCount: 3120 },
  { id: 'cms-003', type: 'legal', slug: 'mentions-legales', title: 'Mentions Légales', status: 'published', lastModified: '15/05/2025', author: 'Admin Location Vacances', wordCount: 980 },
  { id: 'cms-004', type: 'legal', slug: 'charte-agences', title: 'Charte des Agences Partenaires', status: 'draft', lastModified: '20/06/2025', author: 'Camille Moreau', wordCount: 1540 },
  { id: 'cms-005', type: 'blog', slug: 'top-10-villas-provence', title: 'Top 10 des villas en Provence avec piscine', status: 'published', lastModified: '18/06/2025', author: 'Camille Moreau', wordCount: 1850 },
  { id: 'cms-006', type: 'blog', slug: 'guide-corse-ete', title: 'Guide complet : louer en Corse cet été', status: 'published', lastModified: '15/06/2025', author: 'Camille Moreau', wordCount: 2100 },
  { id: 'cms-007', type: 'blog', slug: 'vacances-montagne-hiver', title: 'Meilleures destinations montagne pour l\'hiver 2025', status: 'draft', lastModified: '22/06/2025', author: 'Admin Location Vacances', wordCount: 920 },
  { id: 'cms-008', type: 'blog', slug: 'conseils-location-famille', title: '8 conseils pour louer en famille au bord de la mer', status: 'archived', lastModified: '01/01/2025', author: 'Camille Moreau', wordCount: 1230 },
];

const statusConfig: Record<ContentStatus, { label: string; color: string; bg: string }> = {
  published: { label: 'Publié', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  draft:     { label: 'Brouillon', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  archived:  { label: 'Archivé', color: 'text-slate-500', bg: 'bg-slate-100 border-slate-200' },
};

export default function AdminCmsPage() {
  const [contents, setContents] = useState<CmsContent[]>(initialContent);
  const [typeFilter, setTypeFilter] = useState<ContentType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ContentStatus | 'all'>('all');
  const [editing, setEditing] = useState<CmsContent | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [editorTitle, setEditorTitle] = useState('');
  const [editorSlug, setEditorSlug] = useState('');
  const [editorStatus, setEditorStatus] = useState<ContentStatus>('draft');
  const [editorType, setEditorType] = useState<ContentType>('blog');

  const filtered = contents.filter(c => {
    const matchType = typeFilter === 'all' || c.type === typeFilter;
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchType && matchStatus;
  });

  const openEditor = (content: CmsContent) => {
    setEditing(content);
    setIsNew(false);
    setEditorTitle(content.title);
    setEditorSlug(content.slug);
    setEditorStatus(content.status);
    setEditorType(content.type);
    setEditorContent(`# ${content.title}\n\nContenu fictif pour la démonstration. En production, le texte complet du document sera chargé depuis la base de données.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae nunc sit amet nisi viverra faucibus quis at purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`);
  };

  const openNewEditor = () => {
    setEditing(null);
    setIsNew(true);
    setEditorTitle('');
    setEditorSlug('');
    setEditorStatus('draft');
    setEditorType('blog');
    setEditorContent('');
  };

  const handleSave = () => {
    const wordCount = editorContent.trim().split(/\s+/).length;
    const today = new Date().toLocaleDateString('fr-FR');
    if (isNew) {
      const newItem: CmsContent = {
        id: `cms-${Date.now()}`,
        type: editorType,
        slug: editorSlug || editorTitle.toLowerCase().replace(/\s+/g, '-'),
        title: editorTitle,
        status: editorStatus,
        lastModified: today,
        author: 'Admin Location Vacances',
        wordCount,
      };
      setContents(prev => [newItem, ...prev]);
    } else if (editing) {
      setContents(prev => prev.map(c =>
        c.id === editing.id
          ? { ...c, title: editorTitle, slug: editorSlug, status: editorStatus, lastModified: today, wordCount }
          : c
      ));
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    setContents(prev => prev.filter(c => c.id !== id));
  };

  const handlePublishToggle = (id: string) => {
    setContents(prev => prev.map(c =>
      c.id === id
        ? { ...c, status: c.status === 'published' ? 'draft' : 'published', lastModified: new Date().toLocaleDateString('fr-FR') }
        : c
    ));
  };

  const showEditor = editing !== null || isNew;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-display font-black text-slate-950 tracking-tight">Gestion CMS</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Éditez les pages légales, articles de blog et tous les contenus éditoriaux de la plateforme.</p>
        </div>
        <button
          onClick={openNewEditor}
          className="px-5 py-2.5 bg-slate-950 text-white font-bold text-xs rounded-2xl hover:bg-slate-800 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          ✍️ Nouveau contenu
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 text-center text-xs font-bold">
        {[
          { label: 'Pages légales', value: contents.filter(c => c.type === 'legal').length, icon: '⚖️' },
          { label: 'Articles blog', value: contents.filter(c => c.type === 'blog').length, icon: '✍️' },
          { label: 'Publiés', value: contents.filter(c => c.status === 'published').length, icon: '✅', color: 'text-emerald-700' },
          { label: 'Brouillons', value: contents.filter(c => c.status === 'draft').length, icon: '📝', color: 'text-amber-700' },
          { label: 'Archivés', value: contents.filter(c => c.status === 'archived').length, icon: '🗃️' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl py-4 px-3 shadow-sm">
            <div className="text-xl mb-1">{s.icon}</div>
            <div className={`text-xl font-black leading-none ${s.color || 'text-slate-900'}`}>{s.value}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {(['all', 'legal', 'blog'] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-4 py-1.5 rounded-lg transition-all ${typeFilter === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {t === 'all' ? 'Tous types' : t === 'legal' ? '⚖️ Légal' : '✍️ Blog'}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {(['all', 'published', 'draft', 'archived'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-4 py-1.5 rounded-lg transition-all ${statusFilter === s ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {s === 'all' ? 'Tous statuts' : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filtered.map(item => {
            const sCfg = statusConfig[item.status];
            return (
              <div key={item.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${item.type === 'legal' ? 'bg-indigo-50 border border-indigo-200' : 'bg-sunset-50 border border-sunset-200'}`}>
                  {item.type === 'legal' ? '⚖️' : '✍️'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 truncate">{item.title}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">/{item.slug} · {item.wordCount} mots · Par {item.author}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${sCfg.bg} ${sCfg.color}`}>{sCfg.label}</span>
                  <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap hidden md:block">{item.lastModified}</span>
                  <button onClick={() => openEditor(item)} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold text-[10px] rounded-xl hover:bg-slate-200 transition-colors">Éditer</button>
                  <button onClick={() => handlePublishToggle(item.id)}
                    className={`px-3 py-1.5 font-bold text-[10px] rounded-xl transition-colors ${item.status === 'published' ? 'bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100' : 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100'}`}>
                    {item.status === 'published' ? 'Dépublier' : 'Publier'}
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-rose-400 hover:text-rose-600 transition-colors text-lg leading-none">🗑</button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-6 py-12 text-center text-slate-400 font-bold">Aucun contenu trouvé.</div>
          )}
        </div>
      </div>

      {/* Full-Screen Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-stretch justify-center">
          <div className="bg-white w-full max-w-4xl flex flex-col shadow-2xl animate-fade-in">
            {/* Editor Toolbar */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-slate-100 shrink-0">
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-slate-400 hover:text-slate-700 text-xl leading-none shrink-0">✕</button>
              <div className="flex gap-2 flex-1 flex-wrap">
                <select value={editorType} onChange={e => setEditorType(e.target.value as ContentType)}
                  className="text-xs font-bold px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none">
                  <option value="blog">Article Blog</option>
                  <option value="legal">Page Légale</option>
                </select>
                <select value={editorStatus} onChange={e => setEditorStatus(e.target.value as ContentStatus)}
                  className="text-xs font-bold px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none">
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
              <button onClick={handleSave}
                className="px-5 py-2 bg-slate-950 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shrink-0">
                💾 Enregistrer
              </button>
            </div>

            {/* Title & Slug */}
            <div className="px-8 py-6 border-b border-slate-100 flex flex-col gap-3 shrink-0">
              <input
                type="text"
                placeholder="Titre du document…"
                value={editorTitle}
                onChange={e => setEditorTitle(e.target.value)}
                className="text-2xl font-display font-black text-slate-900 border-none outline-none bg-transparent placeholder:text-slate-300 w-full"
              />
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <span>Slug :</span>
                <span className="text-slate-500">/</span>
                <input
                  type="text"
                  placeholder="mon-article-slug"
                  value={editorSlug}
                  onChange={e => setEditorSlug(e.target.value)}
                  className="border-none outline-none bg-transparent text-slate-700 font-mono"
                />
              </div>
            </div>

            {/* Text Area */}
            <div className="flex-1 overflow-y-auto">
              <textarea
                value={editorContent}
                onChange={e => setEditorContent(e.target.value)}
                placeholder="Commencez à écrire votre contenu (Markdown supporté)…"
                className="w-full h-full min-h-[400px] p-8 text-sm font-semibold text-slate-700 leading-relaxed border-none outline-none resize-none bg-white font-mono"
              />
            </div>

            {/* Status Bar */}
            <div className="px-8 py-3 bg-slate-50 border-t border-slate-100 text-[10px] font-bold text-slate-400 shrink-0">
              {editorContent.trim().split(/\s+/).filter(Boolean).length} mots · Markdown · Auto-sauvegarde désactivée (prototype)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
