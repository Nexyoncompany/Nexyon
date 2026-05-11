'use client';

import { useMemo, useState } from 'react';
import { initialMedia } from '@/lib/cms-data';

export default function MediaPage() {
  const [media, setMedia] = useState(initialMedia);
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => media.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
    [media, query]
  );

  const remove = (id: number) => setMedia(media.filter((item) => item.id !== id));

  return (
    <div className="space-y-8">
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Mídia</p>
            <h1 className="text-3xl font-semibold">Biblioteca de mídia</h1>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar mídia..."
            className="rounded-full border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-lg shadow-slate-950/10">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{item.type.toUpperCase()}</p>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                </div>
                <span className="text-sm text-slate-400">{item.size}</span>
              </div>
              <div className="mb-4 rounded-3xl overflow-hidden bg-slate-900/80 border border-white/10">
                <div className="h-40 bg-slate-800 flex items-center justify-center text-slate-500">
                  {item.type === 'image' ? 'Imagem' : item.type === 'video' ? 'Vídeo' : 'Arquivo'}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{item.uploadedAt}</span>
                <button
                  onClick={() => remove(item.id)}
                  className="text-red-300 hover:text-red-100 transition"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
