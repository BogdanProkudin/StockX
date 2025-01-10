// export interface userCardProps {
//   age_group: string;
//   availability: string;
//   avg_price: number;
//   base_price: number;
//   brand: string;
//   category: string;
//   color: string;
//   condition: string;
//   currency: string;
//   description: string;
//   gender: string;
//   id: string;
//   image: string;
//   inserted_at: string;
//   is_bundle: boolean;
//   labels: string[];
//   link: string;
//   max_price: number;
//   min_price: number;
//   release_date: null;
//   retail_price: null;
//   size_system: string;
//   sku: string;
//   slug: string;
//   title: string;
//   variants: {
//     gtin: string;
//     price: number;
//     size: string;
//     variant_id: string;
//     variant_link: string;
//   }[];
// }
export interface productProps {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  brand: string;
  category: string;
  color: string;
  sku: string;
  gender: string;
  image: string;
  blurhash: string;
  avg_price: number;
  min_price: number;
  max_price: number;
  currency: string;
  release_date: string;
  retail_price: number;
  retail_currency: string;
  weekly_rank: number;
  weekly_aov: number;
  weekly_gmv: number;
  weekly_orders: number;
  link: string;
  trending: boolean;
}
export interface oneProductProps {
  avg_price: number;
  blurhash: string;
  brand: string;
  category: string;
  color: string;
  currency: string;
  description: string;
  gender: string;
  id: string;
  image: string;
  link: string;
  max_price: number;
  min_price: number;
  release_date: string;
  retail_currency: string;
  retail_price: number;
  short_description: string;
  sku: string;
  slug: string;
  title: string;
  trending: boolean;
  weekly_aov: number;
  weekly_gmv: number;
  weekly_orders: number;
  weekly_rank: number;
  variants: {
    id: string;
    price: number;
    product_id: string;
    size: string;
  }[];
}
export interface FullProductProps {
  avg_price: number;
  blurhash: string;
  brand: string;
  category: string;
  color: string;
  currency: string;
  description: string;
  gender: string;
  id: string;
  image: string;
  images: null;
  links: {
    link: string;
    target: string;
  }[];
  max_price: number;
  min_price: number;
  release_dates: null | string;
  retail_prices: null | string;
  short_description: string;
  sku: string;
  slug: string;
  title: string;
  trending: boolean;
  variants: {
    brand: string;
    category: string;
    color: string;
    currency: string;
    description: string;
    gender: string;
    gtin: string;
    id: string;
    image: string;
    link: string;
    metadata: { category: string; model: string };
    price: number;
    product_id: string;
    size: string;
    sku: string;
    source: string;
    tags: string[];
    title: string;
  }[];
}

export interface OutletProductPageProps {
  product: FullProductProps;
  isLoading: boolean;
}
