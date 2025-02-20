import { variants } from "../components/FullProduct/SizePopUp";

export const SizeVariants = (variants: variants[]) => {
  const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const menShoesSizes = [
    3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
    12.5, 13, 14, 15, 16, 17,
  ];
  const kidsShoesSizes = ["4Y", "4.5Y", "5Y", "5.5Y", "6Y", "6.5Y", "7Y"];
  const womenWideShoesSizes = [
    "5W",
    "5.5W",
    "6W",
    "6.5W",
    "7W",
    "7.5W",
    "8W",
    "8.5W",
    "9W",
    "9.5W",
    "10W",
    "10.5W",
    "11W",
    "11.5W",
    "12W",
  ];

  const toddlerShoesSizes = [
    "3C",
    "3.5C",
    "4C",
    "4.5C",
    "5C",
    "5.5C",
    "6C",
    "6.5C",
    "7C",
    "7.5C",
    "8C",
    "8.5C",
    "9C",
    "9.5C",
    "10C",
    "10.5C",
    "11C",
    "11.5C",
    "12C",
    "12.5C",
    "13C",
  ];
  const infantShoesSizes = ["0C", "1C", "2C"];
  const selectedVariant = variants.length > 0 ? variants[0].size : null;

  const getSizeArray = (size: string | number | null) => {
    if (!size) return menShoesSizes;

    if (clothingSizes.includes(size as string)) return clothingSizes;
    if (menShoesSizes.includes(size as number)) return menShoesSizes;
    if (kidsShoesSizes.includes(size as string)) return kidsShoesSizes;
    if (womenWideShoesSizes.includes(size as string))
      return womenWideShoesSizes;
    if (toddlerShoesSizes.includes(size as string)) return toddlerShoesSizes;
    if (infantShoesSizes.includes(size as string)) return infantShoesSizes;
    return menShoesSizes;
  };

  const availableSizes = getSizeArray(selectedVariant);

  return availableSizes;
};
