export interface SearchResponse {
  data: SearchItem[];
  total: number;
  page: number;
  totalPages: number;
}

export interface SearchItem {
  id: string;
  title: string;
  slug: string;
  base_price: number;
  release_date?: string;
  image: string;
  // добавьте другие поля, которые приходят с бэкенда
}

export interface SearchParams {
  searchingValue: string;
  page?: number;
  limit?: number;
  sort?: string;
}
