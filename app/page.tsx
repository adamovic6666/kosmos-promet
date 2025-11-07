import MainAboutUs from "./_components/about-us/MainAboutUs";
import Contact from "./_components/contact/Contact";
import GotQuestions from "./_components/got-questions/GotQuestions";
import Hero from "./_components/hero/Hero";
import Products from "./_components/products/Products";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // const res = await fetch(
  //   `${process.env.BASE_URL}/api/v1/list-products?data=all&cc=W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,`,
  //   {
  //     next: { revalidate: 3600 }, // Cache API response for 1 hour
  //   }
  // );
  // const data = await res.json();
  return (
    <>
      <Hero title="Hero" maxWidth="520px" />
      <Products allProducts={[]} />
      <MainAboutUs />
      <GotQuestions />
      <Contact />
    </>
  );
}
