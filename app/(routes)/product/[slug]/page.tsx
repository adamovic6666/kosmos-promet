import Contact from "@/app/_components/contact/Contact";
import ProductDetails from "@/app/_components/products/product-details/ProductDetails";
import SimilarProducts from "@/app/_components/products/similar-products/SimilarProducts";
import { ProductDetail } from "@/app/_types";
import { cache } from "react";
import type { Metadata } from "next";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";
import AboutProduct from "@/app/_components/about-product/AboutProduct";
import InteractiveDiagram from "@/app/_components/interactive-image/InteractiveImage";

// Cached data fetching function to eliminate duplicate API calls
const getProductData = cache(async (slug: string): Promise<ProductDetail> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/get-product?p=/product/${slug}&cc=${process.env.API_HASH}`
  );

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
      ? `Kosmos promet | ${title}`
      : "Kosmos promet | Delovi za prskalice i atomizere",
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
  const { description, documentation } = product;

  return (
    <>
      <ProductDetails productDetails={product} />
      <InteractiveDiagram image={"/images/kosmos-hero-image.webp"} />
      <AboutProduct description={description} documentation={documentation} />
      <SimilarProducts similarProducts={product.similar_products || []} />
      <GotQuestions />
      <Contact />
    </>
  );
};

export default Page;
