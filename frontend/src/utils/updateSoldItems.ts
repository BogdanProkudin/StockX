import { useMemo } from "react";

export function GenerateSoldItem(totalPrice: number) {
  const generateUniqueNumber = (totalPrice: number, currentSeed: number) => {
    const randomSeed = Math.floor(totalPrice * currentSeed);

    return Math.abs(randomSeed % 1001);
  };
  const currentSeed = useMemo(() => {
    const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
    return Math.floor(Date.now() / THREE_DAYS_IN_MS);
  }, []);

  const randomNumber = useMemo(
    () => generateUniqueNumber(totalPrice, currentSeed),
    [totalPrice, currentSeed],
  );
  return randomNumber;
}

export const getRandomSoldItems = (productId: string) => {
  // Проверяем, есть ли уже сохраненное значение для этого товара
  const savedValue = localStorage.getItem(`soldItems_${productId}`);
  
  if (savedValue) {
    return parseInt(savedValue);
  }
  
  // Если значения нет, генерируем новое и сохраняем
  const newValue = Math.floor(Math.random() * (100 - 30) + 30); // Случайное число от 30 до 100
  localStorage.setItem(`soldItems_${productId}`, newValue.toString());
  
  return newValue;
};
