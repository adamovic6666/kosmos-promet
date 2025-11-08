import Contact from "@/app/_components/contact/Contact";
import ContactForm from "@/app/_components/forms/ContactForm";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";
import ContactUsHero from "@/app/_components/hero/ContactUsHero";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kosmos Promet | Kontakt",
  description:
    "Kontaktirajte Kosmos tehničku podršku za više informacija o delovima za prskalice i atomizere.",
};
const page = () => {
  return (
    <>
      <ContactUsHero />
      <ContactForm />
      <GotQuestions />
      <Contact />
    </>
  );
};

export default page;
