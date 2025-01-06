export function priceFormatter(price: number | undefined) {
  if (price === undefined) {
    return price;
  }
  return `${price.toFixed(2)} €`;
}
