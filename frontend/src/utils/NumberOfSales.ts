export function NumberOfSales(soldItems: number) {
  const currentTime = Date.now();
  let lastCalledTime: number | null = null;
  if (
    lastCalledTime &&
    currentTime - lastCalledTime < 365 * 24 * 60 * 60 * 1000
  ) {
    return "This function can only be called once per year";
  }

  lastCalledTime = currentTime;

  return soldItems * 8.2;
}
