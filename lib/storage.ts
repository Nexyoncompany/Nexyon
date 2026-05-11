// Storage utilities for persistent data management
// Structured for future Supabase integration

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  image: string;
  videoUrl?: string;
  category: string;
  platform: string;
  affiliateUrl: string;
  displayPrice: string;
  promotionalPrice?: string;
  estimatedCommission: string;
  featured: boolean;
  trending: boolean;
  active: boolean;
  clicks?: number;
  conversions?: number;
}

export interface Banner {
  id: string;
  image: string;
  title?: string;
  link?: string;
  page: string;
  position: 'hero' | 'top' | 'middle' | 'bottom' | 'sidebar' | 'footer';
  order: number;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  active: boolean;
}

export interface Commission {
  id: string;
  productId: string;
  productName: string;
  platform: string;
  soldValue: string;
  commissionValue: string;
  date: string;
  status: 'pending' | 'paid' | 'cancelled';
}

export interface Campaign {
  id: string;
  platform: 'Google' | 'Meta' | 'TikTok' | 'Pinterest' | 'YouTube';
  name: string;
  investment: string;
  revenue: string;
  roi: string;
  roas: string;
  status: 'active' | 'paused' | 'stopped';
  link?: string;
}

export interface Settings {
  siteName: string;
  logo?: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor: string;
  theme: 'dark' | 'light';
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  googleAnalytics?: string;
  googleTagManager?: string;
  metaPixel?: string;
  tiktokPixel?: string;
  customScripts?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
    youtube?: string;
  };
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  uploadDate: string;
}

// Default values
const defaultSettings: Settings = {
  siteName: 'NEXYON',
  primaryColor: '#3B82F6',
  secondaryColor: '#8B5CF6',
  theme: 'dark',
  metaTitle: 'NEXYON - Melhor Plataforma de Afiliados',
  metaDescription: 'Descubra produtos incríveis com os melhores preços e ofertas exclusivas na NEXYON.',
  keywords: 'afiliados, produtos, marketplace, compras',
  socialLinks: {},
  contactInfo: {},
};

