'use client';

import { useEffect, useState } from 'react';
import type { Campaign } from '@/lib/storage';
import { getCampaigns, saveCampaigns } from '@/lib/storage';

const platformLinks: Record<string, string> = {
  Google: 'https://ads.google.com',
  Meta: 'https://business.facebook.com',
  TikTok: 'https://ads.tiktok.com',
  Pinterest: 'https://ads.pinterest.com',
  YouTube: 'https://youtube.com/ads',
};

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Campaign>>({
    platform: 'Google',
    name: '',
    investment: '',
    revenue: '',
    roi: '',
    roas: '',
    status: 'active',
    link: '',
  });

  useEffect(() => {
    setCampaigns(getCampaigns());
  }, []);

  useEffect(() => {
    saveCampaigns(campaigns);
  }, [campaigns]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.platform) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const campaign: Campaign = {
      id: editingId || `campaign_${Date.now()}`,
      platform: form.platform as Campaign['platform'],
      name: form.name,
      investment: form.investment || 'R$ 0,00',
      revenue: form.revenue || 'R$ 0,00',
      roi: form.roi || '0%',
      roas: form.roas || '0x',
      status: form.status || 'active',
      link: form.link || platformLinks[form.platform] || '',
    };

    if (editingId) {
      setCampaigns(campaigns.map((c) => (c.id === editingId ? campaign : c)));
      setEditingId(null);
    } else {
      setCampaigns([campaign, ...campaigns]);
    }

    setForm({
      platform: 'Google',
      name: '',
      investment: '',
      revenue: '',
      roi: '',
      roas: '',
      status: 'active',
      link: '',
    });
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingId(campaign.id);
    setForm(campaign);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      platform: 'Google',
      name: '',
      investment: '',
      revenue: '',
      roi: '',
      roas: '',
      status: 'active',
      link: '',
    });
  };

  // Calculate totals
  const totalInvestment = campaigns.reduce((sum, c) => {
    const value = parseFloat(c.investment.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (Number.isNaN(value) ? 0 : value);
  }, 0);

  const totalRevenue = campaigns.reduce((sum, c) => {
    const value = parseFloat(c.revenue.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (Number.isNaN(value) ? 0 : value);
  }, 0);

  const averageROI = campaigns.length > 0 
    ? campaigns.reduce((sum, c) => {
        const value = parseFloat(c.roi.replace(/[^0-9.,]/g, '').replace(',', '.'));
        return sum + (Number.isNaN(value) ? 0 : value);
      }, 0) / campaigns.length
    : 0;

  const stats = [
    { label: 'Campanhas Ativas', value: campaigns.filter((c) => c.status === 'active').length, icon: '🎯' },
    { label: 'Investimento Total', value: `R$ ${totalInvestment.toFixed(2).replace('.', ',')}`, icon: '💰' },
    { label: 'Receita Gerada', value: `R$ ${totalRevenue.toFixed(2).replace('.', ',')}`, icon: '💵' },
    { label: 'ROI Médio', value: `${averageROI.toFixed(1)}%`, icon: '📈' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Marketing</p>
          <h1 className="text-3xl font-bold mt-2">Gerenciamento de Campanhas</h1>
          <p className="text-slate-400 mt-2">Controle seus gastos e retorno em cada plataforma</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
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
            {editingId ? 'Editar Campanha' : 'Nova Campanha'}
          </h2>

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Plataforma</label>
              <select
                value={form.platform || 'Google'}
                onChange={(e) => setForm({ ...form, platform: e.target.value as Campaign['platform'] })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Google</option>
                <option>Meta</option>
                <option>TikTok</option>
                <option>Pinterest</option>
                <option>YouTube</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nome da Campanha</label>
              <input
                type="text"
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Exemplo: Campanha de Verão 2024"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Investimento</label>
                <input
                  type="text"
                  value={form.investment || ''}
                  onChange={(e) => setForm({ ...form, investment: e.target.value })}
                  placeholder="R$ 0,00"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Receita</label>
                <input
                  type="text"
                  value={form.revenue || ''}
                  onChange={(e) => setForm({ ...form, revenue: e.target.value })}
                  placeholder="R$ 0,00"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">ROI</label>
                <input
                  type="text"
                  value={form.roi || ''}
                  onChange={(e) => setForm({ ...form, roi: e.target.value })}
                  placeholder="0%"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ROAS</label>
                <input
                  type="text"
                  value={form.roas || ''}
                  onChange={(e) => setForm({ ...form, roas: e.target.value })}
                  placeholder="0x"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={form.status || 'active'}
                onChange={(e) => setForm({ ...form, status: e.target.value as Campaign['status'] })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Ativa</option>
                <option value="paused">Pausada</option>
                <option value="stopped">Parada</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Link da Plataforma</label>
              <input
                type="url"
                value={form.link || ''}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
          <h2 className="text-xl font-bold mb-6">Campanhas Cadastradas</h2>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 border-b border-white/20">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Campanha</th>
                  <th className="px-6 py-3 text-left font-semibold">Plataforma</th>
                  <th className="px-6 py-3 text-right font-semibold">Investimento</th>
                  <th className="px-6 py-3 text-right font-semibold">Receita</th>
                  <th className="px-6 py-3 text-center font-semibold">ROI</th>
                  <th className="px-6 py-3 text-center font-semibold">Status</th>
                  <th className="px-6 py-3 text-right font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                      Nenhuma campanha cadastrada
                    </td>
                  </tr>
                ) : (
                  campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-white/10 hover:bg-white/5 transition">
                      <td className="px-6 py-4 font-medium">{campaign.name}</td>
                      <td className="px-6 py-4">
                        <a
                          href={campaign.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition"
                        >
                          {campaign.platform} ↗
                        </a>
                      </td>
                      <td className="px-6 py-4 text-right">{campaign.investment}</td>
                      <td className="px-6 py-4 text-right text-green-400 font-medium">{campaign.revenue}</td>
                      <td className="px-6 py-4 text-center text-yellow-400 font-medium">{campaign.roi}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            campaign.status === 'active'
                              ? 'bg-green-500/20 text-green-300'
                              : campaign.status === 'paused'
                              ? 'bg-yellow-500/20 text-yellow-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}
                        >
                          {campaign.status === 'active'
                            ? 'Ativa'
                            : campaign.status === 'paused'
                            ? 'Pausada'
                            : 'Parada'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(campaign)}
                          className="text-blue-400 hover:text-blue-300 transition text-xs"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(campaign.id)}
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
