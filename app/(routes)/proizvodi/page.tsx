import Contact from "@/app/_components/contact/Contact";
import Hero from "@/app/_components/hero/Hero";
import Products from "@/app/_components/products/Products";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Auto Frogy | Proizvodnja i prodaja auto kopči i žabica",
  description:
    "Najveći izbor auto kopči, kopči podizača stakla, fiksatora za patosnice, nosača za tablice, ramova za tablice i ostale auto opreme. Pronađite sve na jednom mestu!",
};
export const revalidate = 3600; // Revalidate every hour

const page = async () => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/v1/list-products?data=all&cc=W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,`,
    {
      next: { revalidate: 3600 }, // Cache API response for 1 hour
    }
  );
  const products = await res.json();

  return (
    <>
      <Hero maxWidth="50vw" rotate={true} title="PROIZVODNI ASORTIMAN" />
      <Products allProducts={products} />
      <Contact />
    </>
  );
};

export default page;
