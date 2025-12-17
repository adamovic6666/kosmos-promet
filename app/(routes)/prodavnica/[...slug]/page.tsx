import Products from "@/app/_components/products/Products";
import type { Metadata } from "next";
import { Product } from "@/app/_types";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";

// Shared data fetching function to eliminate duplicate API calls
const getProductsData = async (pathname: string) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/v1/list-products?data=${pathname}&cc=${process.env.API_HASH}`,
    { next: { revalidate: 60 } }
  );
  return await res.json();
};

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  // read route params
  const resolvedParams = await params;
  const pathname = `/prodavnica/${resolvedParams?.slug?.join("/") || ""}`;

  const { parent } = await getProductsData(pathname);

  return {
    title: parent?.metatags?.title
      ? `Kosmos promet | ${parent?.metatags?.title}`
      : "Kosmos promet | Delovi za prskalice i atomizere",
    description:
      parent?.metatags?.description ??
      "Širok asortiman delova za prskalice i atomizere po povoljnim cenama. Dostupni odmah uz brzu isporuku i stručnu tehničku podršku Kosmos Promet.",
  };
}

const page = async ({ params }: { params?: Promise<{ slug: string[] }> }) => {
  const resolvedParams = await params;
  const pathname = `/prodavnica/${resolvedParams?.slug?.join("/") || ""}`;

  // Reuse the same cached data fetching function
  const { products, parent } = await getProductsData(pathname);
  const sortedByNewField = products?.sort((a: Product, b: Product) => {
    return a.is_new === b.is_new ? 0 : a.is_new ? -1 : 1;
  });

  return (
    <>
      <Products
        allProducts={sortedByNewField || []}
        parentDetails={parent ?? {}}
        smallPadding
      />
      <GotQuestions />
    </>
  );
};

export default page;
