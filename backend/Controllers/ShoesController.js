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
    const [trendingItems, featuredItems] = await Promise.all([
      api.searchProducts("Adiddas", 1),
      api.searchProducts("Nike", 1),
    ]);
    const section = req.params.section;
    const data = {
      trendingItems: {
        title: "Trending Sneakers",
        description:
          "'Trending' products are a curated collection of our best selling items",
        data: trendingItems.hits.slice(0, 6),
      },
      featuredItems: {
        title: "Featured Apparel",
        description:
          "'Featured' products are a curated collection of our best selling items",
        data: featuredItems.hits.slice(0, 6),
      },
    };
    console.log(section);

    if (section === "trending") {
      res.json(data.trendingItems);
    } else {
      res.json(data.featuredItems);
    }
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
