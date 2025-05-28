import Products from "@/app/_components/products/Products";
import { headers } from "next/headers";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
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

const page = async () => {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  const res = await fetch(
    `${process.env.BASE_URL}/api/v1/list-products?data=${pathname}&cc=W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,`
  );
  const { products, parent } = await res.json();
  return (
    <>
      <Products
        allProducts={products || []}
        parentDetails={parent ?? {}}
        smallPadding
      />
    </>
  );
};

export default page;
