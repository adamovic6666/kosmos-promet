import Link from "next/link";
import styles from "./not-found.module.css";

export default function ProductNotFound() {
  return (
    <section className={styles.notFound}>
      <div className="container-medium">
        <div className={styles.content}>
          <h1>404</h1>
          <h2>Proizvod nije pronađen</h2>
          <p>
            Proizvod koji tražite ne postoji ili je uklonjen iz asortimana.
          </p>
          <div className={styles.actions}>
            <Link href="/prodavnica" className="button-blue button">
              Vrati se na prodavnicu
            </Link>
            <Link href="/" className="button-transparent button">
              Početna stranica
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
