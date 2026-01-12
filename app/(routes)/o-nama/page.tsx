import Contact from "@/app/_components/contact/Contact";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";
import AboutUsHero from "@/app/_components/hero/AboutUsHero";
import Wellcome from "@/app/_components/wellcome/Wellcome";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "O nama | Kosmos Promet",
  description:
    "Od 1993. godine Kosmos Promet proizvodi i distribuira potrošne delove za traktorske prskalice i atomizere. Širok asortiman, kvalitetni brendovi, brza isporuka i stručna podrška širom regiona.",
};
const page = async () => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/v1/list-products?data=all&cc=${process.env.API_HASH}`
  );
  const data = await res.json();

  return (
    <>
      <AboutUsHero />
      <Wellcome allProducts={data} />
      <GotQuestions />
      <Contact />
    </>
  );
};

export default page;
