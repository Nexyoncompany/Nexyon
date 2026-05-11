'use client';

import { useEffect, useMemo, useState } from 'react';
import { initialBanners, initialCategories, initialProducts } from '@/lib/cms-data';

const productStorageKey = 'nexyon-admin-products';
const bannerStorageKey = 'nexyon-admin-banners';

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [banners, setBanners] = useState(initialBanners);

  useEffect(() => {
    const storedProducts = window.localStorage.getItem(productStorageKey);
    const storedBanners = window.localStorage.getItem(bannerStorageKey);

    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch {
        setProducts(initialProducts);
      }
    }

    if (storedBanners) {
      try {
        setBanners(JSON.parse(storedBanners));
      } catch {
        setBanners(initialBanners);
      }
    }
  }, []);

  const activeProducts = useMemo(() => products.filter((product) => product.active), [products]);
  const activeBanners = useMemo(
    () => banners.filter((banner) => banner.active).sort((a, b) => a.order - b.order),
    [banners]
  );

  const heroBanner = activeBanners.find((banner) => banner.position === 'hero');
  const topBanner = activeBanners.find((banner) => banner.position === 'top');
  const sectionBanner = activeBanners.find((banner) => banner.position === 'sidebar');
  const footerBanner = activeBanners.find((banner) => banner.position === 'footer');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">NEXYON</h1>
            </div>
            <div className="hidden md:flex gap-4 items-center text-sm">
              <a href="#" className="text-white hover:text-blue-400 transition">Home</a>
              <a href="#products" className="text-white/70 hover:text-blue-400 transition">Achadinhos</a>
              <a href="#products" className="text-white/70 hover:text-blue-400 transition">Tendências</a>
              <a href="#products" className="text-white/70 hover:text-blue-400 transition">Utilidades</a>
              <a href="#about" className="text-white/70 hover:text-blue-400 transition">About</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="/login" className="text-white/70 hover:text-white text-sm transition">Login</a>
              <a href="/register" className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.02]">Criar Conta</a>
              <a href="/admin/login" className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.02]">Admin</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6">
              Discover the Future of{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Trending Products
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Curated viral products from global trends, powered by AI and affiliate performance to deliver the best offers directly to your audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#products" className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-sm font-bold text-white transition hover:scale-105">Shop Trending</a>
              <a href="#banners" className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-bold text-white transition hover:bg-white/10">Learn More</a>
            </div>
          </div>
        </section>

        {heroBanner && (
          <section className="mt-12 px-4 sm:px-6 lg:px-8" id="banners">
            <div className="max-w-7xl mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 shadow-2xl shadow-black/40">
              <a href={heroBanner.destinationUrl || '#'} target={heroBanner.destinationUrl ? '_blank' : '_self'} rel="noopener noreferrer">
                <img src={heroBanner.imageDesktop} alt={heroBanner.title} className="w-full object-cover" />
                <div className="p-8 bg-gradient-to-t from-slate-950/90 to-transparent">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{heroBanner.position.replace('-', ' ')}</p>
                  <h2 className="mt-4 text-4xl font-bold">{heroBanner.title}</h2>
                  <p className="mt-3 max-w-2xl text-slate-300">{heroBanner.subtitle}</p>
                </div>
              </a>
            </div>
          </section>
        )}

        {topBanner && (
          <section className="mt-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-xl shadow-slate-950/20">
              <a href={topBanner.destinationUrl || '#'} target={topBanner.destinationUrl ? '_blank' : '_self'} rel="noopener noreferrer">
                <img src={topBanner.imageDesktop} alt={topBanner.title} className="w-full object-cover" />
              </a>
            </div>
          </section>
        )}

        <section className="mt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Categorias</p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold">Descubra por categoria</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {initialCategories.map((category) => (
                <div key={category.id} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg shadow-slate-950/10 transition hover:border-blue-400/40 hover:scale-[1.02]">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{category.name}</p>
                  <h3 className="mt-4 text-xl font-semibold">{category.description}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {sectionBanner && (
          <section className="mt-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-xl shadow-slate-950/20">
              <a href={sectionBanner.destinationUrl || '#'} target={sectionBanner.destinationUrl ? '_blank' : '_self'} rel="noopener noreferrer">
                <img src={sectionBanner.imageDesktop} alt={sectionBanner.title} className="w-full object-cover" />
              </a>
            </div>
          </section>
        )}

        <section className="mt-16 px-4 sm:px-6 lg:px-8" id="products">
          <div className="max-w-7xl mx-auto mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Produtos</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold">Produtos em destaque</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {activeProducts.map((product) => (
              <a
                key={product.id}
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-slate-950/10 transition hover:-translate-y-1 hover:border-blue-400/40"
              >
                <div className="h-64 overflow-hidden bg-slate-950">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">{product.platform}</span>
                    <span className="text-sm text-white/70">{product.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                  <p className="text-sm text-slate-300 mb-4">{product.shortDescription}</p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-lg font-bold">{product.price}</p>
                    <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition group-hover:bg-blue-500/20">Ver Oferta</span>
                  </div>
                </div>
              </a>
            ))}
            {activeProducts.length === 0 && (
              <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">Nenhum produto disponível no momento.</div>
            )}
          </div>
        </section>

        {footerBanner && (
          <section className="mt-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-xl shadow-slate-950/20">
              <a href={footerBanner.destinationUrl || '#'} target={footerBanner.destinationUrl ? '_blank' : '_self'} rel="noopener noreferrer">
                <img src={footerBanner.imageDesktop} alt={footerBanner.title} className="w-full object-cover" />
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
