import { StockXAPI, StockXLocation } from "@vlourme/stockx-api";
export const getShoes = async (req, res) => {
  try {
    const api = new StockXAPI(StockXLocation.US);
    const shoes = await api.searchProducts("Travis", 1);
    res.json(shoes);
  } catch (error) {
    console.error("Ошибка при получении данных с StockX:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
