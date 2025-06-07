"use client";
import Image from "next/image";
import styles from "./Hero.module.css";

const Hero = ({
  title,
  maxWidth,
  rotate,
}: {
  title: string;
  maxWidth: string;
  rotate?: boolean;
}) => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroImage} ${rotate ? styles.rotate : ""}`}>
        <Image src={"/images/hero.webp"} fill alt="hero-image" />
      </div>
      <div className={`container ${styles.heroContent}`}>
        <h1
          style={{
            maxWidth: maxWidth,
          }}
        >
          {title}
        </h1>
        <a
          href="/pdf/AutoFrogyKatalog2025.pdf"
          target="_blank"
          className="link-red"
        >
          Preuzmi katalog proizvoda
        </a>
      </div>
    </section>
  );
};

export default Hero;
