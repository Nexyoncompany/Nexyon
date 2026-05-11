'use client';

import { useEffect, useState } from 'react';
import type { Commission } from '@/lib/storage';
import { getCommissions, getProducts, saveCommissions } from '@/lib/storage';

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [products] = useState(getProducts());
  const [period, setPeriod] = useState('month');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Commission>>({
    productId: '',
    productName: '',
    platform: '',
    soldValue: '',
    commissionValue: '',
    date: new Date().toISOString().slice(0, 10),
    status: 'pending',
  });

  useEffect(() => {
    setCommissions(getCommissions());
  }, []);

  useEffect(() => {
    saveCommissions(commissions);
  }, [commissions]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.productName || !form.platform || !form.soldValue || !form.commissionValue) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const commission: Commission = {
      id: editingId || `commission_${Date.now()}`,
      productId: form.productId || '',
      productName: form.productName,
      platform: form.platform,
      soldValue: form.soldValue,
      commissionValue: form.commissionValue,
      date: form.date || new Date().toISOString().slice(0, 10),
      status: form.status || 'pending',
    };

    if (editingId) {
      setCommissions(commissions.map((c) => (c.id === editingId ? commission : c)));
      setEditingId(null);
    } else {
      setCommissions([commission, ...commissions]);
    }

    setForm({
      productId: '',
      productName: '',
      platform: '',
      soldValue: '',
      commissionValue: '',
      date: new Date().toISOString().slice(0, 10),
      status: 'pending',
    });
  };

  const handleEdit = (commission: Commission) => {
    setEditingId(commission.id);
    setForm(commission);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id: string) => {
    setCommissions(commissions.filter((c) => c.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      productId: '',
      productName: '',
      platform: '',
      soldValue: '',
      commissionValue: '',
      date: new Date().toISOString().slice(0, 10),
      status: 'pending',
    });
  };

  // Calculate totals
  const filterByPeriod = (commissions: Commission[]) => {
    const today = new Date();
    return commissions.filter((c) => {
      const commissionDate = new Date(c.date);
      if (period === 'day') return commissionDate.toDateString() === today.toDateString();
      if (period === 'month')
        return (
          commissionDate.getMonth() === today.getMonth() &&
          commissionDate.getFullYear() === today.getFullYear()
        );
      if (period === 'year') return commissionDate.getFullYear() === today.getFullYear();
      return true;
    });
  };

  const filtered = filterByPeriod(commissions);
  const totalSold = filtered.reduce((sum, c) => {
    const value = parseFloat(c.soldValue.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (Number.isNaN(value) ? 0 : value);
  }, 0);
  const totalCommission = filtered.reduce((sum, c) => {
    const value = parseFloat(c.commissionValue.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (Number.isNaN(value) ? 0 : value);
  }, 0);

  const stats = [
    { label: 'Total Vendido', value: `R$ ${totalSold.toFixed(2).replace('.', ',')}`, icon: '💰' },
    {
      label: 'Comissão Gerada',
      value: `R$ ${totalCommission.toFixed(2).replace('.', ',')}`,
      icon: '💵',
    },
    {
      label: 'Comissões Pendentes',
      value: filtered.filter((c) => c.status === 'pending').length,
      icon: '⏳',
    },
    {
      label: 'Comissões Pagas',
      value: filtered.filter((c) => c.status === 'paid').length,
      icon: '✅',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Comissões</p>
            <h1 className="text-3xl font-bold mt-2">Acompanhamento de Comissões</h1>
          </div>

          <div className="flex gap-2">
            {[
              { label: 'Hoje', value: 'day' },
              { label: 'Mês', value: 'month' },
              { label: 'Ano', value: 'year' },
              { label: 'Todos', value: 'all' },
            ].map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  period === p.value
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20 lg:col-span-1">
          <h2 className="text-xl font-bold mb-6">
            {editingId ? 'Editar Comissão' : 'Nova Comissão'}
          </h2>

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Produto</label>
              <select
                value={form.productId || ''}
                onChange={(e) => {
                  const product = products.find((p) => p.id === e.target.value);
                  setForm({
                    ...form,
                    productId: e.target.value,
                    productName: product?.name || '',
                    platform: product?.platform || '',
                  });
                }}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecionar produto</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.platform})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nome do Produto</label>
              <input
                type="text"
                value={form.productName || ''}
                onChange={(e) => setForm({ ...form, productName: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Plataforma</label>
              <input
                type="text"
                value={form.platform || ''}
                onChange={(e) => setForm({ ...form, platform: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Valor Vendido</label>
                <input
                  type="text"
                  value={form.soldValue || ''}
                  onChange={(e) => setForm({ ...form, soldValue: e.target.value })}
                  placeholder="R$ 0,00"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Comissão</label>
                <input
                  type="text"
                  value={form.commissionValue || ''}
                  onChange={(e) => setForm({ ...form, commissionValue: e.target.value })}
                  placeholder="R$ 0,00"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Data</label>
              <input
                type="date"
                value={form.date || ''}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={form.status || ''}
                onChange={(e) => setForm({ ...form, status: e.target.value as Commission['status'] })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pendente</option>
                <option value="paid">Paga</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>

            <div className="flex gap-2 flex-col">
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02]"
              >
                {editingId ? 'Atualizar' : 'Adicionar'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full rounded-full bg-slate-700 hover:bg-slate-600 px-5 py-3 text-sm font-semibold text-white transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20 lg:col-span-2">
          <h2 className="text-xl font-bold mb-6">Histórico de Comissões</h2>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 border-b border-white/20">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Produto</th>
                  <th className="px-6 py-3 text-left font-semibold">Plataforma</th>
                  <th className="px-6 py-3 text-right font-semibold">Vendido</th>
                  <th className="px-6 py-3 text-right font-semibold">Comissão</th>
                  <th className="px-6 py-3 text-center font-semibold">Status</th>
                  <th className="px-6 py-3 text-center font-semibold">Data</th>
                  <th className="px-6 py-3 text-right font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                      Nenhuma comissão encontrada
                    </td>
                  </tr>
                ) : (
                  filtered.map((commission) => (
                    <tr key={commission.id} className="border-b border-white/10 hover:bg-white/5 transition">
                      <td className="px-6 py-4 font-medium">{commission.productName}</td>
                      <td className="px-6 py-4">{commission.platform}</td>
                      <td className="px-6 py-4 text-right">{commission.soldValue}</td>
                      <td className="px-6 py-4 text-right text-green-400 font-medium">
                        {commission.commissionValue}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            commission.status === 'paid'
                              ? 'bg-green-500/20 text-green-300'
                              : commission.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}
                        >
                          {commission.status === 'paid'
                            ? 'Paga'
                            : commission.status === 'pending'
                            ? 'Pendente'
                            : 'Cancelada'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        {new Date(commission.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(commission)}
                          className="text-blue-400 hover:text-blue-300 transition text-xs"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(commission.id)}
                          className="text-red-400 hover:text-red-300 transition text-xs"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
