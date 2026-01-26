"use client";
import Link from "next/link";
import styles from "./TopBar.module.css";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathName = usePathname();
  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

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
