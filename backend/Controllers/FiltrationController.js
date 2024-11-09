import { StockXAPI, StockXLocation } from "@vlourme/stockx-api";
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
