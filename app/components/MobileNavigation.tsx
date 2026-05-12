// Mobile navigation component (bottom navigation - TikTok style)
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import type { User } from '@/lib/auth';

export default function MobileNavigation() {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  // Don't show on login/register pages
  if (pathname === '/login' || pathname === '/register' || pathname === '/admin/login') {
    return null;
  }

  const isAdmin_ = isAdmin();

  return (
    <>
      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-white/10 md:hidden z-40">
        <div className="flex justify-around items-center h-20">
          <Link href="/" className={`flex flex-col items-center justify-center w-full h-full transition ${
            pathname === '/' ? 'text-blue-400' : 'text-white/60 hover:text-white'
          }`}>
            <span className="text-2xl mb-1">🏠</span>
            <span className="text-xs">Home</span>
          </Link>

          <Link href="/search" className={`flex flex-col items-center justify-center w-full h-full transition ${
            pathname === '/search' ? 'text-blue-400' : 'text-white/60 hover:text-white'
          }`}>
            <span className="text-2xl mb-1">🔍</span>
            <span className="text-xs">Buscar</span>
          </Link>

          <Link href="/categories" className={`flex flex-col items-center justify-center w-full h-full transition ${
            pathname === '/categories' ? 'text-blue-400' : 'text-white/60 hover:text-white'
          }`}>
            <span className="text-2xl mb-1">📂</span>
            <span className="text-xs">Categorias</span>
          </Link>

          <Link href="/favorites" className={`flex flex-col items-center justify-center w-full h-full transition ${
            pathname === '/favorites' ? 'text-blue-400' : 'text-white/60 hover:text-white'
          }`}>
            <span className="text-2xl mb-1">❤️</span>
            <span className="text-xs">Favoritos</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex flex-col items-center justify-center w-full h-full transition ${
              pathname === '/profile' || isOpen ? 'text-blue-400' : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="text-2xl mb-1">👤</span>
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </nav>

      {/* Profile Menu - Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setIsOpen(false)}>
          <div
            className="absolute bottom-20 right-4 bg-slate-900 border border-white/10 rounded-2xl shadow-xl p-6 min-w-64"
            onClick={(e) => e.stopPropagation()}
          >
            {user ? (
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-sm text-white/60">{user.email}</p>
                  <p className="text-xs text-blue-400 mt-1">
                    {user.role === 'admin' ? '🔐 Admin' : '👤 Cliente'}
                  </p>
                </div>

                {user.role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    className="block px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    📊 Painel Admin
                  </Link>
                )}

                <Link
                  href="/profile"
                  className="block px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  ⚙️ Configurações
                </Link>

                <button
                  onClick={() => {
                    // Logout
                    window.location.href = '/login';
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition text-sm"
                >
                  🚪 Sair
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="block text-center px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="block text-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Criar Conta
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
