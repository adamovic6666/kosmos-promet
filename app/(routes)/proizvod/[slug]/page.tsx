import Contact from "@/app/_components/contact/Contact";
import ProductDetails from "@/app/_components/products/product-details/ProductDetails";
import SimilarProducts from "@/app/_components/products/similar-products/SimilarProducts";
// import { ProductDetail } from "@/app/_types";
// import { cache } from "react";
// import type { Metadata } from "next";
import GotQuestions from "@/app/_components/got-questions/GotQuestions";
import dummyData from "../../../../public/data/dummy-data.json";
import AboutProduct from "@/app/_components/about-product/AboutProduct";
import InteractiveDiagram from "@/app/_components/interactive-image/InteractiveImage";

// Cached data fetching function to eliminate duplicate API calls
// const getProductData = cache(async (slug: string): Promise<ProductDetail> => {
//   const response = await fetch(
//     `${process.env.BASE_URL}/api/v1/get-product?p=/proizvod/${slug}&cc=W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,`,
//   );

//   return await response.json();
// });

// export async function generateMetadata({
//   params,
// }: {
//   params?: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   if (!params) {
//     throw new Error("Missing slug parameter");
//   }

//   // Always treat params as Promise in Next.js
//   // const resolvedParams = await params;
//   // const { slug } = resolvedParams;

//   // const product = await getProductData(slug);
//   // const { metatag } = product;

//   // const title = metatag?.title?.split?.(" | ")[0] || "Auto Frogy";
//   // return {
//   //   title: metatag?.title
//   //     ? `Auto Frogy | ${title}`
//   //     : "Auto Frogy | Proizvodnja i prodaja auto kopči i žabica",
//   //   description:
//   //     metatag?.description ??
//   //     "Najveći izbor auto kopči, kopči podizača stakla, fiksatora za patosnice, nosača za tablice, ramova za tablice i ostale auto opreme. Pronađite sve na jednom mestu!",
//   // };
// }

interface PageProps {
  params?: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  if (!params) {
    throw new Error("Missing slug parameter");
  }

  // Always treat params as Promise in Next.js
  // const resolvedParams = await params;
  // const { slug } = resolvedParams;

  // Reuse the same cached data fetching function
  // const product = await getProductData(slug);

  return (
    <>
      <ProductDetails
        productDetails={{
          title: "Kosmos regulator pritiska RAU A3",
          description:
            "Kvalitetna auto kopča pogodna za različite tipove vozila. Izrađena od izdržljivih materijala koji garantuju dugotrajan rad.",
          categories: "Auto kopče, Univerzalne kopče",
          main_photo: "/images/regulatori.webp",
          is_new: "true",
          photo_gallery: {
            thumb: [
              "/images/regulatori.webp",
              "/images/regulatori.webp",
              "/images/regulatori.webp",
            ],
            orig: [
              "/images/regulatori.webp",
              "/images/regulatori.webp",
              "/images/regulatori.webp",
            ],
          },
          product_code: "K0907",
          metatag: {
            title: "Auto kopča univerzalna | Auto Frogy",
            description:
              "Kvalitetna universalna auto kopča. Pogodna za sve tipove vozila. Brza dostava i garancija kvaliteta.",
          },
          price: "999",
          actionPrice: "799",
        }}
      />
      <InteractiveDiagram image={"/images/kosmos-hero-image.webp"} />
      <AboutProduct />
      <SimilarProducts similarProducts={dummyData} />
      <GotQuestions />
      <Contact />
    </>
  );
};

export default Page;
