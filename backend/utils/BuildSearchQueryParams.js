import axios from "axios";
export function buildQueryParams({ brand, category, searchQuery }) {
  const params = {};
  if (brand) params.brand = brand;
  if (category) params.search = category;
  if (searchQuery && !brand) {
    params.search = `${searchQuery}${category ? ` ${category}` : ""}`;
  }
  return new URLSearchParams(params).toString();
}
export const generateRequestId = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
export async function fetchProducts(apiUrl) {
  return await axios.get(apiUrl, {
    headers: { Authorization: "f-2895d084cba594772c79255a5fb658d0" },
  });
}
