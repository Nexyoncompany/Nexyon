'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllUsers, isAdmin, getCurrentUser } from '@/lib/auth';
import type { User } from '@/lib/auth';

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !isAdmin()) {
      router.push('/login');
      return;
    }

    setCurrentUser(user);
    setUsers(getAllUsers());
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
        <div className="grid gap-4 lg:grid-cols-3 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Administração</p>
            <h1 className="text-3xl font-semibold mt-2">Usuários Cadastrados</h1>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-4">
                <p className="text-sm text-blue-300 mb-1">Total de Usuários</p>
                <p className="text-3xl font-bold text-white">{users.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-4">
                <p className="text-sm text-green-300 mb-1">Clientes</p>
                <p className="text-3xl font-bold text-white">{users.filter((u) => u.role === 'user').length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden shadow-xl shadow-slate-950/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-slate-950/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nome</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tipo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Registrado em</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Último Acesso</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-white/60">
                    Nenhum usuário cadastrado
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                        {user.role === 'admin' && (
                          <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">
                            🔐 Admin
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/70">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}
                      >
                        {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">
                      {formatDate(user.registeredAt)}
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">
                      {formatDate(user.lastLogin)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}