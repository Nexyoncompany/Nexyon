'use client';

import { useEffect, useState } from 'react';
import { initializeStorage, getProducts, getBanners, getCategories, getSettings } from '@/lib/storage';
import type { Product, Banner } from '@/lib/storage';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    initializeStorage();
    setProducts(getProducts());
    setBanners(getBanners());
    setCategories(getCategories());
    setSettings(getSettings());
  }, []);

  const activeProducts = products.filter((p) => p.active);
  const featuredProducts = activeProducts.filter((p) => p.featured);
  const trendingProducts = activeProducts.filter((p) => p.trending);
  const activeBanners = banners.filter((b) => b.active);
  const heroBanner = activeBanners.find((b) => b.position === 'hero');

  const filteredProducts = searchQuery
    ? activeProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeProducts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {settings?.siteName || 'NEXYON'}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="/login" className="text-white/70 hover:text-white text-sm transition">Login</a>
              <a href="/admin/login" className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.02]">
                Admin
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        {heroBanner ? (
          <section className="mb-12 px-4 sm:px-6 lg:px-8">
            <a
              href={heroBanner.link || '#'}
              target={heroBanner.link ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="block max-w-7xl mx-auto overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40"
            >
              <img src={heroBanner.image} alt={heroBanner.title} className="w-full h-96 object-cover" />
            </a>
          </section>
        ) : (
          <section className="mb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center pt-8 pb-16">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6">
                Bem-vindo à{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {settings?.siteName || 'NEXYON'}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Descubra os melhores produtos com os melhores preços e ofertas exclusivas
              </p>
            </div>
          </section>
        )}

        {/* Search */}
        <section className="mb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/20 bg-white/10 backdrop-blur px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-blue-400 transition"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30">🔍</span>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Categorias</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 p-6 text-center hover:border-blue-400/50 transition cursor-pointer"
                >
                  <h3 className="font-semibold text-lg">{cat.name}</h3>
                  <p className="text-sm text-white/60 mt-1">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="mb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">✨ Destaques da Homepage</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trending Products */}
        {trendingProducts.length > 0 && (
          <section className="mb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">🔥 Tendências</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search Results or All Products */}
        {searchQuery && (
          <section className="mb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Resultados da Busca ({filteredProducts.length})</h2>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  <p className="text-lg">Nenhum produto encontrado</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {!searchQuery && (
          <section className="mb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Todos os Produtos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeProducts.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-white/60">
                    <p className="text-lg">Nenhum produto disponível</p>
                  </div>
                ) : (
                  activeProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/30 mt-16 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">{settings?.siteName || 'NEXYON'}</h3>
                <p className="text-sm text-white/60">Sua melhor plataforma de produtos e ofertas</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Links Rápidos</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li><a href="#" className="hover:text-white transition">Home</a></li>
                  <li><a href="#products" className="hover:text-white transition">Produtos</a></li>
                  <li><a href="/admin/login" className="hover:text-white transition">Admin</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contato</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>{settings?.contactInfo?.email || 'contato@nexyon.com'}</li>
                  <li>{settings?.contactInfo?.phone || '+55 (00) 00000-0000'}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Redes Sociais</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  {settings?.socialLinks?.instagram && (
                    <li><a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
                  )}
                  {settings?.socialLinks?.tiktok && (
                    <li><a href={settings.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">TikTok</a></li>
                  )}
                  {settings?.socialLinks?.youtube && (
                    <li><a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">YouTube</a></li>
                  )}
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
              <p>&copy; 2024 {settings?.siteName || 'NEXYON'}. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
    >
      {/* Image */}
      <div className="overflow-hidden h-48 bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white font-semibold">Ver Oferta ↗</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-blue-400 transition">
          {product.name}
        </h3>
        <p className="text-xs text-white/60 mb-3 line-clamp-2">{product.shortDescription}</p>

        {/* Badges */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="text-xs bg-blue-500/20 text-blue-300 rounded-full px-2 py-1">{product.platform}</span>
          <span className="text-xs bg-purple-500/20 text-purple-300 rounded-full px-2 py-1">{product.category}</span>
        </div>

        {/* Prices */}
        <div className="flex justify-between items-baseline gap-2 mb-3">
          {product.promotionalPrice ? (
            <>
              <span className="text-sm line-through text-white/40">{product.displayPrice}</span>
              <span className="font-bold text-green-400">{product.promotionalPrice}</span>
            </>
          ) : (
            <span className="font-bold">{product.displayPrice}</span>
          )}
        </div>

        {/* Commission Info */}
        <div className="text-xs text-amber-300/80 text-center bg-amber-500/10 rounded py-1">
          Comissão: {product.estimatedCommission}
        </div>
      </div>
    </a>
  );
}
