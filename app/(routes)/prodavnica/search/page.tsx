import { Product } from "@/app/_types";
import styles from "./search.module.css";
import Link from "next/link";
import Image from "next/image";

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q = "" } = await searchParams;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/search?q=${q}&cc=${process.env.API_HASH}`;
  const response = await fetch(url);
  const data = await response.json();

  return (
    <main className={styles.searchResults}>
      <div className="container-small">
        <h2>Rezultati pretrage: &quot;{q}&quot;</h2>

        {data.length > 0 ? (
          <div className={styles.resultsList}>
            {data.map((product: Product) => {
              const image =
                (process.env.NEXT_PUBLIC_API_URL ?? "") + product.main_photo;
              return (
                <Link
                  href={product?.url || product.alias}
                  key={product.id}
                  className={styles.resultItem}
                >
                  <div className={styles.resultContent}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={image}
                        alt={product?.title || "Product Image"}
                        fill
                      />
                    </div>
                    <div className={styles.productDetails}>
                      <h2>{product.title}</h2>
                      <p className={styles.productCode}>
                        <span className="button-blue button">
                          {product.product_code}
                        </span>
                        <span>Šifra proizvoda</span>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>
              Nema rezultata za &quot;<strong>{q}</strong>&quot;
            </p>
            <p>
              Pokušajte sa drugačijim ključnim rečima ili pregledajte kategorije
              proizvoda.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
