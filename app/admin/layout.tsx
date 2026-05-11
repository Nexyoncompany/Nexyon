import Link from 'next/link';
import type { ReactNode } from 'react';

const adminMenu = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Produtos', href: '/admin/products' },
  { label: 'Categorias', href: '/admin/categories' },
  { label: 'Banners', href: '/admin/banners' },
  { label: 'Comissões', href: '/admin/commissions' },
  { label: 'Marketing', href: '/admin/marketing' },
  { label: 'Analytics', href: '/admin/analytics' },
  { label: 'Pedidos', href: '/admin/orders' },
  { label: 'Usuários', href: '/admin/users' },
  { label: 'Mídia', href: '/admin/media' },
  { label: 'Configurações', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="lg:flex lg:min-h-screen">
        <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col border-r border-white/10 bg-slate-950/95 backdrop-blur-xl">
          <div className="px-8 py-8 border-b border-white/10">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">NEXYON CMS</p>
            <h1 className="mt-4 text-3xl font-bold text-white">Admin Panel</h1>
            <p className="mt-2 text-sm text-gray-400">Gerencie produtos, banners, campanhas e mais.</p>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {adminMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-gray-200 hover:bg-slate-900 hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 bg-slate-950/90">
          <div className="lg:hidden px-4 py-4 border-b border-white/10 bg-slate-950/95">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">NEXYON CMS</p>
                <h2 className="text-xl font-bold">Admin Panel</h2>
              </div>
              <Link href="/admin/dashboard" className="text-sm text-cyan-300 hover:text-white">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="px-4 py-6 sm:px-6 lg:px-10 xl:px-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
