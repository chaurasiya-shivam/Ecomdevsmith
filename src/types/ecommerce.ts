export interface ProductColor {
  name: string;
  hex: string;
  inStock?: boolean;
}

export interface ProductVariantSize {
  name: string;
  inStock?: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string; // slug of category
  inStock: boolean;
  stockCount?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  badge?: string; // e.g. "20% OFF", "BESTSELLER", "NEW"
  tags?: string[];
  images: string[];
  colors?: ProductColor[];
  sizes?: ProductVariantSize[];
  features?: string[];
  specifications?: ProductSpecification[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  featured?: boolean;
  productCount?: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface StoreContact {
  email: string;
  phone: string;
  address: string;
  supportHours: string;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  description: string;
  logoText: string;
  logoBadge?: string;
  announcement?: {
    enabled: boolean;
    text: string;
    linkText?: string;
    linkHref?: string;
  };
  contact: StoreContact;
  socialLinks: SocialLink[];
  currency: {
    code: string;
    symbol: string;
    position: "prefix" | "suffix";
    decimals: number;
  };
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroConfig {
  badge: string;
  headline: string;
  highlightedHeadline: string;
  subheadline: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  stats: HeroStat[];
  image: string;
  floatingCard?: {
    title: string;
    subtitle: string;
    rating: number;
    price: string;
  };
}

export interface TrustPerk {
  id: string;
  title: string;
  description: string;
  icon: "ShieldCheck" | "Truck" | "RefreshCw" | "Headphones" | "Award" | "Zap";
}

export interface PromoBannerConfig {
  badge: string;
  title: string;
  subtitle: string;
  discountCode: string;
  discountPercent: number;
  ctaText: string;
  ctaHref: string;
  expiresText: string;
  bgGradient?: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  verifiedBuyer: boolean;
  productPurchased?: string;
}

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface NewsletterConfig {
  badge: string;
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  perks: string[];
  disclaimer: string;
}

export interface EcommerceConfig {
  store: StoreInfo;
  navigation: NavLink[];
  hero: HeroConfig;
  perks: TrustPerk[];
  categories: Category[];
  products: Product[];
  promoBanner: PromoBannerConfig;
  testimonials: Testimonial[];
  newsletter: NewsletterConfig;
  footer: {
    columns: FooterColumn[];
    copyright: string;
    paymentMethods: string[];
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
