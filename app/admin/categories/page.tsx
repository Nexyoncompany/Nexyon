'use client';

import { useMemo, useState } from 'react';
import { initialCategories } from '@/lib/cms-data';

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [query, setQuery] = useState('');
  const [newCategory, setNewCategory] = useState({ name: '', description: '', active: true });

  const filtered = useMemo(
    () => categories.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
    [categories, query]
  );

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newCategory.name) return;

    setCategories([
      {
        id: Math.max(0, ...categories.map((item) => item.id)) + 1,
        slug: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
        name: newCategory.name,
        description: newCategory.description,
        active: newCategory.active,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...categories,
    ]);

    setNewCategory({ name: '', description: '', active: true });
  };

  const toggleActive = (id: number) => {
    setCategories(categories.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
  };

  const remove = (id: number) => setCategories(categories.filter((item) => item.id !== id));

  return (
    <div className="space-y-8">
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Categorias</p>
            <h1 className="text-3xl font-semibold">Gerencie categorias</h1>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar categoria..."
            className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-3xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-slate-950/90">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Categoria</th>
                    <th className="px-6 py-4 text-left font-semibold">Slug</th>
                    <th className="px-6 py-4 text-center font-semibold">Status</th>
                    <th className="px-6 py-4 text-right font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-slate-950/80">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-slate-400">{item.slug}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.active ? 'bg-emerald-500/20 text-emerald-200' : 'bg-red-500/20 text-red-200'}`}>
                          {item.active ? 'Ativa' : 'Inativa'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => toggleActive(item.id)}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white hover:bg-white/10 transition"
                        >
                          {item.active ? 'Desativar' : 'Ativar'}
                        </button>
                        <button
                          onClick={() => remove(item.id)}
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
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-semibold mb-4">Nova categoria</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <input
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={newCategory.active}
                  onChange={(e) => setNewCategory({ ...newCategory, active: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                Categoria ativa
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Criar Categoria
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
