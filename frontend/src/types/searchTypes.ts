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
  avg_price: number;

  release_date?: string;
  image: string;
}

export interface SearchParams {
  searchingValue: string;
  categoryQuery: string | undefined;
  brandQuery: string | undefined;
  genderQuery: string | undefined;
  page?: number;
  limit?: number;
  sort?: string;
}
