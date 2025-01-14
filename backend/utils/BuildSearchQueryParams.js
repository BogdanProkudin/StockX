import axios from "axios";
export function buildQueryParams({ brand, category, searchQuery, trending }) {
  const params = {};
  if (brand) params.brand = brand;
  if (category) params.category = category.toLowerCase();
  if (searchQuery && !brand && searchQuery !== "all") {
    params.search = `${searchQuery}`;
  }
  if (trending) {
    params.trending = "true";
  }
  return new URLSearchParams(params).toString();
}
export const generateRequestId = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
export async function fetchProducts(apiUrl) {
  return await axios.get(apiUrl, {
    headers: { Authorization: process.env.AUTH_KEY },
  });
}
