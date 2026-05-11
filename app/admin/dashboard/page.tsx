'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdminDashboard() {
  const [period, setPeriod] = useState('7d');

  // Dados fictícios
  const metrics = [
    { label: 'Receita Total', value: 'R$ 45.250,00', change: '+12.5%', icon: '💰' },
    { label: 'Comissões Estimadas', value: 'R$ 9.050,00', change: '+8.3%', icon: '💵' },
    { label: 'Lucro Líquido', value: 'R$ 8.150,00', change: '+5.2%', icon: '📈' },
    { label: 'Gastos com Marketing', value: 'R$ 2.750,00', change: '-3.1%', icon: '📢' },
    { label: 'ROAS', value: '4.2x', change: '+0.5x', icon: '📊' },
    { label: 'Cliques Totais', value: '8.420', change: '+15.1%', icon: '🖱️' },
    { label: 'Conversões', value: '320', change: '+22.3%', icon: '✅' },
    { label: 'Produtos Ativos', value: '124', change: '+8', icon: '📦' },
  ];

  const topProducts = [
    { id: 1, name: 'Fone Bluetooth Premium', platform: 'Amazon', clicks: 1240, conversions: 145, revenue: 'R$ 8.700,00', commission: 'R$ 1.740,00' },
    { id: 2, name: 'Câmera 4K Mini', platform: 'TikTok Shop', clicks: 980, conversions: 98, revenue: 'R$ 5.880,00', commission: 'R$ 1.176,00' },
    { id: 3, name: 'Smartwatch Pro', platform: 'Amazon', clicks: 870, conversions: 92, revenue: 'R$ 7.360,00', commission: 'R$ 1.472,00' },
    { id: 4, name: 'Hub USB-C 7 Portas', platform: 'Shopee', clicks: 650, conversions: 78, revenue: 'R$ 2.340,00', commission: 'R$ 468,00' },
  ];

  const campaigns = [
    { id: 1, platform: 'Google Ads', investment: 'R$ 1.200,00', revenue: 'R$ 5.400,00', roi: '450%', status: 'Ativo' },
    { id: 2, platform: 'Meta (Facebook/Instagram)', investment: 'R$ 800,00', revenue: 'R$ 3.200,00', roi: '400%', status: 'Ativo' },
    { id: 3, platform: 'TikTok Ads', investment: 'R$ 450,00', revenue: 'R$ 2.250,00', roi: '500%', status: 'Pausado' },
    { id: 4, platform: 'Pinterest Ads', investment: 'R$ 300,00', revenue: 'R$ 900,00', roi: '300%', status: 'Ativo' },
  ];

  const abandonedCarts = [
    { id: 1, product: 'Fone Bluetooth Premium', email: 'cliente1@email.com', value: 'R$ 249,00', date: '2024-05-10' },
    { id: 2, product: 'Smartwatch Pro', email: 'cliente2@email.com', value: 'R$ 799,00', date: '2024-05-10' },
    { id: 3, product: 'Câmera 4K Mini', email: 'cliente3@email.com', value: 'R$ 599,00', date: '2024-05-09' },
  ];

  const alerts = [
    { type: 'warning', message: '3 produtos com estoque baixo' },
    { type: 'error', message: '2 links de afiliados inválidos' },
    { type: 'info', message: 'Campanha Google Ads com melhor performance' },
  ];

  const shortcuts = [
    { label: 'Adicionar Produto', icon: '➕', href: '/admin/products' },
    { label: 'Nova Campanha', icon: '📣', href: '/admin/marketing' },
    { label: 'Ver Analytics', icon: '📊', href: '/admin/analytics' },
    { label: 'Gerenciar Comissões', icon: '💰', href: '/admin/commissions' },
    { label: 'Criar Banner', icon: '🖼️', href: '/admin/settings' },
    { label: 'Configurações', icon: '⚙️', href: '/admin/settings' },
  ];

  // Dados para gráficos
  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Fev', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Abr', revenue: 22000 },
    { month: 'Mai', revenue: 25000 },
    { month: 'Jun', revenue: 28000 },
  ];

  const commissionData = [
    { platform: 'Amazon', commission: 4500 },
    { platform: 'Shopee', commission: 3200 },
    { platform: 'TikTok Shop', commission: 2800 },
    { platform: 'Mercado Livre', commission: 2100 },
    { platform: 'AliExpress', commission: 1800 },
  ];

  const roiData = [
    { campaign: 'Google Ads', roi: 450 },
    { campaign: 'Meta Ads', roi: 400 },
    { campaign: 'TikTok Ads', roi: 500 },
    { campaign: 'Pinterest', roi: 300 },
    { campaign: 'YouTube', roi: 350 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">Bem-vindo ao painel administrativo NEXYON</p>
          </div>
          
          {/* Period Selector */}
          <div className="flex gap-2">
            {[
              { label: 'Hoje', value: '1d' },
              { label: '7 dias', value: '7d' },
              { label: '30 dias', value: '30d' },
              { label: 'Este mês', value: 'month' },
              { label: 'Este ano', value: 'year' },
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

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{metric.label}</p>
                  <p className="text-2xl font-bold mt-2">{metric.value}</p>
                </div>
                <span className="text-3xl">{metric.icon}</span>
              </div>
              <p className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </p>
            </div>
          ))}
        </div>

        {/* Alerts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Alertas e Notificações</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.type === 'error'
                    ? 'bg-red-500/20 border-red-500/50'
                    : alert.type === 'warning'
                    ? 'bg-yellow-500/20 border-yellow-500/50'
                    : 'bg-blue-500/20 border-blue-500/50'
                }`}
              >
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Atalhos Rápidos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {shortcuts.map((shortcut, index) => (
              <a
                key={index}
                href={shortcut.href}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20 hover:border-purple-400/50 transition-all duration-300 text-center hover:scale-105 transform"
              >
                <div className="text-3xl mb-2">{shortcut.icon}</div>
                <p className="text-sm font-medium">{shortcut.label}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Top Products Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Produtos Mais Vendidos</h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/5 border-b border-white/20">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Produto</th>
                    <th className="px-6 py-3 text-left font-semibold">Plataforma</th>
                    <th className="px-6 py-3 text-center font-semibold">Cliques</th>
                    <th className="px-6 py-3 text-center font-semibold">Conversões</th>
                    <th className="px-6 py-3 text-right font-semibold">Receita</th>
                    <th className="px-6 py-3 text-right font-semibold">Comissão</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">
                          {product.platform}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">{product.clicks}</td>
                      <td className="px-6 py-4 text-center text-green-400 font-medium">{product.conversions}</td>
                      <td className="px-6 py-4 text-right font-medium">{product.revenue}</td>
                      <td className="px-6 py-4 text-right text-purple-400 font-medium">{product.commission}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Campanhas de Marketing</h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/5 border-b border-white/20">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Plataforma</th>
                    <th className="px-6 py-3 text-right font-semibold">Investimento</th>
                    <th className="px-6 py-3 text-right font-semibold">Receita</th>
                    <th className="px-6 py-3 text-center font-semibold">ROI</th>
                    <th className="px-6 py-3 text-center font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">{campaign.platform}</td>
                      <td className="px-6 py-4 text-right">{campaign.investment}</td>
                      <td className="px-6 py-4 text-right text-green-400 font-medium">{campaign.revenue}</td>
                      <td className="px-6 py-4 text-center text-yellow-400 font-medium">{campaign.roi}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'Ativo'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Abandoned Carts Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Carrinhos Abandonados</h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/5 border-b border-white/20">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Produto</th>
                    <th className="px-6 py-3 text-left font-semibold">Email do Cliente</th>
                    <th className="px-6 py-3 text-right font-semibold">Valor</th>
                    <th className="px-6 py-3 text-left font-semibold">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {abandonedCarts.map((cart) => (
                    <tr key={cart.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">{cart.product}</td>
                      <td className="px-6 py-4 text-blue-400">{cart.email}</td>
                      <td className="px-6 py-4 text-right font-medium">{cart.value}</td>
                      <td className="px-6 py-4">{cart.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <h3 className="text-lg font-bold mb-4">Receita por Período</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Commission Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <h3 className="text-lg font-bold mb-4">Comissão por Plataforma</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={commissionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="platform" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="commission" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROI Chart */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
          <h3 className="text-lg font-bold mb-4">ROI por Campanha</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="campaign" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="roi" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
