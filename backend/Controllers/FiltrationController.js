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

    console.log("Received params:", { searchQuery, category, brand, gender });

    let url = "https://api.sneakersapi.dev/api/v2/products";
    const queryParams = [];

    // Handle brand filter
    if (brand) {
      queryParams.push(`brand=${encodeURIComponent(brand)}`);
    }

    // Handle search query with category concatenation
    let searchTerm = searchQuery;
    if (!brand && searchQuery && searchQuery !== "all") {
      if (category) {
        // Concatenate category with search term
        searchTerm = `${searchQuery} ${category}`;
      }
      queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
    } else if (category && !brand) {
      // If only category exists without search query
      queryParams.push(`search=${encodeURIComponent(category)}`);
    }

    // Handle gender filter
    if (gender) {
      queryParams.push(`gender=${encodeURIComponent(gender)}`);
    }

    const finalUrl =
      queryParams.length > 0 ? `${url}?${queryParams.join("&")}` : url;

    console.log("Making request to:", finalUrl);
    console.log("Search term used:", searchTerm);

    function generateRequestId() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const requestId = generateRequestId();

    try {
      const response = await axios.get(finalUrl, {
        headers: { Authorization: "f-2895d084cba594772c79255a5fb658d0" },
      });

      // Ensure we have data to return
      const responseData = response.data?.data || [];

      console.log("Response received:", {
        status: response.status,
        dataLength: responseData.length,
        res: response.data,
        url: finalUrl,
      });

      return res.status(200).json({
        data: responseData,
        suggestionCountList: [responseData.length, 0, 0, 0],
        requestId: requestId,
      });
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message,
        "\nRequest URL:",
        finalUrl
      );
      return res.status(500).json({
        message: "Error fetching data",
        error: error.message,
      });
    }
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
        console.error("Error fetching data:", error);
      });
  } catch (err) {
    console.log("ERROR WHILE GETTING MORE ITEMS", err);
    return res.status(404).json({ message: "Server Error" });
  }
};
