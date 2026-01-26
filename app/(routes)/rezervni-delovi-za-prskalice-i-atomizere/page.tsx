import Contact from "@/app/_components/contact/Contact";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";
import HotPostsContent from "@/app/_components/hotposts/HotPostsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rezervni delovi za prskalice i atomizere | Kosmos Promet",
  description:
    "Interaktivna mapa rezevrnih delova za prskalice i atomizere. Klikni na deo - naruči odmah!",
};

export default function RezerniDeloviPage() {
  return (
    <>
      <HotPostsContent />
      <GotQuestions />
      <Contact />
    </>
  );
}
