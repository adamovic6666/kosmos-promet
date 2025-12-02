import Contact from "@/app/_components/contact/Contact";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";
import Products from "@/app/_components/products/Products";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kosmos Promet | Proizvodi",
  description:
    "Najveći izbor delova za traktorske prskalice i atomizere u Srbiji po najpovoljnijim cenama.",
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

  return (
    <>
      <Products allProducts={products} />
      <GotQuestions />
      <Contact />
    </>
  );
};

export default page;
