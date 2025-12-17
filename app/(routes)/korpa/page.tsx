"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/_context/CartContext";
import { formatPrice } from "@/app/utils/format-price";
import styles from "./cart.module.css";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <section className={styles.emptyCart}>
        <div className="container-medium">
          <div className={styles.emptyContent}>
            <h2>Vaša korpa je prazna</h2>
            <p>Dodajte proizvode u korpu da biste nastavili sa kupovinom.</p>
            <Link href="/prodavnica" className="button-blue button">
              Pogledajte proizvode
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <div className="container-medium">
        <div className={styles.header}>
          <h2>Korpa</h2>
        </div>

        <div className={styles.cartGrid}>
          <div className={styles.itemsList}>
            {cart.items.map((item) => (
              <div key={item.productId} className={styles.cartItem}>
                <Link
                  href={`/prodavnica/${item.categorySlug}/${item.subcategorySlug}/${item.slug}`}
                  className={styles.imageLink}
                >
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL + item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    className={styles.itemImage}
                  />
                </Link>

                <div className={styles.itemInfo}>
                  <Link
                    href={`/prodavnica/${item.categorySlug}/${item.subcategorySlug}/${item.slug}`}
                    className={styles.itemName}
                  >
                    {item.name}
                  </Link>
                  <p className={styles.itemCode}>Šifra: {item.productCode}</p>
                  <p className={styles.itemPrice}>
                    {formatPrice(item.price)} RSD
                  </p>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className={styles.qtyBtn}
                      aria-label="Smanji količinu"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.productId,
                          Math.max(1, parseInt(e.target.value) || 1)
                        )
                      }
                      className={styles.qtyInput}
                    />
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className={styles.qtyBtn}
                      aria-label="Povećaj količinu"
                    >
                      +
                    </button>
                  </div>

                  <p className={styles.itemTotal}>
                    {formatPrice(
                      (parseFloat(item.price) * item.quantity).toFixed(2)
                    )}{" "}
                    RSD
                  </p>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className={styles.removeButton}
                    aria-label="Ukloni iz korpe"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2>Pregled porudžbine</h2>

            <div className={styles.summaryRow}>
              <span>Broj artikala:</span>
              <span>{cart.itemCount}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Ukupno proizvoda:</span>
              <span className={styles.subtotal}>
                {cart.total.toLocaleString("sr-RS")} RSD
              </span>
            </div>

            <div className={styles.summaryTotal}>
              <span>Ukupno:</span>
              <span>{cart.total.toLocaleString("sr-RS")} RSD</span>
            </div>

            <div className={styles.summaryActions}>
              <button onClick={clearCart} className="button-transparent button">
                Isprazni korpu
              </button>
              <button className="button-blue button">
                Nastavi sa porudžbinom
              </button>
            </div>

            <Link href="/prodavnica" className={styles.continueShoppingLink}>
              ← Nastavi kupovinu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
