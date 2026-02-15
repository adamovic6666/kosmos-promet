import Contact from "@/app/_components/contact/Contact";
import ProductDetails from "@/app/_components/products/product-details/ProductDetails";
import SimilarProducts from "@/app/_components/products/similar-products/SimilarProducts";
import { ProductDetail } from "@/app/_types";
import { cache } from "react";
import type { Metadata } from "next";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";
import AboutProduct from "@/app/_components/about-product/AboutProduct";
import ProductHotpost from "@/app/_components/interactive-image/ProductHotpost";
import { redirect, notFound } from "next/navigation";

// Cached data fetching function to eliminate duplicate API calls
const getProductData = cache(async (slug: string): Promise<ProductDetail> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/get-product?p=/product/${slug}&cc=${process.env.API_HASH}`,
    { redirect: "manual" } // Handle redirects manually
  );

  // Handle 301 redirects - redirect to /prodavnica for old links
  if (response.status === 301 || response.status === 302 || response.status === 308) {
    redirect("/prodavnica");
  }

  // Handle 404 - product not found
  if (response.status === 404) {
    notFound();
  }

  // Handle 403 - forbidden/unauthorized
  if (response.status === 403) {
    throw new Error("Access forbidden");
  }

  if (!response.ok) {
    const text = await response.text();
    console.error(`API error for slug ${slug}:`, response.status, text.slice(0, 200));
    throw new Error(`Failed to fetch product: ${response.status}`);
  }

  return await response.json();
});

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ slug: string }>;
}): Promise<Metadata> {
  if (!params) {
    throw new Error("Missing slug parameter");
  }

  // Always treat params as Promise in Next.js
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const product = await getProductData(slug);
  const { metatag } = product;

  const title = metatag?.title?.split?.(" | ")[0] || "Kosmos promet";
  return {
    title: metatag?.title
      ? `${title} | Kosmos Promet`
      : "Delovi za prskalice i atomizere | Kosmos Promet",
    description:
      metatag?.description ??
      "Širok asortiman delova za prskalice i atomizere po povoljnim cenama. Dostupni odmah uz brzu isporuku i stručnu tehničku podršku Kosmos Promet.",
  };
}

interface PageProps {
  params?: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  if (!params) {
    throw new Error("Missing slug parameter");
  }

  // Always treat params as Promise in Next.js
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Reuse the same cached data fetching function
  const product = await getProductData(slug);
  const { description, documentation, product_code, main_photo } = product;
  console.log(main_photo, "MAIN PHOTO");
  return (
    <>
      <ProductDetails productDetails={product} />
      {product_code && <ProductHotpost productCode={product_code} noTitle />}
      <AboutProduct description={description} documentation={documentation} />
      <SimilarProducts similarProducts={product.similar_products || []} />
      <GotQuestions />
      <Contact />
    </>
  );
};

export default Page;
