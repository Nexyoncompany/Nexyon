'use client';

import { useEffect, useState } from 'react';
import {
  getPlatformBalances,
  getBankAccounts,
  getTransfers,
  getReceipts,
  saveBankAccounts,
  saveTransfers,
  saveReceipts,
  type PlatformBalance,
  type BankAccount,
  type Transfer,
  type Receipt,
} from '@/lib/storage';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function FinancePage() {
  const [balances, setBalances] = useState<PlatformBalance[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  const [activeTab, setActiveTab] = useState<'overview' | 'accounts' | 'transfers' | 'receipts'>('overview');
  const [showBankForm, setShowBankForm] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);

  const [bankForm, setBankForm] = useState<Partial<BankAccount>>({
    bankName: '',
    accountHolder: '',
    cpfCnpj: '',
    agency: '',
    accountNumber: '',
    accountType: 'checking',
    isDefault: false,
  });

  const [transferForm, setTransferForm] = useState<Partial<Transfer>>({
    platform: '',
    amount: '',
    bankAccountId: '',
    date: new Date().toISOString().slice(0, 10),
    status: 'pending',
  });

  useEffect(() => {
    setBalances(getPlatformBalances());
    setBankAccounts(getBankAccounts());
    setTransfers(getTransfers());
    setReceipts(getReceipts());
  }, []);

  const handleAddBankAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankForm.bankName || !bankForm.accountHolder) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const account: BankAccount = {
      id: `bank_${Date.now()}`,
      bankName: bankForm.bankName,
      accountHolder: bankForm.accountHolder,
      cpfCnpj: bankForm.cpfCnpj || '',
      agency: bankForm.agency || '',
      accountNumber: bankForm.accountNumber || '',
      accountType: bankForm.accountType || 'checking',
      pixKey: bankForm.pixKey,
      isDefault: bankForm.isDefault || false,
    };

    const updated = [...bankAccounts, account];
    setBankAccounts(updated);
    saveBankAccounts(updated);
    setBankForm({
      bankName: '',
      accountHolder: '',
      cpfCnpj: '',
      agency: '',
      accountNumber: '',
      accountType: 'checking',
      isDefault: false,
    });
    setShowBankForm(false);
  };

  const handleAddTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferForm.platform || !transferForm.amount || !transferForm.bankAccountId) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const transfer: Transfer = {
      id: `transfer_${Date.now()}`,
      platform: transferForm.platform,
      amount: transferForm.amount,
      bankAccountId: transferForm.bankAccountId,
      date: transferForm.date || new Date().toISOString().slice(0, 10),
      status: transferForm.status || 'pending',
      referenceNumber: `TRF${Date.now()}`,
    };

    const updated = [...transfers, transfer];
    setTransfers(updated);
    saveTransfers(updated);
    setTransferForm({
      platform: '',
      amount: '',
      bankAccountId: '',
      date: new Date().toISOString().slice(0, 10),
      status: 'pending',
    });
    setShowTransferForm(false);
  };

  const handleDeleteBankAccount = (id: string) => {
    const updated = bankAccounts.filter((a) => a.id !== id);
    setBankAccounts(updated);
    saveBankAccounts(updated);
  };

  const handleDeleteTransfer = (id: string) => {
    const updated = transfers.filter((t) => t.id !== id);
    setTransfers(updated);
    saveTransfers(updated);
  };

  // Cálculos
  const availableTotal = balances.reduce((sum, b) => {
    const value = parseFloat(b.available.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (Number.isNaN(value) ? 0 : value);
  }, 0);

  const pendingTotal = balances.reduce((sum, b) => {
    const value = parseFloat(b.pending.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (Number.isNaN(value) ? 0 : value);
  }, 0);

  const receivedTotal = balances.reduce((sum, b) => {
    const value = parseFloat(b.received.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (Number.isNaN(value) ? 0 : value);
  }, 0);

  const transferredTotal = transfers
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => {
      const value = parseFloat(t.amount.replace(/[^0-9.,]/g, '').replace(',', '.'));
      return sum + (Number.isNaN(value) ? 0 : value);
    }, 0);

  const chartData = balances.map((b) => ({
    name: b.platform.split(' ')[0],
    available: parseFloat(b.available.replace(/[^0-9.,]/g, '').replace(',', '.')),
    pending: parseFloat(b.pending.replace(/[^0-9.,]/g, '').replace(',', '.')),
  }));

  const stats = [
    { label: 'Saldo Disponível', value: `R$ ${availableTotal.toFixed(2).replace('.', ',')}`, icon: '💰' },
    { label: 'Comissões Pendentes', value: `R$ ${pendingTotal.toFixed(2).replace('.', ',')}`, icon: '⏳' },
    { label: 'Total Recebido', value: `R$ ${receivedTotal.toFixed(2).replace('.', ',')}`, icon: '✅' },
    { label: 'Total Transferido', value: `R$ ${transferredTotal.toFixed(2).replace('.', ',')}`, icon: '🏦' },
  ];

  const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#06B6D4'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Financeiro</p>
          <h1 className="text-3xl font-bold mt-2">Gestão Financeira</h1>
          <p className="text-slate-400 mt-2">Acompanhe saldos por plataforma e gerencie transferências</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-2">
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
        <div className="flex gap-2 border-b border-white/10 mb-6">
          {(['overview', 'accounts', 'transfers', 'receipts'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition-all ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-500'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab === 'overview'
                ? '📊 Visão Geral'
                : tab === 'accounts'
                ? '🏦 Contas Bancárias'
                : tab === 'transfers'
                ? '💸 Transferências'
                : '📋 Recebimentos'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Platform Balances */}
            <div>
              <h2 className="text-xl font-bold mb-6">Saldos por Plataforma</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {balances.map((balance) => (
                  <div
                    key={balance.id}
                    className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-6 hover:border-white/30 transition"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{balance.platform}</h3>
                      <span className="text-3xl">{balance.icon}</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Disponível</span>
                        <span className="font-bold text-green-400">{balance.available}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Pendente</span>
                        <span className="font-bold text-yellow-400">{balance.pending}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Recebido</span>
                        <span className="font-bold text-blue-400">{balance.received}</span>
                      </div>
                      <div className="border-t border-white/10 pt-3">
                        <div className="flex justify-between">
                          <span className="text-white/60">Próx. Pagamento</span>
                          <span className="font-bold">
                            {new Date(balance.nextPaymentDate).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        {balance.minimumWithdrawal && (
                          <div className="text-xs text-white/40 mt-2">
                            Mín. saque: {balance.minimumWithdrawal}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Balance by Platform */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Saldo Disponível por Plataforma</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="available" fill="#3B82F6" />
                    <Bar dataKey="pending" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Distribuição de Receita</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={balances}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry: any) => entry.platform.split(' ')[0]}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="received"
                    >
                      {balances.map((_, index) => (
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
            </div>
          </div>
        )}

        {/* Bank Accounts Tab */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <button
              onClick={() => setShowBankForm(true)}
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              + Adicionar Conta Bancária
            </button>

            {showBankForm && (
              <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-lg">Nova Conta Bancária</h3>
                <form onSubmit={handleAddBankAccount} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Banco</label>
                    <input
                      type="text"
                      value={bankForm.bankName || ''}
                      onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Titular *</label>
                    <input
                      type="text"
                      value={bankForm.accountHolder || ''}
                      onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CPF/CNPJ</label>
                    <input
                      type="text"
                      value={bankForm.cpfCnpj || ''}
                      onChange={(e) => setBankForm({ ...bankForm, cpfCnpj: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Agência</label>
                    <input
                      type="text"
                      value={bankForm.agency || ''}
                      onChange={(e) => setBankForm({ ...bankForm, agency: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Conta</label>
                    <input
                      type="text"
                      value={bankForm.accountNumber || ''}
                      onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Conta</label>
                    <select
                      value={bankForm.accountType || 'checking'}
                      onChange={(e) => setBankForm({ ...bankForm, accountType: e.target.value as any })}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    >
                      <option value="checking">Corrente</option>
                      <option value="savings">Poupança</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Chave PIX</label>
                    <input
                      type="text"
                      value={bankForm.pixKey || ''}
                      onChange={(e) => setBankForm({ ...bankForm, pixKey: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={bankForm.isDefault || false}
                      onChange={(e) => setBankForm({ ...bankForm, isDefault: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Conta padrão</span>
                  </label>
                  <div className="col-span-full flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-blue-500 px-4 py-2 font-medium transition hover:bg-blue-600"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBankForm(false)}
                      className="flex-1 rounded-lg bg-slate-700 px-4 py-2 font-medium transition hover:bg-slate-600"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {bankAccounts.length === 0 ? (
              <div className="text-center py-12 text-white/60">
                Nenhuma conta bancária cadastrada
              </div>
            ) : (
              <div className="space-y-3">
                {bankAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="bg-slate-950/50 border border-white/10 rounded-lg p-4 flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{account.bankName}</h4>
                      <p className="text-sm text-white/60">{account.accountHolder}</p>
                      <p className="text-xs text-white/40 mt-1">
                        {account.accountType === 'checking' ? 'Conta Corrente' : 'Poupança'} • Ag: {account.agency} • Cc: {account.accountNumber}
                      </p>
                      {account.pixKey && (
                        <p className="text-xs text-white/40">PIX: {account.pixKey}</p>
                      )}
                      {account.isDefault && (
                        <span className="inline-block mt-2 text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                          Padrão
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteBankAccount(account.id)}
                      className="text-red-400 hover:text-red-300 transition ml-4"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Transfers Tab */}
        {activeTab === 'transfers' && (
          <div className="space-y-6">
            <button
              onClick={() => setShowTransferForm(true)}
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              + Nova Transferência
            </button>

            {showTransferForm && (
              <div className="bg-slate-950/50 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-lg">Registrar Transferência</h3>
                <form onSubmit={handleAddTransfer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Plataforma *</label>
                    <select
                      value={transferForm.platform || ''}
                      onChange={(e) => setTransferForm({ ...transferForm, platform: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    >
                      <option value="">Selecionar</option>
                      {balances.map((b) => (
                        <option key={b.id} value={b.platform}>
                          {b.platform}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Conta Bancária *</label>
                    <select
                      value={transferForm.bankAccountId || ''}
                      onChange={(e) => setTransferForm({ ...transferForm, bankAccountId: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    >
                      <option value="">Selecionar</option>
                      {bankAccounts.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.bankName} - {a.accountHolder}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor *</label>
                    <input
                      type="text"
                      value={transferForm.amount || ''}
                      onChange={(e) => setTransferForm({ ...transferForm, amount: e.target.value })}
                      placeholder="R$ 0,00"
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Data</label>
                    <input
                      type="date"
                      value={transferForm.date || ''}
                      onChange={(e) => setTransferForm({ ...transferForm, date: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={transferForm.status || 'pending'}
                      onChange={(e) => setTransferForm({ ...transferForm, status: e.target.value as any })}
                      className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-white"
                    >
                      <option value="pending">Pendente</option>
                      <option value="completed">Concluída</option>
                      <option value="failed">Falha</option>
                    </select>
                  </div>
                  <div className="col-span-full flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-blue-500 px-4 py-2 font-medium transition hover:bg-blue-600"
                    >
                      Registrar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTransferForm(false)}
                      className="flex-1 rounded-lg bg-slate-700 px-4 py-2 font-medium transition hover:bg-slate-600"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {transfers.length === 0 ? (
              <div className="text-center py-12 text-white/60">
                Nenhuma transferência registrada
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Plataforma</th>
                      <th className="px-6 py-3 text-left font-semibold">Conta</th>
                      <th className="px-6 py-3 text-right font-semibold">Valor</th>
                      <th className="px-6 py-3 text-left font-semibold">Data</th>
                      <th className="px-6 py-3 text-center font-semibold">Status</th>
                      <th className="px-6 py-3 text-left font-semibold">Ref.</th>
                      <th className="px-6 py-3 text-right font-semibold">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transfers.map((transfer) => {
                      const account = bankAccounts.find((a) => a.id === transfer.bankAccountId);
                      return (
                        <tr key={transfer.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="px-6 py-4">{transfer.platform}</td>
                          <td className="px-6 py-4 text-sm text-white/60">
                            {account?.bankName} ({account?.accountNumber})
                          </td>
                          <td className="px-6 py-4 text-right font-medium">{transfer.amount}</td>
                          <td className="px-6 py-4 text-sm">
                            {new Date(transfer.date).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                transfer.status === 'completed'
                                  ? 'bg-green-500/20 text-green-300'
                                  : transfer.status === 'pending'
                                  ? 'bg-yellow-500/20 text-yellow-300'
                                  : 'bg-red-500/20 text-red-300'
                              }`}
                            >
                              {transfer.status === 'completed'
                                ? 'Concluída'
                                : transfer.status === 'pending'
                                ? 'Pendente'
                                : 'Falha'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-white/60">{transfer.referenceNumber}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteTransfer(transfer.id)}
                              className="text-red-400 hover:text-red-300 transition"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Receipts Tab */}
        {activeTab === 'receipts' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Recebimentos Previstos</h2>
            {receipts.length === 0 && balances.length > 0 ? (
              <div className="text-center py-12 text-white/60">
                <p>Nenhum recebimento registrado</p>
                <p className="text-sm mt-2">Os recebimentos previstos aparecerão aqui</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Plataforma</th>
                      <th className="px-6 py-3 text-right font-semibold">Valor</th>
                      <th className="px-6 py-3 text-left font-semibold">Previsto</th>
                      <th className="px-6 py-3 text-left font-semibold">Recebido</th>
                      <th className="px-6 py-3 text-center font-semibold">Status</th>
                      <th className="px-6 py-3 text-left font-semibold">Ref.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipts.map((receipt) => (
                      <tr key={receipt.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="px-6 py-4">{receipt.platform}</td>
                        <td className="px-6 py-4 text-right font-medium">{receipt.amount}</td>
                        <td className="px-6 py-4 text-sm">
                          {new Date(receipt.expectedDate).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-sm text-white/60">
                          {receipt.receivedDate ? new Date(receipt.receivedDate).toLocaleDateString('pt-BR') : '-'}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                              receipt.status === 'received'
                                ? 'bg-green-500/20 text-green-300'
                                : receipt.status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-300'
                                : 'bg-red-500/20 text-red-300'
                            }`}
                          >
                            {receipt.status === 'received'
                              ? 'Recebido'
                              : receipt.status === 'pending'
                              ? 'Pendente'
                              : 'Cancelado'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-white/60">{receipt.referenceNumber || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
