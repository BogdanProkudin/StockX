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
    res.status(500).json({ message: "Server Error" });
  }
};
export const getMainSection = async (req, res) => {
  try {
    const api = new StockXAPI(StockXLocation.US);
    const section = req.params.section;

    const [adidas, nike, balenciaga, accessories] = await Promise.all([
      api.searchProducts("Adidas", 1),
      api.searchProducts("Nike", 1),
      api.searchProducts("Balenciaga", 1),
      api.searchProducts("Accessories", 1),
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
    };

    if (section === "addidas") {
      res.json(data.adidas);
    } else if (section === "nike") {
      res.json(data.nike);
    } else if (section === "balenciaga") {
      res.json(data.balenciaga);
    } else if (section === "accessories") {
      res.json(data.accessories);
    } else {
      res.status(404).json({ message: "Section not found" });
    }
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

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
    const searchingValue = req.params.searchingValue;
    const api = new StockXAPI(StockXLocation.US);
    const result = await api.searchProducts(searchingValue);
    const suggestionCountList = await getSuggestionItemsCount(result.hits);
    const currentTime = Date.now();
    // const filtered = res.hits.filter(
    //   (obj) => !obj.category.includes("Shoes") && obj.brand.includes("Nike")
    // );
    function generateRequestId() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const requestId = generateRequestId();
    return res.status(200).json({
      data: result.hits,
      suggestionCountList: suggestionCountList,
      requestId: requestId,
    });
  } catch (err) {
    console.log("ERROR", err);
    return res.status(404).json({ message: "ERROR" });
  }
};

export const loadMoreItems = async (req, res) => {
  try {
    const { sectionName, page } = req.params;
    const api = new StockXAPI(StockXLocation.US);
    const result = await api.searchProducts(sectionName, page);
    return res.status(200).json({ data: result.hits });
  } catch (err) {
    console.log("ERROR WHILE GETTING MORE ITEMS", err);
    return res.status(404).json({ message: "Server Error" });
  }
};
