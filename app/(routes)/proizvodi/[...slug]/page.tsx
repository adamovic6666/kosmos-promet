import Products from "@/app/_components/products/Products";
import type { Metadata } from "next";
import { Product } from "@/app/_types";

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  // read route params
  const resolvedParams = await params;
  const pathname = `/proizvodi/${resolvedParams?.slug?.join("/") || ""}`;

  const res = await fetch(
    `${process.env.BASE_URL}/api/v1/list-products?data=${pathname}&cc=W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,`
  );
  const { parent } = await res.json();

  return {
    title: parent?.metatags?.title
      ? `Auto Frogy | ${parent?.metatags?.title}`
      : "Auto Frogy | Proizvodnja i prodaja auto kopči i žabica",
    description:
      parent?.metatags?.description ??
      "Najveći izbor auto kopči, kopči podizača stakla, fiksatora za patosnice, nosača za tablice, ramova za tablice i ostale auto opreme. Pronađite sve na jednom mestu!",
  };
}

const page = async ({ params }: { params?: Promise<{ slug: string[] }> }) => {
  const resolvedParams = await params;
  const pathname = `/proizvodi/${resolvedParams?.slug?.join("/") || ""}`;
  const res = await fetch(
    `${process.env.BASE_URL}/api/v1/list-products?data=${pathname}&cc=W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,`
  );
  const { products, parent } = await res.json();
  const sortedByNewField = products.sort((a: Product, b: Product) => {
    return a.is_new === b.is_new ? 0 : a.is_new ? -1 : 1;
  });
  return (
    <>
      <Products
        allProducts={sortedByNewField || []}
        parentDetails={parent ?? {}}
        smallPadding
      />
    </>
  );
};

export default page;
