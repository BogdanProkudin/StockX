export interface userCardProps {
  age_group: string;
  availability: string;
  avg_price: number;
  base_price: number;
  brand: string;
  category: string;
  color: string;
  condition: string;
  currency: string;
  description: string;
  gender: string;
  id: string;
  image: string;
  inserted_at: string;
  is_bundle: boolean;
  labels: string[];
  link: string;
  max_price: number;
  min_price: number;
  release_date: null;
  retail_price: null;
  size_system: string;
  sku: string;
  slug: string;
  title: string;
  variants: {
    gtin: string;
    price: number;
    size: string;
    variant_id: string;
    variant_link: string;
  }[];
}
