import { StockXAPI, StockXLocation } from "@vlourme/stockx-api";
import { log } from "node:console";
import { it } from "node:test";
import axios from "axios";
import {
  buildQueryParams,
  fetchProducts,
  generateRequestId,
} from "../utils/BuildSearchQueryParams.js";
export const getSuggestionItemsCount = async (result) => {
  if (result.length >= 20) {
    return [10000, 7659, 1340, 569];
  } else if (result.length >= 15) {
    return [5000, 3359, 780, 256];
  } else if (result.length >= 10) {
    return [2531, 1356, 389, 189];
  } else {
    return [1351, 751, 149, 78];
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { searchQuery } = req.params;
    const { category, brand, gender, trending, color, page } = req.query;

    console.log("Received request:", {
      searchQuery,
      category,
      brand,
      gender,
      trending,
    });

    const baseUrl = `https://api.sneakersapi.dev/api/v2/products?page=${page}`;
    const queryString = buildQueryParams({
      brand,
      category,
      searchQuery,
      trending,
    });
    const apiUrl = `${baseUrl}&${queryString}`;

    console.log("API Request URL:", apiUrl);

    const response = await fetchProducts(apiUrl);
    const products = Array.isArray(response.data?.data)
      ? response.data.data
      : [];
    console.log(`API Response: ${products.length} items retrieved`);

    const filteredProducts = gender
      ? products.filter(
          (item) => item.gender.toLowerCase() === gender.toLowerCase()
        )
      : color
      ? products.filter((item) =>
          item.color.toLowerCase().includes(color.toLowerCase())
        )
      : products;

    return res.status(200).json({
      data: filteredProducts,
      suggestionCountList: [filteredProducts.length, 0, 0, 0],
      requestId: generateRequestId(),
    });
  } catch (error) {
    console.error("Error during search:", error);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const loadMoreItems = async (req, res) => {
  try {
    const { sectionName, page } = req.params;
    const url = `https://api.sneakersapi.dev/api/v2/products?search=${sectionName}&page=${page}`;
    console.log("URK", url);

    const response = await fetchProducts(url);
    const products = Array.isArray(response.data?.data)
      ? response.data.data
      : [];
    console.log(`API Response: ${products.length} items retrieved`);
    return res.status(200).json({
      data: products,

      requestId: generateRequestId(),
    });
  } catch (err) {
    console.log("ERROR WHILE GETTING MORE ITEMS", err);
    return res.status(404).json({ message: "Server Error" });
  }
};
