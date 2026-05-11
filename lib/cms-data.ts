export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  active: boolean;
  createdAt: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  tags: string[];
  price: string;
  salePrice: string;
  commission: string;
  platform: string;
  affiliateUrl: string;
  image: string;
  gallery: string[];
  video?: string;
  featured: boolean;
  trending: boolean;
  active: boolean;
  createdAt: string;
};

export type Banner = {
  id: number;
  title: string;
  subtitle: string;
  imageDesktop: string;
  imageMobile: string;
  destinationUrl: string;
  order: number;
  active: boolean;
  position: 'hero' | 'top' | 'sidebar' | 'footer';
};

export type MediaItem = {
  id: number;
  name: string;
  url: string;
  type: 'image' | 'video' | 'file';
  size: string;
  uploadedAt: string;
};

export const initialCategories: Category[] = [
  { id: 1, name: 'Achadinhos', slug: 'achadinhos', description: 'Produtos únicos e descobertas especiais.', active: true, createdAt: '2024-05-01' },
  { id: 2, name: 'Tendências', slug: 'tendencias', description: 'Os produtos mais virais do momento.', active: true, createdAt: '2024-05-03' },
  { id: 3, name: 'Utilidades', slug: 'utilidades', description: 'Itens práticos para o dia a dia.', active: true, createdAt: '2024-05-04' },
];

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Fone Bluetooth Premium',
    slug: 'fone-bluetooth-premium',
    shortDescription: 'Áudio cristalino com cancelamento de ruído.',
    description: 'Fone bluetooth com design premium, longa duração de bateria e carregamento rápido.',
    category: 'Achadinhos',
    tags: ['audio', 'premium', 'bluetooth'],
    price: 'R$ 399,00',
    salePrice: 'R$ 299,00',
    commission: 'R$ 59,80',
    platform: 'Amazon',
    affiliateUrl: 'https://www.amazon.com.br/dp/exemplo',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    ],
    video: '',
    featured: true,
    trending: true,
    active: true,
    createdAt: '2024-05-08',
  },
  {
    id: 2,
    name: 'Câmera 4K Mini',
    slug: 'camera-4k-mini',
    shortDescription: 'Compacta, leve e com qualidade de cinema.',
    description: 'Câmera 4K com estabilização inteligente e lentes intercambiáveis.',
    category: 'Tendências',
    tags: ['camera', '4k', 'vlog'],
    price: 'R$ 899,00',
    salePrice: 'R$ 749,00',
    commission: 'R$ 112,35',
    platform: 'TikTok Shop',
    affiliateUrl: 'https://www.tiktok.com/shop/exemplo',
    image: 'https://images.unsplash.com/photo-1519183071298-a2962d04829f?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519183071298-a2962d04829f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80',
    ],
    video: '',
    featured: false,
    trending: true,
    active: true,
    createdAt: '2024-05-06',
  },
];

export const initialBanners: Banner[] = [
  {
    id: 1,
    title: 'Lançamento Premium',
    subtitle: 'Descubra os produtos mais exclusivos desta semana.',
    imageDesktop: 'https://images.unsplash.com/photo-1502378735452-bc7d86632805?auto=format&fit=crop&w=1200&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1502378735452-bc7d86632805?auto=format&fit=crop&w=600&q=80',
    destinationUrl: '/products',
    order: 1,
    active: true,
    position: 'hero',
  },
  {
    id: 2,
    title: 'Promoções Imperdíveis',
    subtitle: 'Aproveite ofertas selecionadas para você.',
    imageDesktop: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1200&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=600&q=80',
    destinationUrl: '/products',
    order: 2,
    active: true,
    position: 'top',
  },
];

export const initialMedia: MediaItem[] = [
  { id: 1, name: 'Banner Hero', url: 'https://images.unsplash.com/photo-1502378735452-bc7d86632805?auto=format&fit=crop&w=900&q=80', type: 'image', size: '240 KB', uploadedAt: '2024-05-08' },
  { id: 2, name: 'Product Showcase', url: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80', type: 'image', size: '310 KB', uploadedAt: '2024-05-07' },
  { id: 3, name: 'Launch Video', url: 'https://example.com/video.mp4', type: 'video', size: '18 MB', uploadedAt: '2024-05-05' },
];
