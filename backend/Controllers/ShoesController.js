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

    const [
      adidas,
      nike,
      balenciaga,
      accessories,
      supreme,
      timberland,
      rickowens,
    ] = await Promise.all([
      api.searchProducts("Adidas", 1),
      api.searchProducts("Nike", 1),
      api.searchProducts("Balenciaga", 1),
      api.searchProducts("Accessories", 1),
      api.searchProducts("Supreme", 1),
      api.searchProducts("Timberland", 1),
      api.searchProducts("Rick Owens", 1),
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
      timberland: {
        title: "Timberland Collection",
        description:
          "Timberland Collection presents a carefully curated range of rugged essentials, merging outdoor durability with urban style and unmatched craftsmanship",
        data: timberland.hits.slice(0, 6),
      },
      rickowens: {
        title: "Rick Owens Collection",
        description:
          "Rick Owens x Collection offers a distinctive blend of avant-garde design and street sophistication, combining cutting-edge fashion with unrivaled quality.",
        data: rickowens.hits.slice(0, 6),
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
    } else if (section === "timberland") {
      res.json(data.timberland);
    } else if (section === "rickowens") {
      res.json(data.rickowens);
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
      nikeLd,
      jordan1Retro,
      onitsukaTiger,
      nikeVapor,
      nikeAirMax,
      jordan5First,
      jordan5Second,
      nikeV2K,
      prada,
      nikeSocks,
      newBalanceT500,
      jordan1Travis,
      nikeNocta,
      nikeNoctaSecond,
    ] = await Promise.all([
      GetData(
        "ASICS Novalis Gel-Teremoa Kiko Kostadinov Novalis Java Pewter Purple"
      ),
      GetData("Jordan 4 Retro Military Blue"),
      GetData("Onitsuka Tiger Mexico 66 Kill Bill"),
      GetData("New Balance 860v2 Aime Leon Dore Blue"),
      GetData("Nike SB Dunk Low Concepts Purple Lobster"),
      GetData("Nike LD-1000 SP Stussy Action Green"),
      GetData("Jordan 1 Retro Low OG Black Toe (2023)"),
      GetData("Onitsuka Tiger Mexico 66 Kill Bill"),
      GetData("Nike Vapor Street Off-White Polarized Blue (Women's)"),
      GetData("Nike Air Max 1 '86 OG Big Bubble Air Max Day (2024)"),
      GetData("Jordan 5 Retro A Ma Maniére Dusk"),
      GetData("Jordan 5 Retro Off-White Sail"),
      GetData("Nike V2K Run Summit White Metallic Silver (Women's)"),
      GetData("Prada Monolith 55mm Pointy Loafer Black Brushed Leather"),
      GetData("Nike Everyday Plus Cushioned Crew Socks (6 Pairs) White"),
      GetData("New Balance T500 Aime Leon Dore White Black"),
      GetData("Jordan 1 Retro Low OG SP Travis Scott Canary (Women's)"),
      GetData("Nike NOCTA Glide Drake Bright Crimson"),
      GetData("Nike x NOCTA L'Art DRX Long Sleeve Jersey Multicolor"),
    ]);

    const data = [
      {
        image: `${baseUrl}asics.webp`,
        data: [
          asicsData.find(
            (el) =>
              el.title ===
              "ASICS Novalis Gel-Teremoa Kiko Kostadinov Novalis Java Pewter Purple"
          ),
        ],
      },
      {
        image: `${baseUrl}jordan4.webp`,
        data: [
          ...jordan4Data.filter((el) =>
            /^Jordan 4 Retro Military Blue \(2024.*\)$/.test(el.title)
          ),
        ],
      },
      {
        image: `${baseUrl}ounisotka.webp`,
        data: [
          ounisotkaData.find(
            (el) => el.title === "Onitsuka Tiger Mexico 66 Kill Bill"
          ),
        ],
      },
      {
        image: `${baseUrl}newbalance.webp`,
        data: [
          newBalanceData.find(
            (el) => el.title === "New Balance 860v2 Aime Leon Dore Blue"
          ),
        ],
      },
      {
        image: `${baseUrl}purpledunk.webp`,
        data: [
          ...lobsterDunkData.filter((el) =>
            /Nike SB Dunk Low Concepts Purple Lobster/i.test(el.title)
          ),
        ],
      },
      {
        image: `${baseUrl}nikeLd.webp`,
        data: [
          nikeLd.find(
            (el) => el.title === "Nike LD-1000 SP Stussy Action Green"
          ),
        ],
      },
      {
        image: `${baseUrl}jordan1old.webp`,
        data: [
          ...jordan1Retro.filter((el) =>
            /^Jordan 1 Retro Low OG Black Toe \(2023.*\)$/.test(el.title)
          ),
        ],
      },
      {
        image: `${baseUrl}ounisotka2.webp`,
        data: [
          onitsukaTiger.find(
            (el) => el.title === "Onitsuka Tiger Mexico 66 Kill Bill"
          ),
        ],
      },
      {
        image: `${baseUrl}nikeVapor.webp`,
        data: [
          nikeVapor.find(
            (el) =>
              el.title ===
              "Nike Vapor Street Off-White Polarized Blue (Women's)"
          ),
        ],
      },
      {
        image: `${baseUrl}nikeAirMax.webp`,
        data: [
          nikeAirMax.find(
            (el) =>
              el.title === "Nike Air Max 1 '86 OG Big Bubble Air Max Day (2024)"
          ),
        ],
      },
      {
        image: `${baseUrl}jordan5.webp`,
        data: [
          ...jordan5First.filter(
            (el) => el.title === "Jordan 5 Retro A Ma Maniére Dusk"
          ),
          ...jordan5Second.filter(
            (el) => el.title === "Jordan 5 Retro Off-White Sail"
          ),
        ],
      },
      {
        image: `${baseUrl}nikev2k.webp`,
        data: [
          nikeV2K.find(
            (el) =>
              el.title === "Nike V2K Run Summit White Metallic Silver (Women's)"
          ),
        ],
      },
      {
        image: `${baseUrl}prada.webp`,
        data: [
          ...prada.filter(
            (el) =>
              el.title ===
              "Prada Monolith 55mm Pointy Loafer Black Brushed Leather"
          ),
          ...nikeSocks.filter(
            (el) =>
              el.title ===
              "Nike Everyday Plus Cushioned Crew Socks (6 Pairs) White"
          ),
        ],
      },

      {
        image: `${baseUrl}newbalance500.webp`,
        data: [
          newBalanceT500.find(
            (el) => el.title === "New Balance T500 Aime Leon Dore White Black"
          ),
        ],
      },
      {
        image: `${baseUrl}travis1.webp`,
        data: [
          jordan1Travis.find(
            (el) =>
              el.title ===
              "Jordan 1 Retro Low OG SP Travis Scott Canary (Women's)"
          ),
        ],
      },
      {
        image: `${baseUrl}nikenokta.webp`,
        data: [
          ...nikeNocta.filter(
            (el) => el.title === "Nike NOCTA Glide Drake Bright Crimson"
          ),
          ...nikeNoctaSecond.filter(
            (el) =>
              el.title ===
              "Nike x NOCTA L'Art DRX Long Sleeve Jersey Multicolor"
          ),
        ],
      },
    ];

    res.json(data);
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
