import { useMemo } from "react";

export function CallculateSellPrice(avgPrice: number) {
  const generateUniqueNumber = (avgPrice: number, currentSeed: number) => {
    const priceForSell =
      avgPrice % 2 === 0
        ? Math.round(avgPrice * 1.1)
        : Math.round(avgPrice / 1.8);

    const randomSeed = Math.floor(priceForSell * currentSeed);
    return Math.abs(randomSeed % 500);
  };
  const currentSeed = useMemo(() => {
    const ONE_DAY_IN_MS = 1 * 24 * 60 * 60 * 1000;

    return Math.floor(Date.now() / ONE_DAY_IN_MS);
  }, []);

  const randomNumber = useMemo(
    () => generateUniqueNumber(avgPrice, currentSeed),
    [],
  );
  return randomNumber;
}
