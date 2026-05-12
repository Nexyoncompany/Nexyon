'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, isAuthenticated, getCurrentUser } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Se o usuário já está autenticado, redireciona para home
    if (isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        // Redireciona após login bem-sucedido
        router.push('/');
      } else {
        setError(result.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h1 className="text-3xl font-bold text-center mb-2">Entrar</h1>
          <p className="text-gray-400 text-center mb-8">Acesse sua conta NEXYON</p>

          {/* Demo credentials */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 text-sm text-blue-200">
            <p className="font-semibold mb-2">📝 Credenciais de teste:</p>
            <p>Email: <span className="font-mono">admin@nexyon.com</span></p>
            <p>Senha: <span className="font-mono">admin123</span></p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg p-4 mb-6 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu-email@exemplo.com"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Não tem conta?{' '}
            <a href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Criar uma
            </a>
          </p>

          <p className="text-center text-gray-400 mt-4 text-sm">
            É administrador?{' '}
            <a href="/admin/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Acessar painel
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
