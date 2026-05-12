'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, isAuthenticated, isAdmin } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Se o usuário já está autenticado e é admin, redireciona para dashboard
    if (isAuthenticated() && isAdmin()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        // Verifica se é admin
        if (result.user?.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          setError('Este também só é para administradores. Sua conta é de cliente.');
        }
      } else {
        setError(result.error || 'Email ou senha inválidos.');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
              NEXYON Admin
            </h1>
            <p className="text-gray-400">Painel administrativo</p>
          </div>

          {/* Demo credentials */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 text-sm text-blue-200">
            <p className="font-semibold mb-2">📝 Credenciais de teste:</p>
            <p>Email: <span className="font-mono">admin@nexyon.com</span></p>
            <p>Senha: <span className="font-mono">admin123</span></p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email Administrativo</label>
              <input
                type="email"
                placeholder="admin@nexyon.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  disabled={loading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? 'Acessando...' : 'Acessar Painel'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              ← Voltar para homepage
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
