# Performance Optimization Guide

## Current Issues

- Too many Node.js worker processes being spawned
- Heavy reliance on server-side rendering (SSR)
- Multiple API calls per request
- No caching strategy
- Hitting CloudLinux's 40-process limit

## Recommended Optimizations

### 1. Convert to Static Generation (SSG)

Convert static content pages to use static generation:

```typescript
// For pages like o-nama, kontakt, politika-privatnosti
// Instead of server components, use static generation
export const generateStaticParams = async () => {
  return [{}]; // For static pages with no parameters
};

// For product pages with known slugs
export const generateStaticParams = async () => {
  const products = await fetchAllProductSlugs();
  return products.map((product) => ({ slug: product.slug }));
};
```

### 2. Implement Data Caching

Add revalidation to fetch calls:

```typescript
// Cache API responses for 1 hour (3600 seconds)
const res = await fetch(url, {
  next: { revalidate: 3600 },
});

// For frequently accessed data, use React Cache
import { cache } from "react";
export const getProducts = cache(async () => {
  // Fetch logic here
});
```

### 3. Eliminate Duplicate API Calls

Combine metadata and page data fetching:

```typescript
// Shared data fetching function
async function getProductData(slug) {
  const data = await fetch(`/api/products/${slug}`);
  return data;
}

// Use in both metadata and component
export async function generateMetadata({ params }) {
  const product = await getProductData(params.slug);
  return { title: product.title, ... };
}

export default async function Page({ params }) {
  const product = await getProductData(params.slug);
  return <Component product={product} />;
}
```

### 4. Server Optimization

- Remove custom server.js implementation
- Update next.config.ts to use built-in Next.js optimizations
- Remove development console.log statements from production code

### 5. Image Optimization

If using Next.js Image component:

```typescript
// In next.config.ts
const nextConfig = {
  images: {
    unoptimized: false, // Enable image optimization if possible
    // If cPanel has issues with the default loader:
    loader: "custom",
    loaderFile: "./app/utils/image-loader.js",
  },
};
```

### 6. Incremental Static Regeneration (ISR)

For pages that change occasionally:

```typescript
// In page component
export const revalidate = 3600; // Revalidate page every hour
```

## Implementation Steps

1. Identify static pages and convert them first
2. Add caching to all data fetching functions
3. Refactor duplicate API calls
4. Remove development code and console.logs
5. Test performance improvements locally before deploying
