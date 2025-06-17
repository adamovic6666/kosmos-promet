// Throttle function
export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return function (this: unknown, ...args: T) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// Interface for search results
export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
  category?: string;
}

import { cache } from "react";

// Search function that calls the API, now with React cache
export const searchProducts = cache(async (
  query: string,
  isDropdown: boolean = false
): Promise<SearchResult[]> => {
  // Return empty array if query is less than 2 characters
  if (query.length < 2) {
    return [];
  }
  
  try {
    // Hard-code the hash with special characters correctly escaped
    const hash = "W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,";

    // Manually encode the hash to preserve all special characters exactly
    const encodedHash = encodeURIComponent(hash).replace(
      /[!'()*]/g,
      (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
    );

    const url = `https://backend.autofrogy.com/api/v1/search?q=${encodeURIComponent(
      query
    )}&cc=${encodedHash}${isDropdown ? "&type=dropdown" : ""}`;

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(
        `Search API returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Search API error:", error);
    return [];
  }
});