// Initialize localStorage with default data if empty
export function initializeStorage() {
  try {
    if (typeof window === 'undefined') return;

    // Products
    if (!localStorage.getItem('nexyon_products')) {
      const defaultProducts: Product[] = [
        {
          id: '1',
          name: 'Fone Bluetooth Premium',
          description: 'Fone de ouvido com cancelamento de ruído ativo',
          shortDescription: 'Som cristalino e confortável',
          image: 'https://via.placeholder.com/300x300?text=Fone+Bluetooth',
          category: 'Eletrônicos',
          platform: 'Amazon',
          affiliateUrl: 'https://amazon.com/ref=affiliate',
          displayPrice: 'R$ 249,90',
          promotionalPrice: 'R$ 199,90',
          estimatedCommission: 'R$ 15,00',
          featured: true,
          trending: true,
          active: true,
          clicks: 1240,
          conversions: 145,
        },
        {
          id: '2',
          name: 'Smartwatch Pro',
          description: 'Relógio inteligente com monitor cardíaco',
          shortDescription: 'Rastreie sua saúde',
          image: 'https://via.placeholder.com/300x300?text=Smartwatch',
          category: 'Tecnologia',
          platform: 'Amazon',
          affiliateUrl: 'https://amazon.com/ref=affiliate',
          displayPrice: 'R$ 799,90',
          promotionalPrice: 'R$ 699,90',
          estimatedCommission: 'R$ 50,00',
          featured: true,
          trending: false,
          active: true,
          clicks: 870,
          conversions: 92,
        },
        {
          id: '3',
          name: 'Câmera 4K Mini',
          description: 'Câmera portátil com qualidade 4K',
          shortDescription: 'Filme em alta definição',
          image: 'https://via.placeholder.com/300x300?text=Câmera+4K',
          category: 'Fotografia',
          platform: 'TikTok Shop',
          affiliateUrl: 'https://tiktok.com/ref=affiliate',
          displayPrice: 'R$ 599,90',
          promotionalPrice: 'R$ 499,90',
          estimatedCommission: 'R$ 60,00',
          featured: false,
          trending: true,
          active: true,
          clicks: 980,
          conversions: 98,
        },
      ];
      localStorage.setItem('nexyon_products', JSON.stringify(defaultProducts));
    }

    // Banners
    if (!localStorage.getItem('nexyon_banners')) {
      const defaultBanners: Banner[] = [
        {
          id: '1',
          image: 'https://via.placeholder.com/1200x400?text=Banner+Principal',
          title: 'Bem-vindo à NEXYON',
          link: '/products',
          page: 'homepage',
          position: 'hero',
          order: 1,
          active: true,
        },
      ];
      localStorage.setItem('nexyon_banners', JSON.stringify(defaultBanners));
    }

    // Categories
    if (!localStorage.getItem('nexyon_categories')) {
      const defaultCategories: Category[] = [
        { id: '1', name: 'Achadinhos', description: 'Produtos com ótimos preços', active: true },
        { id: '2', name: 'Tendências', description: 'Produtos em alta', active: true },
        { id: '3', name: 'Utilidades', description: 'Itens essenciais do dia a dia', active: true },
      ];
      localStorage.setItem('nexyon_categories', JSON.stringify(defaultCategories));
    }

    // Settings
    if (!localStorage.getItem('nexyon_settings')) {
      localStorage.setItem('nexyon_settings', JSON.stringify(defaultSettings));
    }

    // Media
    if (!localStorage.getItem('nexyon_media')) {
      localStorage.setItem('nexyon_media', JSON.stringify([]));
    }

    // Commissions
    if (!localStorage.getItem('nexyon_commissions')) {
      localStorage.setItem('nexyon_commissions', JSON.stringify([]));
    }

    // Campaigns
    if (!localStorage.getItem('nexyon_campaigns')) {
      localStorage.setItem('nexyon_campaigns', JSON.stringify([]));
    }
  } catch (error) {
    console.error('Failed to initialize storage:', error);
  }
}

// Get methods
export function getProducts(): Product[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('nexyon_products');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getBanners(): Banner[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('nexyon_banners');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getCategories(): Category[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('nexyon_categories');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getSettings(): Settings {
  try {
    if (typeof window === 'undefined') return defaultSettings;
    const data = localStorage.getItem('nexyon_settings');
    return data ? JSON.parse(data) : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function getMedia(): MediaFile[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('nexyon_media');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getCommissions(): Commission[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('nexyon_commissions');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getCampaigns(): Campaign[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('nexyon_campaigns');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save methods
export function saveProducts(products: Product[]) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nexyon_products', JSON.stringify(products));
  } catch (error) {
    console.error('Failed to save products:', error);
  }
}

export function saveBanners(banners: Banner[]) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nexyon_banners', JSON.stringify(banners));
  } catch (error) {
    console.error('Failed to save banners:', error);
  }
}

export function saveCategories(categories: Category[]) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nexyon_categories', JSON.stringify(categories));
  } catch (error) {
    console.error('Failed to save categories:', error);
  }
}

export function saveSettings(settings: Settings) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nexyon_settings', JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function saveMedia(media: MediaFile[]) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nexyon_media', JSON.stringify(media));
  } catch (error) {
    console.error('Failed to save media:', error);
  }
}

export function saveCommissions(commissions: Commission[]) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nexyon_commissions', JSON.stringify(commissions));
  } catch (error) {
    console.error('Failed to save commissions:', error);
  }
}

export function saveCampaigns(campaigns: Campaign[]) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nexyon_campaigns', JSON.stringify(campaigns));
  } catch (error) {
    console.error('Failed to save campaigns:', error);
  }
}
