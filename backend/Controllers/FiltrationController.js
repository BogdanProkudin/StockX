import { StockXAPI, StockXLocation } from "@vlourme/stockx-api";
import { log } from "node:console";
import { it } from "node:test";
import axios from "axios";

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
    const { category, brand, gender } = req.query;

    console.log("Received request:", { searchQuery, category, brand, gender });

    const baseUrl = "https://api.sneakersapi.dev/api/v2/products";

    // Собираем параметры в объект
    const queryParams = {};
    if (brand) {
      queryParams.brand = brand;
    }
    if (category) {
      queryParams.search = category;
    }
    if (searchQuery && !brand) {
      queryParams.search = `${searchQuery}${category ? ` ${category}` : ""}`;
    }

    // Генерируем строку параметров
    const queryString = new URLSearchParams(queryParams).toString();
    const apiUrl = `${baseUrl}?${queryString}`;

    console.log("API Request URL:", apiUrl);

    const generateRequestId = () =>
      Math.floor(100000 + Math.random() * 900000).toString();
    const requestId = generateRequestId();

    // Выполняем запрос
    const response = await axios.get(apiUrl, {
      headers: { Authorization: "f-2895d084cba594772c79255a5fb658d0" },
    });

    const products = response.data?.data || [];
    console.log(`API Response: ${products.length} items retrieved`);

    // Фильтрация по gender
    const filteredProducts = gender
      ? products.filter(
          (item) => item.gender.toLowerCase() === gender.toLowerCase()
        )
      : products;

    return res.status(200).json({
      data: filteredProducts,
      suggestionCountList: [filteredProducts.length, 0, 0, 0],
      requestId,
    });
  } catch (error) {
    console.error("Error during search:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });

    return res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export const loadMoreItems = async (req, res) => {
  try {
    const { sectionName, page } = req.params;
    const url = `https://api.sneakersapi.dev/search?query=${sectionName}&page=${page}`;
    axios
      .get(url)
      .then((response) => {
        return res.status(200).json({
          data: response.data.hits,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } catch (err) {
    console.log("ERROR WHILE GETTING MORE ITEMS", err);
    return res.status(404).json({ message: "Server Error" });
  }
};
