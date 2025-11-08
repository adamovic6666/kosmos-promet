"use client";
import Image from "next/image";
import styles from "./Hero.module.css";
import Link from "next/link";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
        <div className={`${styles.heroText}`}>
          <div>
            <h1>Kosmos regulatori</h1>
            <p>
              Najveća ponuda regulatora za prskalice i atomizere, uz veliki
              izbor rezervnih delova i prateće opreme. Pouzdana tehnička podrška
              za pravilan izbor i bezbedan rad sistema.
            </p>
          </div>

          <Link className="button-blue" href="">
            Pogledaj sve regulatore
          </Link>
        </div>

        <div className={`${styles.heroImage}`}>
          <div className={styles.image}>
            <Image
              src={"/images/kosmos-hero-image.webp"}
              width={600}
              height={320}
              layout="responsive"
              alt="hero-image"
              priority={true}
              loading="eager"
            />
          </div>
        </div>
        <Link className={`button-blue ${styles.mobileButton}`} href="">
          Pogledaj sve regulatore
        </Link>
      </div>
    </section>
  );
};

export default Hero;
