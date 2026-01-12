import Contact from "@/app/_components/contact/Contact";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";
import HotPostsContent from "@/app/_components/hotposts/HotPostsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rezervni delovi za prskalice i atomizere | Kosmos Promet",
  description:
    "Specijalna ponuda rezevrnih delova za prskalice i atomizere. Najpovoljnije cene, provereni kvalitet i brza isporuka!",
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
