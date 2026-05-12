'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MobileNavigation from '@/app/components/MobileNavigation';
import { initializeStorage, getProducts, getBanners, getCategories, getSettings } from '@/lib/storage';
import { getCurrentUser, logoutUser } from '@/lib/auth';
import type { Product, Banner } from '@/lib/storage';
import type { User } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    initializeStorage();
    setProducts(getProducts());
    setBanners(getBanners());
    setCategories(getCategories());
    setSettings(getSettings());
    setCurrentUser(getCurrentUser());
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

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setShowUserMenu(false);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {settings?.siteName || 'NEXYON'}
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Pesquisar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-slate-300 bg-white px-6 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-900 hidden sm:inline">
                      {currentUser.name}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-lg p-4 z-50">
                      <div className="border-b border-slate-200 pb-4 mb-4">
                        <p className="font-semibold text-slate-900">{currentUser.name}</p>
                        <p className="text-xs text-slate-600">{currentUser.email}</p>
                        <p className="text-xs text-blue-600 mt-1 font-medium">
                          {currentUser.role === 'admin' ? '🔐 Administrador' : '👤 Cliente'}
                        </p>
                      </div>

                      {currentUser.role === 'admin' && (
                        <Link
                          href="/admin/dashboard"
                          className="block w-full text-left px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition text-sm font-medium mb-2"
                          onClick={() => setShowUserMenu(false)}
                        >
                          📊 Painel Admin
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition text-sm font-medium"
                      >
                        🚪 Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-full text-blue-600 hover:bg-blue-50 transition font-medium text-sm"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition font-medium text-sm"
                  >
                    Registrar
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-300 bg-white px-6 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pb-24 md:pb-0">
        {/* Hero Section */}
        {heroBanner && heroBanner.active ? (
          <section className="mb-12 px-4 sm:px-6 lg:px-8 pt-6">
            <Link
              href={heroBanner.link || '#'}
              target={heroBanner.link ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="block max-w-7xl mx-auto overflow-hidden rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={heroBanner.image}
                alt={heroBanner.title || 'Banner'}
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
              />
            </Link>
          </section>
        ) : (
          <section className="mb-12 px-4 sm:px-6 lg:px-8 pt-6">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-900">
                Bem-vindo à{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {settings?.siteName || 'NEXYON'}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Descubra os melhores produtos com os melhores preços e ofertas exclusivas
              </p>
            </div>
          </section>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <section className="mb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">📂 Categorias</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug || cat.name.toLowerCase()}`}
                    className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-slate-200 p-6 text-center hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
                  >
                    <h3 className="font-semibold text-lg text-slate-900">{cat.name}</h3>
                    <p className="text-sm text-slate-600 mt-2">{cat.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="mb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">✨ Destaques</h2>
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
              <h2 className="text-2xl font-bold mb-6 text-slate-900">🔥 Tendências</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search Results */}
        {searchQuery && (
          <section className="mb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">
                🔍 Resultados ({filteredProducts.length})
              </h2>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-slate-600">
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

        {/* All Products */}
        {!searchQuery && (
          <section className="mb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">📦 Todos os Produtos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeProducts.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-slate-600">
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
        <footer className="border-t border-slate-200 bg-slate-900 text-white mt-16 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">{settings?.siteName || 'NEXYON'}</h3>
                <p className="text-sm text-white/60">
                  Sua melhor plataforma de produtos e ofertas exclusivas
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Links Rápidos</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>
                    <Link href="/" className="hover:text-white transition">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories" className="hover:text-white transition">
                      Produtos
                    </Link>
                  </li>
                  {currentUser?.role === 'admin' && (
                    <li>
                      <Link href="/admin/dashboard" className="hover:text-white transition">
                        Admin
                      </Link>
                    </li>
                  )}
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
                    <li>
                      <a
                        href={settings.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                      >
                        Instagram
                      </a>
                    </li>
                  )}
                  {settings?.socialLinks?.tiktok && (
                    <li>
                      <a
                        href={settings.socialLinks.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                      >
                        TikTok
                      </a>
                    </li>
                  )}
                  {settings?.socialLinks?.youtube && (
                    <li>
                      <a
                        href={settings.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                      >
                        YouTube
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
              <p>Copyright 2024 {settings?.siteName || 'NEXYON'}. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </main>

      <MobileNavigation />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-300"
    >
      {/* Image */}
      <div className="relative h-48 bg-slate-200 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-full text-sm">
            Ver Oferta
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex gap-2 flex-wrap">
          {product.featured && (
            <span className="text-xs bg-amber-500 text-white rounded-full px-2 py-1 font-semibold">
              Destaque
            </span>
          )}
          {product.trending && (
            <span className="text-xs bg-red-500 text-white rounded-full px-2 py-1 font-semibold">
              Trending
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 text-slate-900 group-hover:text-blue-600 transition">
          {product.name}
        </h3>
        <p className="text-xs text-slate-600 mb-3 line-clamp-2">{product.shortDescription}</p>

        {/* Platform */}
        <div className="mb-3">
          <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-1 font-medium">
            {product.platform}
          </span>
        </div>

        {/* Prices */}
        <div className="space-y-2">
          {product.promotionalPrice ? (
            <>
              <p className="text-xs line-through text-slate-400">{product.displayPrice}</p>
              <p className="font-bold text-lg text-green-600">{product.promotionalPrice}</p>
            </>
          ) : (
            <p className="font-bold text-lg text-slate-900">{product.displayPrice}</p>
          )}
        </div>
      </div>
    </a>
  );
}
