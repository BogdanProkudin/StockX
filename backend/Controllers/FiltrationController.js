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
    const { searchingValue } = req.params;

    const url = `https://api.sneakersapi.dev/search?query=${searchingValue.toLowerCase()}`;
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

        return res.status(200).json({
          data: response.data.hits,
          suggestionCountList: suggestionCountList,
          requestId: requestId,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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

// export const searchCategoryProduct = async () => {
//   const nikeItems = [];

//   const url = `https://api.sneakersapi.dev/search?page=${0}&query=nike hat `;

//   const url2 = `https://api.sneakersapi.dev/search?page=${1}&query=nike hat `;

//   try {
//     const response = await axios.get(url);

//     const updated = await response.data.hits.filter((el) => {
//       if (
//         el.category.includes("Accessories") &&
//         !el.category.includes("Shoes")
//       ) {
//         return el;
//       }
//     });
//     nikeItems.push(...updated);
//     if (updated.length < 20) {
//       console.log("pidor");

//       const response2 = await axios.get(url2);
//       const updated2 = await response2.data.hits.filter((el) => {
//         if (
//           el.category.includes("Accessories") &&
//           !el.category.includes("Shoes")
//         ) {
//           return el;
//         }
//       });
//       nikeItems.push(...updated2);
//     }

//     console.log("Items fetched:", nikeItems.length);

//     return;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
