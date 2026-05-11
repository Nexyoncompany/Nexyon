'use client';

import { useEffect, useMemo, useState } from 'react';
import { initialCategories, initialProducts, type Product } from '@/lib/cms-data';

const platformOptions = ['Amazon', 'Shopee', 'AliExpress', 'Mercado Livre', 'Outro'];
const storageKey = 'nexyon-admin-products';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState<Partial<Product>>({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    category: 'Achadinhos',
    tags: [],
    price: 'R$ 0,00',
    salePrice: '',
    commission: 'R$ 0,00',
    platform: 'Amazon',
    affiliateUrl: '',
    image: '',
    gallery: [],
    video: '',
    featured: false,
    trending: false,
    active: true,
    createdAt: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch {
        setProducts(initialProducts);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(products));
  }, [products]);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = [product.name, product.slug, product.platform, product.category]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [products, search, selectedCategory]
  );

  const resetForm = () => {
    setError('');
    setEditingId(null);
    setForm({
      name: '',
      slug: '',
      shortDescription: '',
      description: '',
      category: 'Achadinhos',
      tags: [],
      price: 'R$ 0,00',
      salePrice: '',
      commission: 'R$ 0,00',
      platform: 'Amazon',
      affiliateUrl: '',
      image: '',
      gallery: [],
      video: '',
      featured: false,
      trending: false,
      active: true,
      createdAt: new Date().toISOString().slice(0, 10),
    });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm(product);
    setError('');
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.affiliateUrl) {
      setError('Nome do produto e URL de afiliado são obrigatórios.');
      return;
    }

    const nextProduct: Product = {
      id: editingId ?? Math.max(0, ...products.map((item) => item.id)) + 1,
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      shortDescription: form.shortDescription || '',
      description: form.description || '',
      category: form.category || 'Achadinhos',
      tags: form.tags || [],
      price: form.price || 'R$ 0,00',
      salePrice: form.salePrice || '',
      commission: form.commission || 'R$ 0,00',
      platform: form.platform || 'Amazon',
      affiliateUrl: form.affiliateUrl,
      image: form.image || 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
      gallery: form.gallery?.length ? form.gallery : [],
      video: form.video || '',
      featured: form.featured ?? false,
      trending: form.trending ?? false,
      active: form.active ?? true,
      createdAt: form.createdAt || new Date().toISOString().slice(0, 10),
    };

    if (editingId) {
      setProducts(products.map((product) => (product.id === editingId ? nextProduct : product)));
    } else {
      setProducts([nextProduct, ...products]);
    }
    resetForm();
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Produtos</p>
              <h1 className="text-3xl font-semibold">Gerenciamento de Produtos</h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produtos..."
                className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Todas</option>
                {initialCategories.map((category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-slate-950/90">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Imagem</th>
                  <th className="px-6 py-3 text-left font-semibold">Produto</th>
                  <th className="px-6 py-3 text-left font-semibold">Plataforma</th>
                  <th className="px-6 py-3 text-center font-semibold">Status</th>
                  <th className="px-6 py-3 text-right font-semibold">Preço</th>
                  <th className="px-6 py-3 text-right font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-slate-950/80">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4">
                      <div className="h-14 w-14 overflow-hidden rounded-2xl bg-slate-800">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-slate-400">{product.category}</p>
                    </td>
                    <td className="px-6 py-4">{product.platform}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs ${product.active ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'}`}>
                        {product.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">{product.price}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white hover:bg-white/10 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-300 hover:bg-red-500/20 transition"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Cadastro</p>
            <h2 className="text-2xl font-semibold mt-2">Adicionar / Editar</h2>
            <p className="text-sm text-slate-400 mt-1">Gerencie produtos diretamente no painel.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do produto</label>
              <input
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Categoria</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {initialCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Plataforma</label>
                <select
                  value={form.platform}
                  onChange={(e) => setForm({ ...form, platform: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {platformOptions.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL de afiliado</label>
              <input
                type="url"
                value={form.affiliateUrl || ''}
                onChange={(e) => setForm({ ...form, affiliateUrl: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descrição curta</label>
              <textarea
                value={form.shortDescription || ''}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Preço exibido</label>
                <input
                  value={form.price || ''}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preço promocional</label>
                <input
                  value={form.salePrice || ''}
                  onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Upload da imagem principal</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {form.image && (
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-950/80">
                <img src={form.image} alt="Preview" className="h-40 w-full object-cover" />
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured ?? false}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                Destaque na homepage
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.trending ?? false}
                  onChange={(e) => setForm({ ...form, trending: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                Produto em tendência
              </label>
            </div>

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={form.active ?? true}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
              />
              Produto ativo
            </label>

            {error && <p className="text-sm text-red-300">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02]"
            >
              {editingId ? 'Atualizar Produto' : 'Adicionar Produto'}
            </button>
          </form>
        </aside>
      </section>
    </div>
  );
}
