'use client';

import { useEffect, useMemo, useState } from 'react';
import { initialBanners, type Banner } from '@/lib/cms-data';

const positions = [
  { value: 'hero', label: 'Hero Principal' },
  { value: 'top', label: 'Topo' },
  { value: 'sidebar', label: 'Entre Seções' },
  { value: 'footer', label: 'Rodapé' },
] as const;
const storageKey = 'nexyon-admin-banners';

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Banner>>({
    title: '',
    subtitle: '',
    imageDesktop: '',
    imageMobile: '',
    destinationUrl: '',
    order: 1,
    active: true,
    position: 'hero',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        setBanners(JSON.parse(stored));
      } catch {
        setBanners(initialBanners);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(banners));
  }, [banners]);

  const filtered = useMemo(
    () => banners.filter((banner) => banner.title.toLowerCase().includes(query.toLowerCase())),
    [banners, query]
  );

  const resetForm = () => {
    setError('');
    setEditingId(null);
    setForm({
      title: '',
      subtitle: '',
      imageDesktop: '',
      imageMobile: '',
      destinationUrl: '',
      order: 1,
      active: true,
      position: 'hero',
    });
  };

  const handleEdit = (banner: Banner) => {
    setEditingId(banner.id);
    setForm(banner);
    setError('');
  };

  const handleDelete = (id: number) => {
    setBanners(banners.filter((banner) => banner.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, imageDesktop: reader.result as string, imageMobile: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title || !form.imageDesktop) {
      setError('Título e imagem são obrigatórios.');
      return;
    }

    const nextBanner: Banner = {
      id: editingId ?? Math.max(0, ...banners.map((item) => item.id)) + 1,
      title: form.title,
      subtitle: form.subtitle || '',
      imageDesktop: form.imageDesktop!,
      imageMobile: form.imageMobile || form.imageDesktop || '',
      destinationUrl: form.destinationUrl || '',
      order: form.order ?? 1,
      active: form.active ?? true,
      position: form.position ?? 'hero',
    };

    if (editingId) {
      setBanners(banners.map((banner) => (banner.id === editingId ? nextBanner : banner)));
    } else {
      setBanners([nextBanner, ...banners]);
    }
    resetForm();
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Banners</p>
            <h1 className="text-3xl font-semibold">Gerencie banners do site</h1>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar banner..."
            className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/80">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-slate-950/90">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Título</th>
                  <th className="px-6 py-4 text-left font-semibold">Posição</th>
                  <th className="px-6 py-4 text-center font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.map((banner) => (
                  <tr key={banner.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">{banner.title}</td>
                    <td className="px-6 py-4">{positions.find((item) => item.value === banner.position)?.label || banner.position}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${banner.active ? 'bg-emerald-500/20 text-emerald-200' : 'bg-red-500/20 text-red-200'}`}>
                        {banner.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(banner)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white hover:bg-white/10 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-300 hover:bg-red-500/20 transition"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-semibold mb-4">Novo banner</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título</label>
                <input
                  value={form.title || ''}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtítulo</label>
                <input
                  value={form.subtitle || ''}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Imagem do banner</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {form.imageDesktop && (
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
                  <img src={form.imageDesktop} alt="Preview banner" className="h-40 w-full object-cover" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Link de destino</label>
                <input
                  type="url"
                  value={form.destinationUrl || ''}
                  onChange={(e) => setForm({ ...form, destinationUrl: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Posição</label>
                  <select
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value as Banner['position'] })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {positions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ordem</label>
                  <input
                    type="number"
                    value={form.order ?? 1}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.active ?? true}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                Banner ativo
              </label>
              {error && <p className="text-sm text-red-300">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                {editingId ? 'Atualizar Banner' : 'Adicionar Banner'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
