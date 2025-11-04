import Contact from "@/app/_components/contact/Contact";
import ContactHero from "@/app/_components/hero/ContactHero";
import Wellcome from "@/app/_components/wellcome/Wellcome";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Auto Frogy | O nama",
  description:
    "Auto Frogy - preko 20 godina proizvodnje plastičnih auto delova u Srbiji. Lider u prodaji auto kopči u Srbiji i regionu.",
};
const page = async () => {
  // const res = await fetch(
  //   `${process.env.BASE_URL}/api/v1/list-products?data=all&cc=W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,`
  // );
  // const data = await res.json();

  return (
    <>
      <ContactHero />
      <Wellcome allProducts={[]} />
      <Contact />
    </>
  );
};

export default page;
