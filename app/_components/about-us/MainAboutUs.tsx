import Image from "next/image";
import styles from "./MainAboutUs.module.css";
import Link from "next/link";

const MainAboutUs = () => {
  return (
    <div className={styles.mainAboutUs}>
      <div className="container-medium">
        <h2>O nama</h2>
        <div className={styles.content}>
          <div className={styles.image}>
            <Image
              src="/images/main-o-nama.webp"
              alt="Factory Interior"
              width={600}
              height={400}
              layout="responsive"
            />
          </div>
          <div className={styles.text}>
            <p>
              Naša osnovna delatnost je proizvodnja i prodaja potrošnih delova
              za traktorske prskalice i atomizere. Od osnivanja 1993. godine
              kontinuirano širimo asortiman proizvoda i mrežu kupaca. Danas
              poslujemo na domaćem tržištu i u svim zemljama regiona, nudeći
              pouzdane i kvalitetne proizvode iz sopstvene proizvodnje, kao i
              delove renomiranih brendova Morava, Agromehanika, Geoline, ARAG i
              Lechler.
            </p>
          </div>
          <Link href="/o-nama" className="button-blue">
            Saznaj više
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainAboutUs;
