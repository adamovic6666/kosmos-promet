"use client";
import Link from "next/link";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={styles.TopBar}>
      <div className="container-small">
        <Link href="/rezervni-delovi-za-prskalice-i-atomizere">
          <span>Vizuelna pretraga delova:</span>{" "}
          <span>
            <b> Klikni na deo - naruči odmah!</b>
          </span>
        </Link>
      </div>
    </div>
  );
}
