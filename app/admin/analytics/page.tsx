'use client';

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getProducts, getCampaigns } from '@/lib/storage';

export default function AnalyticsPage() {
  const products = getProducts();
  const campaigns = getCampaigns();

  // Mock analytics data - in production, this would come from tracking
  const clicksPerDay = [
    { day: 'Seg', clicks: 340 },
    { day: 'Ter', clicks: 420 },
    { day: 'Qua', clicks: 380 },
    { day: 'Qui', clicks: 510 },
    { day: 'Sex', clicks: 650 },
    { day: 'Sáb', clicks: 720 },
    { day: 'Dom', clicks: 580 },
  ];

  const topProducts = products
    .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
    .slice(0, 5)
    .map((p) => ({
      name: p.name.substring(0, 15),
      clicks: p.clicks || 0,
      conversions: (p.conversions || 0) + Math.floor(Math.random() * 20),
    }));

  const platformRevenue = [
    { platform: 'Amazon', revenue: 8700 },
    { platform: 'TikTok Shop', revenue: 5880 },
    { platform: 'Shopee', revenue: 2340 },
    { platform: 'Mercado Livre', revenue: 1950 },
    { platform: 'AliExpress', revenue: 1200 },
  ];

  const conversionRate = [
    { product: 'Fone BT', conversion: 11.7 },
    { product: 'Smartwatch', conversion: 10.6 },
    { product: 'Câmera 4K', conversion: 10.0 },
  ];

  const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

  const totalClicks = products.reduce((sum, p) => sum + (p.clicks || 0), 0);
  const totalConversions = products.reduce((sum, p) => sum + (p.conversions || 0), 0);
  const ctr = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : '0';

  const stats = [
    { label: 'Cliques Totais', value: totalClicks.toLocaleString(), icon: '🖱️' },
    { label: 'Conversões', value: totalConversions.toLocaleString(), icon: '✅' },
    { label: 'CTR', value: `${ctr}%`, icon: '📊' },
    { label: 'Produtos Ativos', value: products.filter((p) => p.active).length, icon: '📦' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-xl shadow-slate-950/20"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cliques por Dia */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-lg font-bold mb-4">Cliques por Dia</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clicksPerDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="clicks" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Produtos Mais Clicados */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-lg font-bold mb-4">Top 5 Produtos Mais Clicados</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="clicks" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Receita por Plataforma */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-lg font-bold mb-4">Receita por Plataforma</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformRevenue}>
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
              <Bar dataKey="revenue" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Taxa de Conversão */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-lg font-bold mb-4">Taxa de Conversão</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="product" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="conversion" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Receita por Categoria */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-lg font-bold mb-4">Distribuição de Cliques</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformRevenue}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.platform}: ${entry.revenue}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="revenue"
              >
                {platformRevenue.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Relatório de Campanhas */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20 lg:col-span-1">
          <h2 className="text-lg font-bold mb-4">Campanhas Ativas</h2>
          <div className="space-y-3">
            {campaigns.filter((c) => c.status === 'active').length === 0 ? (
              <p className="text-slate-400 text-sm">Nenhuma campanha ativa</p>
            ) : (
              campaigns
                .filter((c) => c.status === 'active')
                .slice(0, 5)
                .map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div>
                      <p className="text-sm font-medium">{campaign.name}</p>
                      <p className="text-xs text-slate-400">{campaign.platform}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-400">{campaign.roi}</p>
                      <p className="text-xs text-slate-400">ROI</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Detailed Products Table */}
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
        <h2 className="text-lg font-bold mb-4">Análise Detalhada de Produtos</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 border-b border-white/20">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Produto</th>
                <th className="px-6 py-3 text-left font-semibold">Plataforma</th>
                <th className="px-6 py-3 text-center font-semibold">Cliques</th>
                <th className="px-6 py-3 text-center font-semibold">Conversões</th>
                <th className="px-6 py-3 text-center font-semibold">CTR</th>
                <th className="px-6 py-3 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const ctr = (product.clicks || 0) > 0 
                  ? (((product.conversions || 0) / (product.clicks || 1)) * 100).toFixed(2)
                  : '0';
                return (
                  <tr key={product.id} className="border-b border-white/10 hover:bg-white/5 transition">
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4">{product.platform}</td>
                    <td className="px-6 py-4 text-center">{product.clicks || 0}</td>
                    <td className="px-6 py-4 text-center text-green-400">{product.conversions || 0}</td>
                    <td className="px-6 py-4 text-center text-blue-400">{ctr}%</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        product.active 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {product.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
