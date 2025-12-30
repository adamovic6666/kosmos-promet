"use client";

import Link from "next/link";
import Card from "../card/Card";
import styles from "./Products.module.css";
import { usePathname } from "next/navigation";
import { Product } from "@/app/_types";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { buildBreadcrumbs } from "../breadcrumbs/buildBreadcrumbs";

const Products = ({
  allProducts,
  parentDetails,
  smallPadding,
  breadcrumbs,
}: {
  allProducts: Product[];
  parentDetails?: { title: string; description: string };
  smallPadding?: boolean;
  breadcrumbs?: { name: string; link: string }[];
}) => {
  const pathname = usePathname();
  const params = pathname.split("/");
  const isStoreOrMainGroup = params.length <= 3;
  const isMainPage = pathname === "/";
  const isProductsPage = pathname === "/prodavnica";
  const products = isMainPage ? allProducts?.slice(0, 6) : allProducts;
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
    <>
      {products.length !== 0 && !isProductsPage && !isMainPage && (
        <Breadcrumbs
          items={buildBreadcrumbs(breadcrumbs || [], parentDetails?.title)}
        />
      )}
      <section
        className={` ${smallPadding ? styles.smallPadding : ""} ${
          styles.products
        } ${isProductsPage ? styles.productsIncreasedTop : ""} ${
          !isStoreOrMainGroup ? styles.storeOrMainGroup : ""
        }`}
      >
        <div className="container-small">
          {(isProductsPage || isMainPage) && <h2>Proizvodi</h2>}
          {parentDetails?.title && !isMainPage && (
            <h2>{parentDetails?.title}</h2>
          )}
          {!parentDetails?.description &&
            !isProductPage &&
            products.length !== 0 &&
            isStoreOrMainGroup && (
              <div className={styles.description}>{description}</div>
            )}
          {parentDetails?.description && (
            <div
              dangerouslySetInnerHTML={{ __html: parentDetails?.description }}
            />
          )}
          <div
            className={`${styles.grid} ${
              products.length < 3 ? styles.justifyCenter : ""
            }`}
          >
            {products &&
              products.length > 0 &&
              products.map((product: Product) => (
                <Card
                  key={product.id || product.alias}
                  name={(product?.title || product?.name) as string}
                  image={product.image}
                  alias={product.alias}
                  isNew={product.is_new}
                  productCode={product.product_code}
                  mediaUpdatedAt={product.media_updated_at || 0}
                />
              ))}
          </div>
          {products.length === 0 && (
            <div className={styles.noProducts}>
              Nema dostupnih proizvoda u ovoj kategoriji.
            </div>
          )}
          {isMainPage && (
            <Link href="/prodavnica" className="button-blue button">
              Poseti prodavnicu
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
