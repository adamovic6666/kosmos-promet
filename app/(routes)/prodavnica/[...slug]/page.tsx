import Products from "@/app/_components/products/Products";
import type { Metadata } from "next";
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
      ? `${parent?.metatags?.title} | Kosmos Promet`
      : "Delovi za prskalice i atomizere | Kosmos Promet",
    description:
      parent?.metatags?.description ??
      "Širok asortiman delova za prskalice i atomizere po povoljnim cenama. Dostupni odmah uz brzu isporuku i stručnu tehničku podršku Kosmos Promet.",
  };
}

const page = async ({ params }: { params?: Promise<{ slug: string[] }> }) => {
  const resolvedParams = await params;
  const pathname = `/prodavnica/${resolvedParams?.slug?.join("/") || ""}`;

  // Reuse the same cached data fetching function
  const { products, parent, breadcrumbs } = await getProductsData(pathname);

  return (
    <>
      <Products
        allProducts={products || []}
        parentDetails={parent ?? {}}
        breadcrumbs={breadcrumbs}
        smallPadding
      />
      <GotQuestions />
    </>
  );
};

export default page;
