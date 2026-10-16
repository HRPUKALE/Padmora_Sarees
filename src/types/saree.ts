export interface SareeVariant {
  variantId?: number;
  colorName: string;
  swatch: string;
  price: number;
  stock: number;
  images: string[];
}

export interface Saree {
  id: number;
  name: string;
  slug: string;
  weave: 'Maheshwari' | 'Banarasi' | 'Narayanpet' | 'Paithani' | string;
  colour: string;
  price: number;
  mrp: number;
  stock: number;
  stockStatus: 'In stock' | 'Low stock' | 'Sold out';
  weaverName: string;
  weaverRegion: string;
  loomType: string;
  occasion: string;
  productUrl: string;
  liveUrl: string;
  imageUrls: string[];
  localImages: string[];
  variants: SareeVariant[];
  badge?: string | null;
  // Enhanced pitch demo fields
  fiberContent?: string;
  length?: string;
  weight?: string;
  certification?: string[];
  priceJustification?: {
    rawMaterials: number;
    artisanWeavingDays: number;
    weaverWages: number;
    finishingAndInspection: number;
    brandMarkup: number;
    narrative: string;
  };
  aiModelPhotos?: string[];
  reelVideoUrl?: string;
  reelPoster?: string;
}

export interface TryOnPreset {
  id: string;
  name: string;
  height: string;
  skinTone: 'Fair' | 'Wheatish' | 'Dusky' | 'Deep';
  description: string;
  avatarUrl: string;
  previewImages: Record<number, string>; // sareeId -> on-model preview
}
