/**
 * Formats a price string by replacing dots with commas
 * @param price - Price string (e.g., "1250.00")
 * @returns Formatted price string (e.g., "1250,00")
 */
export function formatPrice(price: string): string {
  return price.replace(".", ",");
}
