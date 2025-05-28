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
  const url = `https://backend.autofrogy.com/api/v1/search?q=${q}&cc=W4E)C9($8n=n*S(OBJMUR_hQ0.$t6P/xOx4a3v/|D@>U3LU8a,`;
  const response = await fetch(url);
  const data = await response.json();

  return (
    <main className={styles.searchResults}>
      <div className="container-small">
        <h1>Rezultati pretrage: &quot;{q}&quot;</h1>

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
                        <span className="link-red">{product.product_code}</span>
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
