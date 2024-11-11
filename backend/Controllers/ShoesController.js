import { StockXAPI, StockXLocation } from "@vlourme/stockx-api";
import { query } from "express";
import axios from "axios";
export const getUserSection = async (req, res) => {
  try {
    const api = new StockXAPI(StockXLocation.US);
    const [recentlyViewed, recommendedItems] = await Promise.all([
      api.searchProducts("Travis", 1),
      api.searchProducts("Jordan", 1),
    ]);

    const data = {
      recentlyViewed: {
        title: "Recently viewed",
        description: "You recently viewed these products.",
        data: recentlyViewed.hits.slice(0, 6),
      },
      recommendedItems: {
        title: "Recommended For You",
        description:
          "These products are inspired by your previous browsing history.",
        data: recommendedItems.hits.slice(0, 6),
      },
    };

    res.json(data);
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getCollectionSection = async (req, res) => {
  try {
    const api = new StockXAPI(StockXLocation.US);
    const section = req.params.section;

    const [adidas, nike, balenciaga, accessories, supreme] = await Promise.all([
      api.searchProducts("Adidas", 1),
      api.searchProducts("Nike", 1),
      api.searchProducts("Balenciaga", 1),
      api.searchProducts("Accessories", 1),
      api.searchProducts("Supreme", 1),
    ]);

    const data = {
      adidas: {
        title: "Addidas Collection",
        description: "Top styles making waves this season",
        data: adidas.hits.slice(0, 6),
      },
      nike: {
        title: "Nike Collection",
        description: "Standout designs for every collection",
        data: nike.hits.slice(0, 6),
      },
      balenciaga: {
        title: "Balenciaga Collection",
        description: "Accessories to complete any look",
        data: balenciaga.hits.slice(0, 6),
      },
      accessories: {
        title: "Featured Accessories",
        description:
          "'Featured' products are a curated collection of our best selling items",
        data: accessories.hits.slice(0, 6),
      },
      supreme: {
        title: "Supreme Collection",
        description:
          "Supreme Collection features a curated selection of iconic streetwear essentials, blending bold style with unparalleled quality",
        data: supreme.hits.slice(0, 6),
      },
    };

    if (section === "addidas") {
      res.json(data.adidas);
    } else if (section === "nike") {
      res.json(data.nike);
    } else if (section === "balenciaga") {
      res.json(data.balenciaga);
    } else if (section === "accessories") {
      res.json(data.accessories);
    } else if (section === "supreme") {
      res.json(data.supreme);
    } else {
      res.status(404).json({ message: "Section not found" });
    }
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getInstagramSection = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/instagramSection/`;

    async function GetData(title) {
      const url = `https://api.sneakersapi.dev/search?query=${title}`;
      try {
        const response = await axios.get(url);
        return response.data.hits;
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return null;
      }
    }
    const [
      asicsData,
      jordan4Data,
      ounisotkaData,
      newBalanceData,
      lobsterDunkData,
    ] = await Promise.all([
      GetData("Asics"),
      GetData("Jordan 4 Retro Military Blue"),
      GetData("Onitsuka Tiger Mexico 66 Kill Bill"),
      GetData("New Balance 860v2 Aime Leon Dore Blue"),
      GetData(" Nike SB Dunk Low Concepts Purple Lobster"),
    ]);
    const data = [
      {
        image: `${baseUrl}asics.webp`,
        data: asicsData,
      },
      {
        image: `${baseUrl}jordan4.webp`,
        data: jordan4Data,
      },
      {
        image: `${baseUrl}ounisotka.webp`,
        data: ounisotkaData,
      },
      {
        image: `${baseUrl}newbalance.webp`,
        data: newBalanceData,
      },
      {
        image: `${baseUrl}purpledunk.webp`,
        data: lobsterDunkData,
      },
    ];

    res.json(data);
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
