import axios from "axios";
export async function fetchBrandProducts(brand, pageValue) {
  const apiUrl = `https://api.sneakersapi.dev/api/v2/products?${pageValue}=1&brand=${brand}`;
  const { data } = await axios.get(apiUrl, {
    headers: { Authorization: process.env.AUTH_KEY },
  });
  return data;
}
export async function fetchSearchProducts(searchValue, pageValue) {
  const apiUrl = `https://api.sneakersapi.dev/api/v2/products?search=${searchValue}&page=${pageValue}`;
  const { data } = await axios.get(apiUrl, {
    headers: { Authorization: process.env.AUTH_KEY },
  });
  return data;
}
