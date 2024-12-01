export function getRandomEvery30Seconds() {
  const soldItems = Math.floor(Math.random() * 10000);
  const today = Date.now();
  const savedData = localStorage.getItem("RandomNumber");
  const parsedData = savedData ? JSON.parse(savedData) : null;

  if (
    !parsedData ||
    today - Number(parsedData.timeStamps) >= 3 * 24 * 60 * 60 * 1000
  ) {
    localStorage.setItem(
      "RandomNumber",
      JSON.stringify({
        timeStamps: today,
        soldItems,
      }),
    );
    return soldItems;
  }

  return parsedData.soldItems;
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
