import Calculator from "@/app/_components/calculator/Calculator";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator potrošnje prskanja | Kosmos Promet",
  description:
    "Od 1993. godine Kosmos Promet proizvodi i distribuira potrošne delove za traktorske prskalice i atomizere. Širok asortiman, kvalitetni brendovi, brza isporuka i stručna podrška širom regiona.",
};

const KalkulatorPage = () => {
  return (
    <>
      <Calculator />
      <GotQuestions />
    </>
  );
};

export default KalkulatorPage;
