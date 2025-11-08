import Contact from "@/app/_components/contact/Contact";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";
import AboutUsHero from "@/app/_components/hero/AboutUsHero";
import Wellcome from "@/app/_components/wellcome/Wellcome";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kosmos Promet | O nama",
  description:
    "Od 1993. godine Kosmos Promet proizvodi i distribuira potrošne delove za traktorske prskalice i atomizere. Širok asortiman, kvalitetni brendovi, brza isporuka i stručna podrška širom regiona.",
};
const page = async () => {
  // const res = await fetch(
  //   `${process.env.BASE_URL}/api/v1/list-products?data=all&cc=W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,`
  // );
  // const data = await res.json();

  return (
    <>
      <AboutUsHero />
      <Wellcome allProducts={[]} />
      <GotQuestions />
      <Contact />
    </>
  );
};

export default page;
