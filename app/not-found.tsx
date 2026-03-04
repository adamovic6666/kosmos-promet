import Link from "next/link";
import type { Metadata } from "next";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Stranica nije pronađena - 404 | Kosmos Promet",
  description: "Tražena stranica ne postoji ili je premeštena.",
  robots: {
    index: false, // Don't index 404 pages
    follow: true, // But follow links on them
  },
};

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className="container-medium">
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Stranica nije pronađena</h2>
          <p className={styles.description}>
            Žao nam je, stranica koju tražite ne postoji ili je premeštena.
          </p>
          <div className={styles.links}>
            <Link href="/" className="button button-blue">
              Nazad na početnu
            </Link>
            <Link href="/prodavnica" className="button button-transparent">
              Pogledaj proizvode
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
