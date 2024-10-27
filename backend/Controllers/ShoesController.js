import { StockXAPI, StockXLocation } from "@vlourme/stockx-api";
export const getShoes = async (req, res) => {
  try {
    const api = new StockXAPI(StockXLocation.US);
    const [recentlyViewed, featuredItems] = await Promise.all([
      api.searchProducts("Travis", 1),
      api.searchProducts("Jordan", 1),
    ]);

    const data = {
      recentlyViewed: {
        title: "Recently viewed",
        description: "You recently viewed these products.",
        data: recentlyViewed.hits.slice(0, 6),
      },
      featuredItems: {
        title: "Recommended For You",
        description:
          "These products are inspired by your previous browsing history.",
        data: featuredItems.hits.slice(0, 6),
      },
    };

    console.log(data.recentlyViewed.data);

    res.json(data);
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
export const getMainSection = async (req, res) => {
  try {
    const api = new StockXAPI(StockXLocation.US);
    const [trending, featuredItems] = await Promise.all([
      api.searchProducts("Adiddas", 1),
      api.searchProducts("Nike", 1),
    ]);
    const section = req.body.count;
    console.log(section);

    let data;
    if (section === 1) {
      data = {
        title: "Trending Sneakers",
        description:
          "'Trending' products are a curated collection of our best selling items",
        data: trending.hits.slice(0, 6),
      };
    } else if (section === 2) {
      data = {
        title: "Featured Apparel",
        description:
          "'Featured' products are a curated collection of our best selling items",
        data: featuredItems.hits.slice(0, 6),
      };
    }
    res.json(data);
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
