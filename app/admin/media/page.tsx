'use client';

import { useEffect, useState } from 'react';
import type { MediaFile } from '@/lib/storage';
import { getMedia, saveMedia } from '@/lib/storage';

export default function MediaPage() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  useEffect(() => {
    setMedia(getMedia());
  }, []);

  useEffect(() => {
    saveMedia(media);
  }, [media]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    const newMedia: MediaFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        const fileType = file.type.startsWith('video') ? 'video' : 'image';
        const mediaFile: MediaFile = {
          id: `media_${Date.now()}_${i}`,
          name: file.name,
          url: reader.result as string,
          type: fileType,
          size: file.size,
          uploadDate: new Date().toISOString(),
        };
        newMedia.push(mediaFile);

        if (newMedia.length === files.length) {
          setMedia([...newMedia, ...media]);
          setUploading(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
  };

  const filteredMedia = media.filter((m) => filter === 'all' || m.type === filter);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copiada para a área de transferência!');
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl shadow-slate-950/20">
        <div className="grid gap-4 lg:grid-cols-3 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Mídia</p>
            <h1 className="text-3xl font-semibold mt-2">Biblioteca de Mídia</h1>
          </div>

          <div className="col-span-2 flex flex-col sm:flex-row gap-3">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Todos ({media.length})
              </button>
              <button
                onClick={() => setFilter('image')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filter === 'image'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Imagens ({media.filter((m) => m.type === 'image').length})
              </button>
              <button
                onClick={() => setFilter('video')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filter === 'video'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Vídeos ({media.filter((m) => m.type === 'video').length})
              </button>
            </div>
          </div>
        </div>

        {uploading && (
          <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-2xl text-blue-300">
            Enviando arquivos...
          </div>
        )}

        {filteredMedia.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-4">📁</div>
            <p className="text-slate-400 mb-2">Nenhum arquivo encontrado</p>
            <p className="text-xs text-slate-500">Comece enviando imagens ou vídeos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMedia.map((file) => (
              <div
                key={file.id}
                className="bg-slate-950/80 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all group"
              >
                {/* Preview */}
                <div className="relative h-40 bg-slate-900 overflow-hidden">
                  {file.type === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <video
                      src={file.url}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopyUrl(file.url)}
                      className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-white transition"
                      title="Copiar URL"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => window.open(file.url, '_blank')}
                      className="bg-purple-500 hover:bg-purple-600 p-2 rounded-full text-white transition"
                      title="Visualizar"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="bg-red-500 hover:bg-red-600 p-2 rounded-full text-white transition"
                      title="Deletar"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-1 rounded-full text-xs text-white border border-white/20">
                    {file.type === 'image' ? '🖼️ IMG' : '🎬 VID'}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <p className="text-sm font-medium text-white truncate" title={file.name}>
                    {file.name}
                  </p>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{new Date(file.uploadDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
