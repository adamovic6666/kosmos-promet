import Contact from "@/app/_components/contact/Contact";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";
import Products from "@/app/_components/products/Products";
import type { Metadata } from "next";

interface Product {
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  price?: number | string;
}

export const metadata: Metadata = {
  title: "Online prodavnica delova za prskalice i atomizere	| Kosmos Promet",
  description:
    "Najveći izbor delova i opreme za prskalice i atomizere. Online prodaja uz brzu isporuku na adresu. Pogledaj ponudu!",
  keywords: [
    "online prodavnica",
    "kupovina delova",
    "prskalice delovi",
    "atomizeri delovi",
    "regulatori cena",
    "pumpe online",
    "dizne za prskalice",
    "webshop",
  ],
  alternates: {
    canonical: "https://www.kosmospromet.com/prodavnica",
  },
  openGraph: {
    title: "Online prodavnica delova za prskalice i atomizere | Kosmos Promet",
    description:
      "Najveći izbor delova i opreme za prskalice i atomizere. Online prodaja uz brzu isporuku na adresu.",
    url: "https://www.kosmospromet.com/prodavnica",
    type: "website",
  },
};

export const revalidate = 3600; // Revalidate every hour

const page = async () => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/v1/list-products?data=all&cc=${process.env.API_HASH}`,
    {
      next: { revalidate: 3600 }, // Cache API response for 1 hour
    }
  );
  const products = await res.json();

  // JSON-LD Structured Data for AI Crawlers
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Online prodavnica delova za prskalice i atomizere",
    description:
      "Najveći izbor delova i opreme za prskalice i atomizere. Online prodaja uz brzu isporuku na adresu.",
    url: "https://www.kosmospromet.com/prodavnica",
    mainEntity: {
      "@type": "ItemList",
      name: "Delovi za prskalice i atomizere",
      description: "Kompletna ponuda delova i opreme",
      numberOfItems: products?.length || 0,
      itemListElement: products
        ?.slice(0, 20)
        .map((product: Product, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.name || product.title,
            description:
              product.description || "Kvalitetan deo za prskalice i atomizere",
            image: product.image || product.imageUrl,
            offers: product.price
              ? {
                  "@type": "Offer",
                  price: product.price,
                  priceCurrency: "RSD",
                  availability: "https://schema.org/InStock",
                }
              : undefined,
          },
        })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Početna",
          item: "https://www.kosmospromet.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Prodavnica",
          item: "https://www.kosmospromet.com/prodavnica",
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Kosmos Promet",
      url: "https://www.kosmospromet.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.kosmospromet.com/images/og.webp",
      },
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data for AI Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Products allProducts={products} />
      <GotQuestions />
      <Contact />
    </>
  );
};

export default page;
