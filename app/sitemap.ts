import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.kosmospromet.com";

  // Static pages - always return these
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/prodavnica`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Fetch products to generate product pages
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/v1/list-products?data=all&cc=${process.env.API_HASH}`,
      {
        next: { revalidate: 86400 }, // Cache for 1 day
      }
    );

    // Validate response before parsing
    if (!res.ok) {
      console.error(`API returned status ${res.status}`);
      return staticPages;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.error(`API returned non-JSON content-type: ${contentType}`);
      return staticPages;
    }

    const productsData = await res.json();
    const products = Array.isArray(productsData)
      ? productsData
      : productsData?.products || [];

    const productUrls: MetadataRoute.Sitemap = products
      .filter((product: { id?: string; slug?: string; url?: string }) =>
        product.url || product.slug || product.id
      )
      .map((product: { id?: string; slug?: string; url?: string }) => {
        const productPath = product.url || `/prodavnica/${product.slug || product.id}`;
        return {
          url: `${baseUrl}${productPath}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        };
      });

    return [...staticPages, ...productUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Always return at least static routes
    return staticPages;
  }
}
