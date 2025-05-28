"use client";

import Link from "next/link";
import Card from "../card/Card";
import styles from "./Products.module.css";
import { usePathname } from "next/navigation";
import { Product } from "@/app/_types";

const Products = ({
  allProducts,
  parentDetails,
  smallPadding,
}: {
  allProducts: Product[];
  parentDetails?: { title: string; description: string };
  smallPadding?: boolean;
}) => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const products = isMainPage ? allProducts?.slice(0, 6) : allProducts;
  const isProductPage = allProducts?.some((products) =>
    products.alias.includes("/proizvod/")
  );

  const description = isMainPage
    ? "Sa više od 20 godina iskustva u proizvodnji, izgradili smo reputaciju pouzdanog proizvođača visokokvalitetnih plastičnih auto delova koji odgovaraju najvišim standardima savremenih vozila."
    : "Kompletna ponuda naših proizvoda na jednom mestu. Praktično organizovano, jednostavno za pretragu.";

  return (
    <section
      className={` ${smallPadding ? styles.smallPadding : ""} ${
        styles.products
      }`}
    >
      <div className="container-small">
        {isMainPage && <h2>proizvodni asortiman</h2>}
        {parentDetails?.title && !isMainPage && <h2>{parentDetails?.title}</h2>}
        {!parentDetails?.description && !isProductPage && (
          <p className={styles.description}>{description}</p>
        )}
        {parentDetails?.description && (
          <p dangerouslySetInnerHTML={{ __html: parentDetails?.description }} />
        )}
        <div className={styles.grid}>
          {products.map((product: Product) => (
            <Card
              key={product.id || product.alias}
              name={(product?.title || product?.name) as string}
              image={product.image}
              alias={product.alias}
              isNew={product.is_new}
            />
          ))}
        </div>
        {isMainPage && (
          <Link href="/proizvodi" className="link-red">
            Kompletna ponuda
          </Link>
        )}
      </div>
    </section>
  );
};

export default Products;
