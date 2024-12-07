import { useMemo } from "react";

// export function GenerateSoldItem(id: string) {
//   const generateUniqueNumber = (currentSeed: number) => {
//     const randomSoldItems = Math.floor(Math.random() * 10001);

//     const randomSeed = Math.floor(randomSoldItems * currentSeed);
//     console.log("Time:", currentSeed, "ItemSOld:", randomSoldItems);

//     return Math.abs(randomSeed % 10001);
//   };
//   const currentSeed = useMemo(() => {
//     const THREE_DAYS_IN_MS = 3 * 10000;
//     return Math.floor(Date.now() / THREE_DAYS_IN_MS);
//   }, []);

//   const randomNumber = useMemo(
//     () => generateUniqueNumber(currentSeed),
//     [id, currentSeed],
//   );
//   return randomNumber;
// }

export function GenerateSoldItem(totalPrice: number, maxPrice: number) {
  const generateUniqueNumber = (totalPrice: number, currentSeed: number) => {
    const avgPrice = maxPrice - totalPrice;
    const checkPrice = avgPrice === 0 ? totalPrice : avgPrice;
    const randomSeed = Math.floor(checkPrice * currentSeed);
    return Math.abs(randomSeed % 10001);
  };
  const currentSeed = useMemo(() => {
    const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
    // const THREE_DAYS_IN_MS = 3 * 10000;
    return Math.floor(Date.now() / THREE_DAYS_IN_MS);
  }, []);

  const randomNumber = useMemo(
    () => generateUniqueNumber(totalPrice, currentSeed),
    [],
  );
  return randomNumber;
}
