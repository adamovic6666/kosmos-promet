import Contact from "@/app/_components/contact/Contact";
import CardSkeleton from "@/app/_components/skeletons/CardSkeleton";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<CardSkeleton />}>{children}</Suspense>
      <Contact />
    </>
  );
}
