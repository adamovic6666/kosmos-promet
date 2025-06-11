import Contact from "@/app/_components/contact/Contact";
import ProductDetails from "@/app/_components/products/product-details/ProductDetails";
import SimilarProducts from "@/app/_components/products/similar-products/SimilarProducts";
import { ProductDetail } from "@/app/_types";

import type { Metadata } from "next";

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

  const response = await fetch(
    `${process.env.BASE_URL}/api/v1/get-product?p=/proizvod/${slug}&cc=W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,`,
    {
      cache: "no-store", // Disable caching to always get fresh data
      next: { revalidate: 0 }, // Disable revalidation to ensure fresh data
    }
  );

  const { metatag }: ProductDetail = await response.json();
  const title = metatag?.title?.split?.(" | ")[0] || "Auto Frogy";
  return {
    title: metatag?.title
      ? `Auto Frogy | ${title}`
      : "Auto Frogy | Proizvodnja i prodaja auto kopči i žabica",
    description:
      metatag?.description ??
      "Najveći izbor auto kopči, kopči podizača stakla, fiksatora za patosnice, nosača za tablice, ramova za tablice i ostale auto opreme. Pronađite sve na jednom mestu!",
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

  const response = await fetch(
    `${process.env.BASE_URL}/api/v1/get-product?p=/proizvod/${slug}&cc=W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,`
  );

  const product: ProductDetail = await response.json();

  return (
    <>
      <ProductDetails productDetails={product} />
      <SimilarProducts similarProducts={product?.similar_products || []} />
      <Contact />
    </>
  );
};

export default Page;
