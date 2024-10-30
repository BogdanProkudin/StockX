import { StockXAPI, StockXLocation } from "@vlourme/stockx-api";
export const getShoes = async (req, res) => {
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
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
export const getMainSection = async (req, res) => {
  try {
    const api = new StockXAPI(StockXLocation.US);
    const section = req.params.section;

    const [trending, featured] = await Promise.all([
      api.searchProducts("Adidas", 1),
      api.searchProducts("Nike", 1),
    ]);

    const data = {
      trending: {
        title: "Trending Sneakers",
        description:
          "'Trending' products are a curated collection of our best selling items",
        data: trending.hits.slice(0, 6),
      },
      featured: {
        title: "Featured Apparel",
        description:
          "'Featured' products are a curated collection of our best selling items",
        data: featured.hits.slice(0, 6),
      },
    };

    const mockData = { trendingItems: {}, featuredItems: {} };
    if (section === "trending") {
      mockData = { trendingItems: data.trending, featuredItems: {} };
    }
    if (section === "featured") {
      mockData = { trendingItems: data.trending, featuredItems: data.featured };
    }
    res.json(mockData);
    console.log(mockData.featuredItems);
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const searchProducts = async () => {
  const api = new StockXAPI(StockXLocation.US);
  const res = await api.searchProducts("Trading Cards");

  const filtered = res.hits.filter(
    (obj) => !obj.category.includes("Shoes") && obj.brand.includes("Nike")
  );
  console.log(filtered.length);
};
