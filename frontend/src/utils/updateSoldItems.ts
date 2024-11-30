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
