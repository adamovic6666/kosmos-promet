"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./success.module.css";
import { Suspense, useEffect } from "react";
import { useCart } from "@/app/_context/CartContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const { clearCart } = useCart();

  // Clear cart when success page loads
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.success}>
      <div className="container-small">
        <div className={styles.successContent}>
          <div className={styles.iconWrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>

          <h1>Porudžbina je uspešno poslata!</h1>

          {orderNumber && (
            <div className={styles.orderNumber}>
              <span className={styles.orderLabel}>Broj porudžbine:</span>
              <span className={styles.orderValue}>{orderNumber}</span>
            </div>
          )}

          <p>
            Hvala Vam što ste se opredelili za Kosmos Promet. Vaša porudžbina je
            primljena i biće obrađena u najkraćem mogućem roku.
          </p>

          <p>
            Dobićete email potvrdu sa detaljima Vaše porudžbine. Naš tim će Vas
            kontaktirati u vezi dostave i plaćanja.
          </p>

          <div className={styles.actions}>
            <Link href="/prodavnica" className="button-blue button">
              Nastavi kupovinu
            </Link>
            <Link href="/" className="button-transparent button">
              Vrati se na početnu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Učitavanje...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
