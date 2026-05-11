'use client';

import { useEffect, useState } from 'react';
import type { Settings } from '@/lib/storage';
import { getSettings, saveSettings } from '@/lib/storage';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loaded = getSettings();
    setSettings(loaded);
  }, []);

  const handleSave = () => {
    if (settings) {
      saveSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (!settings) return <div className="text-center pt-20 text-white">Carregando...</div>;

  return (
    <div className="space-y-8">
      {saved && (
        <div className="fixed top-20 right-6 bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-300">
          ✓ Configurações salvas com sucesso!
        </div>
      )}

      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Configurações</p>
          <h1 className="text-3xl font-bold mt-2">Ajustes do Sistema</h1>
          <p className="text-slate-400 mt-2">Personalize o site e integre ferramentas externas</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-xl font-bold mb-6">Informações Gerais</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Site</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tema</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value as 'dark' | 'light' })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dark">Escuro</option>
                <option value="light">Claro</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Cor Primária</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                    className="w-full h-10 rounded-lg border border-white/10 cursor-pointer"
                  />
                  <span className="text-sm text-white/60 flex items-center">{settings.primaryColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cor Secundária</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                    className="w-full h-10 rounded-lg border border-white/10 cursor-pointer"
                  />
                  <span className="text-sm text-white/60 flex items-center">{settings.secondaryColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-xl font-bold mb-6">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meta Title</label>
              <input
                type="text"
                value={settings.metaTitle}
                onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                maxLength={60}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-white/40 mt-1">{settings.metaTitle.length}/60</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <textarea
                value={settings.metaDescription}
                onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                maxLength={160}
                rows={2}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-white/40 mt-1">{settings.metaDescription.length}/160</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Keywords</label>
              <input
                type="text"
                value={settings.keywords}
                onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
                placeholder="palavra1, palavra2, palavra3"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Tracking & Analytics */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-xl font-bold mb-6">Rastreamento & Analytics</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Google Analytics</label>
              <input
                type="text"
                value={settings.googleAnalytics || ''}
                onChange={(e) => setSettings({ ...settings, googleAnalytics: e.target.value })}
                placeholder="UA-XXXXXX-XX"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Google Tag Manager</label>
              <input
                type="text"
                value={settings.googleTagManager || ''}
                onChange={(e) => setSettings({ ...settings, googleTagManager: e.target.value })}
                placeholder="GTM-XXXXXX"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Pixel</label>
              <input
                type="text"
                value={settings.metaPixel || ''}
                onChange={(e) => setSettings({ ...settings, metaPixel: e.target.value })}
                placeholder="123456789"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">TikTok Pixel</label>
              <input
                type="text"
                value={settings.tiktokPixel || ''}
                onChange={(e) => setSettings({ ...settings, tiktokPixel: e.target.value })}
                placeholder="XXXXXXXXX"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-xl font-bold mb-6">Informações de Contato</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={settings.contactInfo.email || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contactInfo: { ...settings.contactInfo, email: e.target.value },
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                value={settings.contactInfo.phone || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contactInfo: { ...settings.contactInfo, phone: e.target.value },
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Endereço</label>
              <input
                type="text"
                value={settings.contactInfo.address || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contactInfo: { ...settings.contactInfo, address: e.target.value },
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-xl font-bold mb-6">Redes Sociais</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <input
                type="url"
                value={settings.socialLinks.instagram || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">TikTok</label>
              <input
                type="url"
                value={settings.socialLinks.tiktok || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, tiktok: e.target.value },
                  })
                }
                placeholder="https://tiktok.com/..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">YouTube</label>
              <input
                type="url"
                value={settings.socialLinks.youtube || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                  })
                }
                placeholder="https://youtube.com/..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Facebook</label>
              <input
                type="url"
                value={settings.socialLinks.facebook || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
                placeholder="https://facebook.com/..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Twitter/X</label>
              <input
                type="url"
                value={settings.socialLinks.twitter || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                  })
                }
                placeholder="https://twitter.com/..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Custom Scripts */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-xl font-bold mb-6">Scripts Personalizados</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Scripts Adicionais (HTML)</label>
              <textarea
                value={settings.customScripts || ''}
                onChange={(e) => setSettings({ ...settings, customScripts: e.target.value })}
                placeholder="Coloque aqui scripts personalizados..."
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              />
              <p className="text-xs text-white/40 mt-1">Scripts serão inseridos no final da página</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full lg:w-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02]"
      >
        💾 Salvar Configurações
      </button>
    </div>
  );
}
