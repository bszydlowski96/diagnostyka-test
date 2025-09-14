export function formatPLN(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function parsePLN(value: string): number {
  const cleaned = value.replace(/[^0-9,.-]/g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}
