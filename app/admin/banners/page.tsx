'use client';

import { useMemo, useState } from 'react';
import { initialBanners } from '@/lib/cms-data';

const positions = ['hero', 'top', 'sidebar', 'footer'] as const;

export default function BannersPage() {
  const [banners, setBanners] = useState(initialBanners);
  const [query, setQuery] = useState('');
  const [newBanner, setNewBanner] = useState({
    title: '',
    subtitle: '',
    imageDesktop: '',
    imageMobile: '',
    destinationUrl: '',
    order: 1,
    active: true,
    position: 'hero' as typeof positions[number],
  });

  const filtered = useMemo(
    () => banners.filter((banner) => banner.title.toLowerCase().includes(query.toLowerCase())),
    [banners, query]
  );

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newBanner.title || !newBanner.destinationUrl) return;

    setBanners([
      {
        id: Math.max(0, ...banners.map((item) => item.id)) + 1,
        ...newBanner,
      },
      ...banners,
    ]);

    setNewBanner({ title: '', subtitle: '', imageDesktop: '', imageMobile: '', destinationUrl: '', order: 1, active: true, position: 'hero' });
  };

  const toggleActive = (id: number) => {
    setBanners(banners.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
  };

  const remove = (id: number) => setBanners(banners.filter((item) => item.id !== id));

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
                    <td className="px-6 py-4">{banner.position}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${banner.active ? 'bg-emerald-500/20 text-emerald-200' : 'bg-red-500/20 text-red-200'}`}>
                        {banner.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => toggleActive(banner.id)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white hover:bg-white/10 transition"
                      >
                        {banner.active ? 'Desativar' : 'Ativar'}
                      </button>
                      <button
                        onClick={() => remove(banner.id)}
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
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título</label>
                <input
                  value={newBanner.title}
                  onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtítulo</label>
                <input
                  value={newBanner.subtitle}
                  onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Imagem desktop</label>
                <input
                  value={newBanner.imageDesktop}
                  onChange={(e) => setNewBanner({ ...newBanner, imageDesktop: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Imagem mobile</label>
                <input
                  value={newBanner.imageMobile}
                  onChange={(e) => setNewBanner({ ...newBanner, imageMobile: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Link de destino</label>
                <input
                  value={newBanner.destinationUrl}
                  onChange={(e) => setNewBanner({ ...newBanner, destinationUrl: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Posição</label>
                  <select
                    value={newBanner.position}
                    onChange={(e) => setNewBanner({ ...newBanner, position: e.target.value as typeof positions[number] })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {positions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ordem</label>
                  <input
                    type="number"
                    value={newBanner.order}
                    onChange={(e) => setNewBanner({ ...newBanner, order: Number(e.target.value) })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={newBanner.active}
                  onChange={(e) => setNewBanner({ ...newBanner, active: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                Banner ativo
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Criar Banner
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
