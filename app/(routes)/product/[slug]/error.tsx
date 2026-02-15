"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  const is403 = error.message.includes("Access forbidden");

  return (
    <section className={styles.error}>
      <div className="container-medium">
        <div className={styles.content}>
          <h1>{is403 ? "403" : "Greška"}</h1>
          <h2>
            {is403
              ? "Pristup zabranjen"
              : "Došlo je do greške pri učitavanju proizvoda"}
          </h2>
          <p>
            {is403
              ? "Nemate dozvolu za pristup ovom proizvodu."
              : "Molimo vas pokušajte ponovo ili se vratite na prodavnicu."}
          </p>
          <div className={styles.actions}>
            <button onClick={reset} className="button-blue button">
              Pokušaj ponovo
            </button>
            <Link href="/prodavnica" className="button-transparent button">
              Vrati se na prodavnicu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
