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
    const searchingValue = req.params.searchingValue;
    const api = new StockXAPI(StockXLocation.US);

    const url = `https://api.sneakersapi.dev/search?query=${searchingValue}`;
    function generateRequestId() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const requestId = generateRequestId();

    axios
      .get(url)
      .then(async (response) => {
        const suggestionCountList = await getSuggestionItemsCount(
          response.data.hits
        );
        console.log("RES", response.data);
        return res.status(200).json({
          data: response.data.hits,
          suggestionCountList: suggestionCountList,
          requestId: requestId,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const currentTime = Date.now();
  } catch (err) {
    console.log("ERROR", err);
    return res.status(404).json({ message: "ERROR" });
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
        console.error("Error fetching data:", error); // Ошибка при запросе
      });
  } catch (err) {
    console.log("ERROR WHILE GETTING MORE ITEMS", err);
    return res.status(404).json({ message: "Server Error" });
  }
};
