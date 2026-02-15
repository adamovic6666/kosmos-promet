// Legacy Product types (keeping for backwards compatibility)
export interface Product {
  id: number;
  name?: string;
  title?: string;
  image: string;
  alias: string;
  url?: string;
  is_new?: boolean;
  main_photo?: string;
  media_updated_at?: number;
  product_code?: string;
}

export interface ProductDetail {
  title: string;
  description: string;
  categories: string;
  main_photo: string;
  is_new: string;
  photo_gallery: {
    thumb: string[];
    orig: string[];
  };
  product_code: string;
  metatag: {
    title: string;
    description: string;
  };
  similar_products?: Product[];
  media_updated_at?: number;
  cena: string;
  akcijska_cena?: string;
  documentation?: string;
  breadcrumbs: {
    name: string;
    link: string;
  }[];
  is_available: boolean;
}

// New Category/Subcategory/Product structure
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  categorySlug: string;
  products: ProductItem[];
}

export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image: string;
  images?: string[];
  price: number;
  oldPrice?: number;
  inStock: boolean;
  stockQuantity?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  productCode: string;
  categorySlug: string;
  subcategorySlug: string;
  specifications?: { [key: string]: string };
  relatedProducts?: number[];
}

// Cart types
export interface CartItem {
  productId: string | number; // Support both string (product code) and number for backward compatibility
  name: string;
  image: string;
  price: string;
  quantity: number;
  productCode: string;
  slug: string;
  categorySlug: string;
  subcategorySlug: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface ProductDetailsProps {
  productDetails: ProductDetail;
}

export interface SimilarProductsProps {
  similarProducts: Product[];
}

export interface ConsentOptions {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentOptions {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentProps {
  onPreferenceChange: (preferences: ConsentOptions) => void;
}
