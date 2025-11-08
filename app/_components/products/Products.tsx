"use client";

import Link from "next/link";
import Card from "../card/Card";
import styles from "./Products.module.css";
import { usePathname } from "next/navigation";
import { Product } from "@/app/_types";
import dummyData from "../../../public/data/dummy-data.json";

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
  const isProductsPage = pathname === "/proizvodi";
  const products = isMainPage ? dummyData?.slice(0, 6) : dummyData;
  // const products = dummyData;
  const isProductPage = allProducts?.some((products) =>
    products.alias.includes("/proizvod/")
  );
  const description = isMainPage ? (
    <p className={styles.description}>
      <span>
        Širok izbor delova i opreme za prskalice i atomizere na jednom mestu.
      </span>{" "}
      <span>Provereni kvalitet, dostupnost i brza isporuka.</span>
    </p>
  ) : (
    <p className={styles.description}>
      <span>
        Širok izbor delova i opreme za prskalice i atomizere na jednom mestu.
      </span>{" "}
      <span>Provereni kvalitet, dostupnost i pouzdana isporuka.</span>
    </p>
  );

  return (
    <section
      className={` ${smallPadding ? styles.smallPadding : ""} ${
        styles.products
      } ${isProductsPage ? styles.productsIncreasedTop : ""}`}
    >
      <div className="container-small">
        <h2>Proizvodi</h2>
        {parentDetails?.title && !isMainPage && <h2>{parentDetails?.title}</h2>}
        {!parentDetails?.description && !isProductPage && (
          <div className={styles.description}>{description}</div>
        )}
        {parentDetails?.description && (
          <div
            dangerouslySetInnerHTML={{ __html: parentDetails?.description }}
          />
        )}
        <div className={styles.grid}>
          {products.map((product: Product) => (
            <Card
              key={product.id || product.alias}
              name={(product?.title || product?.name) as string}
              image={product.image}
              alias={product.alias}
              isNew={product.is_new}
              productCode={product.product_code}
              // mediaUpdatedAt={product.media_updated_at || 0}
            />
          ))}
        </div>
        {isMainPage && (
          <Link href="/proizvodi" className="button-blue">
            Poseti prodavnicu
          </Link>
        )}
      </div>
    </section>
  );
};

export default Products;
